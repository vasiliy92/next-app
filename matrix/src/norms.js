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
// Derived from: Cooper 1-min norms × 1.3 (untimed conversion)
// + bodyweight penalty from Vanderburgh (push-up ≈ 64% BW supported)
// Penalty gradient: ~2% per 10kg above 70kg reference
export const PUSH_UP_BY_BW = {
  50: { beg: 8,  nov: 20, int: 40, adv: 55, eli: 85 },
  55: { beg: 8,  nov: 19, int: 39, adv: 53, eli: 82 },
  60: { beg: 7,  nov: 18, int: 37, adv: 51, eli: 79 },
  65: { beg: 7,  nov: 17, int: 36, adv: 49, eli: 76 },
  70: { beg: 7,  nov: 17, int: 35, adv: 48, eli: 74 },
  75: { beg: 7,  nov: 16, int: 34, adv: 46, eli: 71 },
  80: { beg: 6,  nov: 15, int: 33, adv: 45, eli: 69 },
  85: { beg: 6,  nov: 15, int: 31, adv: 43, eli: 66 },
  90: { beg: 6,  nov: 14, int: 30, adv: 41, eli: 64 },
  95: { beg: 5,  nov: 14, int: 29, adv: 40, eli: 62 },
  100: { beg: 5, nov: 13, int: 28, adv: 38, eli: 59 },
  105: { beg: 5, nov: 12, int: 26, adv: 36, eli: 56 },
  110: { beg: 5, nov: 12, int: 25, adv: 35, eli: 54 },
  115: { beg: 4, nov: 11, int: 24, adv: 33, eli: 51 },
  120: { beg: 4, nov: 10, int: 23, adv: 32, eli: 49 },
  125: { beg: 4, nov: 10, int: 22, adv: 30, eli: 47 },
  130: { beg: 4, nov: 9,  int: 21, adv: 29, eli: 45 },
  135: { beg: 3, nov: 9,  int: 20, adv: 28, eli: 43 },
  140: { beg: 3, nov: 8,  int: 19, adv: 27, eli: 42 },
};

// ── Push-up reps by age (male, max to fatigue) ─────────────────
// Derived from: Cooper 1-min norms × 1.3
export const PUSH_UP_BY_AGE = {
  20: { beg: 8,  nov: 20, int: 40, adv: 55, eli: 80 },
  25: { beg: 8,  nov: 20, int: 40, adv: 55, eli: 80 },
  30: { beg: 7,  nov: 17, int: 35, adv: 48, eli: 70 },
  35: { beg: 7,  nov: 17, int: 35, adv: 48, eli: 70 },
  40: { beg: 5,  nov: 13, int: 27, adv: 38, eli: 55 },
  45: { beg: 5,  nov: 13, int: 27, adv: 38, eli: 55 },
  50: { beg: 3,  nov: 10, int: 20, adv: 30, eli: 45 },
  55: { beg: 3,  nov: 10, int: 20, adv: 30, eli: 45 },
  60: { beg: 2,  nov: 7,  int: 15, adv: 22, eli: 35 },
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

// ── Combined norms: min(BW_norm, Age_norm) ─────────────────────
// The more restrictive norm governs (athlete must meet both)
export function getPullUpNorms(bw, age) {
  const bwNorm = lookupByBW(PULL_UP_BY_BW, bw);
  const ageNorm = lookupByAge(PULL_UP_BY_AGE, age);
  const combined = {};
  for (const k of Object.keys(bwNorm)) {
    combined[k] = Math.min(bwNorm[k], ageNorm[k]);
  }
  return combined;
}

export function getPushUpNorms(bw, age) {
  const bwNorm = lookupByBW(PUSH_UP_BY_BW, bw);
  const ageNorm = lookupByAge(PUSH_UP_BY_AGE, age);
  const combined = {};
  for (const k of Object.keys(bwNorm)) {
    combined[k] = Math.min(bwNorm[k], ageNorm[k]);
  }
  return combined;
}
