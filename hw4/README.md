Web Sockets. Внимание: для данного модуля было принято решение дать два варианта ДЗ, вы можете сделать любой на выбор.

Цель:
Работа с технологией Web Sockets.
Освоение Web Sockets API через выполнение практических задач.

Работа с технологией Web Sockets.
Освоение Web Sockets API через выполнение практических задач.

Option 1: Location-based app с использованием Web Sockets\
Option2: Realtime Web Notifications c Web Sockets

Option 1:

Создать приложение отображающее маршрут пользователя на карте.
https://www.infoworld.com/article/2612668/use-mongodb-to-make-your-app-location-aware.html

Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом и подключить к Web Socket Server.
Используя карту Leaflet, https://leafletjs.com/, отобразите местонахождение пользователя
Поменяйте местонахождение пару-тройку раз. Изменения отправляйте на Web Socket Server и сохраните в DB (вместо DB можно использовать geojson файл) с интервалом в 1 мин или чуть более.
После этого убедитесь что web sockets server правильно записало данные в файл. Создайте тропинку маршрута на карте.
Option2:

Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом, подключить к нему Service Worker (создать его отдельным файлом), подключить Service Worker к Web Socket Server. Примечание: смотрите практическую часть урока, последний час записи для подробностей;
Отправлять нотификации через WS Server через разумный интервал, проверить, что Service Worker получает сообщения от Web Socket Server.
Из Service Worker отправить сообщения на основной скрипт и отображать в виде Web Notifications.
Материалы:
Web Sockets:
https://javascript.info/websocket
https://www.websocket.org/
https://aarontgrogg.com/blog/2015/07/20/the-difference-between-service-workers-web-workers-and-websockets/

Service Workers
https://developers.google.com/web/fundamentals/primers/service-workers
https://love2dev.com/blog/how-to-uninstall-a-service-worker/

Notification API
https://hackernoon.com/why-and-how-to-implement-web-notification-api-4eb795c5b05d
https://flaviocopes.com/notifications-api/

#HOW TO
>для тестов на localhost: https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385