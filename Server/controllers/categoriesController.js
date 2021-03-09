import express from 'express';
import DbAccess from '../data/DbAccess.js';

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
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const getOne = async (req, res) => {
    const category = await DbAccess.FindCategory(req.params.id)
    res.status(200).json(category).end();
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