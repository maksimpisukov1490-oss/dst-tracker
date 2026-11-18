-- Запуск из распакованного scripts.zip:
--   luajit /path/to/tools/extract_recipes.lua /path/to/output
-- Пишет recipes_raw.json и recipe_meta.json.
local outdir = arg[1] or "/tmp/opencode"
local out = {}
local proxy
proxy = setmetatable({}, {
    __index = function() return proxy end,
    __call = function() return false end,
    __add = function() return 0 end,
    __sub = function() return 0 end,
    __mul = function() return 0 end,
    __div = function() return 0 end,
    __mod = function() return 0 end,
    __unm = function() return 0 end,
    __concat = function(a,b) return tostring(a)..tostring(b) end,
    __eq = function() return false end,
    __lt = function() return false end,
    __le = function() return false end,
    __len = function() return 0 end,
    __tostring = function() return "" end,
})

local env = {}
setmetatable(env, { __index = function(t, k)
    local v = _G[k]
    if v ~= nil then return v end
    if k == "STRINGS" then
        return setmetatable({}, { __index = function() return proxy end })
    end
    return proxy
end })

env._G = env
env.math = math
env.table = table
env.string = string
env.os = os
env.io = io
env.pairs = pairs
env.ipairs = ipairs
env.type = type
env.tostring = tostring
env.tonumber = tonumber
env.pcall = pcall
env.error = error
env.assert = assert
env.setmetatable = setmetatable
env.getmetatable = getmetatable
env.rawget = rawget
env.rawset = rawset
env.next = next
env.select = select
env.unpack = unpack
env.print = function() end
env.BRANCH = "release"
env.PLATFORM = "PC"
env.IsRail = function() return false end
env.IsConsole = function() return false end
env.IsPS4 = function() return false end
env.IsXboxOne = function() return false end
env.ChineseOnPS4 = function() return false end
env.JapaneseOnPS4 = function() return false end
env.TheNet = nil
env.TheSim = nil
env.TheWorld = nil
env.resolvefilepath = function(p) return p end
env.GetInventoryItemAtlas = function() return "images/inventoryimages.xml" end
env.RGB = function(r,g,b,a) return {r,g,b,a} end
function table.invert(t)
    local r = {}
    for k, v in pairs(t) do r[v] = k end
    return r
end
function table.contains(t, v)
    for _, x in pairs(t) do if x == v then return true end end
    return false
end
function table.containskey(t, k) return t[k] ~= nil end
function table.getkeys(t) local r = {} for k in pairs(t) do r[#r+1] = k end return r end
function table.reverse(t) local r = {} for i = #t, 1, -1 do r[#r+1] = t[i] end return r end
function table.count(t, value)
    local n = 0
    for _, v in pairs(t) do if value == nil or v == value then n = n + 1 end end
    return n
end
function table.setfield(t, name, value) t[name] = value end
function table.getfield(t, name) return t[name] end
function table.keysareidentical(a, b)
    for k in pairs(a) do if b[k] == nil then return false end end
    for k in pairs(b) do if a[k] == nil then return false end end
    return true
end

env.require = function(name)
    if name == "techtree" then
        return { Create = function(t) return t or {} end }
    end
    if name == "recipe" then return {} end
    return setmetatable({}, { __index = function() return function() end end })
end
env.Class = function(base, ctor)
    local c = {}
    c.__index = c
    c.__call = function(_, ...) local o=setmetatable({}, c); if ctor then ctor(o, ...) end; return o end
    return c
end

local function loadfile_env(path)
    local fn = assert(loadfile(path))
    setfenv(fn, env)
    return fn
end

-- constants + tuning
loadfile_env("scripts/constants.lua")()
loadfile_env("scripts/tuning.lua")()

local function add_recipe(kind, name, ingredients, tech, config)
    local ings = {}
    for _, ing in ipairs(ingredients or {}) do
        if type(ing) == "table" then
            local t = ing.type
            local a = ing.amount
            if type(t) ~= "string" then t = tostring(t) end
            if type(a) ~= "number" then a = 0 end
            ings[#ings + 1] = { type = t, amount = a }
        end
    end
    local cfg = type(config) == "table" and config or {}
    local tech_out = {}
    if type(tech) == "table" then
        for k, v in pairs(tech) do
            if type(k) == "string" and type(v) == "number" then tech_out[k] = v end
        end
    end
    out[#out + 1] = {
        kind = kind,
        name = tostring(name),
        ingredients = ings,
        tech = tech_out,
        product = type(cfg.product) == "string" and cfg.product or tostring(name),
        builder_tag = type(cfg.builder_tag) == "string" and cfg.builder_tag or nil,
        no_builder_tag = type(cfg.no_builder_tag) == "string" and cfg.no_builder_tag or nil,
        nameoverride = type(cfg.nameoverride) == "string" and cfg.nameoverride or nil,
        description = type(cfg.description) == "string" and cfg.description or nil,
        numtogive = type(cfg.numtogive) == "number" and cfg.numtogive or nil,
        placer = type(cfg.placer) == "string" and cfg.placer or nil,
    }
end

function env.Recipe(name, ingredients, tab, level, placer, min_spacing, nounlock, numtogive, builder_tag, atlas, image, testfn, product, build_mode, build_distance)
    add_recipe("Recipe", name, ingredients, level, {
        product = product,
        builder_tag = builder_tag,
        numtogive = numtogive,
        placer = type(placer) == "string" and placer or nil,
    })
    return {}
end

function env.Recipe2(name, ingredients, tech, config)
    add_recipe("Recipe2", name, ingredients, tech, config)
    return {}
end

function env.DeconstructRecipe(name, ingredients, config)
    return {}
end

function env.Ingredient(t, amount)
    return { type = t, amount = amount }
end

env.AllRecipes = {}
env.CRAFTING_FILTERS = {
    { default_sort_values = setmetatable({}, { __index = function() return true end }) },
}
loadfile_env("scripts/recipes.lua")()

-- English names
loadfile_env("scripts/strings.lua")()


-- Crafting filters
env.TheCraftingMenuProfile = {
    GetFavorites = function() return {} end,
    GetFavoritesOrder = function() return {} end,
}
env.MODCHARACTERLIST = {}
env.MOD_CRAFTING_AVATAR_LOCATIONS = { Default = "" }
env.MOD_AVATAR_LOCATIONS = { Default = "" }
env.softresolvefilepath = function(p) return p end
env.CRAFTING_FILTERS = {}
loadfile_env("scripts/recipes_filter.lua")()

-- dump JSON manually (simple; all values are strings/numbers)
local function esc(s)
    s = tostring(s)
    s = s:gsub("\\", "\\\\"):gsub('"', '\\"'):gsub("\n", "\\n"):gsub("\r", "")
    return '"' .. s .. '"'
end
local parts = {}
for _, r in ipairs(out) do
    local ings = {}
    for _, ing in ipairs(r.ingredients) do
        ings[#ings + 1] = '{"type":' .. esc(ing.type) .. ',"amount":' .. tostring(ing.amount) .. '}'
    end
    local tech = {}
    for k, v in pairs(r.tech) do
        tech[#tech + 1] = esc(k) .. ':' .. tostring(v)
    end
    local fields = {
        '{"kind":' .. esc(r.kind),
        '"name":' .. esc(r.name),
        '"product":' .. esc(r.product),
        '"ingredients":[' .. table.concat(ings, ",") .. ']',
        '"tech":{' .. table.concat(tech, ",") .. '}',
    }
    if r.builder_tag then fields[#fields+1] = '"builder_tag":' .. esc(r.builder_tag) end
    if r.no_builder_tag then fields[#fields+1] = '"no_builder_tag":' .. esc(r.no_builder_tag) end
    if r.nameoverride then fields[#fields+1] = '"nameoverride":' .. esc(r.nameoverride) end
    if r.description then fields[#fields+1] = '"description":' .. esc(r.description) end
    if r.numtogive then fields[#fields+1] = '"numtogive":' .. tostring(r.numtogive) end
    if r.placer then fields[#fields+1] = '"placer":' .. esc(r.placer) end
    parts[#parts + 1] = table.concat(fields, ",") .. '}'
end
local f = assert(io.open(outdir .. "/recipes_raw.json", "w"))
f:write("[" .. table.concat(parts, ",") .. "]")
f:close()

-- names + filters
local name_parts = {}
for k, v in pairs(env.STRINGS.NAMES or {}) do
    if type(k) == "string" and type(v) == "string" then
        name_parts[#name_parts + 1] = esc(k) .. ":" .. esc(v)
    end
end
local filter_parts = {}
for fname, filter in pairs(env.CRAFTING_FILTERS) do
    local names = {}
    if type(filter.recipes) == "table" then
        for _, r in ipairs(filter.recipes) do
            if type(r) == "string" then names[#names + 1] = esc(r) end
        end
    end
    if type(filter.default_sort_values) == "table" then
        for r in pairs(filter.default_sort_values) do
            if type(r) == "string" then names[#names + 1] = esc(r) end
        end
    end
    filter_parts[#filter_parts + 1] = esc(fname) .. ':[' .. table.concat(names, ",") .. ']'
end
local mf = assert(io.open(outdir .. "/recipe_meta.json", "w"))
mf:write('{"names":{' .. table.concat(name_parts, ",") .. '},"filters":{' .. table.concat(filter_parts, ",") .. '}}')
mf:close()
print("recipes", #out, "names", #name_parts, "filters", #filter_parts)
