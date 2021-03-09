import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

class DbAccess {

    static CreateCategory = async (url = '', name = '', productsCount = 0, parent_url = '', products = []) => {
        try {
            return await this.CreateCategoryFromObject({
                url, name, productsCount, parent_url, products
            });
        } catch (error) {
            console.log(error);
        }
    }

    static CreateCategoryFromObject = async (categoryData) => {
        try {
            const category = new Category(categoryData);

            await category.save();
            return category;
        } catch (error) {
            console.log(error);
        }
    }

    static CreateProduct = async (url = '', name = '', price = 0, brand = '', inStock = false, delivery = '', specifications = [{ key: '', value: '' }], images = [{ src: '', alt: '' }]) => {
        try {
            return await this.CreateProductFromObject({
                url,
                name,
                price,
                brand,
                inStock,
                delivery,
                specifications,
                images,
            });

        } catch (error) {
            console.log(error);
        }
    }

    static CreateProductFromObject = async (productData) => {
        try {
            const product = new Product(productData);

            await product.save();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    static FindCategory = async (id) => {
        try {
            return await Category.findOne({ _id: id }).exec();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static FindProduct = async (id) => {
        try {
            return await Product.find({ _id: id }).exec();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static GetCategories = async () => {
        try {
            return await Category
                .find()
                .select(['_id', 'name', 'productsCount'])
                .exec();
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
            const ids = (await Category.findOne({_id: id}).select('products').exec()).products;

            const products = await Product.find({ _id: { $in: ids } }).exec();
            return products;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static GetCategoriesCount = async () => {
        try {
            return await Category.countDocuments().exec();
        } catch (error) {
            console.log(error);
            return -1;
        }
    }

    static GetProductsCount = async () => {
        try {
            return await Product.countDocuments().exec();
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
}

export default DbAccess;