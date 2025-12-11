import { Router } from 'express';
import { login, loginValidators, register, registerValidators, profile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);
router.get('/me', authenticate, profile);

export default router;
