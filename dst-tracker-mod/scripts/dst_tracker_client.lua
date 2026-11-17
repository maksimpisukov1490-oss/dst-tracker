-- Клиентская часть: кнопка «Компендиум» в меню паузы и экран-справочник.
-- Данные прогресса приходят с сервера по RPC, статичные описания и иконки
-- лежат в scripts/boss_data.lua (сгенерирован из данных сайта).

local Screen = require "widgets/screen"
local Widget = require "widgets/widget"
local Text = require "widgets/text"
local Image = require "widgets/image"
local ImageButton = require "widgets/imagebutton"
local Menu = require "widgets/menu"
local TEMPLATES = require "widgets/redux/templates"

local NAMESPACE = "dst_tracker"

-- В клиентском окружении мода игровые константы и часть стандартных
-- функций лежат в GLOBAL, а не как обычные глобалы.
local G = GLOBAL
local tonumber = G.tonumber
local tostring = G.tostring
local pairs = G.pairs
local ipairs = G.ipairs
local type = G.type
local pcall = G.pcall
local string = G.string
local table = G.table
local math = G.math

local ANCHOR_MIDDLE = G.ANCHOR_MIDDLE or 0
local ANCHOR_LEFT = G.ANCHOR_LEFT or 1
local ANCHOR_RIGHT = G.ANCHOR_RIGHT or 2
local SCALEMODE_FILLSCREEN = G.SCALEMODE_FILLSCREEN or 1
local SCALEMODE_PROPORTIONAL = G.SCALEMODE_PROPORTIONAL or 2
local CONTROL_CANCEL = G.CONTROL_CANCEL or 30
local CONTROL_MOVE_LEFT = G.CONTROL_MOVE_LEFT or 7
local CONTROL_MOVE_RIGHT = G.CONTROL_MOVE_RIGHT or 8
local CHATFONT = G.CHATFONT or "bellefair"
local STRINGS = G.STRINGS or {}
local GetScrapbookIconAtlas = G.GetScrapbookIconAtlas
local UICOLOURS = G.UICOLOURS or {
    GOLD = { 0.79, 0.68, 0.46, 1 },
    GOLD_SELECTED = { 0.96, 0.95, 0.87, 1 },
    GOLD_UNIMPORTANT = { 0.84, 0.84, 0.80, 1 },
    GOLD_CLICKABLE = { 0.84, 0.82, 0.62, 1 },
    GREY = { 0.60, 0.60, 0.60, 1 },
    BROWN_DARK = { 0.31, 0.24, 0.15, 1 },
    BROWN_MEDIUM = { 0.42, 0.33, 0.23, 1 },
    EGGSHELL = { 0.99, 0.90, 0.79, 1 },
}

local WINDOW_W, WINDOW_H = 900, 500
local PAGE_W, PAGE_H = 420, 330
local PAGE_SIZE = 6
local BAR_W = 420

local SEASON_RU = {
    autumn = "осень",
    winter = "зима",
    spring = "весна",
    summer = "лето",
}

local CATEGORY_NAMES = {}
for _, c in ipairs(BOSS_CATEGORIES or {}) do
    CATEGORY_NAMES[c.id] = c.name
end

local function char_name(prefab)
    if not prefab or prefab == "" then
        return ""
    end
    local key = string.upper(prefab)
    local name = STRINGS.NAMES and STRINGS.NAMES[key]
    return name or prefab
end

local function season_name(season)
    return SEASON_RU[tostring(season or "")] or ""
end

local function category_name(id)
    return CATEGORY_NAMES[id] or id or ""
end

local function boss_icon(slug)
    local data = BOSS_DATA and BOSS_DATA[slug]
    local tex = data and data.icon or ""
    if tex == "" or not GetScrapbookIconAtlas then
        return nil, nil
    end
    local ok, atlas = pcall(GetScrapbookIconAtlas, tex)
    if not ok or not atlas then
        return nil, nil
    end
    return atlas, tex
end

local function boss_count(snapshot, slug)
    local kills = (snapshot and snapshot.kills) or {}
    local retro = (snapshot and snapshot.retro) or {}
    local k = kills[slug]
    local count = k and (tonumber(k.count) or 0) or 0
    local old = tonumber(retro[slug]) or 0
    if old > count then
        count = old
    end
    return count, k
end

DST_TRACKER_OPEN = nil
DST_TRACKER_LAST = nil
DST_TRACKER_REQUESTED = 0

local DSTTrackerScreen = Class(Screen, function(self)
    Screen._ctor(self, "DSTTrackerScreen")

    self.page = 1
    self.selectedSlug = nil

    self.black = self:AddChild(ImageButton("images/global.xml", "square.tex"))
    self.black.image:SetVRegPoint(ANCHOR_MIDDLE)
    self.black.image:SetHRegPoint(ANCHOR_MIDDLE)
    self.black.image:SetVAnchor(ANCHOR_MIDDLE)
    self.black.image:SetHAnchor(ANCHOR_MIDDLE)
    self.black.image:SetScaleMode(SCALEMODE_FILLSCREEN)
    self.black.image:SetTint(0, 0, 0, .72)
    self.black:SetOnClick(function() self:Close() end)

    self.proot = self:AddChild(Widget("ROOT"))
    self.proot:SetVAnchor(ANCHOR_MIDDLE)
    self.proot:SetHAnchor(ANCHOR_MIDDLE)
    self.proot:SetPosition(0, 0, 0)
    self.proot:SetScaleMode(SCALEMODE_PROPORTIONAL)

    self.bg = self.proot:AddChild(TEMPLATES.CurlyWindow(WINDOW_W, WINDOW_H, "Справочник охотника", nil, nil, nil))
    self.bg:SetScale(1, 1)

    self.world = self.proot:AddChild(Text(CHATFONT, 21, "Загрузка данных мира…", UICOLOURS.BROWN_DARK))
    self.world:SetPosition(0, 160, 0)
    self.world:SetHAlign(ANCHOR_MIDDLE)

    self.stats = self.proot:AddChild(Text(CHATFONT, 16, "", UICOLOURS.BROWN_DARK))
    self.stats:SetPosition(0, 138, 0)
    self.stats:SetHAlign(ANCHOR_MIDDLE)

    self.pbarBg = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarBg:SetSize(BAR_W, 9)
    self.pbarBg:SetTint(0.18, 0.12, 0.06, .55)
    self.pbarBg:SetPosition(0, 120, 0)

    self.pbarFill = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarFill:SetSize(1, 9)
    self.pbarFill:SetTint(0.72, 0.55, 0.18, 1)
    self.pbarFill:SetPosition(-BAR_W / 2, 120, 0)
    self.pbarFill:Hide()

    -- Разворот справочника: две страницы и корешок.
    self.pageBgL = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pageBgL:SetSize(PAGE_W + 8, PAGE_H + 8)
    self.pageBgL:SetTint(0.35, 0.25, 0.12, .35)
    self.pageBgL:SetPosition(-225, -60, 0)

    self.pageL = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pageL:SetSize(PAGE_W, PAGE_H)
    self.pageL:SetTint(0.86, 0.78, 0.62, .35)
    self.pageL:SetPosition(-225, -60, 0)

    self.pageBgR = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pageBgR:SetSize(PAGE_W + 8, PAGE_H + 8)
    self.pageBgR:SetTint(0.35, 0.25, 0.12, .35)
    self.pageBgR:SetPosition(225, -60, 0)

    self.pageR = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pageR:SetSize(PAGE_W, PAGE_H)
    self.pageR:SetTint(0.86, 0.78, 0.62, .35)
    self.pageR:SetPosition(225, -60, 0)

    self.spine = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.spine:SetSize(2, PAGE_H)
    self.spine:SetTint(0.45, 0.33, 0.16, .6)
    self.spine:SetPosition(0, -60, 0)

    self.pageLabel = self.proot:AddChild(Text(CHATFONT, 17, "", UICOLOURS.BROWN_DARK))
    self.pageLabel:SetPosition(-225, 94, 0)
    self.pageLabel:SetHAlign(ANCHOR_MIDDLE)

    self.prev = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.prev:SetText("←")
    self.prev:SetScale(.42)
    self.prev:SetPosition(-390, 94, 0)
    self.prev:SetOnClick(function() self:Page(-1) end)

    self.next = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.next:SetText("→")
    self.next:SetScale(.42)
    self.next:SetPosition(-60, 94, 0)
    self.next:SetOnClick(function() self:Page(1) end)

    -- Левая страница: список боссов, Menu сам ведёт фокус с геймпада.
    self.menu = self.proot:AddChild(Menu({}, -48, false, "carny_xlong"))
    self.menu:SetPosition(-225, 55, 0)

    -- Правая страница: выбранный босс.
    self.detailIcon = self.proot:AddChild(Image())
    self.detailIcon:SetSize(90, 90)
    self.detailIcon:SetPosition(225, 60, 0)
    self.detailIcon:Hide()

    self.detailQ = self.proot:AddChild(Text(CHATFONT, 56, "?", UICOLOURS.BROWN_DARK))
    self.detailQ:SetPosition(225, 60, 0)

    self.detailName = self.proot:AddChild(Text(CHATFONT, 23, "Выбери босса", UICOLOURS.BROWN_DARK))
    self.detailName:SetPosition(225, -8, 0)
    self.detailName:SetRegionSize(380, 40)
    self.detailName:SetHAlign(ANCHOR_MIDDLE)
    self.detailName:EnableWordWrap(true)

    self.detailCat = self.proot:AddChild(Text(CHATFONT, 15, "", UICOLOURS.BROWN_MEDIUM))
    self.detailCat:SetPosition(225, -32, 0)

    self.detailStats = self.proot:AddChild(Text(CHATFONT, 15, "", UICOLOURS.BROWN_DARK))
    self.detailStats:SetPosition(225, -54, 0)
    self.detailStats:SetHAlign(ANCHOR_MIDDLE)

    self.detailLore = self.proot:AddChild(Text(CHATFONT, 14, "", UICOLOURS.BROWN_DARK))
    self.detailLore:SetPosition(225, -97, 0)
    self.detailLore:SetRegionSize(380, 80)
    self.detailLore:EnableWordWrap(true)

    self.detailDrops = self.proot:AddChild(Text(CHATFONT, 13, "", UICOLOURS.BROWN_MEDIUM))
    self.detailDrops:SetPosition(225, -177, 0)
    self.detailDrops:SetRegionSize(380, 45)
    self.detailDrops:EnableWordWrap(true)

    self.hint = self.proot:AddChild(Text(CHATFONT, 13, "A — выбрать · ← → — страницы · B — закрыть", UICOLOURS.BROWN_MEDIUM))
    self.hint:SetPosition(-225, -235, 0)
    self.hint:SetHAlign(ANCHOR_MIDDLE)

    self.close = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.close:SetText("Закрыть")
    self.close:SetOnClick(function() self:Close() end)
    self.close:SetPosition(350, -235, 0)
    self.close:SetScale(.7)

    self.default_focus = self.menu
    DST_TRACKER_OPEN = self

    self:BuildPage()
    if DST_TRACKER_LAST then
        self:UpdateSnapshot(DST_TRACKER_LAST)
    end
    self:Request()
end)

function DSTTrackerScreen:Request()
    local now = G.os.time()
    if now - DST_TRACKER_REQUESTED < 2 then
        return
    end
    DST_TRACKER_REQUESTED = now
    local rpc = GetModRPC and GetModRPC(NAMESPACE, "request_snapshot")
    if rpc and SendModRPCToServer then
        SendModRPCToServer(rpc)
    end
end

function DSTTrackerScreen:Close()
    if DST_TRACKER_OPEN == self then
        DST_TRACKER_OPEN = nil
    end
    if G.TheFrontEnd then
        G.TheFrontEnd:PopScreen(self)
    end
end

function DSTTrackerScreen:OnControl(control, down)
    if down then
        return false
    end
    if control == CONTROL_CANCEL then
        self:Close()
        return true
    elseif control == CONTROL_MOVE_LEFT then
        self:Page(-1)
        return true
    elseif control == CONTROL_MOVE_RIGHT then
        self:Page(1)
        return true
    end
    return DSTTrackerScreen._base.OnControl(self, control, down)
end

function DSTTrackerScreen:Page(delta)
    local total = #(BOSS_ORDER or {})
    local pages = math.max(1, math.ceil(total / PAGE_SIZE))
    local p = self.page + delta
    if p < 1 then p = 1 end
    if p > pages then p = pages end
    if p ~= self.page then
        self.page = p
        self:BuildPage()
    end
end

function DSTTrackerScreen:SlugOnPage(slug)
    local total = #(BOSS_ORDER or {})
    local start = (self.page - 1) * PAGE_SIZE + 1
    local stop = math.min(start + PAGE_SIZE - 1, total)
    for i = start, stop do
        if BOSS_ORDER[i] == slug then
            return i - start + 1
        end
    end
    return nil
end

function DSTTrackerScreen:MakeRow(slug)
    local data = BOSS_DATA and BOSS_DATA[slug]
    local count, kill = boss_count(self.snapshot, slug)
    local on = count > 0
    local colour = on and UICOLOURS.BROWN_DARK or UICOLOURS.BROWN_MEDIUM

    local row = ImageButton("images/global.xml", "square.tex")
    row.image:SetSize(PAGE_W - 20, 44)
    row.image:SetTint(0.82, 0.72, 0.55, .22)
    row:SetOnClick(function() self:ShowBoss(slug) end)

    local atlas, tex = boss_icon(slug)
    if atlas then
        local icon = row:AddChild(Image(atlas, tex))
        icon:SetSize(36, 36)
        icon:SetPosition(-175, 0, 0)
    else
        local q = row:AddChild(Text(CHATFONT, 22, "?", UICOLOURS.BROWN_MEDIUM))
        q:SetPosition(-175, 0, 0)
    end

    local name = row:AddChild(Text(CHATFONT, 19, "", colour))
    name:SetPosition(-145, 6, 0)
    name:SetHAlign(ANCHOR_LEFT)
    name:SetTruncatedString((data and data.name) or slug, 300, nil, true)

    local cat = row:AddChild(Text(CHATFONT, 12, category_name(data and data.category), UICOLOURS.BROWN_MEDIUM))
    cat:SetPosition(-145, -11, 0)
    cat:SetHAlign(ANCHOR_LEFT)

    local right = row:AddChild(Text(CHATFONT, 16, "", colour))
    right:SetPosition(180, 0, 0)
    right:SetHAlign(ANCHOR_RIGHT)
    if on then
        local txt = "×" .. tostring(count)
        local day = kill and tonumber(kill.day) or 0
        if day > 0 then txt = txt .. " · д." .. tostring(day) end
        right:SetString(txt)
    end

    return row
end

function DSTTrackerScreen:BuildPage()
    local total = #(BOSS_ORDER or {})
    local pages = math.max(1, math.ceil(total / PAGE_SIZE))
    if self.page < 1 then self.page = 1 end
    if self.page > pages then self.page = pages end
    self.pageLabel:SetString("Страница " .. tostring(self.page) .. " / " .. tostring(pages))

    self.menu:Clear()
    local start = (self.page - 1) * PAGE_SIZE + 1
    local stop = math.min(start + PAGE_SIZE - 1, total)
    local first = nil
    for i = start, stop do
        local slug = BOSS_ORDER[i]
        local row = self:MakeRow(slug)
        self.menu:AddCustomItem(row)
        row:SetOnGainFocus(function() self:ShowBoss(slug) end)
        if not first then first = slug end
    end

    if first then
        local focus = self:SlugOnPage(self.selectedSlug) or 1
        if not self.selectedSlug or not self:SlugOnPage(self.selectedSlug) then
            self.selectedSlug = first
            self:UpdateDetail(first)
        end
        self.menu:SetFocus(focus)
    else
        self.selectedSlug = nil
        self:UpdateDetail(nil)
    end
end

function DSTTrackerScreen:ShowBoss(slug)
    self.selectedSlug = slug
    self:UpdateDetail(slug)
end

function DSTTrackerScreen:UpdateDetail(slug)
    local data = BOSS_DATA and BOSS_DATA[slug]
    if not data then
        self.detailName:SetString("Выбери босса")
        self.detailCat:SetString("")
        self.detailStats:SetString("")
        self.detailLore:SetString("")
        self.detailDrops:SetString("")
        self.detailIcon:Hide()
        self.detailQ:Show()
        return
    end

    local atlas, tex = boss_icon(slug)
    if atlas then
        self.detailIcon:SetTexture(atlas, tex)
        self.detailIcon:Show()
        self.detailQ:Hide()
    else
        self.detailIcon:Hide()
        self.detailQ:Show()
    end

    self.detailName:SetString(data.name or slug)
    self.detailCat:SetString(category_name(data.category))

    local stats = {}
    if data.hp and data.hp ~= "" then stats[#stats + 1] = "HP " .. data.hp end
    if data.damage and data.damage ~= "" then stats[#stats + 1] = "урон " .. data.damage end
    if data.planar and data.planar ~= "" then stats[#stats + 1] = "план. " .. data.planar end
    local count, kill = boss_count(self.snapshot, slug)
    if count > 0 then
        stats[#stats + 1] = "побед " .. tostring(count)
        local day = kill and tonumber(kill.day) or 0
        if day > 0 then stats[#stats + 1] = "день " .. tostring(day) end
    end
    self.detailStats:SetString(table.concat(stats, " · "))

    self.detailLore:SetString(data.lore or "")
    self.detailDrops:SetString(data.drops and ("Добыча: " .. data.drops) or "")
end

function DSTTrackerScreen:UpdateSnapshot(snapshot)
    self.snapshot = snapshot
    local w = snapshot.world or {}
    local day = tonumber(w.day) or 0
    local season = season_name(w.season)
    local who = char_name(w.char)

    local head = { w.name or "Мир", "день " .. tostring(day) }
    if season ~= "" then head[#head + 1] = season end
    if who ~= "" then head[#head + 1] = who end
    self.world:SetString(table.concat(head, " · "))

    local killed = 0
    for _, slug in ipairs(BOSS_ORDER or {}) do
        local count = boss_count(snapshot, slug)
        if count > 0 then killed = killed + 1 end
    end
    local total = #(BOSS_ORDER or {})
    local marks = 0
    for _, on in pairs(snapshot.marks or {}) do
        if on then marks = marks + 1 end
    end
    local mark_total = tonumber(snapshot.mark_count) or (Tracker and Tracker.MARK_COUNT) or 0

    local stats = "Победы: " .. killed .. " / " .. tostring(total)
    stats = stats .. " · метки: " .. marks .. (mark_total > 0 and (" / " .. mark_total) or "")
    local sk = snapshot.skills
    if sk then
        stats = stats .. " · навыки: " .. tostring(#(sk.skills or {}))
        stats = stats .. " · озарение: " .. tostring(sk.points or 0)
    end
    self.stats:SetString(stats)

    local pct = total > 0 and (killed / total) or 0
    local fill = BAR_W * pct
    if fill > 0 then
        self.pbarFill:SetSize(fill, 9)
        self.pbarFill:SetPosition(-BAR_W / 2 + fill / 2, 120, 0)
        self.pbarFill:Show()
    else
        self.pbarFill:Hide()
    end

    self:BuildPage()
end

DST_TRACKER_SCREEN = DSTTrackerScreen

function DST_TRACKER_ON_SNAPSHOT(data)
    if not (G.json and G.json.decode) then
        return
    end
    local ok, snapshot = pcall(G.json.decode, data)
    if not ok or type(snapshot) ~= "table" then
        return
    end
    DST_TRACKER_LAST = snapshot
    if DST_TRACKER_OPEN and DST_TRACKER_OPEN.UpdateSnapshot then
        DST_TRACKER_OPEN:UpdateSnapshot(snapshot)
    end
end

-- Кнопка в меню паузы. В redux-меню оно пересобирается при смене состояния
-- сервера, поэтому вешаемся на BuildMenu, а не только на первый показ.
local function add_progress_button(self)
    if not self.menu or not self.menu.AddItem then
        return
    end
    for _, item in ipairs(self.menu.items or {}) do
        if item.__dst_tracker then
            return
        end
    end

    local button = self.menu:AddItem("Компендиум", function()
        if DST_TRACKER_OPEN then
            return
        end
        local screen = DST_TRACKER_SCREEN and DST_TRACKER_SCREEN()
        if screen and G.TheFrontEnd then
            G.TheFrontEnd:PushScreen(screen)
        end
    end)
    if button then
        button.__dst_tracker = true
        button:SetScale(.7)
        self.last_focus = button
        if self.menu.SetFocus then
            self.menu:SetFocus(#self.menu.items)
        end
        if button.SetFocus then
            button:SetFocus()
        end
    end

    -- Одна лишняя строка: поднимаем меню и чуть увеличиваем окно.
    local pos = self.menu:GetPosition()
    if pos then
        self.menu:SetPosition(pos.x, pos.y + 25, pos.z)
    end
    if self.bg and self.bg.GetSize and self.bg.SetSize then
        local w, h = self.bg:GetSize()
        if w and h and h < 500 then
            self.bg:SetSize(w, math.min(500, h + 50))
        end
    end
end

local function hook_pause_screen(self)
    if self.__dst_tracker_hooked then
        return
    end
    self.__dst_tracker_hooked = true

    local old_build = self.BuildMenu
    if old_build then
        self.BuildMenu = function(s, ...)
            old_build(s, ...)
            add_progress_button(s)
        end
    end
    add_progress_button(self)
end

AddClassPostConstruct("screens/redux/pausescreen", hook_pause_screen)
AddClassPostConstruct("screens/pausescreen", hook_pause_screen)
