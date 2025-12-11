import { body, param, validationResult } from 'express-validator';
import { Product } from '../models/productModel.js';
import { Category } from '../models/categoryModel.js';
import { success, error } from '../helpers/response.js';
import { Movement } from '../models/movementModel.js';

export const productValidators = {
  create: [body('name').notEmpty(), body('sku').notEmpty(), body('category').isMongoId()],
  update: [param('id').isMongoId()]
};

export const listProducts = async (req, res) => {
  const { search, category } = req.query;
  const query = {};
  if (category) query.category = category;
  if (search) query.$or = [{ name: new RegExp(search, 'i') }, { sku: new RegExp(search, 'i') }];
  const products = await Product.find(query).populate('category').populate('provider');
  return success(res, { data: products });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category').populate('provider');
  if (!product) return error(res, { status: 404, message: 'Producto no encontrado' });
  return success(res, { data: product });
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return error(res, { status: 404, message: 'Categoría inválida' });
    const product = await Product.create(req.body);
    return success(res, { status: 201, message: 'Producto creado', data: product });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return error(res, { status: 404, message: 'Producto no encontrado' });
    return success(res, { message: 'Producto actualizado', data: product });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const lowStock = async (req, res) => {
  const products = await Product.find({ $expr: { $lte: ['$stock', '$minStock'] } });
  return success(res, { data: products });
};

export const mostMoved = async (req, res) => {
  const moves = await Movement.aggregate([
    { $group: { _id: '$product', count: { $sum: '$quantity' } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' }
  ]);
  return success(res, { data: moves });
};
