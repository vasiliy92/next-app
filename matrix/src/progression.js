/**
 * progression.js — Progression model with diminishing returns
 * 
 * Core model: logarithmic decay of rate as athlete approaches ceiling
 * Based on: Schoenfeld et al. (2023) plateau research
 * 
 * Rate(t) = initialRate × (1 - currentLevel / ceiling)
 * Integrated: level(t) = ceiling × (1 - e^(-k×t)) + startingLevel
 */

// ── Progression rate model ─────────────────────────────────────
// Returns estimated weekly gain in reps for a given exercise
// rate decreases as current level approaches ceiling

export function getWeeklyRate(current, ceiling, weeksTrained) {
  if (current >= ceiling) return 0;
  
  const gap = ceiling - current;
  const gapRatio = gap / ceiling; // 0..1 (1 = far from ceiling, 0 = at ceiling)
  
  // Base rate: depends on exercise type
  // Pull-ups: ~0.8-1.0 reps/week at start for intermediate athlete
  // Push-ups: ~2.0-3.0 reps/week at start for intermediate athlete
  // These are empirically derived from training studies
  
  // Diminishing returns factor
  const decayFactor = Math.pow(gapRatio, 0.6); // sublinear decay
  
  // Fatigue accumulation: slight reduction after many weeks
  const fatigueFactor = Math.max(0.7, 1.0 - weeksTrained * 0.005);
  
  return decayFactor * fatigueFactor;
}

// ── Pull-up weekly rate ────────────────────────────────────────
export function getPullUpWeeklyRate(current, ceiling, weeksTrained) {
  const baseRate = 0.9; // reps/week at start for intermediate
  return baseRate * getWeeklyRate(current, ceiling, weeksTrained);
}

// ── Push-up weekly rate ────────────────────────────────────────
export function getPushUpWeeklyRate(current, ceiling, weeksTrained) {
  const baseRate = 2.5; // reps/week at start for intermediate
  return baseRate * getWeeklyRate(current, ceiling, weeksTrained);
}

// ── Supercompensation during deload weeks ──────────────────────
// Small performance gain during deload due to fatigue dissipation
// Schoenfeld (2021): supercompensation effect ~2-5% of weekly rate
export const DELOAD_SUPERCOMP_PULL = 0.05;  // ~0.05 reps supercompensation per deload week
export const DELOAD_SUPERCOMP_PUSH = 0.10;  // ~0.10 reps supercompensation per deload week

// ── Estimate weeks to reach goal ───────────────────────────────
// Uses discrete simulation (week-by-week) for accuracy
export function estimateWeeksToGoal(current, goal, ceiling, exerciseType) {
  const rateFn = exerciseType === 'pull' ? getPullUpWeeklyRate : getPushUpWeeklyRate;
  const deloadGain = exerciseType === 'pull' ? DELOAD_SUPERCOMP_PULL : DELOAD_SUPERCOMP_PUSH;
  let level = current;
  let weeks = 0;
  const maxWeeks = 200; // safety limit
  
  while (level < goal && weeks < maxWeeks) {
    const rate = rateFn(level, ceiling, weeks);
    level += rate;
    weeks++;
    // Deload every 4th week: supercompensation gain
    if (weeks % 4 === 0) {
      level += deloadGain;
    }
  }
  
  return Math.min(weeks, maxWeeks);
}

// ── Macrocycle count estimation ────────────────────────────────
// Based on gap size relative to ceiling
export function estimateMacrocycleCount(current, goal, ceiling) {
  const totalGap = goal - current;
  const gapRatio = totalGap / ceiling;
  
  if (gapRatio <= 0.15) return 1;   // small gap: 1 macrocycle (12 weeks)
  if (gapRatio <= 0.30) return 2;   // medium gap: 2 macrocycles (24 weeks)
  if (gapRatio <= 0.50) return 3;   // large gap: 3 macrocycles (36 weeks)
  return 4;                          // very large gap: 4 macrocycles (48 weeks)
}

// ── Emphasis assignment per macrocycle ─────────────────────────
// Determines pull/push emphasis for each macrocycle
// Strategy: alternate emphasis, start with weaker gap
export function assignEmphasis(pullGap, pushGap, macrocycleCount) {
  const emphases = [];
  const pullRatio = pullGap / (pullGap + pushGap);
  const pushRatio = pushGap / (pullGap + pushGap);
  
  if (macrocycleCount === 1) {
    emphases.push({ pull: 0.55, push: 0.45, label: 'balanced' });
  } else if (macrocycleCount === 2) {
    // First macro: emphasize the bigger gap
    if (pullRatio > pushRatio) {
      emphases.push({ pull: 0.65, push: 0.35, label: 'pull_focus' });
      emphases.push({ pull: 0.40, push: 0.60, label: 'push_focus' });
    } else {
      emphases.push({ pull: 0.40, push: 0.60, label: 'push_focus' });
      emphases.push({ pull: 0.60, push: 0.40, label: 'pull_focus' });
    }
  } else if (macrocycleCount === 3) {
    if (pullRatio > pushRatio) {
      emphases.push({ pull: 0.65, push: 0.35, label: 'pull_focus' });
      emphases.push({ pull: 0.50, push: 0.50, label: 'balanced' });
      emphases.push({ pull: 0.35, push: 0.65, label: 'push_focus' });
    } else {
      emphases.push({ pull: 0.35, push: 0.65, label: 'push_focus' });
      emphases.push({ pull: 0.50, push: 0.50, label: 'balanced' });
      emphases.push({ pull: 0.65, push: 0.35, label: 'pull_focus' });
    }
  } else { // 4 macrocycles
    if (pullRatio > pushRatio) {
      emphases.push({ pull: 0.65, push: 0.35, label: 'pull_focus' });
      emphases.push({ pull: 0.55, push: 0.45, label: 'pull_maintain_push_build' });
      emphases.push({ pull: 0.35, push: 0.65, label: 'push_focus' });
      emphases.push({ pull: 0.45, push: 0.55, label: 'push_peak' });
    } else {
      emphases.push({ pull: 0.35, push: 0.65, label: 'push_focus' });
      emphases.push({ pull: 0.45, push: 0.55, label: 'push_maintain_pull_build' });
      emphases.push({ pull: 0.65, push: 0.35, label: 'pull_focus' });
      emphases.push({ pull: 0.55, push: 0.45, label: 'pull_peak' });
    }
  }
  
  return emphases;
}

// ── Simulate full progression curve ────────────────────────────
// Returns array of { week, pullEstimate, pushEstimate }
export function simulateProgression(profile, goals, ceiling) {
  const { pullUpMax, pushUpMax } = profile;
  const pullGoal = goals.pullUps;
  const pushGoal = goals.pushUps;
  const pullCeiling = ceiling.pull;
  const pushCeiling = ceiling.push;
  
  let pullLevel = pullUpMax;
  let pushLevel = pushUpMax;
  const curve = [];
  
  const totalWeeks = estimateWeeksToGoal(pullUpMax, pullGoal, pullCeiling, 'pull') +
                     estimateWeeksToGoal(pushUpMax, pushGoal, pushCeiling, 'push');
  const maxWeeks = Math.max(totalWeeks, 12);
  
  for (let w = 0; w < maxWeeks; w++) {
    curve.push({
      week: w + 1,
      pullEstimate: Math.round(pullLevel * 10) / 10,
      pushEstimate: Math.round(pushLevel * 10) / 10,
    });
    
    // Progress (skip deload weeks)
    const isDeload = (w + 1) % 4 === 0;
    if (!isDeload) {
      pullLevel += getPullUpWeeklyRate(pullLevel, pullCeiling, w);
      pushLevel += getPushUpWeeklyRate(pushLevel, pushCeiling, w);
    } else {
      // Supercompensation during deload (unified constants)
      pullLevel += DELOAD_SUPERCOMP_PULL;
      pushLevel += DELOAD_SUPERCOMP_PUSH;
    }
    
    // Cap at ceiling
    pullLevel = Math.min(pullLevel, pullCeiling);
    pushLevel = Math.min(pushLevel, pushCeiling);
  }
  
  return curve;
}
