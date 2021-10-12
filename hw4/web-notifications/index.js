const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');


const app = express();
app.use('/public', express.static(path.join(__dirname, '..', 'static')));

app.use(bodyParser.json())

webpush.setVapidDetails('mailto:qq@qq.qq', config.publicVapidKey, config.privateVapidKey);

app.get('/', (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname + '/../static/index.html'));
    } catch (e) {
        console.log('Express error:', e);
    }
});

app.post('/subscribe', (req, res) => {
    webpush.sendNotification(req.body, JSON.stringify({title: 'otus-huyotus'})).catch(err => console.error(err));
    res.status(201).json({})
})
app.listen(8080, function () {
    console.log('Server started.\nhttp://localhost:8080/')
})