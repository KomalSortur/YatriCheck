import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Package from './models/Package.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yatricheck';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB and seed data
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed test packages if empty
    const count = await Package.countDocuments();
    if (count === 0) {
      console.log('Seeding initial packages...');
      const samplePackages = [
        {
          title: 'Luxury Maldives Escape',
          rating: 4.9,
          reviews: 124,
          duration: '7 Days / 6 Nights',
          groupSize: 'Max 12 people',
          price: '$1,299',
          img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
          description: 'Experience the ultimate tropical paradise in the Maldives. This luxury package includes private water villa accommodation, all-inclusive dining, and curated island excursions.',
          itinerary: [
            { day: 1, title: 'Arrival & Welcome Dinner' },
            { day: 2, title: 'Private Island Snorkeling' },
            { day: 3, title: 'Sunset Cruise & Dolphin Watching' },
            { day: 4, title: 'Spa & Wellness Retreat' },
            { day: 5, title: 'Local Island Tour' },
            { day: 6, title: 'Beachfront Gala Dinner' },
            { day: 7, title: 'Departure' }
          ]
        },
        {
          title: 'Santorini, Greece',
          rating: 4.8,
          reviews: 89,
          duration: '5 Days / 4 Nights',
          groupSize: 'Max 10 people',
          price: '$1,500',
          img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
          description: 'Discover the magic of Santorini with stunning sunsets, white-washed buildings, and crystal-clear waters.',
          itinerary: [
            { day: 1, title: 'Arrival & Oia Sunset' },
            { day: 2, title: 'Volcano Cruise' },
            { day: 3, title: 'Wine Tasting Tour' },
            { day: 4, title: 'Beach Day at Perissa' },
            { day: 5, title: 'Departure' }
          ]
        },
        {
          title: 'Kyoto, Japan',
          rating: 4.7,
          reviews: 210,
          duration: '6 Days / 5 Nights',
          groupSize: 'Max 15 people',
          price: '$1,200',
          img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
          description: 'Immerse yourself in Japan\'s cultural capital, featuring ancient temples, serene gardens, and traditional tea ceremonies.',
          itinerary: [
            { day: 1, title: 'Arrival in Kyoto' },
            { day: 2, title: 'Kinkaku-ji & Arashiyama' },
            { day: 3, title: 'Fushimi Inari Shrine' },
            { day: 4, title: 'Tea Ceremony & Geisha District' },
            { day: 5, title: 'Nara Day Trip' },
            { day: 6, title: 'Departure' }
          ]
        }
      ];
      await Package.insertMany(samplePackages);
      console.log('Seeded packages successfully!');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
