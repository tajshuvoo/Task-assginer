import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';

// Import Models
import User from './model/userModel.js';
import Task from './model/taskModel.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Seed function
const seedData = async () => {
    try {
        console.log('Seeding Data...');

        // Clear existing data (optional)
        await User.deleteMany();
        await Task.deleteMany();
        console.log('Old Data Removed.');

        // Hardcoded email
        const sampleEmail = "sampleuser@example.com";

        // Create a sample user
        const user = new User({
            email: sampleEmail,
            password: "securepassword", // Plain password
            username: "SampleUser",
            isAdmin: true
        });

        // Save user to trigger schema pre-save hook for password hashing
        await user.save();

        console.log(`User Created: ${sampleEmail}`);

        // Create a sample task
        await Task.create({
            taskName: "Hardcoded Email Task",
            taskDescription: "This task is assigned using a hardcoded email.",
            taskCreatedBy: sampleEmail, // Reference user by email
            taskAssignedTo: [sampleEmail], // Assign task to user by email
            taskProgress: "In progress"
        });

        console.log(`Task Created and Assigned to: ${sampleEmail}`);

        console.log('Seeding Complete!');
        process.exit(); // Exit the process after seeding
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run the seed function
seedData();
