import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { protect,admin } from '../middleware/authmiddleware.js';
const router = express.Router();

router.post('/login', loginUser); // Route for login
router.post('/signup', registerUser); // Route for signup
router.post('/logout',protect, logoutUser); // Route for logout

//bug solved

export default router;