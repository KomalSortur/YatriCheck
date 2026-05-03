import express from 'express';
import Wishlist from '../models/Wishlist.js';

const router = express.Router();

// POST /api/wishlist/add - Add a trip to user's wishlist
router.post('/add', async (req, res) => {
  try {
    const { userId, tripId } = req.body;

    if (!userId || !tripId) {
      return res.status(400).json({ message: 'userId and tripId are required' });
    }

    // Check if already in wishlist (handled by unique index too, but good to be explicit)
    const existing = await Wishlist.findOne({ userId, tripId });
    if (existing) {
      return res.status(400).json({ message: 'Trip already in wishlist' });
    }

    const newItem = new Wishlist({ userId, tripId });
    await newItem.save();

    res.status(201).json({ message: 'Trip added to wishlist', item: newItem });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Trip already in wishlist' });
    }
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
});

// GET /api/wishlist/:userId - Get all wishlist items for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await Wishlist.find({ userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
});

export default router;
