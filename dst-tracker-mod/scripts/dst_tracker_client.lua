-- Клиентская часть: кнопка «Компендиум» в меню паузы и экран прогресса.
-- Данные приходят с сервера по RPC, потому что серверный мод ведёт учёт,
-- а интерфейс живёт в клиентском окружении.

local Screen = require "widgets/screen"
local Widget = require "widgets/widget"
local Text = require "widgets/text"
local Image = require "widgets/image"
local ImageButton = require "widgets/imagebutton"
local ScrollableList = require "widgets/scrollablelist"
local TEMPLATES = require "widgets/redux/templates"

local NAMESPACE = "dst_tracker"

local WINDOW_W, WINDOW_H = 700, 500
local LIST_W, LIST_H = 380, 220
local ROW_H = 38
local BAR_W = 360

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

local DSTTrackerScreen = Class(Screen, function(self)
    Screen._ctor(self, "DSTTrackerScreen")

    self.category = "all"
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

    self.bg = self.proot:AddChild(TEMPLATES.CurlyWindow(WINDOW_W, WINDOW_H, "Компендиум выжившего", nil, nil, nil))
    self.bg:SetScale(1, 1)

    self.world = self.proot:AddChild(Text(CHATFONT, 22, "Загрузка данных мира…", UICOLOURS.BROWN_DARK))
    self.world:SetPosition(0, 160, 0)
    self.world:SetHAlign(ANCHOR_MIDDLE)

    self.stats = self.proot:AddChild(Text(CHATFONT, 17, "", UICOLOURS.BROWN_DARK))
    self.stats:SetPosition(0, 135, 0)
    self.stats:SetHAlign(ANCHOR_MIDDLE)

    self.pbarBg = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarBg:SetSize(BAR_W, 10)
    self.pbarBg:SetTint(0.18, 0.12, 0.06, .55)
    self.pbarBg:SetPosition(0, 118, 0)

    self.pbarFill = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarFill:SetSize(0, 10)
    self.pbarFill:SetTint(0.72, 0.55, 0.18, 1)
    self.pbarFill:SetPosition(-BAR_W / 2, 118, 0)
    self.pbarFill:Hide()

    self.tabs = {}
    local tab_x = -200
    for _, cat in ipairs(BOSS_CATEGORIES or {}) do
        local b = self.proot:AddChild(ImageButton(
            "images/global_redux.xml",
            "button_carny_long_normal.tex",
            "button_carny_long_hover.tex",
            "button_carny_long_disabled.tex",
            "button_carny_long_down.tex"
        ))
        b:SetText(cat.short or cat.name or cat.id)
        b:SetScale(.5)
        b:SetPosition(tab_x, 78, 0)
        b:SetOnClick(function() self:SetCategory(cat.id) end)
        self.tabs[cat.id] = b
        tab_x = tab_x + 100
    end

    self.list = self.proot:AddChild(ScrollableList({}, LIST_W, LIST_H, ROW_H, 2, nil, nil, 0, false, 0, 0, 1, 1, "GOLD"))
    self.list:SetPosition(-120, -70, 0)

    self.detailBg = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.detailBg:SetSize(250, 220)
    self.detailBg:SetTint(0, 0, 0, .28)
    self.detailBg:SetPosition(200, -70, 0)

    self.detailIcon = self.proot:AddChild(Image())
    self.detailIcon:SetSize(60, 60)
    self.detailIcon:SetPosition(200, 10, 0)
    self.detailIcon:Hide()

    self.detailQ = self.proot:AddChild(Text(CHATFONT, 52, "?", UICOLOURS.GOLD))
    self.detailQ:SetPosition(200, 10, 0)

    self.detailName = self.proot:AddChild(Text(CHATFONT, 22, "Выбери босса", UICOLOURS.GOLD))
    self.detailName:SetPosition(200, -32, 0)
    self.detailName:SetRegionSize(220, 40)
    self.detailName:SetHAlign(ANCHOR_MIDDLE)
    self.detailName:EnableWordWrap(true)

    self.detailCat = self.proot:AddChild(Text(CHATFONT, 15, "", UICOLOURS.GOLD_UNIMPORTANT))
    self.detailCat:SetPosition(200, -52, 0)

    self.detailStats = self.proot:AddChild(Text(CHATFONT, 15, "", UICOLOURS.GOLD_CLICKABLE))
    self.detailStats:SetPosition(200, -70, 0)
    self.detailStats:SetHAlign(ANCHOR_MIDDLE)

    self.detailLore = self.proot:AddChild(Text(CHATFONT, 14, "", UICOLOURS.EGGSHELL))
    self.detailLore:SetPosition(200, -105, 0)
    self.detailLore:SetRegionSize(220, 50)
    self.detailLore:EnableWordWrap(true)

    self.detailDrops = self.proot:AddChild(Text(CHATFONT, 13, "", UICOLOURS.GOLD_UNIMPORTANT))
    self.detailDrops:SetPosition(200, -148, 0)
    self.detailDrops:SetRegionSize(220, 40)
    self.detailDrops:EnableWordWrap(true)

    self.close = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.close:SetText("Закрыть")
    self.close:SetOnClick(function() self:Close() end)
    self.close:SetPosition(0, -215, 0)
    self.close:SetScale(.8)

    self.default_focus = self.list
    DST_TRACKER_OPEN = self

    self:SetCategory("all")
    if DST_TRACKER_LAST then
        self:UpdateSnapshot(DST_TRACKER_LAST)
    end
    self:Request()
end)

function DSTTrackerScreen:Request()
    local rpc = GetModRPC and GetModRPC(NAMESPACE, "request_snapshot")
    if rpc and SendModRPCToServer then
        SendModRPCToServer(rpc)
    end
end

function DSTTrackerScreen:Close()
    if DST_TRACKER_OPEN == self then
        DST_TRACKER_OPEN = nil
    end
    TheFrontEnd:PopScreen(self)
end

function DSTTrackerScreen:OnControl(control, down)
    if DSTTrackerScreen._base.OnControl(self, control, down) then
        return true
    end
    if down then
        return false
    end
    if control == CONTROL_CANCEL then
        self:Close()
        return true
    end
    return false
end

function DSTTrackerScreen:SetCategory(id)
    self.category = id or "all"
    for cid, button in pairs(self.tabs) do
        local active = cid == self.category
        button:SetScale(active and .56 or .5)
        if button.image then
            if active then
                button.image:SetTint(1, .93, .68, 1)
            else
                button.image:SetTint(.72, .72, .72, 1)
            end
        end
    end
    self:BuildRows()
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

function DSTTrackerScreen:ShowBoss(slug)
    self.selectedSlug = slug
    self:UpdateDetail(slug)
    self:BuildRows()
end

function DSTTrackerScreen:BuildRows()
    local snapshot = self.snapshot or {}
    local rows = {}

    for _, slug in ipairs(BOSS_ORDER or {}) do
        local data = BOSS_DATA and BOSS_DATA[slug]
        if data and (self.category == "all" or data.category == self.category) then
            local count, kill = boss_count(snapshot, slug)
            local on = count > 0
            local colour = on and UICOLOURS.GOLD or UICOLOURS.GREY

            local row = ImageButton("images/global.xml", "square.tex")
            row.image:SetSize(LIST_W - 10, ROW_H - 4)
            if slug == self.selectedSlug then
                row.image:SetTint(0.28, 0.20, 0.09, .6)
            else
                row.image:SetTint(0, 0, 0, .2)
            end
            row:SetOnClick(function() self:ShowBoss(slug) end)

            local atlas, tex = boss_icon(slug)
            if atlas then
                local icon = row:AddChild(Image(atlas, tex))
                icon:SetSize(32, 32)
                icon:SetPosition(-170, 0, 0)
            else
                local q = row:AddChild(Text(CHATFONT, 22, "?", UICOLOURS.GOLD))
                q:SetPosition(-170, 0, 0)
            end

            local check = row:AddChild(Text(CHATFONT, 18, on and "✓" or "·", colour))
            check:SetPosition(-146, 0, 0)
            check:SetHAlign(ANCHOR_LEFT)

            local name = row:AddChild(Text(CHATFONT, 19, "", colour))
            name:SetPosition(-128, 0, 0)
            name:SetHAlign(ANCHOR_LEFT)
            name:SetTruncatedString(data.name or slug, 240, 20, true)

            local right = row:AddChild(Text(CHATFONT, 16, "", colour))
            right:SetPosition(160, 0, 0)
            right:SetHAlign(ANCHOR_RIGHT)
            if on then
                local txt = "×" .. tostring(count)
                local day = kill and tonumber(kill.day) or 0
                if day > 0 then txt = txt .. " · д." .. tostring(day) end
                right:SetString(txt)
            end

            rows[#rows + 1] = row
        end
    end

    self.list:SetList(rows)
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
        self.pbarFill:SetSize(fill, 10)
        self.pbarFill:SetPosition(-BAR_W / 2 + fill / 2, 118, 0)
        self.pbarFill:Show()
    else
        self.pbarFill:Hide()
    end

    self:BuildRows()
    if self.selectedSlug then
        self:UpdateDetail(self.selectedSlug)
    end
end

DST_TRACKER_SCREEN = DSTTrackerScreen

function DST_TRACKER_ON_SNAPSHOT(data)
    local ok, snapshot = pcall(json.decode, data)
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
        local screen = DST_TRACKER_SCREEN and DST_TRACKER_SCREEN()
        if screen then
            TheFrontEnd:PushScreen(screen)
        end
    end)
    if button then
        button.__dst_tracker = true
        button:SetScale(.7)
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
