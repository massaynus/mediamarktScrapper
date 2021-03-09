import express from 'express';
import * as CategoriesController from '../controllers/categoriesController.js';

const routes = express.Router();

routes.get('/categories', CategoriesController.getAll);
routes.get('/categories/:id', CategoriesController.getOne);
routes.get('/categories/:id/products', CategoriesController.getOneProducts);

export default routes;