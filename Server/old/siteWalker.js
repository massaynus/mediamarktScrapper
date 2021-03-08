const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.mediamarkt.es');
    await (await driver.findElement(By.className('Buttonstyled__StyledButton-sc-140xkaw-1 kTBAvo'))).click();
    await (await driver.findElement(By.className('CategoryButton__StyledButton-sc-1kwdm5u-1 kxGtpg categories-button'))).click();

    driver.

    setTimeout(() => {
        // nothingness
    }, 10 * 1000);
    
  } finally {
    await driver.quit();
  }
})();