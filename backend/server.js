import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import tripRoutes from './routes/tripRoutes.js';
import userRoutes from './routes/userRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/travelApp";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB at travelApp database'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Travel App Backend is running...');
});

// Import and use routes (if any files exist in routes/)
// Example: import exampleRoutes from './routes/example.js';
// app.use('/api/example', exampleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
