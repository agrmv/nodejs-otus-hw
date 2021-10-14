const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../static')));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname + '/../static/index.html'));
    } catch (e) {
        console.log('Express error:', e);
    }
});

module.exports = app;