-- DST Compendium Sync — точка входа мода.
-- modimport в окружении мода не возвращает значение: модули кладут данные
-- в глобалы окружения (Tracker, BOSS_MAP), поэтому просто подгружаем их.

modimport("scripts/boss_map")
modimport("scripts/dst_tracker")

local NAMESPACE = "dst_tracker"
local TheNet = GLOBAL.TheNet

-- Сервер отдаёт снимок прогресса клиенту, который открыл экран в паузе.
-- Регистрируем оба RPC на обеих сторонах, чтобы id совпадали.
AddModRPCHandler(NAMESPACE, "request_snapshot", function(player)
    if not (TheNet and TheNet.GetIsServer and TheNet:GetIsServer()) then
        return
    end
    if not player or not player.userid then
        return
    end
    if not (Tracker and Tracker.SnapshotJSON) then
        return
    end
    local ok, data = pcall(Tracker.SnapshotJSON)
    if not ok or type(data) ~= "string" or data == "" then
        return
    end
    SendModRPCToClient(GetClientModRPC(NAMESPACE, "snapshot"), player.userid, data)
end)

AddClientModRPCHandler(NAMESPACE, "snapshot", function(data)
    if DST_TRACKER_ON_SNAPSHOT then
        DST_TRACKER_ON_SNAPSHOT(data)
    end
end)

if TheNet and TheNet.GetIsServer and TheNet:GetIsServer() then
    Tracker.Install()
end

local is_client = (TheNet and TheNet.GetIsClient and TheNet:GetIsClient())
    or GLOBAL.TheFrontEnd ~= nil
if is_client then
    modimport("scripts/dst_tracker_client")
end
