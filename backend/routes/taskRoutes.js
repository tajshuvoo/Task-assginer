import express from 'express';
import { 
    addTask, 
    editTask, 
    deleteTask, 
    getMyTasks, 
    getAssignedTasks, 
    getAllTasks, 
    getCompletedTasks, 
    getActiveTasks 
} from '../controllers/taskController.js';
import { protect, admin } from '../middleware/authmiddleware.js';

const router = express.Router();

// Route to add a new task
router.post('/addtask', protect, addTask);

// Route to edit an existing task
router.put('/:id', protect, editTask);

// Route to delete a task
router.delete('/:id', protect, deleteTask);

// Route to get all tasks created by the logged-in user
router.get('/mytasks', protect, getMyTasks);

// Route to get all tasks assigned to the logged-in user
router.get('/assignedtasks', protect, getAssignedTasks);

// Route to get all tasks with pagination (Admin only)
router.get('/', protect, getAllTasks);

// Route to get all completed tasks
router.get('/completed', protect, getCompletedTasks);

// Route to get all active tasks
router.get('/active', protect, getActiveTasks);

export default router;