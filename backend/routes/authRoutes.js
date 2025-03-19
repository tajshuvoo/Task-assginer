import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js'; // Import logoutUser

const router = express.Router();

router.post('/login', loginUser); // Route for login
router.post('/signup', registerUser); // Route for signup
router.post('/logout', logoutUser); // Route for logout

export default router;