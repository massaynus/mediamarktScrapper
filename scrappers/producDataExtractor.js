const cheerio = require('cheerio');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

class ProducDataExtractor {

    constructor(urls, chunkSize) {
        this.urls = urls;
        this.chunkSize = chunkSize;
    }

    extract = async () => {

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 300,
            defaultViewport: {
                height: 700,
                width: 1300
            }
        });

        const data = [];

        let i, j, temp;
        for (i = 0, j = this.urls.length; i < j; i += this.chunkSize) {
            console.log(`doing chunk ${i} to ${i + this.chunkSize}`);

            temp = this.urls.slice(i, i + this.chunkSize);
            const chunkData = await Promise.all(temp.map(url => this.runPage(browser, url)));

            for (const prod of chunkData) {
                data.push(prod);
            }
        }

        await browser.close();
        return data;
    }

    runPage = async (browser, url) => {
        const page = await browser.newPage();
        await page.goto(url);

        const acceptarTodo = await page.$("button[data-test='pwa-consent-layer-accept-all']");
        if (acceptarTodo != null) {
            await acceptarTodo.click();
        }

        await page.waitForTimeout(2000);
        const data = await page.evaluate(() => document.body.innerHTML);
        await page.close();

        const $ = cheerio.load(data);
        const name = $('h1').text();
        const price = $('span.Typostyled__StyledInfoTypo-sc-1jga2g7-0.bvXwUO.Pricestyled__BrandedPriceTypo-sc-1bu146t-0.kcGTpT').text();
        const brand = $('#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > div.ProductDetailPagestyled__StyledPdpWrapper-sc-5s3nfq-1.hjoxyt > div:nth-child(1) > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.eJonzE.ProductDetailPagestyled__StyledPdpHeaderCell-sc-5s3nfq-3.cVjger > div > div > a > img').attr('alt');

        let specifications = [];

        $('#features tr').each((_, tr) => {
            const obj = {
                key: $(tr).children('td:first-child').text(),
                value: $(tr).children('td:last-child').text()
            };

            if (!specifications.some(spec => spec.key === obj.key)) {
                specifications.push(obj);
            }
        });

        specifications = specifications.filter(spec => spec.key != '');

        return { name, url: this.url, price, brand, specifications };
    }

}

module.exports = ProducDataExtractor;