-- Загрузка и базовый прогон клиентского модуля без игры.
-- Запуск: luajit tests/client_load_test.lua .

local root = arg[1] or "."

local function widget_class(name)
    local c = { name = name }
    c._ctor = function() end
    c.AddChild = function(self, child) return child end
    c.SetPosition = function(self, x, y, z) self.x, self.y, self.z = x, y, z end
    c.SetScale = function(self, x, y) self.sx, self.sy = x, y end
    c.SetHAlign = function(self, v) self.halign = v end
    c.SetVAlign = function(self, v) self.valign = v end
    c.SetString = function(self, v) self.text = v end
    c.SetText = function(self, v) self.text = v end
    c.SetTruncatedString = function(self, v) self.text = v end
    c.SetRegionSize = function() end
    c.EnableWordWrap = function() end
    c.SetColour = function() end
    c.SetTexture = function(self, atlas, tex) self.atlas, self.tex = atlas, tex end
    c.Show = function(self) self.hidden = false end
    c.Hide = function(self) self.hidden = true end
    c.SetOnClick = function(self, fn) self.onclick = fn end
    c.SetScaleMode = function(self, v) self.scalemode = v end
    c.SetTint = function(self, r, g, b, a) self.tint = { r, g, b, a } end
    c.SetVRegPoint = function() end
    c.SetHRegPoint = function() end
    c.SetVAnchor = function() end
    c.SetHAnchor = function() end
    c.GetPosition = function(self) return { x = self.x or 0, y = self.y or 0, z = self.z or 0 } end
    c.GetSize = function() return 640, 500 end
    c.SetSize = function() end
    c.SetList = function(self, list) self.items = list end
    c.OnControl = function() return false end
    if name == "imagebutton" then
        c.image = widget_class("image")()
    end
    setmetatable(c, { __call = function(_, ...)
        local o = setmetatable({}, { __index = c })
        if c._ctor then c._ctor(o, ...) end
        return o
    end })
    return c
end

local widgets = {
    ["widgets/screen"] = widget_class("screen"),
    ["widgets/widget"] = widget_class("widget"),
    ["widgets/text"] = widget_class("text"),
    ["widgets/image"] = widget_class("image"),
    ["widgets/imagebutton"] = widget_class("imagebutton"),
    ["widgets/scrollablelist"] = widget_class("scrollablelist"),
    ["widgets/redux/templates"] = {
        CurlyWindow = function() return widget_class("curly")() end,
    },
}

local hooks = {}
local env = {
    pairs = pairs, ipairs = ipairs, print = print, math = math, table = table,
    type = type, string = string, tostring = tostring, tonumber = tonumber, pcall = pcall,
    Class = function(base, ctor)
        local c = { _base = base }
        setmetatable(c, { __index = base, __call = function(_, ...)
            local o = setmetatable({}, { __index = c })
            if ctor then ctor(o, ...) end
            return o
        end })
        return c
    end,
    require = function(name)
        local w = widgets[name]
        if not w then error("unexpected require: " .. name) end
        return w
    end,
    AddClassPostConstruct = function(name, fn) hooks[name] = fn end,
    STRINGS = { NAMES = { WILLOW = "Уиллоу", WILSON = "Уилсон" } },
    UICOLOURS = {
        GOLD = {}, GOLD_SELECTED = {}, GOLD_UNIMPORTANT = {}, GOLD_CLICKABLE = {},
        GREY = {}, BROWN_DARK = {}, EGGSHELL = {},
    },
    CHATFONT = "chat",
    ANCHOR_LEFT = 1, ANCHOR_RIGHT = 2, ANCHOR_MIDDLE = 3, ANCHOR_TOP = 4,
    SCALEMODE_FILLSCREEN = 1, SCALEMODE_PROPORTIONAL = 2,
    CONTROL_CANCEL = 99,
    BOSS_ORDER = { "deerclops", "bearger" },
    BOSS_NAMES = { deerclops = "Циклоп-олень", bearger = "Медведь-барсук" },
    BOSS_CATEGORIES = {
        { id = "all", name = "Все чудовища", short = "Все" },
        { id = "giants", name = "Сезонные гиганты", short = "Гиганты" },
    },
    BOSS_DATA = {
        deerclops = {
            name = "Циклоп-олень", category = "giants", hp = "4000",
            damage = "75", planar = "", lore = "Ледяной исполин.",
            drops = "Мясо, глаз", icon = "deerclops.tex",
        },
        bearger = {
            name = "Медведь-барсук", category = "giants", hp = "6000",
            damage = "87.5", planar = "", lore = "Осенний разоритель.",
            drops = "Мясо, мех", icon = "bearger.tex",
        },
    },
    GetScrapbookIconAtlas = function() return "images/scrapbook_icons1.xml" end,
    Tracker = { MARK_COUNT = 51 },
    TheFrontEnd = { PushScreen = function() end, PopScreen = function() end },
    GetModRPC = function() return {} end,
    SendModRPCToServer = function() end,
    json = { decode = function() return {} end },
}
env.env = env
env.GLOBAL = env
setmetatable(env, { __index = function(_, k)
    if k == "DST_TRACKER_LAST" or k == "DST_TRACKER_OPEN" then
        return nil
    end
    error("client module reads missing global: " .. tostring(k))
end })

local fn = assert(loadfile(root .. "/scripts/dst_tracker_client.lua"))
setfenv(fn, env)
local ok, err = pcall(fn)
if not ok then
    print("FAIL client load: " .. tostring(err))
    os.exit(1)
end
if type(env.DST_TRACKER_SCREEN) ~= "table" then
    print("FAIL DST_TRACKER_SCREEN")
    os.exit(1)
end
if type(env.DST_TRACKER_ON_SNAPSHOT) ~= "function" then
    print("FAIL DST_TRACKER_ON_SNAPSHOT")
    os.exit(1)
end
if not hooks["screens/redux/pausescreen"] or not hooks["screens/pausescreen"] then
    print("FAIL pause hooks")
    os.exit(1)
end

-- Базовый прогон экрана: снимок с одним убитым боссом.
local screen = env.DST_TRACKER_SCREEN()
local ok_snap, snap_err = pcall(function()
    screen:UpdateSnapshot({
        world = { name = "Мир", day = 12, season = "summer", char = "willow" },
        kills = { deerclops = { count = 2, day = 5 } },
        marks = { hermit_berry = true },
        skills = { skills = { "a", "b" }, points = 3 },
        mark_count = 51,
    })
end)
if not ok_snap then
    print("FAIL snapshot render: " .. tostring(snap_err))
    os.exit(1)
end
if not screen.world.text or not screen.world.text:find("день 12", 1, true) then
    print("FAIL world text: " .. tostring(screen.world.text))
    os.exit(1)
end
if not screen.stats.text or not screen.stats.text:find("Победы: 1 / 2", 1, true) then
    print("FAIL stats text: " .. tostring(screen.stats.text))
    os.exit(1)
end
if not screen.list.items or #screen.list.items ~= 2 then
    print("FAIL list rows")
    os.exit(1)
end
print("OK client load, pause hooks=true, rows=" .. tostring(#screen.list.items))
