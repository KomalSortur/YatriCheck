import express from 'express';
import Trip from '../models/Trip.js';

const router = express.Router();

// GET /api/trips/all - Fetch all trips
router.get('/all', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
});

// GET /api/trips/search - Search trips by destination
router.get('/search', async (req, res) => {
  try {
    const { to, from, category, budgetMin, budgetMax, hotelType, duration, transport, date } = req.query;
    
    console.log(`Received search query - Filters:`, req.query);

    let queryConditions = [];
    
    // Case-insensitive regex matching for destinations
    if (to && to.trim() !== '') {
      queryConditions.push({ destination: { $regex: to, $options: "i" } });
    }
    
    // Note: We deliberately IGNORE the 'from' parameter in the DB query
    // because the 'trips' collection only stores the 'destination', not the starting location.
    
    // Exact match for category and other filters
    if (category && category !== 'All') queryConditions.push({ category });
    if (hotelType && hotelType !== 'All') queryConditions.push({ hotelType });
    if (duration && duration !== 'All') queryConditions.push({ duration });
    if (transport && transport !== 'All') queryConditions.push({ transport });

    if (budgetMin || budgetMax) {
      let priceQuery = {};
      if (budgetMin) priceQuery.$gte = Number(budgetMin);
      if (budgetMax) priceQuery.$lte = Number(budgetMax);
      queryConditions.push({ price: priceQuery });
    }

    // Combine filters using $and if there are any
    const finalQuery = queryConditions.length > 0 ? { $and: queryConditions } : {};

    // Execute query
    let tripsQuery = Trip.find(finalQuery);

    // If no filters provided, sort by rating
    if (queryConditions.length === 0) {
      tripsQuery = tripsQuery.sort({ rating: -1 });
    }

    const trips = await tripsQuery;

    return res.json(trips || []);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Error searching trips', error: error.message });
  }
});

export default router;
