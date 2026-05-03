import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Booking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const bookings = await api.getMyBookings();
        if (bookings.length > 0) {
          setBooking(bookings[0]); // The most recent one
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBooking();
  }, []);

  if (loading) return <div className="pt-32 px-6 text-center">Loading confirmation...</div>;
  if (!booking) return <div className="pt-32 px-6 text-center">No bookings found.</div>;

  return (
    <div className="pt-32 px-6 flex items-center justify-center min-h-[80vh]">
      <div className="glass-card max-w-2xl w-full p-12 text-center relative overflow-hidden">
        {/* Success Animation Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="text-primary w-12 h-12" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 outfit">Booking Confirmed!</h1>
        <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
          Pack your bags! Your trip to <span className="text-white font-bold">{booking.package?.title || 'The Maldives'}</span> has been successfully booked. Check your email for the confirmation details.
        </p>

        <div className="glass p-6 mb-10 grid grid-cols-2 gap-8 text-left">
          <div>
            <span className="text-xs text-text-muted uppercase font-bold block mb-1">Booking ID</span>
            <span className="font-mono font-bold">{booking.bookingId}</span>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase font-bold block mb-1">Date</span>
            <span className="font-bold">{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase font-bold block mb-1">Total Paid</span>
            <span className="font-bold text-primary">{booking.totalPaid}</span>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase font-bold block mb-1">Payment Status</span>
            <span className="text-green-400 font-bold">{booking.status}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/profile')}
            className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            Go to My Trips
            <ArrowRight size={18} />
          </button>
          <button className="px-6 py-4 glass hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 transition-all">
            <Download size={18} />
            Ticket
          </button>
        </div>

        <button className="mt-8 text-sm text-text-muted hover:text-white flex items-center gap-2 mx-auto transition-colors">
          <Share2 size={16} />
          Share trip details
        </button>
      </div>
    </div>
  );
};

export default Booking;
