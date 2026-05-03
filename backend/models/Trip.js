import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true }
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
