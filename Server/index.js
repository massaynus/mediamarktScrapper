import mongoose from "mongoose";
import dotenv from 'dotenv'
import { populateDb } from './scrappers/runner.js';
import express from 'express';

dotenv.config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/CrawloDB';
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (_, res) => {
    res.status(200);
    res.send('App is up!!');
    res.end();
});


mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('connected...');
        await populateDb();
        console.log('db has data...');


        app.listen(PORT, () => {
            console.log(`app is listening on http://localhost:${PORT}...`);
        });
    })
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);