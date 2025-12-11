import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/userModel.js';
import { error } from '../helpers/response.js';

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return error(res, { status: 401, message: 'Token requerido' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.id).select('-password');
    if (!user || user.status === 'INACTIVE') {
      return error(res, { status: 401, message: 'Usuario no autorizado' });
    }
    req.user = user;
    next();
  } catch (err) {
    return error(res, { status: 401, message: 'Token inválido' });
  }
};
