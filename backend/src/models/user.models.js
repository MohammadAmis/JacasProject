import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password in queries
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    address: String,
    phone_number: {
        type: String,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    image: {
        type: String,
        default: 'https://example.com/default-profile.png',
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active',
    },
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Add comparePassword method
userSchema.methods.comparePassword = async function (enteredPassword) {
    if(!enteredPassword || !this.password) {
       return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
