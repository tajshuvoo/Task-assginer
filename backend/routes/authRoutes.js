import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js'; // Import registerUser

const router = express.Router();

router.post('/login', loginUser); // Route for login
router.post('/signup', registerUser); // Route for signup

export default router;