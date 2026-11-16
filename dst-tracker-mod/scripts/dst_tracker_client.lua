-- Клиентская часть: кнопка «Компендиум» в меню паузы и экран прогресса.
-- Данные приходят с сервера по RPC, потому что серверный мод ведёт учёт,
-- а интерфейс живёт в клиентском окружении.

local Screen = require "widgets/screen"
local Widget = require "widgets/widget"
local Text = require "widgets/text"
local ImageButton = require "widgets/imagebutton"
local ScrollableList = require "widgets/scrollablelist"
local TEMPLATES = require "widgets/redux/templates"

local NAMESPACE = "dst_tracker"

local SEASON_RU = {
    autumn = "осень",
    winter = "зима",
    spring = "весна",
    summer = "лето",
}

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

DST_TRACKER_OPEN = nil
DST_TRACKER_LAST = nil

local DSTTrackerScreen = Class(Screen, function(self)
    Screen._ctor(self, "DSTTrackerScreen")

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

    self.bg = self.proot:AddChild(TEMPLATES.CurlyWindow(640, 500, "Компендиум выжившего", nil, nil, nil))
    self.bg:SetScale(1, 1)

    self.world = self.proot:AddChild(Text(CHATFONT, 22, "Загрузка данных мира…", UICOLOURS.GOLD_SELECTED))
    self.world:SetPosition(0, 150, 0)

    self.stats = self.proot:AddChild(Text(CHATFONT, 19, "", UICOLOURS.GOLD))
    self.stats:SetPosition(0, 120, 0)

    self.list = self.proot:AddChild(ScrollableList({}, 560, 270, 30, 2, nil, nil, 0, false, 0, 0, 1, 1, "GOLD"))
    self.list:SetPosition(0, -20, 0)

    self.close = self.proot:AddChild(ImageButton(
        "images/global_redux.xml",
        "button_carny_long_normal.tex",
        "button_carny_long_hover.tex",
        "button_carny_long_disabled.tex",
        "button_carny_long_down.tex"
    ))
    self.close:SetText("Закрыть")
    self.close:SetOnClick(function() self:Close() end)
    self.close:SetPosition(0, -205, 0)
    self.close:SetScale(.8)

    self.default_focus = self.list
    DST_TRACKER_OPEN = self

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

function DSTTrackerScreen:UpdateSnapshot(snapshot)
    self.snapshot = snapshot
    local w = snapshot.world or {}
    local day = tonumber(w.day) or 0
    local season = season_name(w.season)
    local who = char_name(w.char)

    local head = { w.name or "Мир", "день " .. tostring(day) }
    if season ~= "" then
        head[#head + 1] = season
    end
    if who ~= "" then
        head[#head + 1] = who
    end
    self.world:SetString(table.concat(head, " · "))

    local kills = snapshot.kills or {}
    local retro = snapshot.retro or {}
    local killed = 0
    for _, slug in ipairs(BOSS_ORDER or {}) do
        local k = kills[slug]
        local count = k and (tonumber(k.count) or 0) or 0
        local old = tonumber(retro[slug]) or 0
        if old > count then
            count = old
        end
        if count > 0 then
            killed = killed + 1
        end
    end

    local marks = 0
    for _, on in pairs(snapshot.marks or {}) do
        if on then
            marks = marks + 1
        end
    end
    local mark_total = tonumber(snapshot.mark_count) or (Tracker and Tracker.MARK_COUNT) or 0

    local stats = "Победы: " .. killed .. " / " .. tostring(#(BOSS_ORDER or {}))
    stats = stats .. " · метки: " .. marks .. (mark_total > 0 and (" / " .. mark_total) or "")

    local sk = snapshot.skills
    if sk then
        stats = stats .. " · навыки: " .. tostring(#(sk.skills or {}))
        stats = stats .. " · озарение: " .. tostring(sk.points or 0)
    end
    self.stats:SetString(stats)

    self:BuildRows(snapshot)
end

function DSTTrackerScreen:BuildRows(snapshot)
    local rows = {}
    local kills = snapshot.kills or {}
    local retro = snapshot.retro or {}

    for _, slug in ipairs(BOSS_ORDER or {}) do
        local k = kills[slug]
        local count = k and (tonumber(k.count) or 0) or 0
        local old = tonumber(retro[slug]) or 0
        if old > count then
            count = old
        end
        local on = count > 0
        local colour = on and UICOLOURS.GOLD or UICOLOURS.GREY

        local row = Widget("bossrow")
        local check = row:AddChild(Text(CHATFONT, 22, on and "✓" or "·", colour))
        check:SetPosition(8, 0, 0)
        check:SetHAlign(ANCHOR_LEFT)

        local name = row:AddChild(Text(CHATFONT, 22, (BOSS_NAMES and BOSS_NAMES[slug]) or slug, colour))
        name:SetPosition(34, 0, 0)
        name:SetHAlign(ANCHOR_LEFT)

        local right = row:AddChild(Text(CHATFONT, 20, "", colour))
        right:SetPosition(540, 0, 0)
        right:SetHAlign(ANCHOR_RIGHT)
        if on then
            local txt = "×" .. tostring(count)
            local d = tonumber(k.day) or 0
            if d > 0 then
                txt = txt .. " · день " .. tostring(d)
            end
            right:SetString(txt)
        end

        rows[#rows + 1] = row
    end

    self.list:SetList(rows)
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
