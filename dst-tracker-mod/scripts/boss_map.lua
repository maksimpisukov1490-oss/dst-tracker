-- Карта slug'ов сайта на префабы DST.
-- Имена сверены с scripts/prefabs установленной игры (build 26474873).
-- Файл исполняется через modimport в окружении мода: результат не возвращается,
-- поэтому таблица кладётся в глобал окружения BOSS_MAP.

BOSS_MAP = {
    deerclops = { prefabs = { "deerclops" } },
    bearger = { prefabs = { "bearger" } },
    moose_goose = { prefabs = { "moose" } },
    dragonfly = { prefabs = { "dragonfly" } },
    bee_queen = { prefabs = { "beequeen" } },
    klaus = { prefabs = { "klaus" } },
    toadstool = { prefabs = { "toadstool", "toadstool_dark" } },
    antlion = { prefabs = { "antlion" } },
    malbatross = { prefabs = { "malbatross" } },
    crab_king = { prefabs = { "crabking" } },

    -- Древний топливопряд: префаб stalker_atrium (fossil_mound.lua).
    ancient_fuelweaver = { prefabs = { "stalker_atrium" } },

    -- Небесный защитник: засчитываем финальную фазу alterguardian_phase3.
    celestial_champion = { prefabs = { "alterguardian_phase3" } },

    eye_of_terror = { prefabs = { "eyeofterror" } },

    -- Близнецы гибнут почти одновременно: окно склейки делает из них одну победу.
    twins_of_terror = { prefabs = { "twinofterror1", "twinofterror2" }, debounce = 30 },

    -- Три фигуры одной арены, уровень каждой пишется в levels.
    shadow_pieces = {
        prefabs = { "shadow_knight", "shadow_bishop", "shadow_rook" },
        debounce = 20,
        levels = true,
    },

    nightmare_werepig = { prefabs = { "daywalker" } },
    scrappy_werepig = { prefabs = { "daywalker2" } },
    frostjaw = { prefabs = { "sharkboi" } },
    lord_of_the_fruit_flies = { prefabs = { "lordfruitfly" } },
    ancient_guardian = { prefabs = { "minotaur" } },

    -- Обычный и «теневой» глубинные черви.
    great_depths_worm = { prefabs = { "worm_boss", "worm_boss_shadow" } },

    ancient_guard_tower = { prefabs = { "vault_pillar_guard" } },

    armored_bearger = { prefabs = { "mutatedbearger" } },
    crystal_deerclops = { prefabs = { "mutateddeerclops" } },
    possessed_varg = { prefabs = { "mutatedwarg" } },
    umbral_abomination = { prefabs = { "shrouden" } },
    celestial_scion = { prefabs = { "alterguardian_phase4_lunarrift" } },
    celestial_revenant = { prefabs = { "alterguardian_phase1_lunarrift" } },
    warbot = { prefabs = { "wagboss_robot" } },
    shrouded_queen = { prefabs = { "charlie_boss" } },

    spider_queen = { prefabs = { "spiderqueen" } },
    treeguard = { prefabs = { "leif", "leif_sparse" } },
    varg = { prefabs = { "warg" } },
    ewecus = { prefabs = { "spat" } },
    krampus = { prefabs = { "krampus" } },

    reanimated_skeleton = { prefabs = { "stalker", "stalker_forest" } },
}

-- Порядок и русские имена для экрана прогресса в игре.
BOSS_ORDER = {
    "deerclops",
    "bearger",
    "moose_goose",
    "dragonfly",
    "bee_queen",
    "klaus",
    "toadstool",
    "antlion",
    "malbatross",
    "crab_king",
    "ancient_fuelweaver",
    "celestial_champion",
    "eye_of_terror",
    "twins_of_terror",
    "shadow_pieces",
    "nightmare_werepig",
    "scrappy_werepig",
    "frostjaw",
    "lord_of_the_fruit_flies",
    "ancient_guardian",
    "great_depths_worm",
    "ancient_guard_tower",
    "armored_bearger",
    "crystal_deerclops",
    "possessed_varg",
    "umbral_abomination",
    "celestial_scion",
    "celestial_revenant",
    "warbot",
    "shrouded_queen",
    "spider_queen",
    "treeguard",
    "varg",
    "ewecus",
    "krampus",
    "reanimated_skeleton",
}

BOSS_NAMES = {
    deerclops = "Циклоп-олень",
    bearger = "Медведь-барсук",
    moose_goose = "Лось/Гусь",
    dragonfly = "Драконья муха",
    bee_queen = "Пчелиная матка",
    klaus = "Клаус",
    toadstool = "Жаба-поганка",
    antlion = "Муравьиный лев",
    malbatross = "Мальбатрос",
    crab_king = "Король крабов",
    ancient_fuelweaver = "Древний топливопряд",
    celestial_champion = "Небесный защитник",
    eye_of_terror = "Глаз ужаса",
    twins_of_terror = "Близнецы ужаса",
    shadow_pieces = "Теневые шахматы",
    nightmare_werepig = "Кошмарный свин-оборотень",
    scrappy_werepig = "Металлический свин-оборотень",
    frostjaw = "Ледяная челюсть",
    lord_of_the_fruit_flies = "Повелитель плодовых мух",
    ancient_guardian = "Древний страж",
    great_depths_worm = "Огромный глубинный червь",
    ancient_guard_tower = "Древняя сторожевая башня",
    armored_bearger = "Бронированный медведь-барсук",
    crystal_deerclops = "Кристальный циклоп-олень",
    possessed_varg = "Одержимый варг",
    umbral_abomination = "Теневая мерзость",
    celestial_scion = "Небесный отпрыск",
    celestial_revenant = "Небесный ревенант",
    warbot = "В.О.И.Н.Б.О.Т.",
    shrouded_queen = "Маренная королева",
    spider_queen = "Королева пауков",
    treeguard = "Энт",
    varg = "Варг",
    ewecus = "Слизовца",
    krampus = "Крампус",
    reanimated_skeleton = "Оживлённый скелет",
}
