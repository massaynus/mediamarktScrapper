import DbAccess from '../data/DbAccess.js';

import CategoriesScrapper from './catsScrapper.js';
import ProductsScrapper from './productLinksScrapper.js';
import ProductDataExtractor from './producDataExtractor.js';

const categoriesScrapper = new CategoriesScrapper();

const MAX_DEPTH = 5;
const CHROMIUM_CHUNK_SIZE = 3;

export async function getCats() {
    const categoryURLs = await categoriesScrapper.run();

    fs.writeFile(CATEGORIES_FILE_NAME, JSON.stringify(categoryURLs), (err) => {
        if (err) throw err;
        else console.log('cats written...');
    });

    return categoryURLs;
}

export async function getProducts() {
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

            const srp = new ProductsScrapper(cat, MAX_DEPTH);
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

export async function getProductData() {
    // const extractor = new ProductDataExtractor(['https://www.mediamarkt.es/es/product/_portátil-gaming-asus-rog-g712lv-h7077-14-intel®-core™-i7-10750h-32-gb-ram-1-tb-ssd-rtx-2060-freedos-1502439.html'], CHUNK_SIZE);
    // return await extractor.extract();

    fs.readFile(PRODUCTS_FILE_NAME, async (err, data) => {
        if (err) throw err;

        const prods = [];
        const urls = JSON.parse(data);

        for (let i = 0; i < urls.length; i++) {
            const cat_url = urls[i];
            console.log(`doing category ${i + 1} of ${urls.length}`);

            const extractor = new ProductDataExtractor(cat_url.links, CHROMIUM_CHUNK_SIZE);

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

export async function populateDb() {
    const cats = [
        "https://mediamarkt.es/es/category/_m%C3%B3viles-xiaomi-759538.html",
        "https://mediamarkt.es/es/category/_black-friday-706013.html",
        "https://mediamarkt.es/es/category/_lavadoras-samsung-762527.html"
    ];

    for (const cat of cats) {
        console.log(`cat-url: ${cat}`);

        const category = await categoriesScrapper.extractCategoryData('', cat);

        const dbCategory = await DbAccess.CreateCategory(category.url, category.name, category.productsCount, category.parent_url);

        const links = await new ProductsScrapper(cat, MAX_DEPTH).getProductLinks();
        const extractor = new ProductDataExtractor(links, CHROMIUM_CHUNK_SIZE);

        const products = await extractor.extract();

        for (const product of products) {
            console.log(`prod-url: ${product.url}`);
            

            const dbProduct = await DbAccess.CreateProduct(product.url, product.name, product.price, product.brand, product.inStock, product.delivery, product.specifications, product.images);
            dbCategory.products.push(dbProduct);
        }

        dbCategory.save();

        console.log(`save category: ${dbCategory.name}`);
    }
}