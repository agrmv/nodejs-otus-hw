'use strict';

const fs = require('fs');
const config = require('./config')

const getRandomNumber = () => Math.round(Math.random() * (config.maxRandomNum - config.minRandomNum) + config.minRandomNum);

/**
 * Generate large file with fixed size
 * @param fileName
 */
module.exports = (fileName) => {
    console.log(`Start creating file ${fileName}...`);
    fs.writeFileSync(fileName, '');
    while (fs.statSync(fileName)['size'] < config.largeFileSize) {
        fs.appendFileSync(fileName, Array.from({length: 1000}, () => getRandomNumber()).join('\n'));
    }

    console.log(`The file ${fileName} was created.`);
};