const jwt = require('jsonwebtoken');  // Use jsonwebtoken
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Remove 'Bearer ' prefix if present in the token
    const bearerToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    try {
        // Decode and verify the token
        const decoded = jwt.verify(bearerToken, JWT_SECRET);
        req.user = decoded;
        console.log("---------decoded---------------")
        console.log(decoded)
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
