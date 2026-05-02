import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data fetching
  const pkg = {
    title: 'Luxury Maldives Escape',
    rating: 4.9,
    reviews: 124,
    duration: '7 Days / 6 Nights',
    groupSize: 'Max 12 people',
    price: '$1,299',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
    description: 'Experience the ultimate tropical paradise in the Maldives. This luxury package includes private water villa accommodation, all-inclusive dining, and curated island excursions.',
    itinerary: [
      { day: 1, title: 'Arrival & Welcome Dinner' },
      { day: 2, title: 'Private Island Snorkeling' },
      { day: 3, title: 'Sunset Cruise & Dolphin Watching' },
      { day: 4, title: 'Spa & Wellness Retreat' },
    ]
  };

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
                <input type="date" className="w-full bg-white/5 border border-glass-border rounded-xl p-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-text-muted uppercase mb-2 block">Guests</label>
                <select className="w-full bg-white/5 border border-glass-border rounded-xl p-3 focus:outline-none focus:border-primary">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (2+2)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => navigate('/booking')}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all mb-4"
            >
              Confirm Booking
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
