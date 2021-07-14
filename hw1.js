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

const isDirectoryAsync = async filePath => {
    return (await fs.promises.stat(filePath)).isDirectory()
}

function printTree(dirItems, prefix = '') {
    dirItems.forEach((item, i) => {
        const isLast = i === dirItems.length - 1;
        console.log(`${prefix}${isLast ? symbols.last : symbols.middle} ${item.name}`);
        if (item.items) {
            printTree(item.items, `${prefix}${(isLast ? "" : symbols.continue) + symbols.tab} `);
        }
    });
}

function parseDirSync(dirPath, depth, dir = {}, level = 0) {
    if (depth && level > depth) return;

    dir.items = [];
    fs.readdirSync(dirPath).forEach((itemName) => {
        const item = {name: itemName};
        const itemPath = path.join(dirPath, itemName);

        dir.items.push(item);
        if (isDirectory(itemPath)) {
            parseDirSync(itemPath, depth, item, level + 1);
        }
    });

    return dir.items;
}

async function parseDirAsync2(dirPath, depth, level = 0) {
    if (depth && level > depth) return;

    const items = await fs.promises.readdir(dirPath);
    const files = await Promise.all(items.map(async (item) => {
        const itemPath = path.join(dirPath, item);
        const result = {name: item};
        return await isDirectoryAsync(itemPath) ? {
            name: item,
            items: await parseDirAsync2(itemPath, depth, level + 1)
        } : result;
    }));

    return files;
}

try {
    const [inputPath, depth] = process.argv.slice(2, 5);
    if (!inputPath) {
        console.error(`Invalid path parameter. Example: node hw1.js . `);
        return;
    }

    const rootPath = fs.realpathSync(inputPath)
    if (rootPath) {
        console.log(path.basename(rootPath));
        //printTree(parseDir(rootPath, depth));
        parseDirAsync2(rootPath, depth).then(r => printTree(r)).catch(e => console.error(e));
    }
} catch (err) {
    console.error(err);
}
