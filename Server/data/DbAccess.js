import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

class DbAccess {

    static CreateCategory = async (url = '', name = '', productsCount = 0, parent_url = '', products = []) => {
        try {
            const category = new Category({
                url, name, productsCount, parent_url, products
            });

            await category.save();
            return category;
        } catch (error) {
            console.log(error);
        }
    }

    static CreateProduct = async (url = '', name = '', price = 0, brand = '', inStock = false, delivery = '', specifications = [{ key: '', value: '' }], images = [{ src: '', alt: '' }]) => {
        try {
            const product = new Product({
                url,
                name,
                price,
                brand,
                inStock,
                delivery,
                specifications,
                images,
            });

            await product.save();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    static FindCategory = async (id) => {
        try {
            return await Category.findById({_id: id}).exec();  
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static FindProduct = async (id) => {
        try {
            return await Product.findById({_id: id}).exec();  
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static GetCategories = async () => {
        try {
            return await Category.find().exec();  
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static GetProducts = async () => {
        try {
            return await Product.find().exec();  
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static GetCategoryProducts = async (id) => {
        try {
            return await Category
                .findById({_id: id})
                .populate('products')
                .exec();
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default DbAccess;