const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'elite-fitness-secret-key-2026';

/**
 * @route   POST api/auth/register
 * @desc    Register a new user with biometric profile
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password, // Password hashing is handled in User model pre-save hook
      profile: {
        age: profile.age,
        gender: profile.gender,
        weight: profile.weight,
        height: profile.height,
        activityLevel: profile.activityLevel,
        goal: profile.goal || 'fit',
        fitnessLevel: profile.fitnessLevel || 'beginner'
      }
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Elite Account Created Successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration Failure', error: error.message });
  }
});

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user & get token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Authentication Successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login Failure', error: error.message });
  }
});

/**
 * @route   GET api/auth/profile
 * @desc    Get current user profile
 */
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User Not Found' });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Token Invalid' });
  }
});

/**
 * @route   PUT api/auth/profile
 * @desc    Update user biometric profile
 */
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { profile } = req.body;
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User Not Found' });

    user.profile = { ...user.profile, ...profile };
    user.updatedAt = Date.now();

    await user.save();

    res.json({
      message: 'Biometric Profile Updated',
      profile: user.profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Update Failure', error: error.message });
  }
});

module.exports = router;

