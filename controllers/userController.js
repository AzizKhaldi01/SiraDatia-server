const User = require('../models/User');
const logger = require('../utils/logger');  // Import logger

// Edit Profile
exports.editProfile = async (req, res) => {
    const { firstName, lastName, email, picture } = req.body;

    try {
        // Update the user profile using the user ID from the token (req.user.userId)
        const user = await User.findByIdAndUpdate(req.user.userId, { firstName, lastName, email, picture }, { new: true });

        if (!user) {
            // Log a warning if no user was found with the given ID
            logger.warn(`User with ID ${req.user.userId} not found for profile update`);
            return res.status(404).json({ msg: 'User not found' });
        }

        // Log successful profile update
        logger.info(`User with ID ${req.user.userId} updated their profile`);

        res.json({
            firstname: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture
        });
    } catch (err) {
        // Log the error with detailed information
        logger.error(`Error updating profile for user ${req.user.userId}: ${err.message}`);
        res.status(500).json({ msg: 'Server error' });
    }
};
