import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL })); // Enables Cross-Origin Resource Sharing
app.use(cookieParser()); // Allows parsing of cookies

// Simple API route
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Register API routes
app.use('/api/auth', authRoutes);

// Define PORT and start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
