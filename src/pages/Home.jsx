import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ShieldCheck, CreditCard, Clock, Headset, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Static destinations removed. Now fetching from backend.

const packages = [
  { id: 1, type: 'Budget', title: 'Explorer Pass', duration: '2D/3N', price: '₹5,999', badge: 'badge-budget', desc: 'Perfect for solo travelers and students looking for an affordable adventure.' },
  { id: 2, type: 'Standard', title: 'Classic Journey', duration: '3D/4N', price: '₹12,499', badge: 'badge-standard', desc: 'Balanced comfort and experience with verified stays and guided tours.' },
  { id: 3, type: 'Premium', title: 'Elite Retreat', duration: '4D/5N', price: '₹24,999', badge: 'badge-premium', desc: 'Ultimate luxury with 5-star hotels, private transfers, and curated meals.' },
];

const categories = [
  { name: 'Adventure', icon: '🧗' },
  { name: 'Beach', icon: '🏖️' },
  { name: 'Hill Stations', icon: '🏔️' },
  { name: 'Religious', icon: '🛕' },
  { name: 'City Tours', icon: '🌆' },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: '', to: '', date: '', travelers: '1' });
  const [selectedDest, setSelectedDest] = useState(null);
  const [topTrips, setTopTrips] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trips/search')
      .then(res => res.json())
      .then(data => setTopTrips(data.slice(0, 8)))
      .catch(console.error);
  }, []);

  const handleExplore = () => {
    navigate('/explore', { state: { initialSearch: { ...search, to: selectedDest.destination } } });
    setSelectedDest(null);
  };

  return (
    <div className="home-page">
      {/* Background Animation */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Hero Section */}
      <header className="home-section pt-30 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 outfit text-gradient leading-tight">
          Where Your Plans Meet <span className="text-primary">Destination</span>
        </h1>
        <p className="text-lg text-white/50 mb-20 max-w-2xl mx-auto">
          Discover exclusive travel packages and popular Indian destinations tailored to your budget and style.
        </p>

        {/* Search Bar */}
        <div className="search-container max-w-5xl mx-auto">
          <div className="search-field">
            <MapPin size={18} className="text-primary" />
            <input
              type="text"
              placeholder="From: Auto-detect location"
              value={search.from}
              onChange={(e) => setSearch({ ...search, from: e.target.value })}
            />
          </div>
          <div className="search-field">
            <Search size={18} className="text-primary" />
            <input
              type="text"
              placeholder="To: Destination"
              value={search.to}
              onChange={(e) => setSearch({ ...search, to: e.target.value })}
            />
          </div>
          <div className="search-field">
            <Calendar size={18} className="text-primary" />
            <input
              type="date"
              value={search.date}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
            />
          </div>
          <div className="search-field">
            <Users size={18} className="text-primary" />
            <select
              className="bg-transparent border-none text-white outline-none w-full text-sm"
              value={search.travelers}
              onChange={(e) => setSearch({ ...search, travelers: e.target.value })}
            >
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3+ Travelers</option>
            </select>
          </div>
          <button className="search-btn" onClick={() => navigate('/explore', { state: { initialSearch: search } })}>
            Explore Trips
          </button>
        </div>
      </header>

      {/* Popular Destinations */}
      <section className="home-section">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="dest-grid">
          {topTrips.map((dest) => (
            <div key={dest._id} className="dest-card" onClick={() => setSelectedDest(dest)}>
              <img src={dest.image} alt={dest.destination} className="dest-img" />
              <div className="dest-info">
                <p className="dest-tag">{dest.category}</p>
                <h3 className="dest-name">{dest.destination}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Search Sidebar */}
      {selectedDest && (
        <div className="sidebar-overlay" onClick={() => setSelectedDest(null)}>
          <div className="quick-search-sidebar glass animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDest(null)}>
              <X size={20} />
            </button>
            <img src={selectedDest.image} alt={selectedDest.destination} className="sidebar-dest-img" />
            
            <div className="sidebar-content">
              <div className="dest-header mb-6">
                <h2 className="text-3xl font-bold outfit mb-1">{selectedDest.destination}</h2>
                <p className="text-text-muted text-sm">
                  {selectedDest.duration || '3D/2N'} • {selectedDest.hotel || '3★ Hotel'} • {selectedDest.transport || 'Bus'} Transport
                </p>
              </div>

              <div className="search-refinement-form space-y-6">
                <div className="input-group-v2">
                  <label className="text-xs font-bold text-text-muted uppercase mb-2 block">From :</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="text-primary" />
                    <input 
                      type="text" 
                      placeholder="Departure City" 
                      value={search.from}
                      onChange={(e) => setSearch({...search, from: e.target.value})}
                    />
                  </div>
                </div>

                <div className="input-group-v2">
                  <label className="text-xs font-bold text-text-muted uppercase mb-2 block">Travel Date :</label>
                  <div className="input-with-icon">
                    <Calendar size={18} className="text-secondary" />
                    <input 
                      type="date" 
                      value={search.date}
                      onChange={(e) => setSearch({...search, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="input-group-v2">
                  <label className="text-xs font-bold text-text-muted uppercase mb-2 block">Number of Travellers :</label>
                  <div className="input-with-icon">
                    <Users size={18} className="text-accent" />
                    <select 
                      value={search.travelers}
                      onChange={(e) => setSearch({...search, travelers: e.target.value})}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3+ People</option>
                    </select>
                  </div>
                </div>



                <button className="sidebar-explore-btn mt-10" onClick={handleExplore}>
                  Explore Trips
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trip Packages */}
      <section className="home-section">
        <h2 className="section-title">Complete Trip Packages</h2>
        <div className="pkg-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="pkg-card">
              <span className={`pkg-badge ${pkg.badge}`}>{pkg.type}</span>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                <span className="text-primary font-bold">{pkg.duration}</span>
              </div>
              <p className="text-white/50 text-sm mb-6 flex-grow">{pkg.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-white">{pkg.price}</span>
                <button
                  className="search-btn"
                  onClick={() => navigate(`/package/${pkg.id}`)}
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Offers */}
      <section className="home-section">
        <div className="glass p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 border-primary/20">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-primary font-bold mb-4">
              <TrendingUp size={20} />
              <span>Trending Offers 🔥</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Up to 30% Off on Seasonal Deals!</h2>
            <p className="text-white/50 mb-6">Explore the most booked trips of the season with exclusive discounts and verified luxury stays.</p>
            <button className="search-btn">Claim Offer</button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-2xl text-center">
              <p className="text-primary font-bold text-2xl">400+</p>
              <p className="text-xs text-white/40">Trips Booked</p>
            </div>
            <div className="glass p-4 rounded-2xl text-center">
              <p className="text-secondary font-bold text-2xl">12k+</p>
              <p className="text-xs text-white/40">Happy Travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Categories */}
      <section className="home-section">
        <h2 className="section-title">Travel Categories</h2>
        <div className="cat-grid">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="cat-card"
              onClick={() => navigate('/explore', { state: { initialFilters: { category: cat.name } } })}
              style={{ cursor: 'pointer' }}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="home-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon"><CreditCard size={28} /></div>
            <h3 className="why-title">Best Price</h3>
            <p className="why-desc">We guarantee the most competitive rates in the market for every destination.</p>
          </div>
          <div className="why-item">
            <div className="why-icon"><ShieldCheck size={28} /></div>
            <h3 className="why-title">Verified Hotels</h3>
            <p className="why-desc">Hand-picked and personally verified accommodations for your safety and comfort.</p>
          </div>
          <div className="why-item">
            <div className="why-icon"><Clock size={28} /></div>
            <h3 className="why-title">Easy Cancellation</h3>
            <p className="why-desc">Flexible booking policies with 100% refund on qualifying cancellations.</p>
          </div>
          <div className="why-item">
            <div className="why-icon"><Headset size={28} /></div>
            <h3 className="why-title">24/7 Support</h3>
            <p className="why-desc">Our travel experts are always available to help you during your journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Home;
