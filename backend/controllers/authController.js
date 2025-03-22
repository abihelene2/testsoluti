const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Test
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)
if (!JWT_SECRET) {
    console.error('Missing JWT secret');
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ensure JWT_SECRET is set
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "Server error: Missing JWT secret" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { loginUser };
