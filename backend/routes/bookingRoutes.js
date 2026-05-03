import express from 'express';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { packageId, date, totalPaid } = req.body;
    
    // Generate a random booking ID like YTC-123456
    const bookingId = 'YTC-' + Math.floor(100000 + Math.random() * 900000);

    const booking = new Booking({
      user: req.userId,
      package: packageId,
      date,
      totalPaid,
      bookingId
    });

    await booking.save();

    // Add to user's trip history
    await User.findByIdAndUpdate(req.userId, {
      $push: { tripHistory: booking._id }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('package')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
