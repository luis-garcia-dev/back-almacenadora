import { body, validationResult, param } from 'express-validator';
import { SubscriptionPlan } from '../models/subscriptionPlanModel.js';
import { User } from '../models/userModel.js';
import { success, error } from '../helpers/response.js';

export const subscriptionValidators = {
  create: [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('durationInDays').isInt({ min: 1 })
  ],
  update: [param('id').isMongoId()]
};

export const listPlans = async (req, res) => {
  const plans = await SubscriptionPlan.find();
  return success(res, { data: plans });
};

export const createPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const plan = await SubscriptionPlan.create(req.body);
    return success(res, { status: 201, message: 'Plan creado', data: plan });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const updatePlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return error(res, { status: 400, message: 'Datos inválidos', errors: errors.array() });
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return error(res, { status: 404, message: 'Plan no encontrado' });
    return success(res, { message: 'Plan actualizado', data: plan });
  } catch (err) {
    return error(res, { message: err.message });
  }
};

export const subscribe = async (req, res) => {
  const { planId } = req.body;
  try {
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || plan.status !== 'ACTIVE') return error(res, { status: 404, message: 'Plan no disponible' });
    const user = await User.findById(req.user._id);
    const expires = new Date();
    expires.setDate(expires.getDate() + plan.durationInDays);
    user.subscriptionPlan = plan._id;
    user.subscriptionStatus = 'ACTIVE';
    user.subscriptionExpiresAt = expires;
    await user.save();
    return success(res, { message: 'Suscripción activada', data: { plan, expiresAt: expires } });
  } catch (err) {
    return error(res, { message: err.message });
  }
};
