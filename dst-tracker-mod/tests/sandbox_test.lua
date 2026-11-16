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
    persisted = 0,
}
local G = setmetatable(engine, { __index = _G })

local missing, env = {}, nil
local function sandbox_index(_, k)
    missing[#missing + 1] = k
    return nil
end

local postinits = {}
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
    type = type, string = string, tostring = tostring, require = require,
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

local uniq, seen = {}, {}
for _, k in ipairs(missing) do
    if not seen[k] then seen[k] = true; uniq[#uniq + 1] = k end
end
if #uniq > 0 then
    print("FAIL sandbox: модуль читает отсутствующие глобалы: " .. table.concat(uniq, ", "))
    os.exit(1)
end
print("OK persisted=" .. tostring(engine.persisted))
