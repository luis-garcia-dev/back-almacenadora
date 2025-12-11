import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { subscriptionValidators, listPlans, createPlan, updatePlan, subscribe } from '../controllers/subscriptionController.js';

const router = Router();

router.get('/', listPlans);
router.post('/', authenticate, hasRole('ADMIN'), subscriptionValidators.create, createPlan);
router.put('/:id', authenticate, hasRole('ADMIN'), subscriptionValidators.update, updatePlan);
router.post('/subscribe', authenticate, subscribe);

export default router;
