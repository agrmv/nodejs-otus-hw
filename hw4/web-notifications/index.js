'use strict';

async function start() {
    const app = require('./servers/httpServer');

    require('./servers/wsServer')(8082);

    app.listen(8080, () => console.log('Server started.\nhttp://localhost:8080/'))
}

start().catch(e => console.log('Error:', e));