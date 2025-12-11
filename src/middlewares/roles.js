import { error } from '../helpers/response.js';

export const hasRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return error(res, { status: 403, message: 'No tienes permisos para esta acción' });
  }
  next();
};
