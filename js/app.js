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
  var CRAFT = window.CRAFT_DATA || { categories: [], recipes: {}, by_product: {}, used_in: {} };
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
    toast: document.getElementById('toast'),
    fileInput: document.getElementById('file-input')
  };

  /* ---------- состояние ---------- */

  var state = {
    tab: 'all',
    filter: 'all',
    query: '',
    silhouettes: true,
    char: '',
    builds: {},
    kills: {},
    marks: {},
    variantPick: {},
    craftCat: 'all',
    craftPage: 1
  };

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

  function sanitizeBuilds(builds) {
    var out = {};
    if (!builds || typeof builds !== 'object') return out;
    Object.keys(builds).forEach(function (raw) {
      var ch = CHAR_ALIASES[raw] || raw;
      var tree = SKILL_TREES[ch];
      var list = builds[raw];
      if (!tree || !Array.isArray(list)) return;
      var valid = {};
      tree.skills.forEach(function (sk) { if (!sk.lock) valid[sk.id] = true; });
      var seen = {};
      var clean = [];
      list.forEach(function (id) {
        if (typeof id === 'string' && valid[id] && !seen[id] && clean.length < SKILL_POINTS) {
          seen[id] = true;
          clean.push(id);
        }
      });
      out[ch] = clean;
    });
    return out;
  }

  function load() {
    var data = null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) data = JSON.parse(raw);
    } catch (e) { data = null; }

    var builds = null;
    var legacySkills = null;

    if (data && Array.isArray(data.runs)) {
      // старый формат с забегами: берём текущий, иначе первый
      var picked = null;
      for (var i = 0; i < data.runs.length; i++) {
        if (data.runs[i] && data.runs[i].id === data.currentRunId) { picked = data.runs[i]; break; }
      }
      if (!picked) picked = data.runs[0] || null;
      if (picked) {
        state.kills = sanitizeKills(picked.kills || {});
        state.marks = (picked.marks && typeof picked.marks === 'object') ? picked.marks : {};
        state.char = typeof picked.char === 'string' ? (CHAR_ALIASES[picked.char] || picked.char) : '';
        legacySkills = picked.skills;
      }
      state.silhouettes = data.silhouettes !== false;
      state.tab = data.tab || 'all';
      state.filter = data.filter || 'all';
    } else if (data && typeof data === 'object') {
      // новый формат: один общий дневник
      state.kills = sanitizeKills(data.kills || {});
      state.marks = (data.marks && typeof data.marks === 'object') ? data.marks : {};
      state.char = typeof data.char === 'string' ? (CHAR_ALIASES[data.char] || data.char) : '';
      builds = data.builds;
      legacySkills = data.skills;
      state.silhouettes = data.silhouettes !== false;
      state.tab = data.tab || 'all';
      state.filter = data.filter || 'all';
    } else {
      // миграция старого одиночного дневника
      try {
        var lraw = localStorage.getItem(LEGACY_KEY);
        if (lraw) {
          var old = JSON.parse(lraw);
          state.kills = sanitizeKills(old.kills || {});
          state.marks = (old.marks && typeof old.marks === 'object') ? old.marks : {};
          if (typeof old.silhouettes === 'boolean') state.silhouettes = old.silhouettes;
          if (old.tab) state.tab = old.tab;
          if (old.filter) state.filter = old.filter;
          try { localStorage.removeItem(LEGACY_KEY); } catch (e2) { /* ignore */ }
        }
      } catch (e) { /* старый формат нечитаем — пропускаем */ }
    }

    state.builds = sanitizeBuilds(builds);

    // Старый одиночный блок skills -> сборка этого персонажа.
    if (legacySkills && legacySkills.char && Array.isArray(legacySkills.list)) {
      var lch = CHAR_ALIASES[legacySkills.char] || legacySkills.char;
      if (!state.builds[lch]) {
        var one = {};
        one[lch] = legacySkills.list;
        var clean = sanitizeBuilds(one);
        if (clean[lch]) state.builds[lch] = clean[lch];
      }
      if (!state.char) state.char = lch;
    }
  }

  var saveTimer = null;
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 4,
        char: state.char,
        builds: state.builds,
        kills: state.kills,
        marks: state.marks,
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

  function kill(slug) {
    var k = state.kills[slug];
    if (!k) { k = state.kills[slug] = { count: 0, date: '', day: 0, note: '' }; }
    return k;
  }
  function isKilled(slug) { return kill(slug).count > 0; }

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

  // Общий прогресс: боссы + по одной награде за каждую группу вех + отдельные вехи.
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
    var isCraft = state.tab === 'craft';
    if (els.toolbar) {
      els.toolbar.hidden = isProgress || isSkills;
      els.toolbar.classList.toggle('is-craft', isCraft);
    }
    if (isCraft) {
      var total = Object.keys(CRAFT.recipes || {}).length;
      els.search.placeholder = 'Найти рецепт…';
      els.title.textContent = 'Книга рецептов';
      els.hint.textContent = 'Все рецепты DST: из чего делается и где используется';
      els.pCount.textContent = total;
      els.pPercent.textContent = '';
      els.pFill.style.width = '0%';
      els.pCaption.textContent = 'Рецептов в книге';
      return;
    }
    els.search.placeholder = 'Найти чудовище…';
    if (isSkills) {
      var tree = skillTreeForCurrent();
      var st = skillStats(tree);
      els.title.textContent = 'Навыки';
      els.hint.textContent = tree
        ? ('Древо навыков: ' + tree.name + ' · ' + SKILL_POINTS + ' очков')
        : (state.char ? 'У этого персонажа нет древа навыков' : 'Выбери персонажа, чтобы открыть древо');
      els.pCount.textContent = tree ? (st.learned + ' / ' + SKILL_POINTS) : '—';
      els.pPercent.textContent = tree ? (st.pct + '%') : '';
      els.pFill.style.width = tree ? (st.pct + '%') : '0%';
      els.pCaption.textContent = tree
        ? (st.learned ? 'Потрачено очков: ' + st.learned + ' из ' + SKILL_POINTS : 'Все ' + SKILL_POINTS + ' очков свободны')
        : (state.char ? 'Древо навыков есть не у всех персонажей' : 'Персонаж ещё не выбран');
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

  var SKILL_POINTS = 15;

  function skillTreeForCurrent() {
    return state.char ? (SKILL_TREES[state.char] || null) : null;
  }

  function learnedFor(char) {
    return ((state.builds && state.builds[char]) || []).slice();
  }

  function setLearned(char, list) {
    if (!state.builds) state.builds = {};
    state.builds[char] = list;
  }

  function skillParents(tree) {
    if (tree._parents) return tree._parents;
    var map = {};
    var byId = {};
    var byTitle = {};
    tree.skills.forEach(function (s) {
      byId[s.id] = s;
      if (!s.lock && s.title && !byTitle[s.title]) byTitle[s.title] = s.id;
    });
    function add(child, parent) {
      if (!map[child]) map[child] = [];
      if (map[child].indexOf(parent) < 0) map[child].push(parent);
    }
    tree.skills.forEach(function (s) {
      (s.connects || []).forEach(function (cid) { add(cid, s.id); });
    });
    // В данных часть связей «изучите навык "X"» не продублирована ребром.
    tree.skills.forEach(function (s) {
      if (s.lock) return;
      var re = /[«"]([^»"]+)[»"]/g, m;
      while ((m = re.exec(s.cond || ''))) {
        var pid = byTitle[m[1]];
        if (pid && pid !== s.id) add(s.id, pid);
      }
    });
    tree._parents = map;
    tree._byId = byId;
    return map;
  }

  function skillCanLearn(tree, s, list) {
    if (!s || s.lock) return false;
    if (list.indexOf(s.id) >= 0) return false;
    var map = skillParents(tree);
    var byId = tree._byId || {};
    var need = (map[s.id] || []).filter(function (pid) {
      var p = byId[pid];
      // Условия в игре сайт не проверяет: считаем их выполненными.
      return !(p && p.lock);
    });
    if (!need.length) return true;
    return need.every(function (pid) { return list.indexOf(pid) >= 0; });
  }

  function skillDependents(tree, id, list) {
    var parents = skillParents(tree);
    var out = [];
    list.forEach(function (lid) {
      if (lid !== id && (parents[lid] || []).indexOf(id) >= 0) out.push(lid);
    });
    return out;
  }

  function skillStats(tree) {
    if (!tree) return { total: 0, learned: 0, pct: 0, left: SKILL_POINTS };
    var list = learnedFor(state.char);
    var valid = {};
    var total = 0;
    tree.skills.forEach(function (s) {
      if (s.lock) return;
      total++;
      if (list.indexOf(s.id) >= 0) valid[s.id] = true;
    });
    var learned = Object.keys(valid).length;
    return {
      total: total,
      learned: learned,
      pct: Math.round(learned * 100 / SKILL_POINTS),
      left: Math.max(0, SKILL_POINTS - learned)
    };
  }

  function renderTabs() {
    var html = '';
    var tree = skillTreeForCurrent();
    var st = skillStats(tree);
    CATS.forEach(function (c) {
      if (c.id === 'chronicle') {
        html += '<button class="tab' + (state.tab === 'skills' ? ' is-on' : '') + '" data-tab="skills">' +
          '<span class="tab__icon" aria-hidden="true">✦</span>Навыки' +
          '<span class="tab__count">' + (tree ? st.learned + '/' + SKILL_POINTS : '—') + '</span></button>';
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
    var craftTotal = Object.keys(CRAFT.recipes || {}).length;
    if (craftTotal) {
      html += '<button class="tab' + (state.tab === 'craft' ? ' is-on' : '') + '" data-tab="craft">' +
        '<span class="tab__icon" aria-hidden="true">⚒</span>Крафт' +
        '<span class="tab__count">' + craftTotal + '</span></button>';
    }
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

  function cardHtml(b) {
    var k = kill(b.slug);
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
    if (state.tab === 'craft') { renderCraft(); return; }
    var list = visible();
    els.grid.hidden = false;
    els.grid.innerHTML = list.map(cardHtml).join('');
    els.empty.hidden = list.length > 0;
  }

  function renderSkills() {
    var tree = skillTreeForCurrent();
    els.grid.hidden = false;
    if (!state.char) {
      els.empty.hidden = true;
      var chars = CHARACTERS.map(function (c) {
        var used = (state.builds[c.key] || []).length;
        return '<button type="button" class="pick" data-skillchar="' + esc(c.key) + '">' +
          '<img src="' + esc(c.head) + '" alt="" loading="lazy">' +
          '<span>' + esc(c.name) + '</span>' +
          '<span class="pick__pts">' + used + ' / ' + SKILL_POINTS + '</span></button>';
      }).join('');
      els.grid.innerHTML = '<div class="skillpick">' +
        '<h3 class="skillpick__title">Древо навыков</h3>' +
        '<p class="skillpick__lead">Выбери персонажа и распредели ' + SKILL_POINTS + ' очков между навыками.</p>' +
        '<div class="picks">' + chars + '</div></div>';
      return;
    }
    if (!tree) {
      els.empty.hidden = false;
      els.grid.innerHTML = '';
      return;
    }
    els.empty.hidden = true;

    var list = learnedFor(state.char);
    var learned = {};
    list.forEach(function (id) { learned[id] = true; });

    var byId = {};
    tree.skills.forEach(function (s) { byId[s.id] = s; });

    var available = {};
    tree.skills.forEach(function (s) {
      if (!s.lock && !learned[s.id] && skillCanLearn(tree, s, list)) available[s.id] = true;
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

    var used = list.length;
    var left = Math.max(0, SKILL_POINTS - used);
    var ptsPct = Math.round(used * 100 / SKILL_POINTS);
    var insight = '<div class="skilltree__insight"><span class="skilltree__star">✦</span><b>' + left +
      '</b><span>из ' + SKILL_POINTS + ' свободно</span></div>';
    var xpBlock = '<div class="skilltree__xp">' +
      '<div class="skilltree__xpbar"><i style="width:' + ptsPct + '%"></i></div>' +
      '<span class="skilltree__xptext">Очки: <b>' + used + '</b> / ' + SKILL_POINTS + '</span>' +
      '<button class="btn btn--ghost skilltree__reset" data-skillreset="1">Сбросить</button>' +
      '</div>';
    var face = tree.head ? '<img class="skilltree__face" src="' + esc(tree.head) + '" alt="">' : '';

    var lockConds = [];
    tree.skills.forEach(function (s) {
      if (s.lock && s.title && lockConds.indexOf(s.title) < 0) lockConds.push(s.title);
    });
    var lockBlock = lockConds.length
      ? '<details class="skilltree__locks"><summary>Условия открытия в игре (' + lockConds.length +
        ') — здесь не блокируют</summary><ul>' +
        lockConds.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></details>'
      : '';

    els.grid.innerHTML = '<div class="skilltree">' +
      '<div class="skilltree__head">' + face +
        '<div class="skilltree__title"><h3>' + esc(tree.name) + '</h3><p>Древо навыков · ' + SKILL_POINTS + ' очков</p></div>' +
        insight +
        '<button class="btn btn--ghost skilltree__change" data-skillchange="1">Сменить персонажа</button>' +
        '<div class="skilltree__legend"><span class="is-on">изучено</span><span>доступно</span><span class="is-lock">условие</span></div>' +
      '</div>' + xpBlock +
      '<div class="skilltree__canvas">' +
        '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
          '<g class="skilltree__groups">' + groupLabels + '</g>' +
          '<g class="skilltree__lines">' + lines.join('') + '</g>' +
          '<g class="skilltree__nodes">' + nodes + '</g>' +
        '</svg></div>' +
      '<div class="skilltree__details" id="skill-details">Нажми на доступный навык, чтобы изучить его за 1 очко.</div>' +
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
      var list = learnedFor(state.char);
      var on = list.indexOf(s.id) >= 0;
      if (s.lock) return 'Условие открытия';
      if (on) return 'Изучен';
      return skillCanLearn(tree, s, list) ? 'Доступен' : 'Сначала изучите предыдущий навык';
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
      var s = skillById(id);
      if (!s) return;

      var prev = box.querySelector('.sknode.is-selected');
      if (prev) prev.classList.remove('is-selected');
      g.classList.add('is-selected');

      var list = learnedFor(state.char);
      var on = list.indexOf(s.id) >= 0;
      var can = !s.lock && !on && skillCanLearn(tree, s, list);
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

      var status = on ? 'Изучен' : (can ? 'Доступен' : 'Не изучен');
      details.innerHTML = icon + '<div class="skilltree__dtext">' +
        '<h4>' + esc(s.title) + '</h4>' +
        '<p class="skilltree__status' + (on ? ' is-on' : (can ? ' is-available' : '')) + '">' + status + '</p>' +
        (s.desc ? '<p>' + esc(s.desc) + '</p>' : '') +
        (s.cond && s.cond !== '-' ? '<p class="skilltree__cond">Условие: ' + esc(s.cond) + '</p>' : '') +
        '<p class="skilltree__cost">Стоимость: <b>1</b> очко · свободно <b>' +
          Math.max(0, SKILL_POINTS - list.length) + '</b> из ' + SKILL_POINTS + '</p>' +
        (on ? '<button class="btn btn--ghost skilltree__remove" data-skillremove="' + esc(s.id) + '">Снять навык</button>' : '') +
        '</div>';

      if (on || !can) {
        if (!on) toast('Сначала изучите предыдущий навык');
        return;
      }
      if (list.length >= SKILL_POINTS) {
        toast('Все ' + SKILL_POINTS + ' очков уже потрачены');
        return;
      }
      list.push(s.id);
      setLearned(state.char, list);
      save();
      toast('Изучено: ' + s.title + ' · свободно ' + (SKILL_POINTS - list.length));
      renderAll();
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
    html += pbarCard('Общий прогресс', o,
      'Боссы + награды за квестовые ветки + вехи. 100% — всё закрыто.');
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

  /* ---------- книга рецептов ---------- */

  function craftCatName(id) {
    var cats = CRAFT.categories || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].name;
    return id;
  }

  function craftFiltered() {
    var q = state.query.trim().toLowerCase();
    var out = [];
    Object.keys(CRAFT.recipes || {}).forEach(function (id) {
      var r = CRAFT.recipes[id];
      if (!r) return;
      if (state.craftCat !== 'all') {
        var cats = r.categories || (r.category ? [r.category] : []);
        if (cats.indexOf(state.craftCat) === -1) return;
      }
      if (q) {
        var hay = ((r.name || '') + ' ' + (r.name_en || '') + ' ' + (r.id || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return;
      }
      out.push(r);
    });
    out.sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', 'ru'); });
    return out;
  }

  function craftAsset(src) {
    if (!src) return '';
    if (location.protocol === 'file:') return src;
    return src + (src.indexOf('?') >= 0 ? '&' : '?') + 'v=' + encodeURIComponent(APP_VERSION);
  }

  function craftIconHtml(r, cls) {
    if (r && r.icon) return '<img class="' + cls + '" src="' + esc(craftAsset(r.icon)) + '" alt="" loading="lazy">';
    return '<span class="' + cls + ' craft-icon--empty">⚒</span>';
  }

  function craftCardHtml(r) {
    var meta = craftCatName(r.category);
    if (r.tech_text) meta += ' · ' + r.tech_text;
    return '<button class="craft-card" data-craft="' + esc(r.id) + '">' +
      '<span class="craft-card__icon">' + craftIconHtml(r, 'craft-card__img') + '</span>' +
      '<span class="craft-card__body">' +
        '<span class="craft-card__name">' + esc(r.name) + '</span>' +
        '<span class="craft-card__meta">' + esc(meta) + '</span>' +
        (r.builder_text ? '<span class="craft-card__builder">' + esc(r.builder_text) + '</span>' : '') +
      '</span></button>';
  }

  function renderCraft() {
    var list = craftFiltered();
    var per = 60;
    var page = Math.max(1, parseInt(state.craftPage, 10) || 1);
    var shown = list.slice(0, page * per);
    var cats = (CRAFT.categories || []).map(function (c) {
      return '<button class="craft-cat' + (state.craftCat === c.id ? ' is-on' : '') +
        '" data-craftcat="' + esc(c.id) + '">' + esc(c.name) +
        '<span>' + c.count + '</span></button>';
    }).join('');
    var cards = shown.map(craftCardHtml).join('');
    var more = list.length > shown.length
      ? '<button class="btn craft-more" data-craftmore="1">Показать ещё</button>'
      : '';
    els.grid.hidden = false;
    els.empty.hidden = true;
    els.grid.innerHTML = '<div class="craft">' +
      '<div class="craft__cats">' + cats + '</div>' +
      '<p class="craft__count">Найдено: ' + list.length + '</p>' +
      (cards ? '<div class="craft__grid">' + cards + '</div>' : '<p class="craft__empty">Ничего не найдено.</p>') +
      more + '</div>';
  }

  function craftTreeItem(ing, depth, path) {
    var rid = (CRAFT.tree_by_product && CRAFT.tree_by_product[ing.id]) || (CRAFT.recipes[ing.id] ? ing.id : null);
    var r = rid ? CRAFT.recipes[rid] : null;
    var icon = ing.icon || (r && r.icon) || '';
    var label = esc(ing.name) + (ing.qty ? ' ×' + ing.qty : '');
    var children = '';
    if (r && depth < 5 && !path[rid]) {
      path[rid] = true;
      children = '<ul>' + (r.ingredients || []).map(function (x) {
        return craftTreeItem(x, depth + 1, path);
      }).join('') + '</ul>';
      delete path[rid];
    }
    return '<li>' +
      (icon ? '<img class="craft-tree__icon" src="' + esc(craftAsset(icon)) + '" alt="">' : '<span class="craft-tree__dot"></span>') +
      '<span class="craft-tree__name">' + label + '</span>' +
      (r ? '<span class="craft-tree__note">' + esc(r.tech_text) + '</span>' : '') +
      children + '</li>';
  }

  function craftUsedHtml(r) {
    var ids = [];
    var seen = {};
    var sources = [r.product, r.id, r.name_en];
    sources.forEach(function (key) {
      (CRAFT.used_in[key] || []).forEach(function (id) {
        if (CRAFT.recipes[id] && !seen[id]) { seen[id] = true; ids.push(id); }
      });
    });
    if (!ids.length) return '<p class="craft-used__empty">Пока нигде не используется.</p>';
    var shown = ids.slice(0, 12);
    var more = ids.length > shown.length
      ? '<p class="craft-used__more">…и ещё ' + (ids.length - shown.length) + '</p>'
      : '';
    return '<div class="craft-used__list">' + shown.map(function (id) {
      var u = CRAFT.recipes[id];
      return '<button class="craft-used__item" data-craft="' + esc(id) + '">' +
        craftIconHtml(u, 'craft-used__img') + '<span>' + esc(u.name) + '</span></button>';
    }).join('') + '</div>' + more;
  }

  function craftEntryHtml(r) {
    var cats = (r.categories && r.categories.length ? r.categories : [r.category]).map(craftCatName).join(' · ');
    var meta = [cats, r.tech_text, r.builder_text].filter(Boolean).join(' · ');
    var path = {};
    path[r.id] = true;
    var tree = (r.ingredients || []).map(function (ing) {
      return craftTreeItem(ing, 1, path);
    }).join('');
    return '<div class="craft-detail">' +
      '<div class="craft-detail__head">' +
        '<div class="craft-detail__icon">' + craftIconHtml(r, 'craft-detail__img') + '</div>' +
        '<div class="craft-detail__title">' +
          '<h2 id="entry-name">' + esc(r.name) + '</h2>' +
          '<p class="entry__latin">' + esc(r.name_en || '') + '</p>' +
          '<p class="craft-detail__meta">' + esc(meta) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="craft-detail__cols">' +
        '<section class="craft-detail__tree"><h3>Из чего делается</h3>' +
          '<ul class="craft-tree">' + tree + '</ul></section>' +
        '<section class="craft-detail__used"><h3>Используется в</h3>' + craftUsedHtml(r) + '</section>' +
      '</div></div>';
  }

  function openCraftEntry(id) {
    var r = CRAFT.recipes[id];
    if (!r) return;
    var prev = document.getElementById('entry-prev');
    var next = document.getElementById('entry-next');
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    els.entryBody.innerHTML = craftEntryHtml(r);
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
  }

  function openEntry(slug) {
    var prev = document.getElementById('entry-prev');
    var next = document.getElementById('entry-next');
    if (prev) prev.hidden = false;
    if (next) next.hidden = false;
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
    var prev = document.getElementById('entry-prev');
    if (prev && prev.hidden) return;
    var list = navList();
    if (!list.length) return;
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].slug === currentSlug) { idx = i; break; }
    if (idx === -1) { openEntry(list[0].slug); return; }
    var next = (idx + dir + list.length) % list.length;
    openEntry(list[next].slug);
  }

  /* ---------- общая отрисовка ---------- */

  function renderAll() {
    renderHead();
    renderTabs();
    renderGrid();
  }

  /* ---------- события ---------- */

  els.tabs.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    state.tab = t.dataset.tab;
    state.query = '';
    if (els.search) els.search.value = '';
    if (state.tab === 'craft') state.craftPage = 1;
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
      if (state.tab === 'craft') state.craftPage = 1;
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
    var skillChar = e.target.closest('[data-skillchar]');
    if (skillChar) {
      state.char = skillChar.dataset.skillchar;
      save();
      renderAll();
      return;
    }
    var skillChange = e.target.closest('[data-skillchange]');
    if (skillChange) {
      state.char = '';
      save();
      renderAll();
      return;
    }
    var skillReset = e.target.closest('[data-skillreset]');
    if (skillReset) {
      var tr = skillTreeForCurrent();
      if (!tr) return;
      if (!confirm('Сбросить все навыки ' + tr.name + '? Очки вернутся.')) return;
      setLearned(state.char, []);
      save();
      renderAll();
      toast('Навыки сброшены · все ' + SKILL_POINTS + ' очков свободны');
      return;
    }
    var skillRemove = e.target.closest('[data-skillremove]');
    if (skillRemove) {
      var tr2 = skillTreeForCurrent();
      if (!tr2) return;
      var sid = skillRemove.dataset.skillremove;
      var list = learnedFor(state.char);
      var deps = skillDependents(tr2, sid, list);
      if (deps.length) {
        var names = deps.map(function (did) {
          var found = null;
          tr2.skills.forEach(function (x) { if (x.id === did) found = x; });
          return found ? found.title : did;
        });
        toast('Сначала снимите: ' + names.join(', '));
        return;
      }
      setLearned(state.char, list.filter(function (x) { return x !== sid; }));
      save();
      renderAll();
      toast('Навык снят');
      return;
    }
    var craftCat = e.target.closest('[data-craftcat]');
    if (craftCat) {
      state.craftCat = craftCat.dataset.craftcat;
      state.craftPage = 1;
      renderGrid();
      return;
    }
    var craftMore = e.target.closest('[data-craftmore]');
    if (craftMore) {
      state.craftPage = (parseInt(state.craftPage, 10) || 1) + 1;
      renderGrid();
      return;
    }
    var craft = e.target.closest('[data-craft]');
    if (craft) { openCraftEntry(craft.dataset.craft); return; }
    var mark = e.target.closest('[data-mark]');
    if (mark) { toggleMark(mark.dataset.mark); return; }
    var c = e.target.closest('[data-slug]');
    if (c) openEntry(c.dataset.slug);
  });

  els.entry.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) { closeEntry(); return; }
    var craft = e.target.closest('[data-craft]');
    if (craft) { openCraftEntry(craft.dataset.craft); return; }
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

  /* ---------- экспорт / импорт ---------- */

  function exportData() {
    var payload = {
      app: 'dst-compendium',
      version: 4,
      appVersion: APP_VERSION,
      savedAt: new Date().toISOString(),
      char: state.char,
      builds: state.builds,
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
    toast('Прогресс выгружен в файл');
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
        state.kills = sanitizeKills(kills);
        if (data.marks && typeof data.marks === 'object') state.marks = data.marks;
        var ch = data.char || (data.run && data.run.char) || '';
        state.char = typeof ch === 'string' ? (CHAR_ALIASES[ch] || ch) : '';
        state.builds = sanitizeBuilds(data.builds);
        if (!Object.keys(state.builds).length && data.skills && data.skills.char) {
          var ich = CHAR_ALIASES[data.skills.char] || data.skills.char;
          var one = {};
          one[ich] = data.skills.list || [];
          var clean = sanitizeBuilds(one);
          if (clean[ich]) state.builds[ich] = clean[ich];
          if (!state.char) state.char = ich;
        }
        if (typeof data.silhouettes === 'boolean') state.silhouettes = data.silhouettes;
        els.silhouettes.checked = state.silhouettes;
        save();
        renderAll();
        toast('Прогресс загружен');
      } catch (err) {
        toast('Не получилось прочитать файл');
      }
      els.fileInput.value = '';
    };
    reader.readAsText(f);
  });

  document.getElementById('btn-reset').addEventListener('click', function () {
    if (!confirm('Сжечь дневник? Отметки будут стёрты безвозвратно.')) return;
    state.kills = {};
    state.marks = {};
    persist();
    renderAll();
    toast('Дневник сожжён. Всё начинается заново');
  });

  /* ---------- старт ---------- */

  load();
  els.silhouettes.checked = state.silhouettes;
  [].forEach.call(els.filters.children, function (b) {
    b.classList.toggle('is-on', b.dataset.filter === state.filter);
  });
  renderAll();
  var versionEl = document.getElementById('app-version');
  if (versionEl) {
    versionEl.textContent = 'v' + APP_VERSION;
    if (APP_BUILD) versionEl.title = 'сборка ' + APP_BUILD;
  }
  // небольшой отладочный доступ (пригодится и для тестов)
  window.compendium = {
    open: openEntry,
    close: closeEntry,
    state: state,
    save: save
  };
})();
