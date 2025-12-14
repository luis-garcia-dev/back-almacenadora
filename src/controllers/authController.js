import jwt from 'jsonwebtoken';
import { validationResult, body } from 'express-validator';
import { User } from '../models/userModel.js';
import { success, error } from '../helpers/response.js';
import { env } from '../config/env.js';

export const registerValidators = [
  body('name').notEmpty().withMessage('Nombre requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password muy corto')
];

export const loginValidators = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Password requerido')
];

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });

  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return error(res, { status: 400, message: 'Ya existe un usuario con ese correo' });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
    return success(res, { status: 201, message: 'Usuario registrado', data: { token, user: sanitize(user) } });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return error(res, { status: 401, message: 'Credenciales inválidas' });

    const valid = await user.comparePassword(password);
    if (!valid) return error(res, { status: 401, message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
    return success(res, { message: 'Login exitoso', data: { token, user: sanitize(user) } });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const profile = async (req, res) => {
  return success(res, { data: sanitize(req.user) });
};

const sanitize = (user) => {
  const { password, __v, ...data } = user.toObject();
  return data;
};
