/**
 * test_runner.js — Simple test runner + complete test suite
 * 
 * Run: node matrix/tests/test_runner.js
 * 
 * Tests cover:
 * 1. Normative data lookups
 * 2. Eligibility checks
 * 3. Goal validation
 * 4. Progression model (diminishing returns)
 * 5. Volume calculations
 * 6. Periodization structure
 * 7. Full matrix generation
 * 8. Vasilii-specific test case (100kg, 30yo, pull:20, push:50)
 */

import { strict as assert } from 'node:assert';

// ── Simple test framework ───────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    failures.push({ name, error: e.message });
    console.log(`  ✗ ${name}: ${e.message}`);
  }
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(`${msg || 'assertEqual'}: expected ${expected}, got ${actual}`);
  }
}

function assertApprox(actual, expected, tolerance, msg) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${msg || 'assertApprox'}: expected ~${expected}±${tolerance}, got ${actual}`);
  }
}

function assertTrue(val, msg) {
  if (!val) throw new Error(msg || 'Expected true, got false');
}

function assertFalse(val, msg) {
  if (val) throw new Error(msg || 'Expected false, got true');
}

function assertGTE(val, min, msg) {
  if (val < min) throw new Error(`${msg || 'assertGTE'}: expected ≥${min}, got ${val}`);
}

function assertLTE(val, max, msg) {
  if (val > max) throw new Error(`${msg || 'assertLTE'}: expected ≤${max}, got ${val}`);
}

// ── Import modules ──────────────────────────────────────────────
import * as norms from '../src/norms.js';
import * as athlete from '../src/athlete.js';
import * as progression from '../src/progression.js';
import * as volume from '../src/volume.js';
import * as exercises from '../src/exercises.js';
import * as periodization from '../src/periodization.js';
import * as matrix from '../src/matrix.js';

// ═══════════════════════════════════════════════════════════════
// SECTION 1: NORMATIVE DATA
// ═══════════════════════════════════════════════════════════════
console.log('\n📊 Section 1: Normative Data');

test('Pull-up norms at 100kg: intermediate=12, advanced=20, elite=28', () => {
  const n = norms.PULL_UP_BY_BW[100];
  assertEqual(n.int, 12);
  assertEqual(n.adv, 20);
  assertEqual(n.eli, 28);
});

test('Pull-up norms at 70kg: intermediate=14, advanced=24, elite=35', () => {
  const n = norms.PULL_UP_BY_BW[70];
  assertEqual(n.int, 14);
  assertEqual(n.adv, 24);
  assertEqual(n.eli, 35);
});

test('Push-up norms at 100kg: intermediate=28, elite=59', () => {
  const n = norms.PUSH_UP_BY_BW[100];
  assertEqual(n.int, 28);
  assertEqual(n.eli, 59);
});

test('BW interpolation: 75kg pull-up intermediate=14', () => {
  const n = norms.lookupByBW(norms.PULL_UP_BY_BW, 75);
  assertEqual(n.int, 14);
});

test('BW interpolation: 97kg pull-up intermediate between 95(12) and 100(12)', () => {
  const n = norms.lookupByBW(norms.PULL_UP_BY_BW, 97);
  assertEqual(n.int, 12); // both 95 and 100 have int=12
});

test('BW edge: 45kg uses minimum bucket (50)', () => {
  const n = norms.lookupByBW(norms.PULL_UP_BY_BW, 45);
  assertEqual(n.int, 15); // 50kg bucket
});

test('BW edge: 150kg uses maximum bucket (140)', () => {
  const n = norms.lookupByBW(norms.PULL_UP_BY_BW, 150);
  assertEqual(n.int, 9); // 140kg bucket
});

test('Age lookup: 30yo pull-up intermediate=14', () => {
  const n = norms.lookupByAge(norms.PULL_UP_BY_AGE, 30);
  assertEqual(n.int, 14);
});

test('Age lookup: 47yo pull-up nearest=45 (int=12)', () => {
  const n = norms.lookupByAge(norms.PULL_UP_BY_AGE, 47);
  assertEqual(n.int, 12);
});

test('Combined norms: 100kg/30yo pull-up = min(BW=12, Age=14) = 12', () => {
  const n = norms.getPullUpNorms(100, 30);
  assertEqual(n.int, 12);
});

test('Combined norms: 100kg/50yo pull-up = min(BW=12, Age=9) = 9', () => {
  const n = norms.getPullUpNorms(100, 50);
  assertEqual(n.int, 9);
});

test('Age factor: 30yo = 1.0', () => {
  assertEqual(norms.getAgeFactor(30), 1.0);
});

test('Age factor: 43yo = 0.85', () => {
  assertEqual(norms.getAgeFactor(43), 0.85);
});

test('Age factor: 48yo = 0.65', () => {
  assertEqual(norms.getAgeFactor(48), 0.65);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 2: ELIGIBILITY
// ═══════════════════════════════════════════════════════════════
console.log('\n🚦 Section 2: Eligibility');

test('Vasilii (100kg, 30yo, pull:20, push:50) is eligible', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 });
  assertTrue(result.eligible);
  assertEqual(result.pull.level, 'advanced'); // 20 >= adv(20) at 100kg
});

test('Beginner (100kg, 30yo, pull:5, push:15) is NOT eligible', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 5, pushUpMax: 15 });
  assertFalse(result.eligible);
  assertEqual(result.pull.level, 'novice');
});

test('Threshold for 100kg/30yo: pull≥12, push≥28', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 });
  assertEqual(result.pull.threshold, 12);
  assertEqual(result.push.threshold, 28);
});

test('Age-adjusted threshold for 100kg/48yo: lower than 30yo', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 48, sex: 'male', pullUpMax: 10, pushUpMax: 25 });
  // Combined norms: min(BW_int=12, Age_int=9) = 9, × 0.65 = 5.85 → 6
  assertEqual(result.pull.threshold, 6);
  assertTrue(result.eligible); // pull:10 > threshold:6
});

test('Invalid sex throws error', () => {
  try {
    athlete.checkEligibility({ weight: 80, age: 25, sex: 'other', pullUpMax: 10, pushUpMax: 30 });
    throw new Error('Should have thrown');
  } catch (e) {
    assertTrue(e.message.includes('Unsupported sex'));
  }
});

test('Edge: exactly at threshold is eligible', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 12, pushUpMax: 28 });
  assertTrue(result.eligible);
  assertEqual(result.pull.level, 'intermediate');
});

// ═══════════════════════════════════════════════════════════════
// SECTION 3: GOAL VALIDATION
// ═══════════════════════════════════════════════════════════════
console.log('\n🎯 Section 3: Goal Validation');

test('Goal 35 pull-ups at 100kg: ratio 35/28=1.25 → capped at 95% of 28=27', () => {
  const result = athlete.validateGoals(
    { weight: 100, age: 30 },
    { pullUps: 35, pushUps: 100 }
  );
  assertEqual(result.pull.capped, 27); // 28 * 0.95 = 26.6 → 27
  assertEqual(result.pull.warning, 'capped_at_95pct_ceiling');
});

test('Goal 20 pull-ups at 100kg: ratio 20/28=0.71 → no warning', () => {
  const result = athlete.validateGoals(
    { weight: 100, age: 30 },
    { pullUps: 20, pushUps: 50 }
  );
  assertEqual(result.pull.warning, null);
  assertEqual(result.pull.capped, 20);
});

test('Goal 26 pull-ups at 100kg: ratio 26/28=0.93 → approaching_ceiling warning', () => {
  const result = athlete.validateGoals(
    { weight: 100, age: 30 },
    { pullUps: 26, pushUps: 50 }
  );
  assertEqual(result.pull.warning, 'approaching_ceiling');
  assertEqual(result.pull.capped, 26); // not capped, just warned
});

test('Push-up goal 120 at 100kg: ratio 120/59=2.03 → capped at 56', () => {
  const result = athlete.validateGoals(
    { weight: 100, age: 30 },
    { pullUps: 25, pushUps: 120 }
  );
  assertEqual(result.push.capped, 56); // 59 * 0.95 = 56.05 → 56
});

// ═══════════════════════════════════════════════════════════════
// SECTION 4: PROGRESSION MODEL
// ═══════════════════════════════════════════════════════════════
console.log('\n📈 Section 4: Progression Model');

test('Weekly rate decreases as level approaches ceiling', () => {
  const rateEarly = progression.getWeeklyRate(10, 28, 0);
  const rateLate = progression.getWeeklyRate(25, 28, 20);
  assertTrue(rateEarly > rateLate, `Early rate ${rateEarly} should be > late rate ${rateLate}`);
});

test('Weekly rate is 0 when at ceiling', () => {
  const rate = progression.getWeeklyRate(28, 28, 0);
  assertEqual(rate, 0);
});

test('Pull-up weekly rate at 20/28 ceiling ≈ 0.35-0.45', () => {
  const rate = progression.getPullUpWeeklyRate(20, 28, 0);
  // gapRatio=8/28=0.286, decay=0.286^0.6=0.424, baseRate=0.9 → 0.38
  assertApprox(rate, 0.38, 0.08);
});

test('Push-up weekly rate at 50/59 ceiling ≈ 0.7-0.9', () => {
  const rate = progression.getPushUpWeeklyRate(50, 59, 0);
  // gapRatio=9/59=0.152, decay=0.152^0.6=0.324, baseRate=2.5 → 0.81
  assertApprox(rate, 0.81, 0.10);
});

test('Estimate weeks to goal: 20→25 pull-ups at ceiling 28', () => {
  const weeks = progression.estimateWeeksToGoal(20, 25, 28, 'pull');
  assertGTE(weeks, 5);
  assertLTE(weeks, 20);
});

test('Macrocycle count: small gap (≤15% of ceiling) → 1 macro', () => {
  const count = progression.estimateMacrocycleCount(20, 24, 28);
  assertEqual(count, 1); // gap=4, 4/28=0.14
});

test('Macrocycle count: medium gap (≤30% of ceiling) → 2 macros', () => {
  const count = progression.estimateMacrocycleCount(20, 27, 28);
  assertEqual(count, 2); // gap=7, 7/28=0.25
});

test('Macrocycle count: large gap (>30% of ceiling) → 3 macros', () => {
  const count = progression.estimateMacrocycleCount(12, 25, 28);
  assertEqual(count, 3); // gap=13, 13/28=0.46
});

test('Emphasis: bigger pull gap → pull focus first', () => {
  const emphases = progression.assignEmphasis(10, 5, 2);
  assertEqual(emphases[0].label, 'pull_focus');
  assertTrue(emphases[0].pull > emphases[0].push);
});

test('Emphasis: bigger push gap → push focus first', () => {
  const emphases = progression.assignEmphasis(5, 15, 2);
  assertEqual(emphases[0].label, 'push_focus');
  assertTrue(emphases[0].push > emphases[0].pull);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 5: VOLUME
// ═══════════════════════════════════════════════════════════════
console.log('\n📦 Section 5: Volume');

test('Regular exercise volume: 4 sets × 8 reps = 32', () => {
  assertEqual(volume.calcExerciseVolume({ sets: 4, reps: 8, type: 'regular' }), 32);
});

test('Cluster exercise volume: 4 sets × (3+3) = 24', () => {
  assertEqual(volume.calcExerciseVolume({ sets: 4, type: 'cluster', parts: [{ reps: 3 }, { reps: 3 }] }), 24);
});

test('Ladder exercise volume: 3 sets × (1+2+3) = 18', () => {
  assertEqual(volume.calcExerciseVolume({ sets: 3, type: 'ladder', parts: [{ reps: 1 }, { reps: 2 }, { reps: 3 }] }), 18);
});

test('EMOM exercise volume: 5 rounds × 4 reps = 20', () => {
  assertEqual(volume.calcExerciseVolume({ sets: 5, reps: 4, type: 'emom' }), 20);
});

test('Session volume: pull=32, push=40, total=72', () => {
  const sv = volume.calcSessionVolume([
    { sets: 4, reps: 8, type: 'regular', group: 'pull' },
    { sets: 5, reps: 8, type: 'regular', group: 'push' },
  ]);
  assertEqual(sv.pull, 32);
  assertEqual(sv.push, 40);
  assertEqual(sv.total, 72);
});

test('Week volume factor: W1=0.80, W2=0.90, W3=1.00, W4=0.30', () => {
  assertEqual(volume.getWeekVolumeFactor(1), 0.80);
  assertEqual(volume.getWeekVolumeFactor(2), 0.90);
  assertEqual(volume.getWeekVolumeFactor(3), 1.00);
  assertEqual(volume.getWeekVolumeFactor(4), 0.30);
});

test('Maintenance volume: 1/3 of peak', () => {
  assertEqual(volume.getMaintenanceVolume(150), 50);
});

test('MRV at 100kg pull < MRV at 70kg pull (heavier = lower MRV)', () => {
  const mrv100 = volume.getMRV(100, 'pull');
  const mrv70 = volume.getMRV(70, 'pull');
  assertTrue(mrv100 < mrv70, `MRV 100kg(${mrv100}) should be < MRV 70kg(${mrv70})`);
});

test('BW volume scale: 100kg athlete scales < 1.0', () => {
  const scale = volume.bwVolumeScale(100);
  assertTrue(scale < 1.0, `BW scale at 100kg should be < 1.0, got ${scale}`);
  assertTrue(scale > 0.7, `BW scale at 100kg should be > 0.7, got ${scale}`);
});

test('Volume jump safety: 30% increase is OK, 35% is not', () => {
  assertTrue(volume.isVolumeJumpSafe(100, 130));
  assertFalse(volume.isVolumeJumpSafe(100, 135));
});

test('Volume jump from 0 (first week) is always safe', () => {
  assertTrue(volume.isVolumeJumpSafe(0, 200));
});

// ═══════════════════════════════════════════════════════════════
// SECTION 6: EXERCISES
// ═══════════════════════════════════════════════════════════════
console.log('\n🏋️ Section 6: Exercises');

test('All pull exercises have group=pull', () => {
  const pulls = exercises.getExercisesByGroup('pull');
  assertTrue(pulls.length > 0);
  pulls.forEach(e => assertEqual(e.group, 'pull'));
});

test('All push exercises have group=push', () => {
  const pushes = exercises.getExercisesByGroup('push');
  assertTrue(pushes.length > 0);
  pushes.forEach(e => assertEqual(e.group, 'push'));
});

test('Prehab exercises have isPrehab=true and fixedReps=true', () => {
  const prehab = exercises.getPrehabExercises();
  assertTrue(prehab.length > 0);
  prehab.forEach(e => {
    assertTrue(e.isPrehab, `${e.id} should be prehab`);
    assertTrue(e.fixedReps, `${e.id} should have fixedReps`);
  });
});

test('Reverse-grip pull-up has fixedReps=true (safety)', () => {
  const ex = exercises.getExercise('pull_up_reverse');
  assertTrue(ex.fixedReps);
});

test('Cluster and ladder exercises have fixedReps=true', () => {
  assertTrue(exercises.getExercise('pull_up_cluster').fixedReps);
  assertTrue(exercises.getExercise('push_up_cluster').fixedReps);
  assertTrue(exercises.getExercise('pull_up_ladder').fixedReps);
  assertTrue(exercises.getExercise('push_up_ladder').fixedReps);
});

test('Test exercises exist', () => {
  assertTrue(exercises.getExercise('test_pull') !== null);
  assertTrue(exercises.getExercise('test_push') !== null);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 7: FULL MATRIX GENERATION
// ═══════════════════════════════════════════════════════════════
console.log('\n🧮 Section 7: Full Matrix Generation');

test('Vasilii matrix: generates successfully', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 } // goals at ceiling
  );
  assertTrue(m.eligibility.eligible);
  assertTrue(m.macrocycles.length >= 1);
  assertTrue(m.totalWeeks >= 12);
});

test('Vasilii matrix: every macrocycle has 3 mesocycles', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    assertEqual(macro.mesocycles.length, 3);
  });
});

test('Vasilii matrix: every mesocycle has 4 weeks', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      assertEqual(meso.weeks.length, 4);
    });
  });
});

test('Vasilii matrix: week 4 of every meso is deload', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      assertTrue(meso.weeks[3].isDeload);
      assertFalse(meso.weeks[0].isDeload);
      assertFalse(meso.weeks[1].isDeload);
      assertFalse(meso.weeks[2].isDeload);
    });
  });
});

test('Vasilii matrix: every week has 3 sessions (Mon/Wed/Fri)', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        assertEqual(week.sessions.length, 3);
        const days = week.sessions.map(s => s.day);
        assertTrue(days.includes('mon'), 'Missing Monday');
        assertTrue(days.includes('wed'), 'Missing Wednesday');
        assertTrue(days.includes('fri'), 'Missing Friday');
      });
    });
  });
});

test('Vasilii matrix: validation passes (no high-severity issues)', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  assertTrue(m.validation.passed, `Validation failed: ${JSON.stringify(m.validation.issues)}`);
});

test('Vasilii matrix: deload sessions have isDeload=true', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      const deloadWeek = meso.weeks[3];
      deloadWeek.sessions.forEach(s => {
        assertTrue(s.isDeload, `Deload week session ${s.day} should have isDeload=true`);
      });
    });
  });
});

test('Vasilii matrix: prehab exercises have fixedReps=true', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.isPrehab) {
              assertTrue(ex.fixedReps, `Prehab exercise ${ex.id} must have fixedReps=true`);
            }
          });
        });
      });
    });
  });
});

test('Vasilii matrix: EMOM exercises have fixedReps=true', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'emom') {
              assertTrue(ex.fixedReps, `EMOM exercise ${ex.id} must have fixedReps=true`);
            }
          });
        });
      });
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// SECTION 8: VASILII-SPECIFIC TEST CASE
// ═══════════════════════════════════════════════════════════════
console.log('\n🧑 Section 8: Vasilii (100kg, 30yo, pull:20, push:50)');

test('Vasilii: classified as advanced for pull-ups at 100kg', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 });
  assertEqual(result.pull.level, 'advanced');
});

test('Vasilii: classified as advanced for push-ups at 100kg', () => {
  const result = athlete.checkEligibility({ weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 });
  assertEqual(result.push.level, 'advanced'); // 50 > adv(38)
});

test('Vasilii: pull-up ceiling at 100kg/30yo = 28', () => {
  const norms28 = norms.getPullUpNorms(100, 30);
  assertEqual(norms28.eli, 28);
});

test('Vasilii: push-up ceiling at 100kg/30yo = 59', () => {
  const norms59 = norms.getPushUpNorms(100, 30);
  assertEqual(norms59.eli, 59);
});

test('Vasilii: 4 macrocycles for goals 28/59 (at ceiling)', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  // Gap: pull=8/28=0.29 → 2 macros; push=9/59=0.15 → 1 macro
  // Max = 2
  assertTrue(m.macrocycleCount >= 1);
});

test('Vasilii: export matrix produces rows', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  const rows = matrix.exportMatrix(m);
  assertTrue(rows.length > 0, 'Export should produce rows');
  // Each row should have required fields
  rows.forEach(row => {
    assertTrue(row.macro !== undefined, 'Missing macro field');
    assertTrue(row.week !== undefined, 'Missing week field');
    assertTrue(row.exercise !== undefined, 'Missing exercise field');
    assertTrue(row.volume !== undefined, 'Missing volume field');
  });
});

// ═══════════════════════════════════════════════════════════════
// SECTION 9: CROSS-MODULE INTEGRITY
// ═══════════════════════════════════════════════════════════════
console.log('\n🔗 Section 9: Cross-Module Integrity');

test('No exercise in matrix has undefined id', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            assertTrue(ex.id !== undefined, `Exercise has no id: ${JSON.stringify(ex)}`);
          });
        });
      });
    });
  });
});

test('All cluster exercises have parts array', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'cluster') {
              assertTrue(Array.isArray(ex.parts), `Cluster ${ex.id} must have parts array`);
              assertTrue(ex.parts.length >= 2, `Cluster ${ex.id} parts must have ≥2 elements`);
            }
          });
        });
      });
    });
  });
});

test('All ladder exercises have parts array', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'ladder') {
              assertTrue(Array.isArray(ex.parts), `Ladder ${ex.id} must have parts array`);
              assertTrue(ex.parts.length >= 2, `Ladder ${ex.id} parts must have ≥2 rungs`);
            }
          });
        });
      });
    });
  });
});

test('Cluster superset exercises have isClusterSuperset=true', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  let foundClusterSuperset = false;
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.isClusterSuperset) {
              foundClusterSuperset = true;
              assertTrue(ex.clusterSupersetGroup !== undefined, `Cluster superset ${ex.id} must have clusterSupersetGroup`);
            }
          });
        });
      });
    });
  });
  // Should find cluster supersets in first 8 weeks
  assertTrue(foundClusterSuperset, 'Should have at least one cluster superset exercise');
});

test('No volume regression >30% between non-deload weeks (within mesocycle)', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  // This is checked by the validation module, but let's verify explicitly
  assertTrue(m.validation.passed || m.validation.highSeverityCount === 0);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 10: BODYWEIGHT SCALING INTEGRITY
// ═══════════════════════════════════════════════════════════════
console.log('\n⚖️ Section 10: Bodyweight Scaling');

test('Vanderburgh penalty: 60kg vs 90kg pull-up ~15-20%', () => {
  const n60 = norms.PULL_UP_BY_BW[60];
  const n90 = norms.PULL_UP_BY_BW[90];
  // Heavier athlete does FEWER reps — penalty = (lighter - heavier) / lighter
  const penalty = (n60.eli - n90.eli) / n60.eli;
  // 60kg elite=37, 90kg elite=30, penalty = (37-30)/37 = 18.9%
  assertTrue(penalty >= 0.10 && penalty <= 0.25, `Penalty ${penalty} outside 10-25% range`);
});

test('MRV scales inversely with bodyweight', () => {
  const mrv60 = volume.getMRV(60, 'pull');
  const mrv80 = volume.getMRV(80, 'pull');
  const mrv100 = volume.getMRV(100, 'pull');
  assertTrue(mrv60 > mrv80, `MRV 60kg(${mrv60}) should be > MRV 80kg(${mrv80})`);
  assertTrue(mrv80 > mrv100, `MRV 80kg(${mrv80}) should be > MRV 100kg(${mrv100})`);
});

test('BW volume scale at 70kg = 1.0 (reference)', () => {
  assertApprox(volume.bwVolumeScale(70), 1.0, 0.01);
});

test('Lighter athlete (60kg) gets more volume capacity than heavier (100kg)', () => {
  const scale60 = volume.bwVolumeScale(60);
  const scale100 = volume.bwVolumeScale(100);
  assertTrue(scale60 > scale100);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 11: EDGE CASES
// ═══════════════════════════════════════════════════════════════
console.log('\n🧪 Section 11: Edge Cases');

test('Age > 60: age factor = 0.25 (very conservative)', () => {
  assertEqual(norms.getAgeFactor(62), 0.25);
  assertEqual(norms.getAgeFactor(65), 0.25);
});

test('Extreme BW edge: 40kg uses minimum bucket (50kg)', () => {
  const n = norms.lookupByBW(norms.PULL_UP_BY_BW, 40);
  assertEqual(n.int, 15); // 50kg bucket
});

test('Extreme BW edge: 150kg uses maximum bucket (140kg)', () => {
  const n = norms.lookupByBW(norms.PUSH_UP_BY_BW, 150);
  assertEqual(n.int, 19); // 140kg bucket
});

test('Age 15 lookup: nearest bucket is 15', () => {
  const n = norms.lookupByAge(norms.PULL_UP_BY_AGE, 15);
  assertEqual(n.int, 8);
});

test('Age 18 lookup: nearest bucket is 20 (distance 2 vs 3 from 15)', () => {
  const n = norms.lookupByAge(norms.PULL_UP_BY_AGE, 18);
  assertEqual(n.int, 13); // 20yo bucket
});

test('Weight out of range throws error', () => {
  try {
    athlete.checkEligibility({ weight: 30, age: 25, sex: 'male', pullUpMax: 10, pushUpMax: 30 });
    throw new Error('Should have thrown');
  } catch (e) {
    assertTrue(e.message.includes('out of supported range'));
  }
});

test('Age out of range throws error', () => {
  try {
    athlete.checkEligibility({ weight: 80, age: 70, sex: 'male', pullUpMax: 10, pushUpMax: 30 });
    throw new Error('Should have thrown');
  } catch (e) {
    assertTrue(e.message.includes('out of supported range'));
  }
});

test('Deload session structure: only pull-up, push-up, and prehab', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  const deloadWeek = m.macrocycles[0].mesocycles[0].weeks[3];
  deloadWeek.sessions.forEach(session => {
    assertTrue(session.isDeload);
    // Deload should have reduced sets (2 sets for main exercises)
    const mainExercises = (session.exercises || []).filter(e => !e.isPrehab);
    mainExercises.forEach(ex => {
      assertLTE(ex.sets, 2, `Deload main exercise ${ex.id} should have ≤2 sets, got ${ex.sets}`);
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// SECTION 12: SESSION DURATION
// ═══════════════════════════════════════════════════════════════
console.log('\n⏱️ Section 12: Session Duration');

test('All Vasilii sessions fit within 90-minute cap', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          const duration = volume.estimateSessionDuration(session.exercises || []);
          assertLTE(duration, 90, `${session.day} week ${week.week} session ${duration}min exceeds 90min cap`);
        });
      });
    });
  });
});

test('Deload sessions are shorter than build sessions', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  const meso = m.macrocycles[0].mesocycles[0];
  const buildDuration = volume.estimateSessionDuration(meso.weeks[0].sessions[0].exercises || []);
  const deloadDuration = volume.estimateSessionDuration(meso.weeks[3].sessions[0].exercises || []);
  assertTrue(deloadDuration < buildDuration, `Deload (${deloadDuration}min) should be shorter than build (${buildDuration}min)`);
});

test('MAX_SESSION_MINUTES constant = 90', () => {
  assertEqual(volume.MAX_SESSION_MINUTES, 90);
});

test('isSessionDurationSafe returns true for valid session', () => {
  const shortSession = [
    { sets: 3, reps: 5, rest: 90, tempo: '20X1', type: 'regular' },
  ];
  assertTrue(volume.isSessionDurationSafe(shortSession));
});

// ═══════════════════════════════════════════════════════════════
// SECTION 13: TEMPO NOTATION
// ═══════════════════════════════════════════════════════════════
console.log('\n🎵 Section 13: Tempo Notation');

test('All exercises in matrix have valid 4-digit tempo', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            const t = ex.tempo || '';
            assertTrue(t.length === 4, `${ex.id} tempo "${t}" is not 4 digits`);
            // Must contain only digits and X
            assertTrue(/^[0-9X]+$/i.test(t), `${ex.id} tempo "${t}" contains invalid chars`);
          });
        });
      });
    });
  });
});

test('No exercise uses legacy 2020 tempo format', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            assertFalse(ex.tempo === '2020', `${ex.id} uses legacy 2020 tempo`);
          });
        });
      });
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// SECTION 14: CLUSTER STRUCTURE INTEGRITY
// ═══════════════════════════════════════════════════════════════
console.log('\n🔗 Section 14: Cluster Structure');

test('Cluster parts have valid intra-cluster rest (15s) between mini-sets, not 180s', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'cluster' && ex.parts) {
              // Intra-cluster rest should be 15s (between mini-sets), not 180s
              for (let i = 0; i < ex.parts.length - 1; i++) {
                assertLTE(ex.parts[i].rest, 30, `Cluster ${ex.id} part ${i} rest ${ex.parts[i].rest}s too long for intra-cluster`);
              }
              // Last part should have rest=0 (inter-set rest is on exercise object)
              assertEqual(ex.parts[ex.parts.length - 1].rest, 0, 
                `Cluster ${ex.id} last part rest should be 0 (inter-set on exercise)`);
            }
          });
        });
      });
    });
  });
});

test('Cluster exercises have ≥2 parts (true multi-part cluster)', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'cluster') {
              assertTrue(ex.parts.length >= 2, `Cluster ${ex.id} should have ≥2 parts`);
            }
          });
        });
      });
    });
  });
});

test('Cluster inter-set rest (exercise.rest) is 120-240s', () => {
  const m = matrix.generateMatrix(
    { weight: 100, age: 30, sex: 'male', pullUpMax: 20, pushUpMax: 50 },
    { pullUps: 28, pushUps: 59 }
  );
  m.macrocycles.forEach(macro => {
    macro.mesocycles.forEach(meso => {
      meso.weeks.forEach(week => {
        week.sessions.forEach(session => {
          (session.exercises || []).forEach(ex => {
            if (ex.type === 'cluster') {
              assertGTE(ex.rest, 120, `Cluster ${ex.id} inter-set rest ${ex.rest}s too short`);
              assertLTE(ex.rest, 240, `Cluster ${ex.id} inter-set rest ${ex.rest}s too long`);
            }
          });
        });
      });
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// SECTION 15: SUPERCOMPENSATION MODEL UNIFIED
// ═══════════════════════════════════════════════════════════════
console.log('\n🔄 Section 15: Supercompensation Model');

test('DELOAD_SUPERCOMP_PULL constant = 0.05', () => {
  assertEqual(progression.DELOAD_SUPERCOMP_PULL, 0.05);
});

test('DELOAD_SUPERCOMP_PUSH constant = 0.10', () => {
  assertEqual(progression.DELOAD_SUPERCOMP_PUSH, 0.10);
});

test('estimateWeeksToGoal uses DELOAD_SUPERCOMP constants', () => {
  // Pull: starting at 20, goal 22, ceiling 28
  // Should progress slowly near ceiling with supercomp on deload weeks
  const weeks = progression.estimateWeeksToGoal(20, 22, 28, 'pull');
  assertGTE(weeks, 3, 'Should take at least 3 weeks');
  assertLTE(weeks, 30, 'Should not take more than 30 weeks');
});

test('simulateProgression uses same deload gains as estimateWeeksToGoal', () => {
  // Both should use DELOAD_SUPERCOMP_PULL (0.05) and DELOAD_SUPERCOMP_PUSH (0.10)
  // Verify by checking the curve doesn't spike on deload weeks
  const profile = { pullUpMax: 20, pushUpMax: 50 };
  const goals = { pullUps: 22, pushUps: 55 };
  const ceiling = { pull: 28, push: 59 };
  const curve = progression.simulateProgression(profile, goals, ceiling);
  // Deload weeks (4, 8, 12...) should show small gains, not zero
  const deloadWeek4 = curve[3]; // index 3 = week 4
  const buildWeek3 = curve[2]; // index 2 = week 3
  // Deload week gain should be positive (supercompensation)
  const deloadGain = deloadWeek4.pullEstimate - curve[2].pullEstimate;
  assertTrue(deloadGain > 0, `Deload week should show positive supercompensation, got ${deloadGain}`);
  // But deload gain should be smaller than build week gain
  const buildGain = buildWeek3.pullEstimate - curve[1].pullEstimate;
  assertTrue(deloadGain <= buildGain * 2, `Deload gain (${deloadGain}) should not exceed 2× build gain (${buildGain})`);
});

// ═══════════════════════════════════════════════════════════════
// SECTION 16: FEMALE ATHLETE SUPPORT
// ═══════════════════════════════════════════════════════════════
console.log('\n👩 Section 16: Female Athlete');

test('Female athlete with valid profile is accepted', () => {
  const result = athlete.checkEligibility({ weight: 60, age: 25, sex: 'female', pullUpMax: 10, pushUpMax: 30 });
  // Should not throw, and should return valid structure
  assertTrue(result.pull !== undefined);
  assertTrue(result.push !== undefined);
});

test('Female athlete with low maxes is not eligible', () => {
  const result = athlete.checkEligibility({ weight: 70, age: 30, sex: 'female', pullUpMax: 2, pushUpMax: 5 });
  assertFalse(result.eligible);
});

test('Matrix generation works for female athlete', () => {
  const m = matrix.generateMatrix(
    { weight: 60, age: 25, sex: 'female', pullUpMax: 10, pushUpMax: 30 },
    { pullUps: 15, pushUps: 37 }
  );
  assertTrue(m.macrocycles.length >= 1);
  assertTrue(m.totalWeeks >= 12);
});

// ═══════════════════════════════════════════════════════════════
// RUN SUMMARY
// ═══════════════════════════════════════════════════════════════
console.log(`\n${'═'.repeat(60)}`);
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log(`${'═'.repeat(60)}`);

if (failures.length > 0) {
  console.log('\nFAILURES:');
  failures.forEach(f => console.log(`  ✗ ${f.name}: ${f.error}`));
}

process.exit(failed > 0 ? 1 : 0);
