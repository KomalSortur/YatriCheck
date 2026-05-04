import { useState, useEffect } from 'react';
import { History, MapPin, Calendar, ShoppingCart, Phone, Mail, Edit2, Clock, Trash2, Camera } from 'lucide-react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'cart', 'recent'
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', photo: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile(data);
        setEditData({ name: data.name, phone: data.phone || '', photo: data.photo || '' });
      } catch (err) {
        console.error(err);
        navigate('/'); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleRemoveCart = async (packageId) => {
    try {
      const updatedCart = await api.toggleCart(packageId);
      setProfile({ ...profile, cart: updatedCart });
    } catch (err) {
      console.error('Failed to update cart', err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await api.updateProfile(editData);
      setProfile({ ...profile, name: editData.name, phone: editData.phone, photo: editData.photo });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save profile', err);
      alert('Failed to save profile updates.');
    }
  };

  if (loading) return <div className="pt-32 px-6 text-center">Loading profile...</div>;
  if (!profile) return <div className="pt-32 px-6 text-center">Please log in to view profile.</div>;

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto mb-20">
      
      {/* Top Section: User Profile */}
      <div className="glass-card p-8 mb-10 relative overflow-hidden">
        {/* Thematic Background Elements inside the card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Profile Photo */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/20">
              <img 
                src={isEditing ? editData.photo : profile.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-background"
              />
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white cursor-pointer hover:bg-primary-hover shadow-lg">
                <Camera size={16} />
              </div>
            )}
          </div>

          {/* Profile Details & Edit Mode */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Full Name</label>
                  <input 
                    type="text" 
                    value={editData.name} 
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full bg-white/5 border border-glass-border rounded-xl p-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Phone Number</label>
                  <input 
                    type="tel" 
                    value={editData.phone} 
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-glass-border rounded-xl p-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Photo URL</label>
                  <input 
                    type="text" 
                    value={editData.photo} 
                    onChange={(e) => setEditData({...editData, photo: e.target.value})}
                    className="w-full bg-white/5 border border-glass-border rounded-xl p-2 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold outfit mb-2 text-white">{profile.name}</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-text-muted">
                  <span className="flex items-center gap-2"><Mail size={18} className="text-primary"/> {profile.email}</span>
                  <span className="flex items-center gap-2"><Phone size={18} className="text-primary"/> {profile.phone || 'Not provided'}</span>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 min-w-[140px]">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSaveProfile}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="glass hover:bg-white/10 text-white font-bold py-2 px-4 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Tabs (Sidebar on desktop, row on mobile) */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 lg:w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all whitespace-nowrap ${activeTab === 'history' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-text-muted'}`}
            >
              <History size={20} />
              <span className="font-semibold">Trip History</span>
            </button>
            <button 
              onClick={() => setActiveTab('cart')}
              className={`flex-1 lg:w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all whitespace-nowrap ${activeTab === 'cart' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-text-muted'}`}
            >
              <ShoppingCart size={20} />
              <span className="font-semibold">My Cart</span>
            </button>
            <button 
              onClick={() => setActiveTab('recent')}
              className={`flex-1 lg:w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all whitespace-nowrap ${activeTab === 'recent' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-text-muted'}`}
            >
              <Clock size={20} />
              <span className="font-semibold">Recently Visited</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          <div className="glass p-8 min-h-[400px]">
            
            {/* Trip History */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold outfit mb-6 flex items-center gap-2"><History className="text-primary"/> Trip History</h2>
                <div className="space-y-6">
                  {profile.tripHistory.length === 0 && <p className="text-text-muted">You haven't booked any trips yet.</p>}
                  {profile.tripHistory.map((trip) => (
                    <div key={trip._id} className="glass-card flex flex-col sm:flex-row overflow-hidden border border-glass-border/50 hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => navigate(`/package/${trip.package?._id}`)}>
                      <div className="sm:w-48 h-40 sm:h-auto overflow-hidden">
                        <img src={trip.package?.img || ''} alt={trip.package?.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold outfit">{trip.package?.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${trip.status === 'Upcoming' ? 'bg-primary/20 text-primary' : 'bg-green-400/20 text-green-400'}`}>
                              {trip.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                            <span className="flex items-center gap-1"><Calendar size={14} className="text-primary"/> {new Date(trip.date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} className="text-primary"/> Booking ID: {trip.bookingId}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-text-muted">Total Paid: </span>
                          <span className="font-bold text-white">{trip.totalPaid}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Cart */}
            {activeTab === 'cart' && (
              <div>
                <h2 className="text-2xl font-bold outfit mb-6 flex items-center gap-2"><ShoppingCart className="text-primary"/> My Cart</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(!profile.cart || profile.cart.length === 0) && <p className="text-text-muted col-span-full">Your cart is empty.</p>}
                  {profile.cart?.map((item) => (
                    <div key={item._id} className="glass-card overflow-hidden group">
                      <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/package/${item._id}`)}>
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white">
                          {item.duration}
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRemoveCart(item._id); }}
                          className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-all shadow-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold outfit text-lg mb-2">{item.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xl text-primary font-bold">{item.price}</span>
                          <button 
                            onClick={() => navigate(`/package/${item._id}`)}
                            className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recently Visited */}
            {activeTab === 'recent' && (
              <div>
                <h2 className="text-2xl font-bold outfit mb-6 flex items-center gap-2"><Clock className="text-primary"/> Recently Visited</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(!profile.recentlyViewed || profile.recentlyViewed.length === 0) && <p className="text-text-muted col-span-full">You haven't viewed any packages recently.</p>}
                  {profile.recentlyViewed?.map((item) => (
                    <div key={item._id} className="glass-card overflow-hidden flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/package/${item._id}`)}>
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold outfit mb-1">{item.title}</h4>
                        <span className="text-sm text-text-muted flex items-center gap-1"><MapPin size={12}/> {item.duration}</span>
                        <div className="mt-2 text-primary font-bold">{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
