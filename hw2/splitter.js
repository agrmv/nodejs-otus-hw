'use strict';

const fs = require('fs');
const readline = require('readline');
const config = require('./config')

/**
 * Creating sub file
 * @param subFileName
 * @param subFileNumbers
 * @returns {Promise<*>}
 */
const createSubFile = async (subFileName, subFileNumbers) => {
    await fs.promises.writeFile(subFileName, subFileNumbers.sort((a, b) => a - b).join('\n'));
    console.log(`File ${subFileName} created.`);
    return subFileName;
}

/**
 * Splits a large file into small, fixed size subfiles
 * @param fileName the name of the large file to split
 * @param dir directory for store sub files
 * @param maxSubFileSize max sub file size in kb
 * @returns Array array of subfiles
 */
module.exports = async (fileName, dir = config.dirForSubFiles, maxSubFileSize = config.maxSubFileSize) => {
    await fs.promises.mkdir(dir, {recursive: true});

    const subFiles = [];
    let fileNumbers = [], subFileSize = 0, fileIndex = 0;
    console.log('File splitting started...');
    for await (const line of readline.createInterface({input: fs.createReadStream(fileName), crlfDelay: Infinity})) {
        if (subFileSize >= maxSubFileSize) {
            subFiles.push(await createSubFile(`${dir}/partialFile_${fileIndex++}.txt`, fileNumbers))
            fileNumbers = [];
            subFileSize = 0;
            continue;
        }
        subFileSize += (line + '\n').length;
        fileNumbers.push(+line);
    }
    //остатки
    if (fileNumbers.length) {
        subFiles.push(await createSubFile(`${dir}/partialFile_${fileIndex++}.txt`, fileNumbers))
    }
    console.log('File splitting success');
    return subFiles;
};
