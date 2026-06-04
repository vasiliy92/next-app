/**
 * norms.js — Normative data tables
 * Sources: Strength Level (4.8M lifts), Shiba Muscle, Cooper Institute (2013),
 *          Vanderburgh (2006, 2007), Kjaer et al. (2016)
 */

// ── Pull-up reps by bodyweight (male) ──────────────────────────
// Source: Strength Level / Shiba Muscle, ~4.8M lifts
// Keys: beg (<5%), nov (20%), int (50%), adv (80%), eli (95%)
export const PULL_UP_BY_BW = {
  50: { beg: 0, nov: 5, int: 15, adv: 27, eli: 40 },
  55: { beg: 0, nov: 6, int: 15, adv: 26, eli: 39 },
  60: { beg: 0, nov: 6, int: 15, adv: 26, eli: 37 },
  65: { beg: 0, nov: 6, int: 15, adv: 25, eli: 36 },
  70: { beg: 0, nov: 6, int: 14, adv: 24, eli: 35 },
  75: { beg: 0, nov: 6, int: 14, adv: 24, eli: 34 },
  80: { beg: 0, nov: 6, int: 14, adv: 23, eli: 33 },
  85: { beg: 0, nov: 6, int: 13, adv: 22, eli: 32 },
  90: { beg: 0, nov: 6, int: 13, adv: 21, eli: 30 },
  95: { beg: 0, nov: 6, int: 12, adv: 21, eli: 29 },
  100: { beg: 0, nov: 6, int: 12, adv: 20, eli: 28 },
  105: { beg: 0, nov: 5, int: 11, adv: 19, eli: 27 },
  110: { beg: 0, nov: 5, int: 11, adv: 18, eli: 26 },
  115: { beg: 0, nov: 5, int: 10, adv: 18, eli: 25 },
  120: { beg: 0, nov: 4, int: 10, adv: 17, eli: 25 },
  125: { beg: 0, nov: 4, int: 10, adv: 16, eli: 24 },
  130: { beg: 0, nov: 4, int: 9,  adv: 16, eli: 23 },
  135: { beg: 0, nov: 4, int: 9,  adv: 15, eli: 22 },
  140: { beg: 0, nov: 3, int: 9,  adv: 15, eli: 21 },
};

// ── Pull-up reps by age (male) ────────────────────────────────
// Source: Strength Level / Shiba Muscle
export const PULL_UP_BY_AGE = {
  15: { beg: 0, nov: 0, int: 8,  adv: 17, eli: 27 },
  20: { beg: 0, nov: 4, int: 13, adv: 24, eli: 36 },
  25: { beg: 0, nov: 5, int: 14, adv: 25, eli: 37 },
  30: { beg: 0, nov: 5, int: 14, adv: 25, eli: 37 },
  35: { beg: 0, nov: 5, int: 14, adv: 25, eli: 37 },
  40: { beg: 0, nov: 5, int: 14, adv: 25, eli: 37 },
  45: { beg: 0, nov: 3, int: 12, adv: 22, eli: 34 },
  50: { beg: 0, nov: 1, int: 9,  adv: 19, eli: 30 },
  55: { beg: 0, nov: 0, int: 7,  adv: 16, eli: 26 },
  60: { beg: 0, nov: 0, int: 4,  adv: 12, eli: 21 },
  65: { beg: 0, nov: 0, int: 1,  adv: 8,  eli: 16 },
};

// ── Push-up reps by bodyweight (male, max to fatigue) ──────────
// Source: Strength Level (2,909,040 lifts), direct BW-based norms
export const PUSH_UP_BY_BW = {
  50: { beg: 0,  nov: 16, int: 42, adv: 73, eli: 108 },
  55: { beg: 0,  nov: 17, int: 42, adv: 72, eli: 105 },
  60: { beg: 1,  nov: 18, int: 42, adv: 70, eli: 102 },
  65: { beg: 2,  nov: 19, int: 42, adv: 69, eli: 99 },
  70: { beg: 3,  nov: 19, int: 41, adv: 67, eli: 96 },
  75: { beg: 4,  nov: 19, int: 41, adv: 66, eli: 93 },
  80: { beg: 5,  nov: 20, int: 40, adv: 64, eli: 91 },
  85: { beg: 5,  nov: 20, int: 39, adv: 63, eli: 88 },
  90: { beg: 5,  nov: 19, int: 39, adv: 61, eli: 86 },
  95: { beg: 6,  nov: 19, int: 38, adv: 60, eli: 83 },
  100: { beg: 6, nov: 19, int: 37, adv: 58, eli: 81 },
  105: { beg: 6, nov: 19, int: 37, adv: 57, eli: 79 },
  110: { beg: 6, nov: 19, int: 36, adv: 56, eli: 77 },
  115: { beg: 6, nov: 18, int: 35, adv: 54, eli: 75 },
  120: { beg: 6, nov: 18, int: 34, adv: 53, eli: 73 },
  125: { beg: 6, nov: 18, int: 34, adv: 52, eli: 71 },
  130: { beg: 6, nov: 17, int: 33, adv: 51, eli: 70 },
  135: { beg: 6, nov: 17, int: 32, adv: 49, eli: 68 },
  140: { beg: 6, nov: 17, int: 32, adv: 48, eli: 66 },
};

// ── Push-up reps by age (male, max to fatigue) ─────────────────
// Source: Strength Level (2,909,040 lifts)
export const PUSH_UP_BY_AGE = {
  15: { beg: 0,  nov: 11, int: 30, adv: 54, eli: 80 },
  20: { beg: 0,  nov: 16, int: 39, adv: 66, eli: 95 },
  25: { beg: 1,  nov: 18, int: 41, adv: 68, eli: 99 },
  30: { beg: 1,  nov: 18, int: 41, adv: 68, eli: 99 },
  35: { beg: 1,  nov: 18, int: 41, adv: 68, eli: 99 },
  40: { beg: 1,  nov: 18, int: 41, adv: 68, eli: 99 },
  45: { beg: 0,  nov: 15, int: 37, adv: 63, eli: 92 },
  50: { beg: 0,  nov: 12, int: 33, adv: 57, eli: 84 },
  55: { beg: 0,  nov: 9,  int: 28, adv: 50, eli: 75 },
  60: { beg: 0,  nov: 7,  int: 23, adv: 43, eli: 66 },
  65: { beg: 0,  nov: 4,  int: 18, adv: 36, eli: 57 },
  70: { beg: 0,  nov: 0,  int: 13, adv: 30, eli: 48 },
  75: { beg: 0,  nov: 0,  int: 9,  adv: 24, eli: 40 },
  80: { beg: 0,  nov: 0,  int: 6,  adv: 18, eli: 33 },
  85: { beg: 0,  nov: 0,  int: 2,  adv: 13, eli: 27 },
  90: { beg: 0,  nov: 0,  int: 0,  adv: 9,  eli: 21 },
};

// ── Age correction factors ─────────────────────────────────────
// Applied to normative thresholds for athletes over 40
// Based on Kjaer et al. (2016) — inverse age association
export const AGE_FACTORS = {
  range_20_40: 1.0,
  range_41_45: 0.85,
  range_46_50: 0.65,
  range_51_55: 0.50,
  range_56_60: 0.30,
};

// ── Helper: get age factor ─────────────────────────────────────
export function getAgeFactor(age) {
  if (age <= 40) return AGE_FACTORS.range_20_40;
  if (age <= 45) return AGE_FACTORS.range_41_45;
  if (age <= 50) return AGE_FACTORS.range_46_50;
  if (age <= 55) return AGE_FACTORS.range_51_55;
  if (age <= 60) return AGE_FACTORS.range_56_60;
  return 0.25; // over 60: very conservative
}

// ── Helper: interpolate BW table ───────────────────────────────
// Finds nearest BW bucket or interpolates linearly
export function lookupByBW(table, bw) {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (bw <= keys[0]) return table[keys[0]];
  if (bw >= keys[keys.length - 1]) return table[keys[keys.length - 1]];
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (bw >= keys[i] && bw <= keys[i + 1]) {
      const t = (bw - keys[i]) / (keys[i + 1] - keys[i]);
      const a = table[keys[i]];
      const b = table[keys[i + 1]];
      const result = {};
      for (const k of Object.keys(a)) {
        result[k] = Math.round(a[k] + t * (b[k] - a[k]));
      }
      return result;
    }
  }
  return table[keys[keys.length - 1]];
}

// ── Helper: lookup by age (nearest bucket) ─────────────────────
export function lookupByAge(table, age) {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  // Find nearest key
  let nearest = keys[0];
  let minDist = Math.abs(age - keys[0]);
  for (const k of keys) {
    const d = Math.abs(age - k);
    if (d < minDist) { minDist = d; nearest = k; }
  }
  return table[nearest];
}

// ── Female scaling factors ───────────────────────────────────
// Women have ~55% of male upper-body relative strength
// Source: Strength Level female norms (pull-up 60kg: eli≈20 vs male 37;
// push-up 60kg: eli≈55 vs male 102 → ratio ~0.53-0.55)
// Applied as multiplier on male norms to derive female equivalents
const FEMALE_SCALE = { pull: 0.55, push: 0.55 };

// ── Combined norms: min(BW_norm, Age_norm) × sex scale ──────
// The more restrictive norm governs (athlete must meet both)
export function getPullUpNorms(bw, age, sex = 'male') {
  const bwNorm = lookupByBW(PULL_UP_BY_BW, bw);
  const ageNorm = lookupByAge(PULL_UP_BY_AGE, age);
  const scale = sex === 'female' ? FEMALE_SCALE.pull : 1;
  const combined = {};
  for (const k of Object.keys(bwNorm)) {
    combined[k] = Math.max(0, Math.round(Math.min(bwNorm[k], ageNorm[k]) * scale));
  }
  return combined;
}

export function getPushUpNorms(bw, age, sex = 'male') {
  const bwNorm = lookupByBW(PUSH_UP_BY_BW, bw);
  const ageNorm = lookupByAge(PUSH_UP_BY_AGE, age);
  const scale = sex === 'female' ? FEMALE_SCALE.push : 1;
  const combined = {};
  for (const k of Object.keys(bwNorm)) {
    combined[k] = Math.max(0, Math.round(Math.min(bwNorm[k], ageNorm[k]) * scale));
  }
  return combined;
}
