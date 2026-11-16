/* Файл собран автоматически: tools/build_data.py — тексты правь в tools/texts_ru.py */
window.CATEGORIES = [
  {
    "id": "all",
    "name": "Все чудовища",
    "short": "Все",
    "icon": "✦",
    "hint": "Полный список: от сезонных гигантов до тварей из разломов"
  },
  {
    "id": "giants",
    "name": "Сезонные гиганты",
    "short": "Гиганты",
    "icon": "❄",
    "hint": "Приходят сами со сменой сезона — от них не спрятаться"
  },
  {
    "id": "raid",
    "name": "Рейдовые боссы",
    "short": "Рейд",
    "icon": "☠",
    "hint": "Те, к кому ходят специально: долгая подготовка, большая добыча"
  },
  {
    "id": "rift",
    "name": "Твари разломов",
    "short": "Разломы",
    "icon": "✧",
    "hint": "Новое зло из лунных и теневых разломов"
  },
  {
    "id": "mini",
    "name": "Мини-боссы",
    "short": "Мини",
    "icon": "❖",
    "hint": "Мелкие, но злые: могут испортить прогулку"
  },
  {
    "id": "progress",
    "name": "Прогресс",
    "short": "Прогресс",
    "icon": "◈",
    "hint": "Параметры прохождения на 100%: боссы, вехи и пять квестовых веток по двум путям — лунному (отшельница, Вагстаф, Небесный защитник) и теневому (Чарли, Древний топливопряд)"
  },
  {
    "id": "chronicle",
    "name": "Хроника охоты",
    "short": "Хроника",
    "icon": "✒",
    "hint": "Все победы по порядку — от первой до последней"
  }
];

window.BOSSES = [
  {
    "slug": "deerclops",
    "name_ru": "Циклоп-олень",
    "name_en": "Deerclops",
    "category": "giants",
    "hp": "4000",
    "damage": "75",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "8",
    "speed": "3",
    "sanity": "-400/мин",
    "drops": "Мясо, Глаз циклопа-оленя, Набросок",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×8",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Глаз циклопа-оленя",
        "en": "Deerclops Eyeball",
        "qty": "",
        "icon": "assets/items/deerclops_eyeball.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Он огромный!!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Обалдеть!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Он выглядит сильнее меня.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Само воплощение смерти!",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ОПАСНОСТЬ! ПРИБЛИЖАЕТСЯ УГРОЗА!",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Лавразиотерии!",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Вот это лось!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Даже я его боюсь.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Лучи пронзят мой клинок и выколют твой глаз!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он, пожалуй, меня переварит!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "У меня когда-то был повар, похожий на него.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Такой большой, такой грубый, весь из себя!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ветвеголовый ветвится",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Даже не думай, тупая громила!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Он не выглядит довольным, флорп.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты! Это ты!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Неужели опять придётся это делать?",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Одноглазый исполин с ледяным дыханием. Всё, что не съест, — разрушит: стены, сундуки, деревья. Его рёв слышно задолго до того, как он выйдет из темноты.",
    "spawn": "Приходит зимой и сам выбирает охотника: трижды рычит — потом идёт к базе.",
    "source": "",
    "art": true
  },
  {
    "slug": "bearger",
    "name_ru": "Медведь-барсук",
    "name_en": "Bearger",
    "category": "giants",
    "hp": "6000",
    "damage": "87.5",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "5",
    "speed": "3",
    "sanity": "-400/мин",
    "drops": "Мясо, Плотный мех, Набросок, Клок шерсти",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×8",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Плотный мех",
        "en": "Thick Fur",
        "qty": "",
        "icon": "assets/items/thick_fur.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Клок шерсти",
        "en": "Fur Tuft",
        "qty": "",
        "icon": "assets/items/fur_tuft.png",
        "chance": "периодически"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Вот это барсук-медведь.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Ого! Хоро-о-оший мишка...",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг не хочет драться с большим медведем.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Он раздавит меня одним ударом. Хотелось бы.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "СКОРАЯ СПЯЧКА",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Это подотряд псообразных... Дальше сказать не могу.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Вот это медведь!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Бери что хочешь.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Зверь или берсерк?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Бежим в горы!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Ох, ты мне совсем не нравишься!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Не ешь меня, прошу, прошу!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Злой линятель",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ну давай, здоровяк!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Бежим!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Глянь на эти острые когти! Надо подойти поближе!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Худшее от медведя и барсука в одном.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Осенний медведь-разоритель. Выгребает еду из сундуков и с земли, ломает стены и впадает в спячку, наевшись до отвала. Просыпается голодным и злым.",
    "spawn": "Появляется осенью, когда миру больше 28 дней, и идёт на запах еды.",
    "source": "",
    "art": true
  },
  {
    "slug": "moose_goose",
    "name_ru": "Лось/Гусь",
    "name_en": "Moose/Goose",
    "category": "giants",
    "hp": "6000",
    "damage": "75",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "5.5",
    "speed": "8",
    "sanity": "",
    "drops": "Мясо, Окорок, Пуховое перо, Набросок",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×6",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Окорок",
        "en": "Drumstick",
        "qty": "×2",
        "icon": "assets/items/drumstick.png",
        "chance": ""
      },
      {
        "ru": "Пуховое перо",
        "en": "Down Feather",
        "qty": "×3-5",
        "icon": "assets/items/down_feather.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Я точно не знаю, что это за тварь.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что за чертовщина...",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Очень странное существо.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Это мерзость.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "РЕЗУЛЬТАТЫ АНАЛИЗА НЕОПРЕДЕЛЕНЫ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Нарекаю его Alces canadensis.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Что бы это ни было, оно точно из Канады.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Что бы это ни было, оно точно с Севера.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Хотела бы я оседлать его в бою.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он совсем не рад нас видеть.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Хотел бы я, чтоб в тебе было меньше лося и больше гуся!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Что ты за зверь такой?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ветвеголовый пискун.",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ох, мамочки!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Это та «Мама-гусыня», о которой говорила Уикер-леди?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты! Вот это должно быть национальным животным Канады!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Такое лицо я никогда не забуду.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Птица-лось, что защищает гнездо с яйцом. Гудком выбивает оружие из рук, а клювом и крыльями раскидывает всё вокруг.",
    "spawn": "На 2–4-й день весны появляется гнездо. Подойдёшь к нему или украдёшь яйцо — прилетит хозяин.",
    "source": "",
    "art": true
  },
  {
    "slug": "dragonfly",
    "name_ru": "Драконья муха",
    "name_en": "Dragonfly",
    "category": "giants",
    "hp": "27500",
    "damage": "75 / 112.5 (кольцо огня)",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "4",
    "speed": "6.5",
    "sanity": "",
    "drops": "Чешуя, Чертёж, Яйцо лавовой личинки, Мясо, Золотой самородок, Красный самоцвет, Синий самоцвет, Фиолетовый самоцвет, Оранжевый самоцвет, Жёлтый самоцвет",
    "loot": [
      {
        "ru": "Чешуя",
        "en": "Scales",
        "qty": "",
        "icon": "assets/items/scales.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Яйцо лавовой личинки",
        "en": "Lavae Egg",
        "qty": "×0-1",
        "icon": "assets/items/lavae_egg.png",
        "chance": "до 1"
      },
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×6",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Золотой самородок",
        "en": "Gold Nugget",
        "qty": "×4-8",
        "icon": "assets/items/gold_nugget.png",
        "chance": ""
      },
      {
        "ru": "Красный самоцвет",
        "en": "Red Gem",
        "qty": "×2",
        "icon": "assets/items/red_gem.png",
        "chance": ""
      },
      {
        "ru": "Синий самоцвет",
        "en": "Blue Gem",
        "qty": "×2",
        "icon": "assets/items/blue_gem.png",
        "chance": ""
      },
      {
        "ru": "Фиолетовый самоцвет",
        "en": "Purple Gem",
        "qty": "×1-2",
        "icon": "assets/items/purple_gem.png",
        "chance": ""
      },
      {
        "ru": "Оранжевый самоцвет",
        "en": "Orange Gem",
        "qty": "×1-2",
        "icon": "assets/items/orange_gem.png",
        "chance": ""
      },
      {
        "ru": "Жёлтый самоцвет",
        "en": "Yellow Gem",
        "qty": "×1-2",
        "icon": "assets/items/yellow_gem.png",
        "chance": ""
      },
      {
        "ru": "Зелёный самоцвет",
        "en": "Green Gem",
        "qty": "×1-2",
        "icon": "assets/items/green_gem.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Вот это дракон-муха!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Она вся из огня!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг запутался... Это дракон-муха или муха-дракон?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Она горит изнутри.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ВЫСОКАЯ ТЕМПЕРАТУРА ОТ МУХОЗВЕРЯ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Это некий мифический вариант двукрылого.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Она сожжёт все деревья, пока я их рубить буду!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Огненная муха.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Ах, дракон! Наконец-то мы встретились!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ну и зануда же ты.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Я для этого не создан.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Бойся меня! Я страшный бес!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Тьфу-муха",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Глянь-ка на этот летающий сварочник!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Чешуйчатым нельзя драться, флорп!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты! Гигантское насекомое!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "О-ох, я так надеялась, что сегодня не придётся уворачиваться от огненных жуков.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Хозяйка лавовых пустошей: плюётся огнём, зовёт выводок лавовых личинок и приходит в ярость, когда их убивают. Одно из самых долгих сражений в игре.",
    "spawn": "Круглый год сидит в своём гнезде в пустошах Бэдлендс. Разбудить её — и драка начнётся.",
    "source": "",
    "art": true
  },
  {
    "slug": "bee_queen",
    "name_ru": "Пчелиная матка",
    "name_en": "Bee Queen",
    "category": "raid",
    "hp": "22500",
    "damage": "60",
    "planar_damage": "",
    "attack_period": "2",
    "attack_range": "4",
    "speed": "5.6",
    "sanity": "",
    "drops": "Мёд, Соты, Жало, Королевское желе, Корона пчелиной королевы, Чертёж, Набросок",
    "loot": [
      {
        "ru": "Мёд",
        "en": "Honey",
        "qty": "×3-4",
        "icon": "assets/items/honey.png",
        "chance": ""
      },
      {
        "ru": "Соты",
        "en": "Honeycomb",
        "qty": "×1-2",
        "icon": "assets/items/honeycomb.png",
        "chance": ""
      },
      {
        "ru": "Жало",
        "en": "Stinger",
        "qty": "×1",
        "icon": "assets/items/stinger.png",
        "chance": ""
      },
      {
        "ru": "Королевское желе",
        "en": "Royal Jelly",
        "qty": "×6-7",
        "icon": "assets/items/royal_jelly.png",
        "chance": ""
      },
      {
        "ru": "Корона пчелиной королевы",
        "en": "Bee Queen Crown",
        "qty": "",
        "icon": "assets/items/bee_queen_crown.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Держи это жало подальше от меня!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Никакой мёд не стоит ТАКОГО!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Это гигантская пчела-леди!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Величава и беспощадна...",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПЕРВАЯ ПЧЕЛА",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Работницы яростно её защищают.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Пчёлы не должны быть такими большими.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Это не я её создал! Правда!",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Сегодня твоя монархия падёт!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Пчёлы нам не друзья!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Твой мёд слишком вкусный, чтобы его не украсть!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Хи-хи-хи! Ты большая пчела!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Большая мама-жужжалка!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Это королева пчёл!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Королева жал!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Если я подружусь с их королевой, может, пчёлы не будут меня жалить!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Это была ужасная идея!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Огромная королева в гигантских сотах. Роями пчёл и лужами мёда выдавливает охотника с арены, а её свита не кончается.",
    "spawn": "Появляется из гигантского улья, если потревожить соты.",
    "source": "",
    "art": true
  },
  {
    "slug": "klaus",
    "name_ru": "Клаус",
    "name_en": "Klaus",
    "category": "raid",
    "hp": "10000",
    "damage": "37.5 (обычно) / 102.8 (в ярости)",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "3",
    "speed": "2.75",
    "sanity": "-100/мин",
    "drops": "Уголь, Олений рог, Мясо монстра, Набросок",
    "loot": [
      {
        "ru": "Уголь",
        "en": "Charcoal",
        "qty": "×1",
        "icon": "assets/items/charcoal.png",
        "chance": ""
      },
      {
        "ru": "Олений рог",
        "en": "Stag Antler",
        "qty": "×1",
        "icon": "assets/items/stag_antler.png",
        "chance": ""
      },
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "×1",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "×2",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Что это вообще за тварь!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Вообще-то кусок угля мне бы очень пригодился!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг не непослушный! Он МОГУЧИЙ!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Я вижу его во сне...",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "У КРАСНОГО МЕШКА ПЛОТИ НЕТ ОПТИЧЕСКИХ ДАТЧИКОВ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Он использует мощное обоняние, чтобы находить добычу.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "У этой штуки нет глаз, а?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Ах, какое великолепно ужасное создание.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Сегодня я освобожу твоих оленей!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Этот злюка запер тех оленей!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Что-то он не очень весёлый.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Разве мы не братья?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Привет!.. Друг?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Убирайся отсюда, ты, большой мерзавец.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "У тебя есть подарки для меня?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты! Ты кто?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Неужели опять то самое время года?",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Старик с мешком подарков и двумя оленями. Олени бьют магией стихий, а сам Клаус не жалеет кулаков. За победу отдаёт мешок с добычей.",
    "spawn": "Появляется из запертого мешка с добычей (Loot Stash) в зимнем лесу.",
    "source": "",
    "art": true
  },
  {
    "slug": "toadstool",
    "name_ru": "Жаба-поганка",
    "name_en": "Toadstool",
    "category": "raid",
    "hp": "52500",
    "damage": "100 / 120 / 150 / 250 (по фазам)",
    "planar_damage": "",
    "attack_period": "3.5",
    "attack_range": "7",
    "speed": "0.6",
    "sanity": "",
    "drops": "Лягушачьи лапки, Мясо, Красный гриб, Зелёный гриб, Синий гриб, Синяя спора, Зелёная спора, Красная спора, Набросок, Грибная кожа",
    "loot": [
      {
        "ru": "Лягушачьи лапки",
        "en": "Frog Legs",
        "qty": "×1",
        "icon": "assets/items/frog_legs.png",
        "chance": ""
      },
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×3",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Красный гриб",
        "en": "Red Cap",
        "qty": "×1",
        "icon": "assets/items/red_cap.png",
        "chance": "+66%"
      },
      {
        "ru": "Зелёный гриб",
        "en": "Green Cap",
        "qty": "×1",
        "icon": "assets/items/green_cap.png",
        "chance": "+66%"
      },
      {
        "ru": "Синий гриб",
        "en": "Blue Cap",
        "qty": "×1",
        "icon": "assets/items/blue_cap.png",
        "chance": "+66%"
      },
      {
        "ru": "Синяя спора",
        "en": "Blue Spore",
        "qty": "×2",
        "icon": "assets/items/blue_spore.png",
        "chance": "+50%"
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Грибная кожа",
        "en": "Shroom Skin",
        "qty": "×1",
        "icon": "assets/items/shroom_skin.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Зелёная спора",
        "en": "Green Spore",
        "qty": "",
        "icon": "assets/items/green_spore.png",
        "chance": ""
      },
      {
        "ru": "Красная спора",
        "en": "Red Spore",
        "qty": "",
        "icon": "assets/items/red_spore.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Фу! Я это целовать не буду!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Он весь в мерзких бородавках и грибке!!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Ба! Жабомужчина прятался, как трус!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Просто проглоти нас целиком и покончи с нашими мучениями.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ЗАСУНЬТЕ ЭТО ОБРАТНО В ЗЕМЛЮ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Он вступил в опасный симбиоз с грибными спорами.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Мне понадобится топор побольше.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Какая мерзость!",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Ха! Наконец-то достойный противник!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ой! Вот это жаба!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Какие у тебя огромные лапы!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "У-у, с тобой будет ВЕСЕЛО!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ква-ква катает друзей!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Я не справлюсь!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Морда красивая, характер плохой.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Настоящее гигантское жабомонстрище!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Я правда должна была помнить что-то вроде тебя!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Гигантская жаба-гриб из пещер. Плюётся спорами, зовёт грибных духов и топчет всё, что растёт на её лугу.",
    "spawn": "Появляется из шляпки мухомора в пещерах. Разбудишь — начнётся долгий бой.",
    "source": "",
    "art": true
  },
  {
    "slug": "antlion",
    "name_ru": "Муравьиный лев",
    "name_en": "Antlion",
    "category": "raid",
    "hp": "6000",
    "damage": "50 / 75 / 100 (по фазам)",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "15",
    "speed": "",
    "sanity": "-40/мин",
    "drops": "Камень пустыни, Мясо, Камни, Безделушки, Чертёж, Набросок",
    "loot": [
      {
        "ru": "Камень пустыни",
        "en": "Desert Stone",
        "qty": "×6-8",
        "icon": "assets/items/desert_stone.png",
        "chance": ""
      },
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×4",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Камни",
        "en": "Rocks",
        "qty": "×2-4",
        "icon": "assets/items/rocks.png",
        "chance": ""
      },
      {
        "ru": "Безделушки",
        "en": "Trinkets",
        "qty": "",
        "icon": "assets/items/trinkets.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Шлем-подъёмник дёрна",
        "en": "Turf-Raiser Helm",
        "qty": "",
        "icon": "assets/items/turf_raiser_helm.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Он чего-то от меня хочет.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Чего тебе надо?!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Страшный монстр — друг?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Ты знаешь какие-нибудь загадки?",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ДЛЯ ОРГАНИКА ОН БОЛЬШОЙ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Ах. Значит, вся сейсмическая активность — твоих рук дело.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Тут всё растёт крупным, а?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "У тебя совсем нет гордости?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Это могучий лев!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ты пушистый. Нам нравится.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "По-моему, он дружелюбный.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Просто скажи, чего ты желаешь.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Привет!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Как там погодка наверху?",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Чего ты хочешь?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Привет!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ах, досада, надеюсь, я не забыла подарок.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Песчаный лев под пустыней. Требует подношений: не получит — устроит землетрясения и провалы прямо под ногами.",
    "spawn": "Живёт в оазисе посреди пустыни. Задобри его камнями или безделушками — или дерись.",
    "source": "",
    "art": true
  },
  {
    "slug": "malbatross",
    "name_ru": "Мальбатрос",
    "name_en": "Malbatross",
    "category": "raid",
    "hp": "5000",
    "damage": "75",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "4.5",
    "speed": "3",
    "sanity": "",
    "drops": "Мясо, Клюв мальбатроса, Перо мальбатроса, Синий самоцвет, Жёлтый самоцвет, Набросок",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×7",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Клюв мальбатроса",
        "en": "Malbatross Bill",
        "qty": "",
        "icon": "assets/items/malbatross_bill.png",
        "chance": ""
      },
      {
        "ru": "Перо мальбатроса",
        "en": "Malbatross Feather",
        "qty": "×3-24",
        "icon": "assets/items/malbatross_feather.png",
        "chance": ""
      },
      {
        "ru": "Синий самоцвет",
        "en": "Blue Gem",
        "qty": "×2",
        "icon": "assets/items/blue_gem.png",
        "chance": ""
      },
      {
        "ru": "Жёлтый самоцвет",
        "en": "Yellow Gem",
        "qty": "",
        "icon": "assets/items/yellow_gem.png",
        "chance": "5%"
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "И правда мерзкая птица!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Э-э... хорошая птичка?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Большая рыба-птица!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Какая отвратительная птица!",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "УЖАСНАЯ ВОДЯНАЯ ПТИЦА ДОЛЖНА УМЕРЕТЬ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Похоже, он из семейства альбатросовых.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Ну конечно, это гигантская птица.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "У меня нет ни малейшего желания драться с этой тварью.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Я сражу четырёхкрылого зверя!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ух ты! Вот это птица!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Трэ маль, и правда.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Сбить его — плохая примета, но что я знаю? Хю-хю!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Большой пискун",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ох, вот это здоровяк!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Плохая птица!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты, глянь на размах крыльев!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ну конечно, это не могла быть просто тихая приятная прогулка на лодке...",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Морской исполин с чудовищным клювом. Бьёт с воздуха и разбивает лодку в щепки, если не успеть увернуться.",
    "spawn": "Появляется у глубоководных отмелей (Deep Bass Shoals) в открытом океане.",
    "source": "",
    "art": true
  },
  {
    "slug": "crab_king",
    "name_ru": "Король крабов",
    "name_en": "Crab King",
    "category": "raid",
    "hp": "12000",
    "damage": "40–90 (клешня) / 20–100 (пушка)",
    "planar_damage": "",
    "attack_period": "",
    "attack_range": "",
    "speed": "",
    "sanity": "",
    "drops": "Мясо, Послание в бутылке, Набор бампера крабьего короля, Раковинный колокол-сопрано, Раковинный колокол-альт, Раковинный колокол-баритон, Ракушки, Чертёж, Набросок, Треснувшая жемчужина",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×5-6",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Послание в бутылке",
        "en": "Message in a Bottle",
        "qty": "×2-4",
        "icon": "assets/items/message_in_a_bottle.png",
        "chance": ""
      },
      {
        "ru": "Набор бампера крабьего короля",
        "en": "Crab King Bumper Kit",
        "qty": "×8",
        "icon": "assets/items/crab_king_bumper_kit.png",
        "chance": ""
      },
      {
        "ru": "Раковинный колокол-сопрано",
        "en": "Soprano Shell Bell",
        "qty": "×3-5",
        "icon": "assets/items/soprano_shell_bell.png",
        "chance": ""
      },
      {
        "ru": "Раковинный колокол-альт",
        "en": "Alto Shell Bell",
        "qty": "×2-4",
        "icon": "assets/items/alto_shell_bell.png",
        "chance": ""
      },
      {
        "ru": "Раковинный колокол-баритон",
        "en": "Baritone Shell Bell",
        "qty": "×1-3",
        "icon": "assets/items/baritone_shell_bell.png",
        "chance": ""
      },
      {
        "ru": "Ракушки",
        "en": "Barnacles",
        "qty": "×2-4",
        "icon": "assets/items/barnacles.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Треснувшая жемчужина",
        "en": "Cracked Pearl",
        "qty": "",
        "icon": "assets/items/cracked_pearl.png",
        "chance": "если жемчужина вставлена"
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Ой! Слишком уж он вспыльчивый.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что-то он не очень рад...",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфгангу и страшно, И голодно.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Кто-то из нас отправится в водяную могилу...",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "МЕШОК ПЛОТИ, ЗАМАСКИРОВАННЫЙ ПОД НЕ-МЕШОК",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Интересно, его размер естественен или вызван лунными мутациями?",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Кажется, мы его потревожили.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Слушай, приятель, может, решим всё миром?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "В бой, проклятое ракообразное!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он выглядит недовольным!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Ох, сколько блюд я мог бы приготовить из столько крабового мяса...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Ещё одна проклятая душа.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Крабик...",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Похоже, он думает, что тут главный.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп... он ворчливый.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "ДА!! Вот это настоящий морской монстр!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "А! Вот ты где, старый ворчун!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Краб-король на ледяном острове. Сначала просит самоцветы, потом зовёт клешни и ракушку-броню, которую не так просто пробить.",
    "spawn": "Вставь 9 самоцветов в его панцирь — и начнётся бой.",
    "source": "",
    "art": true
  },
  {
    "slug": "ancient_fuelweaver",
    "name_ru": "Древний топливопряд",
    "name_en": "Ancient Fuelweaver",
    "category": "raid",
    "hp": "16000",
    "damage": "100 (прямой) / 80 (костяной удар)",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "2.4",
    "speed": "4.2",
    "sanity": "-400/мин",
    "drops": "Окаменелости, Теневое кадило, Костяной шлем, Костяная броня, Кошмарное топливо, Цветок, Набросок, Теневой атриум",
    "loot": [
      {
        "ru": "Окаменелости",
        "en": "Fossils",
        "qty": "×8",
        "icon": "assets/items/fossils.png",
        "chance": ""
      },
      {
        "ru": "Теневое кадило",
        "en": "Shadow Thurible",
        "qty": "×4-6",
        "icon": "assets/items/shadow_thurible.png",
        "chance": ""
      },
      {
        "ru": "Теневой атриум",
        "en": "Shadow Atrium",
        "qty": "",
        "icon": "assets/items/shadow_atrium.png",
        "chance": "если покинуть бой"
      },
      {
        "ru": "Костяной шлем",
        "en": "Bone Helm",
        "qty": "",
        "icon": "assets/items/bone_helm.png",
        "chance": ""
      },
      {
        "ru": "Костяная броня",
        "en": "Bone Armor",
        "qty": "",
        "icon": "assets/items/bone_armor.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Цветок",
        "en": "Flower",
        "qty": "",
        "icon": "assets/items/flower.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Почему он обязательно такой огромный?",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Это просто кости и тень.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Страшный человек!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Ты тоже скорбишь?",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "Я УНИЧТОЖУ ТЕБЯ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Мы могли бы многому научиться друг у друга.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Эта топливная дрянь ударила ему в голову.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Сила Атриума вернула ему разум.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Это не безмозглый зверь!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Придётся — будем защищаться.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Этот бой лёгким не будет.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Потанцуем, милейший демон?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "А-ах! Большой костяной рёвун!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Есть ко мне счёт, приятель? Ха!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп, о-он настоящий!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Может, он знает что-то о жук-людях, что жили здесь!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Это была ОЧЕНЬ плохая идея.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Скелет в мантии из тени, страж Древних врат. Ткёт топливо из чужого страха и запирает охотника в кокон.",
    "spawn": "Появляется из Странного скелета в Атриуме, когда вставишь теневой атриум.",
    "source": "",
    "art": true
  },
  {
    "slug": "celestial_champion",
    "name_ru": "Небесный защитник",
    "name_en": "Celestial Champion",
    "category": "raid",
    "hp": "10000",
    "damage": "125 (1-я фаза) / 100 (2-я) / 112.5 (3-я)",
    "planar_damage": "",
    "attack_period": "7.5",
    "attack_range": "4.25",
    "speed": "5",
    "sanity": "+100/мин",
    "drops": "Лунный камень, Лунный осколок, Заряженный лунный осколок, Осколок короны просветления, Набросок",
    "loot": [
      {
        "ru": "Лунный камень",
        "en": "Moon Rock",
        "qty": "×5-7",
        "icon": "assets/items/moon_rock.png",
        "chance": ""
      },
      {
        "ru": "Лунный осколок",
        "en": "Moon Shard",
        "qty": "",
        "icon": "assets/items/moon_shard.png",
        "chance": ""
      },
      {
        "ru": "Заряженный лунный осколок",
        "en": "Infused Moon Shard",
        "qty": "",
        "icon": "assets/items/infused_moon_shard.png",
        "chance": ""
      },
      {
        "ru": "Осколок короны просветления",
        "en": "Enlightened Crown Shard",
        "qty": "",
        "icon": "assets/items/enlightened_crown_shard.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Ты заплатишь за то, что разнёс всю эту науку!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Угх, я ЗНАЛА, что не надо было связываться с этой дурацкой научной рухлядью.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Ха! Удары Вольфганга достаточно могучи, чтобы расколоть камень!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Мы сами накликали свою погибель.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "РАЗДАВИТЬ ОРГАНИКОВ! АХАХАХА! СТОП, НЕТ! НЕ МЕНЯ!",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Похоже, наши действия запустили некую защитную систему.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Эй! Куда катишься, а?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Кажется, наши действия заметили.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Мани послал своего величайшего воина бросить мне вызов!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "А-а! Он злится!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Выглядит довольно раздражённым...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Мы начали не очень, да? Хю-хю!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Из Ночного Шара?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Эта штука разнесла всю нашу работу!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глорп! Не делал! Не делал!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты, это космическое существо?!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ах, досада, только не ты...",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Три фазы лунного гнева: каменный тюлень, парящая сфера и, наконец, сам Небесный защитник с лунным клинком. Каждая фаза быстрее предыдущей.",
    "spawn": "Собери Лунный сифон, и Небесный защитник спустится на метеорите.",
    "source": "",
    "art": true
  },
  {
    "slug": "eye_of_terror",
    "name_ru": "Глаз ужаса",
    "name_en": "Eye of Terror",
    "category": "raid",
    "hp": "5000",
    "damage": "62.5",
    "planar_damage": "",
    "attack_period": "",
    "attack_range": "",
    "speed": "4.5",
    "sanity": "-100/мин",
    "drops": "Мясо монстра, Молочные белки, Маска-глаз, Набросок",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "×2-4",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Молочные белки",
        "en": "Milky Whites",
        "qty": "×3-5",
        "icon": "assets/items/milky_whites.png",
        "chance": ""
      },
      {
        "ru": "Маска-глаз",
        "en": "Eye Mask",
        "qty": "",
        "icon": "assets/items/eye_mask.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Целься в глаз!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что у тебя за проблема? Хватит пялиться!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфгангу не нравится большой страшный глаз!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Берегись дурного глаза.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ЗАПУСК ПРОТОКОЛОВ «ТЫК»",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Правый глаз или левый, интересно? Подозреваю, что левый.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Отведай-ка моего топора!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Не смотри на меня, это точно не моё.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Не вырванный ли глаз самого Одина вернулся за местью?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Нам не нравится, как он выглядит...",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "У этого глаза голодный вид...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Что бы он там ни говорил, я не делал!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Бо-ольшой глаз!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Фу, какая мозоль для глаз.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп...",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Вау! Думаешь, он сбежал от гигантской головы?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "По-моему, его тут быть не должно...",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Отделившийся глаз тени, что смотрит сквозь тебя. Пока рядом второй глаз, драться почти безнадёжно.",
    "spawn": "Появляется ночью, пока в мире стоит активный террариум.",
    "source": "",
    "art": true
  },
  {
    "slug": "twins_of_terror",
    "name_ru": "Близнецы ужаса",
    "name_en": "Twins of Terror",
    "category": "raid",
    "hp": "10000",
    "damage": "125",
    "planar_damage": "",
    "attack_period": "",
    "attack_range": "",
    "speed": "4.5",
    "sanity": "-100/мин",
    "drops": "Жёлтый самоцвет, Зелёный самоцвет, Шестерёнки, Оборванные провода, Электрическая штуковина, Кошмарное топливо, Щит ужаса, Набросок",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "×2-4",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Молочные белки",
        "en": "Milky Whites",
        "qty": "×3-5",
        "icon": "assets/items/milky_whites.png",
        "chance": ""
      },
      {
        "ru": "Маска-глаз",
        "en": "Eye Mask",
        "qty": "",
        "icon": "assets/items/eye_mask.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Жёлтый самоцвет",
        "en": "Yellow Gem",
        "qty": "",
        "icon": "assets/items/yellow_gem.png",
        "chance": ""
      },
      {
        "ru": "Зелёный самоцвет",
        "en": "Green Gem",
        "qty": "",
        "icon": "assets/items/green_gem.png",
        "chance": ""
      },
      {
        "ru": "Шестерёнки",
        "en": "Gears",
        "qty": "",
        "icon": "assets/items/gears.png",
        "chance": ""
      },
      {
        "ru": "Оборванные провода",
        "en": "Frazzled Wires",
        "qty": "",
        "icon": "assets/items/frazzled_wires.png",
        "chance": ""
      },
      {
        "ru": "Электрическая штуковина",
        "en": "Electrical Doodad",
        "qty": "",
        "icon": "assets/items/electrical_doodad.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Щит ужаса",
        "en": "Shield of Terror",
        "qty": "",
        "icon": "assets/items/shield_of_terror.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Целься в глаз!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что у тебя за проблема? Хватит пялиться!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфгангу не нравится большой страшный глаз!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Берегись дурного глаза.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ЗАПУСК ПРОТОКОЛОВ «ТЫК»",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Правый глаз или левый, интересно? Подозреваю, что левый.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Отведай-ка моего топора!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Не смотри на меня, это точно не моё.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Не вырванный ли глаз самого Одина вернулся за местью?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Нам не нравится, как он выглядит...",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "У этого глаза голодный вид...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Что бы он там ни говорил, я не делал!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Бо-ольшой глаз!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Фу, какая мозоль для глаз.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп...",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Вау! Думаешь, он сбежал от гигантской головы?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "По-моему, его тут быть не должно...",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Пара теневых глаз, что атакуют сообща. Их нужно бить одновременно, иначе один всё время прикрывает другого.",
    "spawn": "Появляются вместо Ока Ужаса, если заправить террариум кошмарным топливом.",
    "source": "",
    "art": true
  },
  {
    "slug": "shadow_pieces",
    "name_ru": "Теневые шахматы",
    "name_en": "Shadow Pieces",
    "category": "raid",
    "hp": "900",
    "damage": "40–165 (по фигуре и фазе)",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "2.3",
    "speed": "",
    "sanity": "-100/мин",
    "drops": "Кошмарное топливо",
    "loot": [
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "×1-2",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Ночная броня",
        "en": "Night Armour",
        "qty": "",
        "icon": "assets/items/night_armour.png",
        "chance": ""
      },
      {
        "ru": "Тёмный меч",
        "en": "Dark Sword",
        "qty": "",
        "icon": "assets/items/dark_sword.png",
        "chance": ""
      },
      {
        "ru": "Теневой атриум",
        "en": "Shadow Atrium",
        "qty": "",
        "icon": "assets/items/shadow_atrium.png",
        "chance": "только 3-й уровень"
      }
    ],
    "quotes": [],
    "lore": "Тени шахматных фигур: конь, слон и ладья. Каждая бьёт по-своему, и каждая возвращается, пока хватает тьмы.",
    "spawn": "Вызываются в новолуние: разбей молотком шахматную фигуру или мраморную скульптуру.",
    "source": "",
    "art": true,
    "variants": {
      "kind": "shadow_pieces",
      "title": "Фазы фигур",
      "pieces": [
        {
          "id": "knight",
          "name": "Теневой рыцарь",
          "levels": [
            {
              "hp": "900",
              "damage": "40",
              "attack_period": "3",
              "attack_range": "2.3",
              "speed": "7"
            },
            {
              "hp": "2700",
              "damage": "90",
              "attack_period": "2.5",
              "attack_range": "3.2",
              "speed": "9"
            },
            {
              "hp": "8100",
              "damage": "150",
              "attack_period": "2",
              "attack_range": "5",
              "speed": "12"
            }
          ]
        },
        {
          "id": "bishop",
          "name": "Теневой епископ",
          "levels": [
            {
              "hp": "800",
              "damage": "20",
              "attack_period": "15",
              "attack_range": "4",
              "speed": "3"
            },
            {
              "hp": "2500",
              "damage": "35",
              "attack_period": "14",
              "attack_range": "6",
              "speed": "5"
            },
            {
              "hp": "7500",
              "damage": "60",
              "attack_period": "12",
              "attack_range": "8",
              "speed": "7"
            }
          ]
        },
        {
          "id": "rook",
          "name": "Теневая ладья",
          "levels": [
            {
              "hp": "1000",
              "damage": "45",
              "attack_period": "6",
              "attack_range": "8",
              "speed": "7"
            },
            {
              "hp": "4000",
              "damage": "100",
              "attack_period": "5.5",
              "attack_range": "10",
              "speed": "8"
            },
            {
              "hp": "10000",
              "damage": "165",
              "attack_period": "5",
              "attack_range": "13",
              "speed": "11"
            }
          ]
        }
      ],
      "loot": [
        {
          "level": 1,
          "en": "Nightmare Fuel",
          "ru": "Кошмарное топливо",
          "qty": "×1–2",
          "icon": "assets/items/nightmare_fuel.png"
        },
        {
          "level": 2,
          "en": "Nightmare Fuel",
          "ru": "Кошмарное топливо",
          "qty": "×3–5",
          "icon": "assets/items/nightmare_fuel.png"
        },
        {
          "level": 3,
          "en": "Nightmare Fuel",
          "ru": "Кошмарное топливо",
          "qty": "×4–6",
          "icon": "assets/items/nightmare_fuel.png"
        },
        {
          "level": 3,
          "en": "Night Armour",
          "ru": "Ночная броня",
          "qty": "",
          "icon": "assets/items/night_armour.png"
        },
        {
          "level": 3,
          "en": "Dark Sword",
          "ru": "Тёмный меч",
          "qty": "",
          "icon": "assets/items/dark_sword.png"
        },
        {
          "level": 3,
          "en": "Shadow Atrium",
          "ru": "Теневой атриум",
          "qty": "",
          "icon": "assets/items/shadow_atrium.png"
        }
      ]
    }
  },
  {
    "slug": "nightmare_werepig",
    "name_ru": "Кошмарный свин-оборотень",
    "name_en": "Nightmare Werepig",
    "category": "raid",
    "hp": "10000",
    "damage": "12.5 / 75 / 112.5 (по фазам)",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "6",
    "speed": "2.7",
    "sanity": "-400/мин",
    "drops": "Чистый ужас, Кошмарное топливо, Набросок: Кошмарный свин-оборотень, Чертёж, Шлем из камня ужаса, Броня из камня ужаса, Стена из камня ужаса, Каркас колонны ужаса",
    "loot": [
      {
        "ru": "Чистый ужас",
        "en": "Pure Horror",
        "qty": "×4-5",
        "icon": "assets/items/pure_horror.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "×1",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Набросок: Кошмарный свин-оборотень",
        "en": "Nightmare Werepig Sketch",
        "qty": "",
        "icon": "assets/items/nightmare_werepig_sketch.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      },
      {
        "ru": "Броня из камня ужаса",
        "en": "Dreadstone Armor",
        "qty": "",
        "icon": "assets/items/dreadstone_armor.png",
        "chance": ""
      },
      {
        "ru": "Стена из камня ужаса",
        "en": "Dreadstone Wall",
        "qty": "",
        "icon": "assets/items/dreadstone_wall.png",
        "chance": ""
      },
      {
        "ru": "Шлем из камня ужаса",
        "en": "Dreadstone Helm",
        "qty": "",
        "icon": "assets/items/dreadstone_helm.png",
        "chance": ""
      },
      {
        "ru": "Каркас колонны ужаса",
        "en": "Dreadstone Pillar Scaffold",
        "qty": "",
        "icon": "assets/items/dreadstone_pillar_scaffold.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Мне его почти жаль.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Похоже, у кого-то неудачный день.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Злой свин накачал мышцы!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Какое жалкое создание.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "МЕШОК ПЛОТИ ЗАСТРЯЛ. ДАВАЙТЕ ПОКАЖЕМ НА НЕГО ПАЛЬЦЕМ И ПОСМЕЁМСЯ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Боже, как он дошёл до такого состояния?",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Надеюсь, это не заразно.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Ты сунул нос куда не следовало, верно?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Зверя поглотила скверная магия.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он не похож на обычного свина. И даже на обычного свина-оборотня.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Не знаю, бояться мне или жалеть.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Друг или враг?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Застрял. Бедный Крученый Хвост.",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Этот свин знавал лучшие дни.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Ня-а-а!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Мы не можем его так оставить, Воби! Надо ему помочь!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Не стоит мне во всё это лезть.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Свин, которого коснулась тьма: огромный, обросший и невероятно злой. Бьёт с размаху и зовёт стаю.",
    "spawn": "Появляется из треснувшей колонны в пещерах.",
    "source": "",
    "art": true
  },
  {
    "slug": "scrappy_werepig",
    "name_ru": "Металлический свин-оборотень",
    "name_en": "Scrappy Werepig",
    "category": "raid",
    "hp": "10000",
    "damage": "125 (оружие) / 112.5–150 (лазер) / 100 (броня)",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "3",
    "speed": "2.7",
    "sanity": "-400/мин",
    "drops": "Хлам, Расширитель горизонта, Авто-мат-о-чаник, Ржавый шлем-котёл, Набросок, Чертёж, Шлем В.А.Р.Б.И.С., Броня В.А.Р.Б.И.С., Эластиспейсер",
    "loot": [
      {
        "ru": "Хлам",
        "en": "Scrap",
        "qty": "×4",
        "icon": "assets/items/scrap.png",
        "chance": ""
      },
      {
        "ru": "Расширитель горизонта",
        "en": "Horizon Expandinator",
        "qty": "",
        "icon": "assets/items/horizon_expandinator.png",
        "chance": ""
      },
      {
        "ru": "Авто-мат-о-чаник",
        "en": "Auto-Mat-O-Chanic",
        "qty": "",
        "icon": "assets/items/auto_mat_o_chanic.png",
        "chance": ""
      },
      {
        "ru": "Ржавый шлем-котёл",
        "en": "Scrappy Chapauldron",
        "qty": "",
        "icon": "assets/items/scrappy_chapauldron.png",
        "chance": "если был в броне"
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      },
      {
        "ru": "Шлем В.А.Р.Б.И.С.",
        "en": "W.A.R.B.I.S. Head Gear",
        "qty": "",
        "icon": "assets/items/w_a_r_b_i_s_head_gear.png",
        "chance": ""
      },
      {
        "ru": "Броня В.А.Р.Б.И.С.",
        "en": "W.A.R.B.I.S. Armor",
        "qty": "",
        "icon": "assets/items/w_a_r_b_i_s_armor.png",
        "chance": ""
      },
      {
        "ru": "Эластиспейсер",
        "en": "Elastispacer",
        "qty": "",
        "icon": "assets/items/elastispacer.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Не будем его злить.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Может, я о нём ошибалась.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Эй, свин! Вольфганг любит бекон на завтрак.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Он жаждет силы. Быть может, чтобы заполнить пустоту внутри.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "НЕБОЛЬШИЕ УЛУЧШЕНИЯ, НО ВСЁ ЕЩЁ ВОНЮЧИЙ МЕШОК ПЛОТИ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Пока он спокоен. Лучше его не провоцировать.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Эй, приятель. Ты не так уж плохо выглядишь.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Кому-то не помешало бы помыться.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Затишье перед бурей.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он хочет с нами поиграть?",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Возможно, он не так уж и плох.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "И правда освобождён.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Хороший Крученый Хвост?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Похоже, он занят своими делами.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Он мне не нравится.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Не бойся, Воби. Кажется, я могу завоевать его доверие.",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ну, это что-то новенькое.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Железный свин-механик, собранный из хлама. Кидается шестерёнками и не желает стоять на месте.",
    "spawn": "Появляется из шаткой кучи хлама (Teetering Junk Pile).",
    "source": "",
    "art": true
  },
  {
    "slug": "frostjaw",
    "name_ru": "Ледяная челюсть",
    "name_en": "Frostjaw",
    "category": "raid",
    "hp": "8000",
    "damage": "37.5",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "8",
    "speed": "2.3",
    "sanity": "",
    "drops": "Обмен рыбы на Bootleg Getaway — босс не погибает",
    "loot": [
      {
        "ru": "Обмен рыбы на Bootleg Getaway — босс не погибает",
        "en": "",
        "qty": "",
        "icon": "",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Арр, чтоб меня разорвало!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Огонь побеждает лёд в любой день недели.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг сильнее любой рыбы!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Её укус не холоднее реальности.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПРЯЧЕТ СВОЁ МЯСНОЕ ТЕЛО ПОД ХОЛОДНЫМ НЕОРГАНИЧЕСКИМ МАТЕРИАЛОМ. ДОСТОЙНО УВАЖЕНИЯ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Эта тварь нарушила несчётное число законов природы, и я этого не потерплю.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Обычно я люблю подлёдную рыбалку, но не когда рыба кусается в ответ!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Кто вообще придумал это ледяное отродье?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Будь то земля или море — тебя ждёт неглубокая могила.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Может, он просто хочет с нами поиграть.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Выглядит довольно сурово.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Вот это хладнокровный тип, хью-хью!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ледяной Кусака!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ты связалась не с той девицей!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Ррр, плохая рыбка!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Берегись обморожения!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Громила, каких я видывала!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Гигантский обитатель холодных вод: хватает лодку и тянет на дно, не давая опомниться.",
    "spawn": "Появляется из лунки во льду, когда рыбачишь в море.",
    "source": "",
    "art": true
  },
  {
    "slug": "lord_of_the_fruit_flies",
    "name_ru": "Повелитель плодовых мух",
    "name_en": "Lord of the Fruit Flies",
    "category": "raid",
    "hp": "1500",
    "damage": "25",
    "planar_damage": "",
    "attack_period": "2",
    "attack_range": "2",
    "speed": "8",
    "sanity": "-25/мин",
    "drops": "Фрукт дружелюбной мушки, Листовое мясо, Семена растений",
    "loot": [
      {
        "ru": "Фрукт дружелюбной мушки",
        "en": "Friendly Fruit Fly Fruit",
        "qty": "",
        "icon": "assets/items/friendly_fruit_fly_fruit.png",
        "chance": "если в мире нет другого"
      },
      {
        "ru": "Листовое мясо",
        "en": "Leafy Meat",
        "qty": "",
        "icon": "assets/items/leafy_meat.png",
        "chance": ""
      },
      {
        "ru": "Семена растений",
        "en": "Plant Seeds",
        "qty": "×4-8",
        "icon": "assets/items/plant_seeds.png",
        "chance": "+25%"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Эй, хватит обижать растения!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Думаешь, можно ворваться сюда и разгромить мой сад? Это моя работа!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Ай! Большой и жуткий!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Я бы сделала реверанс, но я решила, что ты мне совсем не нравишься.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПОЧЕМУ ЕГО МИНЬОНЫ СЛУШАЮТСЯ ЛУЧШЕ МОИХ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "У меня нет терпения к садовым вредителям!",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Ты пришёл не в тот сад, приятель.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Хм, нынче лордом может стать кто угодно.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Ты не лорд!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он большой задира!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Mon dieu! Он убивает растения!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Хью-хью! От знати я ожидал большей учтивости!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Нет! Не трогай друзей!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Думаешь, можно вот так прийти и командовать в моём саду?",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Ррр, уходи! Это мои растения!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Класс! То есть, э-э... наверное, стоит выдворить его из сада.",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "У меня нет терпения к твоим приставаниям!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Повелитель плодовых мух, что приходит на запах гниющего урожая. Летает, роняет личинок и портит все грядки разом.",
    "spawn": "Появляется, когда рядом растёт 15 и больше взрослых грядок.",
    "source": "",
    "art": true
  },
  {
    "slug": "ancient_guardian",
    "name_ru": "Древний страж",
    "name_en": "Ancient Guardian",
    "category": "raid",
    "hp": "10000",
    "damage": "100",
    "planar_damage": "",
    "attack_period": "2",
    "attack_range": "4.6",
    "speed": "5",
    "sanity": "",
    "drops": "Мясо, Рог стража, Резной сундук, Набросок, Чертёж, Каркас колонны",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×8",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Рог стража",
        "en": "Guardian's Horn",
        "qty": "",
        "icon": "assets/items/guardian_s_horn.png",
        "chance": ""
      },
      {
        "ru": "Резной сундук",
        "en": "Ornate Chest",
        "qty": "",
        "icon": "assets/items/ornate_chest.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Редкий чертёж",
        "en": "Blueprint (rare)",
        "qty": "",
        "icon": "assets/items/blueprint_rare.png",
        "chance": ""
      },
      {
        "ru": "Чертёж",
        "en": "Blueprint",
        "qty": "",
        "icon": "assets/items/blueprint.png",
        "chance": ""
      },
      {
        "ru": "Каркас колонны",
        "en": "Pillar Scaffold",
        "qty": "",
        "icon": "assets/items/pillar_scaffold.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Эта штука выглядит недовольной.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Бедняга. Заперт в этом лабиринте.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Сильный! Как я! Он мне нравится!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Должно быть, ему одиноко в такой тесной клетке.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "У ЭТОГО МЯСА ЕСТЬ ОСТРЫЙ КОНЕЦ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Прочь, зверь!",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Ещё одна бедная душа под проклятием.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Ну надо же, топливо тебя изменило.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Вот чудеса. Давай сразимся!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Переверни эту хмурую рожу в улыбку.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Держись подальше!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Батюшки, ну и грозный же ты.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Не хочу драться!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "С меня уже хватит ужасных тварей!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп... он выглядит ворчливым.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ой, тебя тут совсем одного оставили?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "О-о-о. А, ну да. Ты.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Каменный страж руин с рогом на голове. Спит, пока его не потревожат, а проснувшись — бежит напролом через всё.",
    "spawn": "Живёт в Лабиринте руин. Приходит в ярость, если разбудить.",
    "source": "",
    "art": true
  },
  {
    "slug": "great_depths_worm",
    "name_ru": "Огромный глубинный червь",
    "name_en": "Great Depths Worm",
    "category": "raid",
    "hp": "5000",
    "damage": "10",
    "planar_damage": "10 (у Blighted-версии)",
    "attack_period": "",
    "attack_range": "",
    "speed": "",
    "sanity": "-400/мин",
    "drops": "Мясо монстра, Светящаяся ягода, Набросок",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "×3-5",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Светящаяся ягода",
        "en": "Glow Berry",
        "qty": "×1",
        "icon": "assets/items/glow_berry.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Это большой червь!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Должно быть, это мамаша.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Это червячная мама.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Здесь ничто не вымирает.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "СТОЛЬКО ПУЛЬСИРУЮЩЕЙ МЕРЗКОЙ ПЛОТИ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Эта старше, крупнее... смертоноснее.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Мы справимся с ней, Люс!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Кто выкопал это чудовище?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Змей, достойный моего копья!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ух ты.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Этот червь выглядит голодным!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Червячок-червячок! Хью-хью!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Привет, Большой Виляка!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ну и здоровенный же червяк.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Не ешь меня!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Червь-монстр!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Мы ведь уже встречались, да?",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Исполинский червь из глубин. Выходит на шум, ломает камень и глотает всё, что не успело убежать.",
    "spawn": "Появляется во время нападений червей в пещерах.",
    "source": "",
    "art": true
  },
  {
    "slug": "ancient_guard_tower",
    "name_ru": "Древняя сторожевая башня",
    "name_en": "Ancient Guard Tower",
    "category": "raid",
    "hp": "6000",
    "damage": "75",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "5",
    "speed": "2.85",
    "sanity": "",
    "drops": "Тулецит ×2–3, Осколки тулецита ×1–3, Камни ×2–4, Лунный камень ×2–3, Ядро сторожевой башни, Гнездо для искры, Ворчливый артикулятор, Набросок: Древняя башня",
    "loot": [
      {
        "ru": "Тулецит",
        "en": "Thulecite",
        "qty": "×2-3",
        "icon": "assets/items/thulecite.png",
        "chance": ""
      },
      {
        "ru": "Осколки тулецита",
        "en": "Thulecite Fragments",
        "qty": "×1-3",
        "icon": "assets/items/thulecite_fragments.png",
        "chance": ""
      },
      {
        "ru": "Камни",
        "en": "Rocks",
        "qty": "×2-4",
        "icon": "assets/items/rocks.png",
        "chance": ""
      },
      {
        "ru": "Лунный камень",
        "en": "Moon Rock",
        "qty": "×2-3",
        "icon": "assets/items/moon_rock.png",
        "chance": ""
      },
      {
        "ru": "Ядро сторожевой башни",
        "en": "Guard Tower Core",
        "qty": "×1",
        "icon": "assets/items/guard_tower_core.png",
        "chance": ""
      },
      {
        "ru": "Гнездо для искры",
        "en": "Spark Socket",
        "qty": "×1",
        "icon": "assets/items/spark_socket.png",
        "chance": ""
      },
      {
        "ru": "Ворчливый артикулятор",
        "en": "Cranky Articulator",
        "qty": "×2",
        "icon": "assets/items/cranky_articulator.png",
        "chance": ""
      },
      {
        "ru": "Набросок: Древняя башня",
        "en": "Ancient Guard Tower Figure Sketch",
        "qty": "",
        "icon": "assets/items/ancient_guard_tower_figure_sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Мы, возможно, начали не с того...",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Ну давай же!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфгангу не нравится древний интерьер.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Он не хочет меня здесь... Я его не виню...",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ОТКАЖИСЬ ОТ ЖАЛКИХ СОЮЗОВ И ПРИСОЕДИНЯЙСЯ КО МНЕ!",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Боже, кажется, я активировала древний защитный механизм.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Здоровенная каменная дура.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Ну отлично. Надо было догадаться, что всё не будет так просто.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Твой долг благороден, но я не могу позволить тебе встать у меня на пути!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "А-а-а!! Не раздави нас!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Как я вечно вляпываюсь в такое...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Колонна-убийца!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Злой камень!",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Давай, куча кирпичей!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глорп! Не делал!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ух ты! Башня ожила!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ах, досада. Я знала, что забыла что-то важное.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Древняя сторожевая башня, что оживает на арене и бьёт по площади.",
    "spawn": "Просыпается в Зале ключей Санктума, когда заполнены все четыре колыбели импульса.",
    "source": "DST",
    "art": true
  },
  {
    "slug": "armored_bearger",
    "name_ru": "Бронированный медведь-барсук",
    "name_en": "Armored Bearger",
    "category": "rift",
    "hp": "8000",
    "damage": "87",
    "planar_damage": "30",
    "attack_period": "3",
    "attack_range": "6",
    "speed": "",
    "sanity": "",
    "drops": "Гниль, Чистое сияние, Набросок, Искровой ковчег, Жидкость нуклеации",
    "loot": [
      {
        "ru": "Гниль",
        "en": "Rot",
        "qty": "×3-4",
        "icon": "assets/items/rot.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег (пустой)",
        "en": "Spark Ark Off",
        "qty": "",
        "icon": "assets/items/spark_ark_off.png",
        "chance": "до Небесного наследника"
      },
      {
        "ru": "Жидкость нуклеации",
        "en": "Nucleation Fluid",
        "qty": "",
        "icon": "assets/items/nucleation_fluid.png",
        "chance": "после Небесного наследника"
      },
      {
        "ru": "Чистое сияние",
        "en": "Pure Brilliance",
        "qty": "",
        "icon": "assets/items/pure_brilliance.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег",
        "en": "Spark Ark",
        "qty": "",
        "icon": "assets/items/spark_ark.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Сейчас станет жарко...",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Я вообще-то говорила, что мой лучший друг — медведь?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Нечестно, у гигантского убийцы тоже есть броня?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Не волнуйся. Мы с Эбби избавим тебя от страданий.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ЭТО МЯСО В БРОНЕ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Паразит, похоже, способен менять тело носителя под свои нужды.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Глянь на эти лапищи! Дайте этому здоровяку веточку!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Он стал ещё грубее, чем прежде.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Зверь жаждет мести!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Он стал страшнее!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Надо же, этот кристалл и правда намертво вцепился.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Мне больше нравился голый медведь... едва-едва.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Страшный пушистый большой и злой и вонючий",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ворчун ещё не выпил свою утреннюю чашку кофе.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Плохой мишка.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Медведь-зомби? Класс!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Во второй раз он ещё хуже.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Старый знакомый в новой броне: разломы нарастили на медведе-барсуке камень и тьму. Бьёт больнее и держит удар куда крепче.",
    "spawn": "Появляется из трупа медведя-барсука, в который вселился дух лунного разлома.",
    "source": "",
    "art": true
  },
  {
    "slug": "crystal_deerclops",
    "name_ru": "Кристальный циклоп-олень",
    "name_en": "Crystal Deerclops",
    "category": "rift",
    "hp": "6000",
    "damage": "75",
    "planar_damage": "30",
    "attack_period": "3",
    "attack_range": "5",
    "speed": "",
    "sanity": "-400/мин",
    "drops": "Гниль, Лёд, Чистое сияние, Набросок, Искровой ковчег, Жидкость нуклеации",
    "loot": [
      {
        "ru": "Гниль",
        "en": "Rot",
        "qty": "×3-4",
        "icon": "assets/items/rot.png",
        "chance": ""
      },
      {
        "ru": "Лёд",
        "en": "Ice",
        "qty": "×1-2",
        "icon": "assets/items/ice.png",
        "chance": ""
      },
      {
        "ru": "Чистое сияние",
        "en": "Pure Brilliance",
        "qty": "×1-2",
        "icon": "assets/items/pure_brilliance.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег (пустой)",
        "en": "Spark Ark Off",
        "qty": "",
        "icon": "assets/items/spark_ark_off.png",
        "chance": "до Небесного наследника"
      },
      {
        "ru": "Жидкость нуклеации",
        "en": "Nucleation Fluid",
        "qty": "",
        "icon": "assets/items/nucleation_fluid.png",
        "chance": "после Небесного наследника"
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег",
        "en": "Spark Ark",
        "qty": "",
        "icon": "assets/items/spark_ark.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "У него что-то попало в глаз.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Э-э... без обид, ладно?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг не боится ужасного оленя-монстра с острыми штуками. Правда?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Вынужден продолжать своё проклятое существование... Мне его жаль.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПРОИЗВОДИТ НЕОРГАНИЧЕСКУЮ МАТЕРИЮ? ИНТЕРЕСНО. ВСЁ РАВНО НЕНАВИЖУ ЕГО",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Процесс реанимации, похоже, изменил его физику.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "У него растут сосульки? Наверняка из Квебека.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Это создание знавало лучшие дни.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Зверя изменила странная магия!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Ах! Прости нас!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Никогда не думал, что буду скучать по его прежнему виду...",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Надо же, как ты заострился! Новая стрижка?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ветвеголовый? Что с глазом?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Надо было надеть защитные очки. Или очко?",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Бедный олень. Вытащить колючку из глаза?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ой, кажется, тот бедный Циклоп-олень заболел!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ах. Я забыла, что они иногда так делают.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Циклоп-олень, покрытый лунными кристаллами. Ледяное дыхание стало острее, а шкура — прочнее.",
    "spawn": "Появляется из трупа циклопа-оленя, в который вселился дух лунного разлома.",
    "source": "",
    "art": true
  },
  {
    "slug": "possessed_varg",
    "name_ru": "Одержимый варг",
    "name_en": "Possessed Varg",
    "category": "rift",
    "hp": "3000",
    "damage": "50 (укус) / 20 (холодное пламя)",
    "planar_damage": "30",
    "attack_period": "",
    "attack_range": "",
    "speed": "",
    "sanity": "-400/мин",
    "drops": "Гниль, Чистое сияние, Лунный осколок, Набросок, Искровой ковчег, Жидкость нуклеации",
    "loot": [
      {
        "ru": "Гниль",
        "en": "Rot",
        "qty": "×2-3",
        "icon": "assets/items/rot.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег (пустой)",
        "en": "Spark Ark Off",
        "qty": "",
        "icon": "assets/items/spark_ark_off.png",
        "chance": "до Небесного наследника"
      },
      {
        "ru": "Жидкость нуклеации",
        "en": "Nucleation Fluid",
        "qty": "",
        "icon": "assets/items/nucleation_fluid.png",
        "chance": "после Небесного наследника"
      },
      {
        "ru": "Чистое сияние",
        "en": "Pure Brilliance",
        "qty": "",
        "icon": "assets/items/pure_brilliance.png",
        "chance": ""
      },
      {
        "ru": "Лунный осколок",
        "en": "Moon Shard",
        "qty": "",
        "icon": "assets/items/moon_shard.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Искровой ковчег",
        "en": "Spark Ark",
        "qty": "",
        "icon": "assets/items/spark_ark.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Ну и большие же у тебя светящиеся глаза!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Не переживай, ты всё равно сгоришь в пламени.",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Хороший пёсик-монстр. Не убивай Вольфганга.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Он живёт лишь ради злобы.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ОН ПОЛУЧИЛ ОБНОВЛЕНИЕ ПРОШИВКИ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Его тело кардинально изменилось.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Ну и странный же ты пёс.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Новый облик мне не по нраву.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "В него вселились злые духи!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Это нехороший пёсик!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Его нрав ничуть не улучшился.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Этот Ровер знатно преобразился!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Странный Гав-гав",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Из чьего двора ты сбежал?",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Колючий пёсик.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Этот Варг выглядит неважно...",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Ах, досада, у меня дежавю...",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Варг, которого подчинила тьма разлома. Гончие слушаются его беспрекословно.",
    "spawn": "Появляется из трупа Варга, в который вселился дух лунного разлома.",
    "source": "",
    "art": true
  },
  {
    "slug": "umbral_abomination",
    "name_ru": "Теневая мерзость",
    "name_en": "Umbral Abomination",
    "category": "rift",
    "hp": "16000",
    "damage": "168.75 (портал) / 50 (дреды)",
    "planar_damage": "35 (портал) / 45 (выступ) / 40 (луч)",
    "attack_period": "3",
    "attack_range": "11",
    "speed": "3",
    "sanity": "-100/мин",
    "drops": "Чистый ужас, Кошмарное топливо, Камень ужаса, Тёмные лохмотья, Набросок",
    "loot": [
      {
        "ru": "Чистый ужас",
        "en": "Pure Horror",
        "qty": "×5-6",
        "icon": "assets/items/pure_horror.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "×2-3",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Камень ужаса",
        "en": "Dreadstone",
        "qty": "×4-6",
        "icon": "assets/items/dreadstone.png",
        "chance": ""
      },
      {
        "ru": "Тёмные лохмотья",
        "en": "Dark Tatters",
        "qty": "×4-6",
        "icon": "assets/items/dark_tatters.png",
        "chance": ""
      },
      {
        "ru": "Набросок",
        "en": "Sketch",
        "qty": "",
        "icon": "assets/items/sketch.png",
        "chance": ""
      },
      {
        "ru": "Посох короля",
        "en": "King's Staff",
        "qty": "",
        "icon": "assets/items/king_s_staff.png",
        "chance": "после боя"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Этому нет научного объяснения.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Я что, должна испугаться?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Наконец-то... достойный противник для Могучего Вольфганга.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Бездна смотрит в ответ... и ходит среди нас.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПРЕКЛОНИСЬ ПРЕДО МНОЙ. ВОЗМОЖНО, Я ПОЗВОЛЮ ТЕБЕ УЙТИ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Их зовут многими именами.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Этот бой будет тяжёлым, Люс. Люблю тебя.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "П-привет, приятель... Это Максвелл. Большой поклонник, э-э... того, что ты делаешь.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Наконец-то мы встретились, проклятый! Моя судьба ждёт!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Мы тебя не боимся, задира!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Хотел бы я проснуться от этого кошмара.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Мистер Мрак и Тоска пожаловал в комнату!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Никогда не друг",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Я задам тебе трёпку за то, что ты сделал с Чарли!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Флорпт, может, немножко страшно.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Я не могу перестать на него пялиться!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Пусть это будет в последний раз.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Сгусток тьмы, слепленный из тварей разлома в одно злое целое. Чем дольше бой, тем он крупнее.",
    "spawn": "Вызывается Маренной королевой.",
    "source": "",
    "art": true
  },
  {
    "slug": "celestial_scion",
    "name_ru": "Небесный отпрыск",
    "name_en": "Celestial Scion",
    "category": "rift",
    "hp": "16000",
    "damage": "191.25",
    "planar_damage": "35",
    "attack_period": "",
    "attack_range": "5",
    "speed": "",
    "sanity": "",
    "drops": "Небесный самоцвет, Чистое сияние, Оборванные провода, Шестерёнки, Набросок: Небесный отпрыск, Перчатка, Планшет",
    "loot": [
      {
        "ru": "Небесный самоцвет",
        "en": "Celestial Jewel",
        "qty": "×5",
        "icon": "assets/items/celestial_jewel.png",
        "chance": ""
      },
      {
        "ru": "Чистое сияние",
        "en": "Pure Brilliance",
        "qty": "×5-7",
        "icon": "assets/items/pure_brilliance.png",
        "chance": ""
      },
      {
        "ru": "Оборванные провода",
        "en": "Frazzled Wires",
        "qty": "×2-3",
        "icon": "assets/items/frazzled_wires.png",
        "chance": ""
      },
      {
        "ru": "Шестерёнки",
        "en": "Gears",
        "qty": "×1-2",
        "icon": "assets/items/gears.png",
        "chance": ""
      },
      {
        "ru": "Набросок: Небесный отпрыск",
        "en": "Celestial Scion Sketch",
        "qty": "",
        "icon": "assets/items/celestial_scion_sketch.png",
        "chance": ""
      },
      {
        "ru": "Перчатка",
        "en": "Glove",
        "qty": "",
        "icon": "assets/items/glove.png",
        "chance": "только в первый раз"
      },
      {
        "ru": "Планшет",
        "en": "Clipboard",
        "qty": "",
        "icon": "assets/items/clipboard.png",
        "chance": "только в первый раз"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Тебе мало того, что ты сломал всю науку?!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что нам делать? Тут нечего жечь!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфгангу трудно всё это осмыслить!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Столько боли.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ВЕЛИКОЛЕПНО!",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Любопытная смесь деталей механизма и разумной лунной энергии.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Что это за северное сияние такое?!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Какая гротескность.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Нечестивый гигант! Один выколол бы свой единственный глаз при виде тебя!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Трёхногий космический паук?",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "C'est horrible!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Ты, мерзость из мерзостей!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Друг болит, потому что друг болит",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "В этом нет никакого смысла!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Почему кусочки в яркой лунной штуке хотят меня убить?! Флорт, почему?!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Кто-нибудь спрашивал, почему он такой сердитый?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Я так и не привыкну к этому!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Небесный отпрыск вобрал в себя силу алтаря и не собирается её отдавать.",
    "spawn": "Выходит на бой после ритуала с Лунным сифоном и Небесным защитником.",
    "source": "",
    "art": true
  },
  {
    "slug": "celestial_revenant",
    "name_ru": "Небесный ревенант",
    "name_en": "Celestial Revenant",
    "category": "rift",
    "hp": "8000",
    "damage": "125",
    "planar_damage": "30",
    "attack_period": "7.5",
    "attack_range": "4.25",
    "speed": "5",
    "sanity": "+400/мин",
    "drops": "Лунный камень, Лунный осколок, Заряженный лунный осколок, Чистое сияние",
    "loot": [
      {
        "ru": "Лунный камень",
        "en": "Moon Rock",
        "qty": "×3-5",
        "icon": "assets/items/moon_rock.png",
        "chance": ""
      },
      {
        "ru": "Лунный осколок",
        "en": "Moon Shard",
        "qty": "×2-5",
        "icon": "assets/items/moon_shard.png",
        "chance": ""
      },
      {
        "ru": "Заряженный лунный осколок",
        "en": "Infused Moon Shard",
        "qty": "×2-5",
        "icon": "assets/items/infused_moon_shard.png",
        "chance": ""
      },
      {
        "ru": "Чистое сияние",
        "en": "Pure Brilliance",
        "qty": "×2",
        "icon": "assets/items/pure_brilliance.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Ты выглядишь так же, но иначе.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Он горит белым пламенем!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Большой крепкий шар вернулся за новыми ударами Вольфганга?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Шар смерти горит ярче, чем когда-либо.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ТЫ ИЗМЕНИЛСЯ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Он вернулся, переполненный лунной энергией.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Выглядит злее на этот раз, а, Люс?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Он выглядит мерзопакостнее, чем прежде.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Достанет ли твоих сил на месть, которую ты ищешь?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Кажется, он ворчливее, чем раньше!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Новый и улучшенный! C'est terrible!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Что это он отращивает? Почему светится?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ночной Шар шарик больше света?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Похоже, сейчас лопнет.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Флорпт. Что это за новая штука?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Он стал особенно светящимся, да, Воби?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "В тебе есть что-то необычное.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Небесный ревенант, вернувшийся из света. Бьёт издалека и рассыпается, чтобы собраться снова.",
    "spawn": "Встречается там, где лунный свет пробивает мир насквозь.",
    "source": "",
    "art": true
  },
  {
    "slug": "warbot",
    "name_ru": "В.О.И.Н.Б.О.Т.",
    "name_en": "W.A.R.B.O.T.",
    "category": "rift",
    "hp": "22500",
    "damage": "40/с (луч) · 45 (варблеры)",
    "planar_damage": "",
    "attack_period": "2–4",
    "attack_range": "",
    "speed": "",
    "sanity": "",
    "drops": "Шестерёнки, Электрическая штуковина, Хлам, Набросок В.О.И.Н.Б.О.Т.",
    "loot": [
      {
        "ru": "Шестерёнки",
        "en": "Gears",
        "qty": "×0-1",
        "icon": "assets/items/gears.png",
        "chance": "50%"
      },
      {
        "ru": "Электрическая штуковина",
        "en": "Electrical Doodad",
        "qty": "×0-1",
        "icon": "assets/items/electrical_doodad.png",
        "chance": "50%"
      },
      {
        "ru": "Хлам",
        "en": "Scrap",
        "qty": "×1-2",
        "icon": "assets/items/scrap.png",
        "chance": ""
      },
      {
        "ru": "Набросок В.О.И.Н.Б.О.Т.",
        "en": "W.A.R.B.O.T. Sketch",
        "qty": "",
        "icon": "assets/items/w_a_r_b_o_t_sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Как любопытно!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Что это за куча хлама там внизу?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Вольфганг любит большие разоблачения!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Может, лучше не знать?",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ТЫ КТО?",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Похоже на какую-то машину.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Тебе так же любопытно, как и мне, Люс?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "По мне, так там внизу одни неприятности.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Что он скрывает от нас?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Мы любим сюрпризы!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Какое-то украшение для стола?",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Зная историю, лучше оставить это тайной.",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Что прячет?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Боссман точно что-то затеял.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Флорп! Что это? Покажи мне!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Он это держит в секрете!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Я видела, что там внизу.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Огромная боевая машина Вагстаффа, которая вышла из-под контроля. Стреляет, давит и не знает пощады.",
    "spawn": "Собирается из базового набора и деталей В.О.И.Н.Б.О.Т.",
    "source": "",
    "art": true
  },
  {
    "slug": "shrouded_queen",
    "name_ru": "Маренная королева",
    "name_en": "Shrouded Queen",
    "category": "rift",
    "hp": "18500",
    "damage": "112.25 (ближний) / 90 (снаряды)",
    "planar_damage": "30",
    "attack_period": "2",
    "attack_range": "4.5",
    "speed": "5",
    "sanity": "-400/мин",
    "drops": "Чистый ужас, Кошмарное топливо, Набросок: Маренная королева",
    "loot": [
      {
        "ru": "Чистый ужас",
        "en": "Pure Horror",
        "qty": "×5-6",
        "icon": "assets/items/pure_horror.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "×2-3",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      },
      {
        "ru": "Набросок: Маренная королева",
        "en": "Shrouded Queen Figure Sketch",
        "qty": "",
        "icon": "assets/items/shrouded_queen_figure_sketch.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Дело плохо.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Ты выглядишь иначе... Новая причёска?",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Помнишь, Вольфганг тебе помогал?",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Она потеряла себя.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ХОЗЯИН ПОВРЕЖДЁН",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Они образовали отвратительную троицу.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Во что мы вляпались, Люс?",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Чарли? Ты ещё там?",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Вот, значит, как, Владычица Теней. Что ж... давай сразимся!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Мы знаем, каково тебе! Типа того.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Как она умудряется быть ещё страшнее?",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Сделка заключена! Пора веселиться! Хью-хью!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Как леди может быть три?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Я знаю, ты там, Чарли!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Что не так со страшной ночной леди?",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Ого. Вы теперь королева монстров, мэм? Ваше высочество?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "С каждым разом она всё хуже.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Та, что правит тенью: Чарли в своей истинной форме. Пока её не одолеть — мир не станет прежним.",
    "spawn": "Вызывается теневым разломом.",
    "source": "",
    "art": true
  },
  {
    "slug": "spider_queen",
    "name_ru": "Королева пауков",
    "name_en": "Spider Queen",
    "category": "mini",
    "hp": "2500",
    "damage": "80",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "5",
    "speed": "1.75",
    "sanity": "-400/мин",
    "drops": "Мясо монстра, Шёлк, Паучьи яйца, Паучья шляпа",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "×4",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Паучья шляпа",
        "en": "Spiderhat",
        "qty": "",
        "icon": "assets/items/spiderhat.png",
        "chance": ""
      },
      {
        "ru": "Шёлк",
        "en": "Silk",
        "qty": "",
        "icon": "assets/items/silk.png",
        "chance": ""
      },
      {
        "ru": "Паучьи яйца",
        "en": "Spider Eggs",
        "qty": "",
        "icon": "assets/items/spider_eggs.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "А-А-А-А! Этот паук огромный!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Убить его огнём!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "О нет! Ходячий дом для жуков!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Она величава в своём ужасе.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ПАУКИ ЖИВУТ ПРИ МОНАРХИЧЕСКОЙ СИСТЕМЕ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Должно быть, это центр коллективного разума.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Ты мне не королева!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Пожалуй, я просто уйду с её дороги.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Наконец-то настоящее испытание моих сил.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Мамочка-долгоножка?",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Я не преклоню колено перед такими, как ты!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Ваше величество, прошу, не бейте меня!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ногастая Мама-жук",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Лучше держаться от неё подальше.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Она могучая Королева!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Я никогда не слышал, чтобы у пауков была королева, как интересно!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "И кому только пришло в голову сделать здешних пауков такими огромными?! Я хочу поговорить.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Раздутая королева пауков. Плюётся паутиной, плодит выводок и с каждым пауком рядом становится только злее.",
    "spawn": "Появляется из паучьего логова — или когда паук наестся мяса монстра.",
    "source": "",
    "art": true
  },
  {
    "slug": "treeguard",
    "name_ru": "Энт",
    "name_en": "Treeguard",
    "category": "mini",
    "hp": "2100",
    "damage": "34.65 / 49.5 / 61.875 (по размеру)",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "2.1",
    "speed": "0.735",
    "sanity": "-100/мин",
    "drops": "Мясо монстра, Живой ствол",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Живой ствол",
        "en": "Living Log",
        "qty": "×6",
        "icon": "assets/items/living_log.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Он огромный!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Он выглядит горючим!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Деревянный человек!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Громоздкое чудовище.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ВНИМАНИЕ: ХОДЯЧЕЕ ДЕРЕВО",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Я... даже не знаю.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Прости меня за все те деревья!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Мерзкое создание!",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Это древнее существо леса.",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Откуда оно взялось?!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Я тут не в своей стихии!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Не нужно драться, мой великий друг-дерево!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Привет!.. Привет?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "У деревьев есть глаза!!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Древозверь!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Они пришли мстить!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Даже деревья ополчились против меня!",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Ожившее дерево, мстящее за срубленных сородичей. Медленное, но бьёт так, что летишь через полкарты.",
    "spawn": "Оживает, когда рубят вечнозелёные деревья рядом с ним.",
    "source": "",
    "art": true
  },
  {
    "slug": "varg",
    "name_ru": "Варг",
    "name_en": "Varg",
    "category": "mini",
    "hp": "1800",
    "damage": "50",
    "planar_damage": "",
    "attack_period": "3",
    "attack_range": "5",
    "speed": "5.5",
    "sanity": "",
    "drops": "Зуб гончей, Мясо монстра",
    "loot": [
      {
        "ru": "Зуб гончей",
        "en": "Hound's Tooth",
        "qty": "×1-3",
        "icon": "assets/items/hound_s_tooth.png",
        "chance": ""
      },
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "С тобой, большой пёс, придётся считаться.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Ты большой злой придурок!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Большой щенок!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Истинный оплот зла.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ОН ЖИВЁТ, ЧТОБЫ ЕСТЬ КРУПНЫЕ ВЕЩИ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Одомашнить этого Canis будет увлекательной задачей.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Эта штука в одиночку упряжку потащит.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Вожак!",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Ты ли это, Фенрир?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "По-моему, этот щенок не очень счастлив.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Вожак стаи.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Не стану я пиром для этого зверя!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Большой Злой Гав-гав",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Ну и зубки у этого.",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Какие у него большие зубы!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Он твой друг, Воби?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Полагаю, рано или поздно я должна была тебя встретить.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Огромный волк, что выводит гончих. Сам в бой не рвётся, но его стая не даст продохнуть.",
    "spawn": "Находится по следам — кучкам подозрительной земли (Suspicious Dirt Piles).",
    "source": "",
    "art": true
  },
  {
    "slug": "ewecus",
    "name_ru": "Слизовца",
    "name_en": "Ewecus",
    "category": "mini",
    "hp": "800",
    "damage": "60 (плевок: 5)",
    "planar_damage": "",
    "attack_period": "",
    "attack_range": "",
    "speed": "",
    "sanity": "",
    "drops": "Мясо, Стальная шерсть, Слизь, Навоз",
    "loot": [
      {
        "ru": "Мясо",
        "en": "Meat",
        "qty": "×4",
        "icon": "assets/items/meat.png",
        "chance": ""
      },
      {
        "ru": "Стальная шерсть",
        "en": "Steel Wool",
        "qty": "×2-3",
        "icon": "assets/items/steel_wool.png",
        "chance": ""
      },
      {
        "ru": "Слизь",
        "en": "Phlegm",
        "qty": "×1-2",
        "icon": "assets/items/phlegm.png",
        "chance": ""
      },
      {
        "ru": "Навоз",
        "en": "Manure",
        "qty": "",
        "icon": "assets/items/manure.png",
        "chance": "периодически"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Ну и покрытое коркой животное.",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Мне не нравится твоя морда!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Выглядит таким дружелюбным и пушистым.",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Стоит избавить его от страданий.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ХОТЯ БЫ ОН ПОКРЫТ МЕТАЛЛОМ",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Ovis chalybs, и на редкость злобная особь.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Напоминает маму!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Строптивый и крепкий как гвоздь.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Сколько же мяса там прячется?",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Может, ему просто нужно, чтобы его обняли!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Я люблю хорошую баранину.",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Пфу тебе тоже!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Хрюкозверь",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Вылитый старый бригадир. Ха!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Он выглядит неуютно, флорп.",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Спорим, на самом деле ты большой добряк!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Он крепкий старикан.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Пушистый зверь, что плюётся слизью и обездвиживает охотника, чтобы спокойно доесть.",
    "spawn": "Находится по следам — кучкам подозрительной земли (Suspicious Dirt Piles).",
    "source": "",
    "art": true
  },
  {
    "slug": "krampus",
    "name_ru": "Крампус",
    "name_en": "Krampus",
    "category": "mini",
    "hp": "300",
    "damage": "50",
    "planar_damage": "",
    "attack_period": "1.2",
    "attack_range": "3",
    "speed": "7",
    "sanity": "",
    "drops": "Мясо монстра, Уголь, Мешок Крампуса",
    "loot": [
      {
        "ru": "Мясо монстра",
        "en": "Monster Meat",
        "qty": "",
        "icon": "assets/items/monster_meat.png",
        "chance": ""
      },
      {
        "ru": "Уголь",
        "en": "Charcoal",
        "qty": "×2",
        "icon": "assets/items/charcoal.png",
        "chance": ""
      },
      {
        "ru": "Мешок Крампуса",
        "en": "Krampus Sack",
        "qty": "",
        "icon": "assets/items/krampus_sack.png",
        "chance": "1%"
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Он тянет к моим вещам!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Назад, ты, большой придурок!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Страшный козёл! Бежать!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Привет, мерзкое создание преисподней.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "СТОЙ! ВОР!",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Это мифологический праздничный монстр.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Отвали, гад!",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Тебе меня не поймать!",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Ты меня не пугаешь, козёл!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Верни наши вещи!",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Что за чёрт!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Хе-хе. Без обид?",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Злой Ветвеголовый",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Какая-то... праздничная нечисть?",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Большой задира!!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Эй! Ты рылся в моих припасах?",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Он здорово портит это время года.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Рогатый вор с мешком. Приходит наказывать за жадность и уносит всё, что плохо лежит.",
    "spawn": "Появляется, когда «карма» охотника испорчена слишком сильно.",
    "source": "",
    "art": true
  },
  {
    "slug": "reanimated_skeleton",
    "name_ru": "Оживлённый скелет",
    "name_en": "Reanimated Skeleton",
    "category": "mini",
    "hp": "4000",
    "damage": "100",
    "planar_damage": "",
    "attack_period": "4",
    "attack_range": "2.4",
    "speed": "2.4",
    "sanity": "-400/мин",
    "drops": "Теневой атриум, Окаменелости, Кошмарное топливо",
    "loot": [
      {
        "ru": "Теневой атриум",
        "en": "Shadow Atrium",
        "qty": "×8",
        "icon": "assets/items/shadow_atrium.png",
        "chance": ""
      },
      {
        "ru": "Окаменелости",
        "en": "Fossils",
        "qty": "",
        "icon": "assets/items/fossils.png",
        "chance": ""
      },
      {
        "ru": "Кошмарное топливо",
        "en": "Nightmare Fuel",
        "qty": "",
        "icon": "assets/items/nightmare_fuel.png",
        "chance": ""
      }
    ],
    "quotes": [
      {
        "key": "wilson",
        "name": "Уилсон",
        "text": "Скелет слился с тенями!",
        "head": "assets/chars/wilson.png"
      },
      {
        "key": "willow",
        "name": "Уиллоу",
        "text": "Я вернула тебя, чтобы надрать тебе зад!",
        "head": "assets/chars/willow.png"
      },
      {
        "key": "wolfgang",
        "name": "Вольфганг",
        "text": "Скелет не должен ходить!",
        "head": "assets/chars/wolfgang.png"
      },
      {
        "key": "wendy",
        "name": "Венди",
        "text": "Даже смерть не вечна.",
        "head": "assets/chars/wendy.png"
      },
      {
        "key": "wx78",
        "name": "WX-78",
        "text": "ТЫ БУДЕШЬ УНИЧТОЖЕН",
        "head": "assets/chars/wx78.png"
      },
      {
        "key": "wickerbottom",
        "name": "Уикерботтом",
        "text": "Ошибка, которую нужно исправить.",
        "head": "assets/chars/wickerbottom.png"
      },
      {
        "key": "woodie",
        "name": "Вуди",
        "text": "Это ходячий урок анатомии.",
        "head": "assets/chars/woodie.png"
      },
      {
        "key": "maxwell",
        "name": "Максвелл",
        "text": "Силе теней нет предела.",
        "head": "assets/chars/maxwell.png"
      },
      {
        "key": "wigfrid",
        "name": "Вигфрид",
        "text": "Он жив, чтобы сражаться вновь!",
        "head": "assets/chars/wigfrid.png"
      },
      {
        "key": "webber",
        "name": "Веббер",
        "text": "Не думаю, что он дружелюбный.",
        "head": "assets/chars/webber.png"
      },
      {
        "key": "warly",
        "name": "Уорли",
        "text": "Надо было оставить его спать!",
        "head": "assets/chars/warly.png"
      },
      {
        "key": "wortox",
        "name": "Вортокс",
        "text": "Твой разум не в порядке, но и мой тоже!",
        "head": "assets/chars/wortox.png"
      },
      {
        "key": "wormwood",
        "name": "Вормвуд",
        "text": "Ветки? Или кости?",
        "head": "assets/chars/wormwood.png"
      },
      {
        "key": "winona",
        "name": "Уинона",
        "text": "Эта штука ужасает!",
        "head": "assets/chars/winona.png"
      },
      {
        "key": "wurt",
        "name": "Вурт",
        "text": "Глурп! У него плохая теневая магия!",
        "head": "assets/chars/wurt.png"
      },
      {
        "key": "walter",
        "name": "Уолтер",
        "text": "Настоящий живой скелет!",
        "head": "assets/chars/walter.png"
      },
      {
        "key": "wanda",
        "name": "Ванда",
        "text": "Это была плохая идея. Я сожалею.",
        "head": "assets/chars/wanda.png"
      }
    ],
    "lore": "Оживший скелет древнего существа: собирается из костей и бьёт костями же.",
    "spawn": "Вызывается из Странного скелета теневым атриумом.",
    "source": "",
    "art": true
  }
];

window.CHARACTERS = [
  {
    "key": "wilson",
    "name": "Уилсон",
    "head": "assets/chars/wilson.png"
  },
  {
    "key": "willow",
    "name": "Уиллоу",
    "head": "assets/chars/willow.png"
  },
  {
    "key": "wolfgang",
    "name": "Вольфганг",
    "head": "assets/chars/wolfgang.png"
  },
  {
    "key": "wendy",
    "name": "Венди",
    "head": "assets/chars/wendy.png"
  },
  {
    "key": "wx78",
    "name": "WX-78",
    "head": "assets/chars/wx78.png"
  },
  {
    "key": "wickerbottom",
    "name": "Уикерботтом",
    "head": "assets/chars/wickerbottom.png"
  },
  {
    "key": "woodie",
    "name": "Вуди",
    "head": "assets/chars/woodie.png"
  },
  {
    "key": "wes",
    "name": "Уэс",
    "head": "assets/chars/wes.png"
  },
  {
    "key": "maxwell",
    "name": "Максвелл",
    "head": "assets/chars/maxwell.png"
  },
  {
    "key": "wigfrid",
    "name": "Вигфрид",
    "head": "assets/chars/wigfrid.png"
  },
  {
    "key": "webber",
    "name": "Веббер",
    "head": "assets/chars/webber.png"
  },
  {
    "key": "warly",
    "name": "Уорли",
    "head": "assets/chars/warly.png"
  },
  {
    "key": "wortox",
    "name": "Вортокс",
    "head": "assets/chars/wortox.png"
  },
  {
    "key": "wormwood",
    "name": "Вормвуд",
    "head": "assets/chars/wormwood.png"
  },
  {
    "key": "winona",
    "name": "Уинона",
    "head": "assets/chars/winona.png"
  },
  {
    "key": "wurt",
    "name": "Вурт",
    "head": "assets/chars/wurt.png"
  },
  {
    "key": "walter",
    "name": "Уолтер",
    "head": "assets/chars/walter.png"
  },
  {
    "key": "wanda",
    "name": "Ванда",
    "head": "assets/chars/wanda.png"
  }
];

window.MILESTONE_BRANCHES = [
  {
    "id": "lunar",
    "name": "Лунные квесты",
    "hint": "Путь луны: отшельница, Вагстаф и Небесный защитник."
  },
  {
    "id": "shadow",
    "name": "Теневые квесты",
    "hint": "Путь тьмы: Чарли и Древний топливопряд."
  }
];

window.MILESTONES = {
  "groups": [
    {
      "id": "hermit",
      "branch": "lunar",
      "name": "Квесты отшельницы",
      "icon": "🐚",
      "icon_img": "assets/quests/hermit_group.png",
      "limit": 10,
      "reward": {
        "name": "Жемчужина отшельницы",
        "icon_img": "assets/quests/hermit_pearl.png"
      },
      "hint": "Задания Жемчужной отшельницы (Pearl) на Острове отшельницы. В общий прогресс идёт только жемчужина — её отшельница выдаёт, когда закрыто 10 заданий. После десятого задания отметки больше не ставятся.",
      "items": [
        {
          "id": "hermit_chair",
          "name": "Стул для отшельницы",
          "icon_img": "assets/quests/hermit_chair.png",
          "note": "Построить стул на острове и дождаться, пока она сядет (садится не чаще раза в день)."
        },
        {
          "id": "hermit_home",
          "name": "Дом отшельницы до максимума",
          "icon_img": "assets/quests/hermit_home.png",
          "note": "Полностью улучшить дом: 10 ракушек-резаков + 10 досок + светлячок → 10 мрамора + 5 тёсаного камня + 3 лампы → 10 лунного камня + 5 верёвок + 5 ковролина."
        },
        {
          "id": "hermit_flowers",
          "name": "10 цветов на острове",
          "icon_img": "assets/quests/hermit_flowers.png",
          "note": "Посадить бабочками минимум 10 цветов на острове отшельницы."
        },
        {
          "id": "hermit_berry",
          "name": "Удобрить кусты ягод",
          "icon_img": "assets/quests/hermit_berry.png",
          "note": "Удобрить растение, когда на острове хотя бы 8 непустых кустов ягод."
        },
        {
          "id": "hermit_lureplant",
          "name": "Убить ловушкорастение",
          "icon_img": "assets/quests/hermit_lureplant.png",
          "note": "Убить ловушкорастение (Lureplant) рядом с островом."
        },
        {
          "id": "hermit_salvage",
          "name": "Поднять подводный мусор",
          "icon_img": "assets/quests/hermit_salvage.png",
          "note": "Вытащить весь подводный мусор (Underwater Salvageables) у острова."
        },
        {
          "id": "hermit_drying",
          "name": "Сушить 6 кусков сразу",
          "icon_img": "assets/quests/hermit_drying.png",
          "note": "Держать 6 кусков мяса или рыбы на сушилках острова одновременно."
        },
        {
          "id": "hermit_rain",
          "name": "Укрытие от дождя",
          "icon_img": "assets/quests/hermit_rain.png",
          "note": "Отдать зонт, дождевик или глазобреллу, пока идёт дождь."
        },
        {
          "id": "hermit_snow",
          "name": "Утепляющая одежда",
          "icon_img": "assets/quests/hermit_snow.png",
          "note": "Отдать тёплую нательную одежду, пока идёт снег."
        },
        {
          "id": "hermit_salad",
          "name": "Салат из цветов",
          "icon_img": "assets/quests/hermit_salad.png",
          "note": "Отдать салат из цветов (Flower Salad) — можно раз в 10 дней."
        },
        {
          "id": "hermit_fish5",
          "name": "5 тяжёлых рыб",
          "icon_img": "assets/quests/hermit_fish5.png",
          "note": "Отдать 5 тяжёлых океанских рыб (кроме четырёх сезонных)."
        },
        {
          "id": "hermit_fallounder",
          "name": "Тяжёлый Fallounder",
          "icon_img": "assets/quests/hermit_fallounder.png",
          "note": "Отдать тяжёлого Fallounder — даёт рекламу приманки Stupefying Lure."
        },
        {
          "id": "hermit_tuna",
          "name": "Тяжёлая Bloomfin Tuna",
          "icon_img": "assets/quests/hermit_tuna.png",
          "note": "Отдать тяжёлую Bloomfin Tuna — реклама приманки Rainy Day Lure."
        },
        {
          "id": "hermit_sunfish",
          "name": "Тяжёлый Scorching Sunfish",
          "icon_img": "assets/quests/hermit_sunfish.png",
          "note": "Отдать тяжёлого Scorching Sunfish — реклама приманки Heavy Weighted Lure."
        },
        {
          "id": "hermit_bream",
          "name": "Тяжёлый Ice Bream",
          "icon_img": "assets/quests/hermit_bream.png",
          "note": "Отдать тяжёлого Ice Bream — реклама приманки Snow Day Lure."
        }
      ]
    },
    {
      "id": "wagstaff",
      "branch": "lunar",
      "name": "Квесты Вагстафа",
      "icon": "🛠",
      "icon_img": "assets/quests/grp_wagstaff.png",
      "hint": "Лунный путь Вагстафа (Зернистое вещание): от лунной бури до Небесного отпрыска. Боссов разлома отмечай отдельно — в компендиуме.",
      "items": [
        {
          "id": "wag_moonstorm",
          "name": "Пережить первую лунную бурю",
          "icon_img": "assets/quests/wag_moonstorm.png",
          "note": "Войти в лунную бурю: Вагстаф даст чертежи Астроочков и Незавершённого эксперимента (Лунный сифонатор)."
        },
        {
          "id": "wag_follow",
          "name": "Проследить Вагстафа",
          "icon_img": "assets/quests/wag_follow.png",
          "note": "В лунной буре догнать Вагстафа четыре раза. В Астроочках виден указатель на его сторону."
        },
        {
          "id": "wag_static",
          "name": "Закованная статика",
          "icon_img": "assets/quests/wag_static.png",
          "note": "Защитить установку Вагстафа (100 HP) от ворон и птиц. Успех — он оставит Закованную статику (Restrained Static)."
        },
        {
          "id": "wag_junk",
          "name": "Разграбить Свалку",
          "icon_img": "assets/quests/wag_junk.png",
          "note": "Разрушать груды мусора (Abandoned Junk): внутри Заметки об исследованиях и редкие чертежи В.А.Р.Б.И.С. — шлем, броня и Авто-Мат-О-Чаник."
        },
        {
          "id": "wag_spark",
          "name": "Капсула для искры",
          "icon_img": "assets/quests/wag_spark.png",
          "note": "Победить всех лунно-мутировавших боссов — Кристального циклопа-оленя, Бронированного медведя-барсука и Одержимого варга; Вагстаф выдаст Капсулу для искры (Spark Ark)."
        },
        {
          "id": "wag_map",
          "name": "Карта для Вагстафа",
          "icon_img": "assets/quests/wag_map.png",
          "note": "Исследовать Лунную пристань (Moon Quay), изготовить Свиток карты за Столом картографа и отдать Вагстафу — он вернёт Карту совершенно необитаемого острова."
        },
        {
          "id": "wag_evict",
          "name": "Выселить отшельницу",
          "icon_img": "assets/quests/wag_evict.png",
          "note": "Отдать Жемчужной отшельнице Карту совершенно необитаемого острова — она вместе с домом, сушилками и ульями переедет на Лунную пристань."
        },
        {
          "id": "wag_substrate",
          "name": "Замостить остров",
          "icon_img": "assets/quests/wag_substrate.png",
          "note": "Разместить все 76 экстраполяторов субстрата (Substrate Extrapolators) на отмеченных участках океана вокруг острова отшельницы."
        },
        {
          "id": "wag_gestalt",
          "name": "Поймать 6 гештальтов",
          "icon_img": "assets/quests/wag_gestalt.png",
          "note": "Фазмо-инкапсулятором поймать 6 гештальтов (Гештальт / Большой гештальт / Гразер). Нужен хотя бы один, что станет террамитом, и один — варблером."
        },
        {
          "id": "wag_revenant",
          "name": "Небесный ревенант",
          "icon_img": "assets/quests/wag_revenant.png",
          "note": "Призвать и победить Небесного ревенанта (Celestial Revenant), поймать его останки капсулой и отдать Вагстафу."
        },
        {
          "id": "wag_selector",
          "name": "Фулькрональный селектор",
          "icon_img": "assets/quests/wag_selector.png",
          "note": "Собрать В.О.И.Н.Б.О.Т. и запустить Фулькрональный селектор: он вызовет Просветлённого В.О.И.Н.Б.О.Т., а следом — Небесного отпрыска (Celestial Scion)."
        }
      ]
    },
    {
      "id": "charlie",
      "branch": "shadow",
      "name": "Квесты Чарли",
      "icon": "🕯",
      "icon_img": "assets/quests/grp_charlie.png",
      "hint": "Теневой путь Чарли: ритуал в Атриуме и Маренная королева. Боссов отмечай отдельно — в компендиуме.",
      "items": [
        {
          "id": "charlie_dreadstone",
          "name": "Камни ужаса",
          "icon_img": "assets/quests/charlie_dreadstone.png",
          "note": "Накопить камни ужаса (Dreadstones): их дают теневые разломы и выступы в пещерах."
        },
        {
          "id": "charlie_keystone",
          "name": "Краеугольный ключ",
          "icon_img": "assets/quests/charlie_keystone.png",
          "note": "Найти Краеугольный ключ (Keystone) в Реликварии Атриума."
        },
        {
          "id": "charlie_ritual",
          "name": "Ритуал у Древних врат",
          "icon_img": "assets/quests/charlie_ritual.png",
          "note": "Отдать у Древних врат Краеугольный ключ вместе с Древним ключом, затем разложить по трём кругам Гнильные органы (Blighted Larynx, Claw и Guts)."
        },
        {
          "id": "charlie_queen",
          "name": "Маренная королева",
          "icon_img": "assets/quests/charlie_queen.png",
          "note": "Победить Маренную королеву (Shrouded Queen) — Чарли, слившуюся с Тьмой."
        },
        {
          "id": "charlie_abomination",
          "name": "Теневая мерзость",
          "icon_img": "assets/quests/charlie_abomination.png",
          "note": "Сразу после королевы появляется Теневая мерзость (Umbral Abomination)."
        },
        {
          "id": "charlie_gifts",
          "name": "Дары королевы",
          "icon_img": "assets/quests/charlie_gifts.png",
          "note": "В центре арены открывается проход к Посоху короля, Факелу королевы и (раз в мире) Лику королевы."
        }
      ]
    },
    {
      "id": "celestial_champion",
      "branch": "lunar",
      "name": "Путь к Небесному защитнику",
      "icon": "☄",
      "icon_img": "assets/quests/grp_celestial.png",
      "hint": "Подготовка к Небесному защитнику (Celestial Champion): Лунный остров, три алтаря и Лунный сифонатор. Самого босса отмечай отдельно — в компендиуме.",
      "items": [
        {
          "id": "cc_island",
          "name": "Доплыть до Лунного острова",
          "icon_img": "assets/quests/cc_island.png",
          "note": "Лунный остров далеко в океане: добраться можно только на лодке (или гусем Вуди)."
        },
        {
          "id": "cc_altar",
          "name": "Небесный алтарь",
          "icon_img": "assets/quests/cc_altar.png",
          "note": "Собрать Небесный алтарь (Celestial Altar) из трёх частей над Небесной трещиной (Celestial Fissure)."
        },
        {
          "id": "cc_sanctum",
          "name": "Небесное святилище",
          "icon_img": "assets/quests/cc_sanctum.png",
          "note": "Собрать Небесное святилище (Celestial Sanctum) из его частей."
        },
        {
          "id": "cc_tribute",
          "name": "Небесная жертва",
          "icon_img": "assets/quests/cc_tribute.png",
          "note": "Собрать Небесную жертву (Celestial Tribute) из её частей."
        },
        {
          "id": "cc_energy",
          "name": "Таинственная энергия",
          "icon_img": "assets/quests/cc_energy.png",
          "note": "Поставить все три алтаря рядом — появится Таинственная энергия (Mysterious Energy)."
        },
        {
          "id": "cc_siphonator",
          "name": "Лунный сифонатор",
          "icon_img": "assets/quests/cc_siphonator.png",
          "note": "Собрать Лунный сифонатор (Lunar Siphonator) по чертежу Незавершённого эксперимента и поставить над Таинственной энергией."
        },
        {
          "id": "cc_awaken",
          "name": "Пробуждение Небесного защитника",
          "icon_img": "assets/quests/cc_awaken.png",
          "note": "С неба упадёт метеорит и пробудится Небесный защитник (Celestial Champion) — начинается бой."
        }
      ]
    },
    {
      "id": "ancient_fuelweaver",
      "branch": "shadow",
      "name": "Путь к Древнему топливопряду",
      "icon": "☠",
      "icon_img": "assets/quests/grp_fuelweaver.png",
      "hint": "Подготовка к Древнему топливопряду (Ancient Fuelweaver): Атриум, Древний ключ и Теневая сердечная камера. Самого босса отмечай отдельно — в компендиуме.",
      "items": [
        {
          "id": "fw_atrium",
          "name": "Добраться до Атриума",
          "icon_img": "assets/quests/fw_atrium.png",
          "note": "Спуститься в Древние руины и найти Атриум с Древними вратами (Ancient Gateway)."
        },
        {
          "id": "fw_key",
          "name": "Древний ключ",
          "icon_img": "assets/quests/fw_key.png",
          "note": "Победить Древнего стража (Ancient Guardian) и забрать Древний ключ (Ancient Key)."
        },
        {
          "id": "fw_gateway",
          "name": "Вставить ключ во врата",
          "icon_img": "assets/quests/fw_gateway.png",
          "note": "Вставить Древний ключ в Древние врата — они оживут и откроют путь дальше."
        },
        {
          "id": "fw_skeleton",
          "name": "Собрать Костяного монстра",
          "icon_img": "assets/quests/fw_skeleton.png",
          "note": "Собрать из окаменелостей (Fossils) Костяного монстра (Odd Skeleton) рядом с вратами."
        },
        {
          "id": "fw_shadow_atrium",
          "name": "Теневая сердечная камера",
          "icon_img": "assets/quests/fw_shadow_atrium.png",
          "note": "В новолуние разбить шахматные фигуры или мраморные скульптуры, убить Теневую фигуру 3-го уровня и забрать Теневую сердечную камеру (Shadow Atrium)."
        },
        {
          "id": "fw_summon",
          "name": "Призвать Древнего топливопряда",
          "icon_img": "assets/quests/fw_summon.png",
          "note": "Вставить Теневую камеру в Костяного монстра — появится Древний топливопряд (Ancient Fuelweaver)."
        }
      ]
    }
  ],
  "items": [
    {
      "id": "rifts_lunar",
      "name": "Лунный разлом",
      "icon": "☾",
      "note": "Открыть лунный разлом (Lunar Rift) — следствие пробуждения небесных сил."
    },
    {
      "id": "rifts_shadow",
      "name": "Теневой разлом",
      "icon": "☇",
      "note": "Открыть теневой разлом (Shadow Rift) — следствие пробуждения древних сил."
    },
    {
      "id": "moon_orb",
      "name": "Добыча лунной сферы",
      "icon": "◯",
      "note": "Добыть Небесную сферу (Celestial Orb) — выкопать из подозрительной глыбы."
    },
    {
      "id": "ruins",
      "name": "Нахождение руин",
      "icon": "⛏",
      "note": "Найти Древние руины в подземелье."
    },
    {
      "id": "archives",
      "name": "Активация тулицытовых архивов",
      "icon": "📜",
      "note": "Открыть и активировать Древний архив в руинах (Ancient Archive)."
    },
    {
      "id": "glommer",
      "name": "Заполучение гломмера",
      "icon": "🌕",
      "note": "Заполучить гломмера: в полнолуние разбить статую гломмера и забрать цветок."
    }
  ]
};
