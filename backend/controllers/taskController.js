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