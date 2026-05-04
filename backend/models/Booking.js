import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  date: { type: Date, required: true },
  totalPaid: { type: String, required: true },
  status: { type: String, default: 'Successful' },
  bookingId: { type: String, required: true },
  guests: { type: Number, default: 1 },
  flightDetails: {
    airline: { type: String },
    pnr: { type: String },
    departure: { type: String },
    arrival: { type: String }
  },
  hotelDetails: {
    name: { type: String },
    roomType: { type: String, default: 'Deluxe Suite' }
  },
  paymentMethod: { type: String, default: 'Card' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
