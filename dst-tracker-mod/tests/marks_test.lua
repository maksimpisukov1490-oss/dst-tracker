-- Запуск: DST_TRACKER_SYNC=/tmp/marks.json luajit tests/marks_test.lua .
-- Оффлайн-тест отслеживания вкладки «Прогресс».
-- Запуск: DST_TRACKER_SYNC=/tmp/marks.json luajit tests/marks_test.lua .
local root = arg[1]
local MODNAME = "dst-tracker-sync"

local postinits = {}

local function AddPrefabPostInit(prefab, fn)
    postinits[prefab] = postinits[prefab] or {}
    table.insert(postinits[prefab], fn)
end

local function GetModConfigData(name)
    if name == "debounce" then return 15 end
    if name == "heartbeat" then return 30 end
    return nil
end

local function inv(items)
    return {
        itemslots = items or {},
        equipslots = {},
        FindItem = function(self, fn)
            for _, item in pairs(self.itemslots) do
                if fn(item) then return item end
            end
        end,
        GetOverflowContainer = function() return nil end,
    }
end

local function item(prefab)
    return { prefab = prefab }
end

local player = {
    prefab = "willow",
    name = "Recviem",
    userid = "U1",
    IsValid = function() return true end,
    Transform = { GetWorldPosition = function() return 0, 0, 0 end },
    components = {
        skilltreeupdater = {
            GetActivatedSkills = function() return { willow_controlled_burn_1 = true, willow_embers = true } end,
            GetAvailableSkillPoints = function() return 3 end,
            GetSkillXP = function() return 42 end,
        },
        inventory = inv({
            item("dreadstone"), item("vault_key"), item("moonstorm_static_item"),
            item("security_pulse_cage"), item("mapscroll_tricker"), item("atrium_key"),
            item("shadowheart"), item("mask_charlie_boshat"), item("king_cane"),
            item("queen_torch"), item("moonrockseed"), item("glommerflower"),
        }),
    },
}

local engine = {
    TUNING = { WAGSTAFF_NPC_HUNTS = 4, MOON_ALTAR_ASTRAL_COMPLETE_WORK = 10 },
    WORLDSTATETAGS = {
        GetTagEnabled = function(tag)
            return tag == "LUNAR_RIFTS_ACTIVE" or tag == "ARCHIVES_ENERGIZED"
                or tag == "ATRIUM_KEY_FOUND" or tag == "VAULT_KEY_FOUND"
                or tag == "CELESTIAL_ORB_FOUND"
        end,
    },
    TheShard = { GetShardId = function() return "1" end },
    TheWorld = {
        ismastersim = true,
        state = { cycles = 42, season = "autumn", phase = "day" },
        HasTag = function() return false end,
        components = {
            hermitcrab_relocation_manager = {
                hermitcrab = {
                    components = {
                        friendlevels = {
                            friendlytasks = {
                                [3] = { complete = true },
                                [4] = { complete = true },
                                [18] = { complete = true },
                            },
                        },
                    },
                },
            },
            wagpunk_arena_manager = {
                sparkark = true,
                pearlmap = true,
                pearlmove = true,
                turfed = true,
                state = 6,
                GetTotalDronePlacementCount = function() return 76 end,
            },
            moonstormmanager = {
                metplayers = { U1 = true },
                wagstaff = { hunt_count = 4 },
                GetCelestialChampionsKilled = function() return 2 end,
            },
        },
    },
    TheSim = {
        SetPersistentString = function() end,
        FindEntities = function(_, x, y, z, radius)
            return { { prefab = "moon_fissure" }, { prefab = "atrium_gate" } }
        end,
    },
    TheNet = {
        GetServerName = function() return "Мир A" end,
        GetUserID = function() return "U1" end,
        GetClientTable = function()
            return { { userid = "U1", name = "Recviem", prefab = "willow" } }
        end,
    },
    AllPlayers = { player },
    persisted = 0,
}
local G = setmetatable(engine, { __index = _G })

local missing, env = {}, nil
local function sandbox_index(_, k)
    missing[#missing + 1] = k
    return nil
end

local function modimport(modulename)
    local fn = assert(loadfile(root .. "/" .. modulename .. ".lua"))
    setfenv(fn, env)
    fn()
end

env = {
    pairs = pairs, ipairs = ipairs, print = print, math = math, table = table,
    type = type, string = string, tostring = tostring, require = require,
    TUNING = engine.TUNING,
    GLOBAL = G, modname = MODNAME, MODROOT = root .. "/",
    modimport = modimport,
    AddPrefabPostInit = AddPrefabPostInit,
    GetModConfigData = GetModConfigData,
    modassert = assert, moderror = error,
}
env.env = env
setmetatable(env, { __index = sandbox_index })

local mainfn = assert(loadfile(root .. "/modmain.lua"))
setfenv(mainfn, env)
local ok, err = pcall(mainfn)
if not ok then
    print("FAIL modmain: " .. tostring(err))
    os.exit(1)
end

local function spawn(prefab, inst)
    inst = inst or {}
    inst.prefab = inst.prefab or prefab
    inst.ismastersim = true
    inst.handlers = {}
    inst.ListenForEvent = function(self, event, fn)
        table.insert(self.handlers, fn)
    end
    inst.DoPeriodicTask = function(self, t, fn) fn() end
    inst.DoTaskInTime = function(self, t, fn) fn() end
    for _, fn in ipairs(postinits[prefab] or {}) do
        fn(inst)
    end
    return inst
end

local function die(prefab, inst)
    inst = spawn(prefab, inst)
    for _, fn in ipairs(inst.handlers) do
        fn(inst, { afflicter = nil })
    end
end

-- структуры и события
spawn("moon_altar", { _stage = 3 })
spawn("moon_altar_astral", { _stage = 2, components = { workable = { maxwork = 10, workleft = 0 } } })
spawn("moon_altar_cosmic")
spawn("moon_altar_link")
spawn("moon_device")
spawn("alterguardian_phase1")
spawn("atrium_gate_activatedfx")
spawn("fossil_stalker")
spawn("stalker_atrium")
spawn("charlie_boss")
spawn("wagboss_robot")
spawn("lunarrift_portal")
spawn("shadowrift_portal")
spawn("glommer")
spawn("gestalt_cage_filled3")
spawn("gestalt_cage_filled3")

local junk = spawn("wagstaff_machinery")
for _, fn in ipairs(junk.handlers) do fn(junk, {}) end

die("charlie_boss")
die("shrouden")
die("alterguardian_phase1_lunarrift")

-- периодическая проверка: предметы, теги, менеджеры, позиции, отшельница
env.Tracker.RefreshMarks()
env.Tracker.RefreshRetro()

local uniq, seen = {}, {}
for _, k in ipairs(missing) do
    if not seen[k] then seen[k] = true; uniq[#uniq + 1] = k end
end
if #uniq > 0 then
    print("FAIL sandbox: отсутствуют глобалы: " .. table.concat(uniq, ", "))
    os.exit(1)
end
print("OK marks refreshed")
