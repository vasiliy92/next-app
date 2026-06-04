/**
 * athlete.js — Athlete profile & eligibility
 * Determines if an athlete qualifies for the advanced program
 * based on normative data thresholds
 */

import { getPullUpNorms, getPushUpNorms, getAgeFactor } from './norms.js';

// ── Eligibility result ─────────────────────────────────────────
export function checkEligibility(profile) {
  const { weight, age, sex, pullUpMax, pushUpMax } = profile;
  
  if (sex !== 'male' && sex !== 'female') {
    throw new Error(`Unsupported sex: ${sex}. Only male/female supported.`);
  }
  if (weight < 40 || weight > 150) {
    throw new Error(`Weight ${weight}kg out of supported range (40-150kg)`);
  }
  if (age < 15 || age > 65) {
    throw new Error(`Age ${age} out of supported range (15-65)`);
  }
  
  const pullNorms = getPullUpNorms(weight, age);
  const pushNorms = getPushUpNorms(weight, age);
  const ageFactor = getAgeFactor(age);
  
  // Minimum entry = Intermediate level × age factor
  // Rationale: below Intermediate, self-directed training is sufficient
  const minPull = Math.max(1, Math.round(pullNorms.int * ageFactor));
  const minPush = Math.max(1, Math.round(pushNorms.int * ageFactor));
  
  const pullEligible = pullUpMax >= minPull;
  const pushEligible = pushUpMax >= minPush;
  
  // Classification: where does the athlete sit on the normative scale?
  const pullLevel = classifyLevel(pullUpMax, pullNorms);
  const pushLevel = classifyLevel(pushUpMax, pushNorms);
  
  return {
    eligible: pullEligible && pushEligible,
    pull: {
      max: pullUpMax,
      level: pullLevel,
      threshold: minPull,
      passed: pullEligible,
      norms: pullNorms,
    },
    push: {
      max: pushUpMax,
      level: pushLevel,
      threshold: minPush,
      passed: pushEligible,
      norms: pushNorms,
    },
  };
}

// ── Classify level based on normative breakpoints ───────────────
function classifyLevel(maxReps, norms) {
  if (maxReps >= norms.eli) return 'elite';
  if (maxReps >= norms.adv) return 'advanced';
  if (maxReps >= norms.int) return 'intermediate';
  if (maxReps >= norms.nov) return 'novice';
  return 'beginner';
}

// ── Validate goals against ceiling ─────────────────────────────
export function validateGoals(profile, goals) {
  const { weight, age } = profile;
  const pullNorms = getPullUpNorms(weight, age);
  const pushNorms = getPushUpNorms(weight, age);
  const ageFactor = getAgeFactor(age);
  
  const pullCeiling = Math.round(pullNorms.eli * ageFactor);
  const pushCeiling = Math.round(pushNorms.eli * ageFactor);
  
  const result = {
    pull: {
      goal: goals.pullUps,
      ceiling: pullCeiling,
      ratio: goals.pullUps / pullCeiling,
      warning: null,
      capped: goals.pullUps,
    },
    push: {
      goal: goals.pushUps,
      ceiling: pushCeiling,
      ratio: goals.pushUps / pushCeiling,
      warning: null,
      capped: goals.pushUps,
    },
  };
  
  // Warn if goal > 90% of ceiling
  if (result.pull.ratio > 0.90) {
    result.pull.warning = 'approaching_ceiling';
  }
  // Cap at 95% of ceiling
  if (result.pull.ratio > 1.0) {
    result.pull.capped = Math.round(pullCeiling * 0.95);
    result.pull.warning = 'capped_at_95pct_ceiling';
  }
  
  if (result.push.ratio > 0.90) {
    result.push.warning = 'approaching_ceiling';
  }
  if (result.push.ratio > 1.0) {
    result.push.capped = Math.round(pushCeiling * 0.95);
    result.push.warning = 'capped_at_95pct_ceiling';
  }
  
  return result;
}
