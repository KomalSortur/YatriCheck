import React, { useState } from 'react';
import { User, Settings, Heart, History, MapPin, Star, Calendar } from 'lucide-react';

const myTrips = [
  { id: 101, destination: 'Bali, Indonesia', date: 'March 2024', status: 'Completed', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=300' },
  { id: 102, destination: 'The Maldives', date: 'May 2024', status: 'Upcoming', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=300' },
];

const wishlist = [
  { id: 1, name: 'Santorini, Greece', price: '$1,500', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Kyoto, Japan', price: '$1,200', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=300' },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('trips');

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 p-1">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-background"
              />
            </div>
            <h2 className="text-xl font-bold outfit">Alex Johnson</h2>
            <p className="text-sm text-text-muted mb-6">alex.j@example.com</p>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('trips')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'trips' ? 'bg-primary text-white' : 'hover:bg-white/5 text-text-muted'}`}
              >
                <History size={18} />
                <span className="font-semibold text-sm">My Trips</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'wishlist' ? 'bg-primary text-white' : 'hover:bg-white/5 text-text-muted'}`}
              >
                <Heart size={18} />
                <span className="font-semibold text-sm">Wishlist</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-white/5 transition-all">
                <Settings size={18} />
                <span className="font-semibold text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold outfit mb-2">
              {activeTab === 'trips' ? 'Trip History' : 'My Wishlist'}
            </h1>
            <p className="text-text-muted">Manage your bookings and saved destinations</p>
          </div>

          {activeTab === 'trips' ? (
            <div className="space-y-6">
              {myTrips.map((trip) => (
                <div key={trip.id} className="glass-card flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-48 h-32 md:h-auto">
                    <img src={trip.img} alt={trip.destination} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 outfit">{trip.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {trip.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> ID: {trip.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${trip.status === 'Upcoming' ? 'bg-primary/20 text-primary' : 'bg-green-400/20 text-green-400'}`}>
                        {trip.status}
                      </span>
                      <button className="text-sm font-bold hover:text-primary transition-colors">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="glass-card overflow-hidden">
                  <div className="h-40 overflow-hidden relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 p-2 glass rounded-full text-red-500">
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold outfit">{item.name}</h4>
                      <span className="text-sm text-primary font-bold">{item.price}</span>
                    </div>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
