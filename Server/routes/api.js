import express from 'express';
import * as CategoriesController from '../controllers/categoriesController.js';
import * as ProductsController from '../controllers/productsController.js';

const routes = express.Router();

routes.get('/categories', CategoriesController.getAll);
routes.get('/categories/prices', CategoriesController.getPrices);
routes.get('/categories/:id', CategoriesController.getOne);
routes.get('/categories/:id/products', CategoriesController.getOneProducts);
routes.get('/categories/:id/prices', CategoriesController.getOnePrices);

routes.get('/products', ProductsController.getAll);
routes.get('/products/prices', ProductsController.getPrices);
routes.get('/products/:id', ProductsController.getOne);


export default routes;