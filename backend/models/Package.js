import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
