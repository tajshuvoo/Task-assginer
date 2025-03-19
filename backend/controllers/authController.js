import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Authenticate user & set token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id); // Set JWT in cookie

            // res.json({
            //     _id: user._id,
            //     username: user.username,
            //     email: user.email,
            //     isAdmin: user.isAdmin,
            // });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password // Password will be hashed in the pre-save hook
        });

        // Save user to database
        await user.save();

        // Generate token and set it in the response
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Fetch all user emails
// @route   GET /api/auth/emails
// @access  Private/Admin
const getAllUserEmails = async (req, res) => {
    try {
        const users = await User.find({}, 'email'); // Fetch only the email field
        const emails = users.map(user => user.email);

        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { loginUser, registerUser, logoutUser, getAllUserEmails };