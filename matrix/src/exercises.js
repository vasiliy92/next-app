/**
 * exercises.js — Exercise database
 * 
 * Each exercise has: id, name, group (pull/push/core), type (regular/cluster/ladder/emom),
 * difficulty, muscles, isPrehab, fixedReps
 */

export const EXERCISES = {
  // ── PULL exercises ───────────────────────────────────────────
  pull_up: {
    id: 'pull_up',
    name: 'Подтягивания',
    nameEn: 'Pull-ups',
    group: 'pull',
    type: 'regular',
    difficulty: 1,
    muscles: ['latissimus', 'biceps', 'rhomboids', 'core'],
    isPrehab: false,
    fixedReps: false,
  },
  
  pull_up_reverse: {
    id: 'pull_up_reverse',
    name: 'Подтягивания обратным хватом',
    nameEn: 'Reverse-grip pull-ups',
    group: 'pull',
    type: 'regular',
    difficulty: 1,
    muscles: ['latissimus', 'biceps', 'rhomboids'],
    isPrehab: false,
    fixedReps: true, // safety limit at high BW
  },
  
  pull_up_wide: {
    id: 'pull_up_wide',
    name: 'Подтягивания широким хватом',
    nameEn: 'Wide-grip pull-ups',
    group: 'pull',
    type: 'regular',
    difficulty: 2,
    muscles: ['latissimus', 'teres_major', 'rhomboids'],
    isPrehab: false,
    fixedReps: false,
  },
  
  pull_up_cluster: {
    id: 'pull_up_cluster',
    name: 'Подтягивания (кластер)',
    nameEn: 'Pull-ups (cluster)',
    group: 'pull',
    type: 'cluster',
    difficulty: 2,
    muscles: ['latissimus', 'biceps', 'rhomboids', 'core'],
    isPrehab: false,
    fixedReps: true, // cluster reps are fixed
  },
  
  pull_up_ladder: {
    id: 'pull_up_ladder',
    name: 'Подтягивания (лестница)',
    nameEn: 'Pull-ups (ladder)',
    group: 'pull',
    type: 'ladder',
    difficulty: 2,
    muscles: ['latissimus', 'biceps', 'rhomboids', 'core'],
    isPrehab: false,
    fixedReps: true, // ladder rungs are fixed
  },
  
  chin_up: {
    id: 'chin_up',
    name: 'Подтягивания параллельным хватом',
    nameEn: 'Chin-ups (parallel/neutral grip)',
    group: 'pull',
    type: 'regular',
    difficulty: 1,
    muscles: ['latissimus', 'biceps', 'brachialis'],
    isPrehab: false,
    fixedReps: false,
  },
  
  australian_pull: {
    id: 'australian_pull',
    name: 'Австралийские подтягивания',
    nameEn: 'Australian pull-ups (inverted rows)',
    group: 'pull',
    type: 'regular',
    difficulty: 0,
    muscles: ['latissimus', 'rhomboids', 'rear_delts'],
    isPrehab: false,
    fixedReps: false,
  },
  
  // ── PUSH exercises ──────────────────────────────────────────
  push_up: {
    id: 'push_up',
    name: 'Отжимания',
    nameEn: 'Push-ups',
    group: 'push',
    type: 'regular',
    difficulty: 1,
    muscles: ['pectoralis', 'anterior_deltoid', 'triceps'],
    isPrehab: false,
    fixedReps: false,
  },
  
  push_up_cluster: {
    id: 'push_up_cluster',
    name: 'Отжимания (кластер)',
    nameEn: 'Push-ups (cluster)',
    group: 'push',
    type: 'cluster',
    difficulty: 2,
    muscles: ['pectoralis', 'anterior_deltoid', 'triceps'],
    isPrehab: false,
    fixedReps: true,
  },
  
  push_up_ladder: {
    id: 'push_up_ladder',
    name: 'Отжимания (лестница)',
    nameEn: 'Push-ups (ladder)',
    group: 'push',
    type: 'ladder',
    difficulty: 2,
    muscles: ['pectoralis', 'anterior_deltoid', 'triceps'],
    isPrehab: false,
    fixedReps: true,
  },
  
  push_up_wide: {
    id: 'push_up_wide',
    name: 'Отжимания широким хватом',
    nameEn: 'Wide push-ups',
    group: 'push',
    type: 'regular',
    difficulty: 1,
    muscles: ['pectoralis', 'anterior_deltoid'],
    isPrehab: false,
    fixedReps: false,
  },
  
  push_up_diamond: {
    id: 'push_up_diamond',
    name: 'Алмазные отжимания',
    nameEn: 'Diamond push-ups',
    group: 'push',
    type: 'regular',
    difficulty: 2,
    muscles: ['triceps', 'anterior_deltoid', 'pectoralis'],
    isPrehab: false,
    fixedReps: false,
  },
  
  push_up_decline: {
    id: 'push_up_decline',
    name: 'Отжимания ноги сверху',
    nameEn: 'Decline push-ups',
    group: 'push',
    type: 'regular',
    difficulty: 2,
    muscles: ['anterior_deltoid', 'upper_pectoralis', 'triceps'],
    isPrehab: false,
    fixedReps: false,
  },
  
  push_up_archer: {
    id: 'push_up_archer',
    name: 'Отжимания лучника',
    nameEn: 'Archer push-ups',
    group: 'push',
    type: 'regular',
    difficulty: 3,
    muscles: ['pectoralis', 'anterior_deltoid', 'triceps', 'core'],
    isPrehab: false,
    fixedReps: true, // high difficulty, fixed low reps
  },
  
  // ── PREHAB / ACCESSORY ───────────────────────────────────────
  face_pull: {
    id: 'face_pull',
    name: 'Фейс-пулл с эспандером',
    nameEn: 'Band face pull',
    group: 'pull',
    type: 'regular',
    difficulty: 0,
    muscles: ['rear_delts', 'rotator_cuff', 'mid_traps'],
    isPrehab: true,
    fixedReps: true,
  },
  
  y_raise: {
    id: 'y_raise',
    name: 'Y-подъёмы',
    nameEn: 'Y-raises',
    group: 'pull',
    type: 'regular',
    difficulty: 0,
    muscles: ['lower_traps', 'rotator_cuff'],
    isPrehab: true,
    fixedReps: true,
  },
  
  external_rotation: {
    id: 'external_rotation',
    name: 'Внешняя ротация плеча',
    nameEn: 'Shoulder external rotation',
    group: 'pull',
    type: 'regular',
    difficulty: 0,
    muscles: ['rotator_cuff', 'infraspinatus'],
    isPrehab: true,
    fixedReps: true,
  },
  
  scapular_pull: {
    id: 'scapular_pull',
    name: 'Скапулярные подтягивания',
    nameEn: 'Scapular pull-ups',
    group: 'pull',
    type: 'regular',
    difficulty: 0,
    muscles: ['lower_traps', 'serratus_anterior'],
    isPrehab: true,
    fixedReps: true,
  },
  
  // ── TEST exercises ──────────────────────────────────────────
  test_pull: {
    id: 'test_pull',
    name: 'Тест: макс. подтягивания',
    nameEn: 'Test: max pull-ups',
    group: 'pull',
    type: 'test',
    difficulty: 0,
    muscles: [],
    isPrehab: false,
    fixedReps: true,
  },
  
  test_push: {
    id: 'test_push',
    name: 'Тест: макс. отжимания',
    nameEn: 'Test: max push-ups',
    group: 'push',
    type: 'test',
    difficulty: 0,
    muscles: [],
    isPrehab: false,
    fixedReps: true,
  },
};

// ── Get exercise by ID ─────────────────────────────────────────
export function getExercise(id) {
  return EXERCISES[id] || null;
}

// ── Get exercises by group ─────────────────────────────────────
export function getExercisesByGroup(group) {
  return Object.values(EXERCISES).filter(e => e.group === group);
}

// ── Get prehab exercises ───────────────────────────────────────
export function getPrehabExercises() {
  return Object.values(EXERCISES).filter(e => e.isPrehab);
}
