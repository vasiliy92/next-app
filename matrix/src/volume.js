/**
 * volume.js — Volume calculator & maintenance model
 * 
 * Key principles:
 * - Building phase: progressive overload (2.5-5% weekly volume increase)
 * - Maintenance phase: ~1/3 of peak volume (Rhea et al.; Barsuhn et al. 2024)
 * - Deload: ~25-30% of peak volume
 * - Max volume capped by recovery capacity (varies by bodyweight)
 */

// ── Volume constants ───────────────────────────────────────────
const PULL_VOLUME_PER_REP = 1.0;  // relative pull volume per rep
const PUSH_VOLUME_PER_REP = 0.7;  // push-ups ≈ 64% BW, less per-rep cost

// ── Weekly volume targets by level ────────────────────────────
// Based on Schoenfeld (2021) dose-response meta-regression
// Expressed in "working sets × average reps" per week
export const VOLUME_TARGETS = {
  intermediate: { pull: { min: 60, max: 90 }, push: { min: 80, max: 120 } },
  advanced:     { pull: { min: 80, max: 120 }, push: { min: 100, max: 160 } },
  elite:        { pull: { min: 100, max: 150 }, push: { min: 130, max: 200 } },
};

// ── Maintenance volume fraction ────────────────────────────────
// Research: ~1/3 of building volume maintains adaptations
export const MAINTENANCE_FRACTION = 0.33;

// ── Deload volume fraction ─────────────────────────────────────
export const DELOAD_FRACTION = 0.30;

// ── Max recoverable volume (MRV) by bodyweight ────────────────
// Heavier athletes have lower MRV due to higher per-rep cost
// Based on Vanderburgh allometric scaling
export function getMRV(weight, exercise) {
  const refWeight = 70;
  const scaleExponent = exercise === 'pull' ? 0.67 : 0.55;
  const scaleFactor = Math.pow(refWeight / weight, scaleExponent);
  
  // Base MRV at reference weight (70 kg)
  const baseMRV = exercise === 'pull' ? 150 : 200;
  return Math.round(baseMRV * scaleFactor);
}

// ── Calculate exercise volume ──────────────────────────────────
// Handles regular sets, clusters, ladders, EMOM
export function calcExerciseVolume(exercise) {
  if (!exercise) return 0;
  
  const { sets, reps, type, parts } = exercise;
  
  // Cluster set: sum all part reps × sets
  if (type === 'cluster' && parts) {
    const totalClusterReps = parts.reduce((sum, p) => sum + p.reps, 0);
    return sets * totalClusterReps;
  }
  
  // Ladder: sum all rung reps × sets
  if (type === 'ladder' && parts) {
    const totalLadderReps = parts.reduce((sum, p) => sum + p.reps, 0);
    return sets * totalLadderReps;
  }
  
  // EMOM: reps × sets (EMOM sets = rounds)
  if (type === 'emom') {
    return sets * reps;
  }
  
  // Regular: sets × reps
  return sets * reps;
}

// ── Calculate session volume ───────────────────────────────────
export function calcSessionVolume(exercises) {
  let pullVol = 0;
  let pushVol = 0;
  
  for (const ex of exercises) {
    const vol = calcExerciseVolume(ex);
    if (ex.group === 'pull') pullVol += vol;
    else if (ex.group === 'push') pushVol += vol;
  }
  
  return { pull: pullVol, push: pushVol, total: pullVol + pushVol };
}

// ── Calculate weekly volume ─────────────────────────────────────
export function calcWeeklyVolume(sessions) {
  let pullVol = 0;
  let pushVol = 0;
  
  for (const session of sessions) {
    const sv = calcSessionVolume(session.exercises || []);
    pullVol += sv.pull;
    pushVol += sv.push;
  }
  
  return { pull: pullVol, push: pushVol, total: pullVol + pushVol };
}

// ── Volume progression within mesocycle ─────────────────────────
// Week 1: 80% of target, Week 2: 90%, Week 3: 100%, Week 4: deload
export function getWeekVolumeFactor(weekInMeso) {
  switch (weekInMeso) {
    case 1: return 0.80;
    case 2: return 0.90;
    case 3: return 1.00;
    case 4: return DELOAD_FRACTION; // deload
    default: return 1.00;
  }
}

// ── Maintenance volume ──────────────────────────────────────────
// Returns the volume needed to maintain (not build) a quality
export function getMaintenanceVolume(peakVolume) {
  return Math.round(peakVolume * MAINTENANCE_FRACTION);
}

// ── Volume allocation by emphasis ───────────────────────────────
// Given total weekly volume budget and emphasis ratio,
// allocate pull vs push volumes
export function allocateVolume(totalBudget, emphasis, level) {
  const targets = VOLUME_TARGETS[level] || VOLUME_TARGETS.intermediate;
  
  const pullBudget = Math.round(totalBudget * emphasis.pull);
  const pushBudget = Math.round(totalBudget * emphasis.push);
  
  // Clamp to min/max
  const pull = Math.max(targets.pull.min, Math.min(targets.pull.max, pullBudget));
  const push = Math.max(targets.push.min, Math.min(targets.push.max, pushBudget));
  
  return { pull, push };
}

// ── Check volume jump between weeks ─────────────────────────────
// Safety: volume increase > 30% week-over-week is risky
export function isVolumeJumpSafe(prevWeekVol, currentWeekVol) {
  if (prevWeekVol === 0) return true; // first week
  const increase = (currentWeekVol - prevWeekVol) / prevWeekVol;
  return increase <= 0.30;
}

// ── Session duration estimation ──────────────────────────────────
// Estimates total session time from exercises, sets, reps, rest, and tempo
// Returns duration in minutes. Tempo format: "SEXP" (eccentric-pause-concentric-pause)
// Each rep ≈ (S+E+X+P) seconds, where X=1 (explosive)
export function estimateSessionDuration(exercises) {
  let totalSeconds = 0;
  
  for (const ex of exercises) {
    const sets = ex.sets || 1;
    const reps = ex.reps || 1;
    const rest = ex.rest || 60;
    
    // Parse tempo: "20X1" → 2+0+1+1 = 4s per rep; "2020" → 2+0+2+0 = 4s per rep
    const tempo = ex.tempo || '20X1';
    const tempoDigits = tempo.replace(/X/gi, '1').split('').map(Number);
    const secondsPerRep = (tempoDigits[0] || 2) + (tempoDigits[1] || 0) + 
                          (tempoDigits[2] || 1) + (tempoDigits[3] || 0);
    
    if (ex.type === 'cluster' && ex.parts) {
      // Cluster: each set = sum of part reps × time-per-rep + intra-cluster rests
      for (const part of ex.parts) {
        const partReps = part.reps || 1;
        totalSeconds += sets * partReps * secondsPerRep;
        if (part.rest > 0) {
          totalSeconds += sets * part.rest; // intra-cluster rest per set
        }
      }
      totalSeconds += (sets - 1) * rest; // inter-set rest between cluster rounds
    } else if (ex.type === 'ladder' && ex.parts) {
      // Ladder: each set = sum of rung reps × time-per-rep + intra-ladder rests
      for (const part of ex.parts) {
        const partReps = part.reps || 1;
        totalSeconds += sets * partReps * secondsPerRep;
        if (part.rest > 0) {
          totalSeconds += sets * part.rest;
        }
      }
      totalSeconds += (sets - 1) * rest;
    } else if (ex.type === 'emom') {
      // EMOM: total = sets × interval (e.g., 5 rounds × 60s = 300s)
      const interval = ex.emomInterval || 60;
      totalSeconds += sets * interval;
    } else {
      // Regular: sets × reps × time-per-rep + (sets-1) × rest
      totalSeconds += sets * reps * secondsPerRep;
      totalSeconds += (sets - 1) * rest;
    }
    
    // Superset time optimization: if in superset, rest is shared
    // (Already accounted for by shorter rest between superset exercises)
  }
  
  // Add 5 min warmup + 5 min cooldown
  totalSeconds += 600;
  
  return Math.round(totalSeconds / 60); // return minutes
}

// ── Maximum session duration ──────────────────────────────────────
export const MAX_SESSION_MINUTES = 90;

// ── Check if session fits within time cap ─────────────────────────
export function isSessionDurationSafe(exercises) {
  return estimateSessionDuration(exercises) <= MAX_SESSION_MINUTES;
}

// ── Bodyweight-adjusted volume scaling ─────────────────────────
// Heavier athletes need slightly less volume (higher per-rep cost)
export function bwVolumeScale(weight) {
  const refWeight = 70;
  // Vanderburgh: 1RM ~ M^(2/3), so per-rep cost ~ M^(2/3)
  // Volume capacity inversely proportional to per-rep cost
  const scale = Math.pow(refWeight / weight, 0.33);
  return Math.round(scale * 100) / 100;
}
