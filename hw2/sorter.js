'use strict';

const fs = require('fs');
const config = require('./config');
const {once} = require('events')
const readline = require('readline');

/**
 *
 * @param readStream
 * @returns {AsyncGenerator<string|string[], void, *>}
 */
const streamToLines = async function* (readStream) {
    let previous = '';
    for await (const chunk of readStream) {
        previous += chunk;
        while (true) {
            const eolIndex = previous.indexOf('\n');
            if (eolIndex < 0) break;

            yield previous.slice(0, eolIndex);
            previous = previous.slice(eolIndex + 1);
        }
    }
    if (previous.length > 0) {
        yield previous;
    }
};

// function getSubFilesIterators(tmpFiles) {
//     return tmpFiles.map(fileName => fs.createReadStream(fileName)).map(stream => await streamToLines(stream))
// }

function getSubFilesIterators(tmpFiles) {
    return tmpFiles.map(fileName => fs.createReadStream(fileName)).map(stream => readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })[Symbol.asyncIterator]())
}


function findMinNumber(obj) {
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

    while (true) {
        if (!Object.keys(numbers).length) break;
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