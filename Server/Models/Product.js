import { model, Schema } from 'mongoose';

const Product = model('Product', new Schema({
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