import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskCreatedBy: {
        type: String, // Storing creator's email
        required: true,
        trim: true
    },
    taskAssignedTo: [{
        type: String, // Storing User emails
        ref: 'User'
    }],
    taskProgress: {
        type: String,
        enum: ['Unassigned', 'In progress', 'Completed', 'Testing phase'],
        default: 'Unassigned'
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
