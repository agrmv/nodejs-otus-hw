Web Sockets. 

Цель:
Работа с технологией Web Sockets.
Освоение Web Sockets API через выполнение практических задач.

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

## How to

### Node version: v16.3.0

> **npm start** - запуск сервера\
> 
> **для запуска на локал хосте** - включить флаг: chrome://flags/#unsafely-treat-insecure-origin-as-secure 