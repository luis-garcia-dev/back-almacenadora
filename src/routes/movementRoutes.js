import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { movementValidators, createMovement, listMovements } from '../controllers/movementController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listMovements);
router.post('/', movementValidators, createMovement);

export default router;
