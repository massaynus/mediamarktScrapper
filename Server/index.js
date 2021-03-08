import mongoose from "mongoose";
import { populateDb } from './scrappers/runner.js';

mongoose.connect('mongodb://localhost:27017/CrawloDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('connected...');
        
        await populateDb();
    })
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);