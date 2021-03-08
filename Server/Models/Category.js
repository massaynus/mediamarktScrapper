import { model, Schema } from 'mongoose';

const Category = model('Category', new Schema({
    url: String,
    name: String,
    productsCount: Number,
    parent_url: String,
    products: [{
        type: Schema.Types.ObjectId,
        res: 'Product'
    }]
}));

export default Category;