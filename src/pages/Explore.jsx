import React, { useState } from 'react';
import { Search, Filter, Star, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { id: 1, name: 'Santorini, Greece', cat: 'Beaches', rating: 4.9, price: '$1,500', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Kyoto, Japan', cat: 'Culture', rating: 4.8, price: '$1,200', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Paris, France', cat: 'City', rating: 4.7, price: '$1,800', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Bora Bora', cat: 'Beaches', rating: 5.0, price: '$2,500', img: 'https://images.unsplash.com/photo-1506953823976-52e1bdc0149a?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Machu Picchu', cat: 'Adventure', rating: 4.9, price: '$1,400', img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Rome, Italy', cat: 'History', rating: 4.8, price: '$1,300', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600' },
];

const categories = ['All', 'Beaches', 'Adventure', 'City', 'Culture', 'History'];

const Explore = () => {
  const [activeCat, setActiveCat] = useState('All');
  const navigate = useNavigate();

  const filteredDestinations = activeCat === 'All' 
    ? destinations 
    : destinations.filter(d => d.cat === activeCat);

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
        {filteredDestinations.map((dest) => (
          <div 
            key={dest.id} 
            className="glass-card group cursor-pointer"
            onClick={() => navigate(`/package/${dest.id}`)}
          >
            <div className="relative h-60 overflow-hidden">
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button className="absolute top-4 right-4 p-2 glass rounded-full text-white hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-2">
                <MapPin size={14} />
                {dest.cat}
              </div>
              <h3 className="text-xl font-bold mb-4 outfit">{dest.name}</h3>
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
