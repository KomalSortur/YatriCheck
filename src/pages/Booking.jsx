import { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, Download, Share2, 
  Plane, Hotel, MapPin, Calendar, Users, 
  Receipt, LifeBuoy, Info, Mail, Phone,
  Cloud, Map, Sparkles
} from 'lucide-react';
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

  if (loading) return (
    <div className="pt-32 px-6 flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (!booking) return (
    <div className="pt-32 px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">No booking found.</h2>
      <button onClick={() => navigate('/explore')} className="btn-primary px-8 py-3">Explore Packages</button>
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* Top Banner / Hero */}
      <div className="glass-card p-10 text-center relative overflow-hidden mb-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold mb-2 outfit">Booking Confirmed 🎉</h1>
        <p className="text-text-muted mb-6">Congratulations! Your trip is locked in. We've sent the details to your email.</p>
        
        <div className="inline-block glass px-6 py-2 rounded-full border-primary/30">
          <span className="text-xs text-text-muted uppercase font-bold mr-2">Booking ID:</span>
          <span className="font-mono font-bold text-primary">{booking.bookingId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (Left 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trip Summary Card */}
          <section className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Trip Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-xs text-text-muted uppercase font-bold">Destination</span>
                <p className="font-bold">{booking.package?.title}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-text-muted uppercase font-bold">Start Date</span>
                <p className="font-bold">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-text-muted uppercase font-bold">Duration</span>
                <p className="font-bold">{booking.package?.duration}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-text-muted uppercase font-bold">Travelers</span>
                <p className="font-bold">{booking.guests || 1} Adult(s)</p>
              </div>
            </div>
          </section>

          {/* Booking Details (Flight/Hotel) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-3xl border-secondary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Plane className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Flight Details</h3>
                  <p className="text-xs text-text-muted">Round trip included</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Airline</span>
                  <span className="text-sm font-bold">{booking.flightDetails?.airline || 'IndiGo'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Departure</span>
                  <span className="text-sm font-bold">{booking.flightDetails?.departure || '10:30 AM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">PNR</span>
                  <span className="text-sm font-mono font-bold text-secondary uppercase">{booking.flightDetails?.pnr || 'PNR12345'}</span>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Hotel className="text-accent w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Hotel Details</h3>
                  <p className="text-xs text-text-muted">5-Star Accommodation</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Hotel</span>
                  <span className="text-sm font-bold">{booking.hotelDetails?.name || 'Luxury Resort'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Room Type</span>
                  <span className="text-sm font-bold">{booking.hotelDetails?.roomType || 'Deluxe Suite'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Check-in</span>
                  <span className="text-sm font-bold">2:00 PM</span>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info size={20} className="text-primary" />
              Next Steps & Instructions
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 glass rounded-2xl bg-white/5 border-none">
                <div className="w-8 h-8 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <p className="text-sm">Carry a valid <span className="text-white font-bold">ID Proof</span> (Aadhar/Passport) for all travelers.</p>
              </div>
              <div className="flex gap-4 p-4 glass rounded-2xl bg-white/5 border-none">
                <div className="w-8 h-8 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <p className="text-sm">Arrive at the airport at least <span className="text-white font-bold">2 hours early</span> for your flight.</p>
              </div>
              <div className="flex gap-4 p-4 glass rounded-2xl bg-white/5 border-none">
                <div className="w-8 h-8 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <p className="text-sm">Our representative will meet you at the destination airport arrivals gate.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar (Right 1 column) */}
        <div className="space-y-8">
          
          {/* Payment Summary */}
          <section className="glass p-6 rounded-3xl">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Receipt size={18} className="text-primary" />
              Payment Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Package Total</span>
                <span className="font-bold">{booking.totalPaid}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Taxes & Fees</span>
                <span className="font-bold">Included</span>
              </div>
              <div className="border-t border-glass-border pt-4 flex justify-between items-center">
                <span className="font-bold">Total Paid</span>
                <span className="text-2xl font-extrabold text-primary">{booking.totalPaid}</span>
              </div>
              <div className="text-xs text-center text-text-muted bg-white/5 py-2 rounded-lg">
                Paid via {booking.paymentMethod || 'Credit Card'}
              </div>
            </div>
            <button className="w-full py-3 glass hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-bold">
              <Download size={16} />
              Download Invoice
            </button>
          </section>

          {/* Support Section */}
          <section className="glass p-6 rounded-3xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <LifeBuoy size={18} className="text-primary" />
              Need Help?
            </h2>
            <p className="text-xs text-text-muted mb-6">Our 24/7 support team is here to assist you with any modifications or questions.</p>
            <div className="space-y-3">
              <a href="tel:+1800YATRI" className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-colors text-sm">
                <Phone size={16} className="text-secondary" />
                +1-800-YATRI-CK
              </a>
              <a href="mailto:support@yatricheck.com" className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-colors text-sm">
                <Mail size={16} className="text-accent" />
                support@yatricheck.com
              </a>
            </div>
          </section>

          {/* Quick Info (Nice-to-have) */}
          <section className="glass p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center gap-2 mb-4 text-primary font-bold">
              <Sparkles size={18} />
              <span className="text-sm uppercase tracking-wider">Travel Tip</span>
            </div>
            <div className="flex gap-4 items-center mb-4">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center">
                <Cloud size={24} className="text-white/80" />
              </div>
              <div>
                <p className="text-sm font-bold">28°C Sunny</p>
                <p className="text-xs text-text-muted">Expected weather at {booking.package?.title}</p>
              </div>
            </div>
            <button className="w-full py-2 text-xs font-bold text-primary hover:underline flex items-center justify-center gap-2">
              <Map size={14} />
              View Destination Guide
            </button>
          </section>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => navigate('/profile')}
          className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          My Trip Dashboard
          <ArrowRight size={20} />
        </button>
        <button className="px-8 py-4 glass hover:bg-white/10 rounded-2xl flex items-center gap-2 transition-all font-bold">
          <Download size={20} />
          E-Ticket PDF
        </button>
        <button className="px-6 py-4 glass hover:bg-white/10 rounded-2xl flex items-center gap-2 transition-all">
          <Share2 size={20} />
        </button>
      </div>

      <div className="mt-20 text-center space-y-4">
        <p className="text-xs text-text-muted max-w-lg mx-auto">
          Need to change your plans? You can cancel your booking up to 72 hours before the trip for a full refund. 
          <a href="#" className="text-primary ml-1 hover:underline">Cancellation Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Booking;
