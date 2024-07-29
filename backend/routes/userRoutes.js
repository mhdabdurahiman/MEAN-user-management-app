import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

//Auth api routes

router.post('/login', login);
router.post('/register', register);

export {
  router as userRoutes
}
