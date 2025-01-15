const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const User = require('../models/User');
const { JWT_SECRET } = process.env;
const logger = require('../utils/logger');

// Register
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`Attempted registration with existing email: ${email}`);  // Log warning
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });

        await newUser.save();
        logger.info(`New user registered: ${email}`);  // Log successful registration
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        logger.error(`Registration error: ${err.message}`);  // Log error
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`Invalid login attempt with email: ${email}`);  // Log warning for invalid login
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Invalid password for user: ${email}`);  // Log invalid password attempt
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create a payload with user details
        const payload = { userId: user.id };

        // Create a JWT token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '73h' });  // Use jwt.sign()

        logger.info(`User logged in: ${email}`);  // Log successful login

        // Send token and user data as response
        res.json({
            token: token, 
            user: {
                firstName: user.firstName,
                email: user.email,
                picture: user.picture,
                lastName: user.lastName
            }
        });
    } catch (err) {
        logger.error(`Login error: ${err.message}`);  // Log error
        res.status(500).json({ msg: 'Server error' });
    }
};
