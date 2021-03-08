import mongoose from 'mongoose';

const Product = mongoose.model('Product', new mongoose.Schema({
    url: String,
    name: String,
    price: Number,
    brand: String,
    inStock: Boolean,
    delivery: String,
    specifications: [{
        key: String,
        value: String
    }],
    images: [{
        src: String,
        alt: String
    }]
}));

export default Product;