import mongoose from "mongoose";
import dotenv from 'dotenv'
import { populateDb } from './scrappers/runner.js';

dotenv.config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/CrawloDB';

mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('connected...');
        await populateDb();
        console.log('db has data...');
    })
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);