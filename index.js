const fs = require('fs');
const path = require('path');

const categoriesScrapper = new (require('./catsScrapper'))();
const ProductsScrapper = require('./productLinksScrapper');

const CATEGORIES_FILE_NAME = path.join(__dirname, 'data', 'categories.json');
const PRODUCTS_FILE_NAME = path.join(__dirname, 'data', 'products.json');
const MAX_PAGES = 5;

async function getCats() {
    const categoryURLs = await categoriesScrapper.run();

    fs.writeFile(CATEGORIES_FILE_NAME, JSON.stringify(categoryURLs), (err) => {
        if (err) throw err;
        else console.log('cats written...');
    });

    return categoryURLs;
}

async function getProducts() {
    fs.readFile(CATEGORIES_FILE_NAME, async (err , data) => {
        if (err) throw err;

        const prods = [];
        // const cats = JSON.parse(data).categories;
        const cats = [
            "https://mediamarkt.es/es/category/_m%C3%B3viles-xiaomi-759538.html",
            "https://mediamarkt.es/es/category/_black-friday-706013.html",
            "https://mediamarkt.es/es/category/_lavadoras-samsung-762527.html"
        ]

        for (let index = 0; index < 3; index++) {
            // const pos = Math.floor(Math.random() * cats.length) + 1;
            const pos = index;
            
            const cat = cats[pos];
            console.log(`\ngetting url at ${pos}\turl: ${cat}`);

            const srp = new ProductsScrapper(cat, MAX_PAGES);
            const links = await srp.getProductLinks();

            prods.push({
                cat,
                links
            });
        }

        fs.writeFile(PRODUCTS_FILE_NAME, JSON.stringify(prods), (err) => {
            if (err) throw err;
            else console.log('prods written...');
        });

        return prods;
    })
}

// getCats()
//     .then(data => console.log(data));

getProducts()
    .then(data => console.log(data));