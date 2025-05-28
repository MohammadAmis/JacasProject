import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const registerUser = async (req, res) => {
    const JWT_SECRET  = process.env.JWT_SECRET;
    const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '1d';
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const user = new User({
            username,
            email,
            password,
            role: 'user',
        });

        await user.save();

        const token = jwt.sign({ id: user._id, email, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES,
        });

        return res.status(201).json({
            message: 'User registered successfully',
            token, // for client-side storage (e.g., localStorage)
            user: {
              id:        user._id,
              username:  user.username,
              email:     user.email,
              role:      user.role,
              image:     user.image,
              status:    user.status,
              createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginUser = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '1d';

    if (!JWT_SECRET) {
        console.error('Missing JWT_SECRET');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { id: user._id, email: user.email, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
              id:       user._id,
              username: user.username,
              email:    user.email,
              role:     user.role,
            }
        });
    } catch (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logoutUser = (req, res) => {
    // No cookie to clear — just send a logout confirmation
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await User.findById(req.user.id)
            .select('id username email role status image createdAt')
            .lean();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.error('Error in getCurrentUser:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
