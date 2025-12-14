import { body, validationResult, param } from 'express-validator';
import { Provider } from '../models/providerModel.js';
import { success, error } from '../helpers/response.js';

export const providerValidators = {
  create: [body('name').notEmpty()],
  update: [param('id').isMongoId()]
};

export const listProviders = async (req, res) => {
  const providers = await Provider.find();
  return success(res, { data: providers });
};

export const createProvider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const provider = await Provider.create(req.body);
    return success(res, { status: 201, message: 'Proveedor creado', data: provider });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updateProvider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!provider) return error(res, { status: 404, message: 'Proveedor no encontrado' });
    return success(res, { message: 'Proveedor actualizado', data: provider });
  } catch (err) {
    return error(res, { message: err.message });
  }
};
