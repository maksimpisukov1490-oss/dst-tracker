/* Подбирает варианты состава (4 ингредиента) для рецептов казана.
   Запуск: node tools/find_cook_examples.js
   Результат: tools/cook_examples.json
   Формат: { recipe_id: [ [[ingredient, qty], ...], ... ] } */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ctx = { window: {} };
new Function('window', fs.readFileSync(path.join(root, 'js/cooking.js'), 'utf8'))(ctx.window);
const data = ctx.window.COOK_DATA;
const ingredients = data.ingredients;
const MAX_VARIATIONS = 6;
const MAX_COLLECT = 400;

const RARE = {
  nightmarefuel: 20, refined_dust: 14, mandrake: 10, royal_jelly: 5,
  tallbirdegg: 4, batnose: 8, wobster_sheller_land: 3, mole: 3,
  durian: 1, cactus_flower: 1, rock_avocado_fruit_ripe: 2,
  trunk_summer: 3, forgetmelots: 3, plantmeat: 1, fig: 1, barnacle: 1
};
const COMMON = new Set([
  'meat','monstermeat','smallmeat','froglegs','drumstick','fish','eel','pondeel',
  'fishmeat_small','fishmeat','berries','berries_juicy','carrot','corn','pumpkin',
  'eggplant','potato','tomato','onion','garlic','red_cap','green_cap','blue_cap',
  'moon_cap','honey','egg','twigs','ice','butter','goatmilk','kelp','dragonfruit',
  'pomegranate','cave_banana','watermelon','acorn','butterflywings'
]);

function ingredientScore(id) {
  if (id.indexOf('oceanfish') === 0) return 3;
  if (/_cooked$|_dried$/.test(id)) return 1;
  if (RARE[id]) return RARE[id];
  if (COMMON.has(id)) return 0;
  return 1;
}

function variationScore(pairs) {
  let score = 0;
  for (const pair of pairs) score += ingredientScore(pair[0]) * pair[1];
  return score;
}

const extra = [
  'meat', 'monstermeat', 'smallmeat', 'froglegs', 'drumstick', 'fish', 'eel',
  'pondeel', 'fishmeat_small', 'fishmeat', 'berries', 'berries_juicy', 'carrot',
  'corn', 'pumpkin', 'eggplant', 'potato', 'tomato', 'onion', 'garlic',
  'red_cap', 'green_cap', 'blue_cap', 'moon_cap', 'honey', 'egg', 'tallbirdegg',
  'twigs', 'ice', 'butter', 'goatmilk', 'kelp', 'mandrake', 'dragonfruit',
  'pomegranate', 'cave_banana', 'watermelon', 'cactus_flower', 'acorn',
  'butterflywings', 'barnacle', 'plantmeat', 'fig', 'rock_avocado_fruit_ripe',
  'cactus_meat', 'wobster_sheller_land', 'royal_jelly', 'forgetmelots',
  'trunk_summer', 'batnose', 'refined_dust', 'mole', 'durian', 'asparagus',
  'pepper', 'cutlichen', 'nightmarefuel', 'oceanfish_small_5_inv',
  'oceanfish_medium_5_inv', 'bird_egg', 'red_cap_cooked', 'potato_cooked',
  'corn_cooked', 'carrot_cooked', 'meat_cooked', 'monstermeat_cooked',
  'smallmeat_cooked', 'kelp_cooked', 'fig_cooked', 'plantmeat_cooked',
  'barnacle_cooked', 'tomato_cooked', 'onion_cooked', 'egg_cooked'
];

const candidates = new Set(extra);
for (const r of data.recipes) {
  if (r.example) r.example.forEach(([id]) => candidates.add(id));
  const src = r.test.toString();
  const re = /names\.([a-z0-9_]+)/g;
  let m;
  while ((m = re.exec(src))) candidates.add(m[1]);
}
const ids = [...candidates].filter((id) => ingredients[id]);
const variations = {};
const anyTop = {};
const total = ids.length;
let checked = 0;

function packs(picked) {
  const counts = {};
  picked.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
  return Object.keys(counts).map((id) => [id, counts[id]]);
}

function add(recipe, picked) {
  if (!variations[recipe.id]) variations[recipe.id] = [];
  if (variations[recipe.id].length >= MAX_COLLECT) return;
  const key = picked.slice().sort().join('|');
  if (variations[recipe.id].some((v) => v.key === key)) return;
  variations[recipe.id].push({ key: key, pairs: packs(picked) });
}

console.error('candidates', total);
for (let a = 0; a < total; a++) {
  const ia = ids[a];
  for (let b = a; b < total; b++) {
    const ib = ids[b];
    for (let c = b; c < total; c++) {
      const ic = ids[c];
      for (let d = c; d < total; d++) {
        const id = ids[d];
        const picked = [ia, ib, ic, id];
        const names = {};
        const tags = {};
        for (const x of picked) {
          names[x] = (names[x] || 0) + 1;
          const t = ingredients[x].tags;
          for (const k in t) tags[k] = (tags[k] || 0) + t[k];
        }
        const cand = [];
        for (const r of data.recipes) {
          let ok = false;
          try { ok = r.test(names, tags); } catch (e) { ok = false; }
          if (ok) cand.push(r);
        }
        if (!cand.length) continue;
        let max = -Infinity;
        cand.forEach((r) => { if ((r.priority || 0) > max) max = r.priority || 0; });
        const top = cand.filter((r) => (r.priority || 0) === max);
        if (top.length === 1) {
          add(top[0], picked);
        } else if (!anyTop[top[0].id]) {
          top.forEach((r) => { if (!anyTop[r.id]) anyTop[r.id] = picked.slice(); });
        }
        checked++;
      }
    }
  }
  if (a % 10 === 0) console.error('a', a, 'recipes with variations', Object.keys(variations).length);
}

const out = {};
let min = Infinity, max = 0, missing = [];
for (const r of data.recipes) {
  if (variations[r.id] && variations[r.id].length) {
    const list = variations[r.id].slice().sort((a, b) => variationScore(a.pairs) - variationScore(b.pairs));
    out[r.id] = list.slice(0, MAX_VARIATIONS).map((v) => v.pairs);
    min = Math.min(min, out[r.id].length);
    max = Math.max(max, out[r.id].length);
  } else if (anyTop[r.id]) {
    out[r.id] = [packs(anyTop[r.id])];
    min = Math.min(min, 1);
    max = Math.max(max, 1);
  } else {
    missing.push(r.id);
  }
}

fs.writeFileSync(path.join(root, 'tools/cook_examples.json'), JSON.stringify(out, null, 1));
console.error('checked', checked, 'recipes', Object.keys(out).length, '/', data.recipes.length,
  'variations min/max', min, max);
if (missing.length) console.error('missing:', missing.join(', '));
