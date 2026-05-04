import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  photo: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200' },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  tripHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
