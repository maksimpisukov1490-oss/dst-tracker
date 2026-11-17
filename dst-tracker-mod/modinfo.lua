name = "DST Compendium Sync"
description = "Мост для «Компендиума выжившего»: пишет убийства боссов в JSON-файл для tools/bridge.py и добавляет в меню паузы экран в стиле сайта: тёмная панель, золото, пергаментные карточки, сетка боссов и модальная запись.\n\nДля синхронизации достаточно сервера; кнопка в паузе появляется у тех, у кого стоит мод (включая хоста)."
author = "dst-tracker"
version = "1.5.1"

api_version = 10
priority = 0

dst_compatible = true
dont_starve_compatible = false
reign_of_giants_compatible = false

all_clients_require_mod = false
client_only_mod = false
server_only_mod = false

server_filter_tags = { "dst-tracker", "compendium" }

configuration_options = {
    {
        name = "debounce",
        label = "Склейка серии смертей (сек)",
        hover = "Фигуры шахмат, клоны-близнецы и фазы боссов гибнут почти одновременно. В этом окне серия считается одной победой.",
        options = {
            { description = "5", data = 5 },
            { description = "10", data = 10 },
            { description = "15", data = 15 },
            { description = "30", data = 30 },
        },
        default = 15,
    },
    {
        name = "heartbeat",
        label = "Запись состояния (сек)",
        hover = "Как часто обновлять день, сезон и список игроков в файле синхронизации.",
        options = {
            { description = "15", data = 15 },
            { description = "30", data = 30 },
            { description = "60", data = 60 },
        },
        default = 30,
    },
}
