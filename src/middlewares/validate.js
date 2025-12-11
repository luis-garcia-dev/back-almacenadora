import { validationResult } from 'express-validator';
import { error } from '../helpers/response.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  }
  next();
};
