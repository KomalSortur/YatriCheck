import React, { useState } from 'react';
import { Search, Calendar, MapPin, Compass, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const packages = [
  { id: 1, title: 'Maldives Paradise', price: '$1,299', rating: 4.9, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Swiss Alps Escape', price: '$1,850', rating: 4.8, img: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Bali Bliss', price: '$899', rating: 4.7, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: '', to: '', date: '' });

  return (
    <div className="pt-32 px-6">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 outfit text-gradient">
          Plan Your Next <span className="text-gradient-primary">Adventure</span>
        </h1>
        <p className="text-xl text-text-muted mb-10">
          Discover hand-picked destinations and exclusive travel packages tailored for you.
        </p>

        {/* Search Bar */}
        <div className="glass p-4 md:p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto">
          <div className="flex-1 w-full flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
            <Compass className="text-primary w-5 h-5" />
            <input 
              type="text" 
              placeholder="From where?" 
              className="bg-transparent border-none outline-none w-full text-sm"
              value={search.from}
              onChange={(e) => setSearch({...search, from: e.target.value})}
            />
          </div>
          <div className="flex-1 w-full flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
            <MapPin className="text-secondary w-5 h-5" />
            <input 
              type="text" 
              placeholder="To where?" 
              className="bg-transparent border-none outline-none w-full text-sm"
              value={search.to}
              onChange={(e) => setSearch({...search, to: e.target.value})}
            />
          </div>
          <div className="flex-1 w-full flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
            <Calendar className="text-accent w-5 h-5" />
            <input 
              type="date" 
              className="bg-transparent border-none outline-none w-full text-sm"
              value={search.date}
              onChange={(e) => setSearch({...search, date: e.target.value})}
            />
          </div>
          <button 
            onClick={() => navigate('/explore')}
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/25"
          >
            Search
          </button>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold outfit">Popular Packages</h2>
          <button 
            onClick={() => navigate('/explore')}
            className="flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View all <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="glass-card group overflow-hidden cursor-pointer"
              onClick={() => navigate(`/package/${pkg.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.img} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 text-sm font-bold flex items-center gap-1">
                  <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                  {pkg.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 outfit">{pkg.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                  <span className="text-sm text-text-muted">Per person</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
