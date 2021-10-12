const {printTree} = require('./tree_utility');

try {
    const [inputPath, depth] = process.argv.slice(2, 5);
    if (!inputPath) {
        console.error(`Invalid path parameter. Example: node hw1.js . `);
        return;
    }
    printTree(inputPath, depth);
} catch (err) {
    console.error(err);
}