import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  date: { type: Date, required: true },
  totalPaid: { type: String, required: true },
  status: { type: String, default: 'Successful' },
  bookingId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
