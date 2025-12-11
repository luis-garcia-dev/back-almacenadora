import { body, validationResult, param } from 'express-validator';
import { Client } from '../models/clientModel.js';
import { success, error } from '../helpers/response.js';

export const clientValidators = {
  create: [body('name').notEmpty()],
  update: [param('id').isMongoId()]
};

export const listClients = async (req, res) => {
  const clients = await Client.find();
  return success(res, { data: clients });
};

export const createClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const client = await Client.create(req.body);
    return success(res, { status: 201, message: 'Cliente creado', data: client });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updateClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return error(res, { status: 404, message: 'Cliente no encontrado' });
    return success(res, { message: 'Cliente actualizado', data: client });
  } catch (err) {
    return error(res, { message: err.message });
  }
};
