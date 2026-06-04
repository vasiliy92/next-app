/**
 * matrix.js — Main matrix generator
 * 
 * Combines all modules: norms, athlete, progression, volume, exercises, periodization
 * Produces a complete, validated training matrix for a given athlete profile and goals.
 * 
 * Usage:
 *   generateMatrix(profile, goals) → { eligibility, goals, macrocycles, validation }
 */

import { checkEligibility, validateGoals } from './athlete.js';
import { getPullUpNorms, getPushUpNorms, getAgeFactor } from './norms.js';
import { estimateMacrocycleCount, assignEmphasis, estimateWeeksToGoal, simulateProgression, DELOAD_SUPERCOMP_PULL, DELOAD_SUPERCOMP_PUSH } from './progression.js';
import { calcWeeklyVolume, isVolumeJumpSafe, isSessionDurationSafe, estimateSessionDuration, MAX_SESSION_MINUTES, bwVolumeScale, getMRV } from './volume.js';
import { buildMacrocycle } from './periodization.js';

// ── Generate complete training matrix ──────────────────────────
export function generateMatrix(profile, goals) {
  // Step 1: Check eligibility
  const eligibility = checkEligibility(profile);
  
  // Step 2: Validate and cap goals
  const goalValidation = validateGoals(profile, goals);
  
  // Step 3: Calculate ceilings
  const pullNorms = getPullUpNorms(profile.weight, profile.age, profile.sex);
  const pushNorms = getPushUpNorms(profile.weight, profile.age, profile.sex);
  const ageFactor = getAgeFactor(profile.age);
  const pullCeiling = Math.round(pullNorms.eli * ageFactor);
  const pushCeiling = Math.round(pushNorms.eli * ageFactor);
  
  // Step 4: Use capped goals
  const cappedGoals = {
    pullUps: goalValidation.pull.capped,
    pushUps: goalValidation.push.capped,
  };
  
  // Step 5: Estimate macrocycle structure
  const pullGap = cappedGoals.pullUps - profile.pullUpMax;
  const pushGap = cappedGoals.pushUps - profile.pushUpMax;
  const macrocycleCount = Math.max(
    estimateMacrocycleCount(profile.pullUpMax, cappedGoals.pullUps, pullCeiling),
    estimateMacrocycleCount(profile.pushUpMax, cappedGoals.pushUps, pushCeiling)
  );
  
  const emphases = assignEmphasis(pullGap, pushGap, macrocycleCount);
  
  // Step 6: Build macrocycles
  const macrocycles = [];
  let currentPull = profile.pullUpMax;
  let currentPush = profile.pushUpMax;
  
  for (let i = 0; i < macrocycleCount; i++) {
    const macro = buildMacrocycle(
      i, emphases[i], profile,
      currentPull, currentPush,
      pullCeiling, pushCeiling
    );
    macrocycles.push(macro);
    currentPull = macro.endPull;
    currentPush = macro.endPush;
  }
  
  // Step 7: Validate matrix (volume jumps, MRV violations, etc.)
  const validation = validateMatrix(macrocycles, profile);
  
  // Step 8: Progression simulation
  const progression = simulateProgression(profile, cappedGoals, { pull: pullCeiling, push: pushCeiling });
  
  return {
    profile,
    goals: cappedGoals,
    originalGoals: goals,
    eligibility,
    goalValidation,
    ceilings: { pull: pullCeiling, push: pushCeiling },
    macrocycleCount,
    emphases,
    macrocycles,
    validation,
    progression,
    totalWeeks: macrocycleCount * 12,
  };
}

// ── Validate the generated matrix ──────────────────────────────
function validateMatrix(macrocycles, profile) {
  const issues = [];
  const { weight } = profile;
  const pullMRV = getMRV(weight, 'pull');
  const pushMRV = getMRV(weight, 'push');
  
  let prevPullVol = 0;
  let prevPushVol = 0;
  
  for (const macro of macrocycles) {
    for (const meso of macro.mesocycles) {
      for (const week of meso.weeks) {
        const weekVol = calcWeeklyVolume(
          week.sessions.flatMap(s => s.exercises || [])
        );
        
        // Check MRV
        if (weekVol.pull > pullMRV && !week.isDeload) {
          issues.push({
            type: 'MRV_EXCEEDED',
            severity: 'high',
            week: week.week,
            exercise: 'pull',
            volume: weekVol.pull,
            limit: pullMRV,
            message: `Pull volume ${weekVol.pull} exceeds MRV ${pullMRV} on week ${week.week}`,
          });
        }
        
        if (weekVol.push > pushMRV && !week.isDeload) {
          issues.push({
            type: 'MRV_EXCEEDED',
            severity: 'high',
            week: week.week,
            exercise: 'push',
            volume: weekVol.push,
            limit: pushMRV,
            message: `Push volume ${weekVol.push} exceeds MRV ${pushMRV} on week ${week.week}`,
          });
        }
        
        // Check volume jumps (skip first week and deload transitions)
        if (prevPullVol > 0 && !week.isDeload && prevPullVol > 0) {
          if (!isVolumeJumpSafe(prevPullVol, weekVol.pull)) {
            issues.push({
              type: 'VOLUME_JUMP',
              severity: 'medium',
              week: week.week,
              exercise: 'pull',
              prevVolume: prevPullVol,
              newVolume: weekVol.pull,
              message: `Pull volume jump ${(weekVol.pull / prevPullVol - 1) * 100}% on week ${week.week}`,
            });
          }
        }
        
        // Check session duration (max 90 min per spec)
        for (const session of week.sessions) {
          const duration = estimateSessionDuration(session.exercises || []);
          if (duration > MAX_SESSION_MINUTES) {
            issues.push({
              type: 'SESSION_TOO_LONG',
              severity: 'high',
              week: week.week,
              day: session.day,
              duration,
              limit: MAX_SESSION_MINUTES,
              message: `${session.day.toUpperCase()} session ${duration}min exceeds ${MAX_SESSION_MINUTES}min cap on week ${week.week}`,
            });
          }
        }
        
        prevPullVol = week.isDeload ? 0 : weekVol.pull;
        prevPushVol = week.isDeload ? 0 : weekVol.push;
      }
    }
  }
  
  return {
    passed: issues.filter(i => i.severity === 'high').length === 0,
    issues,
    issueCount: issues.length,
    highSeverityCount: issues.filter(i => i.severity === 'high').length,
  };
}

// ── Export matrix as structured data ────────────────────────────
export function exportMatrix(matrix) {
  const rows = [];
  
  for (const macro of matrix.macrocycles) {
    for (const meso of macro.mesocycles) {
      for (const week of meso.weeks) {
        for (const session of week.sessions) {
          for (const ex of (session.exercises || [])) {
            const vol = ex.type === 'cluster' || ex.type === 'ladder'
              ? (ex.parts || []).reduce((s, p) => s + p.reps, 0) * ex.sets
              : ex.sets * ex.reps;
            
            rows.push({
              macro: macro.index + 1,
              meso: meso.index + 1,
              week: week.week,
              weekInMeso: week.weekInMeso,
              isDeload: week.isDeload,
              day: session.day,
              exercise: ex.name,
              exerciseEn: ex.nameEn || ex.id,
              group: ex.group,
              type: ex.type || 'regular',
              sets: ex.sets,
              reps: ex.reps || ((ex.parts || []).map(p => p.reps).join('+')),
              volume: vol,
              rest: ex.rest,
              tempo: ex.tempo,
              isPrehab: ex.isPrehab || false,
              fixedReps: ex.fixedReps || false,
              supersetGroup: ex.supersetGroup || null,
              emphasis: macro.emphasis.label,
            });
          }
        }
      }
    }
  }
  
  return rows;
}
