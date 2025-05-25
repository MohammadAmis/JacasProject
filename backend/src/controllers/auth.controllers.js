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
        
        // Force role to 'user' for all new registrations:
        const user = new User({
            username,
            email,
            password,
            role: 'user',
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id,email:email, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES,
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        // Send response

        return res.status(201).json({
            message: 'User registered successfully',
            token, // for testing purpose only
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
    const JWT_SECRET  = process.env.JWT_SECRET;
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
        const user = await User
        .findOne({ email })
        .select('+password');;
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        const payload = { id: user._id, email: user.email, role: user.role };
        const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    
        res.cookie('token', token, {
            httpOnly: true,
            secure:   process.env.NODE_ENV === 'production',
            maxAge:   24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });
    
        return res.status(200).json({
            message: 'Login successful',
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
    } catch (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

export const logoutUser = (req, res) => {
    // Clear the cookie named “token”
    res.clearCookie('token', {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path:     '/',             // ensure it matches the path you set it on
    });
    return res.status(200).json({ message: 'Logged out successfully' });
};
  

export const getCurrentUser = (req, res) => {
    // protectRoute will have set req.user = { id, email, role, ... }
    const { id, email, role } = req.user;
    return res.json({ id, email, role });
};