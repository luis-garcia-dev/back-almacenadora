import { body, validationResult } from 'express-validator';
import { Movement } from '../models/movementModel.js';
import { Product } from '../models/productModel.js';
import { success, error } from '../helpers/response.js';

export const movementValidators = [
  body('product').isMongoId(),
  body('type').isIn(['ENTRY', 'EXIT']),
  body('quantity').isInt({ min: 1 })
];

export const createMovement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  const { product: productId, type, quantity, description } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return error(res, { status: 404, message: 'Producto no encontrado' });

    if (type === 'EXIT' && product.stock - quantity < 0) {
      return error(res, { status: 400, message: 'Stock insuficiente' });
    }
    product.stock = type === 'ENTRY' ? product.stock + quantity : product.stock - quantity;
    await product.save();
    const movement = await Movement.create({ product: productId, type, quantity, description, user: req.user._id });
    return success(res, { status: 201, message: 'Movimiento registrado', data: movement });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const listMovements = async (req, res) => {
  const { product, type, startDate, endDate } = req.query;
  const query = {};
  if (product) query.product = product;
  if (type) query.type = type;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }
  const movements = await Movement.find(query).populate('product').populate('user');
  return success(res, { data: movements });
};
