import { body, validationResult, param } from 'express-validator';
import { User } from '../models/userModel.js';
import { success, error } from '../helpers/response.js';

export const userValidators = {
  create: [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['ADMIN', 'USER'])
  ],
  update: [
    param('id').isMongoId(),
    body('name').optional().notEmpty(),
    body('role').optional().isIn(['ADMIN', 'USER']),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE'])
  ],
  password: [body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 6 })]
};

export const listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  return success(res, { data: users });
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  const data = req.body;
  try {
    const exists = await User.findOne({ email: data.email });
    if (exists) return error(res, { status: 400, message: 'Email ya registrado' });

    const user = await User.create(data);
    return success(res, { status: 201, message: 'Usuario creado', data: { ...user.toObject(), password: undefined } });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    if (!user) return error(res, { status: 404, message: 'Usuario no encontrado' });
    return success(res, { message: 'Usuario actualizado', data: user });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const valid = await user.comparePassword(currentPassword);
    if (!valid) return error(res, { status: 400, message: 'La contraseña actual no es correcta' });
    user.password = newPassword;
    await user.save();
    return success(res, { message: 'Contraseña actualizada' });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const toggleStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return error(res, { status: 404, message: 'Usuario no encontrado' });
    user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await user.save();
    return success(res, { message: 'Estado actualizado', data: user });
  } catch (err) {
    return error(res, { message: err.message });
  }
};
