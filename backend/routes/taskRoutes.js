import express from 'express';
import { addTask, editTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Route to add a new task
router.post('/addtask', protect, addTask);

// Route to edit an existing task
router.put('/:id', protect, editTask);

// Route to delete a task
router.delete('/:id', protect, deleteTask);

export default router;