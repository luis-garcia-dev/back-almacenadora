import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { listUsers, createUser, updateUser, changePassword, toggleStatus, userValidators } from '../controllers/userController.js';

const router = Router();

router.use(authenticate);

router.get('/', hasRole('ADMIN'), listUsers);
router.post('/', hasRole('ADMIN'), userValidators.create, createUser);
router.put('/:id', hasRole('ADMIN'), userValidators.update, updateUser);
router.patch('/:id/status', hasRole('ADMIN'), toggleStatus);
router.post('/change-password', userValidators.password, changePassword);

export default router;
