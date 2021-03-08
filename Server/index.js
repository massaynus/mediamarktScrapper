import {getCats, getProducts, getProductData} from './scrappers/runner.js';


getProductData('https://www.mediamarkt.es/es/product/_portátil-gaming-asus-rog-g712lv-h7077-14-intel®-core™-i7-10750h-32-gb-ram-1-tb-ssd-rtx-2060-freedos-1502439.html')
    .then(data => console.log(data));