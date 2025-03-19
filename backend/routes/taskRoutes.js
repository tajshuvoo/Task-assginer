import express from 'express';
import { addTask, editTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Route to add a new task
router.post('/addtask', protect, addTask);

// Route to edit an existing task
router.put('/:id', protect, editTask);

export default router;