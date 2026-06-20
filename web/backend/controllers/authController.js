const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { users } = require('../data/users'); 

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored password_hash
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Logged in',
            username: username,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { login };
