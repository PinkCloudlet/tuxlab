'use strict';
/* ============================================================
   TuxLab — nauka Linuksa / Kali / Purple Team
   Cała logika aplikacji. Kod bez zewnętrznych zależności,
   dane trzymane wyłącznie w localStorage (żadnej sieci / API).
   ============================================================ */

const STORAGE_KEY = 'tuxlab_progress_v2';
const OLD_STORAGE_KEY = 'rootapp_progress_v1'; // migracja z poprzedniej wersji (root>_)
const PASS_THRESHOLD = 0.7; // 70%

/* ---------- Bezpieczne escapowanie tekstu (ochrona przed XSS z własnych danych) ---------- */
function esc(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* ---------- Budowa testów finalnych (deterministyczne, z podziału puli) ---------- */
function buildFinalTests() {
  const finalQ1A = [], finalQ1B = [], finalQ2A = [], finalQ2B = [];
  CATEGORIES.forEach(cat => {
    cat.quiz1.forEach((q, i) => {
      const tagged = { ...q, sourceCat: cat.id, sourceCatTitle: cat.title };
      (i % 2 === 0 ? finalQ1A : finalQ1B).push(tagged);
    });
    cat.quiz2.forEach((q, i) => {
      const tagged = { ...q, sourceCat: cat.id, sourceCatTitle: cat.title };
      (i % 2 === 0 ? finalQ2A : finalQ2B).push(tagged);
    });
  });
  return {
    final1: { id: 'final-1', title: 'Test końcowy I', quiz1: finalQ1A, quiz2: finalQ2A },
    final2: { id: 'final-2', title: 'Test końcowy II', quiz1: finalQ1B, quiz2: finalQ2B }
  };
}
const FINALS = buildFinalTests();

/* ---------- Stan / postęp (localStorage) ---------- */
const DEFAULT_PROGRESS = () => ({ lessons: {}, quiz1: {}, quiz2: {}, quiz3: {}, xp: 0, streak: 0, lastVisit: null });

function loadProgress() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migracja z poprzedniej wersji aplikacji (root>_), jeśli istnieje.
      const legacy = localStorage.getItem(OLD_STORAGE_KEY);
      if (legacy) raw = legacy;
    }
    if (!raw) return DEFAULT_PROGRESS();
    const parsed = JSON.parse(raw);
    return Object.assign(DEFAULT_PROGRESS(), parsed);
  } catch (e) {
    console.warn('Nie udało się odczytać postępu, zaczynam od nowa.', e);
    return DEFAULT_PROGRESS();
  }
}
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) {
    console.warn('Nie udało się zapisać postępu (localStorage niedostępny/pełny).', e);
    toast('Uwaga: nie udało się zapisać postępu lokalnie.', true);
  }
}

const state = {
  progress: loadProgress(),
  view: 'home',
  currentCat: null,
  quizSession: null
};

/* Aktualizacja streaka dziennego (czysto kosmetyczne, lokalne) */
(function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = state.progress.lastVisit;
  if (last !== today) {
    if (last) {
      const diffDays = Math.round((new Date(today) - new Date(last)) / 86400000);
      state.progress.streak = diffDays === 1 ? (state.progress.streak || 0) + 1 : 1;
    } else {
      state.progress.streak = 1;
    }
    state.progress.lastVisit = today;
    saveProgress();
  }
})();

/* ---------- Instalacja PWA ---------- */
const installState = { deferredPrompt: null, dismissed: false, installed: false };

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installState.deferredPrompt = e;
  renderInstallBanner();
});
window.addEventListener('appinstalled', () => {
  installState.installed = true;
  installState.deferredPrompt = null;
  renderInstallBanner();
  toast('Zainstalowano TuxLab. Miłej nauki!');
});

function renderInstallBanner() {
  const el = document.getElementById('install-banner');
  if (!el) return;
  if (isStandalone() || installState.installed || installState.dismissed) { el.innerHTML = ''; return; }

  if (installState.deferredPrompt) {
    el.innerHTML = `
      <div class="install-banner">
        <span>📲 Zainstaluj TuxLab jako aplikację — działa offline i ma własną ikonę.</span>
        <span class="install-banner-actions">
          <button class="btn-primary btn-small" id="install-yes-btn">Zainstaluj</button>
          <button class="link-btn" id="install-no-btn">Nie teraz</button>
        </span>
      </div>`;
    document.getElementById('install-yes-btn').addEventListener('click', async () => {
      const dp = installState.deferredPrompt;
      if (!dp) return;
      dp.prompt();
      await dp.userChoice;
      installState.deferredPrompt = null;
      renderInstallBanner();
    });
    document.getElementById('install-no-btn').addEventListener('click', () => {
      installState.dismissed = true;
      renderInstallBanner();
    });
  } else if (isIOS()) {
    el.innerHTML = `
      <div class="install-banner">
        <span>📲 Dodaj TuxLab do ekranu głównego: stuknij <strong>Udostępnij</strong> ⬆️, a potem <strong>„Dodaj do ekranu początkowego”</strong>.</span>
        <span class="install-banner-actions">
          <button class="link-btn" id="install-no-btn">Nie teraz</button>
        </span>
      </div>`;
    document.getElementById('install-no-btn').addEventListener('click', () => {
      installState.dismissed = true;
      renderInstallBanner();
    });
  } else {
    el.innerHTML = '';
  }
}

/* ---------- Pomocnicze ---------- */
const $app = document.getElementById('app');
const $liveRegion = document.getElementById('live-region');

function announce(msg) {
  $liveRegion.textContent = '';
  requestAnimationFrame(() => { $liveRegion.textContent = msg; });
}

function toast(msg, isError) {
  const t = document.createElement('div');
  t.className = 'toast' + (isError ? ' toast-error' : '');
  t.textContent = msg;
  document.getElementById('toast-root').appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

function normalizeAnswer(str) {
  return String(str)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'");
}

function isCorrectAnswer(userInput, acceptedAnswers) {
  const norm = normalizeAnswer(userInput).toLowerCase();
  return acceptedAnswers.some(a => normalizeAnswer(a).toLowerCase() === norm);
}

function catProgressStats(cat) {
  const p = state.progress;
  const totalCmds = cat.lesson.length;
  const doneCmds = (p.lessons[cat.id] || []).length;
  const q1pass = !!(p.quiz1[cat.id] && p.quiz1[cat.id].passed);
  const q2pass = !!(p.quiz2[cat.id] && p.quiz2[cat.id].passed);
  const q3pass = !!(p.quiz3[cat.id] && p.quiz3[cat.id].passed);
  const lessonDone = totalCmds > 0 && doneCmds >= totalCmds;
  const parts = [lessonDone, q1pass, q2pass, q3pass];
  const doneParts = parts.filter(Boolean).length;
  return { totalCmds, doneCmds, q1pass, q2pass, q3pass, lessonDone, doneParts, totalParts: 4, complete: doneParts === 4 };
}

function overallStats() {
  let complete = 0;
  CATEGORIES.forEach(c => { if (catProgressStats(c).complete) complete++; });
  const f1 = !!(state.progress.quiz1['final-1'] && state.progress.quiz1['final-1'].passed);
  const f2 = !!(state.progress.quiz1['final-2'] && state.progress.quiz1['final-2'].passed);
  return { complete, total: CATEGORIES.length, f1, f2, xp: state.progress.xp || 0, streak: state.progress.streak || 0 };
}

/* ---------- Routing (hash-based, proste SPA) ---------- */
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  route();
  registerSW();
  renderInstallBanner();
  runBootSequence();
});

/* ---------- Sekwencja startowa (jednorazowo, przy pierwszym wejściu) ---------- */
const BOOT_SEEN_KEY = 'tuxlab_boot_seen';
function runBootSequence() {
  const overlay = document.getElementById('boot-overlay');
  if (!overlay) return;
  let seen = false;
  try { seen = localStorage.getItem(BOOT_SEEN_KEY) === '1'; } catch (e) { /* brak dostępu do storage — nie pokazuj sekwencji */ seen = true; }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (seen || reduced) {
    try { localStorage.setItem(BOOT_SEEN_KEY, '1'); } catch (e) {}
    return;
  }

  const linesEl = document.getElementById('boot-log-lines');
  const lines = [
    { t: '[ OK ] Montowanie /dev/wiedza...', cls: 'ok' },
    { t: '[ OK ] Ładowanie 18 kategorii, 122 komend...', cls: 'ok' },
    { t: '[ OK ] Inicjalizacja modułu purple-team...', cls: 'tag-violet' },
    { t: '🐧 Witaj w TuxLab.', cls: 'welcome' }
  ];
  linesEl.innerHTML = lines.map((l, i) =>
    `<p class="line ${l.cls === 'welcome' ? 'welcome' : ''}" style="animation-delay:${i * 0.28}s">${l.cls !== 'welcome' ? `<span class="${l.cls}">${esc(l.t.slice(0, 6))}</span>${esc(l.t.slice(6))}` : esc(l.t)}</p>`
  ).join('') + `<p class="boot-skip" style="animation-delay:${lines.length * 0.28}s">kliknij, aby pominąć</p>`;

  overlay.hidden = false;
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    overlay.hidden = true;
    try { localStorage.setItem(BOOT_SEEN_KEY, '1'); } catch (e) {}
    overlay.removeEventListener('click', dismiss);
    window.removeEventListener('keydown', dismiss);
  };
  overlay.addEventListener('click', dismiss);
  window.addEventListener('keydown', dismiss);
  setTimeout(dismiss, 2600);
}

function route() {
  const hash = location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) return renderHome();
  if (parts[0] === 'lesson' && parts[1]) return renderLesson(parts[1]);
  if (parts[0] === 'quiz1' && parts[1]) return renderQuiz(parts[1], 'quiz1');
  if (parts[0] === 'quiz2' && parts[1]) return renderQuiz(parts[1], 'quiz2');
  if (parts[0] === 'quiz3' && parts[1]) return renderQuiz(parts[1], 'quiz3');
  if (parts[0] === 'final' && parts[1]) return renderFinal(parts[1]);
  return renderHome();
}
function nav(hash) { location.hash = hash; }

/* ============================================================
   WIDOK: HOME — lista kategorii + testy końcowe
   ============================================================ */
/* Rozszerzenia plików per kategoria — czysto kosmetyczny akcent "konfiguracji" */
const CAT_FILE_EXT = {
  'fundamenty': '.sh', 'pliki-katalogi': '.files', 'uprawnienia': '.conf', 'narzedzia-pomocnicze': '.tools',
  'pakiety': '.list', 'fhs': '.tree', 'procesy': '.pid', 'siec-podstawy': '.sock',
  'rekonesans': '.scan', 'enumeracja-web': '.dir', 'podatnosci': '.cve', 'ruch-sieciowy': '.pcap',
  'eksploatacja': '.exploit', 'tunelowanie': '.tunnel', 'threat-hunting': '.log', 'ssh': '.key',
  'bash-automatyzacja': '.cron', 'firewall': '.rules'
};
function catFilename(cat) { return cat.id + (CAT_FILE_EXT[cat.id] || ''); }

function renderHome() {
  const stats = overallStats();
  const pct = Math.round((stats.complete / stats.total) * 100);

  const items = CATEGORIES.map(cat => {
    const s = catProgressStats(cat);
    const pctNode = Math.round((s.doneParts / s.totalParts) * 100);
    const badge = s.complete ? '<span class="badge" aria-label="Kategoria ukończona">[OK] ukończono</span>' : '';
    return `
      <li class="chain-item ${s.complete ? 'is-complete' : ''}">
        <button class="chain-node-btn" data-nav="#/lesson/${cat.id}" aria-describedby="prog-${cat.id}">
          <span class="node-badge" style="--pct:${pctNode}" aria-hidden="true"><span class="node-badge-glyph">${esc(cat.icon)}</span></span>
          <span class="node-info">
            <span class="node-filename">${esc(catFilename(cat))}</span>
            <span class="node-title">${esc(cat.title)} ${badge}</span>
            <span class="node-subtitle">${esc(cat.subtitle)}</span>
            <span class="node-progress" id="prog-${cat.id}">
              <span class="mini-pip ${s.lessonDone ? 'on' : ''}" title="Lekcja">L</span>
              <span class="mini-pip ${s.q1pass ? 'on' : ''}" title="Test ABCD">Q1</span>
              <span class="mini-pip ${s.q2pass ? 'on' : ''}" title="Test — wpisz komendę (z podpowiedzią)">Q2</span>
              <span class="mini-pip ${s.q3pass ? 'on' : ''}" title="Test — wpisz wszystko (bez podpowiedzi)">Q3</span>
            </span>
          </span>
        </button>
      </li>`;
  }).join('');

  const finalsUnlocked = stats.complete === stats.total;

  $app.innerHTML = `
    <header class="hero">
      <div class="hero-top">
        <p class="eyebrow">root@tuxlab:~$ ./start.sh</p>
        <h1 class="hero-title"><span aria-hidden="true">🐧</span> Tux<span class="accent-violet">Lab</span></h1>
        <p class="hero-sub">Praktyczna nauka Linuksa, Kali i Purple Teamu — komendy do rozmów rekrutacyjnych i codziennej pracy w bezpieczeństwie ofensywnym.</p>
      </div>
      <div class="hero-stats" role="group" aria-label="Twój postęp">
        <div class="stat-box">
          <span class="stat-num">${stats.complete}/${stats.total}</span>
          <span class="stat-label">kategorii</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">${stats.xp}</span>
          <span class="stat-label">xp</span>
        </div>
        <div class="stat-box">
          <span class="stat-num">${stats.streak}</span>
          <span class="stat-label">dni z rzędu</span>
        </div>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Ogólny postęp kursu">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
    </header>

    <section aria-labelledby="cats-heading">
      <h2 id="cats-heading" class="section-title">ścieżka nauki</h2>
      <div class="chain-wrap" style="--fill-pct:${pct}%">
        <div class="chain-spine" aria-hidden="true"></div>
        <ol class="chain-list">${items}</ol>
      </div>
    </section>

    <section aria-labelledby="finals-heading" class="finals-section">
      <h2 id="finals-heading" class="section-title">testy końcowe</h2>
      ${finalsUnlocked ? '' : `<p class="finals-hint"># odblokujesz po ukończeniu wszystkich ${stats.total} kategorii (lekcja + 3 testy)</p>`}
      <div class="finals-grid">
        ${renderFinalCard('final-1', 'Test końcowy I', stats.f1, finalsUnlocked)}
        ${renderFinalCard('final-2', 'Test końcowy II', stats.f2, finalsUnlocked)}
      </div>
    </section>

    <footer class="app-footer">
      <button class="link-btn" id="reset-btn" type="button">wyzeruj postęp (localStorage)</button>
    </footer>
  `;

  bindNavClicks();
  document.getElementById('reset-btn').addEventListener('click', confirmReset);
}

function renderFinalCard(id, title, passed, unlocked) {
  const n = id === 'final-1' ? FINALS.final1 : FINALS.final2;
  const qCount = n.quiz1.length + n.quiz2.length;
  return `
    <button class="final-card ${passed ? 'is-complete' : ''}" data-nav="#/final/${id}" ${unlocked ? '' : 'disabled aria-disabled="true"'}>
      <span class="final-icon" aria-hidden="true">${unlocked ? '[*]' : '[--]'}</span>
      <span class="final-title">${esc(title)} ${passed ? '<span class="badge badge-violet">[OK]</span>' : ''}</span>
      <span class="final-sub">${qCount} pytań mieszanych ze wszystkich kategorii</span>
    </button>`;
}

function bindNavClicks() {
  $app.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => { if (!el.disabled) nav(el.getAttribute('data-nav')); });
  });
}

function confirmReset() {
  if (confirm('Na pewno chcesz wyzerować cały postęp zapisany w tej przeglądarce? Tej operacji nie można cofnąć.')) {
    localStorage.removeItem(STORAGE_KEY);
    state.progress = loadProgress();
    toast('Postęp wyzerowany.');
    renderHome();
  }
}

/* ============================================================
   WIDOK: LEKCJA
   ============================================================ */
function renderLesson(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return renderHome();
  const doneList = new Set(state.progress.lessons[catId] || []);

  const items = cat.lesson.map((item, idx) => {
    const isDone = doneList.has(idx);
    return `
      <li class="lesson-card ${isDone ? 'is-done' : ''}">
        <div class="lesson-card-head">
          <code class="lesson-cmd">${esc(item.cmd)}</code>
          <button class="check-btn" data-idx="${idx}" aria-pressed="${isDone}" aria-label="${isDone ? 'Oznacz jako nieprzerobione' : 'Oznacz jako przerobione'}: ${esc(item.cmd)}">
            <span aria-hidden="true">${isDone ? '✓' : ''}</span>
          </button>
        </div>
        <p class="lesson-en"><span class="tag">EN</span> ${esc(item.en)}</p>
        <p class="lesson-pl"><span class="tag">PL</span> ${esc(item.pl)}</p>
        <p class="lesson-desc">${esc(item.desc)}</p>
        <pre class="lesson-example" tabindex="0"><code>${esc(item.example)}</code></pre>
      </li>`;
  }).join('');

  const s = catProgressStats(cat);

  $app.innerHTML = `
    <nav class="breadcrumb"><a href="#/" class="link-btn">← wszystkie kategorie</a></nav>
    <header class="cat-header">
      <span class="cat-icon-lg" aria-hidden="true">${esc(cat.icon)}</span>
      <div>
        <span class="cat-filename">${esc(catFilename(cat))}</span>
        <h1>${esc(cat.title)}</h1>
        <p class="hero-sub">${esc(cat.subtitle)}</p>
      </div>
    </header>

    <p class="lesson-counter" aria-live="polite"># przerobione komendy: ${doneList.size} / ${cat.lesson.length}</p>
    <ul class="lesson-list">${items}</ul>

    <div class="cat-quiz-cta">
      <h2 class="section-title">sprawdź się</h2>
      <div class="quiz-cta-grid">
        <button class="quiz-cta ${s.q1pass ? 'is-complete' : ''}" data-nav="#/quiz1/${cat.id}">
          <span class="final-icon" aria-hidden="true">[abcd]</span>
          <span>Test ABCD ${s.q1pass ? '<span class="badge">[OK]</span>' : ''}</span>
          <span class="final-sub">${cat.quiz1.length} pytań • próg zaliczenia 70%</span>
        </button>
        <button class="quiz-cta ${s.q2pass ? 'is-complete' : ''}" data-nav="#/quiz2/${cat.id}">
          <span class="final-icon" aria-hidden="true">[>_]</span>
          <span>Wpisz komendę ${s.q2pass ? '<span class="badge">[OK]</span>' : ''}</span>
          <span class="final-sub">${cat.quiz2.length} pytań • z podpowiedzią</span>
        </button>
        <button class="quiz-cta ${s.q3pass ? 'is-complete' : ''}" data-nav="#/quiz3/${cat.id}">
          <span class="final-icon" aria-hidden="true">[!!]</span>
          <span>Wpisz wszystko sam(a) ${s.q3pass ? '<span class="badge">[OK]</span>' : ''}</span>
          <span class="final-sub">${cat.quiz3.length} pytań • bez podpowiedzi</span>
        </button>
      </div>
    </div>
  `;

  bindNavClicks();
  $app.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleLessonItem(catId, parseInt(btn.dataset.idx, 10)));
  });
}

function toggleLessonItem(catId, idx) {
  const p = state.progress;
  if (!p.lessons[catId]) p.lessons[catId] = [];
  const arr = p.lessons[catId];
  const pos = arr.indexOf(idx);
  if (pos === -1) { arr.push(idx); p.xp = (p.xp || 0) + 2; announce('Oznaczono jako przerobione.'); }
  else { arr.splice(pos, 1); announce('Odznaczono.'); }
  saveProgress();
  renderLesson(catId);
}

/* ============================================================
   WIDOK: QUIZ (typ ABCD lub typ "wpisz komendę")
   ============================================================ */
function renderQuiz(catId, quizType) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return renderHome();
  const questions = cat[quizType];
  const typeLabel = { quiz1: 'Test ABCD', quiz2: 'Wpisz komendę (z podpowiedzią)', quiz3: 'Wpisz wszystko (bez podpowiedzi)' }[quizType] || '';
  startQuizSession({
    id: cat.id, title: `${cat.title} — ${typeLabel}`, questions, quizType,
    backHash: `#/lesson/${cat.id}`,
    resultKey: quizType, storageId: cat.id
  });
}

function renderFinal(finalId) {
  const finalData = finalId === 'final-1' ? FINALS.final1 : FINALS.final2;
  if (!finalData) return renderHome();
  const stats = overallStats();
  if (stats.complete < stats.total) { nav('#/'); return; }
  // łączymy quiz1 + quiz2 w jeden duży test mieszany
  const merged = [
    ...finalData.quiz1.map(q => ({ ...q, kind: 'mcq' })),
    ...finalData.quiz2.map(q => ({ ...q, kind: 'type' }))
  ];
  startQuizSession({
    id: finalId, title: finalData.title, questions: merged, quizType: 'mixed',
    backHash: '#/', resultKey: 'quiz1', storageId: finalId
  });
}

function startQuizSession(cfg) {
  state.quizSession = {
    ...cfg,
    order: cfg.questions.map((_, i) => i),
    pos: 0,
    correct: 0,
    answered: [],
    retryActive: false
  };
  renderQuizQuestion();
}

function currentQuestion() {
  const s = state.quizSession;
  const qIdx = s.order[s.pos];
  return s.questions[qIdx];
}

function renderQuizQuestion() {
  const s = state.quizSession;
  const total = s.questions.length;
  const q = currentQuestion();
  const kind = q.kind || (s.quizType === 'quiz1' ? 'mcq' : 'type');
  const progressPct = Math.round((s.pos / total) * 100);
  const sourceTag = q.sourceCatTitle ? `<p class="quiz-source">Kategoria: ${esc(q.sourceCatTitle)}</p>` : '';

  let body;
  if (kind === 'mcq') {
    body = `
      <fieldset class="mcq-options">
        <legend class="sr-only">Wybierz poprawną odpowiedź</legend>
        ${q.options.map((opt, i) => `
          <button class="mcq-option" data-idx="${i}" type="button">
            <span class="mcq-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
            <span class="mcq-text">${esc(opt)}</span>
          </button>`).join('')}
      </fieldset>
      <div id="quiz-feedback" class="quiz-feedback" role="status" aria-live="polite"></div>
    `;
  } else {
    body = `
      <form id="type-form" class="type-form" autocomplete="off">
        <label for="type-input" class="type-label">Wpisz pełną komendę:</label>
        <input id="type-input" name="answer" type="text" class="type-input" spellcheck="false"
               autocapitalize="off" autocorrect="off" aria-describedby="type-hint" />
        <p id="type-hint" class="type-hint">${q.hint ? '💡 ' + esc(q.hint) : ''}</p>
        <button type="submit" class="btn-primary">Sprawdź odpowiedź</button>
      </form>
      <div id="quiz-feedback" class="quiz-feedback" role="status" aria-live="polite"></div>
    `;
  }

  $app.innerHTML = `
    <nav class="breadcrumb"><a href="${s.backHash}" class="link-btn" id="quiz-exit">← Wyjdź z testu</a></nav>
    <header class="quiz-header">
      <h1>${esc(s.title)}</h1>
      <p class="quiz-progress-text">Pytanie ${s.pos + 1} z ${total} • poprawnych: ${s.correct}</p>
      <div class="progress-track" role="progressbar" aria-valuenow="${progressPct}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width:${progressPct}%"></div>
      </div>
    </header>
    <div class="quiz-card">
      ${sourceTag}
      <p class="quiz-question">${esc(q.q)}</p>
      ${body}
    </div>
  `;

  document.getElementById('quiz-exit').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Przerwać test? Postęp bieżącej próby nie zostanie zapisany.')) nav(s.backHash);
  });

  if (kind === 'mcq') {
    $app.querySelectorAll('.mcq-option').forEach(btn => {
      btn.addEventListener('click', () => handleMcqAnswer(parseInt(btn.dataset.idx, 10)));
    });
  } else {
    const form = document.getElementById('type-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTypeAnswer(document.getElementById('type-input').value);
    });
    document.getElementById('type-input').focus();
  }
}

function handleMcqAnswer(idx) {
  const s = state.quizSession;
  const q = currentQuestion();
  const buttons = $app.querySelectorAll('.mcq-option');
  buttons.forEach(b => b.disabled = true);
  const correct = idx === q.correct;
  buttons[idx].classList.add(correct ? 'is-correct' : 'is-wrong');
  if (!correct) buttons[q.correct].classList.add('is-correct');

  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
  fb.innerHTML = `<span class="log-tag ${correct ? 'log-tag-ok' : 'log-tag-fail'}">[${correct ? 'OK' : 'FAIL'}]</span><span class="exp-text">${esc(q.exp)}</span>`;

  if (correct) { s.correct++; playMicroSuccess(buttons[idx]); }
  announce(correct ? 'Poprawna odpowiedź.' : 'Niepoprawna odpowiedź. Zobacz wyjaśnienie.');

  appendNextButton();
}

function handleTypeAnswer(value) {
  const s = state.quizSession;
  const q = currentQuestion();
  const correct = isCorrectAnswer(value, q.answers);
  const fb = document.getElementById('quiz-feedback');
  const input = document.getElementById('type-input');
  const form = document.getElementById('type-form');

  if (correct) {
    input.disabled = true;
    form.querySelector('button[type="submit"]').disabled = true;
    fb.className = 'quiz-feedback fb-correct';
    fb.innerHTML = s.retryActive
      ? `<span class="log-tag log-tag-ok">[OK]</span><span class="exp-text">Poprawione. ${esc(q.exp)}</span>`
      : `<span class="log-tag log-tag-ok">[OK]</span><span class="exp-text">${esc(q.exp)}</span>`;
    // Wynik liczony jest wyłącznie z odpowiedzi za pierwszym podejściem (jak w quizie ABCD).
    // Poprawka po błędzie pozwala przejść dalej — to element nauki, nie liczy się do wyniku %.
    if (!s.retryActive) s.correct++;
    s.retryActive = false;
    playMicroSuccess(input);
    announce('Poprawna odpowiedź.');
    appendNextButton();
  } else if (!s.retryActive) {
    // Pierwsza pomyłka — pokaż poprawne rozwiązanie i przejdź w tryb poprawy.
    s.retryActive = true;
    fb.className = 'quiz-feedback fb-wrong';
    fb.innerHTML = `<span class="log-tag log-tag-fail">[FAIL]</span><span class="exp-text">Poprawna odpowiedź: <code>${esc(q.answers[0])}</code>. ${esc(q.exp)}<span class="retry-note">Wpisz poprawną komendę poniżej, aby przejść dalej.</span></span>`;
    announce('Niepoprawna odpowiedź. Wpisz prawidłową komendę, aby kontynuować.');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    input.select();
  } else {
    // Kolejna nieudana próba w trybie poprawy — tylko delikatny sygnał, bez zmiany treści.
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    input.select();
  }
}

function appendNextButton() {
  const s = state.quizSession;
  const isLast = s.pos >= s.questions.length - 1;
  const wrap = document.createElement('div');
  wrap.className = 'next-btn-wrap';
  const btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = isLast ? 'Zobacz wynik' : 'Następne pytanie →';
  btn.addEventListener('click', () => {
    if (isLast) finishQuiz(); else { s.pos++; s.retryActive = false; renderQuizQuestion(); }
  });
  wrap.appendChild(btn);
  $app.querySelector('.quiz-card').appendChild(wrap);
  btn.focus();
}

function playMicroSuccess(el) {
  el.classList.add('pulse-success');
  setTimeout(() => el.classList.remove('pulse-success'), 500);
}

function computeNextStep(s) {
  if (s.storageId === 'final-1') {
    const f2pass = !!(state.progress.quiz1['final-2'] && state.progress.quiz1['final-2'].passed);
    return f2pass ? { hash: '#/', label: 'Wróć na stronę główną' } : { hash: '#/final/final-2', label: 'Przejdź do Testu końcowego II →' };
  }
  if (s.storageId === 'final-2') {
    return { hash: '#/', label: 'Wróć na stronę główną' };
  }
  const catId = s.storageId;
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return { hash: '#/', label: 'Wróć na stronę główną' };
  if (s.quizType === 'quiz1') return { hash: `#/quiz2/${catId}`, label: 'Przejdź do testu: wpisz komendę →' };
  if (s.quizType === 'quiz2') return { hash: `#/quiz3/${catId}`, label: 'Przejdź do testu: wpisz wszystko →' };
  if (s.quizType === 'quiz3') {
    const idx = CATEGORIES.findIndex(c => c.id === catId);
    const next = CATEGORIES[idx + 1];
    return next
      ? { hash: `#/lesson/${next.id}`, label: `Kolejna kategoria: ${next.title} →` }
      : { hash: '#/', label: 'Wszystkie kategorie ukończone — zobacz testy końcowe' };
  }
  return null;
}

function finishQuiz() {
  const s = state.quizSession;
  const total = s.questions.length;
  const scorePct = total > 0 ? s.correct / total : 0;
  const passed = scorePct >= PASS_THRESHOLD;

  const p = state.progress;
  const bucket = p[s.resultKey] || p.quiz1;
  const prevBest = (bucket[s.storageId] && bucket[s.storageId].bestScore) || 0;
  bucket[s.storageId] = {
    passed: passed || (bucket[s.storageId] && bucket[s.storageId].passed) || false,
    lastScore: scorePct,
    bestScore: Math.max(prevBest, scorePct),
    attempts: ((bucket[s.storageId] && bucket[s.storageId].attempts) || 0) + 1
  };
  if (passed) p.xp = (p.xp || 0) + 15;
  saveProgress();

  const pct = Math.round(scorePct * 100);
  const nextStep = passed ? computeNextStep(s) : null;
  const isFinal = s.storageId === 'final-1' || s.storageId === 'final-2';

  $app.innerHTML = `
    <div class="result-screen ${passed ? 'result-pass' : 'result-fail'}">
      <div class="result-log">
        <p class="line headline">[${passed ? 'OK' : 'FAIL'}] ${passed ? (isFinal ? 'Test końcowy zaliczony' : 'Test zaliczony') : 'Test nie zaliczony'}</p>
        <p class="line">$ wynik: <span class="result-score-val">${s.correct} / ${total} (${pct}%)</span></p>
        <p class="line"># próg zaliczenia: ${Math.round(PASS_THRESHOLD * 100)}%</p>
        ${passed ? `<p class="line">$ xp: +15</p>` : ''}
      </div>
      <div class="result-actions">
        ${nextStep ? `<button class="${isFinal ? 'btn-violet' : 'btn-primary'}" id="next-step-btn">${esc(nextStep.label)}</button>` : ''}
        <button class="${nextStep ? 'btn-secondary' : 'btn-primary'}" id="retry-btn">Spróbuj ponownie</button>
        <button class="btn-secondary" id="back-btn">${s.backHash === '#/' ? 'Wróć do listy kategorii' : 'Wróć do lekcji'}</button>
      </div>
    </div>
  `;
  announce(passed ? `Test zaliczony, wynik ${pct} procent.` : `Test niezaliczony, wynik ${pct} procent, spróbuj ponownie.`);

  if (nextStep) document.getElementById('next-step-btn').addEventListener('click', () => nav(nextStep.hash));
  document.getElementById('retry-btn').addEventListener('click', () => startQuizSession(s));
  document.getElementById('back-btn').addEventListener('click', () => nav(s.backHash));

  if (passed) successFlash(isFinal);
}

/* ---------- Flash logu sukcesu — zastępuje konfetti, spójne z estetyką logów systemowych ---------- */
function successFlash(isFinal) {
  const root = document.getElementById('success-flash-root');
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = isFinal
    ? ['[OK] Test końcowy zaliczony', '[OK] +15 xp']
    : ['[OK] Zaliczono', '[OK] +15 xp'];
  root.innerHTML = '';
  lines.forEach((text, i) => {
    const el = document.createElement('div');
    el.className = 'success-flash-line';
    if (isFinal) el.style.color = 'var(--violet)';
    el.textContent = text;
    if (!reduced) el.style.animationDelay = (i * 0.15) + 's, ' + (i * 0.15 + 1.5) + 's';
    root.appendChild(el);
    setTimeout(() => el.remove(), reduced ? 100 : 2200);
  });
}

/* ---------- Service Worker (offline PWA) ---------- */
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* cicha degradacja offline */ });
  }
}
