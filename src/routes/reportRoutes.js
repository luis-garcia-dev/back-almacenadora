import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { dashboardStats } from '../controllers/reportController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/dashboard', dashboardStats);

export default router;
