import { useState, useMemo, useEffect } from 'react';
import { Search, Star, MapPin, Filter, X, Map as MapIcon, Grid, TrendingUp, Sparkles, ChevronRight, Clock, Plane, Train, Bus, Edit3, Calendar, Users, Heart, ChevronLeft } from 'lucide-react';
import { api } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import './Explore.css';

// Static destinations data removed. Data is now fetched dynamically from the backend.

const categories = ['Beach', 'Adventure', 'Hill Stations', 'Religious', 'Nature', 'Heritage', 'City Tours'];
const durations = ['2D/1N', '3D/2N', '4D/3N', '5D/4N'];
const hotelTypes = ['3★', '4★', '5★'];
const transportTypes = ['Bus', 'Train', 'Flight'];

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSearch = location.state?.initialSearch || { from: '', to: '', date: '', travelers: '1' };

  const [searchParams, setSearchParams] = useState(initialSearch);
  const [isEditingSearch, setIsEditingSearch] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Filters State
  const [filters, setFilters] = useState({
    budget: [2000, 50000],
    hotel: 'All',
    duration: 'All',
    category: location.state?.initialFilters?.category || 'All',
    transport: 'All'
  });

  const [viewMode, setViewMode] = useState('grid');
  const [selectedDest, setSelectedDest] = useState(null);
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all trips for sidebar suggestions
    fetch('http://localhost:5000/api/trips/search')
      .then(res => res.json())
      .then(data => setAllTrips(data))
      .catch(err => console.error("Error fetching all trips", err));
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (searchParams.from) queryParams.append('from', searchParams.from);
        if (searchParams.to) queryParams.append('to', searchParams.to);
        
        // Append all filters
        if (filters.category !== 'All') queryParams.append('category', filters.category);
        if (filters.hotel !== 'All') queryParams.append('hotelType', filters.hotel);
        if (filters.duration !== 'All') queryParams.append('duration', filters.duration);
        if (filters.transport !== 'All') queryParams.append('transport', filters.transport);
        
        // Budget
        queryParams.append('budgetMin', filters.budget[0]);
        queryParams.append('budgetMax', filters.budget[1]);

        const response = await fetch(`http://localhost:5000/api/trips/search?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trips from server');
        }
        
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [searchParams.to, searchParams.from, filters]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const profile = await api.getProfile();
        setWishlist(profile.wishlist.map(item => item._id));
      } catch (err) {
        console.log('User not logged in or failed to fetch wishlist');
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlist = async (tripId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please login to use the wishlist feature.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tripId })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Added to wishlist ❤️');
        if (!wishlist.includes(tripId)) {
          setWishlist([...wishlist, tripId]);
        }
      } else {
        alert(data.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      alert('Error adding to wishlist');
    }
  };


  const handleEditSearch = (e) => {
    e.preventDefault();
    setIsEditingSearch(false);
  };

  return (
    <div className="explore-page no-padding-top">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* 1. Search Summary (Top Bar) */}
      <section className="search-summary-bar sticky-docked z-[50]">
        <div className="summary-content">
          <button className="summary-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span className="font-semibold text-sm">Back</span>
          </button>
          <div className="divider-v" />
          <div className="summary-item">
            <MapPin size={16} className="text-primary" />
            <div className="text-group">
              <span className="label">From</span>
              <span className="value">{searchParams.from || 'Location'}</span>
            </div>
          </div>
          <div className="divider-v" />
          <div className="summary-item">
            <MapPin size={16} className="text-secondary" />
            <div className="text-group">
              <span className="label">To</span>
              <span className="value">{searchParams.to || 'Anywhere'}</span>
            </div>
          </div>
          <div className="divider-v" />
          <div className="summary-item">
            <Calendar size={16} className="text-accent" />
            <div className="text-group">
              <span className="label">Date</span>
              <span className="value">{searchParams.date || 'Anytime'}</span>
            </div>
          </div>
          <div className="divider-v" />
          <div className="summary-item">
            <Users size={16} className="text-primary" />
            <div className="text-group">
              <span className="label">Travelers</span>
              <span className="value">{searchParams.travelers} {parseInt(searchParams.travelers) > 1 ? 'People' : 'Person'}</span>
            </div>
          </div>

          <button className="edit-search-btn" onClick={() => setIsEditingSearch(!isEditingSearch)}>
            <Edit3 size={16} />
            Edit Search
          </button>
        </div>

        {isEditingSearch && (
          <div className="edit-search-dropdown glass animate-fade-in">
            <form onSubmit={handleEditSearch} className="edit-form">
              <div className="form-grid">
                <div className="input-group">
                  <label>From</label>
                  <input type="text" value={searchParams.from} onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>To</label>
                  <input type="text" value={searchParams.to} onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" value={searchParams.date} onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Travelers</label>
                  <select value={searchParams.travelers} onChange={(e) => setSearchParams({ ...searchParams, travelers: e.target.value })}>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3+ People</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" className="cancel-btn" onClick={() => setIsEditingSearch(false)}>Cancel</button>
                <button type="submit" className="save-btn">Update Results</button>
              </div>
            </form>
          </div>
        )}
      </section>

      <main className="explore-container mt-8">
        <div className="explore-content-layout">
          {/* 2. Filters (Refinement Layer) */}
          <aside className="filters-sidebar">
            <div className="glass p-6 sticky top-[150px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter size={18} /> Refine Results
                </h3>
                <button className="text-xs text-primary font-bold" onClick={() => setFilters({
                  budget: [2000, 50000], hotel: 'All', duration: 'All', category: 'All', transport: 'All'
                })}>Reset</button>
              </div>

              {/* Budget Filter */}
              <div className="filter-block">
                <label className="filter-title">Budget (Per Person)</label>
                <div className="flex justify-between text-xs text-text-muted mb-2">
                  <span>₹{filters.budget[0]}</span>
                  <span>₹{filters.budget[1]}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="500"
                  value={filters.budget[1]}
                  onChange={(e) => setFilters({ ...filters, budget: [2000, parseInt(e.target.value)] })}
                  className="budget-slider-premium"
                />
              </div>

              {/* Hotel Type */}
              <div className="filter-block">
                <label className="filter-title">Hotel Type</label>
                <div className="chips-grid">
                  <button className={`chip ${filters.hotel === 'All' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, hotel: 'All' })}>All</button>
                  {hotelTypes.map(h => (
                    <button key={h} className={`chip ${filters.hotel === h ? 'active' : ''}`} onClick={() => setFilters({ ...filters, hotel: h })}>{h}</button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="filter-block">
                <label className="filter-title">Duration</label>
                <div className="chips-grid">
                  <button className={`chip ${filters.duration === 'All' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, duration: 'All' })}>All</button>
                  {durations.map(d => (
                    <button key={d} className={`chip ${filters.duration === d ? 'active' : ''}`} onClick={() => setFilters({ ...filters, duration: d })}>{d}</button>
                  ))}
                </div>
              </div>

              {/* Trip Type */}
              <div className="filter-block">
                <label className="filter-title">Trip Type</label>
                <div className="chips-grid">
                  <button className={`chip ${filters.category === 'All' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: 'All' })}>All</button>
                  {categories.map(c => (
                    <button key={c} className={`chip ${filters.category === c ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: c })}>{c}</button>
                  ))}
                </div>
              </div>

              {/* Transport */}
              <div className="filter-block">
                <label className="filter-title">Transport</label>
                <div className="chips-grid">
                  <button className={`chip ${filters.transport === 'All' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, transport: 'All' })}>All</button>
                  {transportTypes.map(t => (
                    <button key={t} className={`chip ${filters.transport === t ? 'active' : ''}`} onClick={() => setFilters({ ...filters, transport: t })}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 3. Trip Package Results (Main Content) */}
          <section className="results-area">
            <div className="results-header mb-6 flex justify-between items-center">
              <h2 className="results-count-text">
                <span className="count">{trips.length}</span> Packages Found for <span className="location">{searchParams.to || 'India'}</span>
              </h2>
              <div className="view-toggle">
                <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                <button className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`} onClick={() => setViewMode('map')}><MapIcon size={18} /></button>
              </div>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 glass">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-text-muted">Searching for best deals...</p>
              </div>
            )}

            {error && (
              <div className="glass p-12 text-center border-red-500/20">
                <X size={48} className="text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Connection Error</h3>
                <p className="text-text-muted mb-6">{error}</p>
                <button className="search-btn" onClick={() => window.location.reload()}>Retry Search</button>
              </div>
            )}

            {!loading && !error && (
              viewMode === 'grid' ? (
                <div className="results-grid">
                  {trips.length > 0 ? (
                    trips.map(trip => (
                      <div key={trip._id} className="package-card-v2 glass animate-fade-in">
                        <div className="card-top">
                          <img src={trip.image} alt={trip.destination} className="card-image" />
                          <div className="card-badges">
                            <span className="badge">{trip.category}</span>
                          </div>
                          <div className="card-rating-v2">
                            <Star size={12} fill="currentColor" />
                            <span>{trip.rating}</span>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="dest-title">{trip.destination} {trip.duration} Package</h3>
                              <p className="hotel-preview flex items-center gap-1 text-xs text-text-muted">
                                <Sparkles size={12} className="text-primary" /> Premium Stay Included
                              </p>
                            </div>
                            <div className="price-box text-right">
                              <span className="price-val">₹{trip.price.toLocaleString()}</span>
                              <span className="price-unit">per person</span>
                            </div>
                          </div>

                          <div className="features-row">
                            <div className="feature"><Clock size={14} /> {trip.duration}</div>
                            <div className="feature"><MapPin size={14} /> {trip.category}</div>
                            <div className="feature"><Plane size={14} /> Transport Incl.</div>
                          </div>

                          <div className="flex gap-2 mt-6">
                            <button className="view-details-btn-v2 flex-1" onClick={() => navigate(`/package/${trip._id}`)}>
                              View Details
                            </button>
                            <button
                              className={`wishlist-btn-v2 ${wishlist.includes(trip._id) ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); handleWishlist(trip._id); }}
                            >
                              <Heart size={18} fill={wishlist.includes(trip._id) ? "var(--primary)" : "none"} />
                              <span className="hidden md:inline">Wishlist</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* 6. If No Results Found */
                    <div className="no-results-state glass p-12 text-center w-full">
                      <div className="icon-box-large"><Search size={48} /></div>
                      <h3 className="text-2xl font-bold mt-4">No trips found for "{searchParams.to}"</h3>
                      <p className="text-text-muted mb-8">We couldn't find any packages matching your search. Try another destination!</p>
                      <div className="suggestions">
                        <p className="font-bold mb-4">Popular Choices:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                          {allTrips.slice(0, 3).map(trip => (
                            <button key={trip._id} className="chip active" onClick={() => setSearchParams({ ...searchParams, to: trip.destination })}>{trip.destination}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="map-placeholder-v2 glass">
                  <div className="flex flex-col items-center">
                    <MapIcon size={64} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold">Map View Active</h3>
                    <p className="text-text-muted">Browsing packages by location</p>
                  </div>
                </div>
              )
            )}
          </section>

          <aside className="suggestions-sidebar">
            <div className="glass p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Best for Your Dates
              </h3>
              <div className="mini-list">
                {allTrips.slice(0, 3).map(trip => (
                  <div key={trip._id} className="mini-item glass" onClick={() => navigate(`/package/${trip._id}`)}>
                    <img src={trip.image} alt={trip.destination} />
                    <div className="info">
                      <p className="name">{trip.destination}</p>
                      <p className="price">Starting ₹{trip.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-accent" /> AI Recommended
              </h3>
              <div className="ai-suggestion-box">
                <p className="text-xs text-text-muted mb-4">Based on your "2 Travelers" search for {searchParams.to || 'trips'}:</p>
                {allTrips.slice(3, 6).map(trip => (
                  <div key={trip._id} className="ai-mini-card" onClick={() => navigate(`/package/${trip._id}`)}>
                    <div className="flex items-center gap-3">
                      <div className="ai-icon">✨</div>
                      <span className="font-bold">{trip.destination}</span>
                    </div>
                    <ChevronRight size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-400" /> Safe Travels
              </h3>
              <p className="text-xs text-text-muted">All our partners are verified and follow strict safety protocols.</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Package Detail Sidebar (Contextual) */}
      {selectedDest && (
        <div className="package-sidebar-overlay" onClick={() => setSelectedDest(null)}>
          <div className="package-sidebar glass animate-slide-in" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDest(null)}><X size={20} /></button>
            <img src={selectedDest.img} alt={selectedDest.name} className="sidebar-img" />
            <div className="sidebar-content">
              <h2 className="text-2xl font-bold mb-2">{selectedDest.name}</h2>
              <p className="text-text-muted mb-6">{selectedDest.duration} • {selectedDest.hotelType} Hotel • {selectedDest.transport} Transport</p>

              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Package Tiers</h4>
              <div className="sidebar-packages space-y-4">
                {selectedDest.packages.map(p => (
                  <div key={p.type} className="tier-card glass">
                    <div className="flex justify-between items-center mb-2">
                      <span className="tier-type">{p.type}</span>
                      <span className="tier-price">{p.price}</span>
                    </div>
                    <div className="tier-features text-xs text-text-muted space-y-1">
                      <p>• {p.hotel}</p>
                      <p>• {p.transport}</p>
                      <p>• {p.tag}</p>
                    </div>
                    <button className="select-tier-btn" onClick={() => navigate(`/package/${selectedDest.id}`)}>Select {p.type}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShieldCheck = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Explore;
