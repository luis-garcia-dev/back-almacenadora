import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { listCategories, createCategory, updateCategory, categoryValidators } from '../controllers/categoryController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listCategories);
router.post('/', hasRole('ADMIN'), categoryValidators.create, createCategory);
router.put('/:id', hasRole('ADMIN'), categoryValidators.update, updateCategory);

export default router;
