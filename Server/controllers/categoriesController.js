import express from 'express';
import DbAccess from '../data/DbAccess.js';
import Product from '../Models/Product.js';

/**
 *
 * @param {express.Request} _
 * @param {express.Response} res
 */

export const getAll = async (_, res) => {
    const data = await DbAccess.GetCategories();
    res.status(200).json(data).end();
}

/**
 *
 * @param {express.Request} req the request object
 * @param {express.Response} res the response object
 */
export const getOne = async (req, res) => {
    const category = await DbAccess.FindCategory(req.params.id)
    res.status(200).json(category).end();
}

/**
 *
 * @param {express.Request} _ the request object
 * @param {express.Response} res the response object
 */
export const getPrices = async (_, res) => {
    const categories = await Category.find().exec();

    const prices = [];

    for (const c of categories) {
        const cPrices = await Product.find({ _id: { $in: c.products } }).select('price').exec();
        prices.push({ _id: c._id, name: c.name, url: c.url, prices: cPrices });
    }

    res.status(200).json(prices).end();
}


/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getOneProducts = async (req, res) => {
    const products = await DbAccess.GetCategoryProducts(req.params.id);
    res.status(200).json(products).end();
}


/**
 *
 * @param {express.Request} req the request object
 * @param {express.Response} res the response object
 */
export const getOnePrices = async (req, res) => {

    const category = await DbAccess.FindCategory(req.params.id);
    const cPrices = await Product.find({ _id: { $in: category.products } }).select('price').exec();
    const data = {
        ...category.toObject(),
        prices: cPrices,
    };

    res.status(200)
        .json(data).end();
}