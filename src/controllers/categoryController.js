import { body, validationResult, param } from 'express-validator';
import { Category } from '../models/categoryModel.js';
import { success, error } from '../helpers/response.js';

export const categoryValidators = {
  create: [body('name').notEmpty()],
  update: [param('id').isMongoId()]
};

export const listCategories = async (req, res) => {
  const categories = await Category.find();
  return success(res, { data: categories });
};

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const category = await Category.create(req.body);
    return success(res, { status: 201, message: 'Categoría creada', data: category });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return error(res, { status: 404, message: 'Categoría no encontrada' });
    return success(res, { message: 'Categoría actualizada', data: category });
  } catch (err) {
    return error(res, { message: err.message });
  }
};
