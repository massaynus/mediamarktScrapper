import puppeteer from 'puppeteer';

class ProductLinksScrapper {

    constructor(categoryLink, maxPages) {
        this.categoryLink = categoryLink;
        this.maxPages = maxPages;

        console.log(`initialized scrapper for link: ${categoryLink}`);
    }

    getProductLinks = async () => {
        const browser = await puppeteer.launch({
            slowMo: 300,
            headless: false,
            defaultViewport: {
                height: 700,
                width: 1300
            }
        });
        const page = await browser.newPage();
        await page.goto(this.categoryLink);

        const acceptarTodo = await page.$("button[data-test='pwa-consent-layer-accept-all']");
        if (acceptarTodo != null) {
            await acceptarTodo.click();
        }

        const btn = await page.$("button[data-test='mms-search-srp-loadmore']");
        if (btn != null) {
            btn.click();

            while (this.maxPages > 0) {
                console.log('loading next page');
                await page.evaluate(() => {
                    const last = document.querySelector("div[data-test='mms-search-srp-productlist-item']:last-child");
                    last.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                })
                
                await page.waitForTimeout(3000);
                this.maxPages--;
            }

        }


        const data = await page.evaluate(() => {
            const urls = [];

            document.querySelectorAll('a').forEach(url => {
                if (url.href.startsWith('https://www.mediamarkt.es/es/product')) {
                    urls.push(url.href);
                }
            });

            return urls;
        });

        await browser.close();

        console.log(`got ${data.length} urls\n`);
        return data;
    }

}


export default ProductLinksScrapper;
