import axios from 'axios';
import * as Constants from '../Constants/Constants';


const resolve = async (route) => {
    const res = await axios.get(`${Constants.API_URL}${route}`);
    return res.data;
}

export const Categories = {
    getAll: async () => await resolve('/categories'),
    getPrices: async () => await resolve('/categories/prices'),
    getOne: async (id) => await resolve(`/categories/${id}`),
    getOneProducts: async (id) => await resolve(`/categories/${id}/products`),
    getOnePrices: async (id) => await resolve(`/categories/${id}/prices`),

}

export const Products = {
    getAll: async () => await resolve('/products'),
    getPrices: async () => await resolve('/products/prices'),
    getOne: async (id) => await resolve(`/products/${id}`),
}
