import { useState, useEffect } from 'react';
import { Search, Star, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const categories = ['All', 'Beaches', 'Adventure', 'City', 'Culture', 'History'];

const Explore = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await api.getPackages();
        setPackages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Use a simple mock logic to map categories for filtering if needed,
  // since our DB packages don't have explicit categories yet.
  const filteredDestinations = packages;

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 outfit">Explore Destinations</h1>
          <p className="text-text-muted">Discover your next dream getaway</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search destination..." 
            className="glass py-3 pl-12 pr-6 focus:outline-none focus:border-primary transition-all w-full md:w-80"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCat === cat 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'glass hover:bg-white/10 text-text-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {loading ? (
          <div className="col-span-full text-center py-10 text-text-muted">Loading packages...</div>
        ) : filteredDestinations.map((dest) => (
          <div 
            key={dest._id} 
            className="glass-card group cursor-pointer"
            onClick={() => navigate(`/package/${dest._id}`)}
          >
            <div className="relative h-60 overflow-hidden">
              <img 
                src={dest.img} 
                alt={dest.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button 
                className="absolute top-4 right-4 p-2 glass rounded-full text-white hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  api.toggleCart(dest._id).catch(err => console.error(err));
                }}
              >
                <Heart size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-2">
                <MapPin size={14} />
                {dest.duration}
              </div>
              <h3 className="text-xl font-bold mb-4 outfit">{dest.title}</h3>
              <div className="flex items-center justify-between border-t border-glass-border pt-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                  <span className="text-sm font-bold">{dest.rating}</span>
                </div>
                <div className="text-xl font-bold">{dest.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
