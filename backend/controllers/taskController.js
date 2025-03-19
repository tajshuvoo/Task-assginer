import Task from '../model/taskModel.js';

// @desc    Add a new task
// @route   POST /api/tasks
// @access  Private
const addTask = async (req, res) => {
    const { taskName, taskDescription, taskAssignedTo, taskProgress } = req.body;

    // Validate input
    if (!taskName || !taskDescription || !taskAssignedTo) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Create a new task
        const task = new Task({
            taskName,
            taskDescription,
            taskCreatedBy: req.user.email, // Use the logged-in user's email
            taskAssignedTo,
            taskProgress: taskProgress || 'Unassigned',
        });

        // Save the task to the database
        const createdTask = await task.save();

        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { addTask };

// @desc    Edit an existing task
// @route   PUT /api/tasks/:id
// @access  Private
const editTask = async (req, res) => {
    const { taskName, taskDescription, taskAssignedTo, taskProgress } = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task fields
        task.taskName = taskName || task.taskName;
        task.taskDescription = taskDescription || task.taskDescription;
        task.taskAssignedTo = taskAssignedTo || task.taskAssignedTo;
        task.taskProgress = taskProgress || task.taskProgress;

        // Save the updated task
        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { editTask };

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        // Find the task by ID
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Delete the task
        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { deleteTask };

// @desc    Get all tasks created by the logged-in user
// @route   GET /api/tasks/mytasks
// @access  Private
const getMyTasks = async (req, res) => {
    try {
        // Find tasks where the logged-in user is the creator
        const tasks = await Task.find({ taskCreatedBy: req.user.email });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { getMyTasks };

// @desc    Get all tasks assigned to the logged-in user
// @route   GET /api/tasks/assignedtasks
// @access  Private
const getAssignedTasks = async (req, res) => {
    try {
        // Find tasks where the logged-in user is assigned
        const tasks = await Task.find({ taskAssignedTo: req.user.email });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { getAssignedTasks };

// @desc    Get all tasks with pagination (Admin only)
// @route   GET /api/tasks
// @access  Private/Admin
const getAllTasks = async (req, res) => {
    try {
        // Get the page and limit from query parameters, with defaults
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch tasks with pagination
        const tasks = await Task.find().skip(skip).limit(limit);

        // Get the total count of tasks
        const totalTasks = await Task.countDocuments();

        res.status(200).json({
            tasks,
            page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { getAllTasks };

// @desc    Get all tasks with 'Completed' progress
// @route   GET /api/tasks/completed
// @access  Private
const getCompletedTasks = async (req, res) => {
    try {
        // Find tasks with taskProgress set to 'Completed'
        const tasks = await Task.find({ taskProgress: 'Completed' });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No completed tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all tasks with active progress (not 'Completed')
// @route   GET /api/tasks/active
// @access  Private
const getActiveTasks = async (req, res) => {
    try {
        // Find tasks where taskProgress is not 'Completed'
        const tasks = await Task.find({ taskProgress: { $ne: 'Completed' } });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No active tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { getCompletedTasks, getActiveTasks };