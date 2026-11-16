-- DST Compendium Sync — точка входа серверного мода.
-- modimport в окружении мода не возвращает значение: модули кладут данные
-- в глобалы окружения (Tracker, BOSS_MAP), поэтому просто подгружаем их.

modimport("scripts/boss_map")
modimport("scripts/dst_tracker")
Tracker.Install()
