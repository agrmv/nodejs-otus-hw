'use strict';

const ws = require('ws');
const webpush = require("web-push");

const publicVapidKey = 'BK56AMdLY8avuiQRc0yRkSjz4XdyJZsVEG3C3c2EhhVcXqdPLUHFTMKBnQO1JfLxlUV5EgVLg4CuVJQ8jvVf3VE';
const privateVapidKey = 'yeMEED_69UaTssfSwLv0rnrFxFVQlQMlhE-lCj6M7BM';

webpush.setVapidDetails('mailto:qq@qq.qq', publicVapidKey, privateVapidKey);

module.exports = (port) => {
    const wss = new ws.WebSocketServer({port});

    wss.on('connection', ws => {
        ws.on('message', async (message) => {
            await webpush.sendNotification(JSON.parse(message.toString()), JSON.stringify({title: 'otus-huyotus'}));
        });
        ws.send('something');
    });
}