const cheerio = require('cheerio');
const getUrls = require('get-urls');
const fetch = require('node-fetch');

class MediamarktCategoriesScrapper {

    scrapeMainCategories = async () => {
        const res = await fetch('https://www.mediamarkt.es/');
        if (res.ok) {
            const categoryLinks = new Set();
            getUrls(await res.text())
                .forEach(u => {
                    if (u.indexOf('category') !== -1) {
                        categoryLinks.add(u);
                    }
                });

            console.log(categoryLinks);
            return categoryLinks;
        }
        else {
            console.log('status code: ', res.status);
        }
    }


    scrapeSubCategories = async (catUrl) => {
        const res = await fetch(catUrl);
        if (res.ok) {
            const categoryLinks = new Set();
            getUrls(await res.text())
                .forEach(u => {
                    if (u.indexOf('category') !== -1) {
                        categoryLinks.add(u);
                    }
                });

            return categoryLinks;
        }
        else {
            console.log('status code: ', res.status);
        }
    }

    run = async () => {
        const mainUrls = await this.scrapeMainCategories();

        const subCategories = [];
        const mainCategories = [];

        for (let cat of mainUrls) {

            mainCategories.push(cat);

            const subs = await this.scrapeSubCategories(cat);

            for (let sub of subs) {
                subCategories.push(sub);
            }
        }

        return { mainCategories, subCategories };
    }

}


module.exports = MediamarktCategoriesScrapper;