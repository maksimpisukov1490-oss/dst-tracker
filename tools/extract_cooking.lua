-- Выгружает таблицу ingredients из scripts/cooking.lua.
-- Запуск из распакованного scripts.zip:
--   luajit tools/extract_cooking.lua /path/to/scripts
-- Пишет tools/cook_ingredients.json (теги ингредиентов казана).
--
-- Нужны scripts/cooking.lua и scripts/prefabs/oceanfishdef.lua.
local scriptdir = arg[1] or "."
local outpath = arg[2] or "tools/cook_ingredients.json"

local function stub()
    return setmetatable({}, {
        __index = function() return stub() end,
        __call = function() return 0 end,
    })
end

local tuning = {
    HEALING_TINY = 1, HEALING_SMALL = 3, HEALING_MEDSMALL = 8,
    CALORIES_SMALL = 12.5, CALORIES_MED = 25, SANITY_SMALL = 10,
    BLACKCATFISH_LUCK = 0,
    OCEANFISH_LURE_PREFERENCE = setmetatable({}, { __index = function() return {} end }),
}
setmetatable(tuning, { __index = function() return 0 end })

local foodtype = { MEAT = {}, VEGGIE = {}, BERRY = {}, GENERIC = {} }
local seasons = { AUTUMN = "autumn", WINTER = "winter", SPRING = "spring", SUMMER = "summer" }
local ground = { OCEAN_COASTAL = 1, OCEAN_SWELL = 2, OCEAN_ROUGH = 3, OCEAN_WATERLOG = 4 }
local tiles = {
    OCEAN_COASTAL = 1, OCEAN_SWELL = 2, OCEAN_ROUGH = 3,
    OCEAN_WATERLOG = 4, OCEAN_BRINEPOOL = 5, OCEAN_HAZARDOUS = 6,
}

local env = {}
setmetatable(env, {
    __index = function(_, k)
        local v = _G[k]
        if v ~= nil then return v end
        if k == "TUNING" then return tuning end
        if k == "FOODTYPE" then return foodtype end
        if k == "SEASONS" then return seasons end
        if k == "GROUND" then return ground end
        if k == "WORLD_TILES" then return tiles end
        return stub()
    end,
})
for _, k in ipairs({ "math", "table", "string", "pairs", "ipairs", "setmetatable",
                     "tostring", "tonumber", "type", "pcall" }) do
    env[k] = _G[k]
end
env.print = function() end
env.TUNING = tuning
env.FOODTYPE = foodtype
env.SEASONS = seasons
env.GROUND = ground
env.WORLD_TILES = tiles
env.STRINGS = stub()
env.deepcopy = function(t) return t end

env.require = function(name)
    if name == "prefabs/oceanfishdef" then
        local f = assert(loadfile(scriptdir .. "/prefabs/oceanfishdef.lua"))
        setfenv(f, env)
        return f()
    end
    return {}
end
env.AddCookerRecipe = function() end
env.AddRecipeCard = function() end
env.ModManager = {
    GetEnabledModNames = function() return {} end,
    GetMod = function() return nil end,
}

local fn = assert(loadfile(scriptdir .. "/cooking.lua"))
setfenv(fn, env)
local mod = fn()
local ingredients = mod.ingredients

local function esc(s)
    s = tostring(s)
    s = s:gsub("\\", "\\\\"):gsub('"', '\\"'):gsub("\n", "\\n")
    return '"' .. s .. '"'
end

local parts = {}
for name, data in pairs(ingredients) do
    local tags = {}
    for k, v in pairs(data.tags or {}) do
        tags[#tags + 1] = esc(k) .. ":" .. tostring(v)
    end
    parts[#parts + 1] = esc(name) .. ':{"tags":{' .. table.concat(tags, ",") .. "}}"
end

local f = assert(io.open(outpath, "w"))
f:write("{" .. table.concat(parts, ",") .. "}")
f:close()
print("ingredients: " .. tostring(#parts) .. " -> " .. outpath)
