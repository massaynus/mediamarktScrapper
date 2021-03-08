import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';

import { getCats, getProducts, getProductData } from './scrappers/runner.js';
import DbAccess from "./data/DbAccess.js";

mongoose.connect('mongodb://localhost:27017/CrawloDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('connected...');
        
        
    })
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);