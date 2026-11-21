/* ============================================================
   Компендиум выжившего — логика трекера
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'dst-compendium-v2';
  var LEGACY_KEY = 'dst-compendium-v1';

  var CATS = (window.CATEGORIES || []).filter(function (c) {
    return c.id === 'all' || c.id === 'mini' || c.id === 'progress' || c.id === 'chronicle';
  }).map(function (c) {
    if (c.id === 'all') {
      return { id: 'all', name: 'Все боссы', short: 'Все', icon: c.icon, hint: 'Все боссы, кроме мини-боссов' };
    }
    if (c.id === 'progress') {
      return {
        id: 'progress', name: c.name, short: c.short, icon: c.icon,
        hint: 'Боссы, жемчужина отшельницы и две ветки: лунная и теневая'
      };
    }
    return c;
  });
  var BOSSES = (window.BOSSES || []).slice();
  var CHARACTERS = window.CHARACTERS || [];
  var MILESTONES = window.MILESTONES || { groups: [], items: [] };
  var SKILL_TREES = window.SKILL_TREES || {};
  var CRAFT = window.CRAFT_DATA || { categories: [], recipes: {}, by_product: {}, used_in: {} };
  var COOK = window.COOK_DATA || { groups: [], ingredients: {}, recipes: [] };
  var QUOTES = window.QUOTES || null;
  var quotesLoading = false;
  var quotesWaiters = [];

  function ensureQuotes(cb) {
    if (window.QUOTES) {
      QUOTES = window.QUOTES;
      if (cb) cb();
      return;
    }
    if (cb) quotesWaiters.push(cb);
    if (quotesLoading) return;
    quotesLoading = true;
    var script = document.createElement('script');
    script.src = 'js/quotes.js?v=' + (window.APP_VERSION || '1');
    script.async = true;
    script.onload = script.onerror = function () {
      QUOTES = window.QUOTES || { craft: {}, chars: {} };
      quotesLoading = false;
      var list = quotesWaiters;
      quotesWaiters = [];
      list.forEach(function (fn) {
        try { fn(); } catch (e) { /* ignore */ }
      });
    };
    document.head.appendChild(script);
  }

  // Карточки без иконок в книгу не пускаем.
  (function filterCraft() {
    var source = CRAFT.recipes || {};
    var kept = {};
    Object.keys(source).forEach(function (id) {
      var r = source[id];
      if (r && r.icon) kept[id] = r;
    });
    CRAFT.recipes = kept;

    var counts = {};
    Object.keys(kept).forEach(function (id) {
      var cats = kept[id].categories || [kept[id].category];
      cats.forEach(function (c) { counts[c] = (counts[c] || 0) + 1; });
    });
    var cats = [];
    (CRAFT.categories || []).forEach(function (c) {
      if (c.id === 'all') {
        cats.push({ id: 'all', name: c.name, count: Object.keys(kept).length });
      } else if (counts[c.id]) {
        cats.push({ id: c.id, name: c.name, count: counts[c.id] });
      }
    });
    CRAFT.categories = cats;

    var usedIn = {};
    Object.keys(kept).forEach(function (id) {
      (kept[id].ingredients || []).forEach(function (ing) {
        if (ing.kind !== 'item') return;
        if (!usedIn[ing.id]) usedIn[ing.id] = [];
        if (usedIn[ing.id].indexOf(id) < 0) usedIn[ing.id].push(id);
      });
    });
    CRAFT.used_in = usedIn;
  })();

  var CRAFT_BY_PRODUCT = {};
  (function () {
    Object.keys(CRAFT.recipes || {}).forEach(function (id) {
      var r = CRAFT.recipes[id];
      if (!r || !r.product) return;
      if (!CRAFT_BY_PRODUCT[r.product]) CRAFT_BY_PRODUCT[r.product] = [];
      CRAFT_BY_PRODUCT[r.product].push(id);
    });
  })();
  var CHAR_ALIASES = { wathgrithr: 'wigfrid', waxwell: 'maxwell' };
  var APP_VERSION = window.APP_VERSION || '1.0.0';
  var APP_BUILD = window.APP_BUILD || '';

  var CHAIN_GATES = {
    wag_spark: ['crystal_deerclops', 'armored_bearger', 'possessed_varg'],
    wag_revenant: ['celestial_revenant'],
    wag_selector: ['celestial_scion'],
    charlie_queen: ['shrouded_queen'],
    charlie_abomination: ['umbral_abomination'],
    charlie_gifts: ['umbral_abomination'],
    cc_awaken: ['celestial_champion'],
    fw_key: ['ancient_guardian'],
    fw_summon: ['ancient_fuelweaver']
  };
  var BRANCH_ORDER = {
    lunar: ['celestial_champion', 'wagstaff'],
    shadow: ['ancient_fuelweaver', 'charlie']
  };
  var BRANCH_BOSSES = {
    lunar: [
      'celestial_champion', 'celestial_scion', 'celestial_revenant',
      'crystal_deerclops', 'armored_bearger', 'possessed_varg'
    ],
    shadow: [
      'ancient_fuelweaver', 'ancient_guardian', 'shrouded_queen',
      'umbral_abomination', 'shadow_pieces'
    ]
  };

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
    skillConds: { celestial: false, fuelweaver: false },
    chainDone: {},
    kills: {},
    marks: {},
    crafted: {},
    eaten: {},
    variantPick: {},
    craftCat: 'all',
    craftSort: 'name',
    craftPage: 1,
    craftStack: [],
    craftId: null,
    kitchenSlots: [],
    kitchenQuery: '',
    kitchenCat: 'all',
    kitchenRecipeQuery: '',
    kitchenWarly: false,
    cookRecipeId: null
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

  function sanitizeFlags(raw, allowed) {
    var out = {};
    if (!raw || typeof raw !== 'object') return out;
    Object.keys(raw).forEach(function (id) {
      if (raw[id] && (!allowed || allowed[id])) out[id] = true;
    });
    return out;
  }

  function sanitizeChainDone(done) {
    var out = {};
    if (!done || typeof done !== 'object') return out;
    Object.keys(done).forEach(function (id) {
      if (done[id] && MILESTONE_IDS[id]) out[id] = true;
    });
    return out;
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
        state.crafted = sanitizeFlags(picked.crafted);
        state.eaten = sanitizeFlags(picked.eaten);
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
      state.crafted = sanitizeFlags(data.crafted);
      state.eaten = sanitizeFlags(data.eaten);
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
          state.crafted = sanitizeFlags(old.crafted);
          state.eaten = sanitizeFlags(old.eaten);
          if (typeof old.silhouettes === 'boolean') state.silhouettes = old.silhouettes;
          if (old.tab) state.tab = old.tab;
          if (old.filter) state.filter = old.filter;
          try { localStorage.removeItem(LEGACY_KEY); } catch (e2) { /* ignore */ }
        }
      } catch (e) { /* старый формат нечитаем — пропускаем */ }
    }

    var craftIds = {};
    Object.keys(CRAFT.recipes || {}).forEach(function (id) { craftIds[id] = true; });
    var foodIds = {};
    (COOK.recipes || []).forEach(function (r) { foodIds[r.id] = true; });
    state.crafted = sanitizeFlags(state.crafted, craftIds);
    state.eaten = sanitizeFlags(state.eaten, foodIds);

    if (!CRAFT_SORTS[state.craftSort]) state.craftSort = 'name';

    state.builds = sanitizeBuilds(builds);
    var conds = (data && data.conds) || {};
    state.skillConds = {
      celestial: conds.celestial === true,
      fuelweaver: conds.fuelweaver === true
    };
    state.chainDone = sanitizeChainDone(data && data.chainDone);

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

    var tabOk = state.tab === 'skills' || state.tab === 'craft';
    CATS.forEach(function (c) { if (c.id === state.tab) tabOk = true; });
    if (!tabOk) state.tab = 'all';
  }

  var saveTimer = null;
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 5,
        char: state.char,
        builds: state.builds,
        conds: state.skillConds,
        chainDone: state.chainDone,
        kills: state.kills,
        marks: state.marks,
        crafted: state.crafted,
        eaten: state.eaten,
        silhouettes: state.silhouettes,
        craftSort: state.craftSort,
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
  function isCrafted(id) { return state.crafted[id] === true; }
  function isEaten(id) { return state.eaten[id] === true; }
  function toggleCrafted(id) {
    if (!id) return false;
    if (state.crafted[id]) delete state.crafted[id];
    else state.crafted[id] = true;
    save();
    return isCrafted(id);
  }
  function toggleEaten(id) {
    if (!id) return false;
    if (state.eaten[id]) delete state.eaten[id];
    else state.eaten[id] = true;
    save();
    return isEaten(id);
  }
  function markStamp(text, cls) {
    return '<span class="stamp stamp--small ' + (cls || '') + '"><span>' + text + '</span></span>';
  }

  function updateMarkUI(iconSelector, btnSelector, on, text, offLabel) {
    var icon = els.entryBody.querySelector(iconSelector);
    if (icon) {
      var st = icon.querySelector('.stamp');
      if (on && !st) icon.insertAdjacentHTML('beforeend', markStamp(text, 'stamp--entry'));
      if (!on && st) st.parentNode.removeChild(st);
    }
    var btn = els.entryBody.querySelector(btnSelector);
    if (btn) {
      btn.classList.toggle('is-on', on);
      btn.textContent = on ? text + ' ✓' : offLabel;
    }
  }

  function updateGridStamp(selector, on, text) {
    var card = els.grid.querySelector(selector);
    if (!card) return;
    var isCraftCard = card.classList.contains('craft-card');
    card.classList.toggle(isCraftCard ? 'is-crafted' : 'is-eaten', on);
    var st = null;
    [].forEach.call(card.children, function (ch) {
      if (ch.classList && ch.classList.contains('stamp')) st = ch;
    });
    if (on && !st) card.insertAdjacentHTML('afterbegin', markStamp(text, 'stamp--card'));
    if (!on && st) card.removeChild(st);
  }

  function setCraftedUI(on) {
    updateMarkUI('.craft-detail__icon', '[data-craftmark]', on,
      'Получено', 'Отметить полученным');
    updateGridStamp('[data-craft="' + state.craftId + '"]', on, 'Получено');
    renderHead();
  }

  function setEatenUI(on) {
    updateMarkUI('.cook-detail__icon', '[data-cookeaten]', on,
      'Съедено', 'Отметить съеденным');
    updateGridStamp('[data-cookrecipe="' + state.cookRecipeId + '"]', on, 'Съедено');
    var icon = document.querySelector('.cook-result__icon');
    if (icon) {
      var st = icon.querySelector('.stamp');
      var ev = (state.kitchenSlots || []).length === 4 ? cookEvaluate(state.kitchenSlots) : null;
      var current = ev && ev.results.length ? ev.results[0].recipe.id : null;
      if (current === state.cookRecipeId) {
        if (on && !st) icon.insertAdjacentHTML('beforeend', markStamp('Съедено', 'stamp--card'));
        if (!on && st) st.parentNode.removeChild(st);
      }
    }
    renderHead();
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
    return b.art ? 'assets/bosses/' + b.slug + '.webp' : '';
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
    if (state.tab === 'mini') return BOSSES.filter(function (b) { return b.category === 'mini'; });
    if (state.tab === 'all') return BOSSES.filter(function (b) { return b.category !== 'mini'; });
    if (state.tab === 'chronicle') return BOSSES;
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

  function mergedBranchGroup(br, groups) {
    var items = [];
    var order = BRANCH_ORDER[br.id];
    if (order) {
      order.forEach(function (gid) {
        (groups || []).forEach(function (g) {
          if (g.id === gid) items = items.concat(g.items || []);
        });
      });
    } else {
      (groups || []).forEach(function (g) {
        if (g.branch !== br.id || g.id === 'hermit') return;
        items = items.concat(g.items || []);
      });
    }
    return { id: 'branch_' + br.id, name: br.name, branch: br.id, items: items };
  }

  // Общий прогресс: боссы + жемчужина отшельницы + две квестовые ветки.
  function progressFor(kills, marks) {
    var total = BOSSES.length + 1 + (MILESTONE_BRANCHES || []).length;
    var done = 0;
    BOSSES.forEach(function (b) {
      var k = kills && kills[b.slug];
      if (k && k.count > 0) done++;
    });
    (MILESTONES.groups || []).forEach(function (g) {
      if (g.id !== 'hermit') return;
      var raw = 0;
      (g.items || []).forEach(function (it) { if (marks && marks[it.id]) raw++; });
      if (raw >= groupLimit(g)) done++;
    });
    (MILESTONE_BRANCHES || []).forEach(function (br) {
      var merged = mergedBranchGroup(br, MILESTONES.groups || []);
      if (merged.items.length && chainState(merged, kills, state.chainDone).complete) done++;
    });
    return { done: done, total: total, pct: total ? Math.round(done * 100 / total) : 0 };
  }

  function overallProgress() { return progressFor(state.kills, state.marks); }

  // Цепочка линейна: выполненный шаг закрывает все шаги до него.
  function chainStepDone(it, kills, manual) {
    if (manual && manual[it.id]) return true;
    var gates = CHAIN_GATES[it.id];
    if (!gates || !gates.length) return false;
    return gates.every(function (slug) {
      var k = kills && kills[slug];
      return !!(k && parseInt(k.count, 10) > 0);
    });
  }

  function chainState(g, kills, manual) {
    var items = g.items || [];
    var doneMap = {};
    var done = 0;
    var next = null;
    items.forEach(function (it) {
      if (chainStepDone(it, kills, manual)) {
        doneMap[it.id] = true;
        done++;
      } else if (!next) {
        next = it;
      }
    });
    return {
      items: items,
      doneMap: doneMap,
      done: done,
      total: items.length,
      pct: items.length ? Math.round(done * 100 / items.length) : 0,
      complete: done >= items.length,
      next: next
    };
  }

  function bossBySlug(slug) {
    for (var i = 0; i < BOSSES.length; i++) {
      if (BOSSES[i].slug === slug) return BOSSES[i];
    }
    return null;
  }

  function pctText(v) {
    return String(Math.round(v * 10) / 10).replace('.', ',') + '%';
  }

  function renderHead() {
    var isProgress = state.tab === 'progress';
    var isSkills = state.tab === 'skills';
    var isCraft = state.tab === 'craft';
    var isKitchen = state.tab === 'kitchen';
    if (els.toolbar) {
      els.toolbar.hidden = isProgress || isSkills || isKitchen;
      els.toolbar.classList.toggle('is-craft', isCraft);
    }
    if (isKitchen) {
      var cookTotal = (COOK.recipes || []).length;
      var eatenCount = Object.keys(state.eaten || {}).length;
      var eatenPct = cookTotal ? Math.round(eatenCount / cookTotal * 1000) / 10 : 0;
      els.title.textContent = 'Кухня';
      els.hint.textContent = 'Симулятор казана: 4 ингредиента — одно блюдо';
      els.pCount.textContent = eatenCount + ' / ' + cookTotal;
      els.pPercent.textContent = pctText(eatenPct);
      els.pFill.style.width = eatenPct + '%';
      els.pCaption.textContent = eatenCount === 0
        ? 'Пока ни одно блюдо не отмечено'
        : (eatenCount === cookTotal ? 'Все блюда попробованы!'
          : 'Съедено блюд: ' + eatenCount + ' из ' + cookTotal);
      return;
    }
    if (isCraft) {
      var total = Object.keys(CRAFT.recipes || {}).length;
      var obtainedCount = Object.keys(state.crafted || {}).length;
      var obtainedPct = total ? Math.round(obtainedCount / total * 1000) / 10 : 0;
      els.search.placeholder = 'Найти рецепт…';
      els.title.textContent = 'Книга рецептов';
      els.hint.textContent = 'Все рецепты DST: из чего делается и где используется';
      els.pCount.textContent = obtainedCount + ' / ' + total;
      els.pPercent.textContent = pctText(obtainedPct);
      els.pFill.style.width = obtainedPct + '%';
      els.pCaption.textContent = obtainedCount === 0
        ? 'Пока ничего не получено'
        : (obtainedCount === total ? 'Все предметы получены!'
          : 'Получено предметов: ' + obtainedCount + ' из ' + total);
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

  var RU_NUMBERS = {
    'один': 1, 'одного': 1, 'одна': 1, 'одну': 1,
    'два': 2, 'две': 2, 'двух': 2,
    'три': 3, 'трёх': 3, 'трех': 3,
    'четыре': 4, 'четырёх': 4, 'четырех': 4,
    'пять': 5, 'пяти': 5,
    'шесть': 6, 'шести': 6,
    'семь': 7, 'семи': 7,
    'восемь': 8, 'восьми': 8,
    'девять': 9, 'девяти': 9,
    'десять': 10, 'десяти': 10,
    'одиннадцать': 11, 'одиннадцати': 11,
    'двенадцать': 12, 'двенадцати': 12
  };

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
      // «не нужен "X"» — это запрет, а не обязательный предыдущий навык.
      var positive = (s.cond || '').replace(
        /(?:не\s+(?:нужен|нужны|изучать|изучите|открывать|открывайте))[^.;]*/gi, '');
      var re = /[«"]([^»"]+)[»"]/g, m;
      while ((m = re.exec(positive))) {
        var pid = byTitle[m[1]];
        if (pid && pid !== s.id) add(s.id, pid);
      }
    });
    tree._parents = map;
    tree._byId = byId;
    return map;
  }

  function hasBranch(tree, list, kind) {
    var byId = tree._byId || {};
    return list.some(function (id) {
      var s = byId[id];
      if (!s) return false;
      var key = s.id.toLowerCase();
      return kind === 'lunar' ? key.indexOf('lunar') >= 0 : key.indexOf('shadow') >= 0;
    });
  }

  function skillGroupByText(tree, text) {
    var t = String(text || '').toLowerCase();
    var found = '';
    Object.keys(tree.groups || {}).forEach(function (gid) {
      if (found) return;
      var label = String(tree.groups[gid] || '').toLowerCase();
      if (label.length < 4) return;
      if (t.indexOf(label.slice(0, 4)) >= 0) found = gid;
    });
    return found;
  }

  function skillGroupCount(tree, list, gid) {
    var byId = tree._byId || {};
    var n = 0;
    list.forEach(function (id) {
      var s = byId[id];
      if (s && !s.lock && s.group === gid) n++;
    });
    return n;
  }

  var SKILL_BRANCH_LOCK = /(?:не изучать|не изучайте|не открывать|не открывайте|не имейте|без)\s+(?:навыков\s+|навык\s+)?(тенев|лунн)/;

  function skillCondTextMet(tree, text, list) {
    var t = String(text || '').toLowerCase().trim();
    if (!t) return true;

    if (t.indexOf('небесн') >= 0 && !state.skillConds.celestial) return false;
    if (t.indexOf('топливопряд') >= 0 && !state.skillConds.fuelweaver) return false;

    var bm = t.match(SKILL_BRANCH_LOCK);
    if (bm && hasBranch(tree, list, bm[1] === 'тенев' ? 'shadow' : 'lunar')) return false;

    var m = t.match(/(?:изучит[еь]|открыть|откройте)\s+(?:как минимум\s+|минимум\s+)?(\d+|[а-яё]+)\s+навык(?:ов|а)?(?=\s|$|[.,;:])([\s\S]*)/);
    if (m) {
      var n = parseInt(m[1], 10);
      if (isNaN(n)) n = RU_NUMBERS[m[1]] || 0;
      if (n > 0) {
        var rest = String(m[2] || '').trim();
        var global = /^(?:[.,;:]|$|не\s|без\s|побед|открыть|изучит)/.test(rest);
        if (global) {
          if (list.length < n) return false;
        } else if (!/полк|сторон|ветк/.test(rest)) {
          var gid = skillGroupByText(tree, rest);
          if (gid && skillGroupCount(tree, list, gid) < n) return false;
        }
      }
    }
    return true;
  }

  function skillCondTexts(tree, s) {
    var byId = tree._byId || {};
    var texts = [];
    if (s.cond) texts.push(s.cond);
    (s.locks || []).forEach(function (id) {
      var n = byId[id];
      if (n && n.title) texts.push(n.title);
    });
    (skillParents(tree)[s.id] || []).forEach(function (pid) {
      var p = byId[pid];
      if (p && p.lock && p.title) texts.push(p.title);
    });
    var out = [];
    texts.forEach(function (t) {
      if (t && out.indexOf(t) < 0) out.push(t);
    });
    return out;
  }

  function skillCondMet(tree, s, list) {
    var texts = skillCondTexts(tree, s);
    for (var i = 0; i < texts.length; i++) {
      if (!skillCondTextMet(tree, texts[i], list)) return false;
    }
    return true;
  }

  function skillCanLearn(tree, s, list) {
    if (!s || s.lock) return false;
    if (list.indexOf(s.id) >= 0) return false;
    if (!skillCondMet(tree, s, list)) return false;
    var map = skillParents(tree);
    var byId = tree._byId || {};
    var need = (map[s.id] || []).filter(function (pid) {
      var p = byId[pid];
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
    var cookTotal = (COOK.recipes || []).length;
    var cookTab = cookTotal
      ? '<button class="tab' + (state.tab === 'kitchen' ? ' is-on' : '') + '" data-tab="kitchen">' +
        '<span class="tab__icon" aria-hidden="true">🍲</span>Кухня' +
        '<span class="tab__count">' + cookTotal + '</span></button>'
      : '';
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
        var list;
        if (c.id === 'all') {
          list = BOSSES.filter(function (b) { return b.category !== 'mini'; });
        } else if (c.id === 'mini') {
          list = BOSSES.filter(function (b) { return b.category === 'mini'; });
        } else {
          list = BOSSES.filter(function (b) { return b.category === c.id; });
        }
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
      if (c.id === 'mini') html += cookTab;
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
      if (state.tab === 'mini') {
        if (b.category !== 'mini') return false;
      } else if (state.tab !== 'chronicle' && b.category === 'mini') {
        return false;
      }
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
      ? '<div class="stamp stamp--small"><span>Побеждён</span></div>'
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
    if (state.tab === 'kitchen') { renderKitchen(); return; }
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
        var hasTree = !!SKILL_TREES[c.key];
        var used = (state.builds[c.key] || []).length;
        return '<button type="button" class="pick' + (hasTree ? '' : ' is-off') + '" ' +
          'data-skillchar="' + esc(c.key) + '"' + (hasTree ? '' : ' disabled') + '>' +
          '<img src="' + esc(c.head) + '" alt="" loading="lazy">' +
          '<span>' + esc(c.name) + '</span>' +
          '<span class="pick__pts">' + (hasTree ? used + ' / ' + SKILL_POINTS : 'нет древа') + '</span></button>';
      }).join('');
      els.grid.innerHTML = '<div class="skillpick">' +
        '<h3 class="skillpick__title">Древо навыков</h3>' +
        '<p class="skillpick__lead">Выбери персонажа и распредели ' + SKILL_POINTS + ' очков между навыками.</p>' +
        '<div class="picks">' + chars + '</div></div>';
      return;
    }
    if (!tree) {
      els.empty.hidden = true;
      var who = '';
      CHARACTERS.forEach(function (c) { if (c.key === state.char) who = c.name; });
      els.grid.innerHTML = '<div class="skillpick">' +
        '<h3 class="skillpick__title">Древа нет</h3>' +
        '<p class="skillpick__lead">' + (who ? esc(who) : 'Этот персонаж') +
          ' не имеет древа навыков в игре. Выбери другого персонажа.</p>' +
        '<button class="btn btn--big skillpick__back" data-skillchange="1">К выбору персонажа</button>' +
        '</div>';
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
        ')</summary><p class="skilltree__lockshint">Убийства боссов включаются тумблерами; ' +
        'остальные условия считаются по отмеченным навыкам.</p><ul>' +
        lockConds.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></details>'
      : '';
    var conds = state.skillConds || {};
    var condRow = '<div class="skillconds">' +
      '<span class="skillconds__label">Условия:</span>' +
      '<button class="chip' + (conds.celestial ? ' is-on' : '') + '" data-skillcond="celestial" ' +
        'aria-pressed="' + (conds.celestial ? 'true' : 'false') + '">☀ Небесный защитник побеждён</button>' +
      '<button class="chip' + (conds.fuelweaver ? ' is-on' : '') + '" data-skillcond="fuelweaver" ' +
        'aria-pressed="' + (conds.fuelweaver ? 'true' : 'false') + '">☾ Древний топливопряд побеждён</button>' +
      '</div>';

    els.grid.innerHTML = '<div class="skilltree">' +
      '<div class="skilltree__head">' + face +
        '<div class="skilltree__title"><h3>' + esc(tree.name) + '</h3><p>Древо навыков · ' + SKILL_POINTS + ' очков</p></div>' +
        insight +
        '<button class="btn btn--ghost skilltree__change" data-skillchange="1">Сменить персонажа</button>' +
        '<div class="skilltree__legend"><span class="is-on">изучено</span><span>доступно</span><span class="is-lock">условие</span></div>' +
      '</div>' + xpBlock + condRow +
      '<div class="skilltree__canvas">' +
        '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
          '<g class="skilltree__groups">' + groupLabels + '</g>' +
          '<g class="skilltree__lines">' + lines.join('') + '</g>' +
          '<g class="skilltree__nodes">' + nodes + '</g>' +
        '</svg></div>' +
      '<div class="skilltree__details" id="skill-details">Нажми на доступный навык, чтобы изучить его за 1 очко.</div>' +
      quotesBlock((QUOTES && QUOTES.chars[state.char]) || [], 'Цитаты о персонаже') +
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
      if (skillCanLearn(tree, s, list)) return 'Доступен';
      return skillCondMet(tree, s, list) ? 'Сначала изучите предыдущий навык' : 'Условие не выполнено';
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
        (function () {
          var texts = skillCondTexts(tree, s).filter(function (t) { return t && t !== '-'; });
          return texts.length ? '<p class="skilltree__cond">Условие: ' + esc(texts.join(' · ')) + '</p>' : '';
        })() +
        (on || can ? '' : '<p class="skilltree__cond">' +
          (skillCondMet(tree, s, list) ? 'Сначала изучите предыдущий навык.' : 'Условие не выполнено.') + '</p>') +
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

  function chainBody(g, st) {
    var html = '';
    if (st.complete) {
      html += '<div class="chain__next chain__next--done">' +
        '<span class="chain__next-label">Ветка пройдена</span>' +
        '<p class="chain__next-note">Все ' + st.total + ' шагов закрыты.</p></div>';
    } else if (st.next) {
      html += '<div class="chain__next">' +
        '<div class="chain__next-head"><div>' +
          '<span class="chain__next-label">Следующий шаг</span>' +
          '<span class="chain__next-name">' +
          (st.next.icon_img ? '<img src="' + esc(st.next.icon_img) + '" alt="">' : '') +
          esc(st.next.name) + '</span>' +
        '</div>' +
        '<button class="btn chain__done" data-chainstep="' + esc(st.next.id) + '">Выполнить шаг</button>' +
        '</div>' +
        (st.next.note ? '<p class="chain__next-note">' + esc(st.next.note) + '</p>' : '') +
        '</div>';
    }

    html += '<details class="chain__all">' +
      '<summary class="chain__toggle"><span>Показать весь путь</span>' +
      '<span class="chain__toggle-count">' + st.total + ' шагов</span></summary>' +
      '<ol class="chain__steps">' + st.items.map(function (it, i) {
        var done = !!st.doneMap[it.id];
        var next = !!(st.next && st.next.id === it.id);
        var cls = 'chain__step' + (done ? ' is-done' : (next ? ' is-next' : ''));
        var btn = '';
        if (done && state.chainDone && state.chainDone[it.id]) {
          btn = '<button class="chain__stepbtn" data-chainstep="' + esc(it.id) + '" data-off="1">Снять</button>';
        } else if (!done) {
          btn = '<button class="chain__stepbtn" data-chainstep="' + esc(it.id) + '">Выполнить</button>';
        }
        return '<li class="' + cls + '">' +
          (it.icon_img ? '<img src="' + esc(it.icon_img) + '" alt="">' : '') +
          '<span class="chain__step-body"><b>' + esc(it.name) + '</b>' +
          (it.note ? '<span class="chain__note">' + esc(it.note) + '</span>' : '') +
          '</span>' + btn + '</li>';
      }).join('') + '</ol>' +
      '<button class="btn btn--ghost chain__back" data-pathclose="1">Назад</button>' +
      '</details>';
    return html;
  }

  function branchSection(br, groups) {
    var merged = mergedBranchGroup(br, groups);
    if (!merged.items.length) return '';
    var st = chainState(merged, state.kills, state.chainDone);
    var name = br.id === 'lunar' ? 'Лунная ветка' : (br.id === 'shadow' ? 'Теневая ветка' : br.name);
    var icon = br.id === 'lunar' ? '☀' : (br.id === 'shadow' ? '☾' : '✦');
    var hint = br.id === 'lunar'
      ? 'Сначала Небесный защитник, затем Вагстаф.'
      : (br.id === 'shadow' ? 'Сначала Древний топливопряд, затем Чарли.' : (br.hint || ''));

    var bossChips = (BRANCH_BOSSES[br.id] || []).map(function (slug) {
      var b = bossBySlug(slug);
      if (!b) return '';
      var killed = isKilled(slug);
      var locked = !killed && state.silhouettes;
      return '<button class="branch-boss' + (killed ? ' is-killed' : '') + (locked ? ' is-locked' : '') +
        '" data-slug="' + esc(slug) + '" title="' + esc(b.name_ru) + '">' +
        '<img src="' + esc(art(b)) + '" alt="">' +
        '<span class="branch-boss__name">' + esc(b.name_ru) + '</span>' +
        '<span class="branch-boss__state">' + (killed ? 'побеждён' : 'не побеждён') + '</span></button>';
    }).join('');

    return '<div class="branch">' +
      '<div class="pbar-card branch-card">' +
        '<div class="branch__head"><h3>' + icon + ' ' + esc(name) + '</h3>' +
        '<p>' + esc(hint) + '</p>' +
        '<span class="branch__num">' + st.done + ' / ' + st.total + ' · ' + st.pct + '%</span></div>' +
        '<div class="progress__bar"><i style="width:' + st.pct + '%"></i></div>' +
        (bossChips ? '<div class="branch__bosses"><span class="branch__bosses-label">Боссы ветки</span>' +
          '<div class="branch__bosslist">' + bossChips + '</div></div>' : '') +
        chainBody(merged, st) +
      '</div></div>';
  }

  function renderProgress() {
    els.grid.hidden = false;
    els.empty.hidden = true;
    var o = overallProgress();
    var bp = progress(BOSSES);
    var groups = MILESTONES.groups || [];
    var hermit = null;
    groups.forEach(function (g) { if (g.id === 'hermit') hermit = g; });

    var html = '<div class="progress-view">';
    html += pbarCard('Общий прогресс', o,
      'Боссы + жемчужина отшельницы + две квестовые ветки. 100% — всё закрыто.');
    html += pbarCard('Боссы', bp, 'Все записи компендиума.');
    html += '<p class="progress-note">Галочки — только у отшельницы. ' +
      'Ветки идут по убитым боссам или кнопке «Выполнить шаг» и показывают следующий шаг.</p>';

    if (hermit) html += groupCard(hermit);

    (MILESTONE_BRANCHES || []).forEach(function (br) {
      html += branchSection(br, groups);
    });

    html += '</div>';
    els.grid.innerHTML = html;
  }

  function toggleMark(id) {
    var hermit = null;
    (MILESTONES.groups || []).forEach(function (g) { if (g.id === 'hermit') hermit = g; });
    if (!hermit || !(hermit.items || []).some(function (it) { return it.id === id; })) return;
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
  var entryReturnFocus = null;

  function trapEntryFocus() {
    entryReturnFocus = document.activeElement;
    var close = els.entry.querySelector('.entry__close');
    if (close) close.focus();
  }

  function restoreEntryFocus() {
    if (entryReturnFocus && entryReturnFocus.focus) entryReturnFocus.focus();
    entryReturnFocus = null;
  }

  function focusCraftEntry() {
    var target = els.entryBody.querySelector('[data-craftback]') ||
      els.entryBody.querySelector('.craft-node__toggle') ||
      els.entryBody.querySelector('.craft-node__name');
    if (target && target.focus) target.focus();
  }

  function fact(k, v) {
    if (v === null || v === undefined || v === '') return '';
    return '<div class="fact"><div class="fact__k">' + esc(k) + '</div>' +
      '<div class="fact__v">' + esc(v) + '</div></div>';
  }

  /* ---------- книга рецептов ---------- */

  /* ---------- кухня: симулятор казана ---------- */

  var COOK_TAG_LABELS = {
    meat: 'мясо', fish: 'рыба', monster: 'монстр', veggie: 'овощи',
    fruit: 'фрукты', egg: 'яйца', dairy: 'молочное', sweetener: 'сладкое',
    fat: 'жир', frozen: 'лёд', inedible: 'несъедобное',
    decoration: 'украшение', seed: 'семена', magic: 'магия'
  };
  var COOK_GROUP_ORDER = {};
  var COOK_COMMON = {
    meat: 1, monstermeat: 1, smallmeat: 1, froglegs: 1, drumstick: 1,
    fish: 1, eel: 1, pondeel: 1, fishmeat_small: 1, fishmeat: 1,
    berries: 1, berries_juicy: 1, carrot: 1, corn: 1, pumpkin: 1,
    eggplant: 1, potato: 1, tomato: 1, onion: 1, garlic: 1,
    red_cap: 1, green_cap: 1, blue_cap: 1, moon_cap: 1, honey: 1,
    egg: 1, twigs: 1, ice: 1, butter: 1, goatmilk: 1, kelp: 1,
    dragonfruit: 1, pomegranate: 1, cave_banana: 1, watermelon: 1,
    acorn: 1, butterflywings: 1
  };

  function cookIconHtml(item, cls) {
    if (item && item.icon) {
      return '<img class="' + cls + '" src="' + esc(item.icon) + '" alt="" loading="lazy">';
    }
    return '<span class="' + cls + ' cook-icon--empty" aria-hidden="true">🍲</span>';
  }

  function cookNum(v) {
    if (v === null || v === undefined) return '—';
    var n = Math.round(v * 10) / 10;
    var s = String(n).replace('.', ',');
    return n > 0 ? '+' + s : s;
  }

  function cookStats(r) {
    return '<div class="cook-stats">' +
      '<div class="cook-stat"><span>Голод</span><b>' + cookNum(r.hunger) + '</b></div>' +
      '<div class="cook-stat"><span>Рассудок</span><b>' + cookNum(r.sanity) + '</b></div>' +
      '<div class="cook-stat"><span>Здоровье</span><b>' + cookNum(r.health) + '</b></div>' +
      '<div class="cook-stat"><span>Портится</span><b>' +
        (r.perish_days ? r.perish_days + ' дн.' : 'не портится') + '</b></div>' +
      '<div class="cook-stat"><span>Готовка</span><b>' +
        (r.cooktime_sec || '—') + ' сек</b></div>' +
      '</div>';
  }

  function cookTagSummary(tags) {
    var parts = [];
    Object.keys(tags || {}).forEach(function (k) {
      if (tags[k]) parts.push((COOK_TAG_LABELS[k] || k) + ' ' + String(tags[k]).replace('.', ','));
    });
    if (!parts.length) return '';
    return '<details class="cook-tags"><summary>Теги состава</summary><p>' +
      esc(parts.join(' · ')) + '</p></details>';
  }

  function cookEvaluate(ids) {
    var names = {}, tags = {};
    (ids || []).forEach(function (id) {
      names[id] = (names[id] || 0) + 1;
      var ing = COOK.ingredients[id];
      if (!ing || !ing.tags) return;
      Object.keys(ing.tags).forEach(function (k) {
        tags[k] = (tags[k] || 0) + ing.tags[k];
      });
    });
    var cand = (COOK.recipes || []).filter(function (r) {
      if (r.warly && !state.kitchenWarly) return false;
      try { return r.test(names, tags); } catch (e) { return false; }
    });
    if (!cand.length) return { results: [], names: names, tags: tags };
    var max = Math.max.apply(null, cand.map(function (r) { return r.priority || 0; }));
    var top = cand.filter(function (r) { return (r.priority || 0) === max; });
    var total = 0;
    top.forEach(function (r) { total += (r.weight || 1); });
    top.sort(function (a, b) {
      return ((b.weight || 1) - (a.weight || 1)) ||
        a.name.localeCompare(b.name, 'ru');
    });
    return {
      results: top.map(function (r) {
        return { recipe: r, chance: total ? (r.weight || 1) / total : 1 / top.length };
      }),
      names: names,
      tags: tags
    };
  }

  function cookSlotHtml(id, idx) {
    if (!id) {
      return '<div class="cook-slot is-empty"><span class="cook-slot__plus">+</span>' +
        '<span class="cook-slot__empty">пусто</span></div>';
    }
    var ing = COOK.ingredients[id];
    return '<button class="cook-slot" type="button" data-cookremove="' + idx +
      '" title="Убрать ингредиент">' +
      '<span class="cook-slot__x" aria-hidden="true">×</span>' +
      '<span class="cook-slot__icon">' + cookIconHtml(ing, 'cook-slot__img') + '</span>' +
      '<span class="cook-slot__name">' + esc(ing ? ing.name : id) + '</span></button>';
  }

  function cookVariants(n) {
    if (n % 10 === 1 && n % 100 !== 11) return n + ' вариант';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return n + ' варианта';
    return n + ' вариантов';
  }

  function cookRecipeById(id) {
    var found = null;
    (COOK.recipes || []).forEach(function (r) { if (r.id === id) found = r; });
    return found;
  }

  function cookVariationSlots(ex) {
    var slots = [];
    (ex || []).forEach(function (pair) {
      for (var i = 0; i < pair[1]; i++) slots.push(pair[0]);
    });
    return slots.slice(0, 4);
  }

  function cookVariationHtml(ex, idx) {
    return '<button class="cook-variation" type="button" data-cookvar="' + idx + '">' +
      '<span class="cook-variation__ings">' + ex.map(function (pair) {
        var ing = COOK.ingredients[pair[0]];
        return '<span class="cook-variation__ing">' +
          cookIconHtml(ing, 'cook-variation__img') +
          '<span>' + esc(ing ? ing.name : pair[0]) + '</span><b>×' + pair[1] + '</b></span>';
      }).join('') + '</span>' +
      '<span class="cook-variation__action">Собрать</span></button>';
  }

  function cookFoodNum(v) {
    if (v === null || v === undefined) return '—';
    var n = Math.round(v * 1000) / 1000;
    var str = String(n).replace('.', ',');
    return n > 0 ? '+' + str : str;
  }

  function cookPerishDays(days) {
    if (!days) return 'не портится';
    return String(Math.round(days * 10) / 10).replace('.', ',') + ' дн.';
  }

  function cookIngredientStats(ing) {
    if (!ing.stats) {
      return '<p class="cook-ing-detail__note">' +
        (ing.inedible
          ? 'Несъедобно — используется только в рецептах.'
          : 'Нет данных о питательности.') + '</p>';
    }
    var st = ing.stats;
    return '<div class="cook-ing-detail__stats">' +
      '<h3>Если съесть</h3>' +
      '<div class="cook-stats">' +
        '<div class="cook-stat"><span>Голод</span><b>' + cookFoodNum(st.hunger) + '</b></div>' +
        '<div class="cook-stat"><span>Здоровье</span><b>' + cookFoodNum(st.health) + '</b></div>' +
        '<div class="cook-stat"><span>Рассудок</span><b>' + cookFoodNum(st.sanity) + '</b></div>' +
        '<div class="cook-stat"><span>Портится</span><b>' + cookPerishDays(st.perish_days) + '</b></div>' +
      '</div>' +
      '</div>';
  }

  function openCookIngredient(id) {
    var ing = COOK.ingredients[id];
    if (!ing) return;
    state.cookRecipeId = null;
    state.craftId = null;
    state.craftStack = [];
    var groupName = '';
    (COOK.groups || []).forEach(function (g) { if (g.id === ing.group) groupName = g.name; });
    var tags = Object.keys(ing.tags || {}).filter(function (k) { return ing.tags[k]; })
      .map(function (k) {
        return '<span class="cook-ing-detail__tag">' + esc(COOK_TAG_LABELS[k] || k) +
          ' <b>' + String(ing.tags[k]).replace('.', ',') + '</b></span>';
      }).join('');
    var count = 0;
    (state.kitchenSlots || []).forEach(function (x) { if (x === id) count++; });
    var prev = document.getElementById('entry-prev');
    var next = document.getElementById('entry-next');
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    var wasHidden = els.entry.hidden;
    els.entryBody.innerHTML = '<div class="cook-ing-detail">' +
      '<div class="cook-ing-detail__head">' +
        '<div class="cook-ing-detail__icon">' + cookIconHtml(ing, 'cook-ing-detail__img') + '</div>' +
        '<div><h2 id="entry-name">' + esc(ing.name) + '</h2>' +
          '<p class="cook-detail__meta">' + esc(groupName) +
          (ing.name_en ? ' · ' + esc(ing.name_en) : '') + '</p></div>' +
      '</div>' +
      '<div class="cook-ing-detail__tags">' + (tags || '<span>Без тегов</span>') + '</div>' +
      cookIngredientStats(ing) +
      '<p class="cook-ing-detail__count">В казане сейчас: <b>' + count + '</b></p>' +
      '<button class="btn cook-ing-detail__add" type="button" data-cookadding="' + esc(id) +
        '">Добавить в казан</button>' +
      '</div>';
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
    if (wasHidden) trapEntryFocus();
  }

  function openCookRecipe(id) {
    var r = cookRecipeById(id);
    if (!r || !r.examples || !r.examples.length) return;
    state.cookRecipeId = id;
    state.craftId = null;
    state.craftStack = [];
    var prev = document.getElementById('entry-prev');
    var next = document.getElementById('entry-next');
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    var wasHidden = els.entry.hidden;
    els.entryBody.innerHTML = '<div class="cook-detail">' +
      '<div class="cook-detail__head">' +
        '<div class="cook-detail__icon">' + cookIconHtml(r, 'cook-detail__img') +
          (isEaten(r.id) ? markStamp('Съедено', 'stamp--entry') : '') + '</div>' +
        '<div class="cook-detail__title"><h2 id="entry-name">' + esc(r.name) + '</h2>' +
          '<p class="cook-detail__meta">' + esc(r.foodtype || 'Блюдо') +
            (r.warly ? ' · Варли' : '') + '</p></div>' +
      '</div>' +
      cookStats(r) +
      cookFaveLong(r) +
      '<button class="btn mark-btn' + (isEaten(r.id) ? ' is-on' : '') +
        '" type="button" data-cookeaten="1">' +
        (isEaten(r.id) ? 'Съедено ✓' : 'Отметить съеденным') + '</button>' +
      (r.warly ? '<p class="cook-detail__warly">Только портативный казан Варли.</p>' : '') +
      '<h3 class="cook-variations__title">Варианты состава</h3>' +
      '<p class="cook-detail__hint">Выбери состав — он сразу переедет в казан.</p>' +
      '<div class="cook-variation-list">' + r.examples.map(cookVariationHtml).join('') + '</div>' +
      '</div>';
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
    if (wasHidden) trapEntryFocus();
  }

  function kitchenUseVariation(index) {
    var r = cookRecipeById(state.cookRecipeId);
    if (!r || !r.examples || !r.examples[index]) return;
    var slots = cookVariationSlots(r.examples[index]);
    if (r.warly) state.kitchenWarly = true;
    closeEntry();
    state.kitchenSlots = slots;
    if (state.tab !== 'kitchen') state.tab = 'kitchen';
    renderAll();
    var sim = document.querySelector('.kitchen__sim');
    if (sim && sim.scrollIntoView) sim.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast('Состав собран: ' + r.name);
  }

  function cookAlternativesHtml(results) {
    return '<div class="cook-alts"><span class="cook-alts__label">Возможные блюда:</span>' +
      results.map(function (x) {
        return '<span class="cook-alts__item">' +
          cookIconHtml(x.recipe, 'cook-alts__img') +
          esc(x.recipe.name) + ' <b>' + Math.round(x.chance * 100) + '%</b></span>';
      }).join('') + '</div>';
  }

  function cookResultHtml() {
    var n = (state.kitchenSlots || []).length;
    if (n < 4) {
      var left = 4 - n;
      return '<div class="cook-result cook-result--empty">' +
        '<span class="cook-result__big" aria-hidden="true">🍲</span>' +
        '<p>Добавь ещё <b>' + left + '</b> ' +
        (left === 1 ? 'ингредиент' : 'ингредиента') + '</p>' +
        '<span class="cook-result__sub">Когда будет 4, покажу, что получится</span></div>';
    }
    var ev = cookEvaluate(state.kitchenSlots);
    if (!ev.results.length) {
      return '<div class="cook-result cook-result--empty"><p>Ничего не получилось.</p></div>';
    }
    var primary = ev.results[0], r = primary.recipe;
    var multi = ev.results.length > 1;
    return '<div class="cook-result">' +
      '<div class="cook-result__head">' +
        '<div class="cook-result__icon">' + cookIconHtml(r, 'cook-result__img') +
          (isEaten(r.id) ? markStamp('Съедено', 'stamp--card') : '') + '</div>' +
        '<div class="cook-result__title"><h3>' + esc(r.name) + '</h3>' +
          '<p>' + esc(r.foodtype || 'Блюдо') + (r.warly ? ' · Варли' : '') +
            (multi ? ' · возможных результатов: ' + ev.results.length : '') + '</p></div>' +
      '</div>' +
      cookStats(r) +
      cookFaveLong(r) +
      (r.warly ? '<p class="cook-result__hint">Только портативный казан Варли.</p>' : '') +
      (r.id === 'wetgoop'
        ? '<p class="cook-result__hint">Комбинация не подошла ни под один рецепт — получится кашица.</p>'
        : '') +
      cookTagSummary(ev.tags) +
      (multi ? cookAlternativesHtml(ev.results) : '') +
      '</div>';
  }

  function cookIngredientButton(ing) {
    return '<button class="cook-ing" type="button" data-cooking="' + esc(ing.id) +
      '" title="Информация: ' + esc(ing.name) + '">' +
      '<span class="cook-ing__icon">' + cookIconHtml(ing, 'cook-ing__img') + '</span>' +
      '<span class="cook-ing__name">' + esc(ing.name) + '</span></button>';
  }

  function cookIngredientsHtml() {
    var q = (state.kitchenQuery || '').trim().toLowerCase();
    var list = Object.keys(COOK.ingredients || {}).map(function (id) {
      return COOK.ingredients[id];
    }).filter(function (ing) {
      if (state.kitchenCat !== 'all' && ing.group !== state.kitchenCat) return false;
      if (q) {
        var hay = (ing.name + ' ' + ing.name_en + ' ' + ing.id).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    list.sort(function (a, b) {
      var ga = COOK_GROUP_ORDER[a.group];
      var gb = COOK_GROUP_ORDER[b.group];
      if (ga === undefined) ga = 99;
      if (gb === undefined) gb = 99;
      var wa = COOK_COMMON[a.id] ? 0 : 1;
      var wb = COOK_COMMON[b.id] ? 0 : 1;
      var ca = /_(cooked|dried)$/.test(a.id) ? 1 : 0;
      var cb = /_(cooked|dried)$/.test(b.id) ? 1 : 0;
      return ga - gb || wa - wb || ca - cb || a.name.localeCompare(b.name, 'ru');
    });
    if (!list.length) return '<p class="cook-empty">Ничего не найдено.</p>';
    return '<div class="cook-ing-grid">' + list.map(cookIngredientButton).join('') + '</div>';
  }

  function cookFaveShort(r) {
    var fav = r.favorites || [];
    if (!fav.length) return '';
    return '<span class="cook-recipe__fave">♥ Любимое: ' + fav.map(function (f) {
      return '<img src="' + esc(f.head) + '" alt=""><b>' + esc(f.name) + '</b>';
    }).join(', ') + '</span>';
  }

  function cookFaveLong(r) {
    var fav = r.favorites || [];
    if (!fav.length) return '';
    return fav.map(function (f) {
      return '<p class="cook-fave">' +
        '<img src="' + esc(f.head) + '" alt="">' +
        '<span>♥ Любимое блюдо: <b>' + esc(f.name) + '</b></span>' +
        '<span class="cook-fave__bonus">+15 рассудка</span></p>';
    }).join('');
  }

  function cookRecipesHtml() {
    var q = (state.kitchenRecipeQuery || '').trim().toLowerCase();
    var list = (COOK.recipes || []).filter(function (r) {
      if (!q) return true;
      return (r.name + ' ' + r.name_en + ' ' + r.id).toLowerCase().indexOf(q) >= 0;
    });
    list.sort(function (a, b) { return a.name.localeCompare(b.name, 'ru'); });
    if (!list.length) return '<p class="cook-empty">Ничего не найдено.</p>';
    return '<div class="cook-recipes-grid">' + list.map(function (r) {
      var can = r.example && r.example.length;
      var eaten = isEaten(r.id);
      return '<button class="cook-recipe' + (can ? '' : ' is-noex') + (r.warly ? ' is-warly' : '') +
        (eaten ? ' is-eaten' : '') +
        '" type="button" data-cookrecipe="' + esc(r.id) + '" title="' +
        (can ? 'Варианты состава' : 'Пример состава не задан') + (r.warly ? ' · Варли' : '') + '">' +
        (eaten ? markStamp('Съедено', 'stamp--card') : '') +
        '<span class="cook-recipe__icon">' + cookIconHtml(r, 'cook-recipe__img') + '</span>' +
        '<span class="cook-recipe__body"><b>' + esc(r.name) +
          (r.warly ? ' <span class="cook-recipe__warly">Варли</span>' : '') + '</b>' +
        '<span>' + cookNum(r.hunger) + ' голода · ' + cookVariants(r.examples.length) +
        '</span>' + cookFaveShort(r) + '</span></button>';
    }).join('') + '</div>';
  }

  function renderKitchen() {
    var groups = COOK.groups || [];
    var counts = {};
    Object.keys(COOK.ingredients || {}).forEach(function (id) {
      var g = COOK.ingredients[id].group;
      counts[g] = (counts[g] || 0) + 1;
    });
    COOK_GROUP_ORDER = {};
    groups.forEach(function (g, i) { COOK_GROUP_ORDER[g.id] = i; });

    var cats = '<button class="chip' + (state.kitchenCat === 'all' ? ' is-on' : '') +
      '" data-cookcat="all">Все <span>' + Object.keys(COOK.ingredients || {}).length +
      '</span></button>' + groups.filter(function (g) { return counts[g.id]; }).map(function (g) {
        return '<button class="chip' + (state.kitchenCat === g.id ? ' is-on' : '') +
          '" data-cookcat="' + esc(g.id) + '">' + esc(g.name) +
          ' <span>' + counts[g.id] + '</span></button>';
      }).join('');

    var slots = state.kitchenSlots || [];
    var html = '<div class="kitchen">' +
      '<section class="kitchen__sim">' +
        '<div class="kitchen__pot">' +
          '<div class="kitchen__cardhead"><h3>В казане</h3>' +
            '<div class="kitchen__pot-actions">' +
            '<button class="chip' + (state.kitchenWarly ? ' is-on' : '') + '" type="button" ' +
              'data-cookwarly="1" title="Портативный казан Варли">' +
              (state.kitchenWarly ? 'Казан Варли: вкл' : 'Казан Варли: выкл') + '</button>' +
            '<button class="btn btn--ghost" type="button" data-cookclear="1">Очистить</button></div></div>' +
          '<div class="kitchen__slots">' +
            [0, 1, 2, 3].map(function (i) { return cookSlotHtml(slots[i], i); }).join('') +
          '</div>' +
          '<p class="kitchen__hint">Клик по слоту убирает ингредиент.</p>' +
        '</div>' +
        '<div class="kitchen__result-wrap">' + cookResultHtml() + '</div>' +
      '</section>' +
      '<section class="kitchen__picker">' +
        '<div class="kitchen__cardhead"><h3>Ингредиенты</h3>' +
          '<input class="kitchen-search" type="search" id="kitchen-search" ' +
            'placeholder="Найти ингредиент…" value="' + esc(state.kitchenQuery) +
            '" autocomplete="off" aria-label="Поиск ингредиента"></div>' +
        '<div class="kitchen__cats">' + cats + '</div>' +
        '<p class="kitchen__hint">Клик по ингредиенту открывает карточку с описанием.</p>' +
        cookIngredientsHtml() +
      '</section>' +
      '<section class="kitchen__recipes">' +
        '<div class="kitchen__cardhead"><h3>Рецепты</h3>' +
          '<input class="kitchen-search" type="search" id="kitchen-recipe-search" ' +
            'placeholder="Найти блюдо…" value="' + esc(state.kitchenRecipeQuery) +
            '" autocomplete="off" aria-label="Поиск рецепта"></div>' +
        cookRecipesHtml() +
      '</section>' +
      '</div>';
    els.grid.hidden = false;
    els.empty.hidden = true;
    els.grid.innerHTML = html;
  }

  function kitchenAdd(id) {
    if (!COOK.ingredients[id]) return;
    if ((state.kitchenSlots || []).length >= 4) {
      toast('В казане уже 4 ингредиента');
      return;
    }
    state.kitchenSlots.push(id);
    renderKitchen();
  }

  function craftCatName(id) {
    var cats = CRAFT.categories || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].name;
    return id;
  }

  var CRAFT_SORTS = {
    name: 'По названию',
    category: 'По категории',
    character: 'По персонажу',
    obtained: 'Сначала полученные',
    unobtained: 'Сначала не полученные'
  };

  function craftBuilderName(r) {
    var ch = CHAR_BY_KEY[r.builder_char];
    return ch ? ch.name : (r.builder_text || '');
  }

  function craftSortList(list) {
    var sort = state.craftSort || 'name';
    var byName = function (a, b) { return (a.name || '').localeCompare(b.name || '', 'ru'); };
    if (sort === 'category') {
      return list.sort(function (a, b) {
        return craftCatName(a.category).localeCompare(craftCatName(b.category), 'ru') || byName(a, b);
      });
    }
    if (sort === 'character') {
      return list.sort(function (a, b) {
        var ca = !!a.builder_char, cb = !!b.builder_char;
        if (ca !== cb) return ca ? -1 : 1;
        return craftBuilderName(a).localeCompare(craftBuilderName(b), 'ru') || byName(a, b);
      });
    }
    if (sort === 'obtained' || sort === 'unobtained') {
      var firstObtained = sort === 'obtained';
      return list.sort(function (a, b) {
        var oa = isCrafted(a.id) ? (firstObtained ? 0 : 1) : (firstObtained ? 1 : 0);
        var ob = isCrafted(b.id) ? (firstObtained ? 0 : 1) : (firstObtained ? 1 : 0);
        return oa - ob || byName(a, b);
      });
    }
    return list.sort(byName);
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
        var hay = ((r.name || '') + ' ' + (r.name_en || '') + ' ' + (r.id || '') +
          ' ' + (r.builder_text || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return;
      }
      out.push(r);
    });
    return craftSortList(out);
  }

  function craftAsset(src) {
    return src || '';
  }

  function craftIconHtml(r, cls) {
    if (r && r.icon) return '<img class="' + cls + '" src="' + esc(craftAsset(r.icon)) + '" alt="" loading="lazy">';
    return '<span class="' + cls + ' craft-icon--empty">⚒</span>';
  }

  var CHAR_BY_KEY = {};
  CHARACTERS.forEach(function (c) { CHAR_BY_KEY[c.key] = c; });

  function craftBuilderChip(r, cls, withLabel) {
    var ch = CHAR_BY_KEY[r.builder_char];
    if (ch) {
      return '<span class="' + cls + '" title="Только для персонажа: ' + esc(ch.name) + '">' +
        '<img class="' + cls + '-head" src="' + esc(ch.head) + '" alt="" loading="lazy">' +
        '<span>' + (withLabel ? 'Только для ' : '') + esc(ch.name) + '</span></span>';
    }
    if (!r.builder_text) return '';
    return '<span class="' + cls + '"><span>' + esc(r.builder_text) + '</span></span>';
  }

  function craftCardHtml(r) {
    var meta = craftCatName(r.category);
    if (r.tech_text) meta += ' · ' + r.tech_text;
    var crafted = isCrafted(r.id);
    return '<button class="craft-card' + (crafted ? ' is-crafted' : '') +
      '" data-craft="' + esc(r.id) + '">' +
      (crafted ? markStamp('Получено', 'stamp--card') : '') +
      '<span class="craft-card__icon">' + craftIconHtml(r, 'craft-card__img') + '</span>' +
      '<span class="craft-card__body">' +
        '<span class="craft-card__name">' + esc(r.name) + '</span>' +
        '<span class="craft-card__meta">' + esc(meta) + '</span>' +
        craftBuilderChip(r, 'craft-card__builder') +
      '</span></button>';
  }

  function renderCraft() {
    var list = craftFiltered();
    var per = window.innerWidth <= 620 ? 36 : 60;
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
    var sortOptions = Object.keys(CRAFT_SORTS).map(function (key) {
      return '<option value="' + key + '"' + (state.craftSort === key ? ' selected' : '') + '>' +
        CRAFT_SORTS[key] + '</option>';
    }).join('');
    els.grid.innerHTML = '<div class="craft">' +
      '<div class="craft__cats">' + cats + '</div>' +
      '<div class="craft__sortbar">' +
        '<p class="craft__count">Найдено: ' + list.length + '</p>' +
        '<label class="craft__sortlabel">Сортировка' +
          '<select class="craft__sort" data-craftsort="1">' + sortOptions + '</select>' +
        '</label>' +
      '</div>' +
      (cards ? '<div class="craft__grid">' + cards + '</div>' : '<p class="craft__empty">Ничего не найдено.</p>') +
      more + '</div>';
  }

  function craftRecipeIdFor(product) {
    var ids = CRAFT_BY_PRODUCT[product] || [];
    var best = null, bestScore = -1;
    ids.forEach(function (id) {
      var r = CRAFT.recipes[id];
      if (!r) return;
      if (r.category === 'character' || r.category === 'event' || r.category === 'other') return;
      if (/transmute|shop|trade/i.test(id)) return;
      var score = 0;
      if (id === product) score += 100;
      if (!r.builder && !r.builder_text) score += 20;
      var n = (r.ingredients || []).filter(function (x) {
        return x.kind !== 'character' && x.qty > 0;
      }).length;
      score += Math.min(n, 5);
      if (score > bestScore) { bestScore = score; best = id; }
    });
    return best;
  }

  function craftRawAdd(raw, ing, qty) {
    var cur = raw[ing.id];
    if (!cur) {
      raw[ing.id] = { id: ing.id, name: ing.name, icon: ing.icon || '', qty: qty };
    } else {
      cur.qty += qty;
      if (ing.icon && !cur.icon) cur.icon = ing.icon;
    }
  }

  function craftCharAdd(charRaw, ing, qty) {
    var cur = charRaw[ing.id];
    if (!cur) {
      charRaw[ing.id] = { id: ing.id, name: ing.name, qty: qty };
    } else {
      cur.qty += qty;
    }
  }

  function craftIngredientNode(ing, mult, depth, path, raw, charRaw) {
    var qty = (parseInt(ing.qty, 10) || 0) * mult;
    if (qty <= 0) return null;
    if (ing.kind === 'character') {
      craftCharAdd(charRaw, ing, qty);
      return { kind: 'character', id: ing.id, name: ing.name, icon: '', qty: qty, children: [] };
    }
    var rid = craftRecipeIdFor(ing.id);
    var r = rid ? CRAFT.recipes[rid] : null;
    var node = {
      kind: 'raw',
      id: ing.id,
      name: ing.name,
      icon: ing.icon || (r && r.icon) || '',
      qty: qty,
      recipeId: rid || '',
      tech: '',
      children: []
    };
    if (r && depth < 8 && !path[ing.id]) {
      path[ing.id] = true;
      var kids = [];
      (r.ingredients || []).forEach(function (x) {
        var kid = craftIngredientNode(x, qty, depth + 1, path, raw, charRaw);
        if (kid) kids.push(kid);
      });
      delete path[ing.id];
      if (kids.length) {
        node.kind = 'craft';
        node.tech = r.tech_text || '';
        node.children = kids;
      } else {
        craftRawAdd(raw, ing, qty);
      }
    } else {
      craftRawAdd(raw, ing, qty);
    }
    return node;
  }

  function craftTreeData(r) {
    var raw = {}, charRaw = {};
    var path = {};
    path[r.product] = true;
    var root = {
      kind: 'craft', id: r.product, name: r.name, icon: r.icon,
      qty: 1, recipeId: r.id, tech: r.tech_text || '', children: []
    };
    (r.ingredients || []).forEach(function (ing) {
      var kid = craftIngredientNode(ing, 1, 1, path, raw, charRaw);
      if (kid) root.children.push(kid);
    });
    return { root: root, raw: raw, charRaw: charRaw };
  }

  function craftNodeHtml(node, isRoot) {
    var hasChildren = !!(node.children && node.children.length);
    var cls = 'craft-node craft-node--' + node.kind + (isRoot ? ' craft-node--root' : '');
    var toggle = hasChildren
      ? '<button class="craft-node__toggle" type="button" data-craftnode="1" ' +
          'aria-expanded="true" aria-label="Свернуть">▾</button>'
      : '<span class="craft-node__toggle craft-node__toggle--off" aria-hidden="true">•</span>';
    var icon = node.icon
      ? '<img src="' + esc(craftAsset(node.icon)) + '" alt="" loading="lazy">'
      : '<span class="craft-node__dot"></span>';
    var name = (node.kind === 'craft' && node.recipeId && !isRoot)
      ? '<button class="craft-node__name" type="button" data-craft="' + esc(node.recipeId) +
        '" title="Открыть рецепт">' + esc(node.name) + '</button>'
      : '<span class="craft-node__name">' + esc(node.name) + '</span>';
    var meta = [];
    if (node.qty) meta.push('<b>×' + node.qty + '</b>');
    if (node.kind === 'character') meta.push('ресурс персонажа');
    else if (node.kind === 'raw') meta.push('сырьё');
    else if (node.tech) meta.push(esc(node.tech));
    return '<li class="' + cls + '">' +
      '<div class="craft-node__row">' + toggle +
        '<span class="craft-node__icon">' + icon + '</span>' +
        '<span class="craft-node__body">' + name +
          '<span class="craft-node__meta">' + meta.join(' · ') + '</span>' +
        '</span>' +
      '</div>' +
      (hasChildren
        ? '<ul class="craft-branch">' + node.children.map(function (c) {
            return craftNodeHtml(c, false);
          }).join('') + '</ul>'
        : '') +
      '</li>';
  }

  function craftRawHtml(raw, charRaw) {
    var keys = Object.keys(raw);
    var chars = Object.keys(charRaw);
    var html = '';
    if (keys.length) {
      keys.sort(function (a, b) { return raw[a].name.localeCompare(raw[b].name, 'ru'); });
      html += '<div class="craft-raw__list">' + keys.map(function (id) {
        var x = raw[id];
        return '<span class="craft-raw__item">' +
          (x.icon ? '<img src="' + esc(craftAsset(x.icon)) + '" alt="" loading="lazy">'
            : '<span class="craft-raw__dot"></span>') +
          '<span>' + esc(x.name) + '</span><b>×' + x.qty + '</b></span>';
      }).join('') + '</div>';
    } else {
      html += '<p class="craft-raw__empty">Всё делается из промежуточных предметов.</p>';
    }
    if (chars.length) {
      chars.sort(function (a, b) { return charRaw[a].name.localeCompare(charRaw[b].name, 'ru'); });
      html += '<h4 class="craft-raw__sub">Ресурсы персонажа</h4><div class="craft-raw__list">' +
        chars.map(function (id) {
          var x = charRaw[id];
          return '<span class="craft-raw__item craft-raw__item--char">' +
            '<span class="craft-raw__dot"></span><span>' + esc(x.name) +
            '</span><b>×' + x.qty + '</b></span>';
        }).join('') + '</div>';
    }
    return html;
  }

  function craftAlternativesHtml(r) {
    var ids = (CRAFT_BY_PRODUCT[r.product] || []).filter(function (id) {
      return id !== r.id && CRAFT.recipes[id];
    });
    if (!ids.length) return '';
    return '<div class="craft-alts"><span class="craft-alts__label">Другие рецепты:</span>' +
      ids.map(function (id) {
        var a = CRAFT.recipes[id];
        var meta = [craftCatName(a.category), a.tech_text].filter(Boolean).join(' · ');
        return '<button class="craft-alt" type="button" data-craft="' + esc(id) + '">' +
          craftIconHtml(a, 'craft-alt__img') +
          '<span class="craft-alt__body"><b>' + esc(a.name) + '</b>' +
          '<span>' + esc(meta) + '</span></span></button>';
      }).join('') + '</div>';
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

  function craftTreeHtml(r) {
    var built = craftTreeData(r);
    return '<section class="craft-treepanel">' +
      '<div class="craft-treepanel__head"><h3>Древо крафта</h3>' +
        '<div class="craft-treepanel__controls">' +
          '<button class="btn btn--ghost" type="button" data-crafttoggle="all">Развернуть всё</button>' +
          '<button class="btn btn--ghost" type="button" data-crafttoggle="none">Свернуть всё</button>' +
        '</div></div>' +
      '<ul class="craft-tree">' + craftNodeHtml(built.root, true) + '</ul>' +
      '<p class="craft-tree__hint">Клик по названию промежуточного предмета открывает его рецепт.</p>' +
      '</section>' +
      '<aside class="craft-detail__side">' +
        '<section class="craft-raw"><h3>Сырьё</h3>' + craftRawHtml(built.raw, built.charRaw) + '</section>' +
        '<section class="craft-detail__used"><h3>Используется в</h3>' + craftUsedHtml(r) + '</section>' +
      '</aside>';
  }

  function craftEntryHtml(r) {
    var cats = (r.categories && r.categories.length ? r.categories : [r.category]).map(craftCatName).join(' · ');
    var meta = [cats, r.tech_text].filter(Boolean).join(' · ');
    var back = state.craftStack.length
      ? '<button class="btn btn--ghost craft-back" type="button" data-craftback="1">← Назад</button>'
      : '';
    return '<div class="craft-detail">' +
      '<div class="craft-detail__bar">' + back +
        '<span class="craft-detail__barhint">Древо крафта: количества пересчитаны на один предмет</span></div>' +
      '<div class="craft-detail__head">' +
        '<div class="craft-detail__icon">' + craftIconHtml(r, 'craft-detail__img') +
          (isCrafted(r.id) ? markStamp('Получено', 'stamp--entry') : '') + '</div>' +
        '<div class="craft-detail__title">' +
          '<h2 id="entry-name">' + esc(r.name) + '</h2>' +
          '<p class="entry__latin">' + esc(r.name_en || '') + '</p>' +
          '<p class="craft-detail__meta">' + esc(meta) + '</p>' +
          craftBuilderChip(r, 'craft-detail__builder', true) +
          '<button class="btn mark-btn' + (isCrafted(r.id) ? ' is-on' : '') +
            '" type="button" data-craftmark="1">' +
            (isCrafted(r.id) ? 'Получено ✓' : 'Отметить полученным') + '</button>' +
        '</div>' +
      '</div>' +
      craftAlternativesHtml(r) +
      '<div class="craft-detail__cols">' + craftTreeHtml(r) + '</div>' +
      quotesBlock((QUOTES && QUOTES.craft[r.product]) || [], 'Цитаты персонажей') +
      '</div>';
  }

  function openCraftEntry(id, fromLink) {
    var r = CRAFT.recipes[id];
    if (!r) return;
    if (fromLink) {
      if (state.craftId && state.craftId !== id) state.craftStack.push(state.craftId);
    } else {
      state.craftStack = [];
    }
    state.craftId = id;
    var wasHidden = els.entry.hidden;
    var prev = document.getElementById('entry-prev');
    var next = document.getElementById('entry-next');
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    els.entryBody.innerHTML = craftEntryHtml(r);
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
    if (wasHidden) trapEntryFocus();
    else focusCraftEntry();
    if (!window.QUOTES) {
      ensureQuotes(function () {
        if (els.entry.hidden || state.craftId !== id) return;
        var top = els.entryBody.parentNode.scrollTop;
        els.entryBody.innerHTML = craftEntryHtml(r);
        els.entryBody.parentNode.scrollTop = top;
      });
    }
  }

  function craftBack() {
    if (!state.craftStack.length) return;
    state.craftId = state.craftStack.pop();
    var r = CRAFT.recipes[state.craftId];
    if (!r) return;
    els.entryBody.innerHTML = craftEntryHtml(r);
    els.entryBody.parentNode.scrollTop = 0;
    focusCraftEntry();
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
    state.craftId = null;
    state.craftStack = [];
    state.cookRecipeId = null;
    renderEntry(b);
    var wasHidden = els.entry.hidden;
    els.entry.hidden = false;
    document.body.style.overflow = 'hidden';
    els.entryBody.parentNode.scrollTop = 0;
    if (wasHidden) trapEntryFocus();
  }

  function closeEntry() {
    els.entry.hidden = true;
    currentSlug = null;
    state.craftId = null;
    state.craftStack = [];
    state.cookRecipeId = null;
    document.body.style.overflow = '';
    restoreEntryFocus();
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

  function quoteItem(it) {
    if (!Array.isArray(it)) return it;
    var ch = CHAR_BY_KEY[it[0]] || {};
    return {
      key: it[0],
      name: ch.name || it[0],
      head: ch.head || '',
      text: it[1]
    };
  }

  function quotesBlock(src, title) {
    var q = (Array.isArray(src) ? src : ((src && src.quotes) || [])).map(quoteItem);
    if (q.length && !q.some(function (it) { return it.key === 'wes'; })) {
      q.push({ key: 'wes', name: 'Уэс', head: 'assets/chars/wes.png', text: '...' });
    }
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
    return '<div class="quotes"><h4>' + esc(title || 'Цитаты персонажей') + '</h4>' +
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
            (killed ? '<div class="stamp portrait__stamp"><span>Побеждён</span></div>' : '') +
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
    if (state.tab === 'craft' || state.tab === 'skills') {
      ensureQuotes(function () {
        if (state.tab === 'craft' || state.tab === 'skills') renderGrid();
      });
    }
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
    var qh = e.target.closest('.qhead');
    if (qh) {
      var block = qh.closest('.quotes');
      [].forEach.call(block.querySelectorAll('.qhead'), function (h) {
        h.classList.toggle('is-on', h === qh);
      });
      [].forEach.call(block.querySelectorAll('.quote'), function (c) {
        c.classList.toggle('is-on', c.dataset.quote === qh.dataset.q);
      });
      return;
    }
    var cookIng = e.target.closest('[data-cooking]');
    if (cookIng) { openCookIngredient(cookIng.dataset.cooking); return; }
    var cookRemove = e.target.closest('[data-cookremove]');
    if (cookRemove) {
      state.kitchenSlots.splice(parseInt(cookRemove.dataset.cookremove, 10), 1);
      renderKitchen();
      return;
    }
    var cookWarly = e.target.closest('[data-cookwarly]');
    if (cookWarly) {
      state.kitchenWarly = !state.kitchenWarly;
      renderKitchen();
      toast(state.kitchenWarly ? 'Портативный казан Варли включён' : 'Обычный казан');
      return;
    }
    var cookClear = e.target.closest('[data-cookclear]');
    if (cookClear) {
      state.kitchenSlots = [];
      renderKitchen();
      return;
    }
    var cookCat = e.target.closest('[data-cookcat]');
    if (cookCat) {
      state.kitchenCat = cookCat.dataset.cookcat;
      renderKitchen();
      return;
    }
    var cookRecipe = e.target.closest('[data-cookrecipe]');
    if (cookRecipe) { openCookRecipe(cookRecipe.dataset.cookrecipe); return; }
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
    var pathClose = e.target.closest('[data-pathclose]');
    if (pathClose) {
      var det = pathClose.closest('details');
      if (det) det.open = false;
      return;
    }
    var chainStep = e.target.closest('[data-chainstep]');
    if (chainStep) {
      var cid = chainStep.dataset.chainstep;
      var off = chainStep.dataset.off === '1';
      if (!state.chainDone) state.chainDone = {};
      if (off) delete state.chainDone[cid];
      else state.chainDone[cid] = true;
      save();
      renderAll();
      toast(off ? 'Отметка шага снята' : 'Шаг выполнен');
      return;
    }
    var skillCond = e.target.closest('[data-skillcond]');
    if (skillCond) {
      var ckey = skillCond.dataset.skillcond;
      if (ckey !== 'celestial' && ckey !== 'fuelweaver') return;
      state.skillConds[ckey] = !state.skillConds[ckey];
      save();
      renderAll();
      toast((state.skillConds[ckey] ? 'Условие включено: ' : 'Условие выключено: ') +
        (ckey === 'celestial' ? 'Небесный защитник' : 'Древний топливопряд'));
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

  els.grid.addEventListener('change', function (e) {
    var sel = e.target.closest('[data-craftsort]');
    if (!sel) return;
    state.craftSort = CRAFT_SORTS[sel.value] ? sel.value : 'name';
    state.craftPage = 1;
    save();
    renderGrid();
  });

  els.grid.addEventListener('input', function (e) {
    var id = e.target.id;
    if (id !== 'kitchen-search' && id !== 'kitchen-recipe-search') return;
    var value = e.target.value;
    var pos = e.target.selectionStart;
    if (id === 'kitchen-search') state.kitchenQuery = value;
    else state.kitchenRecipeQuery = value;
    renderKitchen();
    var el = document.getElementById(id);
    if (el) {
      el.focus();
      try { el.setSelectionRange(pos, pos); } catch (err) { /* ignore */ }
    }
  });

  els.entry.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) { closeEntry(); return; }
    var cookAdding = e.target.closest('[data-cookadding]');
    if (cookAdding) {
      var cid = cookAdding.dataset.cookadding;
      if ((state.kitchenSlots || []).length >= 4) {
        toast('В казане уже 4 ингредиента');
        return;
      }
      closeEntry();
      kitchenAdd(cid);
      var sim = document.querySelector('.kitchen__sim');
      if (sim && sim.scrollIntoView) {
        sim.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    var cookEaten = e.target.closest('[data-cookeaten]');
    if (cookEaten) {
      var eatenOn = toggleEaten(state.cookRecipeId);
      setEatenUI(eatenOn);
      toast(eatenOn ? 'Блюдо отмечено съеденным' : 'Отметка «съедено» снята');
      return;
    }
    var cookVar = e.target.closest('[data-cookvar]');
    if (cookVar) { kitchenUseVariation(parseInt(cookVar.dataset.cookvar, 10)); return; }
    var craftMark = e.target.closest('[data-craftmark]');
    if (craftMark) {
      var craftedOn = toggleCrafted(state.craftId);
      setCraftedUI(craftedOn);
      toast(craftedOn ? 'Предмет отмечен полученным' : 'Отметка «получено» снята');
      return;
    }
    var craftBackBtn = e.target.closest('[data-craftback]');
    if (craftBackBtn) { craftBack(); return; }
    var craftToggleAll = e.target.closest('[data-crafttoggle]');
    if (craftToggleAll) {
      var collapse = craftToggleAll.dataset.crafttoggle === 'none';
      [].forEach.call(els.entryBody.querySelectorAll('.craft-node'), function (node) {
        if (node.classList.contains('craft-node--root')) return;
        if (!node.querySelector('.craft-branch')) return;
        node.classList.toggle('is-collapsed', collapse);
        var btn = node.querySelector('[data-craftnode]');
        if (btn) {
          btn.setAttribute('aria-expanded', collapse ? 'false' : 'true');
          btn.setAttribute('aria-label', collapse ? 'Развернуть' : 'Свернуть');
        }
      });
      return;
    }
    var nodeToggle = e.target.closest('[data-craftnode]');
    if (nodeToggle) {
      var node = nodeToggle.closest('.craft-node');
      if (node) {
        var nowCollapsed = node.classList.toggle('is-collapsed');
        nodeToggle.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
        nodeToggle.setAttribute('aria-label', nowCollapsed ? 'Развернуть' : 'Свернуть');
      }
      return;
    }
    var craft = e.target.closest('[data-craft]');
    if (craft) { openCraftEntry(craft.dataset.craft, true); return; }
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
    if (e.key === 'Escape' && !els.entry.hidden) { closeEntry(); return; }
    if (els.entry.hidden) return;
    if (e.key === 'Tab') {
      var nodes = [].filter.call(
        els.entry.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
        function (el) { return !el.disabled && el.offsetParent !== null; }
      );
      if (!nodes.length) return;
      var first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
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
      conds: state.skillConds,
      chainDone: state.chainDone,
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
        if (data.conds && typeof data.conds === 'object') {
          state.skillConds = {
            celestial: data.conds.celestial === true,
            fuelweaver: data.conds.fuelweaver === true
          };
        }
        state.chainDone = sanitizeChainDone(data.chainDone);
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
    state.crafted = {};
    state.eaten = {};
    persist();
    renderAll();
    toast('Дневник сожжён. Всё начинается заново');
  });

  /* ---------- старт ---------- */

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* без кеша тоже работает */ });
    });
  }

  load();
  els.silhouettes.checked = state.silhouettes;
  [].forEach.call(els.filters.children, function (b) {
    b.classList.toggle('is-on', b.dataset.filter === state.filter);
  });
  renderAll();
  if (state.tab === 'craft' || state.tab === 'skills') {
    ensureQuotes(function () {
      if (state.tab === 'craft' || state.tab === 'skills') renderGrid();
    });
  }
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
