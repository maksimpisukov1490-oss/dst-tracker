/* ============================================================
   Компендиум выжившего — логика трекера
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'dst-compendium-v2';
  var LEGACY_KEY = 'dst-compendium-v1';

  var CATS = window.CATEGORIES || [];
  var BOSSES = (window.BOSSES || []).slice();
  var CHARACTERS = window.CHARACTERS || [];
  var MILESTONES = window.MILESTONES || { groups: [], items: [] };
  var SKILL_TREES = window.SKILL_TREES || {};
  var CHAR_ALIASES = { wathgrithr: 'wigfrid', waxwell: 'maxwell' };
  var APP_VERSION = window.APP_VERSION || '1.0.0';
  var APP_BUILD = window.APP_BUILD || '';

  var MILESTONE_IDS = {};
  (function () {
    (MILESTONES.groups || []).forEach(function (g) {
      (g.items || []).forEach(function (it) { MILESTONE_IDS[it.id] = true; });
    });
    (MILESTONES.items || []).forEach(function (it) { MILESTONE_IDS[it.id] = true; });
  })();

  var els = {
    tabs: document.getElementById('tabs'),
    grid: document.getElementById('grid'),
    empty: document.getElementById('empty'),
    title: document.getElementById('section-title'),
    hint: document.getElementById('section-hint'),
    pCount: document.getElementById('progress-count'),
    pPercent: document.getElementById('progress-percent'),
    pFill: document.getElementById('progress-fill'),
    pCaption: document.getElementById('progress-caption'),
    search: document.getElementById('search'),
    filters: document.getElementById('filters'),
    silhouettes: document.getElementById('opt-silhouettes'),
    toolbar: document.getElementById('toolbar'),
    entry: document.getElementById('entry'),
    entryBody: document.getElementById('entry-body'),
    start: document.getElementById('start'),
    startBody: document.getElementById('start-body'),
    runNow: document.getElementById('run-now'),
    runNowImg: document.getElementById('run-now-img'),
    runNowName: document.getElementById('run-now-name'),
    runNowChar: document.getElementById('run-now-char'),
    toast: document.getElementById('toast'),
    fileInput: document.getElementById('file-input'),
    sync: document.getElementById('btn-sync')
  };

  /* ---------- состояние ---------- */

  var state = {
    tab: 'all',
    filter: 'all',
    query: '',
    silhouettes: true,
    runs: [],
    currentRunId: null,
    kills: {},
    marks: {},
    pickChar: '',
    pickName: '',
    variantPick: {}
  };

  function newRun(name, char) {
    return {
      id: 'run-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name,
      char: char || '',
      player: '',
      worldName: '',
      auto: false,
      day: 0,
      createdAt: today(),
      kills: {},
      marks: {}
    };
  }

  function sanitizeKills(kills) {
    if (!kills || typeof kills !== 'object') return {};
    Object.keys(kills).forEach(function (slug) {
      var k = kills[slug];
      if (!k || typeof k !== 'object') { delete kills[slug]; return; }
      k.count = Math.max(0, parseInt(k.count, 10) || 0);
      k.date = typeof k.date === 'string' ? k.date : '';
      k.day = Math.max(0, parseInt(k.day, 10) || 0);
      k.note = typeof k.note === 'string' ? k.note : '';
    });
    return kills;
  }

  function sanitizeRun(r) {
    if (!r || typeof r !== 'object') return null;
    r.id = typeof r.id === 'string' && r.id ? r.id : newRun('', '').id;
    r.name = typeof r.name === 'string' && r.name.trim() ? r.name.trim() : 'Забег';
    r.char = typeof r.char === 'string' ? (CHAR_ALIASES[r.char] || r.char) : '';
    r.player = typeof r.player === 'string' ? r.player : '';
    r.worldName = typeof r.worldName === 'string' ? r.worldName : '';
    r.auto = r.auto === true;
    r.day = Math.max(0, parseInt(r.day, 10) || 0);
    r.retroApplied = (r.retroApplied && typeof r.retroApplied === 'object') ? r.retroApplied : {};
    if (r.skills && typeof r.skills === 'object') {
      r.skills = {
        char: typeof r.skills.char === 'string' ? (CHAR_ALIASES[r.skills.char] || r.skills.char) : '',
        list: Array.isArray(r.skills.list) ? r.skills.list.filter(function (x) { return typeof x === 'string'; }) : [],
        points: Math.max(0, parseInt(r.skills.points, 10) || 0),
        xp: Math.max(0, parseInt(r.skills.xp, 10) || 0)
      };
    } else {
      r.skills = null;
    }
    r.createdAt = typeof r.createdAt === 'string' ? r.createdAt : '';
    r.kills = sanitizeKills(r.kills || {});
    r.marks = (r.marks && typeof r.marks === 'object') ? r.marks : {};
    return r;
  }

  function load() {
    var hadV2 = false;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data && Array.isArray(data.runs)) {
          hadV2 = true;
          state.runs = data.runs.map(sanitizeRun).filter(Boolean);
          state.currentRunId = data.currentRunId || (state.runs[0] && state.runs[0].id) || null;
          state.silhouettes = data.silhouettes !== false;
          state.tab = data.tab || 'all';
          state.filter = data.filter || 'all';
        }
      }
    } catch (e) { /* повреждённое хранилище — начинаем заново */ }

    if (!state.runs.length && !hadV2) {
      // миграция старого одиночного дневника
      try {
        var lraw = localStorage.getItem(LEGACY_KEY);
        if (lraw) {
          var old = JSON.parse(lraw);
          var run = newRun('Первый забег', 'wilson');
          run.kills = sanitizeKills(old.kills || {});
          run.marks = (old.marks && typeof old.marks === 'object') ? old.marks : {};
          state.runs = [run];
          state.currentRunId = run.id;
          if (typeof old.silhouettes === 'boolean') state.silhouettes = old.silhouettes;
          if (old.tab) state.tab = old.tab;
          if (old.filter) state.filter = old.filter;
          try { localStorage.removeItem(LEGACY_KEY); } catch (e2) { /* ignore */ }
        }
      } catch (e) { /* старый формат нечитаем — пропускаем */ }
    }

    state.pickChar = CHARACTERS[0] ? CHARACTERS[0].key : '';
    bindRun();
  }

  var saveTimer = null;
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 2,
        runs: state.runs,
        currentRunId: state.currentRunId,
        silhouettes: state.silhouettes,
        tab: state.tab,
        filter: state.filter
      }));
    } catch (e) { toast('Не удалось сохранить прогресс в браузере'); }
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 120);
  }

  function currentRun() {
    for (var i = 0; i < state.runs.length; i++) {
      if (state.runs[i].id === state.currentRunId) return state.runs[i];
    }
    return null;
  }

  function bindRun() {
    var r = currentRun();
    state.kills = r ? r.kills : {};
    state.marks = r ? r.marks : {};
  }

  function kill(slug) {
    var k = state.kills[slug];
    if (!k) { k = state.kills[slug] = { count: 0, date: '', day: 0, note: '' }; }
    return k;
  }
  function isKilled(slug) { return kill(slug).count > 0; }

  function charByKey(key) {
    key = CHAR_ALIASES[key] || key;
    for (var i = 0; i < CHARACTERS.length; i++) if (CHARACTERS[i].key === key) return CHARACTERS[i];
    return null;
  }

  /* ---------- утилиты ---------- */

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function fmtDate(iso) {
    if (!iso) return '';
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return iso;
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return parseInt(m[3], 10) + ' ' + months[parseInt(m[2], 10) - 1] + ' ' + m[1];
  }

  function num(v) {
    if (v === null || v === undefined || v === '') return null;
    var s = String(v).replace(/[^0-9.,\-–—\s]/g, '').replace(/[–—]/g, '-').trim();
    if (!s) return String(v).trim();
    var parts = s.split(/\s*(?:-|,|\.\.)\s*/);
    return parts.map(function (p) {
      var n = p.replace(/\s/g, '');
      var f = parseFloat(n);
      if (isNaN(f)) return p;
      return String(f).replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
    }).join(' – ');
  }

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function catOf(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i];
    return { id: id, name: id, hint: '' };
  }

  function art(b) {
    return b.art ? 'assets/bosses/' + b.slug + '.png' : '';
  }

  var toastTimer = null;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.hidden = true; }, 2600);
  }

  /* ---------- прогресс ---------- */

  function scope() {
    // список боссов, к которым применяется прогресс текущей вкладки
    if (state.tab === 'chronicle' || state.tab === 'all') return BOSSES;
    return BOSSES.filter(function (b) { return b.category === state.tab; });
  }

  function progress(list) {
    var done = 0;
    list.forEach(function (b) { if (isKilled(b.slug)) done++; });
    return { done: done, total: list.length, pct: list.length ? Math.round(done * 100 / list.length) : 0 };
  }

  /* ---------- вехи и общий прогресс ---------- */

  function markOn(id) { return !!state.marks[id]; }

  function milestoneItems() {
    var items = [];
    (MILESTONES.groups || []).forEach(function (g) {
      (g.items || []).forEach(function (it) {
        items.push({ id: it.id, name: it.name, note: it.note, group: g });
      });
    });
    (MILESTONES.items || []).forEach(function (it) {
      items.push({ id: it.id, name: it.name, note: it.note, icon: it.icon, icon_img: it.icon_img, group: null });
    });
    return items;
  }

  function groupLimit(g) {
    var n = g.limit || (g.items || []).length;
    return n > 0 ? n : (g.items || []).length;
  }

  // Задания группы: сколько отмечено и закрыта ли награда.
  function groupProgress(g) {
    var items = g.items || [], raw = 0;
    items.forEach(function (it) { if (markOn(it.id)) raw++; });
    var limit = groupLimit(g);
    var done = Math.min(raw, limit);
    return {
      done: done,
      raw: raw,
      total: limit,
      pct: limit ? Math.round(done * 100 / limit) : 0,
      complete: raw >= limit
    };
  }

  // Общий прогресс забега: боссы + по одной награде за каждую группу вех + отдельные вехи.
  function progressFor(kills, marks) {
    var total = BOSSES.length + (MILESTONES.groups || []).length + (MILESTONES.items || []).length;
    var done = 0;
    BOSSES.forEach(function (b) {
      var k = kills[b.slug];
      if (k && k.count > 0) done++;
    });
    (MILESTONES.groups || []).forEach(function (g) {
      var items = g.items || [], raw = 0;
      items.forEach(function (it) { if (marks[it.id]) raw++; });
      if (raw >= groupLimit(g)) done++;
    });
    (MILESTONES.items || []).forEach(function (it) { if (marks[it.id]) done++; });
    return { done: done, total: total, pct: total ? Math.round(done * 100 / total) : 0 };
  }

  function overallProgress() { return progressFor(state.kills, state.marks); }

  function renderHead() {
    var isProgress = state.tab === 'progress';
    var isSkills = state.tab === 'skills';
    if (els.toolbar) els.toolbar.hidden = isProgress || isSkills;
    if (isSkills) {
      var tree = skillTreeForCurrent();
      var st = skillStats(tree, currentRun() && currentRun().skills);
      els.title.textContent = 'Навыки';
      els.hint.textContent = tree ? ('Древо навыков: ' + tree.name) : 'У этого персонажа нет древа навыков';
      els.pCount.textContent = st.learned + ' / ' + st.total;
      els.pPercent.textContent = st.pct + '%';
      els.pFill.style.width = st.pct + '%';
      els.pCaption.textContent = tree
        ? (st.learned ? 'Изучено навыков: ' + st.learned + ' из ' + st.total : 'Навыки ещё не изучены')
        : 'Древо навыков есть не у всех персонажей';
      return;
    }
    if (isProgress) {
      var pc = catOf('progress');
      els.title.textContent = pc.name;
      els.hint.textContent = pc.hint || '';
      var op = overallProgress();
      els.pCount.textContent = op.done + ' / ' + op.total;
      els.pPercent.textContent = op.pct + '%';
      els.pFill.style.width = op.pct + '%';
      els.pCaption.textContent = op.pct >= 100
        ? 'Все параметры закрыты — мир пройден на 100%!'
        : (op.done === 0 ? 'Пока ни один параметр не отмечен'
          : 'Отмечено параметров: ' + op.done + ' из ' + op.total);
      return;
    }
    var cat = state.tab === 'chronicle'
      ? { name: 'Хроника охоты', hint: 'Все победы по порядку — от первой до последней' }
      : catOf(state.tab);
    if (state.tab === 'all') { cat = { name: 'Все чудовища', hint: catOf('all').hint }; }

    els.title.textContent = cat.name;
    els.hint.textContent = cat.hint || '';

    var p = progress(scope());
    els.pCount.textContent = p.done + ' / ' + p.total;
    els.pPercent.textContent = p.pct + '%';
    els.pFill.style.width = p.pct + '%';

    var cap;
    if (p.total === 0) cap = 'Пока пусто';
    else if (p.done === 0) cap = 'Ни одно чудовище не повержено';
    else if (p.done === p.total) cap = 'Компендиум закрыт. Настоящий охотник!';
    else if (p.pct >= 50) cap = 'Больше половины дневника заполнено';
    else cap = 'Охота идёт: закрыто записей — ' + p.done;
    els.pCaption.textContent = cap;
  }

  /* ---------- вкладки ---------- */

  function skillTreeForCurrent() {
    var run = currentRun();
    if (!run || !run.char) return null;
    return SKILL_TREES[run.char] || null;
  }

  function skillStats(tree, skillsState) {
    if (!tree) return { total: 0, learned: 0, pct: 0 };
    var on = {};
    ((skillsState && skillsState.list) || []).forEach(function (id) { on[id] = true; });
    var total = 0, learned = 0;
    tree.skills.forEach(function (s) {
      if (s.lock) return;
      total++;
      if (on[s.id]) learned++;
    });
    return { total: total, learned: learned, pct: total ? Math.round(learned * 100 / total) : 0 };
  }

  function renderTabs() {
    var tree = skillTreeForCurrent();
    var html = '';
    CATS.forEach(function (c) {
      if (c.id === 'chronicle' && tree) {
        var st = skillStats(tree, currentRun() && currentRun().skills);
        html += '<button class="tab' + (state.tab === 'skills' ? ' is-on' : '') + '" data-tab="skills">' +
          '<span class="tab__icon" aria-hidden="true">✦</span>Навыки' +
          '<span class="tab__count">' + st.learned + '/' + st.total + '</span></button>';
      }
      var p;
      if (c.id === 'progress') {
        p = overallProgress();
      } else {
        var list = c.id === 'all' ? BOSSES : BOSSES.filter(function (b) { return b.category === c.id; });
        p = progress(list);
      }
      if (c.id === 'chronicle') {
        var wins = 0, kinds = 0;
        BOSSES.forEach(function (b) {
          var k = kill(b.slug);
          if (k.count > 0) { kinds++; wins += k.count; }
        });
        p = { done: wins, total: kinds };
      }
      var on = state.tab === c.id ? ' is-on' : '';
      html += '<button class="tab' + on + '" data-tab="' + c.id + '">' +
        '<span class="tab__icon" aria-hidden="true">' + (c.icon || '') + '</span>' +
        esc(c.name) +
        '<span class="tab__count">' + (c.id === 'chronicle'
          ? (p.total ? p.total + ' вид.' : '—')
          : p.done + '/' + p.total) + '</span></button>';
    });
    els.tabs.innerHTML = html;
  }

  /* ---------- сетка ---------- */

  function visible() {
    var q = state.query.trim().toLowerCase();
    return BOSSES.filter(function (b) {
      if (state.tab !== 'all' && state.tab !== 'chronicle' && b.category !== state.tab) return false;
      var k = isKilled(b.slug);
      if (state.filter === 'killed' && !k) return false;
      if (state.filter === 'alive' && k) return false;
      if (q) {
        var hay = (b.name_ru + ' ' + (b.name_en || '') + ' ' + (b.slug || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function loreExcerpt(b) {
    var t = (b.lore || '').trim();
    if (!t) return '';
    var m = t.match(/^[^.!?]+[.!?]/);
    var s = m ? m[0] : t;
    if (s.length > 118) {
      s = s.slice(0, 115).replace(/\s+\S*$/, '') + '…';
    }
    return s;
  }

  function cardHtml(b) {
    var k = kill(b.slug);
    var lore = loreExcerpt(b);
    var killed = k.count > 0;
    var locked = !killed && state.silhouettes;
    var img = art(b);
    var stamp = killed
      ? '<div class="stamp stamp--small"><span>Побеждён</span><em>' +
        (k.date ? esc(fmtDate(k.date)) : '') + '</em></div>'
      : '';
    return '<button class="card' + (locked ? ' is-locked' : '') + '" data-slug="' + b.slug + '" ' +
      'aria-label="' + esc(b.name_ru) + (killed ? ' — побеждён' : ' — ещё не побеждён') + '">' +
      '<span class="card__cat">' + esc(catOf(b.category).short || catOf(b.category).name) + '</span>' +
      stamp +
      '<span class="card__art">' +
      (img ? '<img src="' + img + '" alt="' + esc(b.name_ru) + '" loading="lazy">'
        : '<span class="card__noart">?</span>') +
      (lore ? '<span class="card__lore">' +
        '<span class="card__lore-label">' + esc(b.name_en || 'Компендиум') + '</span>' +
        '<span class="card__lore-text">' + esc(lore) + '</span>' +
      '</span>' : '') +
      '</span>' +
      '<span class="card__plate">' +
      '<span class="card__name">' + esc(b.name_ru) + '</span>' +
      '<span class="card__status">' + (killed
        ? 'побед: <b>' + k.count + '</b>' + (k.date ? ' &middot; ' + esc(fmtDate(k.date)) : '') +
          (k.day ? ' &middot; день ' + k.day : '')
        : 'запись не закрыта') + '</span>' +
      '</span>' +
      '</button>';
  }

  function renderGrid() {
    if (state.tab === 'progress') { renderProgress(); return; }
    if (state.tab === 'skills') { renderSkills(); return; }
    if (state.tab === 'chronicle') { renderChronicle(); return; }
    var list = visible();
    els.grid.hidden = false;
    els.grid.innerHTML = list.map(cardHtml).join('');
    els.empty.hidden = list.length > 0;
  }

  var SKILL_THRESHOLDS = [3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

  function xpProgress(xp) {
    var total = 0;
    for (var i = 0; i < SKILL_THRESHOLDS.length; i++) total += SKILL_THRESHOLDS[i];
    if (xp >= total) return 100;
    var prev = 0, next = total, cum = 0;
    for (var j = 0; j < SKILL_THRESHOLDS.length; j++) {
      cum += SKILL_THRESHOLDS[j];
      if (xp < cum) { next = cum; break; }
      prev = cum;
    }
    if (next <= prev) return 100;
    return Math.max(0, Math.min(100, Math.round((xp - prev) * 100 / (next - prev))));
  }

  function renderSkills() {
    var run = currentRun();
    var tree = skillTreeForCurrent();
    els.grid.hidden = false;
    if (!tree) {
      els.empty.hidden = false;
      els.grid.innerHTML = '';
      return;
    }
    els.empty.hidden = true;

    var skillsState = (run && run.skills) || null;
    var learned = {};
    ((skillsState && skillsState.list) || []).forEach(function (id) { learned[id] = true; });

    var byId = {};
    tree.skills.forEach(function (s) { byId[s.id] = s; });

    var available = {};
    tree.skills.forEach(function (s) {
      if (s.lock || learned[s.id]) return;
      var parents = (s.connects || []).filter(function (id) { return learned[id]; });
      if (s.root || parents.length) available[s.id] = true;
    });

    var pad = 44;
    var minX = tree.bounds.minX, maxX = tree.bounds.maxX;
    var minY = tree.bounds.minY, maxY = tree.bounds.maxY;
    var vb = (minX - pad) + ' ' + (-maxY - pad) + ' ' +
      (maxX - minX + pad * 2) + ' ' + (maxY - minY + pad * 2);

    var groupBounds = {};
    tree.skills.forEach(function (s) {
      var g = s.group || '';
      if (!groupBounds[g]) groupBounds[g] = { minX: s.x, maxX: s.x, maxY: s.y };
      groupBounds[g].minX = Math.min(groupBounds[g].minX, s.x);
      groupBounds[g].maxX = Math.max(groupBounds[g].maxX, s.x);
      groupBounds[g].maxY = Math.max(groupBounds[g].maxY, s.y);
    });
    var groupLabels = Object.keys(groupBounds).map(function (g) {
      var label = (tree.groups && tree.groups[g]) || '';
      if (!label) return '';
      var b = groupBounds[g];
      return '<text x="' + ((b.minX + b.maxX) / 2) + '" y="' + (-b.maxY - 34) +
        '" text-anchor="middle" class="skilltree__group">' + esc(label) + '</text>';
    }).join('');

    var lines = [], seen = {};
    tree.skills.forEach(function (s) {
      (s.connects || []).concat(s.locks || []).forEach(function (tid) {
        var t = byId[tid];
        if (!t) return;
        var key = s.id < tid ? s.id + '|' + tid : tid + '|' + s.id;
        if (seen[key]) return;
        seen[key] = true;
        var lit = learned[s.id] && learned[tid];
        lines.push('<line x1="' + s.x + '" y1="' + (-s.y) + '" x2="' + t.x + '" y2="' + (-t.y) +
          '" class="' + (lit ? 'is-on' : '') + '"/>');
      });
    });

    var nodes = tree.skills.map(function (s) {
      var on = !!learned[s.id];
      var av = !!available[s.id];
      var cls = 'sknode' + (on ? ' is-on' : '') + (av ? ' is-available' : '') + (s.lock ? ' is-lock' : '');
      var icon = s.icon
        ? '<image x="' + (s.x - 13) + '" y="' + (-s.y - 13) + '" width="26" height="26" href="' + esc(s.icon) + '"/>'
        : '';
      var glyph = s.lock
        ? '<g class="sknode__lockmark" transform="translate(' + s.x + ',' + (-s.y) + ')">' +
            '<path d="M-6 -2 v-5 a6 6 0 0 1 12 0 v5"/>' +
            '<rect x="-8" y="-2" width="16" height="12" rx="2"/>' +
            '<circle cx="0" cy="4.5" r="1.5" class="sknode__keyhole"/>' +
          '</g>'
        : (s.icon ? '' : '<text x="' + s.x + '" y="' + (-s.y + 5) + '" text-anchor="middle" class="sknode__q">?</text>');
      return '<g class="' + cls + '" data-skill="' + esc(s.id) + '" aria-label="' + esc(s.title) + '">' +
        '<circle class="sknode__ring" cx="' + s.x + '" cy="' + (-s.y) + '" r="20"/>' +
        '<circle class="sknode__inner" cx="' + s.x + '" cy="' + (-s.y) + '" r="15"/>' +
        icon + glyph + '</g>';
    }).join('');

    var points = skillsState ? (skillsState.points || 0) : 0;
    var xp = skillsState ? (skillsState.xp || 0) : 0;
    var xpPct = xpProgress(xp);
    var insight = skillsState
      ? '<div class="skilltree__insight"><span class="skilltree__star">✦</span><b>' + points + '</b><span>озарения</span></div>'
      : '<div class="skilltree__insight skilltree__insight--off">Подключи игру</div>';
    var xpBlock = skillsState
      ? '<div class="skilltree__xp"><div class="skilltree__xpbar"><i style="width:' + xpPct + '%"></i></div>' +
        '<span class="skilltree__xptext">Опыт: <b>' + xp + '</b></span></div>'
      : '';
    var face = tree.head ? '<img class="skilltree__face" src="' + esc(tree.head) + '" alt="">' : '';

    var lockConds = [];
    tree.skills.forEach(function (s) {
      if (s.lock && s.title && lockConds.indexOf(s.title) < 0) lockConds.push(s.title);
    });
    var lockBlock = lockConds.length
      ? '<details class="skilltree__locks" open><summary>Условия открытия (' + lockConds.length + ')</summary><ul>' +
        lockConds.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></details>'
      : '';

    els.grid.innerHTML = '<div class="skilltree">' +
      '<div class="skilltree__head">' + face +
        '<div class="skilltree__title"><h3>' + esc(tree.name) + '</h3><p>Древо навыков</p></div>' +
        insight +
        '<div class="skilltree__legend"><span class="is-on">изучено</span><span>не изучено</span><span class="is-lock">условие</span></div>' +
      '</div>' + xpBlock +
      '<div class="skilltree__canvas">' +
        '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
          '<g class="skilltree__groups">' + groupLabels + '</g>' +
          '<g class="skilltree__lines">' + lines.join('') + '</g>' +
          '<g class="skilltree__nodes">' + nodes + '</g>' +
        '</svg></div>' +
      '<div class="skilltree__details" id="skill-details">Нажми на навык, чтобы прочитать описание.</div>' +
      lockBlock +
      '<div class="skilltip" id="skill-tip" hidden></div>' +
      '</div>';

    wireSkills(tree);
  }

  function wireSkills(tree) {
    var box = els.grid.querySelector('.skilltree');
    if (!box) return;
    var details = document.getElementById('skill-details');
    if (!details) return;
    var tip = document.getElementById('skill-tip');

    function skillById(id) {
      var found = null;
      tree.skills.forEach(function (x) { if (x.id === id) found = x; });
      return found;
    }
    function statusOf(s) {
      var run = currentRun();
      var list = (run && run.skills && run.skills.list) || [];
      var on = list.indexOf(s.id) >= 0;
      var av = false;
      if (!s.lock && !on) {
        var parents = (s.connects || []).filter(function (pid) { return list.indexOf(pid) >= 0; });
        av = !!(s.root || parents.length);
      }
      return s.lock ? 'Условие открытия' : (on ? 'Изучен' : (av ? 'Доступен' : 'Не изучен'));
    }
    function placeTip(e) {
      if (!tip) return;
      var pad = 16;
      var w = tip.offsetWidth || 240;
      var h = tip.offsetHeight || 80;
      var left = e.clientX + pad;
      var top = e.clientY + pad;
      if (left + w > window.innerWidth - 8) left = e.clientX - w - pad;
      if (top + h > window.innerHeight - 8) top = e.clientY - h - pad;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }
    if (tip) {
      box.addEventListener('pointermove', function (e) {
        var g = e.target.closest ? e.target.closest('.sknode') : null;
        if (!g) { tip.hidden = true; return; }
        var s = skillById(g.getAttribute('data-skill'));
        if (!s) { tip.hidden = true; return; }
        if (tip.getAttribute('data-skill') !== s.id) {
          tip.setAttribute('data-skill', s.id);
          tip.innerHTML = s.lock
            ? '<b>Условие открытия</b><p>' + esc(s.title) + '</p>'
            : '<b>' + esc(s.title) + '</b>' +
              '<span class="skilltip__status">' + statusOf(s) + '</span>' +
              (s.desc ? '<p>' + esc(s.desc) + '</p>' : '');
        }
        tip.hidden = false;
        placeTip(e);
      });
      box.addEventListener('pointerleave', function () { tip.hidden = true; });
    }

    box.addEventListener('click', function (e) {
      var g = e.target.closest ? e.target.closest('.sknode') : null;
      if (!g) return;
      var id = g.getAttribute('data-skill');
      var s = null;
      tree.skills.forEach(function (x) { if (x.id === id) s = x; });
      if (!s) return;

      var prev = box.querySelector('.sknode.is-selected');
      if (prev) prev.classList.remove('is-selected');
      g.classList.add('is-selected');

      var run = currentRun();
      var list = (run && run.skills && run.skills.list) || [];
      var on = list.indexOf(s.id) >= 0;
      var av = false;
      if (!s.lock && !on) {
        var parents = (s.connects || []).filter(function (pid) { return list.indexOf(pid) >= 0; });
        av = !!(s.root || parents.length);
      }
      var icon = s.icon
        ? '<img class="skilltree__dicon" src="' + esc(s.icon) + '" alt="">'
        : '<span class="skilltree__dicon skilltree__dicon--lock">' +
            '<svg class="skilltree__dlock" viewBox="-10 -10 20 20" aria-hidden="true">' +
              '<path d="M-6 -2 v-5 a6 6 0 0 1 12 0 v5"/>' +
              '<rect x="-8" y="-2" width="16" height="12" rx="2"/>' +
              '<circle cx="0" cy="4.5" r="1.5"/>' +
            '</svg></span>';
      if (s.lock) {
        details.innerHTML = icon + '<div class="skilltree__dtext">' +
          '<h4>Условие открытия</h4>' +
          '<p class="skilltree__cond">' + esc(s.title) + '</p>' +
          '</div>';
        return;
      }
      var status = on ? 'Изучен' : (av ? 'Доступен' : 'Не изучен');
      details.innerHTML = icon + '<div class="skilltree__dtext">' +
        '<h4>' + esc(s.title) + '</h4>' +
        '<p class="skilltree__status' + (on ? ' is-on' : (av ? ' is-available' : '')) + '">' + status + '</p>' +
        (s.desc ? '<p>' + esc(s.desc) + '</p>' : '') +
        (s.cond && s.cond !== '-' ? '<p class="skilltree__cond">Условие: ' + esc(s.cond) + '</p>' : '') +
        '</div>';
    });
  }

  function renderChronicle() {
    els.grid.hidden = false;
    var rows = BOSSES.filter(function (b) { return isKilled(b.slug); })
      .sort(function (a, b) {
        var ka = kill(a.slug), kb = kill(b.slug);
        if (ka.date && kb.date && ka.date !== kb.date) return ka.date < kb.date ? -1 : 1;
        if (ka.date && !kb.date) return -1;
        if (!ka.date && kb.date) return 1;
        return a.name_ru.localeCompare(b.name_ru, 'ru');
      });
    if (!rows.length) {
      els.empty.hidden = false;
      els.grid.innerHTML = '';
      return;
    }
    els.empty.hidden = true;
    els.grid.innerHTML = '<div class="chronicle">' + rows.map(function (b) {
      var k = kill(b.slug), img = art(b);
      return '<button class="chron" data-slug="' + b.slug + '">' +
        (img ? '<img src="' + img + '" alt="">' : '<span class="chron__img"></span>') +
        '<span class="chron__name">' + esc(b.name_ru) + '</span>' +
        '<span class="chron__date">' + (k.date ? esc(fmtDate(k.date)) : 'дата не указана') +
          (k.day ? ' &middot; день ' + k.day : '') + '</span>' +
        '<span class="chron__count">побед: ' + k.count + '</span>' +
        '</button>';
    }).join('') + '</div>';
  }

  /* ---------- вкладка «Прогресс» ---------- */

  function pbarCard(title, p, cap) {
    return '<div class="pbar-card pbar-card--main">' +
      '<div class="pbar-card__head"><h3>' + esc(title) + '</h3>' +
      '<span class="pbar-card__num">' + p.done + ' / ' + p.total + ' · ' + p.pct + '%</span></div>' +
      '<div class="progress__bar progress__bar--big"><i style="width:' + p.pct + '%"></i></div>' +
      (cap ? '<p class="pbar-card__hint">' + esc(cap) + '</p>' : '') +
      '</div>';
  }

  function markHtml(it, locked) {
    var on = markOn(it.id);
    var dis = locked && !on;
    return '<button class="mark' + (on ? ' is-on' : '') + (dis ? ' is-locked' : '') + '" ' +
      'data-mark="' + esc(it.id) + '"' + (dis ? ' disabled' : '') +
      ' role="checkbox" aria-checked="' + (on ? 'true' : 'false') + '">' +
      '<span class="mark__box" aria-hidden="true">' + (on ? '✓' : '') + '</span>' +
      (it.icon_img ? '<img class="mark__iconimg" src="' + esc(it.icon_img) + '" alt="" loading="lazy">' : '') +
      '<span class="mark__body">' +
      '<span class="mark__name">' +
      (it.icon ? '<span class="mark__icon" aria-hidden="true">' + it.icon + '</span>' : '') +
      esc(it.name) + '</span>' +
      (it.note ? '<span class="mark__note">' + esc(it.note) + '</span>' : '') +
      '</span></button>';
  }

  function groupCard(g) {
    var gp = groupProgress(g);
    var reward = g.reward;
    var html = '<div class="pbar-card">' +
      '<div class="pbar-card__head"><h3>' +
      (g.icon_img ? '<img class="pbar-card__iconimg" src="' + esc(g.icon_img) + '" alt="">'
        : (g.icon ? '<span class="pbar-card__icon" aria-hidden="true">' + g.icon + '</span>' : '')) +
      esc(g.name) + '</h3>' +
      '<span class="pbar-card__num">' + gp.done + ' / ' + gp.total + ' · ' + gp.pct + '%</span></div>' +
      '<div class="progress__bar"><i style="width:' + gp.pct + '%"></i></div>' +
      (g.hint ? '<p class="pbar-card__hint">' + esc(g.hint) + '</p>' : '');
    if (reward) {
      html += '<div class="reward' + (gp.complete ? ' is-on' : '') + '">' +
        (reward.icon_img ? '<img src="' + esc(reward.icon_img) + '" alt="">' : '') +
        '<span class="reward__text">' + esc(reward.name) + ' — ' +
        (gp.complete ? 'получена' : 'нужно закрыть ' + gp.total + ' заданий') + '</span></div>';
    }
    html += '<div class="marks">' +
      (g.items || []).map(function (it) { return markHtml(it, gp.complete); }).join('') +
      '</div></div>';
    return html;
  }

  function renderProgress() {
    els.grid.hidden = false;
    els.empty.hidden = true;
    var o = overallProgress();
    var bp = progress(BOSSES);

    var html = '<div class="progress-view">';
    html += pbarCard('Общий прогресс забега', o,
      'Боссы + награды за квестовые ветки + вехи. 100% — забег пройден полностью.');
    html += pbarCard('Боссы', bp, 'Все записи компендиума.');

    var groups = MILESTONES.groups || [];
    var done = {};
    (MILESTONE_BRANCHES || []).forEach(function (br) {
      var list = groups.filter(function (g) { return g.branch === br.id; });
      if (!list.length) return;
      html += '<div class="branch"><div class="branch__head"><h3>' + esc(br.name) + '</h3>' +
        (br.hint ? '<p>' + esc(br.hint) + '</p>' : '') + '</div>';
      list.forEach(function (g) { html += groupCard(g); done[g.id] = 1; });
      html += '</div>';
    });
    groups.forEach(function (g) { if (!done[g.id]) html += groupCard(g); });

    var mi = MILESTONES.items || [];
    if (mi.length) {
      var md = 0;
      mi.forEach(function (it) { if (markOn(it.id)) md++; });
      html += '<div class="pbar-card">' +
        '<div class="pbar-card__head"><h3>Вехи</h3>' +
        '<span class="pbar-card__num">' + md + ' / ' + mi.length + ' · ' +
        Math.round(md * 100 / mi.length) + '%</span></div>' +
        '<div class="marks">' + mi.map(function (it) { return markHtml(it); }).join('') + '</div>' +
        '</div>';
    }
    html += '</div>';
    els.grid.innerHTML = html;
  }

  function toggleMark(id) {
    var name = '';
    milestoneItems().forEach(function (m) { if (m.id === id) name = m.name; });
    if (state.marks[id]) {
      delete state.marks[id];
      toast('Отметка снята: ' + name);
    } else {
      // не даём отмечать задания после получения награды группы
      var blocked = false, gname = '';
      (MILESTONES.groups || []).forEach(function (g) {
        var belongs = (g.items || []).some(function (it) { return it.id === id; });
        if (!belongs) return;
        if (groupProgress(g).complete) { blocked = true; gname = g.name; }
      });
      if (blocked) {
        toast('Награда «' + gname + '» уже получена — отметки закрыты');
        return;
      }
      state.marks[id] = true;
      toast('Отмечено: ' + name);
    }
    save();
    renderAll();
  }

  /* ---------- страница записи ---------- */

  var currentSlug = null;

  function fact(k, v) {
    if (v === null || v === undefined || v === '') return '';
    return '<div class="fact"><div class="fact__k">' + esc(k) + '</div>' +
      '<div class="fact__v">' + esc(v) + '</div></div>';
  }

  function openEntry(slug) {
    var b = null;
    for (var i = 0; i < BOSSES.length; i++) if (BOSSES[i].slug === slug) { b = BOSSES[i]; break; }
    if (!b) return;
    currentSlug = slug;
    renderEntry(b);
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
  }

  function closeEntry() {
    els.entry.hidden = true;
    currentSlug = null;
    document.body.style.overflow = '';
  }

  function lootBlock(b, vp) {
    var loot = vp ? variantLoot(b, vp) : (b.loot || []);
    if (!loot.length) return '';
    var chips = loot.map(function (l) {
      return '<span class="loot__item">' +
        (l.icon ? '<img class="loot__icon" src="' + esc(l.icon) + '" alt="" loading="lazy">' : '') +
        '<span class="loot__name">' + esc(l.ru || l.en || '') + '</span>' +
        (l.qty ? '<span class="loot__qty">' + esc(l.qty) + '</span>' : '') +
        (l.chance ? '<span class="loot__chance">' + esc(l.chance) + '</span>' : '') +
        '</span>';
    }).join('');
    return '<div class="notes-block"><h4>Добыча</h4><div class="loot">' + chips + '</div>' +
      (vp ? '<p class="loot__hint">Теневой атриум и снаряжение падают только с фигур 3-го уровня.</p>' : '') +
      '</div>';
  }

  function quotesBlock(b) {
    var q = b.quotes || [];
    if (!q.length) return '';
    var heads = q.map(function (it, i) {
      var face = it.head
        ? '<img src="' + esc(it.head) + '" alt="' + esc(it.name) + '" loading="lazy">'
        : '<span class="qhead__ph">' + esc(it.name.charAt(0)) + '</span>';
      return '<button type="button" class="qhead' + (i === 0 ? ' is-on' : '') + '" ' +
        'data-q="' + i + '" title="' + esc(it.name) + '" aria-label="' + esc(it.name) + '">' +
        face + '</button>';
    }).join('');
    var list = q.map(function (it, i) {
      return '<div class="quote' + (i === 0 ? ' is-on' : '') + '" data-quote="' + i + '">' +
        '<div class="quote__who">' + esc(it.name) + '</div>' +
        '<div class="quote__text">«' + esc(it.text) + '»</div>' +
        '</div>';
    }).join('');
    return '<div class="quotes"><h4>Цитаты персонажей</h4>' +
      '<div class="qheads">' + heads + '</div>' +
      '<div class="quotes__list">' + list + '</div></div>';
  }

  function stat(v) {
    if (v === null || v === undefined || v === '') return '';
    var s = String(v);
    return /[A-Za-zА-Яа-яЁё]/.test(s) ? s : num(s);
  }

  function rangeOf(nums) {
    var a = nums.filter(function (n) { return !isNaN(n); });
    if (!a.length) return '';
    var min = Math.min.apply(null, a), max = Math.max.apply(null, a);
    return min === max ? num(min) : num(min) + ' – ' + num(max);
  }

  function variantPick(b) {
    var pick = state.variantPick[b.slug] || {};
    (b.variants.pieces || []).forEach(function (p) {
      var n = parseInt(pick[p.id], 10);
      if (!(n >= 1 && n <= p.levels.length)) n = p.levels.length;
      pick[p.id] = n;
    });
    state.variantPick[b.slug] = pick;
    return pick;
  }

  function variantLoot(b, pick) {
    var byKey = {}, order = [];
    (b.variants.pieces || []).forEach(function (p) {
      var lvl = pick[p.id];
      (b.variants.loot || []).forEach(function (l) {
        if (l.level !== lvl) return;
        var key = (l.en || l.ru) + '|' + (l.qty || '');
        if (!byKey[key]) {
          byKey[key] = { ru: l.ru, en: l.en, qty: l.qty || '', icon: l.icon || '', chance: '', n: 0 };
          order.push(key);
        }
        byKey[key].n++;
      });
    });
    return order.map(function (key) {
      var it = byKey[key];
      if (it.n > 1) it.qty = (it.qty ? it.qty + ' ' : '') + '×' + it.n;
      return it;
    });
  }

  function variantsBlock(b, pick) {
    var rows = (b.variants.pieces || []).map(function (p) {
      var btns = p.levels.map(function (lv, i) {
        return '<button type="button" class="vbtn' + (pick[p.id] === i + 1 ? ' is-on' : '') + '" ' +
          'data-vpiece="' + esc(p.id) + '" data-vlevel="' + (i + 1) + '" ' +
          'aria-pressed="' + (pick[p.id] === i + 1 ? 'true' : 'false') + '">' + (i + 1) + '</button>';
      }).join('');
      return '<div class="variant"><span class="variant__name">' + esc(p.name) + '</span>' +
        '<span class="variant__levels">' + btns + '</span></div>';
    }).join('');
    return '<div class="variants"><h4>' + esc(b.variants.title || 'Фазы') + '</h4>' +
      '<p class="variants__hint">Выбери уровень каждой фигуры — характеристики и добыча пересчитаются.</p>' +
      rows + '</div>';
  }

  function variantFacts(b, pick) {
    var hps = [], dmgs = [], pers = [], rngs = [], spds = [];
    (b.variants.pieces || []).forEach(function (p) {
      var lv = p.levels[pick[p.id] - 1];
      hps.push(+lv.hp); dmgs.push(+lv.damage);
      pers.push(+lv.attack_period); rngs.push(+lv.attack_range); spds.push(+lv.speed);
    });
    return [
      fact('Здоровье', rangeOf(hps) + ' на фигуру'),
      fact('Урон', rangeOf(dmgs)),
      fact('Планарный урон', 'нет'),
      fact('Период атаки', rangeOf(pers) + ' сек'),
      fact('Дистанция', rangeOf(rngs)),
      fact('Скорость', rangeOf(spds)),
      fact('Рассудок', b.sanity || '')
    ].join('');
  }

  function renderEntry(b) {
    var k = kill(b.slug);
    var killed = k.count > 0;
    var locked = !killed && state.silhouettes;
    var img = art(b);
    var cat = catOf(b.category);

    var vp = b.variants ? variantPick(b) : null;
    var facts = vp ? variantFacts(b, vp) : [
      fact('Здоровье', stat(b.hp)),
      fact('Урон', stat(b.damage)),
      fact('Планарный урон', b.planar_damage ? stat(b.planar_damage) : 'нет'),
      fact('Период атаки', b.attack_period ? stat(b.attack_period) + ' сек' : ''),
      fact('Дистанция', b.attack_range ? stat(b.attack_range) : ''),
      fact('Скорость', b.speed ? stat(b.speed) : ''),
      fact('Рассудок', b.sanity || '')
    ].join('');

    els.entryBody.innerHTML =
      '<div class="entry__grid">' +
        '<div class="entry__left">' +
          '<div class="portrait' + (locked ? ' is-locked' : '') + '">' +
            (img ? '<img src="' + img + '" alt="' + esc(b.name_ru) + '">' : '<div class="card__noart">?</div>') +
            (killed ? '<div class="stamp portrait__stamp"><span>Побеждён</span><em>' +
              (k.date ? esc(fmtDate(k.date)) : '') + '</em></div>' : '') +
          '</div>' +
        '</div>' +
        '<div class="entry__right">' +
          '<h3 class="entry__name" id="entry-name">' + esc(b.name_ru) + '</h3>' +
          '<span class="entry__cat">' + esc(cat.name) + '</span>' +
          (b.lore ? '<p class="entry__lore">' + esc(b.lore) + '</p>' : '') +
          (b.variants ? variantsBlock(b, vp) : '') +
          (facts ? '<div class="facts">' + facts + '</div>' : '') +
          (b.spawn ? '<div class="notes-block"><h4>Как найти</h4><p class="entry__lore" style="border:0;padding:0">' +
            esc(b.spawn) + '</p></div>' : '') +
          lootBlock(b, vp) +
          '<div class="hunt">' +
            '<h4>Запись охотника</h4>' +
            '<div class="hunt__row">' +
              '<button class="kill-btn' + (killed ? ' is-killed' : '') + '" id="kill-btn">' +
                (killed ? 'Записать ещё победу' : 'Побеждён!') + '</button>' +
              (killed ? '<button class="undo-btn" id="undo-btn">Снять отметку</button>' : '') +
              '<div class="field"><label for="kill-date">Дата победы</label>' +
                '<input type="date" id="kill-date" value="' + esc(k.date) + '"></div>' +
              '<div class="field"><label>Побед</label>' +
                '<div class="counter"><button id="cnt-minus" aria-label="минус">–</button>' +
                '<output id="cnt-out">' + k.count + '</output>' +
                '<button id="cnt-plus" aria-label="плюс">+</button></div></div>' +
            '</div>' +
            '<div class="field" style="margin-top:14px">' +
              '<label for="kill-note">Заметки: с кем бился, чем, что пошло не так</label>' +
              '<textarea id="kill-note" placeholder="Например: убит Венди с копьём и боевым шлемом, помогли 4 свина&hellip;">' +
              esc(k.note) + '</textarea>' +
            '</div>' +
            '<p class="hint">Статус ставится вручную: отметку можно снять, дату и число побед — поправить.</p>' +
            (k.day ? '<p class="hunt__day">Последняя победа — день <b>' + k.day + '</b> в игре.</p>' : '') +
          '</div>' +
          quotesBlock(b) +
        '</div>' +
      '</div>';

    wireHunt(b);
    wireVariants(b);
  }

  function wireVariants(b) {
    var box = els.entryBody.querySelector('.variants');
    if (!box) return;
    box.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-vpiece]');
      if (!btn) return;
      var pick = variantPick(b);
      pick[btn.dataset.vpiece] = parseInt(btn.dataset.vlevel, 10);
      renderEntry(b);
    });
  }

  function wireHunt(b) {
    var slug = b.slug;
    var btn = document.getElementById('kill-btn');
    var undo = document.getElementById('undo-btn');
    var date = document.getElementById('kill-date');
    var note = document.getElementById('kill-note');
    var minus = document.getElementById('cnt-minus');
    var plus = document.getElementById('cnt-plus');

    function bump(n) {
      var k = kill(slug);
      k.count = Math.max(0, k.count + n);
      if (k.count > 0 && !k.date) k.date = today();
      if (k.count === 0) k.date = '';
      save();
      renderEntry(b);
      renderAll();
    }

    btn.addEventListener('click', function () {
      var k = kill(slug);
      if (k.count === 0) {
        k.count = 1;
        k.date = today();
        toast(b.name_ru + ' повержен! Запись внесена в компендиум');
      } else {
        k.count += 1;
        toast('Ещё одна победа: ' + b.name_ru + ' (всего ' + k.count + ')');
      }
      save();
      renderEntry(b);
      renderAll();
    });

    if (undo) undo.addEventListener('click', function () {
      var k = kill(slug);
      k.count = 0; k.date = '';
      save();
      toast('Отметка снята: ' + b.name_ru + ' снова в списке живых');
      renderEntry(b);
      renderAll();
    });

    date.addEventListener('change', function () {
      var k = kill(slug);
      k.date = date.value;
      if (k.date && k.count === 0) k.count = 1;
      save();
      renderAll();
      renderEntry(b);
    });

    if (minus) minus.addEventListener('click', function () { bump(-1); });
    if (plus) plus.addEventListener('click', function () { bump(1); });

    note.addEventListener('input', function () {
      kill(slug).note = note.value;
      save();
    });
  }

  function navList() {
    if (state.tab === 'progress') return [];
    if (state.tab === 'chronicle') {
      return BOSSES.filter(function (b) { return isKilled(b.slug); })
        .sort(function (a, b) { return a.name_ru.localeCompare(b.name_ru, 'ru'); });
    }
    return visible();
  }

  function step(dir) {
    var list = navList();
    if (!list.length) return;
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].slug === currentSlug) { idx = i; break; }
    if (idx === -1) { openEntry(list[0].slug); return; }
    var next = (idx + dir + list.length) % list.length;
    openEntry(list[next].slug);
  }

  /* ---------- страница «Создать забег» ---------- */

  function showStart() {
    renderStart();
    els.start.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function hideStart() {
    els.start.hidden = true;
    document.body.style.overflow = '';
  }

  function renderStart() {
    var pick = state.pickChar || (CHARACTERS[0] && CHARACTERS[0].key) || '';
    state.pickChar = pick;
    var chars = CHARACTERS.map(function (c) {
      return '<button type="button" class="pick' + (pick === c.key ? ' is-on' : '') + '" ' +
        'data-char="' + esc(c.key) + '" aria-pressed="' + (pick === c.key ? 'true' : 'false') + '">' +
        '<img src="' + esc(c.head) + '" alt="" loading="lazy">' +
        '<span>' + esc(c.name) + '</span></button>';
    }).join('');

    var runsHtml = '';
    if (state.runs.length) {
      runsHtml = '<div class="start__col">' +
        '<h3 class="start__h3">Продолжить забег</h3>' +
        '<div class="runlist">' + state.runs.map(function (r) {
          var p = progressFor(r.kills || {}, r.marks || {});
          var ch = charByKey(r.char);
          var who = [];
          if (ch) who.push(ch.name);
          if (r.player) who.push(r.player);
          if (r.day) who.push('день ' + r.day);
          var meta = (who.length ? esc(who.join(' · ')) + ' · ' : '') +
            p.done + ' / ' + p.total + ' · ' + p.pct + '%';
          return '<div class="runitem' + (r.id === state.currentRunId ? ' is-current' : '') + '">' +
            '<button class="runitem__open" data-run="' + esc(r.id) + '">' +
              (ch ? '<img class="runitem__face" src="' + esc(ch.head) + '" alt="">' : '') +
              '<span class="runitem__body">' +
                '<span class="runitem__name">' + esc(r.name) + '</span>' +
                '<span class="runitem__meta">' + meta + '</span>' +
              '</span>' +
            '</button>' +
            '<button class="runitem__del" data-del="' + esc(r.id) + '" title="Удалить забег" aria-label="Удалить забег">×</button>' +
            '</div>';
        }).join('') + '</div></div>';
    }

    els.startBody.innerHTML =
      '<h2 class="start__title" id="start-title">Создать забег</h2>' +
      '<p class="start__lead">Назови забег и выбери, за кого играешь. У каждого забега — свой дневник побед и свой прогресс.</p>' +
      '<div class="start__grid">' +
        '<form class="start__col" id="run-form" autocomplete="off">' +
          '<label class="start__label" for="run-name">Имя забега</label>' +
          '<input class="start__input" id="run-name" type="text" maxlength="48" ' +
            'placeholder="Например: Зимовка с Венди" value="' + esc(state.pickName || '') + '">' +
          '<div class="start__label">Персонаж забега</div>' +
          '<div class="picks" id="run-chars">' + chars + '</div>' +
          '<button class="btn btn--big" type="submit">Начать забег</button>' +
        '</form>' +
        runsHtml +
      '</div>' +
      '<p class="start__version">Компендиум выжившего &middot; v' + esc(APP_VERSION) + '</p>';
  }

  function createRun(name, char, activate) {
    var r = newRun(name, char);
    state.runs.push(r);
    if (activate !== false) {
      state.currentRunId = r.id;
      bindRun();
    }
    persist();
    return r;
  }

  function openRun(id) {
    if (!currentRun() || currentRun().id !== id) {
      state.currentRunId = id;
      bindRun();
    }
    persist();
    hideStart();
    renderAll();
    updateRunBadge();
  }

  function deleteRun(id) {
    var r = null;
    for (var i = 0; i < state.runs.length; i++) if (state.runs[i].id === id) r = state.runs[i];
    if (!r) return;
    if (!confirm('Удалить забег «' + r.name + '»? Весь его прогресс будет стёрт.')) return;
    state.runs = state.runs.filter(function (x) { return x.id !== id; });
    if (state.currentRunId === id) {
      state.currentRunId = state.runs.length ? state.runs[0].id : null;
      bindRun();
    }
    persist();
    renderStart();
    renderAll();
    updateRunBadge();
    toast('Забег удалён');
  }

  function updateRunBadge() {
    var r = currentRun();
    if (!r) { els.runNow.hidden = true; return; }
    var ch = charByKey(r.char);
    els.runNow.hidden = false;
    els.runNowName.textContent = r.name;
    var meta = ch ? ch.name : '';
    if (r.player) meta += (meta ? ' · ' : '') + r.player;
    if (r.day) meta += (meta ? ' · ' : '') + 'день ' + r.day;
    els.runNowChar.textContent = meta;
    if (ch) { els.runNowImg.src = ch.head; els.runNowImg.hidden = false; }
    else { els.runNowImg.hidden = true; }
  }

  /* ---------- общая отрисовка ---------- */

  function renderAll() {
    if (state.tab === 'skills' && !skillTreeForCurrent()) state.tab = 'all';
    renderHead();
    renderTabs();
    renderGrid();
  }

  /* ---------- события ---------- */

  els.tabs.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    state.tab = t.dataset.tab;
    save();
    renderAll();
  });

  els.filters.addEventListener('click', function (e) {
    var c = e.target.closest('.chip');
    if (!c) return;
    state.filter = c.dataset.filter;
    [].forEach.call(els.filters.children, function (b) {
      b.classList.toggle('is-on', b === c);
    });
    save();
    renderGrid();
  });

  var searchTimer = null;
  els.search.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = els.search.value;
      renderGrid();
    }, 120);
  });

  els.silhouettes.addEventListener('change', function () {
    state.silhouettes = els.silhouettes.checked;
    save();
    renderGrid();
    if (currentSlug) {
      var b = null;
      for (var i = 0; i < BOSSES.length; i++) if (BOSSES[i].slug === currentSlug) b = BOSSES[i];
      if (b) renderEntry(b);
    }
  });

  els.grid.addEventListener('click', function (e) {
    var mark = e.target.closest('[data-mark]');
    if (mark) { toggleMark(mark.dataset.mark); return; }
    var c = e.target.closest('[data-slug]');
    if (c) openEntry(c.dataset.slug);
  });

  els.entry.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) { closeEntry(); return; }
    var q = e.target.closest('.qhead');
    if (q) {
      var idx = q.dataset.q;
      [].forEach.call(els.entryBody.querySelectorAll('.qhead'), function (h) {
        h.classList.toggle('is-on', h === q);
      });
      [].forEach.call(els.entryBody.querySelectorAll('.quote'), function (c) {
        c.classList.toggle('is-on', c.dataset.quote === idx);
      });
    }
  });

  document.getElementById('entry-prev').addEventListener('click', function () { step(-1); });
  document.getElementById('entry-next').addEventListener('click', function () { step(1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !els.entry.hidden) closeEntry();
    if (els.entry.hidden) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ---------- забеги: события ---------- */

  els.start.addEventListener('click', function (e) {
    var pick = e.target.closest('[data-char]');
    if (pick) {
      state.pickChar = pick.dataset.char;
      [].forEach.call(els.start.querySelectorAll('.pick'), function (b) {
        var on = b.dataset.char === state.pickChar;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      return;
    }
    var del = e.target.closest('[data-del]');
    if (del) { deleteRun(del.dataset.del); return; }
    var open = e.target.closest('[data-run]');
    if (open) { openRun(open.dataset.run); return; }
  });

  els.start.addEventListener('input', function (e) {
    if (e.target.id === 'run-name') state.pickName = e.target.value;
  });

  els.start.addEventListener('submit', function (e) {
    if (e.target.id !== 'run-form') return;
    e.preventDefault();
    var nameEl = document.getElementById('run-name');
    var name = (nameEl && nameEl.value.trim()) || 'Забег';
    var char = state.pickChar || (CHARACTERS[0] && CHARACTERS[0].key) || '';
    state.pickName = '';
    createRun(name, char);
    hideStart();
    renderAll();
    updateRunBadge();
    toast('Забег «' + name + '» начат');
  });

  document.getElementById('btn-runs').addEventListener('click', showStart);

  /* ---------- экспорт / импорт ---------- */

  function exportData() {
    var r = currentRun();
    var payload = {
      app: 'dst-compendium',
      version: 2,
      appVersion: APP_VERSION,
      savedAt: new Date().toISOString(),
      run: r ? { name: r.name, char: r.char } : null,
      silhouettes: state.silhouettes,
      kills: state.kills,
      marks: state.marks
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kompendium-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Прогресс забега выгружен в файл');
  }

  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-export2').addEventListener('click', exportData);
  document.getElementById('btn-import').addEventListener('click', function () { els.fileInput.click(); });

  els.fileInput.addEventListener('change', function () {
    var f = els.fileInput.files && els.fileInput.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var kills = data.kills || data;
        if (!kills || typeof kills !== 'object') throw new Error('bad');
        if (!currentRun()) {
          var nm = (data.run && data.run.name) || 'Загруженный забег';
          var ch = (data.run && data.run.char) || (CHARACTERS[0] && CHARACTERS[0].key) || '';
          createRun(nm, ch);
        }
        state.kills = sanitizeKills(kills);
        currentRun().kills = state.kills;
        if (data.marks && typeof data.marks === 'object') {
          state.marks = data.marks;
          currentRun().marks = state.marks;
        }
        delete currentRun().sync;
        if (typeof data.silhouettes === 'boolean') state.silhouettes = data.silhouettes;
        els.silhouettes.checked = state.silhouettes;
        save();
        renderAll();
        updateRunBadge();
        toast('Прогресс загружен в текущий забег');
      } catch (err) {
        toast('Не получилось прочитать файл');
      }
      els.fileInput.value = '';
    };
    reader.readAsText(f);
  });

  document.getElementById('btn-reset').addEventListener('click', function () {
    var r = currentRun();
    if (!confirm('Сжечь дневник забега' + (r ? ' «' + r.name + '»' : '') + '? Отметки будут стёрты безвозвратно.')) return;
    state.kills = {};
    state.marks = {};
    if (r) { r.kills = state.kills; r.marks = state.marks; delete r.sync; }
    persist();
    renderAll();
    toast('Дневник сожжён. Всё начинается заново');
  });

  /* ---------- синхронизация с игрой ---------- */

  var SYNC_URL = 'http://127.0.0.1:8787/state';
  var SYNC_EVERY = 5000;

  state.sync = { on: false, busy: false, fails: 0, timer: null, world: null };

  function syncFetch() {
    return new Promise(function (resolve, reject) {
      var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var done = false;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        if (ctrl) ctrl.abort();
        reject(new Error('timeout'));
      }, 3500);
      fetch(SYNC_URL, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve(data);
        })
        .catch(function (err) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  function addKillCount(run, slug, n, date, day) {
    if (!run || n <= 0) return;
    var cur = run.kills[slug];
    if (!cur) cur = run.kills[slug] = { count: 0, date: '', day: 0, note: '' };
    cur.count = (cur.count || 0) + n;
    if (date) cur.date = date;
    if (day) cur.day = day;
  }

  function isKnownBoss(slug) {
    for (var i = 0; i < BOSSES.length; i++) if (BOSSES[i].slug === slug) return true;
    return false;
  }

  function mergeSkills(data, run) {
    if (!run || !data || !data.skills || !data.skills.char) return false;
    var raw = data.skills.char;
    var siteKey = CHAR_ALIASES[raw] || raw;
    if (!run.char) run.char = siteKey;
    if (siteKey !== run.char) return false;
    var list = (data.skills.skills || []).filter(function (x) { return typeof x === 'string'; });
    var points = parseInt(data.skills.points, 10) || 0;
    var xp = parseInt(data.skills.xp, 10) || 0;
    var prev = run.skills || {};
    var same = prev.char === siteKey && prev.points === points && prev.xp === xp &&
      JSON.stringify(prev.list || []) === JSON.stringify(list);
    if (same) return false;
    run.skills = { char: siteKey, list: list, points: points, xp: xp };
    return true;
  }

  function mergeRetro(data, run) {
    if (!run) return 0;
    if (!run.retroApplied || typeof run.retroApplied !== 'object') run.retroApplied = {};
    var applied = run.retroApplied;
    var retro = (data && data.retro) || {};
    var count = 0;

    Object.keys(retro).forEach(function (slug) {
      if (!isKnownBoss(slug)) return;
      var n = parseInt(retro[slug], 10) || 0;
      if (n <= 0) return;
      var prev = parseInt(applied[slug], 10) || 0;
      if (n <= prev) return;
      applied[slug] = n;
      var cur = run.kills[slug];
      if (!cur) cur = run.kills[slug] = { count: 0, date: '', day: 0, note: '' };
      if ((cur.count || 0) < n) {
        cur.count = n;
        if (!cur.note) cur.note = 'Восстановлено по состоянию мира';
      }
      count++;
    });

    return count;
  }

  function mergeSync(data, run) {
    if (!run) return { added: 0, changed: false };
    if (!run.sync || typeof run.sync !== 'object') run.sync = {};
    if (!run.sync.shards || typeof run.sync.shards !== 'object') run.sync.shards = {};

    var added = 0, changed = false, baseline = false;
    var shards = data.shard_state;
    if (!shards || !shards.length) {
      shards = [{ shard: 'default', session: data.session || 0, kills: data.kills || {} }];
    }

    shards.forEach(function (rec) {
      var shard = rec.shard || 'default';
      var counts = {};
      var kills = rec.kills || {};
      Object.keys(kills).forEach(function (slug) {
        if (!isKnownBoss(slug)) return;
        counts[slug] = parseInt((kills[slug] || {}).count, 10) || 0;
      });

      var st = run.sync.shards[shard];
      if (!st) {
        // Первое подключение: запоминаем текущие счётчики как точку отсчёта,
        // чтобы не засчитать то, что было убито до подключения сайта.
        run.sync.shards[shard] = { session: rec.session || 0, seen: counts };
        changed = true;
        baseline = true;
        return;
      }

      var session = rec.session || 0;
      if (session !== (st.session || 0)) {
        // Сервер перезапустился: счётчики мода начались заново, все его
        // смерти — новые для этого забега.
        Object.keys(counts).forEach(function (slug) {
          var n = counts[slug];
          if (n > 0) {
            addKillCount(run, slug, n, (kills[slug] || {}).date, (kills[slug] || {}).day);
            added += n;
          }
        });
        st.session = session;
        st.seen = counts;
        changed = true;
        return;
      }

      Object.keys(counts).forEach(function (slug) {
        var n = counts[slug];
        var prev = parseInt(st.seen[slug], 10) || 0;
        if (n > prev) {
          addKillCount(run, slug, n - prev, (kills[slug] || {}).date, (kills[slug] || {}).day);
          added += n - prev;
        }
        if (n !== prev) changed = true;
        st.seen[slug] = n;
      });
    });

    var sp = (data.kills || {}).shadow_pieces;
    if (run === currentRun() && sp && sp.levels) {
      var pick = state.variantPick.shadow_pieces || {};
      ['knight', 'bishop', 'rook'].forEach(function (piece) {
        var lv = parseInt(sp.levels[piece], 10);
        if (lv >= 1 && lv <= 3) pick[piece] = Math.max(pick[piece] || 0, lv);
      });
      state.variantPick.shadow_pieces = pick;
    }

    var addedMarks = 0;
    var marks = (data && data.marks) || {};
    if (!run.marks || typeof run.marks !== 'object') run.marks = {};
    Object.keys(marks).forEach(function (id) {
      if (!marks[id] || !MILESTONE_IDS[id]) return;
      if (!run.marks[id]) {
        run.marks[id] = true;
        addedMarks++;
      }
    });

    state.sync.world = data.world || null;
    return { added: added, changed: changed, baseline: baseline, marks: addedMarks };
  }

  function ensureWorldRun(data) {
    var w = (data && data.world) || {};
    var worldName = (w.name && String(w.name).trim()) || '';
    var ch = w.char ? charByKey(w.char) : null;
    var char = ch ? ch.key : '';
    var player = (w.player && String(w.player).trim()) || '';
    var cur = currentRun();
    var changed = false;
    var target = null;

    // Ищем забег, который принадлежит этому миру игры.
    if (worldName) {
      state.runs.forEach(function (r) {
        if (r.auto && r.worldName === worldName) target = r;
      });
    }
    if (!target && cur && cur.auto && (!worldName || !cur.worldName)) {
      target = cur;
    }

    // Нет забега мира — создаём его. Ручной забег при этом не трогаем
    // и не переключаем: игра пишет только в свой автоматический забег.
    if (!target) {
      target = createRun(worldName || 'Забег из игры', char, false);
      target.auto = true;
      target.worldName = worldName;
      target.player = player;
      changed = true;
    }

    if (worldName && target.name !== worldName) { target.name = worldName; changed = true; }
    if (char && target.char !== char) { target.char = char; changed = true; }
    if (player && target.player !== player) { target.player = player; changed = true; }
    if (worldName && target.worldName !== worldName) { target.worldName = worldName; changed = true; }

    if (!cur) {
      state.currentRunId = target.id;
      bindRun();
      hideStart();
      changed = true;
    } else if (cur.auto && cur !== target) {
      // Открыт автоматический забег другого мира — переключаемся на нужный.
      state.currentRunId = target.id;
      bindRun();
      changed = true;
    }

    return { run: target, changed: changed, current: target === currentRun() };
  }

  function gameOnline(data) {
    if (!data || !data.connected) return false;
    if (data.online === false) return false;
    if (data.online === true) return true;
    // Старый мост без поля online: смотрим на возраст данных.
    if (data.stale === true) return false;
    var age = parseInt(data.age, 10);
    return !isFinite(age) || age <= 120;
  }

  function applySync(data, silent) {
    if (!data || !data.connected) {
      if (!silent) toast('Мост работает, но мод ещё не записал прогресс');
      return null;
    }
    if (!gameOnline(data)) {
      if (!silent) toast('Игра не запущена — данные устарели');
      return null;
    }

    var wr = ensureWorldRun(data);
    var run = wr.run;
    if (!run) return null;
    var runChanged = wr.changed;

    // Текущий день мира — отдельный счётчик забега.
    var worldDay = parseInt((data.world || {}).day, 10) || 0;
    if (worldDay && run.day !== worldDay) {
      run.day = worldDay;
      runChanged = true;
      save();
      if (wr.current) updateRunBadge();
    }

    var res = mergeSync(data, run);
    var retroCount = mergeRetro(data, run);
    var skillsChanged = mergeSkills(data, run);
    if (res.changed || runChanged || res.marks || retroCount || skillsChanged) save();
    if (wr.current && (res.added || runChanged || res.marks || retroCount || skillsChanged)) {
      renderAll();
      updateRunBadge();
    }

    var parts = [];
    if (res.added) parts.push('побед: ' + res.added);
    if (res.marks) parts.push('отметок: ' + res.marks);
    if (retroCount) parts.push('из прошлого: ' + retroCount);
    if (wr.current && parts.length) {
      toast('Из игры — ' + parts.join(', '));
    } else if (wr.current && res.baseline) {
      toast('Игра на связи. Новые победы начнут учитываться с этого момента');
    } else if (!silent && wr.current) {
      toast('Игра на связи, новых побед нет');
    }
    res.retro = retroCount;
    res.run = run;
    res.current = wr.current;
    state.sync.targetName = run.name;
    state.sync.targetCurrent = wr.current;
    return res;
  }

  function renderSyncBtn() {
    var b = els.sync;
    if (!b) return;
    b.classList.toggle('is-on', state.sync.on);
    b.classList.toggle('is-err', !state.sync.on && state.sync.fails > 0);
    b.classList.toggle('is-busy', state.sync.busy);
    b.setAttribute('aria-pressed', state.sync.on ? 'true' : 'false');
    var title = state.sync.on
      ? 'Игра на связи — нажми, чтобы отключиться'
      : 'Подключиться к игре через tools/bridge.py';
    if (state.sync.on && state.sync.world) {
      title += ' · день ' + (state.sync.world.day || '?');
      var players = state.sync.world.players || [];
      if (players.length) title += ' · ' + players.join(', ');
    }
    if (state.sync.on && state.sync.targetName && !state.sync.targetCurrent) {
      title += ' · забег «' + state.sync.targetName + '»';
    }
    b.title = title;
  }

  function stopSync(msg) {
    state.sync.on = false;
    if (state.sync.timer) {
      clearInterval(state.sync.timer);
      state.sync.timer = null;
    }
    renderSyncBtn();
    if (msg) toast(msg);
  }

  function pollSync() {
    if (!state.sync.on || state.sync.busy) return;
    state.sync.busy = true;
    renderSyncBtn();
    syncFetch().then(function (data) {
      state.sync.busy = false;
      state.sync.fails = 0;
      if (!data.connected) {
        stopSync('Мост работает, но мод ещё не записал прогресс');
        return;
      }
      if (!gameOnline(data)) {
        stopSync('Игра не запущена — синхронизация остановлена');
        return;
      }
      applySync(data, true);
      renderSyncBtn();
    }).catch(function () {
      state.sync.busy = false;
      state.sync.fails++;
      renderSyncBtn();
      if (state.sync.fails >= 3) stopSync('Связь с игрой потеряна');
    });
  }

  function toggleSync() {
    if (state.sync.on) {
      stopSync('Отключено от игры');
      return;
    }
    if (state.sync.busy) return;
    state.sync.busy = true;
    state.sync.fails = 0;
    renderSyncBtn();
    syncFetch().then(function (data) {
      state.sync.busy = false;
      if (!data.connected) {
        state.sync.fails = 1;
        renderSyncBtn();
        toast('Мост работает, но файла мода нет — включи мод и зайди в мир');
        return;
      }
      if (!gameOnline(data)) {
        state.sync.fails = 1;
        renderSyncBtn();
        toast('Игра не запущена или данные устарели — запусти игру и зайди в мир');
        return;
      }
      var res = applySync(data, false);
      if (!res) return;
      state.sync.on = true;
      state.sync.timer = setInterval(pollSync, SYNC_EVERY);
      renderSyncBtn();
      var w = data.world || {};
      var extra = [];
      if (res.added) extra.push('побед: ' + res.added);
      if (res.marks) extra.push('отметок: ' + res.marks);
      if (res.retro) extra.push('из прошлого: ' + res.retro);
      var where = '';
      if (res.run && !res.current) {
        where = ' · данные идут в забег «' + res.run.name + '»';
      }
      toast('Игра на связи' + (w.day ? ' · день ' + w.day : '') + where +
        (extra.length ? ' · ' + extra.join(', ')
          : (res.baseline ? ' · новые победы — с этого момента' : '')));
    }).catch(function () {
      state.sync.busy = false;
      state.sync.fails = 1;
      renderSyncBtn();
      toast('Мост не отвечает — запусти python3 tools/bridge.py');
    });
  }

  els.sync.addEventListener('click', toggleSync);

  /* ---------- старт ---------- */

  load();
  els.silhouettes.checked = state.silhouettes;
  [].forEach.call(els.filters.children, function (b) {
    b.classList.toggle('is-on', b.dataset.filter === state.filter);
  });
  renderAll();
  updateRunBadge();
  renderSyncBtn();
  var versionEl = document.getElementById('app-version');
  if (versionEl) {
    versionEl.textContent = 'v' + APP_VERSION;
    if (APP_BUILD) versionEl.title = 'сборка ' + APP_BUILD;
  }
  showStart();

  // небольшой отладочный доступ (пригодится и для тестов)
  window.compendium = {
    open: openEntry,
    close: closeEntry,
    start: showStart,
    openRun: openRun,
    state: state,
    save: save
  };
})();
