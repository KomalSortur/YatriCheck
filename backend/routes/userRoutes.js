import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('cart')
      .populate('recentlyViewed')
      .populate({
        path: 'tripHistory',
        populate: { path: 'package' }
      })
      .select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, photo } = req.body;
    const user = await User.findById(req.userId);
    
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (photo) user.photo = photo;
    
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cart/:packageId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { packageId } = req.params;
    
    // Toggle cart
    const index = user.cart.indexOf(packageId);
    if (index === -1) {
      user.cart.push(packageId);
    } else {
      user.cart.splice(index, 1);
    }
    
    await user.save();
    
    // Return updated populated cart
    const updatedUser = await User.findById(req.userId).populate('cart');
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/recently-viewed/:packageId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { packageId } = req.params;
    
    // Remove if already exists so we can push to front
    user.recentlyViewed = user.recentlyViewed.filter(id => id.toString() !== packageId);
    
    // Add to front of array
    user.recentlyViewed.unshift(packageId);
    
    // Keep only last 10
    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 10);
    }
    
    await user.save();
    res.json({ message: 'Added to recently viewed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
