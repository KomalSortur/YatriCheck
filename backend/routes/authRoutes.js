import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_yatricheck';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register request received:', { name, email, passwordLength: password ? password.length : 0 });
    
    const normalizedEmail = email ? email.toLowerCase().trim() : '';
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      console.log('Registration failed: User already exists for', normalizedEmail);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email: normalizedEmail, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', normalizedEmail);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received:', { email, passwordLength: password ? password.length : 0 });
    
    const normalizedEmail = email ? email.toLowerCase().trim() : '';
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('Login failed: User not found for', normalizedEmail);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result for', normalizedEmail, ':', isMatch);
    if (!isMatch) {
      console.log('Login failed: Password mismatch for', normalizedEmail);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
