import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import providerRoutes from './providerRoutes.js';
import clientRoutes from './clientRoutes.js';
import movementRoutes from './movementRoutes.js';
import invoiceRoutes from './invoiceRoutes.js';
import reportRoutes from './reportRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/providers', providerRoutes);
router.use('/clients', clientRoutes);
router.use('/movements', movementRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/reports', reportRoutes);

export default router;
