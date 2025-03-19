import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser); // Route for login
router.post('/signup', registerUser); // Route for signup
router.post('/logout', logoutUser); // Route for logout
//bug solved

export default router;