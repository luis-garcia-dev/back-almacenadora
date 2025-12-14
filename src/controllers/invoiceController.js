import { body, validationResult } from 'express-validator';
import { Invoice } from '../models/invoiceModel.js';
import { Product } from '../models/productModel.js';
import { success, error } from '../helpers/response.js';

export const invoiceValidators = [
  body('client').isMongoId(),
  body('products').isArray({ min: 1 })
];

export const createInvoice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    let total = 0;
    for (const item of req.body.products) {
      const product = await Product.findById(item.product);
      if (!product) return error(res, { status: 404, message: 'Producto no encontrado' });
      total += item.quantity * item.price;
    }
    const invoice = await Invoice.create({ ...req.body, total });
    return success(res, { status: 201, message: 'Documento creado', data: invoice });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const listInvoices = async (req, res) => {
  const invoices = await Invoice.find().populate('client').populate('products.product');
  return success(res, { data: invoices });
};
