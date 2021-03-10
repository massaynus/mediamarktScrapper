# MEDIAMARKT scrappers

this is a project to scrap data from mediamarkt, it was built using MERN!

## Server

on server start up it would check for data in the CrawloDB, if there is no data in it, `populateDb()` from **runner.js** would run to scrap three pre-selected categories

### Scrapping side

otherwise the scrappers work as follows:

- MediamarktCategoriesScrapper:
    - scrapeMainCategories: extract the main categories from the main page (urls only)
    - scrapeSubCategories: extracts all the suv categories present in a main category page (urls only)
    - extractCategoryData: extracts the category data from a given url

- ProductLinksScrapper: has the task of getting all the urls of products present in the category url given. the `maxPages` arg tells it how many times to trigger the pagination load

- ProducDataExtractor: takes in an array of prodct urls, and a `chunkSize`, because this page needs a browser env to load correctly, we load them in a chromium instance, the chunk size is used to determine the max amount of pages to ba opened at once.

the **runner.js** file has expamples on how to run everyone of these scrappers, but all the examples save the data to `.json` files, except for the `populateDb()` function, which has the goal of populating the database.

### Express

the server also exposes a RESTful API to query and retrieve the data efficiently.

## Client

just a simple react app that uses the server to vizualise and display the collected data.