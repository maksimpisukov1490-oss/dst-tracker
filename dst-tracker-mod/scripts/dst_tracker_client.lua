-- Клиентская часть: кнопка «Компендиум» в меню паузы и экран-справочник.
-- Оформление повторяет сайт: тёмный фон, золото, пергаментные карточки,
-- сетка боссов, боковые разделы и модальная запись босса.

local Screen = require "widgets/screen"
local Widget = require "widgets/widget"
local Text = require "widgets/text"
local Image = require "widgets/image"
local ImageButton = require "widgets/imagebutton"

local NAMESPACE = "dst_tracker"

-- Песочница мода: часть констант и стандартных функций лежит в GLOBAL.
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
local CONTROL_MOVE_UP = G.CONTROL_MOVE_UP or 5
local CONTROL_MOVE_DOWN = G.CONTROL_MOVE_DOWN or 6
local CONTROL_MOVE_LEFT = G.CONTROL_MOVE_LEFT or 7
local CONTROL_MOVE_RIGHT = G.CONTROL_MOVE_RIGHT or 8
local MOVE_UP = G.MOVE_UP or 1
local MOVE_DOWN = G.MOVE_DOWN or 2
local MOVE_LEFT = G.MOVE_LEFT or 3
local MOVE_RIGHT = G.MOVE_RIGHT or 4
local CONTROL_SCROLLBACK = G.CONTROL_SCROLLBACK or 31
local CONTROL_SCROLLFWD = G.CONTROL_SCROLLFWD or 32
local CONTROL_MENU_L2 = G.CONTROL_MENU_L2 or 85
local CONTROL_MENU_R2 = G.CONTROL_MENU_R2 or 86
local CHATFONT = G.CHATFONT or "bellefair"
local HEADERFONT = G.HEADERFONT or CHATFONT
local STRINGS = G.STRINGS or {}
local GetScrapbookIconAtlas = G.GetScrapbookIconAtlas
local UICOLOURS = G.UICOLOURS or {
    GOLD = { 0.79, 0.68, 0.46, 1 },
    GOLD_SELECTED = { 0.96, 0.95, 0.87, 1 },
    GOLD_UNIMPORTANT = { 0.84, 0.84, 0.80, 1 },
    GREY = { 0.60, 0.60, 0.60, 1 },
    BROWN_DARK = { 0.31, 0.24, 0.15, 1 },
    BROWN_MEDIUM = { 0.42, 0.33, 0.23, 1 },
}

local PAGE_SIZE = 12
local COLS = 4
local CARD_W, CARD_H = 200, 130
local CARD_GAP_X, CARD_GAP_Y = 14, 10
local GRID_X, GRID_Y = -300, 130
local STEP_X = CARD_W + CARD_GAP_X
local STEP_Y = CARD_H + CARD_GAP_Y

local GOLD = { 0.82, 0.67, 0.28, 1 }
local GOLD_SOFT = { 0.72, 0.58, 0.30, 1 }
local PARCHMENT = { 0.86, 0.78, 0.62, 1 }
local PARCHMENT_DIM = { 0.55, 0.50, 0.42, 1 }
local INK = { 0.18, 0.12, 0.06, 1 }
local INK_SOFT = { 0.38, 0.28, 0.16, 1 }
local DARK_PANEL = { 0.12, 0.08, 0.05, 0.98 }
local DARK_SOFT = { 0.22, 0.15, 0.09, 0.95 }
local GOLD_EDGE = { 0.55, 0.42, 0.18, 0.95 }

local SEASON_RU = {
    autumn = "осень",
    winter = "зима",
    spring = "весна",
    summer = "лето",
}

local CATEGORY_NAMES = {}
local CATEGORY_SHORT = {}
for _, c in ipairs(BOSS_CATEGORIES or {}) do
    CATEGORY_NAMES[c.id] = c.name
    CATEGORY_SHORT[c.id] = c.short or c.name
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

local SCRAPBOOK_ATLASES = {
    "images/scrapbook_icons1.xml",
    "images/scrapbook_icons2.xml",
    "images/scrapbook_icons3.xml",
}

local function boss_icon(slug)
    local data = BOSS_DATA and BOSS_DATA[slug]
    local tex = data and data.icon or ""
    local atlas = data and data.atlas or ""
    if tex == "" then
        return nil, nil
    end
    if atlas ~= "" then
        return atlas, tex
    end
    if GetScrapbookIconAtlas then
        local ok, atlas = pcall(GetScrapbookIconAtlas, tex)
        if ok and atlas then
            return atlas, tex
        end
    end
    local sim = G.TheSim
    if sim and sim.AtlasContains then
        for _, atlas in ipairs(SCRAPBOOK_ATLASES) do
            local ok, has = pcall(sim.AtlasContains, sim, atlas, tex)
            if ok and has then
                return atlas, tex
            end
        end
    end
    return nil, nil
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

    self.category = "all"
    self.page = 1
    self.focusIndex = 1
    self.selectedSlug = nil
    self.detailOpen = false
    self.cards = {}
    self.categoryButtons = {}

    self.black = self:AddChild(Image("images/global.xml", "square.tex"))
    self.black:SetVRegPoint(ANCHOR_MIDDLE)
    self.black:SetHRegPoint(ANCHOR_MIDDLE)
    self.black:SetVAnchor(ANCHOR_MIDDLE)
    self.black:SetHAnchor(ANCHOR_MIDDLE)
    self.black:SetScaleMode(SCALEMODE_FILLSCREEN)
    self.black:SetTint(0, 0, 0, .84)

    self.proot = self:AddChild(Widget("ROOT"))
    self.proot:SetVAnchor(ANCHOR_MIDDLE)
    self.proot:SetHAnchor(ANCHOR_MIDDLE)
    self.proot:SetPosition(0, 0, 0)
    self.proot:SetScaleMode(SCALEMODE_PROPORTIONAL)

    -- Тёмная панель сайта с золотой рамкой.
    self.outer = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.outer:SetSize(1206, 666)
    self.outer:SetTint(GOLD_EDGE[1], GOLD_EDGE[2], GOLD_EDGE[3], GOLD_EDGE[4])
    self.outer:SetPosition(0, 0, 0)

    self.panel = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.panel:SetSize(1200, 660)
    self.panel:SetTint(DARK_PANEL[1], DARK_PANEL[2], DARK_PANEL[3], DARK_PANEL[4])
    self.panel:SetPosition(0, 0, 0)

    self.title = self.proot:AddChild(Text(HEADERFONT, 40, "Компендиум выжившего", GOLD))
    self.title:SetPosition(-500, 290, 0)
    self.title:SetHAlign(ANCHOR_LEFT)

    self.subtitle = self.proot:AddChild(Text(CHATFONT, 14, "Дневник охоты на чудовищ · Don't Starve Together", GOLD_SOFT))
    self.subtitle:SetPosition(-500, 263, 0)
    self.subtitle:SetHAlign(ANCHOR_LEFT)

    self.world = self.proot:AddChild(Text(CHATFONT, 20, "Загрузка данных мира…", UICOLOURS.GOLD_SELECTED))
    self.world:SetPosition(560, 290, 0)
    self.world:SetHAlign(ANCHOR_RIGHT)
    self.world:SetRegionSize(560, 28)

    self.stats = self.proot:AddChild(Text(CHATFONT, 14, "", GOLD_SOFT))
    self.stats:SetPosition(560, 266, 0)
    self.stats:SetHAlign(ANCHOR_RIGHT)
    self.stats:SetRegionSize(560, 20)

    self.pbarBg = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarBg:SetSize(380, 10)
    self.pbarBg:SetTint(0.06, 0.04, 0.02, .9)
    self.pbarBg:SetPosition(370, 243, 0)

    self.pbarFill = self.proot:AddChild(Image("images/global.xml", "square.tex"))
    self.pbarFill:SetSize(1, 10)
    self.pbarFill:SetTint(0.72, 0.55, 0.18, 1)
    self.pbarFill:SetPosition(180, 243, 0)
    self.pbarFill:Hide()

    self.sideLabel = self.proot:AddChild(Text(CHATFONT, 15, "РАЗДЕЛЫ", GOLD_SOFT))
    self.sideLabel:SetPosition(-500, 190, 0)
    self.sideLabel:SetHAlign(ANCHOR_MIDDLE)

    local side_y = 145
    for _, cat in ipairs(BOSS_CATEGORIES or {}) do
        local b = self.proot:AddChild(ImageButton(
            "images/global_redux.xml",
            "button_carny_long_normal.tex",
            "button_carny_long_hover.tex",
            "button_carny_long_disabled.tex",
            "button_carny_long_down.tex"
        ))
        b:SetText(cat.short or cat.name or cat.id)
        b:SetScale(.6)
        b:SetPosition(-500, side_y, 0)
        b:SetOnClick(function() self:SetCategory(cat.id) end)
        self.categoryButtons[cat.id] = b
        side_y = side_y - 50
    end

    self.gridRoot = self.proot:AddChild(Widget("grid"))

    self.pageLabel = self.proot:AddChild(Text(CHATFONT, 16, "", GOLD_SOFT))
    self.pageLabel:SetPosition(-200, -310, 0)
    self.pageLabel:SetHAlign(ANCHOR_MIDDLE)

    self.prev = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.prev:SetText("←")
    self.prev:SetScale(.4)
    self.prev:SetPosition(-330, -310, 0)
    self.prev:SetOnClick(function() self:Page(-1) end)

    self.next = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.next:SetText("→")
    self.next:SetScale(.4)
    self.next:SetPosition(-70, -310, 0)
    self.next:SetOnClick(function() self:Page(1) end)

    self.hint = self.proot:AddChild(Text(CHATFONT, 12, "A — открыть · B — закрыть · L1/R1 — раздел · L2/R2 — страница", GOLD_SOFT))
    self.hint:SetPosition(250, -310, 0)
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
    self.close:SetPosition(520, -310, 0)
    self.close:SetScale(.7)

    -- Модальная запись босса, как на сайте.
    self.detailRoot = self.proot:AddChild(Widget("detail"))
    self.detailRoot:SetPosition(0, -2000, 0)
    self.detailRoot:Hide()

    self.detailDim = self.detailRoot:AddChild(ImageButton("images/global.xml", "square.tex"))
    self.detailDim.image:SetSize(1200, 660)
    self.detailDim.image:SetTint(0, 0, 0, .55)
    self.detailDim:SetPosition(0, 0, 0)
    self.detailDim:SetOnClick(function() end)

    self.detailOuter = self.detailRoot:AddChild(Image("images/global.xml", "square.tex"))
    self.detailOuter:SetSize(770, 510)
    self.detailOuter:SetTint(GOLD_EDGE[1], GOLD_EDGE[2], GOLD_EDGE[3], GOLD_EDGE[4])
    self.detailOuter:SetPosition(0, 0, 0)

    self.detailPanel = self.detailRoot:AddChild(Image("images/global.xml", "square.tex"))
    self.detailPanel:SetSize(760, 500)
    self.detailPanel:SetTint(DARK_PANEL[1], DARK_PANEL[2], DARK_PANEL[3], DARK_PANEL[4])
    self.detailPanel:SetPosition(0, 0, 0)

    self.detailIcon = self.detailRoot:AddChild(Image())
    self.detailIcon:SetSize(140, 140)
    self.detailIcon:SetPosition(0, 130, 0)
    self.detailIcon:Hide()

    self.detailQ = self.detailRoot:AddChild(Text(CHATFONT, 70, "?", GOLD))
    self.detailQ:SetPosition(0, 130, 0)

    self.detailName = self.detailRoot:AddChild(Text(HEADERFONT, 32, "Выбери босса", UICOLOURS.GOLD_SELECTED))
    self.detailName:SetPosition(0, 40, 0)
    self.detailName:SetRegionSize(700, 50)
    self.detailName:SetHAlign(ANCHOR_MIDDLE)
    self.detailName:EnableWordWrap(true)

    self.detailCat = self.detailRoot:AddChild(Text(CHATFONT, 18, "", GOLD_SOFT))
    self.detailCat:SetPosition(0, 8, 0)

    self.detailStats = self.detailRoot:AddChild(Text(CHATFONT, 18, "", UICOLOURS.GOLD_SELECTED))
    self.detailStats:SetPosition(0, -20, 0)
    self.detailStats:SetHAlign(ANCHOR_MIDDLE)

    self.detailLore = self.detailRoot:AddChild(Text(CHATFONT, 16, "", { 0.90, 0.84, 0.70, 1 }))
    self.detailLore:SetPosition(0, -90, 0)
    self.detailLore:SetRegionSize(680, 120)
    self.detailLore:EnableWordWrap(true)

    self.detailDrops = self.detailRoot:AddChild(Text(CHATFONT, 14, "", GOLD_SOFT))
    self.detailDrops:SetPosition(0, -170, 0)
    self.detailDrops:SetRegionSize(680, 40)
    self.detailDrops:EnableWordWrap(true)

    self.detailClose = self.detailRoot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.detailClose:SetText("Назад")
    self.detailClose:SetOnClick(function() self:CloseDetail() end)
    self.detailClose:SetPosition(0, -220, 0)
    self.detailClose:SetScale(.7)

    DST_TRACKER_OPEN = self

    self:SetCategory("all")
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

function DSTTrackerScreen:CloseDetail()
    self.detailOpen = false
    self.detailRoot:Hide()
    self.detailRoot:SetPosition(0, -2000, 0)
    local card = self.cards[self.focusIndex]
    if card then
        card:SetFocus()
    end
end

function DSTTrackerScreen:OnControl(control, down)
    if down then
        return false
    end
    if control == CONTROL_CANCEL then
        if self.detailOpen then
            self:CloseDetail()
        else
            self:Close()
        end
        return true
    end
    if self.detailOpen then
        return true
    end
    if control == CONTROL_SCROLLBACK then
        self:ChangeCategory(-1)
        return true
    elseif control == CONTROL_SCROLLFWD then
        self:ChangeCategory(1)
        return true
    elseif control == CONTROL_MENU_L2 then
        self:Page(-1)
        return true
    elseif control == CONTROL_MENU_R2 then
        self:Page(1)
        return true
    end
    return DSTTrackerScreen._base.OnControl(self, control, down)
end

function DSTTrackerScreen:SetCategory(id)
    self.category = id or "all"
    self.page = 1
    self.focusIndex = 1
    for cid, button in pairs(self.categoryButtons) do
        if button.image then
            if cid == self.category then
                button.image:SetTint(1, .88, .55, 1)
            else
                button.image:SetTint(.62, .58, .50, 1)
            end
        end
    end
    self:BuildGrid()
end

function DSTTrackerScreen:ChangeCategory(delta)
    local list = BOSS_CATEGORIES or {}
    if #list == 0 then
        return
    end
    local index = 1
    for i, c in ipairs(list) do
        if c.id == self.category then
            index = i
            break
        end
    end
    index = index + delta
    if index < 1 then index = #list end
    if index > #list then index = 1 end
    self:SetCategory(list[index].id)
end

function DSTTrackerScreen:Filtered()
    local out = {}
    for _, slug in ipairs(BOSS_ORDER or {}) do
        local data = BOSS_DATA and BOSS_DATA[slug]
        if data and (self.category == "all" or data.category == self.category) then
            out[#out + 1] = slug
        end
    end
    return out
end

function DSTTrackerScreen:Page(delta)
    local filtered = self:Filtered()
    local pages = math.max(1, math.ceil(#filtered / PAGE_SIZE))
    local p = self.page + delta
    if p < 1 then p = 1 end
    if p > pages then p = pages end
    if p ~= self.page then
        self.page = p
        self.focusIndex = 1
        self:BuildGrid()
    end
end

function DSTTrackerScreen:MakeCard(slug, x, y, index)
    local data = BOSS_DATA and BOSS_DATA[slug]
    local count, kill = boss_count(self.snapshot, slug)
    local on = count > 0

    local frame = Image("images/global.xml", "square.tex")
    frame:SetSize(CARD_W + 6, CARD_H + 6)
    if on then
        frame:SetTint(0.72, 0.55, 0.18, .9)
    else
        frame:SetTint(0.30, 0.22, 0.12, .85)
    end
    frame:SetPosition(x, y, 0)
    self.gridRoot:AddChild(frame)

    local card = ImageButton("images/global.xml", "square.tex")
    card.image:SetSize(CARD_W, CARD_H)
    if on then
        card.image:SetTint(PARCHMENT[1], PARCHMENT[2], PARCHMENT[3], .96)
    else
        card.image:SetTint(PARCHMENT_DIM[1], PARCHMENT_DIM[2], PARCHMENT_DIM[3], .92)
    end
    card:SetPosition(x, y, 0)
    card:SetOnClick(function() self:ShowBoss(slug) end)
    card.scale_on_focus = false
    card:SetOnGainFocus(function()
        self.focusIndex = index
        frame:SetTint(0.95, 0.78, 0.35, 1)
    end)
    card:SetOnLoseFocus(function()
        if on then
            frame:SetTint(0.72, 0.55, 0.18, .9)
        else
            frame:SetTint(0.30, 0.22, 0.12, .85)
        end
    end)
    self.gridRoot:AddChild(card)

    local atlas, tex = boss_icon(slug)
    if atlas then
        local icon = card:AddChild(Image(atlas, tex))
        icon:SetSize(70, 70)
        icon:SetPosition(0, 20, 0)
        icon:SetClickable(false)
    else
        local q = card:AddChild(Text(CHATFONT, 36, "?", on and INK or INK_SOFT))
        q:SetPosition(0, 20, 0)
        q:SetClickable(false)
    end

    local name = card:AddChild(Text(CHATFONT, 16, "", on and INK or INK_SOFT))
    name:SetPosition(0, -32, 0)
    name:SetHAlign(ANCHOR_MIDDLE)
    name:SetTruncatedString((data and data.name) or slug, CARD_W - 16, nil, true)
    name:SetClickable(false)

    local status = card:AddChild(Text(CHATFONT, 11, "", on and INK_SOFT or { 0.30, 0.27, 0.23, 1 }))
    status:SetPosition(0, -52, 0)
    status:SetHAlign(ANCHOR_MIDDLE)
    if on then
        local txt = "побед: " .. tostring(count)
        local day = kill and tonumber(kill.day) or 0
        if day > 0 then txt = txt .. " · день " .. tostring(day) end
        status:SetTruncatedString(txt, CARD_W - 16, nil, true)
    else
        status:SetString("не побеждён")
    end
    status:SetClickable(false)

    return card
end

function DSTTrackerScreen:BuildGrid()
    self.gridRoot:KillAllChildren()
    self.cards = {}

    local filtered = self:Filtered()
    local pages = math.max(1, math.ceil(#filtered / PAGE_SIZE))
    if self.page < 1 then self.page = 1 end
    if self.page > pages then self.page = pages end
    self.pageLabel:SetString("Страница " .. tostring(self.page) .. " / " .. tostring(pages))

    local start = (self.page - 1) * PAGE_SIZE + 1
    local stop = math.min(start + PAGE_SIZE - 1, #filtered)
    for i = start, stop do
        local idx = i - start + 1
        local row = math.floor((idx - 1) / COLS)
        local col = (idx - 1) % COLS
        local x = GRID_X + col * STEP_X + CARD_W / 2
        local y = GRID_Y - row * STEP_Y - CARD_H / 2
        local card = self:MakeCard(filtered[i], x, y, idx)
        self.cards[idx] = card
    end

    for idx, card in ipairs(self.cards) do
        local row = math.floor((idx - 1) / COLS)
        local col = (idx - 1) % COLS
        if col > 0 and self.cards[idx - 1] then
            card:SetFocusChangeDir(MOVE_LEFT, self.cards[idx - 1])
        end
        if col < COLS - 1 and self.cards[idx + 1] then
            card:SetFocusChangeDir(MOVE_RIGHT, self.cards[idx + 1])
        end
        if row > 0 and self.cards[idx - COLS] then
            card:SetFocusChangeDir(MOVE_UP, self.cards[idx - COLS])
        end
        if self.cards[idx + COLS] then
            card:SetFocusChangeDir(MOVE_DOWN, self.cards[idx + COLS])
        end
    end

    if #self.cards > 0 then
        self.focusIndex = math.min(self.focusIndex or 1, #self.cards)
        self.default_focus = self.cards[self.focusIndex]
        if not self.detailOpen then
            self.cards[self.focusIndex]:SetFocus()
        end
    else
        self.focusIndex = 1
        self.detailOpen = false
        self.detailRoot:Hide()
        self.detailRoot:SetPosition(0, -2000, 0)
    end
end

function DSTTrackerScreen:ShowBoss(slug)
    self.selectedSlug = slug
    self:UpdateDetail(slug)
    self.detailOpen = true
    self.detailRoot:SetPosition(0, 0, 0)
    self.detailRoot:Show()
    if self.detailClose and self.detailClose.SetFocus then
        self.detailClose:SetFocus()
    end
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
    self.world:SetTruncatedString(table.concat(head, " · "), 560, nil, true)

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
    self.stats:SetTruncatedString(stats, 560, nil, true)

    local pct = total > 0 and (killed / total) or 0
    local fill = 380 * pct
    if fill > 0 then
        self.pbarFill:SetSize(fill, 10)
        self.pbarFill:SetPosition(180 + fill / 2, 243, 0)
        self.pbarFill:Show()
    else
        self.pbarFill:Hide()
    end

    self:BuildGrid()
    if self.detailOpen and self.selectedSlug then
        self:UpdateDetail(self.selectedSlug)
    end
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
