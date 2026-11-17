-- DST Compendium Sync — ядро.
-- Пишет снимок прогресса в JSON, который читает tools/bridge.py.
--
-- Песочница модов видит только часть глобалов: нет pcall, os, io, next,
-- tonumber, setmetatable, assert, TheWorld, TheSim, TheShard, TheNet, AllPlayers.
-- Движковые объекты берём через GLOBAL (это _G), остальное — через окружение мода.

local G = GLOBAL
local pcall, tonumber, next = G.pcall, G.tonumber, G.next
local setmetatable, getmetatable, assert = G.setmetatable, G.getmetatable, G.assert

local MOD_VERSION = "1.5.2"

-- Идентификатор запуска сервера: сайт по нему понимает, что счётчики
-- начались заново, и не путает новую сессию со старой.
local SESSION = G.os.time()

Tracker = {}

local OBJECT_MT = {}

local function obj(t)
    return setmetatable(t or {}, OBJECT_MT)
end

local function is_object(t)
    return getmetatable(t) == OBJECT_MT
end

-- ---------------------------------------------------------------- JSON

local ESCAPES = {
    ['"'] = '\\"',
    ["\\"] = "\\\\",
    ["\b"] = "\\b",
    ["\f"] = "\\f",
    ["\n"] = "\\n",
    ["\r"] = "\\r",
    ["\t"] = "\\t",
}

local function json_string(s)
    s = tostring(s)
    s = s:gsub('[%z\1-\31\\"]', function(c)
        return ESCAPES[c] or string.format("\\u%04x", string.byte(c))
    end)
    return '"' .. s .. '"'
end

local function is_array(t)
    local n = 0
    for k in pairs(t) do
        if type(k) ~= "number" then
            return false
        end
        n = n + 1
    end
    return n == #t
end

local function json_value(v)
    local tv = type(v)
    if v == nil then
        return "null"
    elseif tv == "boolean" then
        return v and "true" or "false"
    elseif tv == "number" then
        if v ~= v or v == math.huge or v == -math.huge then
            return "null"
        end
        if v == math.floor(v) then
            return string.format("%d", v)
        end
        return tostring(v)
    elseif tv == "string" then
        return json_string(v)
    elseif tv == "table" then
        local parts = {}
        if is_object(v) or not is_array(v) then
            local keys = {}
            for k in pairs(v) do
                keys[#keys + 1] = tostring(k)
            end
            table.sort(keys)
            for _, k in ipairs(keys) do
                parts[#parts + 1] = json_string(k) .. ":" .. json_value(v[k])
            end
            return "{" .. table.concat(parts, ",") .. "}"
        end
        for i = 1, #v do
            parts[#parts + 1] = json_value(v[i])
        end
        return "[" .. table.concat(parts, ",") .. "]"
    end
    return "null"
end

-- ------------------------------------------------------------- engine

local function config_number(name, fallback)
    if not GetModConfigData then
        return fallback
    end
    local ok, value = pcall(GetModConfigData, name)
    local n = ok and tonumber(value) or nil
    return n or fallback
end

local DEBOUNCE = config_number("debounce", 15)
local HEARTBEAT = config_number("heartbeat", 30)

local function now()
    return G.os.time()
end

local function today()
    return G.os.date("%Y-%m-%d")
end

local function current_day()
    local world = G.TheWorld
    local state = world and world.state
    return tonumber(state and state.cycles) or 0
end

local function getenv(name)
    local os_ = G.os
    if not (os_ and os_.getenv) then
        return nil
    end
    local ok, value = pcall(os_.getenv, name)
    if ok and value and value ~= "" then
        return value
    end
    return nil
end

local function is_cave()
    local world = G.TheWorld
    if world and world.HasTag and world:HasTag("cave") then
        return true
    end
    return false
end

local function shard_id()
    if is_cave() then
        return "caves"
    end
    local shard = G.TheShard
    if shard and shard.GetShardId then
        local ok, id = pcall(shard.GetShardId, shard)
        if ok and id ~= nil then
            id = tostring(id)
            if id == "1" then
                return "forest"
            elseif id == "2" then
                return "caves"
            end
            return id
        end
    end
    return "forest"
end

local function suffix_for(shard)
    if shard == "caves" then
        return "-caves.json"
    elseif shard == "forest" then
        return ".json"
    end
    return "-" .. tostring(shard) .. ".json"
end

local function candidate_bases()
    local list = {}

    local custom = getenv("DST_TRACKER_SYNC")
    if custom then
        list[#list + 1] = custom:gsub("%.json$", "")
    end

    -- Windows-сборка (в том числе под Proton): Documents\Klei\...
    local profile = getenv("USERPROFILE")
    if profile then
        list[#list + 1] = profile .. "\\Documents\\Klei\\DoNotStarveTogether\\dst-tracker-sync"
    end

    -- Нативная Linux-сборка и выделенный сервер.
    local home = getenv("HOME")
    if home then
        list[#list + 1] = home .. "/.klei/DoNotStarveTogether/dst-tracker-sync"
    end

    -- Резерв: папка самого мода (MODROOT заканчивается на «/»).
    if type(MODROOT) == "string" and MODROOT ~= "" then
        list[#list + 1] = MODROOT .. "dst-tracker-sync"
    end

    return list
end

local function sync_paths()
    local out = {}
    local suffix = suffix_for(shard_id())
    for _, base in ipairs(candidate_bases()) do
        out[#out + 1] = base .. suffix
    end
    return out
end

local function write_file(path, text)
    local io_ = G.io
    if not (io_ and io_.open) then
        return false
    end
    return pcall(function()
        local file = assert(io_.open(path, "wb"))
        file:write(text)
        file:close()
    end)
end

-- ------------------------------------------------------------- players

local function player_name(p)
    if not p or not p.IsValid or not p:IsValid() then
        return nil
    end
    local name = nil
    if p.GetDisplayName then
        local ok, value = pcall(p.GetDisplayName, p)
        if ok then
            name = value
        end
    end
    if not name or name == "" then
        name = p.name
    end
    if name and name ~= "" then
        return tostring(name)
    end
    return nil
end

local function add_player(list, name)
    if not name then
        return
    end
    for _, existing in ipairs(list) do
        if existing == name then
            return
        end
    end
    list[#list + 1] = name
end

local function online_players()
    local list = {}
    local all = G.AllPlayers
    if all then
        for _, p in ipairs(all) do
            add_player(list, player_name(p))
        end
    end
    table.sort(list)
    return list
end

local function server_name()
    local net = G.TheNet
    if net and net.GetServerName then
        local ok, name = pcall(net.GetServerName, net)
        if ok and name and name ~= "" then
            return tostring(name)
        end
    end
    return ""
end

-- Клиент хоста (в мире, который хостит игрок) или первый обычный игрок
-- на выделенном сервере. Из него берём персонажа и ник.
local function host_client()
    local net = G.TheNet
    if not net or not net.GetClientTable then
        return nil
    end
    local ok, list = pcall(net.GetClientTable, net)
    if not ok or type(list) ~= "table" then
        return nil
    end

    local owner = nil
    if net.GetUserID then
        local ok_id, uid = pcall(net.GetUserID, net)
        if ok_id then
            owner = uid
        end
    end
    if owner and owner ~= "" then
        for _, client in ipairs(list) do
            if client.userid == owner then
                return client
            end
        end
    end

    -- На выделенном сервере строка хоста помечена полем performance.
    for _, client in ipairs(list) do
        if client.performance == nil then
            return client
        end
    end
    return list[1]
end

local function world_state()
    local world = G.TheWorld
    local state = world and world.state
    local host = host_client()
    local character = host and host.prefab or nil
    local nickname = host and host.name or nil

    if not character then
        local all = G.AllPlayers
        local first = all and all[1]
        if first then
            character = first.prefab
            nickname = nickname or player_name(first)
        end
    end

    if not state then
        return obj({
            day = 0, season = "", phase = "", players = {},
            name = server_name(), char = tostring(character or ""), player = tostring(nickname or ""),
        })
    end

    return obj({
        day = tonumber(state.cycles) or 0,
        season = tostring(state.season or ""),
        phase = tostring(state.phase or ""),
        players = online_players(),
        name = server_name(),
        char = tostring(character or ""),
        player = tostring(nickname or ""),
    })
end

local function current_player()
    local client = host_client()
    local all = G.AllPlayers
    if not all then
        return nil
    end
    if client and client.userid then
        for _, p in ipairs(all) do
            if p.userid == client.userid then
                return p
            end
        end
    end
    return all[1]
end

local function skills_state()
    local p = current_player()
    local updater = p and p.components and p.components.skilltreeupdater
    if not updater then
        return nil
    end

    local list = {}
    if updater.GetActivatedSkills then
        local ok, activated = pcall(updater.GetActivatedSkills, updater)
        if ok and type(activated) == "table" then
            for name, on in pairs(activated) do
                if on then
                    list[#list + 1] = tostring(name)
                end
            end
        end
    end
    table.sort(list)

    local points = 0
    if updater.GetAvailableSkillPoints then
        local ok, value = pcall(updater.GetAvailableSkillPoints, updater)
        points = ok and tonumber(value) or 0
    end

    local xp = 0
    if updater.GetSkillXP then
        local ok, value = pcall(updater.GetSkillXP, updater)
        xp = ok and tonumber(value) or 0
    end

    return obj({
        char = tostring(p.prefab or ""),
        skills = list,
        points = points,
        xp = xp,
    })
end

-- --------------------------------------------------------------- state

local S = {
    shard = "forest",
    kills = {},
    marks = {},
    retro = {},
    gestalt_full = 0,
    last = {},
    last_json = nil,
    logged_ok = false,
    logged_err = false,
}

Tracker.paths = {}
Tracker.path = nil

-- ---------------------------------------------------------- marks: helpers

local function has_any(t)
    if not t then
        return false
    end
    for _ in pairs(t) do
        return true
    end
    return false
end

local function as_list(v)
    if type(v) == "table" then
        return v
    end
    return { v }
end

local function world_component(name)
    local world = G.TheWorld
    local components = world and world.components
    return components and components[name] or nil
end

local function hermit_task_done(task)
    local manager = world_component("hermitcrab_relocation_manager")
    local crab = manager and manager.hermitcrab
    local levels = crab and crab.components and crab.components.friendlevels
    local tasks = levels and levels.friendlytasks
    local entry = tasks and tasks[task]
    return entry ~= nil and entry.complete == true
end

local function tag_on(tag)
    local wst = G.WORLDSTATETAGS
    if not (wst and wst.GetTagEnabled) then
        return false
    end
    local ok, value = pcall(wst.GetTagEnabled, tag)
    return ok and value == true
end

local function item_matches(item, prefabs)
    if not item or not item.prefab then
        return false
    end
    for _, prefab in ipairs(prefabs) do
        if item.prefab == prefab then
            return true
        end
    end
    return false
end

local function player_has_any(player, prefabs)
    local inventory = player and player.components and player.components.inventory
    if not inventory then
        return false
    end
    if inventory.FindItem then
        local ok, item = pcall(inventory.FindItem, inventory, function(it)
            return item_matches(it, prefabs)
        end)
        if ok and item then
            return true
        end
    end
    if inventory.equipslots then
        for _, item in pairs(inventory.equipslots) do
            if item_matches(item, prefabs) then
                return true
            end
        end
    end
    return false
end

local function any_player_has(prefabs)
    local all = G.AllPlayers
    if not all then
        return false
    end
    for _, player in ipairs(all) do
        if player_has_any(player, prefabs) then
            return true
        end
    end
    return false
end

local function count_gestalts(player)
    local n = 0
    local inventory = player and player.components and player.components.inventory
    if not inventory then
        return 0
    end

    local function check(item)
        if not item or not item.prefab then
            return
        end
        if item.prefab == "gestalt_cage_filled3" then
            n = n + 3
        elseif item.prefab == "gestalt_cage_filled2" then
            n = n + 2
        elseif item.prefab == "gestalt_cage_filled1" then
            n = n + 1
        end
    end

    if inventory.itemslots then
        for _, item in pairs(inventory.itemslots) do
            check(item)
        end
    end
    check(inventory.activeitem)
    if inventory.equipslots then
        for _, item in pairs(inventory.equipslots) do
            check(item)
        end
    end
    if inventory.GetOverflowContainer then
        local ok, overflow = pcall(inventory.GetOverflowContainer, inventory)
        if ok and overflow and overflow.itemslots then
            for _, item in pairs(overflow.itemslots) do
                check(item)
            end
        end
    end
    return n
end

local function total_gestalts()
    local n = 0
    local all = G.AllPlayers
    if all then
        for _, player in ipairs(all) do
            n = n + count_gestalts(player)
        end
    end
    return n
end

local function player_near_any(player, prefabs, radius)
    if not player or not player.Transform then
        return false
    end
    local sim = G.TheSim
    if not (sim and sim.FindEntities) then
        return false
    end
    local x, _, z = player.Transform:GetWorldPosition()
    local ok, ents = pcall(sim.FindEntities, sim, x, 0, z, radius)
    if not ok or type(ents) ~= "table" then
        return false
    end
    for _, ent in ipairs(ents) do
        for _, prefab in ipairs(prefabs) do
            if ent.prefab == prefab then
                return true
            end
        end
    end
    return false
end

local function any_player_near(prefabs, radius)
    local all = G.AllPlayers
    if not all then
        return false
    end
    for _, player in ipairs(all) do
        if player_near_any(player, prefabs, radius) then
            return true
        end
    end
    return false
end

local function wag_manager()
    return world_component("wagpunk_arena_manager")
end

local function moon_manager()
    return world_component("moonstormmanager")
end

local function hermit_manager()
    return world_component("hermitcrab_relocation_manager")
end

local function wag_state_at_least(n)
    local manager = wag_manager()
    return manager ~= nil and (tonumber(manager.state) or -1) >= n
end

local function wag_spark_done()
    local manager = wag_manager()
    return (manager and manager.sparkark == true)
        or any_player_has({ "security_pulse_cage", "security_pulse_cage_full" })
end

local function wag_map_done()
    local manager = wag_manager()
    return (manager and manager.pearlmap == true)
        or any_player_has({ "mapscroll_tricker" })
end

local function wag_evict_done()
    local manager = wag_manager()
    local hermit = hermit_manager()
    return (manager and manager.pearlmove == true)
        or (hermit and hermit.initiatedpearlmove == true)
        or wag_state_at_least(3)
end

local function wag_substrate_done()
    local manager = wag_manager()
    if not manager then
        return false
    end
    if manager.turfed == true then
        return true
    end
    if manager.GetTotalDronePlacementCount then
        local ok, count = pcall(manager.GetTotalDronePlacementCount, manager)
        if ok and (tonumber(count) or 0) >= 76 then
            return true
        end
    end
    return false
end

local function wag_gestalt_done()
    return S.gestalt_full >= 2 or total_gestalts() >= 6
end

local function wag_follow_done()
    local manager = moon_manager()
    local npc = manager and manager.wagstaff
    local need = tonumber(TUNING.WAGSTAFF_NPC_HUNTS) or 4
    return npc ~= nil and (tonumber(npc.hunt_count) or 0) >= need
end

local function wag_moonstorm_done()
    local manager = moon_manager()
    return manager ~= nil and has_any(manager.metplayers)
end

local function wag_selector_done()
    return wag_state_at_least(6)
end

-- Точная ретро-проверка: если Небесный защитник уже убит, вся цепочка
-- Лунного острова и алтарей была пройдена.
local function lunar_island_known()
    return tag_on("CELESTIAL_ORB_FOUND")
        or S.marks["cc_altar"] or S.marks["cc_sanctum"] or S.marks["cc_tribute"]
        or S.marks["cc_energy"] or S.marks["cc_siphonator"] or S.marks["cc_awaken"]
end

local function ruins_known()
    return tag_on("ATRIUM_KEY_FOUND")
        or S.marks["fw_key"] or S.marks["fw_gateway"]
        or S.marks["fw_skeleton"] or S.marks["fw_summon"]
end

local function atrium_known()
    return tag_on("VAULT_KEY_FOUND")
        or S.marks["fw_gateway"] or S.marks["fw_skeleton"] or S.marks["fw_summon"]
end

local function champion_killed()
    local manager = moon_manager()
    if manager and manager.GetCelestialChampionsKilled then
        local ok, count = pcall(manager.GetCelestialChampionsKilled, manager)
        return ok and (tonumber(count) or 0) > 0
    end
    return false
end

-- ------------------------------------------------------------ marks: table

local MARKS = {
    -- отшельница: friendlytasks
    { id = "hermit_chair", hermit = 18 },
    { id = "hermit_home", hermit = 3 },
    { id = "hermit_flowers", hermit = 4 },
    { id = "hermit_berry", hermit = 6 },
    { id = "hermit_lureplant", hermit = 9 },
    { id = "hermit_salvage", hermit = 5 },
    { id = "hermit_drying", hermit = 7 },
    { id = "hermit_rain", hermit = 10 },
    { id = "hermit_snow", hermit = 11 },
    { id = "hermit_salad", hermit = 12 },
    { id = "hermit_fish5", hermit = 8 },
    { id = "hermit_fallounder", hermit = 17 },
    { id = "hermit_tuna", hermit = 16 },
    { id = "hermit_sunfish", hermit = 15 },
    { id = "hermit_bream", hermit = 14 },

    -- Вагстаф
    { id = "wag_moonstorm", check = wag_moonstorm_done },
    { id = "wag_follow", check = wag_follow_done },
    { id = "wag_static", item = "moonstorm_static_item" },
    { id = "wag_junk", special = "wag_junk" },
    { id = "wag_spark", check = wag_spark_done },
    { id = "wag_map", check = wag_map_done },
    { id = "wag_evict", check = wag_evict_done },
    { id = "wag_substrate", check = wag_substrate_done },
    { id = "wag_gestalt", special = "wag_gestalt" },
    { id = "wag_revenant", death = "alterguardian_phase1_lunarrift" },
    { id = "wag_selector", prefab = "wagboss_robot", check = wag_selector_done },

    -- Чарли
    { id = "charlie_dreadstone", item = "dreadstone" },
    { id = "charlie_keystone", item = "vault_key", tag = "VAULT_KEY_FOUND" },
    { id = "charlie_ritual", prefab = "charlie_boss" },
    { id = "charlie_queen", death = "charlie_boss" },
    { id = "charlie_abomination", death = "shrouden" },
    { id = "charlie_gifts", item = { "mask_charlie_boshat", "king_cane", "queen_torch" } },

    -- путь к Небесному защитнику
    { id = "cc_island", near = { "moon_fissure" }, radius = 60, check = lunar_island_known },
    { id = "cc_altar", special = "moon_altar", check = champion_killed },
    { id = "cc_sanctum", special = "moon_altar_astral", check = champion_killed },
    { id = "cc_tribute", prefab = "moon_altar_cosmic", check = champion_killed },
    { id = "cc_energy", prefab = "moon_altar_link", check = champion_killed },
    { id = "cc_siphonator", prefab = "moon_device", check = champion_killed },
    { id = "cc_awaken", prefab = "alterguardian_phase1", check = champion_killed },

    -- путь к Древнему топливопряду
    { id = "fw_atrium", near = { "atrium_gate", "atrium_statue" }, radius = 50, check = atrium_known },
    { id = "fw_key", item = "atrium_key", tag = "ATRIUM_KEY_FOUND" },
    { id = "fw_gateway", prefab = "atrium_gate_activatedfx" },
    { id = "fw_skeleton", prefab = "fossil_stalker" },
    { id = "fw_shadow_atrium", item = "shadowheart" },
    { id = "fw_summon", prefab = "stalker_atrium" },

    -- вехи
    { id = "rifts_lunar", tag = "LUNAR_RIFTS_ACTIVE", prefab = "lunarrift_portal" },
    { id = "rifts_shadow", tag = "SHADOW_RIFTS_ACTIVE", prefab = "shadowrift_portal" },
    { id = "moon_orb", item = "moonrockseed", tag = "CELESTIAL_ORB_FOUND" },
    { id = "ruins", near = { "statueruins", "ruinsrelic", "nightmarelight", "vault_pillar", "minotaur", "atrium_gate" }, radius = 50, check = ruins_known },
    { id = "archives", tag = "ARCHIVES_ENERGIZED" },
    { id = "glommer", prefab = "glommer", item = "glommerflower" },
}

Tracker.MARKS = MARKS
Tracker.MARK_COUNT = #MARKS

function Tracker.Mark(id)
    if S.marks[id] then
        return false
    end
    S.marks[id] = true
    return true
end

function Tracker.RefreshMarks()
    local changed = false
    for _, def in ipairs(MARKS) do
        if not S.marks[def.id] then
            local done = false
            if def.tag then
                done = tag_on(def.tag)
            end
            if not done and def.item then
                done = any_player_has(as_list(def.item))
            end
            if not done and def.hermit then
                done = hermit_task_done(def.hermit)
            end
            if not done and def.check then
                local ok, value = pcall(def.check)
                done = ok and value == true
            end
            if not done and def.near then
                done = any_player_near(as_list(def.near), def.radius or 40)
            end
            if not done and def.special == "wag_gestalt" then
                done = wag_gestalt_done()
            end
            if done then
                Tracker.Mark(def.id)
                changed = true
            end
        end
    end
    if changed then
        Tracker.Write()
    end
end

-- Ретро-победы, которые мир хранит точно: число убийств Небесного
-- защитника и факт получения Древнего ключа (его даёт Древний страж).
function Tracker.RefreshRetro()
    local changed = false

    local manager = moon_manager()
    if manager and manager.GetCelestialChampionsKilled then
        local ok, count = pcall(manager.GetCelestialChampionsKilled, manager)
        count = ok and tonumber(count) or 0
        if count > 0 and (tonumber(S.retro["celestial_champion"]) or 0) < count then
            S.retro["celestial_champion"] = count
            changed = true
        end
    end

    if not S.retro["ancient_guardian"] then
        if tag_on("ATRIUM_KEY_FOUND") or any_player_has({ "atrium_key" }) then
            S.retro["ancient_guardian"] = 1
            changed = true
        end
    end

    if changed then
        Tracker.Write()
    end
end

-- ---------------------------------------------------------------- write

local function build_payload()
    local kills = obj({})
    for slug, kill in pairs(S.kills) do
        local levels = nil
        if kill.levels and next(kill.levels) ~= nil then
            levels = obj({})
            for piece, level in pairs(kill.levels) do
                levels[piece] = level
            end
        end
        kills[slug] = obj({
            count = kill.count or 0,
            date = kill.date or "",
            time = kill.time or 0,
            day = kill.day or 0,
            players = kill.players or {},
            levels = levels,
        })
    end

    local marks = obj({})
    for id, on in pairs(S.marks) do
        if on then
            marks[id] = true
        end
    end

    local retro = obj({})
    for slug, count in pairs(S.retro) do
        retro[slug] = count
    end

    return obj({
        app = "dst-compendium",
        version = 1,
        mod_version = MOD_VERSION,
        shard = S.shard,
        session = SESSION,
        updated_at = now(),
        world = world_state(),
        skills = skills_state(),
        kills = kills,
        marks = marks,
        retro = retro,
    })
end

-- Снимок для экрана прогресса в игре (запрашивается клиентом по RPC).
function Tracker.Snapshot()
    local kills = {}
    for slug, kill in pairs(S.kills) do
        local count = tonumber(kill.count) or 0
        if count > 0 then
            kills[slug] = obj({
                count = count,
                day = tonumber(kill.day) or 0,
                date = kill.date or "",
            })
        end
    end

    local marks = {}
    for id, on in pairs(S.marks) do
        if on then
            marks[id] = true
        end
    end

    local retro = {}
    for slug, count in pairs(S.retro) do
        local n = tonumber(count) or 0
        if n > 0 then
            retro[slug] = n
        end
    end

    return obj({
        shard = S.shard,
        world = world_state(),
        kills = kills,
        retro = retro,
        marks = marks,
        skills = skills_state(),
        mark_count = Tracker.MARK_COUNT,
    })
end

function Tracker.SnapshotJSON()
    return json_value(Tracker.Snapshot())
end

function Tracker.Write(force)
    S.shard = shard_id()
    Tracker.paths = sync_paths()
    local text = json_value(build_payload())

    if not force and text == S.last_json then
        return
    end
    S.last_json = text

    local ok = false
    for _, path in ipairs(Tracker.paths) do
        if write_file(path, text) then
            Tracker.path = path
            ok = true
            break
        end
    end

    if not ok then
        -- Штатное хранилище игры: client_save/dst_tracker_sync_<shard>.
        local sim = G.TheSim
        local persisted = false
        if sim and sim.SetPersistentString then
            local key = "dst_tracker_sync_" .. tostring(S.shard)
            persisted = pcall(sim.SetPersistentString, sim, key, text, false)
            if persisted then
                Tracker.path = "persistent:" .. key
            end
        end
        if persisted then
            if not S.logged_ok then
                S.logged_ok = true
                print("[dst-tracker] синхронизация пишется в сейв игры (" .. tostring(Tracker.path) .. ")")
            end
        elseif not S.logged_err then
            S.logged_err = true
            print("[dst-tracker] не удалось записать файл синхронизации")
        end
    elseif not S.logged_ok then
        S.logged_ok = true
        print("[dst-tracker] синхронизация пишется в " .. tostring(Tracker.path))
    end
end

-- ---------------------------------------------------------------- events

local function record_levels(kill, inst)
    if not inst or not inst.level then
        return
    end
    local prefab = tostring(inst.prefab or "")
    local piece = prefab:gsub("^shadow_", "")
    if piece == "" then
        return
    end
    local level = math.max(1, math.min(3, math.floor(tonumber(inst.level) or 1)))
    kill.levels = kill.levels or {}
    if not kill.levels[piece] or kill.levels[piece] < level then
        kill.levels[piece] = level
    end
end

function Tracker.OnDeath(slug, inst, data)
    local def = BOSS_MAP[slug]
    if not def then
        return
    end

    local t = now()
    local wait = math.max(tonumber(def.debounce) or 0, DEBOUNCE)
    local last = S.last[slug]
    local kill = S.kills[slug]
    local killer = data and player_name(data.afflicter)

    if last and t - last < wait and kill then
        -- Та же серия смертей: добираем уровни и игроков, победу не удваиваем.
        if def.levels then
            record_levels(kill, inst)
        end
        if killer then
            add_player(kill.players, killer)
        end
        Tracker.Write()
        return
    end

    kill = kill or { count = 0, players = {} }
    kill.count = (kill.count or 0) + 1
    kill.date = today()
    kill.time = t
    kill.day = current_day()
    kill.players = kill.players or {}

    if killer then
        add_player(kill.players, killer)
    end
    for _, name in ipairs(online_players()) do
        add_player(kill.players, name)
    end
    if def.levels then
        record_levels(kill, inst)
    end

    S.kills[slug] = kill
    S.last[slug] = t

    Tracker.Write()
end

-- --------------------------------------------------------------- install

function Tracker.Install()
    local count = 0
    for slug, def in pairs(BOSS_MAP) do
        for _, prefab in ipairs(def.prefabs) do
            count = count + 1
            AddPrefabPostInit(prefab, function(inst)
                if not inst.ismastersim then
                    return
                end
                inst:ListenForEvent("death", function(victim, data)
                    Tracker.OnDeath(slug, victim, data)
                end)
            end)
        end
    end

    -- Метки по спавну префаба и по смерти босса.
    for _, def in ipairs(MARKS) do
        if def.prefab then
            AddPrefabPostInit(def.prefab, function(inst)
                if not inst.ismastersim then
                    return
                end
                if Tracker.Mark(def.id) then
                    Tracker.Write()
                end
            end)
        end
        if def.death then
            AddPrefabPostInit(def.death, function(inst)
                if not inst.ismastersim then
                    return
                end
                inst:ListenForEvent("death", function()
                    if Tracker.Mark(def.id) then
                        Tracker.Write()
                    end
                end)
            end)
        end
    end

    -- Алтари собираются по частям: ждём полной сборки, а не первого спавна.
    AddPrefabPostInit("moon_altar", function(inst)
        if not inst.ismastersim then
            return
        end
        inst:DoPeriodicTask(5, function()
            if inst._stage and inst._stage >= 3 and not S.marks["cc_altar"] then
                Tracker.Mark("cc_altar")
                Tracker.Write()
            end
        end)
    end)
    AddPrefabPostInit("moon_altar_astral", function(inst)
        if not inst.ismastersim then
            return
        end
        inst:DoPeriodicTask(5, function()
            local workable = inst.components and inst.components.workable
            if not S.marks["cc_sanctum"]
                and inst._stage == 2
                and workable
                and workable.maxwork == TUNING.MOON_ALTAR_ASTRAL_COMPLETE_WORK
                and workable.workleft <= 0 then
                Tracker.Mark("cc_sanctum")
                Tracker.Write()
            end
        end)
    end)

    -- Теневые шахматы: полная клетка = 3 пойманных гештальта.
    AddPrefabPostInit("gestalt_cage_filled3", function(inst)
        if not inst.ismastersim then
            return
        end
        S.gestalt_full = S.gestalt_full + 1
        if S.gestalt_full >= 2 and Tracker.Mark("wag_gestalt") then
            Tracker.Write()
        end
    end)

    -- Свалка Вагстафа: метка после того, как её разобрали молотком.
    AddPrefabPostInit("wagstaff_machinery", function(inst)
        if not inst.ismastersim then
            return
        end
        inst:ListenForEvent("workfinished", function()
            if Tracker.Mark("wag_junk") then
                Tracker.Write()
            end
        end)
    end)

    -- Навыки: обновляем снимок сразу после изучения/сброса/получения озарения.
    AddPlayerPostInit(function(inst)
        if not inst.ismastersim then
            return
        end
        inst:ListenForEvent("onactivateskill_server", function()
            Tracker.Write()
        end)
        inst:ListenForEvent("ondeactivateskill_server", function()
            Tracker.Write()
        end)
        inst:ListenForEvent("onaddskillxp_server", function()
            Tracker.Write()
        end)
    end)

    AddPrefabPostInit("world", function(inst)
        if not inst.ismastersim then
            return
        end
        inst:DoTaskInTime(2, function()
            Tracker.Write(true)
        end)
        inst:DoTaskInTime(6, function()
            Tracker.RefreshMarks()
            Tracker.RefreshRetro()
        end)
        inst:DoPeriodicTask(10, function()
            Tracker.RefreshMarks()
            Tracker.RefreshRetro()
        end)
        inst:DoPeriodicTask(HEARTBEAT, function()
            Tracker.Write()
        end)
    end)

    Tracker.paths = sync_paths()
    print("[dst-tracker] готов: " .. tostring(count) .. " префабов, " ..
        tostring(#MARKS) .. " меток, файл " .. tostring(Tracker.paths[1]))
end
