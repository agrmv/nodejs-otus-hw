const fs = require("fs"),
    path = require("path");

const symbols = {
    tab: "\t",
    middle: "├───",
    continue: "│",
    last: "└───"
}

const isDirectory = filePath => {
    return fs.lstatSync(filePath).isDirectory()
}

function printDirItems(dirItems, prefix = '') {
    dirItems.forEach((item, i) => {
        const isLast = i === dirItems.length - 1;
        console.log(`${prefix}${isLast ? symbols.last : symbols.middle} ${item.name}`);
        if (item.items) {
            printDirItems(item.items, `${prefix}${(isLast ? "" : symbols.continue) + symbols.tab}`);
        }
    });
}

function parseDirSync(dirPath, depth, dir = {}, level = 0) {
    if (depth && level > depth) return;

    dir.items = [];
    fs.readdirSync(dirPath).forEach((itemName) => {
        const item = {name: itemName};
        const itemPath = path.join(dirPath, itemName);
        if (['node_modules', 'coverage'].includes(itemName)) return

        dir.items.push(item);
        if (isDirectory(itemPath)) {
            parseDirSync(itemPath, depth, item, level + 1);
        }
    });

    return dir.items;
}

function printTree(inputPath, depth) {
    try {
        const rootPath = fs.realpathSync(inputPath)
        if (rootPath) {
            console.log(path.basename(rootPath));
            printDirItems(parseDirSync(rootPath, depth));
        }
    } catch (e) {
        console.log(`Invalid path parameter. Example: node hw1.js . `);
    }
}

module.exports = {
    printTree
};