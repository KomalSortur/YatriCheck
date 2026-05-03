import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tripId: { type: String, required: true }
}, { timestamps: true });

// Ensure unique combination of userId and tripId
wishlistSchema.index({ userId: 1, tripId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
