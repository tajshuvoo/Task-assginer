import express from 'express';
import { addTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Route to add a new task
router.post('/addtask', protect, addTask);

export default router;