import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../model/userModel.js';

// Middleware to protect routes (check if the user is logged in)
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the token exists in the Authorization header and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user to the request object, excluding the password
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware to check if the user is an admin
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};