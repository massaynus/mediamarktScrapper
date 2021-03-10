import axios from 'axios';
import Constants from '../Constants/Constants';


export const Categories = {
    getAll: async () => axios.get(`${Constants.API_URL}/categories`),
    getPrices: async () => axios.get(`${Constants.API_URL}/categories/prices`),
    getOne: async () => axios.get(`${Constants.API_URL}/categories/:id`),
    getOneProducts: async () => axios.get(`${Constants.API_URL}/categories/:id/products`),
    getOnePrices: async () => axios.get(`${Constants.API_URL}/categories/:id/prices`),

}

export const Products = {
    getAll: async () => axios.get(`${Constants.API_URL}/products`),
    getPrices: async () => axios.get(`${Constants.API_URL}/products/prices`),
    getOne: async () => axios.get(`${Constants.API_URL}/products/:id`),
}
