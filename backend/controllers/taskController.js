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