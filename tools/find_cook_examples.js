/* Подбирает полные примеры состава (4 ингредиента) для рецептов казана.
   Запуск: node tools/find_cook_examples.js
   Результат: tools/cook_examples.json */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const ctx = { window: {} };
new Function('window', fs.readFileSync(path.join(root, 'js/cooking.js'), 'utf8'))(ctx.window);
const data = ctx.window.COOK_DATA;
const ingredients = data.ingredients;

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
const examples = {};
const unique = {};
const anyTop = {};
const total = ids.length;
console.error('candidates', total);
let checked = 0;

function addExample(recipe, picked, uniqueTop) {
  if (examples[recipe.id]) return;
  examples[recipe.id] = {};
  picked.forEach((id) => { examples[recipe.id][id] = (examples[recipe.id][id] || 0) + 1; });
  examples[recipe.id] = Object.keys(examples[recipe.id]).map((id) => [id, examples[recipe.id][id]]);
  if (uniqueTop) unique[recipe.id] = true;
}

for (let a = 0; a < total; a++) {
  const ia = ids[a], ta = ingredients[ia].tags;
  const na = { [ia]: 1 };
  for (let b = a; b < total; b++) {
    const ib = ids[b], tb = ingredients[ib].tags;
    const names2 = Object.assign({}, na);
    names2[ib] = (names2[ib] || 0) + 1;
    for (let c = b; c < total; c++) {
      const ic = ids[c], tc = ingredients[ic].tags;
      const names3 = Object.assign({}, names2);
      names3[ic] = (names3[ic] || 0) + 1;
      for (let d = c; d < total; d++) {
        const id = ids[d];
        const names = Object.assign({}, names3);
        names[id] = (names[id] || 0) + 1;
        const tags = {};
        [ia, ib, ic, id].forEach((x) => {
          const t = ingredients[x].tags;
          for (const k in t) tags[k] = (tags[k] || 0) + t[k];
        });
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
        const uniqueTop = top.length === 1;
        top.forEach((r) => {
          if (!examples[r.id]) {
            if (uniqueTop) addExample(r, [ia, ib, ic, id], true);
            else if (!anyTop[r.id]) anyTop[r.id] = [ia, ib, ic, id];
          }
        });
        checked++;
      }
    }
  }
  if (a % 10 === 0) console.error('a', a, 'examples', Object.keys(examples).length);
}

// добить неоднозначными
for (const r of data.recipes) {
  if (!examples[r.id] && anyTop[r.id]) {
    examples[r.id] = {};
    anyTop[r.id].forEach((id) => { examples[r.id][id] = (examples[r.id][id] || 0) + 1; });
    examples[r.id] = Object.keys(examples[r.id]).map((id) => [id, examples[r.id][id]]);
  }
}

fs.writeFileSync(path.join(root, 'tools/cook_examples.json'), JSON.stringify(examples, null, 1));
const covered = data.recipes.filter((r) => examples[r.id]).length;
console.error('checked', checked, 'examples', covered, '/', data.recipes.length);
const missing = data.recipes.filter((r) => !examples[r.id]).map((r) => r.id);
if (missing.length) console.error('missing:', missing.join(', '));
