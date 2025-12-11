import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { productValidators, listProducts, createProduct, updateProduct, getProduct, lowStock, mostMoved } from '../controllers/productController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listProducts);
router.get('/low-stock', lowStock);
router.get('/most-moved', mostMoved);
router.get('/:id', getProduct);
router.post('/', hasRole('ADMIN'), productValidators.create, createProduct);
router.put('/:id', hasRole('ADMIN'), productValidators.update, updateProduct);

export default router;
