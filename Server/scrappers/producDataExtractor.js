import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

class ProducDataExtractor {

    constructor(urls, chunkSize) {
        this.urls = urls;
        this.chunkSize = chunkSize;
    }

    extract = async () => {

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
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
        const inStock = $("#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > div.ProductDetailPagestyled__StyledPdpWrapper-sc-5s3nfq-1.hjoxyt > div:nth-child(1) > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.ibdyBk.ProductDetailPagestyled__StyledPdpDetailCell-sc-5s3nfq-4.gLozy > div > div > div:nth-child(3) > div > span")
                        != null;

        let delivery = $('#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > div.ProductDetailPagestyled__StyledPdpWrapper-sc-5s3nfq-1.hjoxyt > div:nth-child(1) > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.ibdyBk.ProductDetailPagestyled__StyledPdpDetailCell-sc-5s3nfq-4.gLozy > div > div > div:nth-child(3) > div > div.Availabilitystyled__StyledAvailabilityWrapper-sc-901vi5-0.dQrJYh > div.Availabilitystyled__StyledAvailabilityHeadingWrapper-sc-901vi5-2.duCLGf > span').text();
        delivery = delivery.replace('Entrega ','');

        let dates = delivery.split('-').map(d => {
            const parts = d.split('.');
            return new Date(parts[2], parts[1] - (parts[1] > 0 ? 1 : 0), parts[0])
        });
        
        let now = new Date().getTime();

        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            dates[i] = Math.round(Math.abs(date - now) / (1000 * 60 * 60));
        }

        delivery = dates.join('-') + ' hours';

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

        const images = [];
        $('#root > div.indexstyled__StyledAppWrapper-sc-1hu9cx8-0.klAfyt > div.ProductDetailPagestyled__StyledPdpWrapper-sc-5s3nfq-1.hjoxyt > div:nth-child(1) > div > div.Cellstyled__StyledCell-sc-1wk5bje-0.gNzMLI > div > div > div.Gallerystyled__StyledCarouselWrapper-sc-1wra1rw-0.rGwsm img')
            .each((_, el) => {
                images.push({
                    src: $(el).attr('src'),
                    alt: $(el).attr('alt')
                });
            });

        return { name, url, price, brand, inStock, delivery, images, specifications };
    }

}

export default ProducDataExtractor;
