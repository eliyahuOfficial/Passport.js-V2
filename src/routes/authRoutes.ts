import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
router.post('/register', AuthController.createUser);
router.post('/login/:platform', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/dashboard', AuthController.dashboard);

export default router;
