const {printTree} = require('./tree_utility');
const {getLog} = require('jest-console');


describe('tree', () => {

    it('should print dir tree full', () => {
        printTree('.');
        expect(getLog().log).toMatch("hw3\n" +
            "├─── index.js\n" +
            "├─── index.spec.js\n" +
            "├─── package-lock.json\n" +
            "├─── package.json\n" +
            "├─── testdata\n" +
            "│\t├─── project\n" +
            "│\t│\t├─── file.txt\n" +
            "│\t│\t└─── gopher.png\n" +
            "│\t├─── static\n" +
            "│\t│\t├─── a_lorem\n" +
            "│\t│\t│\t├─── dolor.txt\n" +
            "│\t│\t│\t├─── gopher.png\n" +
            "│\t│\t│\t└─── ipsum\n" +
            "│\t│\t│\t\t└─── gopher.png\n" +
            "│\t│\t├─── css\n" +
            "│\t│\t│\t└─── body.css\n" +
            "│\t│\t├─── empty.txt\n" +
            "│\t│\t├─── html\n" +
            "│\t│\t│\t└─── index.html\n" +
            "│\t│\t├─── js\n" +
            "│\t│\t│\t└─── site.js\n" +
            "│\t│\t└─── z_lorem\n" +
            "│\t│\t\t├─── dolor.txt\n" +
            "│\t│\t\t├─── gopher.png\n" +
            "│\t│\t\t└─── ipsum\n" +
            "│\t│\t\t\t└─── gopher.png\n" +
            "│\t├─── zline\n" +
            "│\t│\t├─── empty.txt\n" +
            "│\t│\t└─── lorem\n" +
            "│\t│\t\t├─── dolor.txt\n" +
            "│\t│\t\t├─── gopher.png\n" +
            "│\t│\t\t└─── ipsum\n" +
            "│\t│\t\t\t└─── gopher.png\n" +
            "│\t└─── zzfile.txt\n" +
            "└─── tree_utility.js");
    });

    it('should print dir tree with depth = 1', () => {
        printTree('.', 1);
        expect(getLog().log).toMatch("hw3\n" +
            "├─── index.js\n" +
            "├─── index.spec.js\n" +
            "├─── package-lock.json\n" +
            "├─── package.json\n" +
            "├─── testdata\n" +
            "│\t├─── project\n" +
            "│\t├─── static\n" +
            "│\t├─── zline\n" +
            "│\t└─── zzfile.txt\n" +
            "└─── tree_utility.js");
    });

    it('should print dir tree with depth = 2', () => {
        printTree('.', 2);
        expect(getLog().log).toMatch("hw3\n" +
            "├─── index.js\n" +
            "├─── index.spec.js\n" +
            "├─── package-lock.json\n" +
            "├─── package.json\n" +
            "├─── testdata\n" +
            "│\t├─── project\n" +
            "│\t│\t├─── file.txt\n" +
            "│\t│\t└─── gopher.png\n" +
            "│\t├─── static\n" +
            "│\t│\t├─── a_lorem\n" +
            "│\t│\t├─── css\n" +
            "│\t│\t├─── empty.txt\n" +
            "│\t│\t├─── html\n" +
            "│\t│\t├─── js\n" +
            "│\t│\t└─── z_lorem\n" +
            "│\t├─── zline\n" +
            "│\t│\t├─── empty.txt\n" +
            "│\t│\t└─── lorem\n" +
            "│\t└─── zzfile.txt\n" +
            "└─── tree_utility.js");
    });

    it('should print error', () => {
        printTree();
        expect(getLog().log).toMatch("Invalid path parameter. Example: node hw1.js . ");
    });
});