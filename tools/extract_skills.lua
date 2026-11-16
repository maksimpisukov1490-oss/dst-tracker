local root = arg[1]
package.path = root .. "/scripts/?.lua;" .. root .. "/scripts/?/init.lua;" .. package.path
local real_require = require
require = function(name)
    local ok, mod = pcall(real_require, name)
    if ok then return mod end
    return setmetatable({}, { __index = function(_, k) return k end })
end
UPGRADETYPES = setmetatable({}, { __index = function() return "UPGRADE" end })
SPELLTYPES = setmetatable({}, { __index = function() return "SPELL" end })
local chars = { "walter", "wathgrithr", "wendy", "willow", "wilson", "winona", "wolfgang", "woodie", "wormwood", "wortox", "wurt", "wx78" }

-- DST utility
table.contains = function(t, v)
    for _, x in ipairs(t) do if x == v then return true end end
    return false
end

local function proxy()
    return setmetatable({}, { __index = function(_, k) return k end })
end
local function strproxy()
    return setmetatable({}, { __index = function(_, k)
        if type(k) == "string" and (k:match("_TITLE$") or k:match("_DESC$")) then
            return k
        end
        return strproxy()
    end })
end
STRINGS = { SKILLTREE = strproxy() }
local function deepproxy()
    return setmetatable({}, { __index = function(t, k)
        local v = deepproxy()
        rawset(t, k, v)
        return v
    end })
end
TUNING = deepproxy()
local function noop() return 0 end
local function make_lock(desc)
    return function(extra, not_root)
        return {
            desc = desc,
            root = not not_root,
            group = extra and extra.group or "allegiance",
            tags = { "allegiance", "lock" },
            lock = true,
            pos = extra and extra.pos,
            connects = extra and extra.connects,
        }
    end
end
local FN = {
    CountSkills = noop,
    CountTags = noop,
    HasTag = function() return false end,
    SkillHasTags = function() return false end,
    MakeFuelWeaverLock = make_lock("ALLEGIANCE_LOCK_2_DESC"),
    MakeNoShadowLock = make_lock("ALLEGIANCE_LOCK_5_DESC"),
    MakeCelestialChampionLock = make_lock("ALLEGIANCE_LOCK_3_DESC"),
    MakeNoLunarLock = make_lock("ALLEGIANCE_LOCK_4_DESC"),
    MakePurelyVisualLock = make_lock("LOCK"),
}

local function esc(s)
    s = tostring(s or "")
    return '"' .. s:gsub('\\', '\\\\'):gsub('"', '\\"'):gsub('\n', '\\n') .. '"'
end
local function list(t)
    local out = {}
    for _, v in ipairs(t or {}) do out[#out + 1] = esc(v) end
    return "[" .. table.concat(out, ",") .. "]"
end
local function skilljson(name, s)
    local px, py = 0, 0
    if s.pos then px, py = s.pos[1] or 0, s.pos[2] or 0 end
    return "{" ..
        '"name":' .. esc(name) ..
        ',"title":' .. esc(s.title) ..
        ',"desc":' .. esc(s.desc) ..
        ',"icon":' .. esc(s.icon) ..
        ',"x":' .. tostring(px) ..
        ',"y":' .. tostring(py) ..
        ',"group":' .. esc(s.group) ..
        ',"tags":' .. list(s.tags) ..
        ',"root":' .. (s.root and "true" or "false") ..
        ',"infographic":' .. (s.infographic and "true" or "false") ..
        ',"lock":' .. ((s.lock_open or s.lock) and "true" or "false") ..
        ',"connects":' .. list(s.connects) ..
        ',"locks":' .. list(s.locks) ..
        "}"
end

local out = {}
for _, ch in ipairs(chars) do
    local path = root .. "/scripts/prefabs/skilltree_" .. ch .. ".lua"
    local ok, Build = pcall(dofile, path)
    if not ok then
        io.stderr:write("ERR " .. ch .. " " .. tostring(Build) .. "\n")
    else
        local ok2, data = pcall(Build, FN)
        if not ok2 then
            io.stderr:write("ERRBUILD " .. ch .. " " .. tostring(data) .. "\n")
        else
            local skills = {}
            local names = {}
            for name in pairs(data.SKILLS) do names[#names + 1] = name end
            table.sort(names)
            for _, name in ipairs(names) do
                skills[#skills + 1] = skilljson(name, data.SKILLS[name])
            end
            out[#out + 1] = '"' .. ch .. '":{"skills":[' .. table.concat(skills, ",") .. "]}"
        end
    end
end
print("{" .. table.concat(out, ",") .. "}")
