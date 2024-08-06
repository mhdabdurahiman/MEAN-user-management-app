import express from 'express';
import { login, register, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//Auth api routes

router.post('/login', login);
router.post('/register', register);
router.get('/logout', authMiddleware, logout);

export {
  router as authRoutes
}
