const fs = require('fs');
const path = require('path');

const scrapper = new (require('./catsScrapper'))();


(
    async function () {
        const categoryURLs = await scrapper.run();

        const dataFileName = path.join(__dirname, 'data' ,'categories.json');
        const jsonData = JSON.stringify(categoryURLs);

        fs.writeFile(dataFileName, jsonData, (err) => {
            if (err) throw err;
            else console.log('cats written...');
        });
    }
)()