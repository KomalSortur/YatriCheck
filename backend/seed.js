import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trip from './models/Trip.js';

dotenv.config();

const destinations = [
  {
    destination: 'Goa',
    category: 'Beach',
    rating: 4.8,
    price: 12000,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800',
  },
  {
    destination: 'Manali',
    category: 'Adventure',
    rating: 4.9,
    price: 15500,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800',
  },
  {
    destination: 'Coorg',
    category: 'Hill Stations',
    rating: 4.7,
    price: 10200,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=800',
  },
  {
    destination: 'Kerala',
    category: 'Nature',
    rating: 4.9,
    price: 18000,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
  },
  {
    destination: 'Rajasthan',
    category: 'Heritage',
    rating: 4.8,
    price: 15000,
    duration: '4D/3N',
    image: 'https://wallpapercave.com/wp/wp4555011.jpg',
  },
  {
    destination: 'Hampi',
    category: 'Heritage',
    rating: 4.6,
    price: 5000,
    duration: '2D/1N',
    image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/08/31020547/places-to-visit-in-hampi-FEATURE-compressed.jpg',
  },
  {
    destination: 'Maharashtra',
    category: 'Heritage',
    rating: 4.5,
    price: 8000,
    duration: '3D/2N',
    image: 'https://thumbs.dreamstime.com/b/kailas-temple-ellora-caves-complex-india-maharashtra-state-82378087.jpg',
  },
  {
    destination: 'Mysore',
    category: 'Heritage',
    rating: 4.7,
    price: 8500,
    duration: '2D/1N',
    image: 'https://trekentrip.com/wp-content/uploads/2025/06/mysuru-palace-1024x640.jpg',
  },
  {
    destination: 'Munnar',
    category: 'Hill Stations',
    rating: 4.9,
    price: 12000,
    duration: '3D/2N',
    image: 'https://www.gokitetours.com/wp-content/uploads/2024/03/Top-10-beautiful-hill-stations-in-Munnar.webp',
  },
  {
    destination: 'Ooty',
    category: 'Hill Stations',
    rating: 4.8,
    price: 11000,
    duration: '3D/2N',
    image: 'https://www.nomadicweekends.com/wp-content/uploads/2018/12/Picturesque-Ooty.png',
  },
  {
    destination: 'Darjeeling',
    category: 'Hill Stations',
    rating: 4.8,
    price: 14000,
    duration: '4D/3N',
    image: 'https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/2021/03/1.jpg',
  },
  {
    destination: 'Tirupati',
    category: 'Religious',
    rating: 4.9,
    price: 5000,
    duration: '2D/1N',
    image: 'https://images.unsplash.com/photo-1741003412854-bd4b264c4af3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlydXBhdGklMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    destination: 'Shirdi',
    category: 'Religious',
    rating: 4.8,
    price: 4500,
    duration: '2D/1N',
    image: 'https://t3.ftcdn.net/jpg/07/25/21/42/360_F_725214200_HvybTOfdwCQgBPKxCNQkypRahxKtnrEj.jpg',
  },
  {
    destination: 'Varanasi',
    category: 'Religious',
    rating: 4.9,
    price: 7000,
    duration: '3D/2N',
    image: 'https://media.istockphoto.com/id/537988165/photo/varanasi.jpg?s=612x612&w=0&k=20&c=fFpEL17MiQJx5NkkNIVrTsesd2E8b04SCgzjfhUmQ7g=',
  },
  {
    destination: 'Mumbai',
    category: 'City Tours',
    rating: 4.8,
    price: 9000,
    duration: '3D/2N',
    image: 'https://img.freepik.com/premium-photo/gateway-india-mumbai-india_78361-17134.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    destination: 'Bangalore',
    category: 'City Tours',
    rating: 4.7,
    price: 8000,
    duration: '3D/2N',
    image: 'https://static.toiimg.com/thumb/msid-54559212,width-748,height-499,resizemode=4,imgsize-307081/Bangalore.jpg',
  },
  {
    destination: 'Hyderabad',
    category: 'City Tours',
    rating: 4.7,
    price: 8500,
    duration: '3D/2N',
    image: 'https://t4.ftcdn.net/jpg/13/77/26/63/360_F_1377266312_jRydmbVRledy8RPzhOpRtPCNwIl46lEI.jpg',
  },
  {
    destination: 'Dandeli',
    category: 'Adventure',
    rating: 4.7,
    price: 6000,
    duration: '2D/1N',
    image: 'https://www.adotrip.com/public/city-images/5e4e5841c27c6-Dandeli_Attractions.jpg',
  },
  {
    destination: 'Rishikesh',
    category: 'Adventure',
    rating: 4.9,
    price: 8000,
    duration: '3D/2N',
    image: 'https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
  },
  {
    destination: 'Gokarna',
    category: 'Beach',
    rating: 4.7,
    price: 7000,
    duration: '3D/2N',
    image: 'https://c1.wallpaperflare.com/preview/740/392/901/sea-arabian-rocks-coast.jpg',
  },
  {
    destination: 'Andaman',
    category: 'Beach',
    rating: 4.9,
    price: 25000,
    duration: '5D/4N',
    image: 'https://t3.ftcdn.net/jpg/06/11/33/86/360_F_611338656_EQHQ3mbT6dtKqXMQljyoY7gKGbxeONXs.jpg',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelApp');
    console.log('Connected to MongoDB');
    
    await Trip.deleteMany(); // Clear existing trips
    console.log('Cleared existing trips');

    await Trip.insertMany(destinations);
    console.log('Successfully seeded trips database');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
