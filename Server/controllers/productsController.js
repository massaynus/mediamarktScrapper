import express from 'express';
import DbAccess from '../data/DbAccess.js';


/**
 *
 * @param {express.Request} _
 * @param {express.Response} res
 */

export const getAll = async (_, res) => {
    const data = await DbAccess.GetProducts();
    res.status(200).json(data).end();
}

/**
 *
 * @param {express.Request} req the request object
 * @param {express.Response} res the response object
 */
export const getOne = async (req, res) => {
    const category = await DbAccess.FindProduct(req.params.id)
    res.status(200).json(category).end();
}

