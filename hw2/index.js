const generator = require('./generator');
const splitter = require('./splitter');
const sorter = require('./sorter');
const config = require("./config");
const fs = require("fs");

(async () => {
    try {
        generator(config.largeFileName);
        await sorter(await splitter(config.largeFileName));

        //await fs.promises.rm(config.dirForSubFiles, {recursive: true});
        fs.promises.rm(config.dirForSubFiles, {recursive: true}).then(() => console.log('Temp folder was removed.')).catch(e => console.log(e));
    } catch (e) {
        console.log(e)
    }
})()