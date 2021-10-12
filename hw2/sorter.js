'use strict';

const fs = require('fs');
const config = require('./config');
const {once} = require('events')
const readline = require('readline');


const getSubFilesIterators = (tmpFiles) => {
    return tmpFiles.map((fileName) => readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    })[Symbol.asyncIterator]())
}

/**
 * Find min value
 * @param obj
 * @returns {{val: Number, key: String}}
 */
const findMinNumber = (obj) => {
    const [min] = Object.entries(obj).sort(([, a], [, b]) => a - b);
    return {key: min[0], val: min[1]};
}

/**
 * Sorting numbers from sub-files and write to result file
 * @param subFiles
 * @returns {Promise<void>}
 */
module.exports = async (subFiles) => {
    const subFileIterators = getSubFilesIterators(subFiles);
    const resultFileWriteStream = fs.createWriteStream(config.resultFileName);

    console.log('Sort started...');

    const numbers = {};
    for (const [key, iterator] of subFileIterators.entries()) {
        const line = await iterator.next();
        if (!line.done) numbers[key] = +line.value;
    }

    while (Object.keys(numbers).length) {
        const min = findMinNumber(numbers);

        const nextLine = await subFileIterators[min.key].next();
        nextLine.done ? delete numbers[min.key] : numbers[min.key] = +nextLine.value;
        if (!resultFileWriteStream.write(min.val + '\n')) {
            await once(resultFileWriteStream, 'drain');
        }
    }

    resultFileWriteStream.end('\n');
    console.log(`Sort finished. Result in file ${config.resultFileName}.`);
}