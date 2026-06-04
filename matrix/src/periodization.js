/**
 * periodization.js — Mesocycle & macrocycle builder
 * 
 * Architecture:
 * - Macrocycle = 3-4 mesocycles (12-16 weeks)
 * - Mesocycle = 4 weeks (3 build + 1 deload)
 * - Each macrocycle has an emphasis (pull/push/balanced)
 * - Volume, intensity, exercise selection vary by phase
 * 
 * Tempo notation: SECP — Seconds for (E)ccentric, (C)ontraction-pause, 
 *   (P)ause-between-reps. X = explosive (1s). Examples:
 *   20X1 = 2s down, 0s hold, eXplosive up, 1s top
 *   2010 = 2s down, 0s hold, 1s up, 0s top (controlled)
 *   30X1 = 3s down, 0s hold, eXplosive up, 1s top
 *   10X1 = 1s down, 0s hold, eXplosive up, 1s top
 * 
 * Based on: Bompa & Haff (Periodization), Yu et al. (2021 cluster sets),
 *           Schoenfeld (2021) loading recommendations
 */

import { getPullUpWeeklyRate, getPushUpWeeklyRate, estimateMacrocycleCount, assignEmphasis } from './progression.js';
import { getMRV, bwVolumeScale, getWeekVolumeFactor, MAINTENANCE_FRACTION, DELOAD_FRACTION } from './volume.js';
import { EXERCISES } from './exercises.js';

// ── Session types ──────────────────────────────────────────────
const MONDAY = 'mon';
const WEDNESDAY = 'wed';
const FRIDAY = 'fri';

// ── Build a complete macrocycle plan ───────────────────────────
export function buildMacrocycle(macroIndex, emphasis, athleteProfile, currentPull, currentPush, pullCeiling, pushCeiling) {
  const { weight, age } = athleteProfile;
  const bwScale = bwVolumeScale(weight);
  const pullMRV = getMRV(weight, 'pull');
  const pushMRV = getMRV(weight, 'push');
  
  const mesocycles = [];
  let pullLevel = currentPull;
  let pushLevel = currentPush;
  
  for (let m = 0; m < 3; m++) {
    const meso = buildMesocycle(macroIndex, m, emphasis, pullLevel, pushLevel, pullCeiling, pushCeiling, weight, bwScale, pullMRV, pushMRV);
    mesocycles.push(meso);
    
    // Update levels after mesocycle
    for (let w = 0; w < 4; w++) {
      if (w < 3) { // build weeks
        pullLevel += getPullUpWeeklyRate(pullLevel, pullCeiling, macroIndex * 12 + m * 4 + w);
        pushLevel += getPushUpWeeklyRate(pushLevel, pushCeiling, macroIndex * 12 + m * 4 + w);
      }
      pullLevel = Math.min(pullLevel, pullCeiling);
      pushLevel = Math.min(pushLevel, pushCeiling);
    }
  }
  
  return {
    index: macroIndex,
    emphasis,
    mesocycles,
    startPull: currentPull,
    endPull: Math.round(pullLevel * 10) / 10,
    startPush: currentPush,
    endPush: Math.round(pushLevel * 10) / 10,
  };
}

// ── Build a single mesocycle ───────────────────────────────────
function buildMesocycle(macroIndex, mesoIndex, emphasis, pullLevel, pushLevel, pullCeiling, pushCeiling, weight, bwScale, pullMRV, pushMRV) {
  const weeks = [];
  
  for (let w = 1; w <= 4; w++) {
    const isDeload = w === 4;
    const volFactor = getWeekVolumeFactor(w);
    
    // Calculate target volumes for this week
    const pullTargetBase = Math.round(pullMRV * emphasis.pull * bwScale);
    const pushTargetBase = Math.round(pushMRV * emphasis.push * bwScale);
    const pullTarget = Math.round(pullTargetBase * volFactor);
    const pushTarget = Math.round(pushTargetBase * volFactor);
    
    const sessions = buildSessions(
      macroIndex, mesoIndex, w, isDeload,
      pullLevel, pushLevel, pullCeiling, pushCeiling,
      pullTarget, pushTarget, weight, emphasis
    );
    
    weeks.push({
      week: macroIndex * 12 + mesoIndex * 4 + w,
      weekInMeso: w,
      isDeload,
      volFactor,
      pullTarget,
      pushTarget,
      sessions,
    });
  }
  
  return {
    index: mesoIndex,
    macroIndex,
    weeks,
    emphasis,
  };
}

// ── Build 3 sessions for a week ────────────────────────────────
function buildSessions(macroIndex, mesoIndex, weekInMeso, isDeload, pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, weight, emphasis) {
  const sessions = [];
  
  // Monday: Heavy compound day
  sessions.push(buildMondaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso));
  
  // Wednesday: Cluster / variation day
  sessions.push(buildWednesdaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso));
  
  // Friday: Volume / endurance day
  sessions.push(buildFridaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso));
  
  return sessions;
}

// ── Rep adjustment by week in mesocycle ────────────────────────
// Progressive overload: +1 rep per week for non-fixed exercises
function getAdjustedReps(baseReps, weekInMeso, fixedReps) {
  if (fixedReps) return baseReps;
  return baseReps + (weekInMeso - 1);
}

// ── Set adjustment by week in mesocycle ────────────────────────
function getAdjustedSets(baseSets, weekInMeso) {
  if (weekInMeso === 4) return Math.max(1, Math.round(baseSets * DELOAD_FRACTION));
  return baseSets;
}

// ── Monday session builder ──────────────────────────────────────
function buildMondaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso) {
  const isTestWeek = weekInMeso === 3 && mesoIndex === 2; // test on last build week of last meso
  
  if (isDeload) {
    return buildDeloadSession(MONDAY, pullLevel, pushLevel, weight);
  }
  
  // Calculate working reps from current level
  // Working reps ≈ 60-70% of max for pull-ups, 50-60% for push-ups
  const pullWorkingReps = Math.max(3, Math.round(pullLevel * 0.65));
  const pushWorkingReps = Math.max(5, Math.round(pushLevel * 0.55));
  
  // Superset structure: antagonistic pairs
  const exercises = [];
  
  // Superset A: Pull-up + Push-up
  exercises.push({
    ...EXERCISES.pull_up,
    sets: getAdjustedSets(4, weekInMeso),
    reps: getAdjustedReps(pullWorkingReps, weekInMeso, false),
    rest: 120,
    tempo: '20X1',
    supersetGroup: 'A',
    supersetOrder: 1,
  });
  
  exercises.push({
    ...EXERCISES.push_up,
    sets: getAdjustedSets(4, weekInMeso),
    reps: getAdjustedReps(pushWorkingReps, weekInMeso, false),
    rest: 120,
    tempo: '20X1',
    supersetGroup: 'A',
    supersetOrder: 2,
  });
  
  // Superset B: Variation pull + Variation push
  exercises.push({
    ...EXERCISES.pull_up_reverse,
    sets: getAdjustedSets(3, weekInMeso),
    reps: getAdjustedReps(Math.min(6, Math.round(pullLevel * 0.40)), weekInMeso, true),
    rest: 90,
    tempo: '20X1',
    supersetGroup: 'B',
    supersetOrder: 1,
  });
  
  exercises.push({
    ...EXERCISES.push_up_wide,
    sets: getAdjustedSets(3, weekInMeso),
    reps: getAdjustedReps(Math.round(pushWorkingReps * 0.9), weekInMeso, false),
    rest: 90,
    tempo: '20X1',
    supersetGroup: 'B',
    supersetOrder: 2,
  });
  
  // Prehab
  exercises.push({
    ...EXERCISES.face_pull,
    sets: 2,
    reps: 15,
    rest: 60,
    tempo: '2010',
  });
  
  return {
    day: MONDAY,
    label: 'Пн — Силовой (антагонистические суперсеты)',
    exercises,
    isDeload: false,
  };
}

// ── Wednesday session builder (cluster day) ────────────────────
function buildWednesdaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso) {
  if (isDeload) {
    return buildDeloadSession(WEDNESDAY, pullLevel, pushLevel, weight);
  }
  
  // Cluster configuration: 4×(2+2) with 15s intra-cluster rest
  // Based on Yu et al. (2021): clusters effective weeks 1-8
  const useClusters = macroIndex * 12 + mesoIndex * 4 + weekInMeso <= 8;
  
  const pullClusterReps = Math.max(2, Math.round(pullLevel * 0.35));
  const pushClusterReps = Math.max(3, Math.round(pushLevel * 0.30));
  
  const exercises = [];
  
  if (useClusters) {
    // Cluster superset: complete pull cluster THEN push cluster per round
    // True cluster structure: (N + N) with 15s intra-cluster rest between parts
    // Inter-set rest (180s) is on the exercise object, not embedded in parts
    exercises.push({
      ...EXERCISES.pull_up_cluster,
      sets: 4,
      type: 'cluster',
      parts: [
        { reps: pullClusterReps, rest: 15 },  // mini-set 1, 15s rest before mini-set 2
        { reps: pullClusterReps, rest: 0 },    // mini-set 2, no extra rest (inter-set follows)
      ],
      rest: 180,  // inter-set rest between full cluster rounds
      tempo: '10X1',
      isClusterSuperset: true,
      clusterSupersetGroup: 'П',
    });
    
    exercises.push({
      ...EXERCISES.push_up_cluster,
      sets: 4,
      type: 'cluster',
      parts: [
        { reps: pushClusterReps, rest: 15 },
        { reps: pushClusterReps, rest: 0 },
      ],
      rest: 180,
      tempo: '10X1',
      isClusterSuperset: true,
      clusterSupersetGroup: 'П',
    });
  } else {
    // After week 8: switch to traditional supersets (Yu et al. 2021 finding)
    exercises.push({
      ...EXERCISES.pull_up,
      sets: getAdjustedSets(4, weekInMeso),
      reps: getAdjustedReps(Math.round(pullLevel * 0.55), weekInMeso, false),
      rest: 90,
      tempo: '20X1',
      supersetGroup: 'A',
      supersetOrder: 1,
    });
    
    exercises.push({
      ...EXERCISES.push_up,
      sets: getAdjustedSets(4, weekInMeso),
      reps: getAdjustedReps(Math.round(pushLevel * 0.50), weekInMeso, false),
      rest: 90,
      tempo: '20X1',
      supersetGroup: 'A',
      supersetOrder: 2,
    });
  }
  
  // Prehab
  exercises.push({
    ...EXERCISES.y_raise,
    sets: 2,
    reps: 12,
    rest: 60,
    tempo: '2010',
  });
  
  exercises.push({
    ...EXERCISES.external_rotation,
    sets: 2,
    reps: 12,
    rest: 60,
    tempo: '2010',
  });
  
  return {
    day: WEDNESDAY,
    label: useClusters ? 'Ср — Кластер-суперсеты' : 'Ср — Суперсеты',
    exercises,
    isDeload: false,
  };
}

// ── Friday session builder (volume/endurance day) ───────────────
function buildFridaySession(pullLevel, pushLevel, pullCeiling, pushCeiling, pullTarget, pushTarget, isDeload, weight, macroIndex, mesoIndex, weekInMeso) {
  if (isDeload) {
    return buildDeloadSession(FRIDAY, pullLevel, pushLevel, weight);
  }
  
  const exercises = [];
  
  // Ladder: 1-2-3-... pattern
  const pullLadderMax = Math.min(5, Math.round(pullLevel * 0.25));
  const pushLadderMax = Math.min(7, Math.round(pushLevel * 0.20));
  
  const pullParts = [];
  const pushParts = [];
  for (let i = 1; i <= pullLadderMax; i++) pullParts.push({ reps: i, rest: 15 });
  for (let i = 1; i <= pushLadderMax; i++) pushParts.push({ reps: i, rest: 10 });
  
  exercises.push({
    ...EXERCISES.pull_up_ladder,
    sets: getAdjustedSets(3, weekInMeso),
    type: 'ladder',
    parts: pullParts,
    rest: 120,
    tempo: '20X1',
  });
  
  exercises.push({
    ...EXERCISES.push_up_ladder,
    sets: getAdjustedSets(3, weekInMeso),
    type: 'ladder',
    parts: pushParts,
    rest: 90,
    tempo: '20X1',
  });
  
  // EMOM: 5 rounds, every minute on the minute
  const pullEmomReps = Math.max(2, Math.round(pullLevel * 0.30));
  const pushEmomReps = Math.max(4, Math.round(pushLevel * 0.25));
  
  exercises.push({
    ...EXERCISES.pull_up,
    sets: 5,
    reps: pullEmomReps,
    type: 'emom',
    rest: 0, // EMOM: rest = remaining time in minute
    tempo: '20X0',
    emomInterval: 60,
    fixedReps: true, // EMOM reps must not progress weekly
  });
  
  exercises.push({
    ...EXERCISES.push_up,
    sets: 5,
    reps: pushEmomReps,
    type: 'emom',
    rest: 0,
    tempo: '20X0',
    emomInterval: 60,
    fixedReps: true, // EMOM reps must not progress weekly
  });
  
  // Prehab
  exercises.push({
    ...EXERCISES.scapular_pull,
    sets: 2,
    reps: 8,
    rest: 60,
    tempo: '10X1',
  });
  
  return {
    day: FRIDAY,
    label: 'Пт — Объём (лестницы + EMOM)',
    exercises,
    isDeload: false,
  };
}

// ── Deload session builder ──────────────────────────────────────
function buildDeloadSession(day, pullLevel, pushLevel, weight) {
  const exercises = [];
  
  // Reduced volume, same intensity
  exercises.push({
    ...EXERCISES.pull_up,
    sets: 2,
    reps: Math.max(3, Math.round(pullLevel * 0.50)),
    rest: 120,
    tempo: '30X1',
  });
  
  exercises.push({
    ...EXERCISES.push_up,
    sets: 2,
    reps: Math.max(5, Math.round(pushLevel * 0.40)),
    rest: 120,
    tempo: '30X1',
  });
  
  // Extra prehab during deload
  exercises.push({
    ...EXERCISES.face_pull,
    sets: 2,
    reps: 15,
    rest: 60,
    tempo: '2010',
  });
  
  exercises.push({
    ...EXERCISES.y_raise,
    sets: 2,
    reps: 12,
    rest: 60,
    tempo: '2010',
  });
  
  const labels = {
    mon: 'Пн — Разгрузка',
    wed: 'Ср — Разгрузка',
    fri: 'Пт — Разгрузка',
  };
  
  return {
    day,
    label: labels[day] || 'Разгрузка',
    exercises,
    isDeload: true,
  };
}
