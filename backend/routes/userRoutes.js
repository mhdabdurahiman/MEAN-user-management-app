import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//User api routes
router.get('/profile', authMiddleware, getUserProfile);

export {
  router as userRoutes
}