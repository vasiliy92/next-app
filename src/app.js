/**
 * app.js — Training Matrix: Gym-First Mobile Workout App
 * Redesigned for use DURING training: one session, big numbers, rest timer
 */

import './styles.css';
import { generateMatrix, exportMatrix } from '../matrix/src/matrix.js';
import { checkEligibility, validateGoals } from '../matrix/src/athlete.js';
import { getPullUpNorms, getPushUpNorms, getAgeFactor } from '../matrix/src/norms.js';
import { simulateProgression, estimateWeeksToGoal } from '../matrix/src/progression.js';
import { calcWeeklyVolume, getMRV, bwVolumeScale } from '../matrix/src/volume.js';

// ── State ───────────────────────────────────────────────────
let currentView = 'profile';
let matrixResult = null;
let selectedMacroIdx = 0;
let selectedMesoIdx = 0;
let selectedWeekIdx = 0;
let selectedDayIdx = 0; // 0=mon, 1=wed, 2=fri
let completedSets = {}; // key: "m0mes0w0d0ex3" → number of completed sets
let restTimer = { active: false, remaining: 0, interval: null, target: 0 };

// ── Persist completed sets ──────────────────────────────────
function saveProgress() {
  try { localStorage.setItem('tm_progress', JSON.stringify(completedSets)); } catch(e) {}
}
function loadProgress() {
  try { const d = localStorage.getItem('tm_progress'); if (d) completedSets = JSON.parse(d); } catch(e) {}
}
loadProgress();

// ── Day map ─────────────────────────────────────────────────
const DAY_KEYS = ['mon', 'wed', 'fri'];
const DAY_LABELS = { mon: 'Понедельник', wed: 'Среда', fri: 'Пятница' };
const DAY_SHORT = { mon: 'Пн', wed: 'Ср', fri: 'Пт' };
const LEVEL_LABELS = { beginner: 'Начинающий', novice: 'Новичок', intermediate: 'Средний', advanced: 'Продвинутый', elite: 'Элитный' };

// ── Get current session ─────────────────────────────────────
function getCurrentSession() {
  if (!matrixResult) return null;
  const macro = matrixResult.macrocycles[selectedMacroIdx];
  if (!macro) return null;
  const meso = macro.mesocycles[selectedMesoIdx];
  if (!meso) return null;
  const week = meso.weeks[selectedWeekIdx];
  if (!week) return null;
  const session = week.sessions[selectedDayIdx];
  return session || null;
}

function getSessionKey(exIdx) {
  return `m${selectedMacroIdx}mes${selectedMesoIdx}w${selectedWeekIdx}d${selectedDayIdx}ex${exIdx}`;
}

// ── Render ──────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app">
      <div class="app-content">
        ${currentView === 'today' ? renderTodayView() : ''}
        ${currentView === 'plan' ? renderPlanView() : ''}
        ${currentView === 'profile' ? renderProfileView() : ''}
        ${currentView === 'science' ? renderScienceView() : ''}
      </div>
      ${renderTabBar()}
    </div>
  `;
  bindEvents();
  restoreTimer();
}

// ── Tab Bar ─────────────────────────────────────────────────
function renderTabBar() {
  const tabs = [
    { id: 'today', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`, label: 'Тренировка' },
    { id: 'plan', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`, label: 'План' },
    { id: 'profile', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, label: 'Профиль' },
    { id: 'science', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`, label: 'Наука' },
  ];

  return `
    <nav class="tab-bar">
      ${tabs.map(t => `
        <button class="tab-item ${currentView === t.id ? 'active' : ''}" data-tab="${t.id}">
          ${t.icon}
          <span class="tab-label">${t.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// ── Today View ──────────────────────────────────────────────
function renderTodayView() {
  if (!matrixResult) {
    return `
      <div class="today-empty">
        <div class="today-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="today-empty-title">Нет активной программы</div>
        <div class="today-empty-hint">Заполните профиль и сгенерируйте программу</div>
        <button class="btn-primary-lg" data-tab="profile">Создать профиль</button>
      </div>
    `;
  }

  const session = getCurrentSession();
  if (!session) return '<div class="today-empty"><div class="today-empty-title">Сессия не найдена</div></div>';

  const { macrocycles, profile, goals } = matrixResult;
  const macro = macrocycles[selectedMacroIdx];
  const meso = macro.mesocycles[selectedMesoIdx];
  const week = meso.weeks[selectedWeekIdx];

  // Session info
  const emphasis = macro.emphasis;
  const weekLabel = `М${selectedMacroIdx + 1} · Мезо ${selectedMesoIdx + 1} · Нед ${selectedWeekIdx + 1}`;
  const isDeload = week.isDeload;

  // Calculate total completed
  const exercises = session.exercises || [];
  let totalSets = 0, completedCount = 0;
  exercises.forEach((ex, i) => {
    totalSets += ex.sets;
    completedCount += (completedSets[getSessionKey(i)] || 0);
  });

  return `
    <div class="today fade-in">
      <!-- Session Header -->
      <div class="session-top">
        <div class="session-day">${DAY_LABELS[session.day]}</div>
        <div class="session-meta">${weekLabel}${isDeload ? ' · Разгрузка' : ''}</div>
        <div class="session-emphasis">${emphasis.label === 'pull_focus' ? 'Акцент: подтягивания' : emphasis.label === 'push_focus' ? 'Акцент: отжимания' : 'Баланс'}</div>
      </div>

      <!-- Day Selector Pills -->
      <div class="day-pills">
        ${DAY_KEYS.map((d, i) => {
          const w = meso.weeks[selectedWeekIdx];
          const s = w.sessions[i];
          const isDel = s && s.isDeload;
          return `<button class="pill ${i === selectedDayIdx ? 'pill-active' : ''} ${isDel ? 'pill-deload' : ''}" data-day="${i}">${DAY_SHORT[d]}</button>`;
        }).join('')}
      </div>

      <!-- Week Navigator -->
      <div class="week-nav">
        <button class="nav-arrow" data-week-nav="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="week-nav-label">Неделя ${selectedWeekIdx + 1} / ${meso.weeks.length}</span>
        <button class="nav-arrow" data-week-nav="next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${totalSets > 0 ? Math.round(completedCount / totalSets * 100) : 0}%"></div>
      </div>
      <div class="progress-label">${completedCount} / ${totalSets} подходов</div>

      <!-- Exercise Cards -->
      <div class="exercise-list">
        ${exercises.map((ex, i) => renderExerciseCard(ex, i, isDeload)).join('')}
      </div>

      <!-- Rest Timer -->
      <div class="timer-section" id="timer-section">
        <div class="timer-display" id="timer-display">
          <span class="timer-time" id="timer-time">${formatTime(restTimer.remaining)}</span>
        </div>
        <div class="timer-controls">
          <button class="timer-btn" data-timer="90">1:30</button>
          <button class="timer-btn" data-timer="120">2:00</button>
          <button class="timer-btn" data-timer="180">3:00</button>
          <button class="timer-btn timer-start" data-timer="start">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>

      <!-- Export & Reset -->
      <div class="today-actions">
        <button class="btn-secondary" id="export-csv-btn">CSV</button>
        <button class="btn-secondary" id="reset-progress-btn">Сбросить прогресс</button>
      </div>
    </div>
  `;
}

// ── Exercise Card ───────────────────────────────────────────
function renderExerciseCard(ex, idx, isDeload) {
  const key = getSessionKey(idx);
  const done = completedSets[key] || 0;
  const allDone = done >= ex.sets;

  let repsDisplay = '';
  if (ex.type === 'cluster' && ex.parts) {
    repsDisplay = ex.parts.map(p => p.reps).join('+');
  } else if (ex.type === 'ladder' && ex.parts) {
    repsDisplay = ex.parts.map(p => p.reps).join('→');
  } else if (ex.type === 'emom') {
    repsDisplay = `${ex.reps} × ${ex.sets} р`;
  } else {
    repsDisplay = ex.reps;
  }

  let restDisplay = '';
  if (ex.type === 'emom') {
    restDisplay = 'EMOM 60с';
  } else if (ex.type === 'cluster' && ex.parts) {
    const intra = ex.parts[0] && ex.parts[0].rest ? ex.parts[0].rest : 15;
    restDisplay = `${intra}с / ${ex.rest}с`;
  } else {
    restDisplay = `${ex.rest}с`;
  }

  let typeTag = '';
  if (ex.type === 'cluster') typeTag = '<span class="tag tag-green">Кластер</span>';
  else if (ex.type === 'ladder') typeTag = '<span class="tag tag-blue">Лестница</span>';
  else if (ex.type === 'emom') typeTag = '<span class="tag tag-orange">EMOM</span>';
  else if (ex.isPrehab) typeTag = '<span class="tag tag-green">Прехаб</span>';
  else if (ex.type === 'test') typeTag = '<span class="tag tag-red">Тест</span>';

  let groupTag = ex.group === 'pull'
    ? '<span class="tag tag-purple">Подтяг</span>'
    : '<span class="tag tag-teal">Отжим</span>';

  let supersetTag = '';
  if (ex.supersetGroup) supersetTag = `<span class="tag tag-gray">Суперсет ${ex.supersetGroup}</span>`;
  if (ex.isClusterSuperset) supersetTag = '<span class="tag tag-green">Кластер-суперсет</span>';

  return `
    <div class="ex-card ${allDone ? 'ex-done' : ''} ${isDeload ? 'ex-deload' : ''}" data-ex="${idx}">
      <div class="ex-card-top">
        <div class="ex-tags">${typeTag}${groupTag}${supersetTag}</div>
        ${allDone ? '<div class="ex-check">&#10003;</div>' : ''}
      </div>
      <div class="ex-name">${ex.name}</div>
      <div class="ex-numbers">
        <div class="ex-sets-reps">
          <span class="ex-sets">${ex.sets}</span>
          <span class="ex-x">×</span>
          <span class="ex-reps">${repsDisplay}</span>
        </div>
        <div class="ex-details">
          <span class="ex-detail">Темп ${ex.tempo || '—'}</span>
          <span class="ex-detail">Отдых ${restDisplay}</span>
        </div>
      </div>
      <!-- Set Circles -->
      <div class="ex-sets-track">
        ${Array.from({ length: ex.sets }, (_, s) => `
          <button class="set-circle ${s < done ? 'set-done' : ''}" data-set="${s}" data-ex-key="${key}" data-rest="${ex.rest}">
            ${s < done ? '&#10003;' : (s + 1)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// ── Plan View ───────────────────────────────────────────────
function renderPlanView() {
  if (!matrixResult) {
    return `
      <div class="today-empty">
        <div class="today-empty-title">Программа не создана</div>
        <button class="btn-primary-lg" data-tab="profile">Создать профиль</button>
      </div>
    `;
  }

  const { macrocycles, profile, goals, originalGoals, eligibility, goalValidation, ceilings, macrocycleCount, emphases, totalWeeks, progression, validation } = matrixResult;

  return `
    <div class="plan fade-in">
      <div class="plan-header">
        <div class="plan-title">Программа</div>
        <div class="plan-subtitle">${profile.weight} кг · ${profile.age} лет · ${goals.pullUps} / ${goals.pushUps}</div>
      </div>

      <!-- Eligibility -->
      ${renderEligibilityBadge(eligibility)}
      ${renderGoalWarnings(goalValidation, originalGoals)}

      <!-- Key Stats -->
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-num">${macrocycleCount}</div>
          <div class="stat-lbl">Макроциклов</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${totalWeeks}</div>
          <div class="stat-lbl">Недель</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${ceilings.pull}</div>
          <div class="stat-lbl">Макс подтяг</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${ceilings.push}</div>
          <div class="stat-lbl">Макс отжим</div>
        </div>
      </div>

      <!-- Emphasis -->
      <div class="plan-section">
        <div class="plan-section-title">Акценты по макроциклам</div>
        <div class="emphasis-list">
          ${emphases.map((e, i) => `
            <div class="emphasis-item">
              <span class="emphasis-num">М${i + 1}</span>
              <span class="emphasis-label">${e.label === 'pull_focus' ? 'Подтягивания' : e.label === 'push_focus' ? 'Отжимания' : 'Баланс'}</span>
              <span class="emphasis-ratio">${Math.round(e.pull * 100 / (e.pull + e.push))}%/${Math.round(e.push * 100 / (e.pull + e.push))}%</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Progression Chart -->
      <div class="plan-section">
        <div class="plan-section-title">Прогрессия</div>
        <div class="chart-container">
          ${renderProgressionChart(progression, goals, ceilings)}
        </div>
      </div>

      <!-- Macrocycle Accordion -->
      <div class="plan-section">
        <div class="plan-section-title">Макроциклы</div>
        ${macrocycles.map((macro, i) => renderMacrocycleAccordion(macro, i)).join('')}
      </div>

      <!-- Validation -->
      <div class="plan-section">
        <div class="plan-section-title">Валидация</div>
        ${renderValidationBadge(validation)}
      </div>

      <div class="plan-actions">
        <button class="btn-secondary" id="export-csv-btn">Экспорт CSV</button>
      </div>
    </div>
  `;
}

// ── Macrocycle Accordion ────────────────────────────────────
function renderMacrocycleAccordion(macro, macroIdx) {
  const isOpen = macroIdx === selectedMacroIdx;
  return `
    <div class="macro-accordion">
      <button class="macro-header ${isOpen ? 'open' : ''}" data-macro-toggle="${macroIdx}">
        <span class="macro-label">Макроцикл ${macroIdx + 1}</span>
        <span class="macro-emphasis">${macro.emphasis.label === 'pull_focus' ? 'Подтяг' : macro.emphasis.label === 'push_focus' ? 'Отжим' : 'Баланс'}</span>
        <svg class="macro-chevron ${isOpen ? 'rotated' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      ${isOpen ? renderMesoList(macro, macroIdx) : ''}
    </div>
  `;
}

function renderMesoList(macro, macroIdx) {
  return `
    <div class="meso-list">
      ${macro.mesocycles.map((meso, mesoIdx) => `
        <div class="meso-item">
          <div class="meso-label">Мезоцикл ${mesoIdx + 1}</div>
          ${meso.weeks.map((week, weekIdx) => `
            <div class="week-row ${week.isDeload ? 'week-deload' : ''}">
              <span class="week-label">Нед ${weekIdx + 1}${week.isDeload ? ' (разгрузка)' : ''}</span>
              <div class="week-days">
                ${DAY_KEYS.map((d, dayIdx) => {
                  const s = week.sessions[dayIdx];
                  const exCount = s ? (s.exercises || []).length : 0;
                  return `<button class="day-btn" data-goto="m${macroIdx}me${mesoIdx}w${weekIdx}d${dayIdx}">${DAY_SHORT[d]}<span class="day-ex-count">${exCount}</span></button>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

// ── Profile View ────────────────────────────────────────────
function renderProfileView() {
  return `
    <div class="profile fade-in">
      <div class="profile-title">Профиль атлета</div>

      <div class="form-section">
        <div class="form-row">
          <div class="field">
            <label class="field-label">Вес (кг)</label>
            <input type="number" class="field-input" id="weight" placeholder="100" min="40" max="150" value="100" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Возраст</label>
            <input type="number" class="field-input" id="age" placeholder="30" min="15" max="65" value="30" inputmode="numeric">
          </div>
        </div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Пол</label>
            <select class="field-input" id="sex">
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
        </div>
        <div class="form-divider"></div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Макс. подтягивания</label>
            <input type="number" class="field-input" id="pullUpMax" placeholder="20" min="0" max="60" value="20" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Макс. отжимания</label>
            <input type="number" class="field-input" id="pushUpMax" placeholder="50" min="0" max="200" value="50" inputmode="numeric">
          </div>
        </div>
        <div class="form-divider"></div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Цель: подтягивания</label>
            <input type="number" class="field-input" id="goalPull" placeholder="28" min="0" max="60" value="28" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Цель: отжимания</label>
            <input type="number" class="field-input" id="goalPush" placeholder="81" min="0" max="200" value="81" inputmode="numeric">
          </div>
        </div>
      </div>

      <button class="btn-primary-lg" id="generate-btn">Сгенерировать программу</button>

      <div id="eligibility-result"></div>
    </div>
  `;
}

// ── Science View ────────────────────────────────────────────
function renderScienceView() {
  return `
    <div class="science fade-in">
      <div class="science-title">Научная база</div>

      <div class="science-section">
        <div class="science-section-title">Нормативы: подтягивания</div>
        <div class="norms-table-wrap">
          <table class="norms-table">
            <thead><tr><th>Вес</th><th>Нов</th><th>Сред</th><th>Прод</th><th>Элит</th></tr></thead>
            <tbody>
              ${[70, 80, 90, 100, 110, 120].map(bw => {
                const n = getPullUpNorms(bw, 30);
                return `<tr><td>${bw}</td><td>${n.nov}</td><td>${n.int}</td><td>${n.adv}</td><td>${n.eli}</td></tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="norms-source">Муж., 30 лет. Strength Level (4.8M lifts)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Нормативы: отжимания</div>
        <div class="norms-table-wrap">
          <table class="norms-table">
            <thead><tr><th>Вес</th><th>Нов</th><th>Сред</th><th>Прод</th><th>Элит</th></tr></thead>
            <tbody>
              ${[70, 80, 90, 100, 110, 120].map(bw => {
                const n = getPushUpNorms(bw, 30);
                return `<tr><td>${bw}</td><td>${n.nov}</td><td>${n.int}</td><td>${n.adv}</td><td>${n.eli}</td></tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="norms-source">Муж., 30 лет. Strength Level (2.9M lifts)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Факторы возраста</div>
        <div class="age-factors">
          <div class="age-row"><span>20–40</span><span>1.00</span></div>
          <div class="age-row"><span>41–45</span><span>0.85</span></div>
          <div class="age-row"><span>46–50</span><span>0.65</span></div>
          <div class="age-row"><span>51–55</span><span>0.50</span></div>
          <div class="age-row"><span>56–60</span><span>0.30</span></div>
        </div>
        <div class="norms-source">Kjaer et al. (2016)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Потолок целей</div>
        <div class="science-text">Потолок — 95-й перцентиль (Elite). По данным Strength Level (4.8M + 2.9M lifts), лишь 5% спортсменов данного веса достигают этого результата. Цели выше потолка ограничены 95% его значения.</div>
        <div class="science-text"><strong>Почему 100 отжиманий при 100 кг нереалистичны?</strong> Элитный результат для 100 кг — 81 отжимание (Strength Level, 2.9M lifts). 100 отжиманий = 123-й перцентиль. 100 отжиманий реально при ~60–65 кг (элитный: 95–102).</div>
        <div class="science-text"><strong>Schoenfeld et al. (2023)</strong>: мышечная адаптация имеет логарифмическую кривую. Ближе к потолку прогресс резко замедляется. 95% — граница, за которой нет доказательной базы.</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Исследования</div>
        <div class="refs-list">
          <div class="ref-item"><strong>Vanderburgh (2006, 2007)</strong> — Allometric scaling: 1RM ~ M<sup>2/3</sup></div>
          <div class="ref-item"><strong>Sanchez-Moreno et al. (2016)</strong> — Pull-ups: r = −0.55 with body mass</div>
          <div class="ref-item"><strong>Yu et al. (2021)</strong> — Cluster sets: SMD=0.24 (wks 1-8), SMD=−1.54 (after wk 8)</div>
          <div class="ref-item"><strong>Schoenfeld et al. (2023)</strong> — Finite muscular adaptation, logarithmic curve</div>
          <div class="ref-item"><strong>Rhea et al.; Barsuhn et al. (2024)</strong> — ~1/3 peak volume maintains qualities</div>
          <div class="ref-item"><strong>Kjaer et al. (2016)</strong> — Age × MSMF: Beta = −0.15 to −0.91/year</div>
          <div class="ref-item"><strong>Strength Level</strong> — Normative data: 4.8M + 2.9M lifts</div>
        </div>
      </div>
    </div>
  `;
}

// ── Eligibility Badge ──────────────────────────────────────
function renderEligibilityBadge(eligibility) {
  if (eligibility.eligible) {
    return `
      <div class="badge-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Допуск получен</span>
        <span class="badge-detail">Подтяг: ${eligibility.pull.max} (${LEVEL_LABELS[eligibility.pull.level]}) · Отжим: ${eligibility.push.max} (${LEVEL_LABELS[eligibility.push.level]})</span>
      </div>
    `;
  }
  return `
    <div class="badge-error">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      <span>Недостаточный уровень</span>
      <span class="badge-detail">Порог: подтяг ≥${eligibility.pull.threshold}, отжим ≥${eligibility.push.threshold}</span>
    </div>
  `;
}

// ── Goal Warnings ──────────────────────────────────────────
function renderGoalWarnings(gv, original) {
  const warnings = [];
  if (gv.pull.warning === 'approaching_ceiling') warnings.push(`Подтяг: цель близка к потолку (${Math.round(gv.pull.ratio * 100)}%)`);
  if (gv.pull.warning === 'capped_at_95pct_ceiling') warnings.push(`Подтяг: ${original.pullUps} → ограничено до ${gv.pull.capped}`);
  if (gv.push.warning === 'approaching_ceiling') warnings.push(`Отжим: цель близка к потолку (${Math.round(gv.push.ratio * 100)}%)`);
  if (gv.push.warning === 'capped_at_95pct_ceiling') warnings.push(`Отжим: ${original.pushUps} → ограничено до ${gv.push.capped}`);
  if (warnings.length === 0) return '';
  return `<div class="badge-warning">${warnings.map(w => `<span>${w}</span>`).join('')}</div>`;
}

// ── Validation Badge ──────────────────────────────────────
function renderValidationBadge(validation) {
  if (validation.passed) {
    return '<div class="badge-success"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Валидация пройдена</span></div>';
  }
  const high = validation.issues.filter(i => i.severity === 'high').length;
  const med = validation.issues.filter(i => i.severity === 'medium').length;
  return `<div class="badge-error"><span>${high} крит., ${med} средних</span></div>`;
}

// ── Progression Chart (SVG) ────────────────────────────────
function renderProgressionChart(progression, goals, ceilings) {
  if (!progression || progression.length === 0) return '<div class="chart-empty">Нет данных прогрессии</div>';

  const w = 320, h = 140, pad = 30;
  const maxWeeks = progression.length;
  const maxReps = Math.max(ceilings.pull, ceilings.push, ...progression.map(p => Math.max(p.pull, p.push)));
  const scaleW = (w - pad * 2) / Math.max(maxWeeks - 1, 1);
  const scaleH = (h - pad * 2) / maxReps;

  const pullPts = progression.map((p, i) => `${pad + i * scaleW},${h - pad - p.pull * scaleH}`).join(' ');
  const pushPts = progression.map((p, i) => `${pad + i * scaleW},${h - pad - p.push * scaleH}`).join(' ');

  const pullCeilY = h - pad - ceilings.pull * scaleH;
  const pushCeilY = h - pad - ceilings.push * scaleH;

  return `
    <svg class="chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
      <!-- Ceiling lines -->
      <line x1="${pad}" y1="${pullCeilY}" x2="${w - pad}" y2="${pullCeilY}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
      <line x1="${pad}" y1="${pushCeilY}" x2="${w - pad}" y2="${pushCeilY}" stroke="var(--teal)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
      <!-- Ceiling labels -->
      <text x="${w - pad + 3}" y="${pullCeilY + 4}" fill="var(--accent)" font-size="9" font-family="var(--font-mono)">${ceilings.pull}</text>
      <text x="${w - pad + 3}" y="${pushCeilY + 4}" fill="var(--teal)" font-size="9" font-family="var(--font-mono)">${ceilings.push}</text>
      <!-- Pull line -->
      <polyline points="${pullPts}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Push line -->
      <polyline points="${pushPts}" fill="none" stroke="var(--teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Axes -->
      <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h - pad}" stroke="var(--border)" stroke-width="1"/>
      <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="var(--border)" stroke-width="1"/>
      <!-- Legend -->
      <circle cx="${pad + 10}" cy="${pad + 10}" r="4" fill="var(--accent)"/>
      <text x="${pad + 18}" y="${pad + 13}" fill="var(--fg-secondary)" font-size="9">Подтяг</text>
      <circle cx="${pad + 70}" cy="${pad + 10}" r="4" fill="var(--teal)"/>
      <text x="${pad + 78}" y="${pad + 13}" fill="var(--fg-secondary)" font-size="9">Отжим</text>
    </svg>
  `;
}

// ── Timer ──────────────────────────────────────────────────
function formatTime(seconds) {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function startTimer(seconds) {
  clearInterval(restTimer.interval);
  restTimer.active = true;
  restTimer.remaining = seconds;
  restTimer.target = seconds;

  restTimer.interval = setInterval(() => {
    restTimer.remaining--;
    const el = document.getElementById('timer-time');
    if (el) el.textContent = formatTime(restTimer.remaining);
    if (restTimer.remaining <= 0) {
      clearInterval(restTimer.interval);
      restTimer.active = false;
      const el2 = document.getElementById('timer-time');
      if (el2) el2.textContent = '0:00';
      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }
  }, 1000);

  const el = document.getElementById('timer-time');
  if (el) el.textContent = formatTime(restTimer.remaining);
}

function restoreTimer() {
  if (restTimer.active) {
    const el = document.getElementById('timer-time');
    if (el) el.textContent = formatTime(restTimer.remaining);
  }
}

// ── Event Binding ──────────────────────────────────────────
function bindEvents() {
  // Tab bar
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentView = btn.dataset.tab;
      render();
    });
  });

  // Generate button
  const genBtn = document.getElementById('generate-btn');
  if (genBtn) genBtn.addEventListener('click', handleGenerate);

  // Day pills
  document.querySelectorAll('[data-day]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDayIdx = parseInt(btn.dataset.day);
      render();
    });
  });

  // Week navigation
  document.querySelectorAll('[data-week-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const macro = matrixResult.macrocycles[selectedMacroIdx];
      const meso = macro.mesocycles[selectedMesoIdx];
      if (btn.dataset.weekNav === 'prev' && selectedWeekIdx > 0) selectedWeekIdx--;
      if (btn.dataset.weekNav === 'next' && selectedWeekIdx < meso.weeks.length - 1) selectedWeekIdx++;
      render();
    });
  });

  // Set circles — track completion
  document.querySelectorAll('.set-circle').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.exKey;
      const setIdx = parseInt(btn.dataset.set);
      const rest = parseInt(btn.dataset.rest) || 90;
      const current = completedSets[key] || 0;

      if (setIdx < current) {
        // Undo
        completedSets[key] = setIdx;
      } else if (setIdx === current) {
        // Complete this set
        completedSets[key] = setIdx + 1;
        // Auto-start rest timer
        startTimer(rest);
      }
      saveProgress();
      render();
    });
  });

  // Timer buttons
  document.querySelectorAll('[data-timer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.timer;
      if (val === 'start') {
        startTimer(restTimer.target || 90);
      } else {
        startTimer(parseInt(val));
      }
    });
  });

  // Macro accordion
  document.querySelectorAll('[data-macro-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.macroToggle);
      selectedMacroIdx = idx;
      selectedMesoIdx = 0;
      selectedWeekIdx = 0;
      render();
    });
  });

  // Goto session from plan
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parts = btn.dataset.goto.match(/m(\d+)me(\d+)w(\d+)d(\d+)/);
      if (parts) {
        selectedMacroIdx = parseInt(parts[1]);
        selectedMesoIdx = parseInt(parts[2]);
        selectedWeekIdx = parseInt(parts[3]);
        selectedDayIdx = parseInt(parts[4]);
        currentView = 'today';
        render();
      }
    });
  });

  // CSV export
  const exportBtn = document.getElementById('export-csv-btn');
  if (exportBtn) exportBtn.addEventListener('click', handleExportCSV);

  // Reset progress
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      completedSets = {};
      saveProgress();
      render();
    });
  }
}

// ── Generate Handler ───────────────────────────────────────
function handleGenerate() {
  const weight = parseInt(document.getElementById('weight').value) || 100;
  const age = parseInt(document.getElementById('age').value) || 30;
  const sex = document.getElementById('sex').value || 'male';
  const pullUpMax = parseInt(document.getElementById('pullUpMax').value) || 0;
  const pushUpMax = parseInt(document.getElementById('pushUpMax').value) || 0;
  const goalPull = parseInt(document.getElementById('goalPull').value) || 0;
  const goalPush = parseInt(document.getElementById('goalPush').value) || 0;

  const profile = { weight, age, sex, pullUpMax, pushUpMax };
  const goals = { pullUps: goalPull, pushUps: goalPush };

  const eligibility = checkEligibility(profile);
  const resultDiv = document.getElementById('eligibility-result');

  if (!eligibility.eligible) {
    resultDiv.innerHTML = renderEligibilityBadge(eligibility);
    matrixResult = null;
    return;
  }

  try {
    matrixResult = generateMatrix(profile, goals);
    completedSets = {};
    saveProgress();
    selectedMacroIdx = 0;
    selectedMesoIdx = 0;
    selectedWeekIdx = 0;
    selectedDayIdx = 0;
    currentView = 'today';
    render();
  } catch (e) {
    resultDiv.innerHTML = `<div class="badge-error"><span>Ошибка: ${e.message}</span></div>`;
  }
}

// ── CSV Export ─────────────────────────────────────────────
function handleExportCSV() {
  if (!matrixResult) return;
  const rows = exportMatrix(matrixResult);
  const headers = ['macro','meso','week','weekInMeso','isDeload','day','exercise','exerciseEn','group','type','sets','reps','volume','rest','tempo','isPrehab','fixedReps','supersetGroup','emphasis'];
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(h => {
      const val = row[h];
      if (typeof val === 'string' && val.includes(',')) return '"' + val + '"';
      return val;
    }).join(','))
  ].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'training-matrix-' + matrixResult.profile.weight + 'kg.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Init ───────────────────────────────────────────────────
render();
