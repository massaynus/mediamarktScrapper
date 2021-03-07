const fs = require('fs');
const path = require('path');

const categoriesScrapper = new (require('./scrappers/catsScrapper'))();
const ProductsScrapper = require('./scrappers/productLinksScrapper');
const ProductDataExtractor = require('./scrappers/producDataExtractor');

const CATEGORIES_FILE_NAME = path.join(__dirname, 'data', 'categories.json');
const PRODUCTS_FILE_NAME = path.join(__dirname, 'data', 'products.json');
const PRODUCT_DATA_FILE_NAME = path.join(__dirname, 'data', 'productsData.json');
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
    fs.readFile(CATEGORIES_FILE_NAME, async (err, data) => {
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

async function getProductData() {
    fs.readFile(PRODUCTS_FILE_NAME, async (err, data) => {
        if (err) throw err;

        const prods = [];
        const urls = JSON.parse(data);

        for (let i = 0; i < urls.length; i++) {
            const cat_url = urls[i];
            console.log(`doing category ${i + 1} of ${urls.length}`);

            const extractor = new ProductDataExtractor(cat_url.links, 4);
            
            prods.push({
                category: urls.cat,
                products: await extractor.extract()
            });
        }

        fs.writeFile(PRODUCT_DATA_FILE_NAME, JSON.stringify(prods), (err) => {
            if (err) throw err;
            else console.log('prods written...');
        });

        return prods;
    })
}

// getCats()
//     .then(data => console.log(data));

// getProducts()
//     .then(data => console.log(data));

getProductData()
    .then(data => console.log(data));
