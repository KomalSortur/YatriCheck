import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('wishlist')
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

router.post('/wishlist/:packageId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { packageId } = req.params;
    
    // Toggle wishlist
    const index = user.wishlist.indexOf(packageId);
    if (index === -1) {
      user.wishlist.push(packageId);
    } else {
      user.wishlist.splice(index, 1);
    }
    
    await user.save();
    
    // Return updated populated wishlist
    const updatedUser = await User.findById(req.userId).populate('wishlist');
    res.json(updatedUser.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
