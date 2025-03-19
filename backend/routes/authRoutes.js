import express from 'express';
import { loginUser, registerUser, logoutUser ,getAllUserEmails} from '../controllers/authController.js';
import { protect,admin } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/login', loginUser); // Route for login
router.post('/signup', registerUser); // Route for signup
router.post('/logout',protect, logoutUser); // Route for logout
router.get('/users', protect, getAllUserEmails); // Route to fetch all users


export default router;