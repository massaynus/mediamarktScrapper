import CategoriesScrapper from './catsScrapper.js';
import ProductsScrapper from './productLinksScrapper.js';
import ProductDataExtractor from './producDataExtractor.js';

const categoriesScrapper = new CategoriesScrapper();

const MAX_PAGES = 5;
const CHUNK_SIZE = 5;

export async function getCats() {
    const categoryURLs = await categoriesScrapper.run();
    //TODO: MongoDB the shit outta this

    return categoryURLs;
}

export async function getProducts(random = false) {
    if (err) throw err;

    const prods = [];


    if (random) {
        const cats = JSON.parse(data).categories;
        //TODO: MongoDB the shit outta this

        for (let index = 0; index < cats.length; index++) {
            const pos = Math.floor(Math.random() * cats.length) + 1;

            const cat = cats[pos];
            console.log(`\ngetting url at ${pos}\turl: ${cat}`);

            const srp = new ProductsScrapper(cat, MAX_PAGES);
            const links = await srp.getProductLinks();

            prods.push({
                cat,
                links
            });
        }
    }
    else {
        const cats = [
            "https://mediamarkt.es/es/category/_m%C3%B3viles-xiaomi-759538.html",
            "https://mediamarkt.es/es/category/_black-friday-706013.html",
            "https://mediamarkt.es/es/category/_lavadoras-samsung-762527.html"
        ];

        for (let index = 0; index < 3; index++) {
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
    }

    return prods;
}

export async function getProductData(url = null) {
    if (url == null) {
        if (err) throw err;

        const prods = [];
        const urls = JSON.parse(data);
        //TODO: MongoDB the shit outta this

        for (let i = 0; i < urls.length; i++) {
            const cat_url = urls[i];
            console.log(`doing category ${i + 1} of ${urls.length}`);

            const extractor = new ProductDataExtractor(cat_url.links, CHUNK_SIZE);

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
    }
    else {
        const extractor = new ProductDataExtractor([url], 1);
        return await extractor.extract();
    }
}
