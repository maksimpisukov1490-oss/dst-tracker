-- Запуск: DST_TRACKER_SYNC=/tmp/x.json luajit tests/sandbox_test.lua . 15 30
-- Офлайн-песочница DST для мода: окружение строится как в scripts/mods.lua
-- (CreateEnvironment + InsertPostInitFunctions + modimport без возврата значения).
-- Любое чтение отсутствующего глобала и любой вызов nil фиксируются.
local root = arg[1]
local debounce = tonumber(arg[2] or "15")
local heartbeat = tonumber(arg[3] or "30")
local MODNAME = "dst-tracker-sync"

-- «_G» движка: стандартная библиотека + заглушки TheWorld и т.д.
local engine = {
    TheShard = { GetShardId = function() return "1" end },
    TheWorld = nil,
    TheSim = { SetPersistentString = function(_, key, text) engine.persisted = (engine.persisted or 0) + 1 end },
    TheNet = {
        GetIsServer = function() return true end,
        GetIsClient = function() return false end,
        GetServerName = function() return "Мир Recviem1242_LTE" end,
        GetUserID = function() return "U1" end,
        GetClientTable = function()
            return {
                { userid = "U1", name = "Recviem1242", prefab = "willow" },
                { userid = "U2", name = "Другой", prefab = "wilson" },
            }
        end,
    },
    AllPlayers = {},
    TUNING = { MOON_ALTAR_ASTRAL_COMPLETE_WORK = 10 },
    persisted = 0,
}
local G = setmetatable(engine, { __index = _G })

local missing, env = {}, nil
local function sandbox_index(_, k)
    missing[#missing + 1] = k
    return nil
end

local rpc_handlers = {}
local client_rpc_handlers = {}
local rpc_sent = nil
local function AddModRPCHandler(ns, name, fn)
    rpc_handlers[ns .. "." .. name] = fn
end
local function AddClientModRPCHandler(ns, name, fn)
    client_rpc_handlers[ns .. "." .. name] = fn
end
local function GetModRPC(ns, name)
    return { namespace = ns, name = name }
end
local function GetClientModRPC(ns, name)
    return { namespace = ns, name = name }
end
local function SendModRPCToClient(id, userid, data)
    rpc_sent = { id = id, userid = userid, data = data }
end
local function SendModRPCToServer()
end

local postinits = {}
local player_postinits = {}
local function AddPlayerPostInit(fn)
    table.insert(player_postinits, fn)
end
local function AddPrefabPostInit(prefab, fn)
    postinits[prefab] = postinits[prefab] or {}
    table.insert(postinits[prefab], fn)
end

local function GetModConfigData(name)
    if name == "debounce" then return debounce end
    if name == "heartbeat" then return heartbeat end
    return nil
end

local function modimport(modulename)
    local path = root .. "/" .. modulename .. ".lua"
    local fn = assert(loadfile(path))
    setfenv(fn, env)
    fn() -- как в mods.lua: возвращаемое значение не используется
end

env = {
    pairs = pairs, ipairs = ipairs, print = print, math = math, table = table,
    type = type, string = string, tostring = tostring, pcall = pcall, require = require,
    GLOBAL = G, TUNING = engine.TUNING, modname = MODNAME, MODROOT = root .. "/",
    modimport = modimport,
    AddPrefabPostInit = AddPrefabPostInit,
    AddPlayerPostInit = AddPlayerPostInit,
    AddModRPCHandler = AddModRPCHandler,
    AddClientModRPCHandler = AddClientModRPCHandler,
    GetModRPC = GetModRPC,
    GetClientModRPC = GetClientModRPC,
    SendModRPCToClient = SendModRPCToClient,
    SendModRPCToServer = SendModRPCToServer,
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

-- мир появился: TheWorld в движке появляется после загрузки
engine.TheWorld = {
    ismastersim = true,
    state = { cycles = 42, season = "autumn", phase = "day" },
    HasTag = function() return false end,
    DoTaskInTime = function(self, t, fn) fn() end,
    DoPeriodicTask = function() end,
}
for _, fn in ipairs(postinits["world"] or {}) do
    local inst = engine.TheWorld
    inst.entity = nil
    fn(inst)
end

local function die(prefab, level)
    local inst = { prefab = prefab, level = level, ismastersim = true, IsValid = function() return true end }
    inst.ListenForEvent = function(self, event, fn) self.handler = fn end
    for _, fn in ipairs(postinits[prefab] or {}) do fn(inst) end
    if not inst.handler then
        print("FAIL no death handler for " .. prefab)
        os.exit(1)
    end
    inst.handler(inst, { afflicter = nil })
end

die("shadow_knight", 3)
die("shadow_bishop", 3)
die("shadow_rook", 3)
die("deerclops")
die("deerclops")
die("twinofterror1")
die("twinofterror2")
die("stalker_atrium")

local ok_snap, snap = pcall(env.Tracker.SnapshotJSON)
if not ok_snap then
    print("FAIL snapshot: " .. tostring(snap))
    os.exit(1)
end
if type(snap) ~= "string" or #snap < 10 then
    print("FAIL snapshot json")
    os.exit(1)
end
if env.Tracker.MARK_COUNT ~= #env.Tracker.MARKS then
    print("FAIL mark count")
    os.exit(1)
end

local boss_count = 0
for _ in pairs(env.BOSS_DATA or {}) do boss_count = boss_count + 1 end
if boss_count ~= 36 then
    print("FAIL boss data count: " .. tostring(boss_count))
    os.exit(1)
end
if not env.BOSS_CATEGORIES or #env.BOSS_CATEGORIES ~= 5 then
    print("FAIL boss categories")
    os.exit(1)
end

local rpc = rpc_handlers["dst_tracker.request_snapshot"]
if not rpc then
    print("FAIL request_snapshot rpc")
    os.exit(1)
end
rpc({ userid = "U1" })
if not rpc_sent or rpc_sent.userid ~= "U1" or type(rpc_sent.data) ~= "string" then
    print("FAIL snapshot rpc response")
    os.exit(1)
end

local uniq, seen = {}, {}
for _, k in ipairs(missing) do
    if not seen[k] then seen[k] = true; uniq[#uniq + 1] = k end
end
if #uniq > 0 then
    print("FAIL sandbox: модуль читает отсутствующие глобалы: " .. table.concat(uniq, ", "))
    os.exit(1)
end
print("OK persisted=" .. tostring(engine.persisted) .. " snapshot=" .. tostring(#snap) .. " marks=" .. tostring(env.Tracker.MARK_COUNT) .. " bosses=" .. tostring(boss_count) .. " rpc=" .. tostring(#rpc_sent.data))
