import { error } from '../helpers/response.js';

export const requireActiveSubscription = (req, res, next) => {
  const { subscriptionStatus, subscriptionExpiresAt } = req.user || {};
  const isActive = subscriptionStatus === 'ACTIVE' && subscriptionExpiresAt && new Date(subscriptionExpiresAt) > new Date();
  if (!isActive) {
    return error(res, { status: 402, message: 'Suscripción no activa. Renueva tu plan para continuar.' });
  }
  next();
};
