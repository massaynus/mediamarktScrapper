import mongoose from 'mongoose';

const Category = mongoose.model('Category', new mongoose.Schema({
    url: String,
    name: String,
    productsCount: Number,
    parent_url: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        res: 'Product'
    }]
}));

export default Category;