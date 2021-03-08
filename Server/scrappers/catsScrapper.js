import cheerio from 'cheerio';
import getUrls from 'get-urls';
import fetch from 'node-fetch';

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

    extractCategoryData = async (parent, url) => {
        const res = await fetch(url);
        if (res.ok) {
            const $ = cheerio.load(await res.text());
            const name = $('#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > main > div.Grid__StyledGrid-fs0zc2-0.cQIsoQ > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.htWuLc > div.HeadLayout__StyledHead-kzl61k-0.ktKwWx > div.HeadLayout__StyledHeadline-kzl61k-3.jtoYfq > div > h1').text();
            const productsCount = parseInt($("#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > main > div.Grid__StyledGrid-fs0zc2-0.cQIsoQ > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.htWuLc > div.HeadLayout__StyledHead-kzl61k-0.ktKwWx > div.HeadLayout__StyledHeadline-kzl61k-3.jtoYfq > div > span").text().substring(1).split(' ')[0]);

            return {url, name, productsCount, parent_url: parent};
        }
    }

    run = async () => {
        const mainUrls = await this.scrapeMainCategories();

        const categories = [];
        const mainCategories = [];

        for (let cat of mainUrls) {

            mainCategories.push(cat);

            const subs = await this.scrapeSubCategories(cat);

            for (let sub of subs) {
                categories.push(sub);
            }
        }

        return { mainCategories, categories };
    }

}


export default MediamarktCategoriesScrapper;
