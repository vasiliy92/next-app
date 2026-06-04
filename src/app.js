/**
 * app.js — Training Matrix Application
 * Notion-style minimalist light UI
 */

import './styles.css';
import { generateMatrix, exportMatrix } from '../matrix/src/matrix.js';
import { checkEligibility, validateGoals } from '../matrix/src/athlete.js';
import { getPullUpNorms, getPushUpNorms, getAgeFactor } from '../matrix/src/norms.js';
import { simulateProgression, estimateWeeksToGoal } from '../matrix/src/progression.js';
import { calcWeeklyVolume, getMRV, bwVolumeScale } from '../matrix/src/volume.js';

// ── State ───────────────────────────────────────────────────
let currentView = 'input';
let matrixResult = null;

// ── Render ──────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-container">
      ${renderSidebar()}
      <div class="main-content">
        ${currentView === 'input' ? renderInputPage() : ''}
        ${currentView === 'program' ? renderProgramPage() : ''}
        ${currentView === 'science' ? renderSciencePage() : ''}
      </div>
    </div>
  `;
  bindEvents();
}

// ── Sidebar ─────────────────────────────────────────────────
function renderSidebar() {
  const navItems = [
    { id: 'input', icon: '&#128221;', label: 'Профиль' },
    { id: 'program', icon: '&#127947;', label: 'Программа' },
    { id: 'science', icon: '&#128300;', label: 'Наука' },
  ];

  return `
    <nav class="sidebar">
      <div class="sidebar-title">Training Matrix</div>
      <ul class="sidebar-nav">
        ${navItems.map(item => `
          <li>
            <a href="#" data-nav="${item.id}" class="${currentView === item.id ? 'active' : ''}">
              <span class="nav-icon">${item.icon}</span>
              ${item.label}
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

// ── Input Page ──────────────────────────────────────────────
function renderInputPage() {
  return `
    <div class="page fade-in">
      <h1 class="page-title">Профиль атлета</h1>
      <p class="page-subtitle">Введите параметры для генерации адаптивной программы тренировок</p>

      <div class="form-grid" id="athlete-form">
        <div class="form-group">
          <label class="form-label">Вес (кг)</label>
          <input type="number" class="form-input" id="weight" placeholder="100" min="40" max="150" value="100">
        </div>
        <div class="form-group">
          <label class="form-label">Возраст</label>
          <input type="number" class="form-input" id="age" placeholder="30" min="15" max="65" value="30">
        </div>
        <div class="form-group">
          <label class="form-label">Пол</label>
          <select class="form-input" id="sex">
            <option value="male">Мужской</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Макс. подтягивания</label>
          <input type="number" class="form-input" id="pullUpMax" placeholder="20" min="0" max="60" value="20">
        </div>
        <div class="form-group">
          <label class="form-label">Макс. отжимания</label>
          <input type="number" class="form-input" id="pushUpMax" placeholder="50" min="0" max="200" value="50">
        </div>
        <div class="form-group">
          <label class="form-label">Цель: подтягивания</label>
          <input type="number" class="form-input" id="goalPull" placeholder="28" min="0" max="60" value="28">
        </div>
        <div class="form-group">
          <label class="form-label">Цель: отжимания</label>
          <input type="number" class="form-input" id="goalPush" placeholder="59" min="0" max="200" value="59">
        </div>
      </div>

      <div style="margin-top: var(--space-6);">
        <button class="btn btn-primary" id="generate-btn">Сгенерировать программу</button>
      </div>

      <div id="eligibility-result" style="margin-top: var(--space-6);"></div>
    </div>
  `;
}

// ── Program Page ────────────────────────────────────────────
function renderProgramPage() {
  if (!matrixResult) {
    return `
      <div class="page">
        <div class="empty-state">
          <div class="empty-state-icon">&#128203;</div>
          <div class="empty-state-text">Программа ещё не сгенерирована</div>
          <div class="empty-state-hint">Заполните профиль и нажмите кнопку генерации</div>
        </div>
      </div>
    `;
  }

  const m = matrixResult;
  const { profile, goals, originalGoals, eligibility, goalValidation, ceilings, macrocycleCount, emphases, macrocycles, validation, progression, totalWeeks } = m;

  return `
    <div class="page fade-in">
      <h1 class="page-title">Программа тренировок</h1>
      <p class="page-subtitle">${profile.weight} кг / ${profile.age} лет / подтягивания ${profile.pullUpMax} &rarr; ${goals.pullUps} / отжимания ${profile.pushUpMax} &rarr; ${goals.pushUps}</p>

      ${renderEligibilityCallout(eligibility)}
      ${renderGoalWarnings(goalValidation, originalGoals)}

      <div class="stat-grid fade-in-delay-1">
        <div class="stat-card">
          <div class="stat-value">${macrocycleCount}</div>
          <div class="stat-label">Макроциклов</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totalWeeks}</div>
          <div class="stat-label">Недель</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${ceilings.pull}</div>
          <div class="stat-label">Потолок подтяг.</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${ceilings.push}</div>
          <div class="stat-label">Потолок отжим.</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Math.round(bwVolumeScale(profile.weight) * 100)}%</div>
          <div class="stat-label">BW масштаб</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${getMRV(profile.weight, 'pull')}/${getMRV(profile.weight, 'push')}</div>
          <div class="stat-label">MRV pull/push</div>
        </div>
      </div>

      <hr class="divider" />

      ${renderEmphasisSection(emphases, macrocycleCount)}

      <h2 class="section-title fade-in-delay-2">Прогрессия</h2>
      <div class="chart-container fade-in-delay-2">
        ${renderProgressionChart(progression, goals, ceilings)}
      </div>

      <hr class="divider" />

      <h2 class="section-title fade-in-delay-3">Макроциклы</h2>
      <div class="section-description">Нажмите на макроцикл, чтобы раскрыть детали</div>
      ${macrocycles.map((macro, i) => renderMacrocycle(macro, i)).join('')}

      <hr class="divider" />

      <h2 class="section-title fade-in-delay-4">Валидация</h2>
      ${renderValidationSection(validation)}

      <hr class="divider" />

      <div style="margin-top: var(--space-6);">
        <button class="btn" id="export-csv-btn">Экспорт CSV</button>
        <button class="btn" id="back-to-input-btn" style="margin-left: var(--space-2);">Изменить профиль</button>
      </div>
    </div>
  `;
}

// ── Science Page ─────────────────────────────────────────────
function renderSciencePage() {
  return `
    <div class="page fade-in">
      <h1 class="page-title">Научная база</h1>
      <p class="page-subtitle">Источники и обоснования для матрицы тренировок</p>

      <div class="section-title">Нормативные данные: подтягивания</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Вес (кг)</th>
              <th>Нов.</th>
              <th>Сред.</th>
              <th>Прод.</th>
              <th>Элит.</th>
            </tr>
          </thead>
          <tbody>
            ${[70, 80, 90, 100, 110, 120].map(bw => {
              const n = getPullUpNorms(bw, 30);
              return '<tr><td class="num">' + bw + '</td><td class="num">' + n.nov + '</td><td class="num">' + n.int + '</td><td class="num">' + n.adv + '</td><td class="num">' + n.eli + '</td></tr>';
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="section-description" style="margin-bottom: var(--space-6);">Муж., 30 лет. Источник: Strength Level (4.8M lifts)</div>

      <div class="section-title">Факторы возраста</div>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Возраст</th><th>Фактор</th></tr>
          </thead>
          <tbody>
            <tr><td class="num">20-40</td><td class="num">1.00</td></tr>
            <tr><td class="num">41-45</td><td class="num">0.85</td></tr>
            <tr><td class="num">46-50</td><td class="num">0.65</td></tr>
            <tr><td class="num">51-55</td><td class="num">0.50</td></tr>
            <tr><td class="num">56-60</td><td class="num">0.30</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section-description" style="margin-bottom: var(--space-6);">Источник: Kjaer et al. (2016)</div>

      <div class="section-title">Ключевые исследования</div>
      <div style="font-size: var(--text-sm); line-height: var(--lh-relaxed); color: var(--fg-secondary);">
        <ul style="padding-left: var(--space-5); margin-bottom: var(--space-4);">
          <li style="margin-bottom: var(--space-2);"><strong>Vanderburgh (2006, 2007)</strong> &mdash; Allometric scaling: 1RM ~ M^(2/3). BW penalty 15-20% for 60kg vs 90kg</li>
          <li style="margin-bottom: var(--space-2);"><strong>Sanchez-Moreno et al. (2016)</strong> &mdash; Pull-ups: r = -0.55 with body mass</li>
          <li style="margin-bottom: var(--space-2);"><strong>Yu et al. (2021)</strong> &mdash; Cluster sets better weeks 1-8 (SMD=0.24), traditional better after 8 weeks (SMD=-1.54)</li>
          <li style="margin-bottom: var(--space-2);"><strong>Schoenfeld et al. (2023)</strong> &mdash; Finite muscular adaptation, logarithmic curve</li>
          <li style="margin-bottom: var(--space-2);"><strong>Rhea et al.; Barsuhn et al. (2024)</strong> &mdash; ~1/3 of peak volume maintains developed qualities</li>
          <li><strong>Cooper Institute (2013)</strong> &mdash; Push-up norms by age</li>
        </ul>
      </div>
    </div>
  `;
}

// ── Eligibility Callout ─────────────────────────────────────
function renderEligibilityCallout(eligibility) {
  if (eligibility.eligible) {
    return `
      <div class="callout callout-success fade-in-delay-1">
        <span class="callout-icon">&#10003;</span>
        <div>
          <strong>Допуск получен</strong><br>
          Подтягивания: ${eligibility.pull.max} (порог ${eligibility.pull.threshold}) &mdash; ${eligibility.pull.level}
          <br>Отжимания: ${eligibility.push.max} (порог ${eligibility.push.threshold}) &mdash; ${eligibility.push.level}
        </div>
      </div>
    `;
  }
  return `
    <div class="callout callout-error fade-in-delay-1">
      <span class="callout-icon">&#10007;</span>
      <div>
        <strong>Недостаточный уровень</strong><br>
        Подтягивания: ${eligibility.pull.max} (нужно ${eligibility.pull.threshold}) &mdash; ${eligibility.pull.level}
        <br>Отжимания: ${eligibility.push.max} (нужно ${eligibility.push.threshold}) &mdash; ${eligibility.push.level}
        <br><em>Для спортсменов ниже Intermediate уровня достаточно самостоятельных тренировок.</em>
      </div>
    </div>
  `;
}

// ── Goal Warnings ───────────────────────────────────────────
function renderGoalWarnings(goalValidation, originalGoals) {
  const warnings = [];
  if (goalValidation.pull.warning) {
    const label = goalValidation.pull.warning === 'capped_at_95pct_ceiling'
      ? 'Цель подтягиваний ' + originalGoals.pullUps + ' превышает потолок &mdash; ограничено до ' + goalValidation.pull.capped
      : 'Цель подтягиваний ' + originalGoals.pullUps + ' близка к потолку (' + Math.round(goalValidation.pull.ratio * 100) + '%)';
    warnings.push(label);
  }
  if (goalValidation.push.warning) {
    const label = goalValidation.push.warning === 'capped_at_95pct_ceiling'
      ? 'Цель отжиманий ' + originalGoals.pushUps + ' превышает потолок &mdash; ограничено до ' + goalValidation.push.capped
      : 'Цель отжиманий ' + originalGoals.pushUps + ' близка к потолку (' + Math.round(goalValidation.push.ratio * 100) + '%)';
    warnings.push(label);
  }

  if (warnings.length === 0) return '';

  return `
    <div class="callout callout-warning fade-in-delay-1">
      <span class="callout-icon">&#9888;</span>
      <div>${warnings.join('<br>')}</div>
    </div>
  `;
}

// ── Emphasis Section ────────────────────────────────────────
function renderEmphasisSection(emphases, count) {
  return `
    <h2 class="section-title fade-in-delay-2">Распределение акцентов</h2>
    <div class="table-container fade-in-delay-2">
      <table>
        <thead>
          <tr>
            <th>Макроцикл</th>
            <th>Подтягивания</th>
            <th>Отжимания</th>
            <th>Тип</th>
          </tr>
        </thead>
        <tbody>
          ${emphases.map((e, i) => `
            <tr>
              <td class="num">${i + 1}</td>
              <td class="num">${Math.round(e.pull * 100)}%</td>
              <td class="num">${Math.round(e.push * 100)}%</td>
              <td><span class="badge badge-blue">${e.label}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ── Progression Chart (SVG) ─────────────────────────────────
function renderProgressionChart(progression, goals, ceilings) {
  const width = 800;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxWeeks = progression.length;
  const maxPull = Math.max(ceilings.pull, goals.pullUps) + 5;
  const maxPush = Math.max(ceilings.push, goals.pushUps) + 10;

  const scaleX = (week) => padding.left + (week / maxWeeks) * chartW;
  const scalePullY = (val) => padding.top + chartH - (val / maxPull) * chartH;
  const scalePushY = (val) => padding.top + chartH - (val / maxPush) * chartH;

  const pullPoints = progression.map((p, i) => scaleX(i) + ',' + scalePullY(p.pullEstimate)).join(' ');
  const pushPoints = progression.map((p, i) => scaleX(i) + ',' + scalePushY(p.pushEstimate)).join(' ');

  const pullGoalY = scalePullY(goals.pullUps);
  const pushGoalY = scalePushY(goals.pushUps);
  const pullCeilingY = scalePullY(ceilings.pull);
  const pushCeilingY = scalePushY(ceilings.push);

  // Deload markers
  const deloadMarks = progression
    .filter((p, i) => (i + 1) % 4 === 0)
    .map((p, idx) => {
      const x = scaleX(idx * 4 + 3);
      return '<line x1="' + x + '" y1="' + padding.top + '" x2="' + x + '" y2="' + (padding.top + chartH) + '" stroke="#e8e8e6" stroke-width="1" stroke-dasharray="3,3" />';
    }).join('');

  const xLabels = [];
  for (let w = 0; w < maxWeeks; w += 4) {
    xLabels.push('<text x="' + scaleX(w) + '" y="' + (height - 5) + '" text-anchor="middle" fill="#9b9a97" font-size="10" font-family="SFMono-Regular, Menlo, monospace">' + (w + 1) + '</text>');
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-canvas" preserveAspectRatio="xMidYMid meet">
      ${deloadMarks}
      <line x1="${padding.left}" y1="${pullCeilingY}" x2="${width - padding.right}" y2="${pullCeilingY}" stroke="#dfdfde" stroke-width="1" stroke-dasharray="6,3" />
      <line x1="${padding.left}" y1="${pushCeilingY}" x2="${width - padding.right}" y2="${pushCeilingY}" stroke="#dfdfde" stroke-width="1" stroke-dasharray="6,3" />
      <line x1="${padding.left}" y1="${pullGoalY}" x2="${width - padding.right}" y2="${pullGoalY}" stroke="#2383e2" stroke-width="1" stroke-dasharray="4,4" />
      <line x1="${padding.left}" y1="${pushGoalY}" x2="${width - padding.right}" y2="${pushGoalY}" stroke="#4dab6f" stroke-width="1" stroke-dasharray="4,4" />
      <polyline points="${pullPoints}" fill="none" stroke="#2383e2" stroke-width="2" stroke-linejoin="round" />
      <polyline points="${pushPoints}" fill="none" stroke="#4dab6f" stroke-width="2" stroke-linejoin="round" />
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartH}" stroke="#e8e8e6" stroke-width="1" />
      <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="#e8e8e6" stroke-width="1" />
      <text x="${padding.left - 5}" y="${pullGoalY + 4}" text-anchor="end" fill="#2383e2" font-size="10" font-family="SFMono-Regular, Menlo, monospace">${goals.pullUps}</text>
      <text x="${width - padding.right + 5}" y="${pushGoalY + 4}" text-anchor="start" fill="#4dab6f" font-size="10" font-family="SFMono-Regular, Menlo, monospace">${goals.pushUps}</text>
      <text x="${padding.left - 5}" y="${pullCeilingY + 4}" text-anchor="end" fill="#9b9a97" font-size="9" font-family="SFMono-Regular, Menlo, monospace">${ceilings.pull}</text>
      ${xLabels.join('')}
      <circle cx="${padding.left + 10}" cy="${padding.top + 5}" r="3" fill="#2383e2" />
      <text x="${padding.left + 18}" y="${padding.top + 9}" fill="#37352f" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Подтягивания</text>
      <circle cx="${padding.left + 110}" cy="${padding.top + 5}" r="3" fill="#4dab6f" />
      <text x="${padding.left + 118}" y="${padding.top + 9}" fill="#37352f" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Отжимания</text>
    </svg>
  `;
}

// ── Macrocycle ──────────────────────────────────────────────
function renderMacrocycle(macro, index) {
  const emphasisLabel = macro.emphasis.label.replace(/_/g, ' ');

  return `
    <div class="collapsible fade-in-delay-${Math.min(index + 2, 4)}" data-macro="${index}">
      <button class="collapsible-header" data-toggle="macro-${index}">
        <span class="toggle-icon">&#9654;</span>
        <span>Макроцикл ${index + 1} &mdash; ${emphasisLabel}</span>
        <span style="margin-left: auto; font-size: var(--text-xs); color: var(--fg-tertiary);">
          Подт: ${macro.startPull} &rarr; ${macro.endPull} / Отж: ${macro.startPush} &rarr; ${macro.endPush}
        </span>
      </button>
      <div class="collapsible-body" id="macro-${index}">
        ${macro.mesocycles.map((meso, mi) => renderMesocycle(meso, mi, index)).join('')}
      </div>
    </div>
  `;
}

// ── Mesocycle ───────────────────────────────────────────────
function renderMesocycle(meso, mesoIndex, macroIndex) {
  return `
    <div style="margin-bottom: var(--space-4);">
      <div style="font-weight: 600; font-size: var(--text-sm); color: var(--fg-secondary); margin-bottom: var(--space-2);">
        Мезоцикл ${mesoIndex + 1}
      </div>
      ${meso.weeks.map((week, wi) => renderWeek(week, wi)).join('')}
    </div>
  `;
}

// ── Week ────────────────────────────────────────────────────
function renderWeek(week, weekIndex) {
  const isDeload = week.isDeload;
  const weekLabel = isDeload
    ? 'Неделя ' + week.week + ' &mdash; Разгрузка'
    : 'Неделя ' + week.week;

  const volBadge = isDeload
    ? '<span class="badge badge-orange">разгрузка</span>'
    : '<span class="badge badge-blue">' + Math.round(week.volFactor * 100) + '%</span>';

  return `
    <div class="week-header">
      <span class="week-number">Н${week.week}</span>
      <span style="font-size: var(--text-sm); font-weight: 500;">${weekLabel}</span>
      ${volBadge}
    </div>
    ${week.sessions.map(session => renderSession(session, isDeload)).join('')}
  `;
}

// ── Session ─────────────────────────────────────────────────
function renderSession(session, isDeload) {
  const dayLabels = { mon: 'Пн', wed: 'Ср', fri: 'Пт' };
  const dayLabel = dayLabels[session.day] || session.day;

  return `
    <div class="session-card">
      <div class="session-header">
        <span class="day-badge">${dayLabel}</span>
        <span>${session.label}</span>
        ${isDeload ? '<span class="badge badge-orange" style="margin-left: auto;">30%</span>' : ''}
      </div>
      <div class="table-container" style="border: none; border-radius: 0;">
        <table>
          <thead>
            <tr>
              <th>Упражнение</th>
              <th>Сеты</th>
              <th>Повторы</th>
              <th>Темп</th>
              <th>Отдых</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody>
            ${session.exercises.map(ex => renderExerciseRow(ex, isDeload)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Exercise Row ────────────────────────────────────────────
function renderExerciseRow(ex, isDeload) {
  const rowClass = isDeload ? 'deload-row' : '';

  let supersetTag = '';
  if (ex.supersetGroup) {
    const cls = ex.supersetGroup === 'A' ? 'superset-a' : 'superset-b';
    supersetTag = '<span class="superset-tag ' + cls + '">' + ex.supersetGroup + '</span>';
  }
  if (ex.isClusterSuperset) {
    supersetTag = '<span class="superset-tag superset-cluster">К</span>';
  }

  let repsDisplay = '';
  if (ex.type === 'cluster' && ex.parts) {
    repsDisplay = ex.parts.map(p => p.reps).join('+');
  } else if (ex.type === 'ladder' && ex.parts) {
    repsDisplay = ex.parts.map(p => p.reps).join('-');
  } else if (ex.type === 'emom') {
    repsDisplay = ex.reps + ' x ' + ex.sets + ' раундов';
  } else {
    repsDisplay = ex.reps;
  }

  let restDisplay = '';
  if (ex.type === 'emom') {
    restDisplay = 'EMOM 60с';
  } else if (ex.type === 'cluster' && ex.parts) {
    const intraRest = ex.parts[0] && ex.parts[0].rest ? ex.parts[0].rest : 15;
    restDisplay = intraRest + 'с / ' + ex.rest + 'с';
  } else {
    restDisplay = ex.rest + 'с';
  }

  let typeBadge = '';
  if (ex.type === 'cluster') typeBadge = '<span class="badge badge-green">кластер</span>';
  else if (ex.type === 'ladder') typeBadge = '<span class="badge badge-blue">лестница</span>';
  else if (ex.type === 'emom') typeBadge = '<span class="badge badge-orange">EMOM</span>';
  else if (ex.isPrehab) typeBadge = '<span class="badge badge-green">прехаб</span>';
  else if (ex.type === 'test') typeBadge = '<span class="badge badge-red">тест</span>';

  const fixedMarker = ex.fixedReps ? ' <span style="color:var(--fg-tertiary);font-size:10px;">&#9670;</span>' : '';

  return `
    <tr class="${rowClass}">
      <td class="exercise-name">${supersetTag}${ex.name}${fixedMarker}</td>
      <td class="num">${ex.sets}</td>
      <td class="num">${repsDisplay}</td>
      <td class="tempo">${ex.tempo || '&mdash;'}</td>
      <td class="num">${restDisplay}</td>
      <td>${typeBadge}</td>
    </tr>
  `;
}

// ── Validation Section ──────────────────────────────────────
function renderValidationSection(validation) {
  if (validation.passed) {
    return `
      <div class="callout callout-success">
        <span class="callout-icon">&#10003;</span>
        <div><strong>Валидация пройдена</strong> &mdash; нет критических проблем с объёмом или MRV</div>
      </div>
    `;
  }

  const highIssues = validation.issues.filter(i => i.severity === 'high');
  const medIssues = validation.issues.filter(i => i.severity === 'medium');

  return `
    <div class="callout callout-error">
      <span class="callout-icon">&#10007;</span>
      <div>
        <strong>Обнаружены проблемы</strong> (${highIssues.length} критических, ${medIssues.length} средних)
        <ul style="margin-top: var(--space-2); padding-left: var(--space-4); font-size: var(--text-xs);">
          ${validation.issues.map(i => '<li>' + i.message + '</li>').join('')}
        </ul>
      </div>
    </div>
  `;
}

// ── Event Binding ───────────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentView = e.target.closest('[data-nav]').dataset.nav;
      render();
    });
  });

  const genBtn = document.getElementById('generate-btn');
  if (genBtn) {
    genBtn.addEventListener('click', handleGenerate);
  }

  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.toggle;
      const body = document.getElementById(targetId);
      if (body) {
        body.classList.toggle('open');
        btn.classList.toggle('open');
      }
    });
  });

  const exportBtn = document.getElementById('export-csv-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', handleExportCSV);
  }

  const backBtn = document.getElementById('back-to-input-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      currentView = 'input';
      render();
    });
  }
}

// ── Generate Handler ────────────────────────────────────────
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
    resultDiv.innerHTML = renderEligibilityCallout(eligibility);
    matrixResult = null;
    return;
  }

  try {
    matrixResult = generateMatrix(profile, goals);
    currentView = 'program';
    render();
  } catch (e) {
    const resultDiv2 = document.getElementById('eligibility-result');
    if (resultDiv2) {
      resultDiv2.innerHTML = `
        <div class="callout callout-error">
          <span class="callout-icon">&#10007;</span>
          <div><strong>Ошибка генерации</strong><br>${e.message}</div>
        </div>
      `;
    }
  }
}

// ── CSV Export ──────────────────────────────────────────────
function handleExportCSV() {
  if (!matrixResult) return;

  const rows = exportMatrix(matrixResult);
  const headers = ['macro', 'meso', 'week', 'weekInMeso', 'isDeload', 'day', 'exercise', 'exerciseEn', 'group', 'type', 'sets', 'reps', 'volume', 'rest', 'tempo', 'isPrehab', 'fixedReps', 'supersetGroup', 'emphasis'];
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

// ── Init ────────────────────────────────────────────────────
render();
