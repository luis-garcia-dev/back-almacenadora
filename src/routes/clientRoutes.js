import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { listClients, createClient, updateClient, clientValidators } from '../controllers/clientController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listClients);
router.post('/', hasRole('ADMIN'), clientValidators.create, createClient);
router.put('/:id', hasRole('ADMIN'), clientValidators.update, updateClient);

export default router;
