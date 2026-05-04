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
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yatricheck';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB and seed data
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Force drop and re-seed to ensure schema changes take effect in dev
    await Package.deleteMany({});
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
        food: 'All-inclusive buffet breakfast, a la carte lunch, and romantic dinner at our underwater restaurant. Unlimited premium beverages.',
        transport: 'Round-trip seaplane transfer from Malé International Airport directly to the resort island.',
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
        food: 'Daily Mediterranean breakfast, two traditional Greek taverna dinners, and one exclusive wine-tasting lunch overlooking the caldera.',
        transport: 'Airport pickup via luxury SUV, ferry tickets for volcano cruise, and daily private chauffeur service.',
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
        food: 'Authentic Kaiseki (traditional multi-course) dinner, daily Japanese or Western breakfast, and guided street food tour in Gion.',
        transport: 'Bullet train (Shinkansen) passes from Tokyo, local IC cards for unlimited bus/subway rides, and guided private coach.',
        itinerary: [
          { day: 1, title: 'Arrival in Kyoto' },
          { day: 2, title: 'Kinkaku-ji & Arashiyama' },
          { day: 3, title: 'Fushimi Inari Shrine' },
          { day: 4, title: 'Tea Ceremony & Geisha District' },
          { day: 5, title: 'Nara Day Trip' },
          { day: 6, title: 'Departure' }
        ]
      },
      {
        title: 'Goa Beach Paradise',
        rating: 4.6,
        reviews: 320,
        duration: '4 Days / 3 Nights',
        groupSize: 'Max 20 people',
        price: '₹12,000',
        img: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=1200',
        description: 'Enjoy the vibrant nightlife, pristine beaches, and Portuguese heritage of North Goa.',
        food: 'Daily breakfast buffet and one authentic Goan seafood dinner.',
        transport: 'Airport transfers and full-day AC coach sightseeing.',
        itinerary: [
          { day: 1, title: 'Arrival & Beach Relaxation' },
          { day: 2, title: 'North Goa Sightseeing' },
          { day: 3, title: 'Water Sports & Nightlife' },
          { day: 4, title: 'Departure' }
        ]
      },
      {
        title: 'Snowy Manali Escape',
        rating: 4.8,
        reviews: 150,
        duration: '5 Days / 4 Nights',
        groupSize: 'Max 12 people',
        price: '₹15,500',
        img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200',
        description: 'Experience the majestic Himalayas with snow activities and cozy valley stays.',
        food: 'Breakfast and dinner included at the hotel. Warm beverages during transit.',
        transport: 'Volvo AC Bus from Delhi to Manali and local taxi for Solang Valley.',
        itinerary: [
          { day: 1, title: 'Arrival & Local Sightseeing' },
          { day: 2, title: 'Solang Valley Adventure' },
          { day: 3, title: 'Rohtang Pass Tour' },
          { day: 4, title: 'Kullu Shawl Factory & Rafting' },
          { day: 5, title: 'Departure' }
        ]
      }
    ];
    await Package.insertMany(samplePackages);
    console.log('Seeded packages successfully!');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
