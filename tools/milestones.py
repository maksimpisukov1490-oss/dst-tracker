# -*- coding: utf-8 -*-
"""Вехи прогресса, кроме боссов: квесты отшельницы, Вагстафа, Чарли и «подходы»
к Небесному защитнику и Древнему топливопряду, плюс прочие вехи.

Правь здесь. Сборка: python3 tools/build_data.py
"""

BRANCHES = [
    {"id": "lunar", "name": "Лунные квесты",
     "hint": "Путь луны: отшельница, Вагстаф и Небесный защитник."},
    {"id": "shadow", "name": "Теневые квесты",
     "hint": "Путь тьмы: Чарли и Древний топливопряд."},
]

MILESTONES = {
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
                "icon_img": "assets/quests/hermit_pearl.png",
            },
            "hint": "Задания Жемчужной отшельницы (Pearl) на Острове отшельницы. "
                    "В общий прогресс идёт только жемчужина — её отшельница выдаёт, "
                    "когда закрыто 10 заданий. После десятого задания отметки больше не ставятся.",
            "items": [
                {"id": "hermit_chair", "name": "Стул для отшельницы",
                 "icon_img": "assets/quests/hermit_chair.png",
                 "note": "Построить стул на острове и дождаться, пока она сядет "
                         "(садится не чаще раза в день)."},
                {"id": "hermit_home", "name": "Дом отшельницы до максимума",
                 "icon_img": "assets/quests/hermit_home.png",
                 "note": "Полностью улучшить дом: 10 ракушек-резаков + 10 досок + светлячок → "
                         "10 мрамора + 5 тёсаного камня + 3 лампы → 10 лунного камня + 5 верёвок + "
                         "5 ковролина."},
                {"id": "hermit_flowers", "name": "10 цветов на острове",
                 "icon_img": "assets/quests/hermit_flowers.png",
                 "note": "Посадить бабочками минимум 10 цветов на острове отшельницы."},
                {"id": "hermit_berry", "name": "Удобрить кусты ягод",
                 "icon_img": "assets/quests/hermit_berry.png",
                 "note": "Удобрить растение, когда на острове хотя бы 8 непустых кустов ягод."},
                {"id": "hermit_lureplant", "name": "Убить ловушкорастение",
                 "icon_img": "assets/quests/hermit_lureplant.png",
                 "note": "Убить ловушкорастение (Lureplant) рядом с островом."},
                {"id": "hermit_salvage", "name": "Поднять подводный мусор",
                 "icon_img": "assets/quests/hermit_salvage.png",
                 "note": "Вытащить весь подводный мусор (Underwater Salvageables) у острова."},
                {"id": "hermit_drying", "name": "Сушить 6 кусков сразу",
                 "icon_img": "assets/quests/hermit_drying.png",
                 "note": "Держать 6 кусков мяса или рыбы на сушилках острова одновременно."},
                {"id": "hermit_rain", "name": "Укрытие от дождя",
                 "icon_img": "assets/quests/hermit_rain.png",
                 "note": "Отдать зонт, дождевик или глазобреллу, пока идёт дождь."},
                {"id": "hermit_snow", "name": "Утепляющая одежда",
                 "icon_img": "assets/quests/hermit_snow.png",
                 "note": "Отдать тёплую нательную одежду, пока идёт снег."},
                {"id": "hermit_salad", "name": "Салат из цветов",
                 "icon_img": "assets/quests/hermit_salad.png",
                 "note": "Отдать салат из цветов (Flower Salad) — можно раз в 10 дней."},
                {"id": "hermit_fish5", "name": "5 тяжёлых рыб",
                 "icon_img": "assets/quests/hermit_fish5.png",
                 "note": "Отдать 5 тяжёлых океанских рыб (кроме четырёх сезонных)."},
                {"id": "hermit_fallounder", "name": "Тяжёлый Fallounder",
                 "icon_img": "assets/quests/hermit_fallounder.png",
                 "note": "Отдать тяжёлого Fallounder — даёт рекламу приманки Stupefying Lure."},
                {"id": "hermit_tuna", "name": "Тяжёлая Bloomfin Tuna",
                 "icon_img": "assets/quests/hermit_tuna.png",
                 "note": "Отдать тяжёлую Bloomfin Tuna — реклама приманки Rainy Day Lure."},
                {"id": "hermit_sunfish", "name": "Тяжёлый Scorching Sunfish",
                 "icon_img": "assets/quests/hermit_sunfish.png",
                 "note": "Отдать тяжёлого Scorching Sunfish — реклама приманки Heavy Weighted Lure."},
                {"id": "hermit_bream", "name": "Тяжёлый Ice Bream",
                 "icon_img": "assets/quests/hermit_bream.png",
                 "note": "Отдать тяжёлого Ice Bream — реклама приманки Snow Day Lure."},
            ],
        },
        {
            "id": "wagstaff",
            "branch": "lunar",
            "name": "Квесты Вагстафа",
            "icon": "🛠",
            "icon_img": "assets/quests/grp_wagstaff.png",
            "hint": "Лунный путь Вагстафа (Зернистое вещание): от лунной бури до Небесного отпрыска. "
                    "Боссов разлома отмечай отдельно — в компендиуме.",
            "items": [
                {"id": "wag_moonstorm", "name": "Пережить первую лунную бурю",
                 "icon_img": "assets/quests/wag_moonstorm.png",
                 "note": "Войти в лунную бурю: Вагстаф даст чертежи Астроочков и Незавершённого "
                         "эксперимента (Лунный сифонатор)."},
                {"id": "wag_follow", "name": "Проследить Вагстафа",
                 "icon_img": "assets/quests/wag_follow.png",
                 "note": "В лунной буре догнать Вагстафа четыре раза. В Астроочках виден указатель "
                         "на его сторону."},
                {"id": "wag_static", "name": "Закованная статика",
                 "icon_img": "assets/quests/wag_static.png",
                 "note": "Защитить установку Вагстафа (100 HP) от ворон и птиц. Успех — он оставит "
                         "Закованную статику (Restrained Static)."},
                {"id": "wag_junk", "name": "Разграбить Свалку",
                 "icon_img": "assets/quests/wag_junk.png",
                 "note": "Разрушать груды мусора (Abandoned Junk): внутри Заметки об исследованиях и "
                         "редкие чертежи В.А.Р.Б.И.С. — шлем, броня и Авто-Мат-О-Чаник."},
                {"id": "wag_spark", "name": "Капсула для искры",
                 "icon_img": "assets/quests/wag_spark.png",
                 "note": "Победить всех лунно-мутировавших боссов — Кристального циклопа-оленя, "
                         "Бронированного медведя-барсука и Одержимого варга; Вагстаф выдаст Капсулу "
                         "для искры (Spark Ark)."},
                {"id": "wag_map", "name": "Карта для Вагстафа",
                 "icon_img": "assets/quests/wag_map.png",
                 "note": "Исследовать Лунную пристань (Moon Quay), изготовить Свиток карты за Столом "
                         "картографа и отдать Вагстафу — он вернёт Карту совершенно необитаемого острова."},
                {"id": "wag_evict", "name": "Выселить отшельницу",
                 "icon_img": "assets/quests/wag_evict.png",
                 "note": "Отдать Жемчужной отшельнице Карту совершенно необитаемого острова — она "
                         "вместе с домом, сушилками и ульями переедет на Лунную пристань."},
                {"id": "wag_substrate", "name": "Замостить остров",
                 "icon_img": "assets/quests/wag_substrate.png",
                 "note": "Разместить все 76 экстраполяторов субстрата (Substrate Extrapolators) на "
                         "отмеченных участках океана вокруг острова отшельницы."},
                {"id": "wag_gestalt", "name": "Поймать 6 гештальтов",
                 "icon_img": "assets/quests/wag_gestalt.png",
                 "note": "Фазмо-инкапсулятором поймать 6 гештальтов (Гештальт / Большой гештальт / "
                         "Гразер). Нужен хотя бы один, что станет террамитом, и один — варблером."},
                {"id": "wag_revenant", "name": "Небесный ревенант",
                 "icon_img": "assets/quests/wag_revenant.png",
                 "note": "Призвать и победить Небесного ревенанта (Celestial Revenant), поймать его "
                         "останки капсулой и отдать Вагстафу."},
                {"id": "wag_selector", "name": "Фулькрональный селектор",
                 "icon_img": "assets/quests/wag_selector.png",
                 "note": "Собрать В.О.И.Н.Б.О.Т. и запустить Фулькрональный селектор: он вызовет "
                         "Просветлённого В.О.И.Н.Б.О.Т., а следом — Небесного отпрыска (Celestial Scion)."},
            ],
        },
        {
            "id": "charlie",
            "branch": "shadow",
            "name": "Квесты Чарли",
            "icon": "🕯",
            "icon_img": "assets/quests/grp_charlie.png",
            "hint": "Теневой путь Чарли: ритуал в Атриуме и Маренная королева. "
                    "Боссов отмечай отдельно — в компендиуме.",
            "items": [
                {"id": "charlie_dreadstone", "name": "Камни ужаса",
                 "icon_img": "assets/quests/charlie_dreadstone.png",
                 "note": "Накопить камни ужаса (Dreadstones): их дают теневые разломы и выступы "
                         "в пещерах."},
                {"id": "charlie_keystone", "name": "Краеугольный ключ",
                 "icon_img": "assets/quests/charlie_keystone.png",
                 "note": "Найти Краеугольный ключ (Keystone) в Реликварии Атриума."},
                {"id": "charlie_ritual", "name": "Ритуал у Древних врат",
                 "icon_img": "assets/quests/charlie_ritual.png",
                 "note": "Отдать у Древних врат Краеугольный ключ вместе с Древним ключом, затем "
                         "разложить по трём кругам Гнильные органы (Blighted Larynx, Claw и Guts)."},
                {"id": "charlie_queen", "name": "Маренная королева",
                 "icon_img": "assets/quests/charlie_queen.png",
                 "note": "Победить Маренную королеву (Shrouded Queen) — Чарли, слившуюся с Тьмой."},
                {"id": "charlie_abomination", "name": "Теневая мерзость",
                 "icon_img": "assets/quests/charlie_abomination.png",
                 "note": "Сразу после королевы появляется Теневая мерзость (Umbral Abomination)."},
                {"id": "charlie_gifts", "name": "Дары королевы",
                 "icon_img": "assets/quests/charlie_gifts.png",
                 "note": "В центре арены открывается проход к Посоху короля, Факелу королевы и "
                         "(раз в мире) Лику королевы."},
            ],
        },
        {
            "id": "celestial_champion",
            "branch": "lunar",
            "name": "Путь к Небесному защитнику",
            "icon": "☄",
            "icon_img": "assets/quests/grp_celestial.png",
            "hint": "Подготовка к Небесному защитнику (Celestial Champion): Лунный остров, три алтаря "
                    "и Лунный сифонатор. Самого босса отмечай отдельно — в компендиуме.",
            "items": [
                {"id": "cc_island", "name": "Доплыть до Лунного острова",
                 "icon_img": "assets/quests/cc_island.png",
                 "note": "Лунный остров далеко в океане: добраться можно только на лодке "
                         "(или гусем Вуди)."},
                {"id": "cc_altar", "name": "Небесный алтарь",
                 "icon_img": "assets/quests/cc_altar.png",
                 "note": "Собрать Небесный алтарь (Celestial Altar) из трёх частей над Небесной "
                         "трещиной (Celestial Fissure)."},
                {"id": "cc_sanctum", "name": "Небесное святилище",
                 "icon_img": "assets/quests/cc_sanctum.png",
                 "note": "Собрать Небесное святилище (Celestial Sanctum) из его частей."},
                {"id": "cc_tribute", "name": "Небесная жертва",
                 "icon_img": "assets/quests/cc_tribute.png",
                 "note": "Собрать Небесную жертву (Celestial Tribute) из её частей."},
                {"id": "cc_energy", "name": "Таинственная энергия",
                 "icon_img": "assets/quests/cc_energy.png",
                 "note": "Поставить все три алтаря рядом — появится Таинственная энергия "
                         "(Mysterious Energy)."},
                {"id": "cc_siphonator", "name": "Лунный сифонатор",
                 "icon_img": "assets/quests/cc_siphonator.png",
                 "note": "Собрать Лунный сифонатор (Lunar Siphonator) по чертежу Незавершённого "
                         "эксперимента и поставить над Таинственной энергией."},
                {"id": "cc_awaken", "name": "Пробуждение Небесного защитника",
                 "icon_img": "assets/quests/cc_awaken.png",
                 "note": "С неба упадёт метеорит и пробудится Небесный защитник (Celestial Champion) — "
                         "начинается бой."},
            ],
        },
        {
            "id": "ancient_fuelweaver",
            "branch": "shadow",
            "name": "Путь к Древнему топливопряду",
            "icon": "☠",
            "icon_img": "assets/quests/grp_fuelweaver.png",
            "hint": "Подготовка к Древнему топливопряду (Ancient Fuelweaver): Атриум, Древний ключ и "
                    "Теневая сердечная камера. Самого босса отмечай отдельно — в компендиуме.",
            "items": [
                {"id": "fw_atrium", "name": "Добраться до Атриума",
                 "icon_img": "assets/quests/fw_atrium.png",
                 "note": "Спуститься в Древние руины и найти Атриум с Древними вратами "
                         "(Ancient Gateway)."},
                {"id": "fw_key", "name": "Древний ключ",
                 "icon_img": "assets/quests/fw_key.png",
                 "note": "Победить Древнего стража (Ancient Guardian) и забрать Древний ключ "
                         "(Ancient Key)."},
                {"id": "fw_gateway", "name": "Вставить ключ во врата",
                 "icon_img": "assets/quests/fw_gateway.png",
                 "note": "Вставить Древний ключ в Древние врата — они оживут и откроют путь дальше."},
                {"id": "fw_skeleton", "name": "Собрать Костяного монстра",
                 "icon_img": "assets/quests/fw_skeleton.png",
                 "note": "Собрать из окаменелостей (Fossils) Костяного монстра (Odd Skeleton) рядом "
                         "с вратами."},
                {"id": "fw_shadow_atrium", "name": "Теневая сердечная камера",
                 "icon_img": "assets/quests/fw_shadow_atrium.png",
                 "note": "В новолуние разбить шахматные фигуры или мраморные скульптуры, убить Теневую "
                         "фигуру 3-го уровня и забрать Теневую сердечную камеру (Shadow Atrium)."},
                {"id": "fw_summon", "name": "Призвать Древнего топливопряда",
                 "icon_img": "assets/quests/fw_summon.png",
                 "note": "Вставить Теневую камеру в Костяного монстра — появится Древний топливопряд "
                         "(Ancient Fuelweaver)."},
            ],
        },
    ],
    "items": [
        {"id": "rifts_lunar", "name": "Лунный разлом", "icon": "☾",
         "note": "Открыть лунный разлом (Lunar Rift) — следствие пробуждения небесных сил."},
        {"id": "rifts_shadow", "name": "Теневой разлом", "icon": "☇",
         "note": "Открыть теневой разлом (Shadow Rift) — следствие пробуждения древних сил."},
        {"id": "moon_orb", "name": "Добыча лунной сферы", "icon": "◯",
         "note": "Добыть Небесную сферу (Celestial Orb) — выкопать из подозрительной глыбы."},
        {"id": "ruins", "name": "Нахождение руин", "icon": "⛏",
         "note": "Найти Древние руины в подземелье."},
        {"id": "archives", "name": "Активация тулицытовых архивов", "icon": "📜",
         "note": "Открыть и активировать Древний архив в руинах (Ancient Archive)."},
        {"id": "glommer", "name": "Заполучение гломмера", "icon": "🌕",
         "note": "Заполучить гломмера: в полнолуние разбить статую гломмера и забрать цветок."},
    ],
}
