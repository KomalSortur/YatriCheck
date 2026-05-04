import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ShieldCheck, CreditCard, Clock, Headset, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { id: 1, name: 'Goa', price: '₹12,000', tag: 'Beach Paradise', img: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800' },
  { id: 2, name: 'Manali', price: '₹15,500', tag: 'Snowy Escape', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800' },
  { id: 3, name: 'Coorg', price: '₹10,200', tag: 'Coffee Highlands', img: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=800' },
  { id: 4, name: 'Kerala', price: '₹18,000', tag: 'Backwater Bliss', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Mysore', price: '₹8,500', tag: 'Royal Heritage', img: 'https://trekentrip.com/wp-content/uploads/2025/06/mysuru-palace-1024x640.jpg' },
  { id: 6, name: 'Maharashtra', price: '₹8,000', tag: 'Ajanta/Ellora caves', img: 'https://thumbs.dreamstime.com/b/kailas-temple-ellora-caves-complex-india-maharashtra-state-82378087.jpg' },
  { id: 7, name: 'Hampi', price: '₹5,000', tag: 'Hampi ruins', img: 'https://assets-news.housing.com/news/wp-content/uploads/2022/08/31020547/places-to-visit-in-hampi-FEATURE-compressed.jpg' },
  { id: 8, name: 'Rajasthan', price: '₹15,000', tag: 'Hawa Mahal', img: 'https://wallpapercave.com/wp/wp4555011.jpg' },
];

import { api } from '../utils/api';

const categories = [
  { name: 'Adventure', icon: '🧗' },
  { name: 'Beach', icon: '🏖️' },
  { name: 'Hill stations', icon: '🏔️' },
  { name: 'Religious', icon: '🛕' },
  { name: 'City tours', icon: '🌆' },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: '', to: '', date: '', travelers: '1' });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await api.getPackages();
        setPackages(data.slice(0, 3)); // Show top 3 on home
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

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
          <button className="search-btn" onClick={() => navigate('/explore')}>
            Explore Trips
          </button>
        </div>
      </header>

      {/* Popular Destinations */}
      <section className="home-section">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="dest-grid">
          {destinations.map((dest) => (
            <div key={dest.id} className="dest-card" onClick={() => navigate('/explore')}>
              <img src={dest.img} alt={dest.name} className="dest-img" />
              <div className="dest-info">
                <p className="dest-tag">{dest.tag}</p>
                <h3 className="dest-name">{dest.name}</h3>
                <p className="dest-price">Starting {dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trip Packages */}
      <section className="home-section">
        <h2 className="section-title">Complete Trip Packages</h2>
        <div className="pkg-grid">
          {loading ? (
            <p className="text-white/50 text-center py-8">Loading packages...</p>
          ) : packages.map((pkg, idx) => {
            const badges = ['badge-budget', 'badge-standard', 'badge-premium'];
            const types = ['Budget', 'Standard', 'Premium'];
            return (
              <div key={pkg._id} className="pkg-card">
                <span className={`pkg-badge ${badges[idx % 3]}`}>{types[idx % 3]}</span>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                  <span className="text-primary font-bold">{pkg.duration}</span>
                </div>
                <p className="text-white/50 text-sm mb-6 flex-grow">{pkg.description.substring(0, 80)}...</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-white">{pkg.price}</span>
                  <button
                    className="search-btn"
                    onClick={() => navigate(`/package/${pkg._id}`)}
                  >
                    View Package
                  </button>
                </div>
              </div>
            );
          })}
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
            <div key={idx} className="cat-card">
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

export default Home;
