import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireActiveSubscription } from '../middlewares/subscription.js';
import { invoiceValidators, createInvoice, listInvoices } from '../controllers/invoiceController.js';

const router = Router();
router.use(authenticate, requireActiveSubscription);

router.get('/', listInvoices);
router.post('/', invoiceValidators, createInvoice);

export default router;
