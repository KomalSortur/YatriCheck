import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, ShieldCheck, MapPin, CheckCircle2, Utensils, Plane } from 'lucide-react';
import { api } from '../utils/api';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await api.getPackageById(id);
        setPkg(data);
        // Log as recently viewed (silently)
        try {
          if (api.getAuthToken()) {
            await api.addRecentlyViewed(id);
          }
        } catch (e) {
          // Ignore if not logged in or error
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handleBooking = async () => {
    if (!date) return alert('Please select a check-in date');
    setBookingLoading(true);
    try {
      await api.createBooking({
        packageId: id,
        date,
        totalPaid: pkg.price,
        guests,
        flightDetails: {
          airline: 'IndiGo',
          pnr: 'YTC' + Math.random().toString(36).substring(7).toUpperCase(),
          departure: '10:30 AM',
          arrival: '1:45 PM'
        },
        hotelDetails: {
          name: pkg.title + ' Resort & Spa',
          roomType: 'Ocean View Suite'
        },
        paymentMethod: 'Credit Card (Visa)'
      });
      navigate('/booking');
    } catch (err) {
      console.error(err);
      alert('Failed to create booking. Please log in first.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="pt-32 px-6 text-center">Loading package details...</div>;
  if (error || !pkg) return <div className="pt-32 px-6 text-center text-red-500">{error || 'Package not found'}</div>;

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
            <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold outfit mb-2">{pkg.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={20} fill="currentColor" />
                  <span className="font-bold">{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={20} />
                  <span>North Malé Atoll</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 outfit">About this package</h2>
            <p className="text-text-muted leading-relaxed mb-8">{pkg.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 glass rounded-2xl">
                <Clock className="text-primary mb-2" />
                <span className="text-xs text-text-muted uppercase font-bold">Duration</span>
                <span className="text-sm font-semibold">{pkg.duration}</span>
              </div>
              <div className="flex flex-col items-center p-4 glass rounded-2xl">
                <Users className="text-secondary mb-2" />
                <span className="text-xs text-text-muted uppercase font-bold">Group Size</span>
                <span className="text-sm font-semibold">{pkg.groupSize}</span>
              </div>
              <div className="flex flex-col items-center p-4 glass rounded-2xl">
                <ShieldCheck className="text-accent mb-2" />
                <span className="text-xs text-text-muted uppercase font-bold">Insurance</span>
                <span className="text-sm font-semibold">Included</span>
              </div>
              <div className="flex flex-col items-center p-4 glass rounded-2xl">
                <CheckCircle2 className="text-green-400 mb-2" />
                <span className="text-xs text-text-muted uppercase font-bold">Status</span>
                <span className="text-sm font-semibold">Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Utensils className="text-primary w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold outfit">Food & Dining</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{pkg.food || 'Meals details are not specified for this package.'}</p>
            </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Plane className="text-secondary w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold outfit">Travel & Transport</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{pkg.transport || 'Transportation details are not specified for this package.'}</p>
            </div>
          </div>

          <div className="glass p-8">
            <h2 className="text-2xl font-bold mb-6 outfit">Itinerary</h2>
            <div className="space-y-6">
              {pkg.itinerary.map((item) => (
                <div key={item.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {item.day}
                    </div>
                    <div className="w-0.5 h-full bg-glass-border my-2" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Day {item.day}: {item.title}</h4>
                    <p className="text-sm text-text-muted">Detailed activities and highlights for day {item.day}.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Booking */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-32">
            <div className="flex items-center justify-between mb-8">
              <span className="text-text-muted">Starting from</span>
              <div className="text-4xl font-extrabold text-primary">{pkg.price}</div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-bold text-text-muted uppercase mb-2 block">Check-in Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-glass-border rounded-xl p-3 focus:outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-muted uppercase mb-2 block">Guests</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full bg-white/5 border border-glass-border rounded-xl p-3 focus:outline-none focus:border-primary"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all mb-4 disabled:opacity-50"
            >
              {bookingLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
            <p className="text-center text-xs text-text-muted">No credit card required right now.</p>

            <div className="mt-8 border-t border-glass-border pt-6">
              <h4 className="font-bold text-sm mb-4">What's included:</h4>
              <ul className="text-sm text-text-muted space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> 5-Star Resort Stay</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> All meals and drinks</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Round-trip boat transfer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
