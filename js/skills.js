/* Сгенерировано tools/scrape_skills.py — не править вручную */
window.SKILL_TREES = {
  "wilson": {
    "gameChar": "wilson",
    "name": "Уилсон",
    "head": "assets/chars/wilson.png",
    "groups": {
      "alchemy": "Алхимия",
      "allegiance": "Преданность",
      "beard": "Борода",
      "torch": "Факел"
    },
    "bounds": {
      "minX": -208,
      "maxX": 226,
      "minY": 20,
      "maxY": 176
    },
    "skills": [
      {
        "id": "wilson_alchemy_1",
        "title": "Преобразование",
        "desc": "Добавляет рецепт преобразования трёх веток в бревно. Добавляет рецепт преобразования бревна в две ветки.",
        "cond": "-",
        "icon": "assets/skills/wilson/wilson_alchemy_1.png",
        "x": -58,
        "y": 176,
        "group": "alchemy",
        "root": true,
        "lock": false,
        "connects": [
          "wilson_alchemy_2",
          "wilson_alchemy_3",
          "wilson_alchemy_4"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_10",
        "title": "Преобразование гадости III",
        "desc": "Добавляет рецепт преобразования шести единиц гнили в навоз. Добавляет рецепт преобразования двух клыков гончей в кусочки костей. Добавляет рецепт преобразования двух кусочков костей в клык гончей.",
        "cond": "Изучить навык \"Преобразование гадости II\"",
        "icon": "assets/skills/wilson/wilson_alchemy_10.png",
        "x": -20,
        "y": 46,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_alchemy_2",
        "title": "Преобразование самоцветов I",
        "desc": "Добавляет рецепт преобразования двух красных самоцветов в синий самоцвет. Добавляет рецепт преобразования двух синих самоцветов в красный самоцвет. Добавляет рецепт преобразования красного и синего самоцветов в фиолетовый самоцвет.",
        "cond": "Изучить навык \"Преобразование\"",
        "icon": "assets/skills/wilson/wilson_alchemy_2.png",
        "x": -58,
        "y": 122,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_5"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_3",
        "title": "Преобразование руды I",
        "desc": "Добавляет рецепт преобразования трёх камней в кремень. Добавляет рецепт преобразования двух кремней в камень.",
        "cond": "Изучить навык \"Преобразование\"",
        "icon": "assets/skills/wilson/wilson_alchemy_3.png",
        "x": -96,
        "y": 122,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_7"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_4",
        "title": "Преобразование гадости I",
        "desc": "Добавляет рецепт преобразования трёх кусочков мяса в мясо. Добавляет рецепт преобразования мяса в два кусочка мяса.",
        "cond": "Изучить навык \"Преобразование\"",
        "icon": "assets/skills/wilson/wilson_alchemy_4.png",
        "x": -20,
        "y": 122,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_9"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_5",
        "title": "Преобразование самоцветов II",
        "desc": "Добавляет рецепт преобразования трёх фиолетовых самоцветов в оранжевый самоцвет. Добавляет рецепт преобразования трёх оранжевых самоцветов в жёлтый самоцвет.",
        "cond": "Изучить навык \"Преобразование самоцветов I\"",
        "icon": "assets/skills/wilson/wilson_alchemy_5.png",
        "x": -58,
        "y": 84,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_6"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_6",
        "title": "Преобразование самоцветов III",
        "desc": "Добавляет рецепт преобразования трёх жёлтых самоцветов в зелёный самоцвет. Добавляет рецепт преобразования шести разных самоцветов в переливчатый самоцвет.",
        "cond": "Изучить навык \"Преобразование самоцветов II\"",
        "icon": "assets/skills/wilson/wilson_alchemy_6.png",
        "x": -58,
        "y": 46,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_alchemy_7",
        "title": "Преобразование руды II",
        "desc": "Добавляет рецепт преобразования трёх единиц селитры в золотой самородок. Добавляет рецепт преобразования двух золотых самородков в селитру.",
        "cond": "Изучить навык \"Преобразование руды I\"",
        "icon": "assets/skills/wilson/wilson_alchemy_7.png",
        "x": -96,
        "y": 84,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_8"
        ],
        "locks": []
      },
      {
        "id": "wilson_alchemy_8",
        "title": "Преобразование руды III",
        "desc": "Добавляет рецепт преобразования двух каменных блоков в мрамор. Добавляет рецепт преобразования мрамора в каменный блок. Добавляет рецепт преобразования двух единиц мрамора в лунный камень.",
        "cond": "Изучить навык \"Преобразование руды II\"",
        "icon": "assets/skills/wilson/wilson_alchemy_8.png",
        "x": -96,
        "y": 46,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_alchemy_9",
        "title": "Преобразование гадости II",
        "desc": "Добавляет рецепт преобразования клочка бороды в два клочка шерсти бифало. Добавляет рецепт преобразования двух клочков шерсти бифало в клочок бороды.",
        "cond": "Изучить навык \"Преобразование гадости I\"",
        "icon": "assets/skills/wilson/wilson_alchemy_9.png",
        "x": -20,
        "y": 84,
        "group": "alchemy",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_alchemy_10"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 204,
        "y": 176,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_allegiance_shadow"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 182,
        "y": 128,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_allegiance_shadow"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lock_3",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 226,
        "y": 128,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_allegiance_lunar"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lock_4",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 182,
        "y": 84,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_allegiance_shadow"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lock_5",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 226,
        "y": 84,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_allegiance_lunar"
        ],
        "locks": []
      },
      {
        "id": "wilson_allegiance_lunar",
        "title": "Лунный новатор",
        "desc": "Лунная преданность. [ 3 ] Добавляет рецепт преобразования трёх переливающихся лунных осколков в чистое сияние. Добавляет рецепт преобразования чистого сияния в два переливающихся лунных осколка.",
        "cond": "Победить небесного защитника Изучить как минимум 12 навыков Не открывать теневой навык",
        "icon": "assets/skills/wilson/wilson_allegiance_lunar.png",
        "x": 226,
        "y": 38,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wilson_allegiance_lock_1",
          "wilson_allegiance_lock_3",
          "wilson_allegiance_lock_5"
        ]
      },
      {
        "id": "wilson_allegiance_shadow",
        "title": "Теневой придворный",
        "desc": "Теневая преданность. [ 2 ] Добавляет рецепт преобразования одного камня ужаса в две единицы чистого ужаса. Добавляет рецепт преобразования трёх единиц чистого ужаса в один камень ужаса. Добавляет рецепт преобразования одного чистого ужаса в две единицы топлива ужаса.",
        "cond": "Победить древнего топливопряда Изучить как минимум 12 навыков Не открывать лунный навык",
        "icon": "assets/skills/wilson/wilson_allegiance_shadow.png",
        "x": 182,
        "y": 38,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wilson_allegiance_lock_1",
          "wilson_allegiance_lock_2",
          "wilson_allegiance_lock_4"
        ]
      },
      {
        "id": "wilson_beard_1",
        "title": "Теплоизоляция бороды I",
        "desc": "Увеличивает теплоизоляцию на 20% (теплоизоляция равняется 18/54/162 единицам соответственно, изначально 15/45/135).",
        "cond": "-",
        "icon": "assets/skills/wilson/wilson_beard_1.png",
        "x": 66,
        "y": 176,
        "group": "beard",
        "root": true,
        "lock": false,
        "connects": [
          "wilson_beard_2"
        ],
        "locks": []
      },
      {
        "id": "wilson_beard_2",
        "title": "Теплоизоляция бороды II",
        "desc": "Увеличивает теплоизоляцию на 40% (теплоизоляция равняется 21/63/189 единицам соответственно).",
        "cond": "Изучить навык \"Теплоизоляция бороды I\"",
        "icon": "assets/skills/wilson/wilson_beard_2.png",
        "x": 66,
        "y": 138,
        "group": "beard",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_beard_3"
        ],
        "locks": []
      },
      {
        "id": "wilson_beard_3",
        "title": "Теплоизоляция бороды III",
        "desc": "Увеличивает теплоизоляцию на 70% (теплоизоляция равняется 24/72/216 единицам соответственно).",
        "cond": "Изучить навык \"Теплоизоляция бороды II\"",
        "icon": "assets/skills/wilson/wilson_beard_3.png",
        "x": 66,
        "y": 100,
        "group": "beard",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_beard_4",
        "title": "Рост бороды I",
        "desc": "Ускоряет рост бороды до 3/7/15 дней.",
        "cond": "-",
        "icon": "assets/skills/wilson/wilson_beard_4.png",
        "x": 104,
        "y": 176,
        "group": "beard",
        "root": true,
        "lock": false,
        "connects": [
          "wilson_beard_5"
        ],
        "locks": []
      },
      {
        "id": "wilson_beard_5",
        "title": "Рост бороды II",
        "desc": "Ускоряет рост бороды до 3/6/12 дней.",
        "cond": "Изучить навык \"Рост бороды I\"",
        "icon": "assets/skills/wilson/wilson_beard_5.png",
        "x": 104,
        "y": 138,
        "group": "beard",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_beard_6"
        ],
        "locks": []
      },
      {
        "id": "wilson_beard_6",
        "title": "Рост бороды III",
        "desc": "Ускоряет рост бороды до 2/5/10 дней.",
        "cond": "Изучить навык \"Рост бороды II\"",
        "icon": "assets/skills/wilson/wilson_beard_6.png",
        "x": 104,
        "y": 100,
        "group": "beard",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_beard_7",
        "title": "Хранилище в бороде",
        "desc": "Позволяет хранить еду в бороде, количество ячеек зависит от стадии роста: 1/2/3. Существа, которые атакуют персонажа при наличии определённой еды в инвентаре не атакуют, если еда находится в бороде. [ 1 ]",
        "cond": "Изучить как минимум три навыка раздела \"Борода\"",
        "icon": "assets/skills/wilson/wilson_beard_7.png",
        "x": 82,
        "y": 20,
        "group": "beard",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_beard_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 82,
        "y": 58,
        "group": "beard",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_beard_7"
        ],
        "locks": []
      },
      {
        "id": "wilson_torch_1",
        "title": "Долговечность факела I",
        "desc": "Срок горения факела увеличивается на 19% (факел горит 90 секунд вместо 75).",
        "cond": "-",
        "icon": "assets/skills/wilson/wilson_torch_1.png",
        "x": -208,
        "y": 176,
        "group": "torch",
        "root": true,
        "lock": false,
        "connects": [
          "wilson_torch_2"
        ],
        "locks": []
      },
      {
        "id": "wilson_torch_2",
        "title": "Долговечность факела II",
        "desc": "Срок горения факела увеличивается на 47% (факел горит 110 секунд).",
        "cond": "Изучить навык \"Долговечность факела I\"",
        "icon": "assets/skills/wilson/wilson_torch_2.png",
        "x": -208,
        "y": 138,
        "group": "torch",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_torch_3"
        ],
        "locks": []
      },
      {
        "id": "wilson_torch_3",
        "title": "Долговечность факела III",
        "desc": "Срок горения факела увеличивается на 100% (факел горит 150 секунд).",
        "cond": "Изучить навык \"Долговечность факела II\"",
        "icon": "assets/skills/wilson/wilson_torch_3.png",
        "x": -208,
        "y": 100,
        "group": "torch",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_torch_4",
        "title": "Радиус факела I",
        "desc": "Радиус освещения факела увеличивается до 6 юнитов или 1,5 клеток дёрна.",
        "cond": "-",
        "icon": "assets/skills/wilson/wilson_torch_4.png",
        "x": -170,
        "y": 176,
        "group": "torch",
        "root": true,
        "lock": false,
        "connects": [
          "wilson_torch_5"
        ],
        "locks": []
      },
      {
        "id": "wilson_torch_5",
        "title": "Радиус факела II",
        "desc": "Радиус освещения факела увеличивается до 8 юнитов или 2 клеток дёрна.",
        "cond": "Изучить навык \"Радиус факела I\"",
        "icon": "assets/skills/wilson/wilson_torch_5.png",
        "x": -170,
        "y": 138,
        "group": "torch",
        "root": false,
        "lock": false,
        "connects": [
          "wilson_torch_6"
        ],
        "locks": []
      },
      {
        "id": "wilson_torch_6",
        "title": "Радиус факела III",
        "desc": "Радиус освещения факела увеличивается до 10 юнитов или 2,5 клеток дёрна.",
        "cond": "Изучить навык \"Радиус факела II\"",
        "icon": "assets/skills/wilson/wilson_torch_6.png",
        "x": -170,
        "y": 100,
        "group": "torch",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_torch_7",
        "title": "Бросок факела",
        "desc": "Позволяет бросать факел на 8 юнитов или 2 клетки дёрна от Уилсона, при этом усиления от навыков сохраняются.",
        "cond": "Изучить как минимум три навыка раздела \"Факел\"",
        "icon": "assets/skills/wilson/wilson_torch_7.png",
        "x": -190,
        "y": 20,
        "group": "torch",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wilson_torch_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -190,
        "y": 58,
        "group": "torch",
        "root": true,
        "lock": true,
        "connects": [
          "wilson_torch_7"
        ],
        "locks": []
      }
    ]
  },
  "willow": {
    "gameChar": "willow",
    "name": "Уиллоу",
    "head": "assets/chars/willow.png",
    "groups": {
      "allegiance": "Преданность",
      "lighter": "Зажигалка",
      "bernie": "Берни"
    },
    "bounds": {
      "minX": -216,
      "maxX": 214,
      "minY": 8,
      "maxY": 176
    },
    "skills": [
      {
        "id": "willow_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 180,
        "y": 174,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_shadow_fire",
          "willow_allegiance_shadow_bernie"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 146,
        "y": 144,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_shadow_bernie"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lock_3",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 214,
        "y": 144,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_shadow_fire"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lock_4",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 180,
        "y": 73,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_lunar_fire",
          "willow_allegiance_lunar_bernie"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lock_5",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 214,
        "y": 43,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_lunar_fire"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lock_6",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 146,
        "y": 43,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "willow_allegiance_lunar_bernie"
        ],
        "locks": []
      },
      {
        "id": "willow_allegiance_lunar_bernie",
        "title": "Лунный Берни",
        "desc": "Лунная преданность. [ 2 ] БЕРНИ! получает на 10% меньше урона от лунных существ и наносит на 10% больше урона теневым существам, получает естественную защиту и 15 единиц защиты от сквозного урона.",
        "cond": "Победить небесного защитника Изучить как минимум шесть навыков раздела \"Берни\" Не изучать теневой навык",
        "icon": "assets/skills/willow/willow_allegiance_lunar_bernie.png",
        "x": 146,
        "y": 8,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "willow_allegiance_lock_4",
          "willow_allegiance_lock_6"
        ]
      },
      {
        "id": "willow_allegiance_lunar_fire",
        "title": "Лунная поджигательница",
        "desc": "Лунная преданность. [ 2 ] Открывается способность \"Лунное пламя\", во время которой Уиллоу испускает из руки 15 потоков лунного пламени, каждый из которых бьёт по площади и наносит 20 обычного и 30 сквозного урона.",
        "cond": "Победить небесного защитника Изучить как минимум семь навыков раздела \"Зажигалка\" Не изучать теневой навык",
        "icon": "assets/skills/willow/willow_allegiance_lunar_fire.png",
        "x": 214,
        "y": 8,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "willow_allegiance_lock_4",
          "willow_allegiance_lock_5"
        ]
      },
      {
        "id": "willow_allegiance_shadow_bernie",
        "title": "Теневой Берни",
        "desc": "Теневая преданность. [ 1 ] БЕРНИ! получает на 10% меньше урона от теневых существ и наносит на 10% больше урона лунным существам, получает естественную защиту и 15 единиц защиты от сквозного урона.",
        "cond": "Победить древнего топливопряда Изучить как минимум шесть навыков раздела \"Берни\" Не изучать лунный навык",
        "icon": "assets/skills/willow/willow_allegiance_shadow_bernie.png",
        "x": 146,
        "y": 109,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "willow_allegiance_lock_1",
          "willow_allegiance_lock_2"
        ]
      },
      {
        "id": "willow_allegiance_shadow_fire",
        "title": "Теневая поджигательница",
        "desc": "Теневая преданность. [ 1 ] Открывается способность \"Теневое пламя\", выпускающая пять волн теневого пламени вокруг Уиллоу, каждая из которых наводится на врагов и наносит 60 обычного и 90 сквозного урона.",
        "cond": "Победить древнего топливопряда Изучить как минимум семь навыков раздела \"Зажигалка\" Не изучать лунный навык",
        "icon": "assets/skills/willow/willow_allegiance_shadow_fire.png",
        "x": 214,
        "y": 109,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "willow_allegiance_lock_1",
          "willow_allegiance_lock_3"
        ]
      },
      {
        "id": "willow_attuned_lighter",
        "title": "Голодная зажигалка",
        "desc": "У зажигалки появляется способность поглотить огонь. Это распространяется на горящие и тлеющие объекты, а также разожжённые костры.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_attuned_lighter.png",
        "x": -145,
        "y": 91,
        "group": "lighter",
        "root": true,
        "lock": false,
        "connects": [
          "willow_embers"
        ],
        "locks": []
      },
      {
        "id": "willow_bernie_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -40,
        "y": 84,
        "group": "bernie",
        "root": true,
        "lock": true,
        "connects": [
          "willow_berniehealth_1"
        ],
        "locks": []
      },
      {
        "id": "willow_bernie_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 48,
        "y": 84,
        "group": "bernie",
        "root": true,
        "lock": true,
        "connects": [
          "willow_burnignbernie"
        ],
        "locks": []
      },
      {
        "id": "willow_bernieai",
        "title": "Вспыльчивый",
        "desc": "Если поблизости находятся враждебные лунные или теневые существа, Берни превращается в БЕРНИ! вне зависимости от рассудка Уиллоу, атакует и провоцирует их.",
        "cond": "Изучить навык \"В шаге от безумия II\"",
        "icon": "assets/skills/willow/willow_bernieai.png",
        "x": 6,
        "y": 88,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_berniehealth_1",
        "title": "Плотная набивка I",
        "desc": "Максимальное здоровье БЕРНИ! увеличивается до 2300 единиц.",
        "cond": "Изучить как минимум четыре навыка раздела \"Берни\"",
        "icon": "assets/skills/willow/willow_berniehealth_1.png",
        "x": -40,
        "y": 49,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [
          "willow_berniehealth_2"
        ],
        "locks": []
      },
      {
        "id": "willow_berniehealth_2",
        "title": "Плотная набивка II",
        "desc": "Максимальное здоровье БЕРНИ! увеличивается до 2600 единиц.",
        "cond": "Изучить навык \"Плотная набивка I\"",
        "icon": "assets/skills/willow/willow_berniehealth_2.png",
        "x": -40,
        "y": 14,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_bernieregen_1",
        "title": "Зашивание I",
        "desc": "БЕРНИ! восстанавливает здоровье со скоростью 1 единица в секунду.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_bernieregen_1.png",
        "x": -38,
        "y": 166,
        "group": "bernie",
        "root": true,
        "lock": false,
        "connects": [
          "willow_bernieregen_2"
        ],
        "locks": []
      },
      {
        "id": "willow_bernieregen_2",
        "title": "Зашивание II",
        "desc": "БЕРНИ! восстанавливает здоровье со скоростью 2 единицы в секунду.",
        "cond": "Изучить навык \"Зашивание I\"",
        "icon": "assets/skills/willow/willow_bernieregen_2.png",
        "x": -38,
        "y": 127,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_berniesanity_1",
        "title": "В шаге от безумия I",
        "desc": "Берни становится БЕРНИ!, если у Уиллоу 37 и менее единиц рассудка.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_berniesanity_1.png",
        "x": 6,
        "y": 166,
        "group": "bernie",
        "root": true,
        "lock": false,
        "connects": [
          "willow_berniesanity_2"
        ],
        "locks": []
      },
      {
        "id": "willow_berniesanity_2",
        "title": "В шаге от безумия II",
        "desc": "Берни становится БЕРНИ!, если у Уиллоу 60 и менее единиц рассудка.",
        "cond": "Изучить навык \"В шаге от безумия I\"",
        "icon": "assets/skills/willow/willow_berniesanity_2.png",
        "x": 6,
        "y": 127,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [
          "willow_bernieai"
        ],
        "locks": []
      },
      {
        "id": "willow_berniespeed_1",
        "title": "Ускорение I",
        "desc": "БЕРНИ! передвигается на 15% быстрее.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_berniespeed_1.png",
        "x": 50,
        "y": 166,
        "group": "bernie",
        "root": true,
        "lock": false,
        "connects": [
          "willow_berniespeed_2"
        ],
        "locks": []
      },
      {
        "id": "willow_berniespeed_2",
        "title": "Ускорение II",
        "desc": "БЕРНИ! передвигается на 30% быстрее.",
        "cond": "Изучить навык \"Ускорение I\"",
        "icon": "assets/skills/willow/willow_berniespeed_2.png",
        "x": 50,
        "y": 127,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_burnignbernie",
        "title": "Берни с огоньком",
        "desc": "Поджигание БЕРНИ! на 20 секунд придаст ему огненную ауру. Враги, атакующие подожжённого Берни, будут получать 50 единиц урона.",
        "cond": "Изучить как минимум восемь навыков раздела \"Берни\"",
        "icon": "assets/skills/willow/willow_burnignbernie.png",
        "x": 48,
        "y": 49,
        "group": "bernie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_controlled_burn_1",
        "title": "Контролируемое горение",
        "desc": "Пожары, которые устраивает Уиллоу, не будут распространяться, а горючие предметы, выпадающие при смерти горящих врагов, будут только тлеть (мясо всё так же будет обжаренным). Такие предметы, как факелы и зажигалка Уиллоу, имеют 100% шанс поджечь цель при атаке. Уиллоу может заставить огонь стать вновь неконтролируемым, чтобы он распространялся.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_controlled_burn_1.png",
        "x": -207,
        "y": 176,
        "group": "lighter",
        "root": true,
        "lock": false,
        "connects": [
          "willow_controlled_burn_2"
        ],
        "locks": []
      },
      {
        "id": "willow_controlled_burn_2",
        "title": "Продолжительность горения",
        "desc": "Существа горят в три раза дольше.",
        "cond": "Изучить навык \"Контролируемое горение\"",
        "icon": "assets/skills/willow/willow_controlled_burn_2.png",
        "x": -207,
        "y": 137,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [
          "willow_controlled_burn_3"
        ],
        "locks": []
      },
      {
        "id": "willow_controlled_burn_3",
        "title": "Огнём и мечом",
        "desc": "Существа получают на 50% больше урона от огня (0,8 → 1,7).",
        "cond": "Изучить навык \"Продолжительность горения\"",
        "icon": "assets/skills/willow/willow_controlled_burn_3.png",
        "x": -207,
        "y": 98,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_embers",
        "title": "Тлеющая зола",
        "desc": "Со сгоревших существ выпадает тлеющая зола, которую можно поглотить зажигалкой. Открывается способность \"Воспламенение\", поджигающая объекты в выбранной точке.",
        "cond": "Изучить навык \"Голодная зажигалка\"",
        "icon": "assets/skills/willow/willow_embers.png",
        "x": -145,
        "y": 52,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [
          "willow_fire_burst",
          "willow_fire_ball",
          "willow_fire_frenzy"
        ],
        "locks": []
      },
      {
        "id": "willow_fire_ball",
        "title": "Огненный шар",
        "desc": "Открывается способность \"Огненный шар\", позволяющая колдовать огненный шар, аналог карликовой звезды.",
        "cond": "Изучить навык \"Тлеющая зола\"",
        "icon": "assets/skills/willow/willow_fire_ball.png",
        "x": -172,
        "y": 9,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_fire_burst",
        "title": "Случайное возгорание",
        "desc": "Открывается способность \"Случайное возгорание\", поджигающая существ, не являющихся дружественными, вокруг Уиллоу в радиусе 10 юнитов.",
        "cond": "Изучить навык \"Тлеющая зола\"",
        "icon": "assets/skills/willow/willow_fire_burst.png",
        "x": -216,
        "y": 9,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_fire_frenzy",
        "title": "Пламенное безумие",
        "desc": "Открывается способность \"Пламенное безумие\", на 60 секунд увеличивающая урон по горящим целям на 25%.",
        "cond": "Изучить навык \"Тлеющая зола\"",
        "icon": "assets/skills/willow/willow_fire_frenzy.png",
        "x": -128,
        "y": 9,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "willow_lightradius_1",
        "title": "Яркость зажигалки I",
        "desc": "Радиус освещения зажигалки увеличивается до 2,5 юнитов.",
        "cond": "-",
        "icon": "assets/skills/willow/willow_lightradius_1.png",
        "x": -138,
        "y": 176,
        "group": "lighter",
        "root": true,
        "lock": false,
        "connects": [
          "willow_lightradius_2"
        ],
        "locks": []
      },
      {
        "id": "willow_lightradius_2",
        "title": "Яркость зажигалки II",
        "desc": "Радиус освещения зажигалки увеличивается до 4 юнитов.",
        "cond": "Изучить навык \"Яркость зажигалки I\"",
        "icon": "assets/skills/willow/willow_lightradius_2.png",
        "x": -138,
        "y": 137,
        "group": "lighter",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wolfgang": {
    "gameChar": "wolfgang",
    "name": "Вольфганг",
    "head": "assets/chars/wolfgang.png",
    "groups": {
      "allegiance": "Преданность",
      "training": "Тренировки",
      "might": "Работа",
      "planardamage": "Могучесть"
    },
    "bounds": {
      "minX": -212,
      "maxX": 219,
      "minY": 18,
      "maxY": 170
    },
    "skills": [
      {
        "id": "wolfgang_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 181,
        "y": 170,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wolfgang_allegiance_shadow_1"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 219,
        "y": 170,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wolfgang_allegiance_lunar_1"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_lock_3",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 181,
        "y": 132,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wolfgang_allegiance_shadow_1"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_lock_4",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 219,
        "y": 132,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [
          "wolfgang_allegiance_lunar_1"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_lunar_1",
        "title": "Лунный стратег I",
        "desc": "Лунная преданность. [ 6 ] Наносите на 10% больше урона теневым существам в могучей форме.",
        "cond": "Победить небесного защитника Открыть как минимум 12 навыков Не изучать теневой навык",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_lunar_1.png",
        "x": 219,
        "y": 94,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_allegiance_lunar_2"
        ],
        "locks": [
          "wolfgang_allegiance_lock_2",
          "wolfgang_allegiance_lock_4"
        ]
      },
      {
        "id": "wolfgang_allegiance_lunar_2",
        "title": "Лунный стратег II",
        "desc": "Наносите на 20% больше урона теневым существам в могучей форме.",
        "cond": "Изучить навык \"Лунный стратег I\"",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_lunar_2.png",
        "x": 219,
        "y": 56,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_allegiance_lunar_3"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_lunar_3",
        "title": "Лунный стратег III",
        "desc": "Наносите на 30% больше урона теневым существам в могучей форме.",
        "cond": "Изучить навык \"Лунный стратег II\"",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_lunar_3.png",
        "x": 219,
        "y": 18,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_shadow_1",
        "title": "Теневой страж I",
        "desc": "Теневая преданность. [ 5 ] Наносите на 10% больше урона лунным существам в могучей форме.",
        "cond": "Победить древнего топливопряда Изучить как минимум 12 навыков Не изучать лунный навык",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_shadow_1.png",
        "x": 181,
        "y": 94,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_allegiance_shadow_2"
        ],
        "locks": [
          "wolfgang_allegiance_lock_1",
          "wolfgang_allegiance_lock_3"
        ]
      },
      {
        "id": "wolfgang_allegiance_shadow_2",
        "title": "Теневой страж II",
        "desc": "Наносите на 20% больше урона лунным существам в могучей форме.",
        "cond": "Изучить навык \"Теневой страж I\"",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_shadow_2.png",
        "x": 181,
        "y": 56,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_allegiance_shadow_3"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_allegiance_shadow_3",
        "title": "Теневой страж III",
        "desc": "Наносите на 30% больше урона лунным существам в могучей форме.",
        "cond": "Изучить навык \"Теневой страж II\"",
        "icon": "assets/skills/wolfgang/wolfgang_allegiance_shadow_3.png",
        "x": 181,
        "y": 18,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_autogym",
        "title": "Мастер тренажёра",
        "desc": "Совершенствуйте свою тренировку. Мини-игра выполняется автоматически.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_autogym.png",
        "x": -125,
        "y": 170,
        "group": "training",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_critwork_1",
        "title": "Рабочая тренировка I",
        "desc": "Шанс одним ударом разрушить структуру повышается до 5%.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_critwork_1.png",
        "x": -212,
        "y": 170,
        "group": "might",
        "root": true,
        "lock": false,
        "connects": [
          "wolfgang_critwork_2"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_critwork_2",
        "title": "Рабочая тренировка II",
        "desc": "Шанс одним ударом разрушить структуру повышается до 10%.",
        "cond": "Изучить навык \"Рабочая тренировка I\"",
        "icon": "assets/skills/wolfgang/wolfgang_critwork_2.png",
        "x": -212,
        "y": 132,
        "group": "might",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_critwork_3"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_critwork_3",
        "title": "Рабочая тренировка III",
        "desc": "Шанс одним ударом разрушить структуру повышается до 15%.",
        "cond": "Изучить навык \"Рабочая тренировка II\"",
        "icon": "assets/skills/wolfgang/wolfgang_critwork_3.png",
        "x": -212,
        "y": 94,
        "group": "might",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_dumbbell_crafting",
        "title": "Улучшение гантелей",
        "desc": "Научитесь создавать термальную гантель, огненную гантель и ледяную гантель.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_dumbbell_crafting.png",
        "x": -49,
        "y": 170,
        "group": "training",
        "root": true,
        "lock": false,
        "connects": [
          "wolfgang_dumbbell_throwing_1"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_dumbbell_throwing_1",
        "title": "Тяжёлое попадание I",
        "desc": "Урон кинутых гантелей повышается на 50%.",
        "cond": "Изучить навык \"Улучшение гантелей\"",
        "icon": "assets/skills/wolfgang/wolfgang_dumbbell_throwing_1.png",
        "x": -49,
        "y": 132,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_dumbbell_throwing_2"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_dumbbell_throwing_2",
        "title": "Тяжёлое попадание II",
        "desc": "Урон кинутых гантелей повышается на 100%.",
        "cond": "Изучить навык \"Тяжёлое попадание I\"",
        "icon": "assets/skills/wolfgang/wolfgang_dumbbell_throwing_2.png",
        "x": -49,
        "y": 94,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_normal_coach",
        "title": "Тренер Вольфганг",
        "desc": "Научитесь создавать свисток тренера. Когда Вольфганг свистит, он повышает рассудок друзьям и урон последователям.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_normal_coach.png",
        "x": -87,
        "y": 170,
        "group": "training",
        "root": true,
        "lock": false,
        "connects": [
          "wolfgang_normal_speed"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_normal_speed",
        "title": "День ног",
        "desc": "Вольфганг бегает на 10% быстрее в обычной форме.",
        "cond": "Изучить навык \"Тренер Вольфганг\"",
        "icon": "assets/skills/wolfgang/wolfgang_normal_speed.png",
        "x": -87,
        "y": 132,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_overbuff_1",
        "title": "Выйти за пределы I",
        "desc": "Используйте тренажёр, чтобы повысить могучесть до 110.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_overbuff_1.png",
        "x": -11,
        "y": 170,
        "group": "training",
        "root": true,
        "lock": false,
        "connects": [
          "wolfgang_overbuff_2"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_overbuff_2",
        "title": "Выйти за пределы II",
        "desc": "Используйте тренажёр, чтобы повысить могучесть до 120.",
        "cond": "Изучить навык \"Выйти за пределы I\"",
        "icon": "assets/skills/wolfgang/wolfgang_overbuff_2.png",
        "x": -11,
        "y": 132,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_overbuff_3"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_overbuff_3",
        "title": "Выйти за пределы III",
        "desc": "Используйте тренажёр, чтобы повысить могучесть до 130.",
        "cond": "Изучить навык \"Выйти за пределы II\"",
        "icon": "assets/skills/wolfgang/wolfgang_overbuff_3.png",
        "x": -11,
        "y": 94,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_overbuff_4"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_overbuff_4",
        "title": "Выйти за пределы IV",
        "desc": "Используйте тренажёр, чтобы повысить могучесть до 140.",
        "cond": "Изучить навык \"Выйти за пределы III\"",
        "icon": "assets/skills/wolfgang/wolfgang_overbuff_4.png",
        "x": -11,
        "y": 56,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_overbuff_5"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_overbuff_5",
        "title": "Выйти за пределы V",
        "desc": "Используйте тренажёр, чтобы повысить могучесть до 150.",
        "cond": "Изучить навык \"Выйти за пределы IV\"",
        "icon": "assets/skills/wolfgang/wolfgang_overbuff_5.png",
        "x": -11,
        "y": 18,
        "group": "training",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wolfgang_planardamage_1",
        "title": "Мощное оружие I",
        "desc": "Наносите на 5 сквозного урона больше сквозным оружием в могучей форме.",
        "cond": "-",
        "icon": "assets/skills/wolfgang/wolfgang_planardamage_1.png",
        "x": 90,
        "y": 170,
        "group": "planardamage",
        "root": true,
        "lock": false,
        "connects": [
          "wolfgang_planardamage_2"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_planardamage_2",
        "title": "Мощное оружие II",
        "desc": "Наносите на 10 сквозного урона больше сквозным оружием в могучей форме.",
        "cond": "Изучить навык \"Мощное оружие I\"",
        "icon": "assets/skills/wolfgang/wolfgang_planardamage_2.png",
        "x": 90,
        "y": 132,
        "group": "planardamage",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_planardamage_3"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_planardamage_3",
        "title": "Мощное оружие III",
        "desc": "Наносите на 15 сквозного урона больше сквозным оружием в могучей форме.",
        "cond": "Изучить навык \"Мощное оружие II\"",
        "icon": "assets/skills/wolfgang/wolfgang_planardamage_3.png",
        "x": 90,
        "y": 94,
        "group": "planardamage",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_planardamage_4"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_planardamage_4",
        "title": "Мощное оружие IV",
        "desc": "Наносите на 20 сквозного урона больше сквозным оружием в могучей форме.",
        "cond": "Изучить навык \"Мощное оружие III\"",
        "icon": "assets/skills/wolfgang/wolfgang_planardamage_4.png",
        "x": 90,
        "y": 56,
        "group": "planardamage",
        "root": false,
        "lock": false,
        "connects": [
          "wolfgang_planardamage_5"
        ],
        "locks": []
      },
      {
        "id": "wolfgang_planardamage_5",
        "title": "Мощное оружие V",
        "desc": "Наносите на 25 сквозного урона больше сквозным оружием в могучей форме.",
        "cond": "Изучить навык \"Мощное оружие IV\"",
        "icon": "assets/skills/wolfgang/wolfgang_planardamage_5.png",
        "x": 90,
        "y": 18,
        "group": "planardamage",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wendy": {
    "gameChar": "wendy",
    "name": "Венди",
    "head": "assets/chars/wendy.png",
    "groups": {
      "avengingghost": "Средняя часть",
      "ghost_command": "Правая часть",
      "ghostflower": "Левая часть",
      "gravestone": "Средняя часть",
      "wendy_alliegience": "Преданность",
      "potion_upgrades": "Средняя часть",
      "sisturn_upgrades": "Правая часть",
      "smallghost": "Левая часть"
    },
    "bounds": {
      "minX": -173,
      "maxX": 185,
      "minY": 32,
      "maxY": 190
    },
    "skills": [
      {
        "id": "wendy_avenging_ghost",
        "title": "Мстительный призрак",
        "desc": "Когда Венди или кто-то из её друзей умирает, их призрак становится мстительным и в течение небольшого периода времени может сеять хаос в мире живых.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_avenging_ghost.png",
        "x": -47,
        "y": 137,
        "group": "avengingghost",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_ghostcommand_1",
        "title": "Командный дух I",
        "desc": "Венди может напомнить Абигейл, что она призрак, который может быть невидимым для врагов, чтобы сбежать из неприятной ситуации.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_ghostcommand_1.png",
        "x": 98,
        "y": 118,
        "group": "ghost_command",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_ghostcommand_2"
        ],
        "locks": []
      },
      {
        "id": "wendy_ghostcommand_2",
        "title": "Командный дух II",
        "desc": "Абигейл может рвануться туда, где Венди требуется помощь.",
        "cond": "Изучить навык \"Командный дух I\"",
        "icon": "assets/skills/wendy/wendy_ghostcommand_2.png",
        "x": 138,
        "y": 100,
        "group": "ghost_command",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_ghostcommand_3"
        ],
        "locks": []
      },
      {
        "id": "wendy_ghostcommand_3",
        "title": "Командный дух III",
        "desc": "Абигейл может использовать свои жуткие призрачные силы, чтобы пугать всё и вся.",
        "cond": "Изучить навык \"Командный дух II\"",
        "icon": "assets/skills/wendy/wendy_ghostcommand_3.png",
        "x": 177,
        "y": 73,
        "group": "ghost_command",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_ghostflower_butterfly",
        "title": "Сияние скорби I",
        "desc": "Венди может создавать бабочек и лунных бабочек из их крыльев и сияния скорби.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_ghostflower_butterfly.png",
        "x": -168,
        "y": 71,
        "group": "ghostflower",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_ghostflower_hat"
        ],
        "locks": []
      },
      {
        "id": "wendy_ghostflower_grave",
        "title": "Сияние скорби III",
        "desc": "Венди может создавать вечный алтарь, который работает как мясное чучело. Венди может пользоваться алтарём и без навыка, как и другие персонажи.",
        "cond": "Изучить навык \"Сияние скорби II\"",
        "icon": "assets/skills/wendy/wendy_ghostflower_grave.png",
        "x": -96,
        "y": 115,
        "group": "ghostflower",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_ghostflower_hat",
        "title": "Сияние скорби II",
        "desc": "Венди может создавать венец мертвеца из шести цветов сияния скорби, который позволяет персонажам пить призрачные эликсиры для разных эффектов. Венди может пользоваться венцом и без этого навыка, как и другие персонажи.",
        "cond": "Изучить навык \"Сияние скорби I\"",
        "icon": "assets/skills/wendy/wendy_ghostflower_hat.png",
        "x": -132,
        "y": 97,
        "group": "ghostflower",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_ghostflower_grave"
        ],
        "locks": []
      },
      {
        "id": "wendy_gravestone_1",
        "title": "Украшение могил",
        "desc": "Венди может украсить могилы цветами, приглашая живущих там духов выйти и навестить её. Духи кладбищ часто покровительствуют тёмным садам.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_gravestone_1.png",
        "x": 10,
        "y": 143,
        "group": "gravestone",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_makegravemounds"
        ],
        "locks": []
      },
      {
        "id": "wendy_lunar_1",
        "title": "Лунное сестринство I",
        "desc": "Лунная преданность. [ 3 ] [ 2 ] Абигейл настраивается на лунную энергию и получает немного защиты от сквозного урона.",
        "cond": "Победить небесного защитника Не изучать теневые навыки",
        "icon": "assets/skills/wendy/wendy_lunar_1.png",
        "x": -9,
        "y": 70,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_lunar_2"
        ],
        "locks": [
          "wendy_lunar_lock_1",
          "wendy_lunar_lock_2"
        ]
      },
      {
        "id": "wendy_lunar_2",
        "title": "Лунное сестринство II",
        "desc": "Венди может создавать мощный эликсир, наполненный лунной энергией, который увеличивает показатель сквозного урона Абигейл на некоторое время. Мощные эликсиры работают параллельно с обычными эликсирами.",
        "cond": "Изучить навык \"Лунное сестринство I\"",
        "icon": "assets/skills/wendy/wendy_lunar_2.png",
        "x": 32.272727272727,
        "y": 70,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_lunar_3"
        ],
        "locks": []
      },
      {
        "id": "wendy_lunar_3",
        "title": "Лунное сестринство III",
        "desc": "В полнолуние Венди может использовать лунные часы, чтобы наполнить Абигейл лунной энергией и превратить её в гештальта. Лунные часы могут превратить её обратно в обычного призрака в новолуние.",
        "cond": "Изучить навык \"Лунное сестринство II\"",
        "icon": "assets/skills/wendy/wendy_lunar_3.png",
        "x": 73,
        "y": 70,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_lunar_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -89,
        "y": 70,
        "group": "wendy_alliegience",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_lunar_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -51,
        "y": 70,
        "group": "wendy_alliegience",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_makegravemounds",
        "title": "Надгробия от Венди",
        "desc": "Венди может создавать собственные надгробия.",
        "cond": "Изучить навык \"Украшение могил\"",
        "icon": "assets/skills/wendy/wendy_makegravemounds.png",
        "x": 49,
        "y": 136,
        "group": "gravestone",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_potion_container",
        "title": "Корзинка для пикника",
        "desc": "Венди может создавать корзинку для переноски всех своих эликсиров. Для использования корзинки Венди обязательно нужен навык.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_potion_container.png",
        "x": -57,
        "y": 185,
        "group": "potion_upgrades",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_potion_revive"
        ],
        "locks": []
      },
      {
        "id": "wendy_potion_duration",
        "title": "Крепкий напиток",
        "desc": "Время действия эликсиров Венди увеличено в два раза для Абигейл и персонажей, кроме панацеи для призраков.",
        "cond": "Изучить навык \"Жуткий опыт\"",
        "icon": "assets/skills/wendy/wendy_potion_duration.png",
        "x": 18,
        "y": 190,
        "group": "potion_upgrades",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_potion_yield"
        ],
        "locks": []
      },
      {
        "id": "wendy_potion_revive",
        "title": "Жуткий опыт",
        "desc": "Венди может создавать новый эликсир, жуткий опыт, который сразу повышает Абби до третьего уровня. Венди может использовать зелье и без навыка.",
        "cond": "Изучить навык \"Корзинка для пикника\"",
        "icon": "assets/skills/wendy/wendy_potion_revive.png",
        "x": -20,
        "y": 190,
        "group": "potion_upgrades",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_potion_duration"
        ],
        "locks": []
      },
      {
        "id": "wendy_potion_yield",
        "title": "Дополнительный навар",
        "desc": "Венди с шансом 40% может создать два зелья вместо одного. В случае успеха существует дополнительный шанс 10% создать три.",
        "cond": "Изучить навык \"Крепкий напиток\"",
        "icon": "assets/skills/wendy/wendy_potion_yield.png",
        "x": 57,
        "y": 185,
        "group": "potion_upgrades",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_shadow_1",
        "title": "Теневое сестринство I",
        "desc": "Теневая преданность. [ 1 ] [ 2 ] Абигейл настраивается на теневую магию и получает немного защиты от сквозного урона.",
        "cond": "Победить древнего топливопряда Не изучать лунные навыки",
        "icon": "assets/skills/wendy/wendy_shadow_1.png",
        "x": -9,
        "y": 32,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_shadow_2"
        ],
        "locks": [
          "wendy_shadow_lock_1",
          "wendy_shadow_lock_2"
        ]
      },
      {
        "id": "wendy_shadow_2",
        "title": "Теневое сестринство II",
        "desc": "Венди может создавать мощный эликсир, наполненный теневой магией, который увеличивает длительность раздражения Абигейл. Мощные эликсиры работают параллельно с обычными эликсирами.",
        "cond": "Изучить навык \"Теневое сестринство I\"",
        "icon": "assets/skills/wendy/wendy_shadow_2.png",
        "x": 32.272727272727,
        "y": 32,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_shadow_3"
        ],
        "locks": []
      },
      {
        "id": "wendy_shadow_3",
        "title": "Теневое сестринство III",
        "desc": "Тёмная магия высвобождается, когда Венди убивает кого-то в своих руках, давая Абигейл больше силы на короткое время.",
        "cond": "Изучить навык \"Теневое сестринство II\"",
        "icon": "assets/skills/wendy/wendy_shadow_3.png",
        "x": 73,
        "y": 32,
        "group": "wendy_alliegience",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_shadow_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -89,
        "y": 32,
        "group": "wendy_alliegience",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_shadow_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -51,
        "y": 32,
        "group": "wendy_alliegience",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_sisturn_1",
        "title": "Благословение сестринской урны I",
        "desc": "Пугающая аура смерти дольше сохраняет свежесть лепестков, положенных в сестринскую урну.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_sisturn_1.png",
        "x": 103,
        "y": 173,
        "group": "sisturn_upgrades",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_sisturn_2"
        ],
        "locks": []
      },
      {
        "id": "wendy_sisturn_2",
        "title": "Благословение сестринской урны II",
        "desc": "У Венди повышается устойчивость к пугающим вещам, и она делится своей уверенностью с окружающими.",
        "cond": "Изучить навык \"Благословение сестринской урны I\"",
        "icon": "assets/skills/wendy/wendy_sisturn_2.png",
        "x": 144,
        "y": 156,
        "group": "sisturn_upgrades",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_sisturn_3"
        ],
        "locks": []
      },
      {
        "id": "wendy_sisturn_3",
        "title": "Благословение сестринской урны III",
        "desc": "Цветок лунного дерева приближает человечность Абигейл к Постоянству. Она становится более устойчивой к Гигантам, как другие выживающие, но её призрачное исцеление замедляется, пока она призвана.",
        "cond": "Изучить навык \"Благословение сестринской урны II\"",
        "icon": "assets/skills/wendy/wendy_sisturn_3.png",
        "x": 185,
        "y": 136,
        "group": "sisturn_upgrades",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wendy_smallghost_1",
        "title": "Помощь пищащим призракам I",
        "desc": "Расстояние до первой игрушки пищащего призрака уменьшено в два раза. Этот навык не уменьшает расстояние до последующих игрушек.",
        "cond": "-",
        "icon": "assets/skills/wendy/wendy_smallghost_1.png",
        "x": -173,
        "y": 133,
        "group": "smallghost",
        "root": true,
        "lock": false,
        "connects": [
          "wendy_smallghost_2"
        ],
        "locks": []
      },
      {
        "id": "wendy_smallghost_2",
        "title": "Помощь пищащим призракам II",
        "desc": "Мини-квест по поиску игрушек пищащего призрака содержит на 3-4 игрушки больше.",
        "cond": "Изучить навык \"Помощь пищащим призракам I\"",
        "icon": "assets/skills/wendy/wendy_smallghost_2.png",
        "x": -137,
        "y": 154,
        "group": "smallghost",
        "root": false,
        "lock": false,
        "connects": [
          "wendy_smallghost_3"
        ],
        "locks": []
      },
      {
        "id": "wendy_smallghost_3",
        "title": "Помощь пищащим призракам III",
        "desc": "Пищащие призраки дают по два цветка сияния скорби за каждую найденную игрушку и 8 цветков за последнюю. Количество получаемого сияния скорби за один мини-квест с учётом изучения трёх навыков этой ветви становится равным 18-20.",
        "cond": "Изучить навык \"Помощь пищащим призракам II\"",
        "icon": "assets/skills/wendy/wendy_smallghost_3.png",
        "x": -101,
        "y": 173,
        "group": "smallghost",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wx78": {
    "gameChar": "wx78",
    "name": "WX-78",
    "head": "assets/chars/wx78.png",
    "groups": {
      "allegiance": "Преданность",
      "chassis": "Корпус",
      "circuitry": "Схемы",
      "drones": "Дроны"
    },
    "bounds": {
      "minX": -211,
      "maxX": 225,
      "minY": 20,
      "maxY": 194
    },
    "skills": [
      {
        "id": "wx78_allegiance_lunar",
        "title": "Лунный сосуд",
        "desc": "Лунная преданность. [ 7 ] Открывает рецепт создания модуля спектрального переноса, который позволяет гештальтам вселяться в резервные корпуса, тем самым создавая приспешников WX-78.",
        "cond": "Победить небесного защитника Изучить навык \"Хладный резерв I\" Не открывать теневой навык",
        "icon": "assets/skills/wx78/wx78_allegiance_lunar.png",
        "x": 122,
        "y": 185,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wx78_allegiance_lunar_lock_1"
        ]
      },
      {
        "id": "wx78_allegiance_lunar_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 163,
        "y": 194,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_allegiance_shadow",
        "title": "Теневой служитель",
        "desc": "Теневая преданность. [ 6 ] Позволяет вставлять в тело WX-78 особые теневые компоненты, предоставляя корпусу различные возможности как в используемом, так и в неиспользуемом режимах.",
        "cond": "Победить древнего топливопряда Изучить навык \"Хладный резерв I\" Не открывать лунный навык",
        "icon": "assets/skills/wx78/wx78_allegiance_shadow.png",
        "x": 225,
        "y": 182,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wx78_shadow_allegiance_lock_1"
        ]
      },
      {
        "id": "wx78_bodycircuits",
        "title": "Тёплый резерв",
        "desc": "Резервные корпуса сохраняют эффекты бета-схем, даже если не используются.",
        "cond": "Изучить навык \"Обетованный механизм I\"",
        "icon": "assets/skills/wx78/wx78_bodycircuits.png",
        "x": 3,
        "y": 127,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_circuitry_alphabuffs_1",
        "title": "Конструирование альфа-схем I",
        "desc": "Процессные схемы получают новый эффект в дополнение к основному. Желудкорасширяющие схемы становятся эффективнее.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_circuitry_alphabuffs_1.png",
        "x": -195,
        "y": 101,
        "group": "circuitry",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_circuitry_alphabuffs_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_alphabuffs_2",
        "title": "Конструирование альфа-схем II",
        "desc": "Укрепляющие схемы, процессные схемы и схема мармеладного усилителя получают новый эффект в дополнение к основному. Желудкорасширяющие схемы становятся ещё эффективнее.",
        "cond": "Изучить навык \"Конструирование альфа-схем I\"",
        "icon": "assets/skills/wx78/wx78_circuitry_alphabuffs_2.png",
        "x": -195,
        "y": 141,
        "group": "circuitry",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_circuitry_slot_1"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_betabuffs_1",
        "title": "Конструирование бета-схем I",
        "desc": "Термальная схема, охлаждающая схема, оптоэлектрическая схема, схема музыкальной коробки и дистанцирующая схема получают новый эффект в дополнение к основному.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_circuitry_betabuffs_1.png",
        "x": -155,
        "y": 83,
        "group": "circuitry",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_circuitry_betabuffs_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_betabuffs_2",
        "title": "Конструирование бета-схем II",
        "desc": "Ускоряющие схемы, электрифицирующая схема и люминесцентные схемы получают новый эффект в дополнение к основному.",
        "cond": "Изучить навык \"Конструирование бета-схем I\"",
        "icon": "assets/skills/wx78/wx78_circuitry_betabuffs_2.png",
        "x": -155,
        "y": 123,
        "group": "circuitry",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_circuitry_slot_1"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_bettercharge",
        "title": "В напряжении",
        "desc": "Пассивная регенерация заряда происходит намного быстрее, и при отключении схемы с двумя или более разъёмами теряется на один заряд меньше.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_circuitry_bettercharge.png",
        "x": -92,
        "y": 33,
        "group": "circuitry",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_circuitry_betterunplug",
        "title": "Права модератора",
        "desc": "Открывает возможность извлекать любую схему из панели на выбор. Также уменьшает потерю прочности схемы при извлечении вдвое.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_circuitry_betterunplug.png",
        "x": -211,
        "y": 33,
        "group": "circuitry",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_circuitry_gammabuffs_1",
        "title": "Конструирование гамма-схем I",
        "desc": "Пищеварительная схема и звуковолновая схема получают новый эффект в дополнение к основному.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_circuitry_gammabuffs_1.png",
        "x": -115,
        "y": 101,
        "group": "circuitry",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_circuitry_gammabuffs_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_gammabuffs_2",
        "title": "Конструирование гамма-схем II",
        "desc": "Блокирующая схема и спинтроническая схема получают новый эффект в дополнение к основному.",
        "cond": "Изучить навык \"Конструирование гамма-схем I\"",
        "icon": "assets/skills/wx78/wx78_circuitry_gammabuffs_2.png",
        "x": -115,
        "y": 141,
        "group": "circuitry",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_circuitry_slot_1"
        ],
        "locks": []
      },
      {
        "id": "wx78_circuitry_slot_1",
        "title": "Плата расширения",
        "desc": "Даёт дополнительный слот для всех панелей схем.",
        "cond": "Изучить навык \"Конструирование альфа-схем II\", \"Конструирование бета-схем II\" или \"Конструирование гамма-схем II\"",
        "icon": "assets/skills/wx78/wx78_circuitry_slot_1.png",
        "x": -155,
        "y": 163,
        "group": "circuitry",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_deliverydrone_1",
        "title": "Транспортировка I",
        "desc": "Открывает рецепт создания мобильного модуля хранения, который имеет хранилище с тремя ячейками и позволяет отправлять предметы в любую исследованную область.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_deliverydrone_1.png",
        "x": 114,
        "y": 66,
        "group": "drones",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_deliverydrone_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_deliverydrone_2",
        "title": "Транспортировка II",
        "desc": "Открывает рецепт создания улучшенного мобильного модуля хранения, который имеет хранилище с шестью ячейками.",
        "cond": "Изучить навык \"Транспортировка I\"",
        "icon": "assets/skills/wx78/wx78_deliverydrone_2.png",
        "x": 74,
        "y": 27,
        "group": "drones",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_extrabody_1",
        "title": "Хладный резерв I",
        "desc": "Открывает рецепт создания резервного корпуса.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_extrabody_1.png",
        "x": 3,
        "y": 20,
        "group": "chassis",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_ghostrevive_1"
        ],
        "locks": []
      },
      {
        "id": "wx78_extrabody_2",
        "title": "Хладный резерв II",
        "desc": "Даёт возможность создания дополнительного резервного корпуса (т.е. поднимает максимум до двух).",
        "cond": "Изучить навык \"Обетованный механизм I\"",
        "icon": "assets/skills/wx78/wx78_extrabody_2.png",
        "x": -37,
        "y": 105,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_extrabody_3"
        ],
        "locks": []
      },
      {
        "id": "wx78_extrabody_3",
        "title": "Хладный резерв III",
        "desc": "Даёт возможность создания дополнительного резервного корпуса (т.е. поднимает максимум до трёх).",
        "cond": "Изучить навык \"Хладный резерв II\"",
        "icon": "assets/skills/wx78/wx78_extrabody_3.png",
        "x": -37,
        "y": 145,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_remotebodyswap"
        ],
        "locks": []
      },
      {
        "id": "wx78_extradronerange",
        "title": "Усилитель сигнала",
        "desc": "Увеличивает радиус сканирования биосканализатора, а также увеличивает дальность работы верто-картографа, шандарахтера, автохватателя и уязвлятора.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_extradronerange.png",
        "x": 221,
        "y": 105,
        "group": "drones",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_ghostrevive_1",
        "title": "Обетованный механизм I",
        "desc": "При попытке потревожить резервный корпус сознание переместится в него, а заряд полностью потратится.",
        "cond": "Изучить навык \"Хладный резерв I\"",
        "icon": "assets/skills/wx78/wx78_ghostrevive_1.png",
        "x": 3,
        "y": 87,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_extrabody_2",
          "wx78_bodycircuits",
          "wx78_ghostrevive_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_ghostrevive_2",
        "title": "Обетованный механизм II",
        "desc": "Если WX-78 умрёт с полным зарядом, не достигнув максимального числа резервных корпусов, один останется на месте его тела.",
        "cond": "Изучить навык \"Обетованный механизм I\"",
        "icon": "assets/skills/wx78/wx78_ghostrevive_2.png",
        "x": 43,
        "y": 105,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [
          "wx78_ghostrevive_3"
        ],
        "locks": []
      },
      {
        "id": "wx78_ghostrevive_3",
        "title": "Обетованный механизм III",
        "desc": "Возрождение через резервный корпус полностью восстанавливает здоровье WX-78.",
        "cond": "Изучить навык \"Обетованный механизм II\"",
        "icon": "assets/skills/wx78/wx78_ghostrevive_3.png",
        "x": 43,
        "y": 145,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_remotebodyswap",
        "title": "Удалённая передача",
        "desc": "Даёт возможность переноса создания WX-78 в любой резервный корпус на карте.",
        "cond": "Изучить навык \"Хладный резерв III\"",
        "icon": "assets/skills/wx78/wx78_remotebodyswap.png",
        "x": 3,
        "y": 167,
        "group": "chassis",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_scoutdrone_1",
        "title": "Полевой исследователь",
        "desc": "Открывает рецепт создания верто-картографа, который может открывать неисследованные области карты мира.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_scoutdrone_1.png",
        "x": 134,
        "y": 106,
        "group": "drones",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_shadow_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 182,
        "y": 167,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wx78_zapdrone_1",
        "title": "Телемеханик-энтузиаст I",
        "desc": "Открывает рецепт создания шандарахтера, который позволяет бить током существ с расстояния.",
        "cond": "-",
        "icon": "assets/skills/wx78/wx78_zapdrone_1.png",
        "x": 154,
        "y": 66,
        "group": "drones",
        "root": true,
        "lock": false,
        "connects": [
          "wx78_zapdrone_2"
        ],
        "locks": []
      },
      {
        "id": "wx78_zapdrone_2",
        "title": "Телемеханик-энтузиаст II",
        "desc": "Повышает дальность и энергоёмкость шандарахтера.",
        "cond": "Изучить навык \"Телемеханик-энтузиаст I\"",
        "icon": "assets/skills/wx78/wx78_zapdrone_2.png",
        "x": 196,
        "y": 30,
        "group": "drones",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "woodie": {
    "gameChar": "woodie",
    "name": "Вуди",
    "head": "assets/chars/woodie.png",
    "groups": {
      "allegiance": "Преданность",
      "curse": "Проклятие",
      "human": "Дровосек"
    },
    "bounds": {
      "minX": -207,
      "maxX": 223,
      "minY": 9,
      "maxY": 171
    },
    "skills": [
      {
        "id": "woodie_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 199,
        "y": 171,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_allegiance_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 176,
        "y": 128,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_allegiance_lock_3",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 223,
        "y": 128,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_allegiance_lock_4",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 176,
        "y": 84,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_allegiance_lock_5",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 223,
        "y": 84,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_allegiance_lunar",
        "title": "Лунный отступник",
        "desc": "Лунная преданность. [ 7 ] В полнолуние Вуди не превращается в оборотня.",
        "cond": "Победить небесного защитника Изучить как минимум 12 навыков Не изучать теневой навык",
        "icon": "assets/skills/woodie/woodie_allegiance_lunar.png",
        "x": 223,
        "y": 38,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "woodie_allegiance_lock_1",
          "woodie_allegiance_lock_3",
          "woodie_allegiance_lock_5"
        ]
      },
      {
        "id": "woodie_allegiance_shadow",
        "title": "Теневой пастух",
        "desc": "Теневая преданность. [ 6 ] Ужасы становятся нейтральными к Вуди в форме оборотня.",
        "cond": "Победить древнего топливопряда Изучить как минимум 12 навыков Не изучать лунный навык",
        "icon": "assets/skills/woodie/woodie_allegiance_shadow.png",
        "x": 176,
        "y": 38,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "woodie_allegiance_lock_1",
          "woodie_allegiance_lock_2",
          "woodie_allegiance_lock_4"
        ]
      },
      {
        "id": "woodie_curse_beaver_1",
        "title": "Бобр-оборотень I",
        "desc": "Добывайте камень в 2,5 раза быстрее в форме бобра-оборотня.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_curse_beaver_1.png",
        "x": -142,
        "y": 171,
        "group": "curse",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_curse_beaver_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_beaver_2",
        "title": "Бобр-оборотень II",
        "desc": "Рубите деревья в 1,8 раза быстрее в форме бобра-оборотня.",
        "cond": "Изучить навык \"Бобр-оборотень I\"",
        "icon": "assets/skills/woodie/woodie_curse_beaver_2.png",
        "x": -142,
        "y": 132,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_beaver_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_beaver_3",
        "title": "Бобр-оборотень III",
        "desc": "Рубите, добывайте и ломайте твёрдые материалы [ 4 ] в форме бобра-оборотня.",
        "cond": "Изучить навык \"Бобр-оборотень II\"",
        "icon": "assets/skills/woodie/woodie_curse_beaver_3.png",
        "x": -142,
        "y": 93,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_beaver_lock"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_beaver_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -142,
        "y": 54,
        "group": "curse",
        "root": false,
        "lock": true,
        "connects": [
          "woodie_curse_epic_beaver"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_epic_beaver",
        "title": "Мастерство бобра",
        "desc": "Бобр-оборотень учится бить хвостом по земле, уничтожая всё вокруг себя и затрачивая 5 единиц оборотнеметра.",
        "cond": "Изучить навык \"Бобр-оборотень III\" Не изучать навык мастерства других форм",
        "icon": "assets/skills/woodie/woodie_curse_epic_beaver.png",
        "x": -142,
        "y": 15,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_curse_epic_goose",
        "title": "Мастерство гуся",
        "desc": "Открывается возможность переместиться в случайное место, затрачивая 20 единиц оборотнеметра.",
        "cond": "Изучить навык \"Гусь-оборотень III\" Не изучать навык мастерства других форм",
        "icon": "assets/skills/woodie/woodie_curse_epic_goose.png",
        "x": -54,
        "y": 15,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_curse_epic_moose",
        "title": "Мастерство лося",
        "desc": "Лось-оборотень наносит 136 урона каждый третий удар [ 5 ] и имеет 15 единиц защиты от сквозного урона.",
        "cond": "Изучить навык \"Лось-оборотень III\" Не изучать навык мастерства других форм",
        "icon": "assets/skills/woodie/woodie_curse_epic_moose.png",
        "x": -97.5,
        "y": 15,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_curse_goose_1",
        "title": "Гусь-оборотень I",
        "desc": "Бегайте на 19% быстрее в форме гуся-оборотня.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_curse_goose_1.png",
        "x": -54,
        "y": 171,
        "group": "curse",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_curse_goose_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_goose_2",
        "title": "Гусь-оборотень II",
        "desc": "Станьте полностью водонепроницаемым в форме гуся-оборотня.",
        "cond": "Разблокировать навык \"Гусь-оборотень I\"",
        "icon": "assets/skills/woodie/woodie_curse_goose_2.png",
        "x": -54,
        "y": 132,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_goose_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_goose_3",
        "title": "Гусь-оборотень III",
        "desc": "Каждые 5 секунд уклоняйтесь от атак в форме гуся-оборотня.",
        "cond": "Изучить навык \"Гусь-оборотень II\"",
        "icon": "assets/skills/woodie/woodie_curse_goose_3.png",
        "x": -54,
        "y": 93,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_goose_lock"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_goose_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -54,
        "y": 54,
        "group": "curse",
        "root": false,
        "lock": true,
        "connects": [
          "woodie_curse_epic_goose"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_master",
        "title": "Объятие проклятия",
        "desc": "Не получайте штрафов к здоровью или рассудку за поедание гротескных идолов. Возвращайтесь в человеческий облик с 15% сытости.",
        "cond": "Изучить как минимум шесть навыков проклятия",
        "icon": "assets/skills/woodie/woodie_curse_master.png",
        "x": -207,
        "y": 15,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_curse_master_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -207,
        "y": 54,
        "group": "curse",
        "root": true,
        "lock": true,
        "connects": [
          "woodie_curse_master"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_moose_1",
        "title": "Лось-оборотень I",
        "desc": "Лось-оборотень более устойчив к столкновениям с препятствиями и ходит на 11% быстрее.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_curse_moose_1.png",
        "x": -97.5,
        "y": 171,
        "group": "curse",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_curse_moose_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_moose_2",
        "title": "Лось-оборотень II",
        "desc": "Восстанавливайте 1,5 единицы здоровье раз в 5 секунд в форме лося-оборотня.",
        "cond": "Изучить навык \"Лось-оборотень I\"",
        "icon": "assets/skills/woodie/woodie_curse_moose_2.png",
        "x": -97.5,
        "y": 132,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_moose_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_moose_3",
        "title": "Лось-оборотень III",
        "desc": "Атаку тараном в форме лося-оборотня можно остановить.",
        "cond": "Изучить навык \"Лось-оборотень II\"",
        "icon": "assets/skills/woodie/woodie_curse_moose_3.png",
        "x": -97.5,
        "y": 93,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_moose_lock"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_moose_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -97.5,
        "y": 54,
        "group": "curse",
        "root": false,
        "lock": true,
        "connects": [
          "woodie_curse_epic_moose"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_weremeter_1",
        "title": "Время превращения I",
        "desc": "Время в форме оборотня длится на 15% дольше.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_curse_weremeter_1.png",
        "x": -207,
        "y": 171,
        "group": "curse",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_curse_weremeter_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_weremeter_2",
        "title": "Время превращения II",
        "desc": "Время в форме оборотня длится на 30% дольше.",
        "cond": "Изучить навык \"Время превращения I\"",
        "icon": "assets/skills/woodie/woodie_curse_weremeter_2.png",
        "x": -207,
        "y": 132,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_curse_weremeter_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_curse_weremeter_3",
        "title": "Время превращения III",
        "desc": "Время в форме оборотня длится на 45% дольше.",
        "cond": "Изучить навык \"Время превращения II\"",
        "icon": "assets/skills/woodie/woodie_curse_weremeter_3.png",
        "x": -207,
        "y": 93,
        "group": "curse",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_human_lucy_1",
        "title": "Столяр",
        "desc": "Используйте Люси, чтобы тратить на создание досок три бревна.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_human_lucy_1.png",
        "x": 71,
        "y": 48,
        "group": "human",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_human_lucy_2",
          "woodie_human_lucy_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_human_lucy_2",
        "title": "Резьба шляпы",
        "desc": "Используйте Люси, чтобы вырезать красивую шляпу из твёрдой древесины для защиты.",
        "cond": "Изучить навык \"Столяр\"",
        "icon": "assets/skills/woodie/woodie_human_lucy_2.png",
        "x": 43,
        "y": 9,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_human_lucy_3",
        "title": "Резьба трости",
        "desc": "Используйте Люси, чтобы вырезать деревянную трость для быстрого передвижения.",
        "cond": "Изучить навык \"Столяр\"",
        "icon": "assets/skills/woodie/woodie_human_lucy_3.png",
        "x": 102,
        "y": 9,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_human_quickpicker_1",
        "title": "Быстрый сборщик I",
        "desc": "Собирайте предметы на 15% быстрее.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_human_quickpicker_1.png",
        "x": 35,
        "y": 171,
        "group": "human",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_human_quickpicker_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_human_quickpicker_2",
        "title": "Быстрый сборщик II",
        "desc": "Собирайте предметы на 30% быстрее.",
        "cond": "Изучить навык \"Быстрый сборщик I\"",
        "icon": "assets/skills/woodie/woodie_human_quickpicker_2.png",
        "x": 35,
        "y": 134,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_human_quickpicker_3"
        ],
        "locks": []
      },
      {
        "id": "woodie_human_quickpicker_3",
        "title": "Быстрый сборщик III",
        "desc": "Собирайте предметы на 45% быстрее.",
        "cond": "Изучить навык \"Быстрый сборщик II\"",
        "icon": "assets/skills/woodie/woodie_human_quickpicker_3.png",
        "x": 35,
        "y": 97,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "woodie_human_treeguard_1",
        "title": "Вальщик энтов I",
        "desc": "Наносите на 41% больше урона энтам.",
        "cond": "-",
        "icon": "assets/skills/woodie/woodie_human_treeguard_1.png",
        "x": 107,
        "y": 171,
        "group": "human",
        "root": true,
        "lock": false,
        "connects": [
          "woodie_human_treeguard_2"
        ],
        "locks": []
      },
      {
        "id": "woodie_human_treeguard_2",
        "title": "Вальщик энтов II",
        "desc": "Наносите на 100% больше урона энтам.",
        "cond": "Изучить навык \"Вальщик энтов I\"",
        "icon": "assets/skills/woodie/woodie_human_treeguard_2.png",
        "x": 107,
        "y": 134,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [
          "woodie_human_treeguard_max"
        ],
        "locks": []
      },
      {
        "id": "woodie_human_treeguard_max",
        "title": "Вальщик энтов III",
        "desc": "Научитесь создавать идол энта, крайне горючее чучело.",
        "cond": "Изучить навык \"Вальщик энтов II\"",
        "icon": "assets/skills/woodie/woodie_human_treeguard_max.png",
        "x": 107,
        "y": 97,
        "group": "human",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wortox": {
    "gameChar": "wortox",
    "name": "Вортокс",
    "head": "assets/chars/wortox.png",
    "groups": {
      "allegiance": "Преданность",
      "nice": "Благой",
      "naughty": "Озорной",
      "neutral": "Нейтральный"
    },
    "bounds": {
      "minX": -215,
      "maxX": 222,
      "minY": 0,
      "maxY": 169
    },
    "skills": [
      {
        "id": "wortox_allegiance_lunar",
        "title": "Лунный плут",
        "desc": "Лунная преданность. [ 4 ] Во время эхо души если в ячейку брони или шлема надет броня из светлоцвета или шлем из светлоцвета, то следующий удар по Вортоксу поглощает весь урон, после удара эхо души пропадёт. Уменьшает требуемое количество навыков для \"склонность к благой стороне\" и \"склонность к озорной стороне\" на 1.",
        "cond": "Победить небесного защитника Не изучать теневой навык",
        "icon": "assets/skills/wortox/wortox_allegiance_lunar.png",
        "x": -16,
        "y": 129.9,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wortox_allegiance_lunar_lock_1",
          "wortox_allegiance_lunar_lock_2"
        ]
      },
      {
        "id": "wortox_allegiance_lunar_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -16,
        "y": 61.9,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_allegiance_lunar_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -16,
        "y": 95.9,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_allegiance_shadow",
        "title": "Shadow Harvester",
        "desc": "The Queen will reward your loyalty by unlocking power from wielding a Shadow Reaper. Souls waiting to be freed in a Soul Echo will cause damage dealt to spread out to close enemies or hit one target twice, and expire the timer.",
        "cond": "",
        "icon": "assets/skills/wortox/wortox_allegiance_shadow.png",
        "x": 24,
        "y": 129.9,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wortox_allegiance_shadow_lock_1",
          "wortox_allegiance_shadow_lock_2"
        ]
      },
      {
        "id": "wortox_allegiance_shadow_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 24,
        "y": 61.9,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_allegiance_shadow_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 24,
        "y": 95.9,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_lifebringer_1",
        "title": "Одушевление I",
        "desc": "Позволяет создавать из 10 душ двухвостое сердце для возрождения мёртвых персонажей.",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_lifebringer_1.png",
        "x": -215,
        "y": 32,
        "group": "nice",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_lifebringer_2"
        ],
        "locks": []
      },
      {
        "id": "wortox_lifebringer_2",
        "title": "Одушевление II",
        "desc": "Использование двухвостого сердца Вортоксом больше не даёт штраф в 25% от максимального здоровья возродившемся персонажу.",
        "cond": "Изучить навык \"Одушевление I\"",
        "icon": "assets/skills/wortox/wortox_lifebringer_2.png",
        "x": -215,
        "y": 72,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_lifebringer_3",
        "title": "Одушевление III",
        "desc": "Вортокс может выпускать души из двухвостого сердца как при перегрузке душами. Другие игроки могут телепортироваться к Вортоксу, который сделал это сердце, но не между серверами (поверхность/пещеры). В этом случае персонаж появится в 1-2 клетках от Вортокса, это значение уменьшается, если он находится на лодке.",
        "cond": "Изучить навык \"Одушевление II\" и 5 навыков \"благой\" или \"нейтральной\" стороны.",
        "icon": "assets/skills/wortox/wortox_lifebringer_3.png",
        "x": -215,
        "y": 140,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wortox_lifebringer_lock"
        ]
      },
      {
        "id": "wortox_lifebringer_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -215,
        "y": 106,
        "group": "nice",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_liftedspirits_1",
        "title": "Облегчение души I",
        "desc": "Использование прыжка души ускоряет Вортокса на 25% во время действия эха души [ 2 ].",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_liftedspirits_1.png",
        "x": -107,
        "y": 32,
        "group": "nice",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_liftedspirits_2"
        ],
        "locks": []
      },
      {
        "id": "wortox_liftedspirits_2",
        "title": "Облегчение души II",
        "desc": "Время, когда эхо души активно, увеличивается с 5 до 8 секунд [ 2 ].",
        "cond": "Изучить навык \"Облегчение души I\"",
        "icon": "assets/skills/wortox/wortox_liftedspirits_2.png",
        "x": -107,
        "y": 72,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [
          "wortox_liftedspirits_3",
          "wortox_liftedspirits_4"
        ],
        "locks": []
      },
      {
        "id": "wortox_liftedspirits_3",
        "title": "Отголосок эхо",
        "desc": "После использования эха души появляется третье бесплатное использования прыжка [ 2 ].",
        "cond": "Изучить навык \"Облегчение души II\"",
        "icon": "assets/skills/wortox/wortox_liftedspirits_3.png",
        "x": -125,
        "y": 112,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_liftedspirits_4",
        "title": "Капризное перемещение",
        "desc": "Стоимость прыжка души с карты будет уменьшена в зависимости от того, сколько земель текущего мира было исследовано.",
        "cond": "Изучить навык \"Облегчение души II\"",
        "icon": "assets/skills/wortox/wortox_liftedspirits_4.png",
        "x": -89,
        "y": 112,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_nabbag",
        "title": "Котомка-воровка",
        "desc": "Позволяет создавать котомку-воровку, которой можно собирать вещи с пола или использовать в качестве оружия или сачка. Другие Вортоксы без навыка не смогут использовать предмет.",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_nabbag.png",
        "x": 116.8,
        "y": 32,
        "group": "naughty",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_souljar_1"
        ],
        "locks": []
      },
      {
        "id": "wortox_panflute_forget",
        "title": "Примиряющий напев",
        "desc": "После пробуждения от сна флейты, существа становятся пассивными на 7 секунд.",
        "cond": "Изучить навык \"Флейтист-импровизант\"",
        "icon": "assets/skills/wortox/wortox_panflute_forget.png",
        "x": 50,
        "y": 0,
        "group": "neutral",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_panflute_playing",
        "title": "Флейтист-импровизант",
        "desc": "Каждые 8 минут (раз в один игровой день), если Вортокс не умирал, следующее использование флейты Пана не будет терять прочность и прибавляет 5 единиц рассудка. Когда флейта будет готова, Вортокс скажет об этом, а над самой флейтой в инвентаре будут летать ноты.",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_panflute_playing.png",
        "x": 0,
        "y": 0,
        "group": "neutral",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_panflute_soulcaller",
          "wortox_panflute_forget"
        ],
        "locks": []
      },
      {
        "id": "wortox_panflute_soulcaller",
        "title": "Приятная пастораль",
        "desc": "Каждый раз, когда Вортокс играет на флейте, вокруг Вортокса в радиусе одной клетки появляются 6 душ.",
        "cond": "Изучить навык \"Флейтист-импровизант\"",
        "icon": "assets/skills/wortox/wortox_panflute_soulcaller.png",
        "x": -50,
        "y": 0,
        "group": "neutral",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_souldecoy_1",
        "title": "Душа-приманка I",
        "desc": "После прыжка души (не срабатывает если это было эхо души) на месте Вортокса, откуда он прыгнул, появляется клон-приманка. Приманки имеют одну единицу здоровья, время существования приманки составляет 3 секунды. После убийства приманки существа останутся агрессивными к Вортоксу. Приманка может появиться если после смерти предыдущей приманки прошло 3 секунды.",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_souldecoy_1.png",
        "x": 222,
        "y": 32,
        "group": "naughty",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_souldecoy_2"
        ],
        "locks": []
      },
      {
        "id": "wortox_souldecoy_2",
        "title": "Душа-приманка II",
        "desc": "Время существования приманки увеличивается с 3 до 6 секунд.",
        "cond": "Изучить навык \"Душа-приманка I\"",
        "icon": "assets/skills/wortox/wortox_souldecoy_2.png",
        "x": 222,
        "y": 72,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_souldecoy_3",
        "title": "Душа-приманка III",
        "desc": "После смерти или исчезновения приманки всем враждебным существам наносится 51 единица урона [ 3 ].",
        "cond": "Изучить навык \"Душа-приманка II\" и 5 навыков \"озорной\" или \"нейтральной\" стороны.",
        "icon": "assets/skills/wortox/wortox_souldecoy_3.png",
        "x": 222,
        "y": 140,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wortox_souldecoy_lock"
        ]
      },
      {
        "id": "wortox_souldecoy_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 220.8,
        "y": 106,
        "group": "naughty",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_souljar_1",
        "title": "Сосуд для душ",
        "desc": "Позволяет создавать сосуд для душ, который вмещает до 40 душ. Другие Вортоксы без навыка не смогут использовать предмет.",
        "cond": "Изучить навык \"Котомка-воровка\"",
        "icon": "assets/skills/wortox/wortox_souljar_1.png",
        "x": 116.8,
        "y": 72,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [
          "wortox_souljar_2",
          "wortox_souljar_3"
        ],
        "locks": []
      },
      {
        "id": "wortox_souljar_2",
        "title": "Переполняющая жадность",
        "desc": "Каждый сосуд для душ, что есть в инвентаре, увеличивает количество душ до перегрузки на 5 (максимальное количество душ в инвентаре составляет 85 при наличии в 12 сосудов в инвентаре и 1 сосуда в курсоре мыши).",
        "cond": "Изучить навык \"Сосуд для душ\"",
        "icon": "assets/skills/wortox/wortox_souljar_2.png",
        "x": 98,
        "y": 112,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_souljar_3",
        "title": "Covetous Collector",
        "desc": "Held Souls and Souls inside of Soul Jars increases both the damage of the Knabsack and the damage of Souls, up to 100 total Souls collected.",
        "cond": "",
        "icon": "assets/skills/wortox/wortox_souljar_3.png",
        "x": 134,
        "y": 112,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_soulprotector_1",
        "title": "Широта души I",
        "desc": "Радиус исцеления от освобождения душ увеличивается на 0,7 клетки дёрна (2,7 вместо 2 клеток).",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_soulprotector_1.png",
        "x": -167,
        "y": 21,
        "group": "nice",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_soulprotector_2"
        ],
        "locks": []
      },
      {
        "id": "wortox_soulprotector_2",
        "title": "Широта души II",
        "desc": "Радиус исцеления от освобождения душ увеличивается на 1,4 клетки дёрна (3,4 вместо 2,7 клетки). Души летят быстрее на 40%.",
        "cond": "Изучить навык \"Широта души I\"",
        "icon": "assets/skills/wortox/wortox_soulprotector_2.png",
        "x": -167,
        "y": 61,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_soulprotector_3",
        "title": "До глубины души I",
        "desc": "У исцеления от освобождения души появляется вторая волна исцеления, восстанавливает 10-5 (-1 здоровье за каждого игрока) единиц здоровья через 4 секунды после первой волны. Волна не появляется после перегрузки душами, но появляться если \"сжать\" двухвостное сердце.",
        "cond": "Изучить навык \"Широта души II\" и 5 навыков \"благой\" или \"нейтральной\" стороны.",
        "icon": "assets/skills/wortox/wortox_soulprotector_3.png",
        "x": -167,
        "y": 129,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [
          "wortox_soulprotector_4"
        ],
        "locks": [
          "wortox_soulprotector_lock"
        ]
      },
      {
        "id": "wortox_soulprotector_4",
        "title": "До глубины души II",
        "desc": "Увеличивается эффективность исцеления душами. За каждого игрока исцеление уменьшается на 1 вместо 2 единиц здоровья, вторая волна уменьшает исцеление души на 0,5 вместо 1 единиц, однако лимит в 5 минимального исцеления остаётся.",
        "cond": "Изучить навык \"До глубины души I\"",
        "icon": "assets/skills/wortox/wortox_soulprotector_4.png",
        "x": -167,
        "y": 169,
        "group": "nice",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_soulprotector_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -167,
        "y": 95,
        "group": "nice",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_thief_1",
        "title": "Вор душ I",
        "desc": "Радиус притягивания душ увеличивается на 0,9 клетки дёрна (2,9 вместо 2 клеток).",
        "cond": "-",
        "icon": "assets/skills/wortox/wortox_thief_1.png",
        "x": 174,
        "y": 21,
        "group": "naughty",
        "root": true,
        "lock": false,
        "connects": [
          "wortox_thief_2"
        ],
        "locks": []
      },
      {
        "id": "wortox_thief_2",
        "title": "Вор душ II",
        "desc": "Души, выпавшие с убитых существ, больше держатся в мире перед тем как исчезнуть.",
        "cond": "Изучить навык \"Вор душ I\"",
        "icon": "assets/skills/wortox/wortox_thief_2.png",
        "x": 174,
        "y": 61,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_thief_3",
        "title": "Пронзание душ I",
        "desc": "Души наносят 25,5 единиц урона [ 3 ] при притягивании. Урон получают \"живые\" существа, то есть с тех что падает сама душа.",
        "cond": "Изучить навык \"Вор душ II\" и 5 навыков \"озорной\" или \"нейтральной\" стороны.",
        "icon": "assets/skills/wortox/wortox_thief_3.png",
        "x": 174,
        "y": 129,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [
          "wortox_thief_4"
        ],
        "locks": [
          "wortox_thief_lock"
        ]
      },
      {
        "id": "wortox_thief_4",
        "title": "Пронзание душ II",
        "desc": "Перед тем, как души начнут притягиваться к Вортоксу, они отдалятся от него на одну клетку дёрна.",
        "cond": "Изучить навык \"Пронзание душ I\"",
        "icon": "assets/skills/wortox/wortox_thief_4.png",
        "x": 174,
        "y": 169,
        "group": "naughty",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wortox_thief_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 174,
        "y": 95,
        "group": "naughty",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wormwood": {
    "gameChar": "wormwood",
    "name": "Вормвуд",
    "head": "assets/chars/wormwood.png",
    "groups": {
      "allegiance1": "Левый верхний угол",
      "allegiance2": "Правый верхний угол",
      "gathering": "Правая верхняя часть",
      "crafting": "Левая верхняя часть"
    },
    "bounds": {
      "minX": -222,
      "maxX": 223,
      "minY": 0,
      "maxY": 233
    },
    "skills": [
      {
        "id": "wormwood_allegiance_count_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -194,
        "y": 150,
        "group": "allegiance1",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": [
          "wormwood_allegiance_lock_lunar_1"
        ]
      },
      {
        "id": "wormwood_allegiance_count_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 219.5,
        "y": 156,
        "group": "allegiance2",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": [
          "wormwood_allegiance_lock_lunar_2"
        ]
      },
      {
        "id": "wormwood_allegiance_lock_lunar_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -194,
        "y": 120,
        "group": "allegiance1",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_allegiance_lock_lunar_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 219.5,
        "y": 123,
        "group": "allegiance2",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_allegiance_lunar_mutations_1",
        "title": "Лунный культиватор I",
        "desc": "Лунная преданность. [ 2 ] Позволяет создать морковокрысу. Она будут ходить неподалёку от Вормвуда и подбирать еду с пола. Спустя 3 игровых дня она исчезнет, оставив после себя морковь.",
        "cond": "Победить небесного защитника Изучить как минимум семь навыков с левой стороны",
        "icon": "assets/skills/wormwood/wormwood_allegiance_lunar_mutations_1.png",
        "x": -194,
        "y": 190,
        "group": "allegiance1",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_allegiance_lunar_mutations_2",
          "wormwood_allegiance_lunar_mutations_3"
        ],
        "locks": [
          "wormwood_allegiance_lock_lunar_1",
          "wormwood_allegiance_count_lock_1"
        ]
      },
      {
        "id": "wormwood_allegiance_lunar_mutations_2",
        "title": "Лунный культиватор II",
        "desc": "Позволяет создать лампожука. Он летает возле Вормвуда, освещая путь. Исчезнет через 2,5 игровых дня, оставив лампочку.",
        "cond": "Изучить навык \"Лунный культиватор I\"",
        "icon": "assets/skills/wormwood/wormwood_allegiance_lunar_mutations_2.png",
        "x": -221,
        "y": 233,
        "group": "allegiance1",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_allegiance_lunar_mutations_3",
        "title": "Лунный культиватор III",
        "desc": "Позволяет создать салатмандру, которая будет драться вместе с Вормвудом. Спустя 2 игровых дня исчезнет, оставив питайю.",
        "cond": "Изучить навык \"Лунный культиватор I\"",
        "icon": "assets/skills/wormwood/wormwood_allegiance_lunar_mutations_3.png",
        "x": -167,
        "y": 233,
        "group": "allegiance1",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_allegiance_lunar_plant_gear_1",
        "title": "Лунный страж I",
        "desc": "Лунная преданность. [ 2 ] Если на Вормвуда надета броня из светлоцвета, враг, атакующий его, будет на время остановлен лозами, которые не позволят противнику двигаться.",
        "cond": "Победить небесного защитника Изучить как минимум семь навыков с правой стороны",
        "icon": "assets/skills/wormwood/wormwood_allegiance_lunar_plant_gear_1.png",
        "x": 219.5,
        "y": 193,
        "group": "allegiance2",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_allegiance_lunar_plant_gear_2"
        ],
        "locks": [
          "wormwood_allegiance_lock_lunar_2",
          "wormwood_allegiance_count_lock_2"
        ]
      },
      {
        "id": "wormwood_allegiance_lunar_plant_gear_2",
        "title": "Лунный страж II",
        "desc": "При атаке оружием ближнего боя или инструментом, созданным около светлокузни, с некоторым шансом появятся щупальца, которые нанесут 85 единиц урона один раз.",
        "cond": "Изучить навык \"Лунный страж I\"",
        "icon": "assets/skills/wormwood/wormwood_allegiance_lunar_plant_gear_2.png",
        "x": 219.5,
        "y": 233,
        "group": "allegiance2",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_armor_bramble",
        "title": "Мастер ежевичной оболочки",
        "desc": "Если Вормвуд, надев ежевичную оболочку, совершит три удара по сопернику и не получит урона, броня выпустит шипы (прочность брони от этого не расходуется). Урон от шипов составляет 23 ед.",
        "cond": "Изучить навык \"Мастер ежевичной ловушки\"",
        "icon": "assets/skills/wormwood/wormwood_armor_bramble.png",
        "x": 128,
        "y": 197,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_berrybushcrafting",
        "title": "Создание ягодного куста",
        "desc": "Добавляет рецепт ягодного куста.",
        "cond": "Изучить навык \"Создание саженца\"",
        "icon": "assets/skills/wormwood/wormwood_berrybushcrafting.png",
        "x": -142,
        "y": 10,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_reedscrafting",
          "wormwood_juicyberrybushcrafting"
        ],
        "locks": []
      },
      {
        "id": "wormwood_blooming_farmrange1",
        "title": "Фермерство",
        "desc": "Во время полного цветения дальность \"ухаживания\" за растениями на огороде увеличивается. Также увеличена скорость сбора урожая с огорода.",
        "cond": "Изучить навык \"Распознавание семян\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_farmrange1.png",
        "x": 63,
        "y": 89,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_quick_selffertilizer"
        ],
        "locks": []
      },
      {
        "id": "wormwood_blooming_max_upgrade",
        "title": "Сила цветов",
        "desc": "Финальная стадия цветения длится дольше.",
        "cond": "Изучить навык \"Скачок роста II\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_max_upgrade.png",
        "x": 208,
        "y": 10,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_blooming_photosynthesis"
        ],
        "locks": []
      },
      {
        "id": "wormwood_blooming_overheatprotection",
        "title": "Затеняющее растение",
        "desc": "Вормвуд получает защиту от жары при полном расцвете.",
        "cond": "Изучить навык \"Скачок роста II\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_overheatprotection.png",
        "x": 168,
        "y": 60,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_blooming_photosynthesis",
        "title": "Фотосинтез",
        "desc": "В полном расцвете Вормвуд восстанавливает одну единицу здоровья каждые 10 секунд. Работает только днём (свет от маленькой звезды позволит исцелять себя даже ночью).",
        "cond": "Изучить навык \"Сила цветов\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_photosynthesis.png",
        "x": 223,
        "y": 60,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_blooming_speed1",
        "title": "Скачок роста I",
        "desc": "Вормвуд цветёт немного быстрее.",
        "cond": "Изучить навык \"Распознавание семян\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_speed1.png",
        "x": 108,
        "y": 10,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_blooming_speed2"
        ],
        "locks": []
      },
      {
        "id": "wormwood_blooming_speed2",
        "title": "Скачок роста II",
        "desc": "Вормвуд цветёт гораздо быстрее.",
        "cond": "Изучить навык \"Скачок роста I\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_speed2.png",
        "x": 158,
        "y": 10,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_blooming_max_upgrade",
          "wormwood_blooming_overheatprotection"
        ],
        "locks": []
      },
      {
        "id": "wormwood_blooming_trapbramble",
        "title": "Мастер ежевичной ловушки",
        "desc": "Во время полного цветения ежевичные ловушки перезаряжаются автоматически, пока Вормвуд находится возле них.",
        "cond": "Изучить навык \"Улучшенное самоудобрение\"",
        "icon": "assets/skills/wormwood/wormwood_blooming_trapbramble.png",
        "x": 145,
        "y": 155,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_armor_bramble"
        ],
        "locks": []
      },
      {
        "id": "wormwood_bugs",
        "title": "Друг жуков",
        "desc": "Пчёлы-убийцы и бабочки нейтральны к Вормвуду.",
        "cond": "Изучить навык \"Улучшенное самоудобрение\"",
        "icon": "assets/skills/wormwood/wormwood_bugs.png",
        "x": 51,
        "y": 160,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_identify_plants2",
        "title": "Распознавание семян",
        "desc": "Позволяет заранее определить, что вырастет из посаженного семечка на первой стадии.",
        "cond": "-",
        "icon": "assets/skills/wormwood/wormwood_identify_plants2.png",
        "x": 8,
        "y": 0,
        "group": "gathering",
        "root": true,
        "lock": false,
        "connects": [
          "wormwood_saplingcrafting",
          "wormwood_mushroomplanter_ratebonus1",
          "wormwood_blooming_speed1",
          "wormwood_blooming_farmrange1"
        ],
        "locks": []
      },
      {
        "id": "wormwood_juicyberrybushcrafting",
        "title": "Создание куста сочных ягод",
        "desc": "Добавляет рецепт куста сочных ягод.",
        "cond": "Изучить навык \"Создание ягодного куста\"",
        "icon": "assets/skills/wormwood/wormwood_juicyberrybushcrafting.png",
        "x": -162,
        "y": 58,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_lureplantbulbcrafting",
        "title": "Создание приманкоцвета",
        "desc": "Добавляет рецепт мясистой луковицы.",
        "cond": "Изучить навык \"Создание обезьяньих хвостиков\"",
        "icon": "assets/skills/wormwood/wormwood_lureplantbulbcrafting.png",
        "x": -222,
        "y": 58,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_moon_cap_eating",
        "title": "Лунное грибное облако",
        "desc": "Поедая лунный гриб, Вормвуд создаёт вокруг себя сонное облако Позволяет выращивать лунные грибы на грибных плантациях.",
        "cond": "Изучить навык \"Множитель грибов\"",
        "icon": "assets/skills/wormwood/wormwood_moon_cap_eating.png",
        "x": -62,
        "y": 200,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wormwood_mushroomplanter_ratebonus1",
        "title": "Грибное мастерство I",
        "desc": "Грибы, посаженные Вормвудом в грибные плантации, вырастают немного быстрее.",
        "cond": "Изучить навык \"Распознавание семян\"",
        "icon": "assets/skills/wormwood/wormwood_mushroomplanter_ratebonus1.png",
        "x": -27,
        "y": 70,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_mushroomplanter_ratebonus2"
        ],
        "locks": []
      },
      {
        "id": "wormwood_mushroomplanter_ratebonus2",
        "title": "Грибное мастерство II",
        "desc": "Грибы, посаженные Вормвудом в грибные плантации, вырастают гораздо быстрее.",
        "cond": "Изучить навык \"Грибное мастерство I\"",
        "icon": "assets/skills/wormwood/wormwood_mushroomplanter_ratebonus2.png",
        "x": -82,
        "y": 100,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_mushroomplanter_upgrade",
          "wormwood_syrupcrafting"
        ],
        "locks": []
      },
      {
        "id": "wormwood_mushroomplanter_upgrade",
        "title": "Множитель грибов",
        "desc": "Увеличивает максимальное количество грибов на грибной плантации с 4 до 6.",
        "cond": "Изучить навык \"Грибное мастерство II\"",
        "icon": "assets/skills/wormwood/wormwood_mushroomplanter_upgrade.png",
        "x": -82,
        "y": 155,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_moon_cap_eating"
        ],
        "locks": []
      },
      {
        "id": "wormwood_quick_selffertilizer",
        "title": "Улучшенное самоудобрение",
        "desc": "Вормвуд исцеляется быстрее при помощи компостной обёртки.",
        "cond": "Изучить навык \"Фермерство\"",
        "icon": "assets/skills/wormwood/wormwood_quick_selffertilizer.png",
        "x": 103,
        "y": 125,
        "group": "gathering",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_blooming_trapbramble",
          "wormwood_bugs"
        ],
        "locks": []
      },
      {
        "id": "wormwood_reedscrafting",
        "title": "Создание обезьяньих хвостиков",
        "desc": "Добавляет рецепт обезьяньих хвостиков.",
        "cond": "Изучить навык \"Создание ягодного куста\"",
        "icon": "assets/skills/wormwood/wormwood_reedscrafting.png",
        "x": -192,
        "y": 10,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_lureplantbulbcrafting"
        ],
        "locks": []
      },
      {
        "id": "wormwood_saplingcrafting",
        "title": "Создание саженца",
        "desc": "Добавляет рецепт лунного саженца.",
        "cond": "Изучить навык \"Распознавание семян\"",
        "icon": "assets/skills/wormwood/wormwood_saplingcrafting.png",
        "x": -92,
        "y": 10,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [
          "wormwood_berrybushcrafting"
        ],
        "locks": []
      },
      {
        "id": "wormwood_syrupcrafting",
        "title": "Слабительный сок",
        "desc": "Добавляет рецепт сиропа ипекакуаны.",
        "cond": "Изучить навык \"Грибное мастерство II\"",
        "icon": "assets/skills/wormwood/wormwood_syrupcrafting.png",
        "x": -22,
        "y": 135,
        "group": "crafting",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "winona": {
    "gameChar": "winona",
    "name": "Уинона",
    "head": "assets/chars/winona.png",
    "groups": {
      "midshelf": "Средняя полка",
      "lowshelf": "Нижняя полка",
      "charlie": "Верхняя полка",
      "wagstaff": "Верхняя полка"
    },
    "bounds": {
      "minX": -220,
      "maxX": 220,
      "minY": 5,
      "maxY": 205
    },
    "skills": [
      {
        "id": "winona_battery_efficiency_1",
        "title": "Улучшение генераторов I",
        "desc": "Повысьте эффективность генераторов и Д.Р.А.Г.енераторов на 25%.",
        "cond": "Изучить три навыка на нижней полке",
        "icon": "assets/skills/winona/winona_battery_efficiency_1.png",
        "x": 100,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_battery_efficiency_2"
        ],
        "locks": []
      },
      {
        "id": "winona_battery_efficiency_2",
        "title": "Улучшение генераторов II",
        "desc": "Повысьте эффективность генераторов и Д.Р.А.Г.енераторов на 50%.",
        "cond": "Изучить навык \"Улучшение генераторов I\".",
        "icon": "assets/skills/winona/winona_battery_efficiency_2.png",
        "x": 150,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_battery_efficiency_3"
        ],
        "locks": []
      },
      {
        "id": "winona_battery_efficiency_3",
        "title": "Улучшение генераторов III",
        "desc": "Повысьте эффективность генераторов и Д.Р.А.Г.енераторов на 100%.",
        "cond": "Изучить навык \"Улучшение генераторов II\".",
        "icon": "assets/skills/winona/winona_battery_efficiency_3.png",
        "x": 200,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_battery_idledrain",
        "title": "Энергосбережение",
        "desc": "Генераторы и Д.Р.А.Г.енераторы больше не потребляют энергию, если они не используются. Машины, подключённые к генераторам, не будут потреблять энергию в спящем режиме.",
        "cond": "-",
        "icon": "assets/skills/winona/winona_battery_idledrain.png",
        "x": 125,
        "y": 5,
        "group": "lowshelf",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_catapult_aoe_1",
        "title": "Взрывной залп I",
        "desc": "Зона поражения снарядов катапульт увеличивается на 25%.",
        "cond": "Изучить три навыка на нижней полке",
        "icon": "assets/skills/winona/winona_catapult_aoe_1.png",
        "x": -100,
        "y": 105,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_catapult_aoe_2"
        ],
        "locks": []
      },
      {
        "id": "winona_catapult_aoe_2",
        "title": "Взрывной залп II",
        "desc": "Зона поражения снарядов катапульт увеличивается на 50%.",
        "cond": "Изучить навык \"Взрывной залп I\"",
        "icon": "assets/skills/winona/winona_catapult_aoe_2.png",
        "x": -150,
        "y": 105,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_catapult_aoe_3"
        ],
        "locks": []
      },
      {
        "id": "winona_catapult_aoe_3",
        "title": "Взрывной залп III",
        "desc": "Зона поражения снарядов катапульт увеличивается на 100%.",
        "cond": "Изучить навык \"Взрывной залп II\"",
        "icon": "assets/skills/winona/winona_catapult_aoe_3.png",
        "x": -200,
        "y": 105,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_catapult_boost_1",
        "title": "Огневой вал",
        "desc": "Все катапульты в радиусе действия удобного пульта увеличивают скорость стрельбы на небольшой период времени.",
        "cond": "Изучить три навыка на нижней полке Изучить навык \"Портативность\"",
        "icon": "assets/skills/winona/winona_catapult_boost_1.png",
        "x": 35,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_lowshelf_lock",
          "winona_portable_structures_lock"
        ]
      },
      {
        "id": "winona_catapult_speed_1",
        "title": "Скорострельность I",
        "desc": "Скорость стрельбы катапульт увеличивается на 5%.",
        "cond": "Изучить три навыка на нижней полке",
        "icon": "assets/skills/winona/winona_catapult_speed_1.png",
        "x": -100,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_catapult_speed_2"
        ],
        "locks": []
      },
      {
        "id": "winona_catapult_speed_2",
        "title": "Скорострельность II",
        "desc": "Скорость стрельбы катапульт увеличивается на 10%.",
        "cond": "Изучить навык \"Скорострельность I\"",
        "icon": "assets/skills/winona/winona_catapult_speed_2.png",
        "x": -150,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [
          "winona_catapult_speed_3"
        ],
        "locks": []
      },
      {
        "id": "winona_catapult_speed_3",
        "title": "Скорострельность III",
        "desc": "Скорость стрельбы катапульт увеличивается на 20%.",
        "cond": "Изучить навык \"Скорострельность II\"",
        "icon": "assets/skills/winona/winona_catapult_speed_3.png",
        "x": -200,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_catapult_volley_1",
        "title": "Точное наведение",
        "desc": "Все катапульты в радиусе действия удобного пульта стреляют в выбранную цель.",
        "cond": "Изучить три навыка на нижней полке Изучить навык \"Портативность\"",
        "icon": "assets/skills/winona/winona_catapult_volley_1.png",
        "x": -35,
        "y": 65,
        "group": "midshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_lowshelf_lock",
          "winona_portable_structures_lock"
        ]
      },
      {
        "id": "winona_charlie_1",
        "title": "Теневой охотник I",
        "desc": "Королева разработала дизайн зачарованных очков, которые раскрывают скрытые следы теневой магии. Неужели она хочет, чтобы вы нашли её?",
        "cond": "Изучить шесть навыков на средней и нижней полках",
        "icon": "assets/skills/winona/winona_charlie_1.png",
        "x": -170,
        "y": 165,
        "group": "charlie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_charlie_2",
        "title": "Теневой охотник II",
        "desc": "Станьте более искусным в обнаружении следов теневой магии. Королева будет за вами присматривать.",
        "cond": "Изучить навык \"Теневой охотник I\", но не изучать навык \"Продолжение дела основателя II\"",
        "icon": "assets/skills/winona/winona_charlie_2.png",
        "x": -220,
        "y": 205,
        "group": "charlie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_charlie_2_lock"
        ]
      },
      {
        "id": "winona_charlie_2_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -210,
        "y": 165,
        "group": "charlie",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_gadget_recharge",
        "title": "Быстрый заряд",
        "desc": "Машины, расположенные рядом с генератором или Д.Р.А.Г.енератором, перезаряжаются на 100% быстрее.",
        "cond": "Изучить навык \"Портативность\"",
        "icon": "assets/skills/winona/winona_gadget_recharge.png",
        "x": 50,
        "y": 5,
        "group": "lowshelf",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_lowshelf_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -220,
        "y": 35,
        "group": "lowshelf",
        "root": true,
        "lock": true,
        "connects": [
          "winona_catapult_speed_1",
          "winona_catapult_aoe_1",
          "winona_battery_efficiency_1"
        ],
        "locks": []
      },
      {
        "id": "winona_lunar_1",
        "title": "Д.Р.А.Г.енератор на осколках просветления",
        "desc": "Научитесь использовать осколки просветления в качестве топлива для Д.Р.А.Г.енератора.",
        "cond": "Изучить шесть навыков на средней и нижней полках",
        "icon": "assets/skills/winona/winona_lunar_1.png",
        "x": 120,
        "y": 165,
        "group": "wagstaff",
        "root": false,
        "lock": false,
        "connects": [
          "winona_lunar_2"
        ],
        "locks": []
      },
      {
        "id": "winona_lunar_2",
        "title": "Д.Р.А.Г.енератор на чистом сиянии",
        "desc": "Научитесь использовать чистое сияние в качестве топлива для Д.Р.А.Г.енератора.",
        "cond": "Изучить навык \"Генератор на топливе ужаса\"",
        "icon": "assets/skills/winona/winona_lunar_2.png",
        "x": 110,
        "y": 205,
        "group": "wagstaff",
        "root": false,
        "lock": false,
        "connects": [
          "winona_lunar_3"
        ],
        "locks": []
      },
      {
        "id": "winona_lunar_3",
        "title": "Выстрел просветления",
        "desc": "Используйте удобный пульт, чтобы выбрать цель для выстрела из катапульты, наполненного лунной эссенцией.",
        "cond": "Изучить навыки \"Портативность\" и \"Д.Р.А.Г.енератор на чистом сиянии\"",
        "icon": "assets/skills/winona/winona_lunar_3.png",
        "x": 60,
        "y": 205,
        "group": "wagstaff",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_lunar_3_lock",
          "winona_portable_structures_lock"
        ]
      },
      {
        "id": "winona_lunar_3_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 60,
        "y": 165,
        "group": "wagstaff",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_midshelf_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -220,
        "y": 135,
        "group": "midshelf",
        "root": true,
        "lock": true,
        "connects": [
          "winona_shadow_1",
          "winona_charlie_1",
          "winona_lunar_1",
          "winona_wagstaff_1"
        ],
        "locks": []
      },
      {
        "id": "winona_portable_structures",
        "title": "Портативность",
        "desc": "Легко переносите свои машины и узнайте, как сделать удобный пульт для дистанционного управления катапультами.",
        "cond": "-",
        "icon": "assets/skills/winona/winona_portable_structures.png",
        "x": 0,
        "y": 5,
        "group": "lowshelf",
        "root": true,
        "lock": false,
        "connects": [
          "winona_gadget_recharge"
        ],
        "locks": []
      },
      {
        "id": "winona_portable_structures_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 0,
        "y": 85,
        "group": "midshelf",
        "root": true,
        "lock": true,
        "connects": [
          "winona_catapult_volley_1",
          "winona_catapult_boost_1"
        ],
        "locks": []
      },
      {
        "id": "winona_shadow_1",
        "title": "Генератор на топливе ужаса",
        "desc": "Научитесь использовать топливо ужаса в качестве топлива для генератора.",
        "cond": "Изучить шесть навыков на средней и нижней полках",
        "icon": "assets/skills/winona/winona_shadow_1.png",
        "x": -120,
        "y": 165,
        "group": "charlie",
        "root": false,
        "lock": false,
        "connects": [
          "winona_shadow_2"
        ],
        "locks": []
      },
      {
        "id": "winona_shadow_2",
        "title": "Генератор на чистом ужасе",
        "desc": "Научитесь использовать чистый ужас в качестве топлива для генератора.",
        "cond": "Изучить навык \"Генератор на топливе ужаса\"",
        "icon": "assets/skills/winona/winona_shadow_2.png",
        "x": -110,
        "y": 205,
        "group": "charlie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_shadow_3",
        "title": "Выстрел тьмы",
        "desc": "Используйте удобный пульт, чтобы выбрать цель для выстрела из катапульты, наполненного теневой магией.",
        "cond": "Изучить навыки \"Портативность\" и \"Генератор на чистом ужасе\"",
        "icon": "assets/skills/winona/winona_shadow_3.png",
        "x": -60,
        "y": 205,
        "group": "charlie",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_shadow_3_lock",
          "winona_portable_structures_lock"
        ]
      },
      {
        "id": "winona_shadow_3_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -60,
        "y": 165,
        "group": "charlie",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_spotlight_heated",
        "title": "Горячий свет",
        "desc": "Улучшите свои прожекторы, чтобы они излучали тепло, когда на улице холодно.",
        "cond": "-",
        "icon": "assets/skills/winona/winona_spotlight_heated.png",
        "x": -125,
        "y": 5,
        "group": "lowshelf",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_spotlight_range",
        "title": "Обширный свет",
        "desc": "Площадь света, создаваемого прожекторами, увеличивается.",
        "cond": "-",
        "icon": "assets/skills/winona/winona_spotlight_range.png",
        "x": -75,
        "y": 5,
        "group": "lowshelf",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_wagstaff_1",
        "title": "Продолжение дела основателя I",
        "desc": "Создайте устройство, вдохновлённое разработками загадочного основателя, для поиска тайных хранилищ. Овладейте всеми технологиями, которые можно найти в тайниках.",
        "cond": "Изучить шесть навыков на средней и нижней полках",
        "icon": "assets/skills/winona/winona_wagstaff_1.png",
        "x": 170,
        "y": 165,
        "group": "wagstaff",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "winona_wagstaff_2",
        "title": "Продолжение дела основателя II",
        "desc": "Расширьте возможности своих очков, чтобы находить улучшенные тайные хранилища. Овладейте всеми технологиями, которые можно найти в улучшенных тайниках.",
        "cond": "Изучить навык \"Продолжение дела основателя I\", но не изучать навык \"Теневой охотник II\"",
        "icon": "assets/skills/winona/winona_wagstaff_2.png",
        "x": 220,
        "y": 205,
        "group": "wagstaff",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "winona_wagstaff_2_lock"
        ]
      },
      {
        "id": "winona_wagstaff_2_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 210,
        "y": 165,
        "group": "wagstaff",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wurt": {
    "gameChar": "wurt",
    "name": "Вурт",
    "head": "assets/chars/wurt.png",
    "groups": {
      "amphibian": "Амфибия",
      "swampmaster": "Царство мэрмов",
      "allegiance": "Преданность"
    },
    "bounds": {
      "minX": -205,
      "maxX": 221,
      "minY": 16,
      "maxY": 172
    },
    "skills": [
      {
        "id": "wurt_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 202,
        "y": 172,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_allegiance_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 221,
        "y": 133,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_allegiance_lock_3",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 183,
        "y": 133,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_allegiance_lock_4",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 221,
        "y": 94,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_allegiance_lock_5",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 183,
        "y": 94,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_amphibian_healing_1",
        "title": "Водное заживление I",
        "desc": "Здоровье Вурт медленно восстанавливается, когда она влажная. Чем выше уровень влажности, тем больше восстановление.",
        "cond": "Изучить навык \"Всепогодная чешуя\"",
        "icon": "assets/skills/wurt/wurt_amphibian_healing_1.png",
        "x": -167,
        "y": 55,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_amphibian_healing_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_amphibian_healing_2",
        "title": "Водное заживление II",
        "desc": "Восстанавливайте здоровье от влажности более эффективно.",
        "cond": "Изучить навык \"Водное заживление I\"",
        "icon": "assets/skills/wurt/wurt_amphibian_healing_2.png",
        "x": -167,
        "y": 16,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_amphibian_sanity_1",
        "title": "Плавность ума I",
        "desc": "Рассудок Вурт медленно восстанавливается, когда она влажная. Чем выше уровень влажности, тем больше восстановление.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_amphibian_sanity_1.png",
        "x": -186,
        "y": 172,
        "group": "amphibian",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_amphibian_sanity_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_amphibian_sanity_2",
        "title": "Плавность ума II",
        "desc": "Восстанавливайте рассудок от влажности более эффективно.",
        "cond": "Изучить навык \"Плавность ума I\"",
        "icon": "assets/skills/wurt/wurt_amphibian_sanity_2.png",
        "x": -186,
        "y": 133,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_amphibian_temperature"
        ],
        "locks": []
      },
      {
        "id": "wurt_amphibian_temperature",
        "title": "Всепогодная чешуя",
        "desc": "Влияние влажности на температуру тела сильно уменьшается.",
        "cond": "Изучить навык \"Плавность ума II\"",
        "icon": "assets/skills/wurt/wurt_amphibian_temperature.png",
        "x": -186,
        "y": 94,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_amphibian_thickskin_1",
          "wurt_amphibian_healing_1"
        ],
        "locks": []
      },
      {
        "id": "wurt_amphibian_thickskin_1",
        "title": "Скользкая чешуя I",
        "desc": "Используйте влажность как защиту. При получении урона будет уменьшаться уровень влажности, а не здоровья.",
        "cond": "Изучить навык \"Всепогодная чешуя\"",
        "icon": "assets/skills/wurt/wurt_amphibian_thickskin_1.png",
        "x": -205,
        "y": 55,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_amphibian_thickskin_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_amphibian_thickskin_2",
        "title": "Скользкая чешуя II",
        "desc": "Используйте влажность как защиту более эффективно.",
        "cond": "Изучить навык \"Скользкая чешуя I\"",
        "icon": "assets/skills/wurt/wurt_amphibian_thickskin_2.png",
        "x": -205,
        "y": 16,
        "group": "amphibian",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_civ_1",
        "title": "Народная кормилица I",
        "desc": "Научитесь создавать общее блюдо для водорослей, чтобы стимулировать быстрый рост мэрмов.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_civ_1.png",
        "x": -30,
        "y": 55,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_civ_1_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_civ_1_2",
        "title": "Народная кормилица II",
        "desc": "Научитесь создавать улучшенное общее блюдо для водорослей, в которое помещается ещё больше водорослей для ещё более быстрого роста мэрмов.",
        "cond": "Изучить навык \"Народная кормилица I\"",
        "icon": "assets/skills/wurt/wurt_civ_1_2.png",
        "x": -30,
        "y": 16,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_civ_2",
        "title": "Трудолюбивые мэрмы I",
        "desc": "Научитесь создавать сарай для примитивных инструментов, чтобы ваши мэрмы-рабочие использовали примитивные инструменты.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_civ_2.png",
        "x": 8,
        "y": 55,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_civ_2_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_civ_2_2",
        "title": "Трудолюбивые мэрмы II",
        "desc": "Научитесь создавать сарай для чуть менее примитивных инструментов, чтобы ваши мэрмы-рабочие использовали чуть менее примитивные инструменты.",
        "cond": "Изучить навык \"Трудолюбивые мэрмы I\"",
        "icon": "assets/skills/wurt/wurt_civ_2_2.png",
        "x": 8,
        "y": 16,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_civ_3",
        "title": "Твердолобость I",
        "desc": "Научитесь создавать оружейную мэрмов, чтобы ваши мэрмы-стражники носили шлемы болотных борцов.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_civ_3.png",
        "x": 46,
        "y": 55,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_civ_3_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_civ_3_2",
        "title": "Твердолобость II",
        "desc": "Научитесь создавать улучшенную оружейную мэрмов, чтобы ваши мэрмы-стражники носили шлемы болотных воинов.",
        "cond": "Изучить навык \"Твердолобость I\"",
        "icon": "assets/skills/wurt/wurt_civ_3_2.png",
        "x": 46,
        "y": 16,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_lunar_allegiance_1",
        "title": "Лунная мутация мэрмов",
        "desc": "Лунная преданность. [ 1 ] Одарите своих верных мэрмов чудесным даром лунной мутации, скормив им лунные осколки. Наделите своих мэрмов-мутантов силой сквозного урона, используя чистое сияние.",
        "cond": "Изучить минимум 12 навыков Победить небесного защитника Не изучать теневые навыки",
        "icon": "assets/skills/wurt/wurt_lunar_allegiance_1.png",
        "x": 183,
        "y": 55,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_lunar_allegiance_2"
        ],
        "locks": [
          "wurt_allegiance_lock_1",
          "wurt_allegiance_lock_3",
          "wurt_allegiance_lock_5"
        ]
      },
      {
        "id": "wurt_lunar_allegiance_2",
        "title": "Мутация земли",
        "desc": "Превратите любой клочок земли в славное-преславное болото.",
        "cond": "Изучить навык \"Лунная мутация мэрмов\"",
        "icon": "assets/skills/wurt/wurt_lunar_allegiance_2.png",
        "x": 183,
        "y": 16,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_merm_flee",
        "title": "Разумные болотные воины",
        "desc": "Мэрмы-стражники будут выходить из боя, если у них останется мало здоровья, и будут ждать исцеления.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_merm_flee.png",
        "x": -79.2,
        "y": 35.5,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_merm_king_hunger_1",
        "title": "Сытый король I",
        "desc": "Увеличьте максимальный уровень сытости короля мэрмов.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_merm_king_hunger_1.png",
        "x": 61,
        "y": 172,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_merm_king_hunger_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_merm_king_hunger_2",
        "title": "Сытый король II",
        "desc": "Увеличьте максимальный уровень сытости короля мэрмов ещё больше.",
        "cond": "Изучить навык \"Сытый король I\"",
        "icon": "assets/skills/wurt/wurt_merm_king_hunger_2.png",
        "x": 61,
        "y": 133,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_merm_king_hunger_3"
        ],
        "locks": []
      },
      {
        "id": "wurt_merm_king_hunger_3",
        "title": "Сытый король III",
        "desc": "Замедлите пищеварение короля мэрмов, и ему будет требоваться больше времени, чтобы проголодаться.",
        "cond": "Изучить навык \"Сытый король II\"",
        "icon": "assets/skills/wurt/wurt_merm_king_hunger_3.png",
        "x": 61,
        "y": 94,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_mermkingcrown",
        "title": "Корона для короля",
        "desc": "Подарите ему корону, которую носили давно ушедшие в прошлое короли, и ваши мэрмы будут сражаться умнее, чтобы продлить свою жизнь.",
        "cond": "Изучить навык \"Наплечник для короля\"",
        "icon": "assets/skills/wurt/wurt_mermkingcrown.png",
        "x": 8,
        "y": 133,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_mermkingtrident"
        ],
        "locks": []
      },
      {
        "id": "wurt_mermkingshoulders",
        "title": "Наплечник для короля",
        "desc": "Наденьте на величественные плечи короля каменную броню, чтобы придать вашим мэрмам-воинам ещё больше крепости.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_mermkingshoulders.png",
        "x": 8,
        "y": 172,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_mermkingcrown"
        ],
        "locks": []
      },
      {
        "id": "wurt_mermkingtrident",
        "title": "Трезубец для короля",
        "desc": "Предложите ему это оружие, которым лучше всего владеть в море, и каждый ваш мэрм будет биться за троих.",
        "cond": "Изучить навык \"Корона для короля\"",
        "icon": "assets/skills/wurt/wurt_mermkingtrident.png",
        "x": 8,
        "y": 94,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_mosquito_craft_1",
        "title": "Комариный аноним",
        "desc": "Научитесь создавать игрушку для обнимашек, которая сделает комаров нейтральными по отношению к вам.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_mosquito_craft_1.png",
        "x": -45,
        "y": 172,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [
          "wurt_mosquito_craft_2"
        ],
        "locks": []
      },
      {
        "id": "wurt_mosquito_craft_2",
        "title": "Зудовство I",
        "desc": "Научитесь создавать комариные предметы: комариную бомбу, комариное удобрение и кровяную инъекцию.",
        "cond": "Изучить навык \"Комариный аноним\"",
        "icon": "assets/skills/wurt/wurt_mosquito_craft_2.png",
        "x": -45,
        "y": 133,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_mosquito_craft_3"
        ],
        "locks": []
      },
      {
        "id": "wurt_mosquito_craft_3",
        "title": "Зудовство II",
        "desc": "Научитесь мастерски пользоваться комариными предметами. С помощью комаришки ловите комаров прямо в воздухе.",
        "cond": "Изучить навык \"Зудовство I\"",
        "icon": "assets/skills/wurt/wurt_mosquito_craft_3.png",
        "x": -45,
        "y": 94,
        "group": "swampmaster",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_pathfinder",
        "title": "Болотный следопыт",
        "desc": "Выживающие рядом с Вурт будут передвигаться по болоту так же, как она.",
        "cond": "-",
        "icon": "assets/skills/wurt/wurt_pathfinder.png",
        "x": 95.2,
        "y": 35.5,
        "group": "swampmaster",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wurt_shadow_allegiance_1",
        "title": "Теневое воскрешение мэрмов",
        "desc": "Теневая преданность. [ 2 ] Ваши мэрмы могут умереть, но их тени продолжат жить. Наделите теневых мэрмов силой сквозного урона, используя чистый ужас.",
        "cond": "Изучить минимум 12 навыков Победить древнего топливопряда Не изучать лунные навыки",
        "icon": "assets/skills/wurt/wurt_shadow_allegiance_1.png",
        "x": 221,
        "y": 55,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [
          "wurt_shadow_allegiance_2"
        ],
        "locks": [
          "wurt_allegiance_lock_1",
          "wurt_allegiance_lock_2",
          "wurt_allegiance_lock_4"
        ]
      },
      {
        "id": "wurt_shadow_allegiance_2",
        "title": "Порча земли",
        "desc": "Ни одна земля не устоит перед тёмным величием прекрасного болота.",
        "cond": "Изучить навык \"Теневое воскрешение мэрмов\"",
        "icon": "assets/skills/wurt/wurt_shadow_allegiance_2.png",
        "x": 221,
        "y": 16,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "walter": {
    "gameChar": "walter",
    "name": "Уолтер",
    "head": "assets/chars/walter.png",
    "groups": {
      "slingshotammo": "Боеприпасы",
      "camping": "Пионер",
      "slingshotmods": "Рогатка",
      "woby": "Воби"
    },
    "bounds": {
      "minX": -219.5,
      "maxX": 220.7925,
      "minY": 11.5,
      "maxY": 176.5
    },
    "skills": [
      {
        "id": "walter_ammo_bag",
        "title": "Подсумок для боеприпасов",
        "desc": "Добавляет рецепт подсумка, который можно использовать для переноски боеприпасов.",
        "cond": "Изучить как минимум два навыка раздела \"Боеприпасы\"",
        "icon": "assets/skills/walter/walter_ammo_bag.png",
        "x": -159.14705882353,
        "y": 14.5,
        "group": "slingshotammo",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_ammo_lock"
        ]
      },
      {
        "id": "walter_ammo_efficiency",
        "title": "Кузнец боеприпасов",
        "desc": "Позволяет создавать боеприпасы эффективнее (30 штук за создание вместо 20) и быстрее.",
        "cond": "Изучить как минимум два навыка раздела \"Боеприпасы\"",
        "icon": "assets/skills/walter/walter_ammo_efficiency.png",
        "x": -205.25,
        "y": 14.5,
        "group": "slingshotammo",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_ammo_lock"
        ]
      },
      {
        "id": "walter_ammo_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -181.5,
        "y": 53,
        "group": "slingshotammo_crafting",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_ammo_lucky",
        "title": "Счастливые шарики",
        "desc": "Добавляет рецепты пороховых шариков, которые могут нанести двойной урон, и шариков из камня ужаса, которые могут не сломаться после выстрела.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_ammo_lucky.png",
        "x": -143.5,
        "y": 175.5,
        "group": "slingshotammo",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_ammo_lunar",
        "title": "Лунный стрелок",
        "desc": "Лунная преданность. [ 2 ] Добавляет рецепты шариков из чистого сияния, которые имеют особый эффект, и шариков из оболочки светлоцвета, которые наносят большой урон.",
        "cond": "Победить небесного защитника Не изучать теневой навык",
        "icon": "assets/skills/walter/walter_ammo_lunar.png",
        "x": -150.15,
        "y": 93.5,
        "group": "slingshotammo",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_ammo_lunar_lock"
        ]
      },
      {
        "id": "walter_ammo_lunar_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -150.15,
        "y": 132.5,
        "group": "slingshotammo",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_ammo_shadow",
        "title": "Теневой стрелок",
        "desc": "Теневая преданность. [ 3 ] Добавляет рецепты бякерских шариков, которые замедляют врагов, и шариков из чистого ужаса, которые наносят большой урон.",
        "cond": "Победить древнего топливопряда Не изучать лунный навык",
        "icon": "assets/skills/walter/walter_ammo_shadow.png",
        "x": -209.05,
        "y": 93.5,
        "group": "slingshotammo",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_ammo_shadow_lock"
        ]
      },
      {
        "id": "walter_ammo_shadow_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -209.05,
        "y": 132.5,
        "group": "slingshotammo",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_ammo_shattershots",
        "title": "Осколочные шарики",
        "desc": "Добавляет рецепты жалящих шариков и шариков из лунного стекла, которые наносят урон не только самой цели, но и врагам, находящимся рядом с ней.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_ammo_shattershots.png",
        "x": -219.5,
        "y": 175.5,
        "group": "slingshotammo",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_ammo_utility",
        "title": "Полезные шарики",
        "desc": "Добавляет рецепты липких шариков, которые замедляют цель, и электроллических шариков, которые наносят электрический урон.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_ammo_utility.png",
        "x": -181.5,
        "y": 175.5,
        "group": "slingshotammo",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_fire",
        "title": "Любитель костров",
        "desc": "Добавляет рецепт переносного костра, а также улучшает истории Уолтера.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_camp_fire.png",
        "x": -33.777777777778,
        "y": 11.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_firstaid",
        "title": "Полевой медик",
        "desc": "Все предметы лечения восстанавливают Уолтеру на 50% больше здоровья, скорость их применения возрастает. Добавляет рецепт целебного крыла, бинта из крыльев бабочек, который восстанавливает 24 единицы здоровья всем и 36 единиц здоровья Уолтеру с этим навыком. Так же Уолтер получит 10 единиц рассудка за лечение крылом.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_camp_firstaid.png",
        "x": -71.777777777778,
        "y": 11.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 52.672222222222,
        "y": 52.5,
        "group": "camping",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_rope",
        "title": "Верёвкоплёт",
        "desc": "Позволяет создавать верёвку без изучения рецепта, за два пучка срезанной травы и с ускоренной анимацией создания.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_camp_rope.png",
        "x": -71.777777777778,
        "y": 52.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_walterhat",
        "title": "Пионерский стиль",
        "desc": "Улучшает характеристики шляпы пионера, в том числе уменьшает количество рассудка, которое Уолтер теряет при получении урона.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_camp_walterhat.png",
        "x": -33.777777777778,
        "y": 52.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_wobycourier",
        "title": "Воби тут, Воби там",
        "desc": "Воби учится отправляться к другому игроку или складывать предметы в нужный сундук.",
        "cond": "Изучить как минимум три навыка раздела \"Пионер\"",
        "icon": "assets/skills/walter/walter_camp_wobycourier.png",
        "x": 52.672222222222,
        "y": 11.5,
        "group": "camping",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_camp_lock"
        ]
      },
      {
        "id": "walter_camp_wobyholder",
        "title": "Стойка-неустойка",
        "desc": "К сумке Воби добавляется стойка для сушки мяса, в которую можно поместить 3 куска мяса. Стойка будет сушить мясо только в том случае, если Воби находится в большой форме.",
        "cond": "-",
        "icon": "",
        "x": 4.2222222222222,
        "y": 11.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_camp_wobytreat",
        "title": "Особое угощение",
        "desc": "Добавляет рецепт угощения для Воби, которое не портится.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_camp_wobytreat.png",
        "x": 4.2222222222222,
        "y": 52.5,
        "group": "camping",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_slingshot_bands",
        "title": "Продвинутые резинки",
        "desc": "Открывает рецепты размашистой резинки для рогатки, которая увеличивает дальность стрельбы из рогатки на два юнита, а также может быть улучшена до одержимой размашистой резинки.",
        "cond": "Изучить навык \"Базовые улучшения рогатки\"",
        "icon": "assets/skills/walter/walter_slingshot_bands.png",
        "x": -12.666666666667,
        "y": 134.5,
        "group": "slingshotmods",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_slingshot_frames",
        "title": "Продвинутые рамы",
        "desc": "Открывает рецепты рам для рогатки. Тулецитовая рама добавляет вторую ячейку для боеприпасов, а также позволяет использовать особую атаку и усиливает силу магических боеприпасов. Металлическая рама позволяет использовать заряженную атаку (при максимальном натяжении резинки такой заряженный выстрел нанесёт двойной урон), а также может быть улучшена до металлоломовой рамы, в ячейку которой можно складывать неограниченное количество боеприпасов.",
        "cond": "Изучить навык \"Базовые улучшения рогатки\"",
        "icon": "assets/skills/walter/walter_slingshot_frames.png",
        "x": 31.033333333333,
        "y": 134.5,
        "group": "slingshotmods",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_slingshot_handles",
        "title": "Продвинутые ручки",
        "desc": "Открывает рецепты ручек для рогатки. Липкая ручка и желейная ручка ускоряют анимацию атаки, также с ними рогатка больше не выпадает из рук Уолтера. Ручка пустоты повышает скорость стрельбы, если Уолтера не прерывают.",
        "cond": "Изучить навык \"Базовые улучшения рогатки\"",
        "icon": "assets/skills/walter/walter_slingshot_handles.png",
        "x": -56.366666666667,
        "y": 134.5,
        "group": "slingshotmods",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_slingshot_modding",
        "title": "Базовые улучшения рогатки",
        "desc": "Открывает рецепты полевого набора для рогатки и нескольких улучшений: свиной резинки (увеличивает дальность стрельбы на один юнит), костяной рамы (добавляет вторую ячейку для боеприпасов) и паутинной ручки (ускоряет анимацию стрельбы на два кадра).",
        "cond": "-",
        "icon": "assets/skills/walter/walter_slingshot_modding.png",
        "x": -12.666666666667,
        "y": 175.5,
        "group": "slingshotmods",
        "root": true,
        "lock": false,
        "connects": [
          "walter_slingshot_bands",
          "walter_slingshot_handles",
          "walter_slingshot_frames"
        ],
        "locks": []
      },
      {
        "id": "walter_woby_dash",
        "title": "Бойкая болонка",
        "desc": "Воби учится делать рывок по команде (двойное нажатие по клавише движения или по кнопке мыши). Рывок расходует Сытость.",
        "cond": "Изучить навык \"Спешный спаниель\"",
        "icon": "assets/skills/walter/walter_woby_dash.png",
        "x": 197.85,
        "y": 95.5,
        "group": "woby",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_endurance",
        "title": "Ретивый ретривер",
        "desc": "Все затраты сытости Воби уменьшаются на 20%, и она может бегать с большей скоростью (+1).",
        "cond": "-",
        "icon": "assets/skills/walter/walter_woby_endurance.png",
        "x": 128.5,
        "y": 161.83333333333,
        "group": "woby",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_foraging",
        "title": "Собачка-собирательница",
        "desc": "Воби помогает Уолтеру собирать еду с растений, которые собирает он.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_woby_foraging.png",
        "x": 128.5,
        "y": 79.833333333333,
        "group": "woby",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_itemfetcher",
        "title": "Лайка, подбирай-ка",
        "desc": "Воби учится подбирать предметы в свою сумку и приносить Уолтеру боеприпасы, которые не сломались при попадании во врага.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_woby_itemfetcher.png",
        "x": 128.5,
        "y": 120.83333333333,
        "group": "woby",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 197.85,
        "y": 176.5,
        "group": "woby_basics",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_lunar",
        "title": "Лунная Воби",
        "desc": "Лунная преданность. [ 2 ] После рывка Воби автоматически начинает бежать с большей скоростью (+1). Будучи на поверхности ночью или на территории где рассудок заменяется просветлением, не расходует дополнительный запас голода от рывка и ускоренного бега.",
        "cond": "Изучить навык \"Бойкая болонка\" Победить небесного защитника Не изучать теневой навык",
        "icon": "assets/skills/walter/walter_woby_lunar.png",
        "x": 220.7925,
        "y": 13.5,
        "group": "woby",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_woby_lock",
          "walter_woby_lunar_lock"
        ]
      },
      {
        "id": "walter_woby_lunar_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 220.7925,
        "y": 54.5,
        "group": "woby",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_shadow",
        "title": "Теневая Воби",
        "desc": "Теневая преданность. [ 3 ] Рывок Воби становится телепортацией на небольшое расстояние.",
        "cond": "Изучить навык \"Бойкая болонка\" Победить древнего топливопряда Не изучать лунный навык",
        "icon": "assets/skills/walter/walter_woby_shadow.png",
        "x": 176,
        "y": 13.5,
        "group": "woby",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "walter_woby_lock",
          "walter_woby_shadow_lock"
        ]
      },
      {
        "id": "walter_woby_shadow_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 176,
        "y": 54.5,
        "group": "woby",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "walter_woby_sprint",
        "title": "Спешный спаниель",
        "desc": "Если Воби бежит с Уолтером на спине больше трёх секунд, она ускоряется и бежит с увеличенной фиксированной скоростью, пока не остановится. Ускоренный бег ускоряет расход сытости Воби.",
        "cond": "Изучить как минимум два навыка раздела \"Воби\"",
        "icon": "assets/skills/walter/walter_woby_sprint.png",
        "x": 197.85,
        "y": 136.5,
        "group": "woby",
        "root": false,
        "lock": false,
        "connects": [
          "walter_woby_dash"
        ],
        "locks": [
          "walter_woby_lock"
        ]
      },
      {
        "id": "walter_woby_taskaid",
        "title": "Трудолюбивый терьер",
        "desc": "Воби использует свои крепкие рожки для помощи Уолтеру с рубкой дерева и добычей камней. Такой способ добычи будет быстро тратить сытость Воби.",
        "cond": "-",
        "icon": "assets/skills/walter/walter_woby_taskaid.png",
        "x": 128.5,
        "y": 38.833333333333,
        "group": "woby",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      }
    ]
  },
  "wigfrid": {
    "gameChar": "wathgrithr",
    "name": "Вигфрид",
    "head": "assets/chars/wigfrid.png",
    "groups": {
      "allegiance": "Преданность",
      "arsenal": "Арсенал",
      "beefalo": "Всадница",
      "combat": "Устойчивость",
      "songs": "Актриса"
    },
    "bounds": {
      "minX": -215,
      "maxX": 225,
      "minY": 10,
      "maxY": 180
    },
    "skills": [
      {
        "id": "wathgrithr_allegiance_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 202,
        "y": 180,
        "group": "allegiance",
        "root": true,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_allegiance_lunar",
        "title": "Лунный мелодист",
        "desc": "Лунная преданность. [ 4 ] Вигфрид может создавать и использовать просветляющую колыбельную. Под эффектом песни персонажи и существа получают на 10% меньше урона от лунных существ и наносят на 5% больше урона теневым существам.",
        "cond": "Победить небесного защитника Изучить как минимум 12 навыков Не изучать теневой навык",
        "icon": "assets/skills/wigfrid/wathgrithr_allegiance_lunar.png",
        "x": 225,
        "y": 43,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wathgrithr_allegiance_lock_1",
          "wathgrithr_allegiance_lunar_lock_1",
          "wathgrithr_allegiance_lunar_lock_2"
        ]
      },
      {
        "id": "wathgrithr_allegiance_lunar_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 225,
        "y": 141,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_allegiance_lunar_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 225,
        "y": 96,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_allegiance_shadow",
        "title": "Теневая певица",
        "desc": "Теневая преданность. [ 3 ] Вигфрид может создавать и использовать тёмный плач. Под эффектом песни персонажи и существа получают на 10% меньше урона от теневых существ и наносят на 5% больше урона лунным существам.",
        "cond": "Победить древнего топливопряда Изучить как минимум 12 навыков Не изучать лунный навык",
        "icon": "assets/skills/wigfrid/wathgrithr_allegiance_shadow.png",
        "x": 178,
        "y": 43,
        "group": "allegiance",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": [
          "wathgrithr_allegiance_lock_1",
          "wathgrithr_allegiance_shadow_lock_1",
          "wathgrithr_allegiance_shadow_lock_2"
        ]
      },
      {
        "id": "wathgrithr_allegiance_shadow_lock_1",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 178,
        "y": 141,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_allegiance_shadow_lock_2",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": 178,
        "y": 96,
        "group": "allegiance",
        "root": false,
        "lock": true,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_helmet_1",
        "title": "Прочный шлем I",
        "desc": "Боевые и командирские шлемы на Вигфрид теряют на 10% меньше прочности.",
        "cond": "-",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_helmet_1.png",
        "x": -13.5,
        "y": 180,
        "group": "arsenal",
        "root": true,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_helmet_2"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_helmet_2",
        "title": "Прочный шлем II",
        "desc": "Боевые и командирские шлемы на Вигфрид теряют на 20% меньше прочности.",
        "cond": "Изучить навык \"Прочный шлем I\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_helmet_2.png",
        "x": -13.5,
        "y": 142,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_helmet_3"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_helmet_3",
        "title": "Шлем командира",
        "desc": "Вигфрид может создавать шлем командира — шлем, защищающий от отбрасывания.",
        "cond": "Изучить навык \"Прочный шлем II\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_helmet_3.png",
        "x": -13.5,
        "y": 104,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_helmet_4",
          "wathgrithr_arsenal_helmet_5",
          "wathgrithr_arsenal_shield_1"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_helmet_4",
        "title": "Улучшение шлема командира I",
        "desc": "Шлем командира на Вигфрид имеет 8 единиц защиты от сквозного урона.",
        "cond": "Изучить навык \"Шлем командира\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_helmet_4.png",
        "x": 43.5,
        "y": 123,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_helmet_5",
        "title": "Улучшение шлема командира II",
        "desc": "Способность Вигфрид восстанавливать здоровье будет восстанавливать прочность командирского шлема, если она продолжит сражаться с максимальным запасом здоровья.",
        "cond": "Изучить навык \"Шлем командира\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_helmet_5.png",
        "x": 43.5,
        "y": 85,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_shield_1",
        "title": "Боевой щит",
        "desc": "Вигфрид может создавать и использовать боевой щит. Его можно использовать для атаки, блокирования атак и обеспечения дополнительной защиты, когда он экипирован.",
        "cond": "Изучить навык \"Молниеносное копьё\" или \"Шлем командира\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_shield_1.png",
        "x": -33.5,
        "y": 57,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_shield_2",
          "wathgrithr_arsenal_shield_3"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_shield_2",
        "title": "Улучшение боевого щита I",
        "desc": "Время блокирования атак боевого щита увеличено до 2,5 секунд.",
        "cond": "Изучить навык \"Боевой щит\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_shield_2.png",
        "x": -53.5,
        "y": 10,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_shield_3",
        "title": "Улучшение боевого щита II",
        "desc": "После блокировки атаки с помощью боевого щита следующая атака им в течение 5 секунд нанесёт от 15 до 30 единиц урона больше.",
        "cond": "Изучить навык \"Боевой щит\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_shield_3.png",
        "x": -13.5,
        "y": 10,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_spear_1",
        "title": "Благословение Браги I",
        "desc": "Скорость получения вдохновения увеличивается на 25% при атаке боевым или молниеносным копьём.",
        "cond": "-",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_spear_1.png",
        "x": -53.5,
        "y": 180,
        "group": "arsenal",
        "root": true,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_spear_2"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_spear_2",
        "title": "Благословение Браги II",
        "desc": "Скорость получения вдохновения увеличивается на 50% при атаке боевым или молниеносным копьём.",
        "cond": "Изучить навык \"Благословение Браги I\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_spear_2.png",
        "x": -53.5,
        "y": 142,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_spear_3"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_spear_3",
        "title": "Молниеносное копьё",
        "desc": "Вигфрид может создавать молниеносное копьё — электрическое оружие, которое наносит больше урона по мокрым целям.",
        "cond": "Изучить навык \"Благословение Браги II\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_spear_3.png",
        "x": -53.5,
        "y": 104,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_arsenal_spear_4",
          "wathgrithr_arsenal_spear_5",
          "wathgrithr_arsenal_shield_1"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_spear_4",
        "title": "Улучшение молниеносного копья I",
        "desc": "Вигфрид может выполнять рывок молниеносным копьём. Эта атака восстанавливает прочность заряженного копья, если оно поражает цель.",
        "cond": "Изучить навык \"Молниеносное копьё\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_spear_4.png",
        "x": -110.5,
        "y": 123,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_arsenal_spear_5",
        "title": "Улучшение молниеносного копья II",
        "desc": "Вигфрид может зарядить молниеносное копьё, используя связанную статику. Заряженное копьё наносит дополнительно 20 единиц чистого урона и ускоряет Вигфрид на 20%.",
        "cond": "Изучить навык \"Молниеносное копьё\"",
        "icon": "assets/skills/wigfrid/wathgrithr_arsenal_spear_5.png",
        "x": -110.5,
        "y": 85,
        "group": "arsenal",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_beefalo_1",
        "title": "Благородный скакун I",
        "desc": "Бифало приручаются на 15% быстрее.",
        "cond": "-",
        "icon": "assets/skills/wigfrid/wathgrithr_beefalo_1.png",
        "x": 108,
        "y": 180,
        "group": "beefalo",
        "root": true,
        "lock": false,
        "connects": [
          "wathgrithr_beefalo_2"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_beefalo_2",
        "title": "Благородный скакун II",
        "desc": "Бифало позволяют ехать на них верхом на 30% дольше.",
        "cond": "Изучить навык \"Благородный скакун I\"",
        "icon": "assets/skills/wigfrid/wathgrithr_beefalo_2.png",
        "x": 108,
        "y": 142,
        "group": "beefalo",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_beefalo_3"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_beefalo_3",
        "title": "Благородный скакун III",
        "desc": "Верхом на бифало Вигфрид восстанавливает вдохновение до половины шкалы со скоростью 0,35 единиц в секунду.",
        "cond": "Изучить навык \"Благородный скакун II\"",
        "icon": "assets/skills/wigfrid/wathgrithr_beefalo_3.png",
        "x": 108,
        "y": 104,
        "group": "beefalo",
        "root": false,
        "lock": false,
        "connects": [
          "wathgrithr_beefalo_saddle"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_beefalo_saddle",
        "title": "Седло воина",
        "desc": "Вигфрид может создавать седло воина, которое защищает бифало на 40%.",
        "cond": "Изучить навык \"Благородный скакун III\"",
        "icon": "assets/skills/wigfrid/wathgrithr_beefalo_saddle.png",
        "x": 108,
        "y": 65,
        "group": "beefalo",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_combat_defense",
        "title": "Мистическая устойчивость",
        "desc": "Получите божественное благословение, которое даст вам пять единиц защиты от сквозного урона.",
        "cond": "-",
        "icon": "assets/skills/wigfrid/wathgrithr_combat_defense.png",
        "x": -193,
        "y": 22,
        "group": "combat",
        "root": true,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_container",
        "title": "Тубус для боевых песен",
        "desc": "Вигфрид может создавать и использовать тубус для боевых песен — хранилище для песен Вигфрид.",
        "cond": "Держать в инвентаре не менее шести разных боевых песен одновременно",
        "icon": "assets/skills/wigfrid/wathgrithr_songs_container.png",
        "x": -177,
        "y": 142,
        "group": "songs",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_container_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -215,
        "y": 142,
        "group": "songs",
        "root": true,
        "lock": true,
        "connects": [
          "wathgrithr_songs_container"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_instantsong_cd",
        "title": "Бранные слова",
        "desc": "Грубая интерлюдия, поразительный монолог и реприза воина больше не тратят вдохновение, а вместо этого имеют время восстановления, которое составляет 10 секунд для интерлюдии и монолога, и 2,5 минуты для репризы.",
        "cond": "Использовать перечисленные боевые песни не менее 10 раз",
        "icon": "assets/skills/wigfrid/wathgrithr_songs_instantsong_cd.png",
        "x": -177,
        "y": 180,
        "group": "songs",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_instantsong_cd_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -215,
        "y": 180,
        "group": "songs",
        "root": true,
        "lock": true,
        "connects": [
          "wathgrithr_songs_instantsong_cd"
        ],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_revivewarrior",
        "title": "На бис",
        "desc": "Вигфрид может создавать и использовать репризу воина — песню, воскрешающую двух персонажей.",
        "cond": "Хотя бы раз использовать рог бифало",
        "icon": "assets/skills/wigfrid/wathgrithr_songs_revivewarrior.png",
        "x": -177,
        "y": 104,
        "group": "songs",
        "root": false,
        "lock": false,
        "connects": [],
        "locks": []
      },
      {
        "id": "wathgrithr_songs_revivewarrior_lock",
        "title": "Закрытый путь",
        "desc": "Откроется по мере изучения навыков.",
        "cond": "",
        "icon": "",
        "x": -215,
        "y": 104,
        "group": "songs",
        "root": true,
        "lock": true,
        "connects": [
          "wathgrithr_songs_revivewarrior"
        ],
        "locks": []
      }
    ]
  }
};
