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
