import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { listProviders, createProvider, updateProvider, providerValidators } from '../controllers/providerController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listProviders);
router.post('/', hasRole('ADMIN'), providerValidators.create, createProvider);
router.put('/:id', hasRole('ADMIN'), providerValidators.update, updateProvider);

export default router;
