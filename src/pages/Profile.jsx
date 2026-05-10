import { useState, useEffect } from 'react';
import {
  User, Heart, History, Settings, CreditCard, Bell, Shield,
  Users, Edit3, Camera, MapPin, Calendar, Phone, Mail,
  Plus, Trash2, Eye, EyeOff, ChevronRight, ChevronDown,
  Plane, Hotel, Star, Lock, Smartphone, Activity,
  Moon, Sun, Globe, Utensils, AlignLeft, Check, X,
  AlertCircle, TrendingUp, Bookmark, LogOut
} from 'lucide-react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const TABS = [
  { id: 'personal',  label: 'Personal Info',     icon: User },
  { id: 'travelers', label: 'Saved Travelers',    icon: Users },
  { id: 'bookings',  label: 'Booking History',    icon: History },
  { id: 'payment',   label: 'Payment Methods',    icon: CreditCard },
  { id: 'prefs',     label: 'Preferences',        icon: Settings },
  { id: 'wishlist',  label: 'Wishlist',           icon: Heart },
  { id: 'notifs',    label: 'Notifications',      icon: Bell },
  { id: 'security',  label: 'Security',           icon: Shield },
];

/* ─────── Mock / demo data ─────── */
const MOCK_BOOKINGS = [
  { id: 'YTC-112233', destination: 'Maldives Luxury Escape', date: '2026-06-10', status: 'upcoming', price: '₹89,999', nights: 5, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80' },
  { id: 'YTC-998877', destination: 'Kerala Backwaters', date: '2026-02-14', status: 'completed', price: '₹24,500', nights: 3, img: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80' },
  { id: 'YTC-556644', destination: 'Rajasthan Heritage Tour', date: '2025-12-20', status: 'cancelled', price: '₹32,000', nights: 4, img: 'https://images.unsplash.com/photo-1477587458883-47145ed6979c?w=400&q=80' },
];
const MOCK_WISHLIST = [
  { id: 1, name: 'Bali, Indonesia', price: '₹65,000', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', rating: 4.9 },
  { id: 2, name: 'Swiss Alps',      price: '₹1,45,000', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', rating: 4.8 },
  { id: 3, name: 'Santorini',       price: '₹98,000',  img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', rating: 4.7 },
];
const MOCK_TRAVELERS = [
  { id: 1, name: 'Rahul Sharma', relation: 'Self',   passport: 'P123456', dob: '1994-03-12' },
  { id: 2, name: 'Priya Sharma', relation: 'Spouse', passport: 'P789012', dob: '1996-07-22' },
];
const MOCK_CARDS = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '08/27', primary: true },
  { id: 2, type: 'UPI',  last4: null,   upi: 'user@okaxis', primary: false },
];
const MOCK_ACTIVITY = [
  { date: '2026-05-04 13:45', device: 'Chrome / Windows', location: 'Mumbai, IN', current: true },
  { date: '2026-05-03 09:12', device: 'Safari / iPhone',  location: 'Mumbai, IN', current: false },
];

const DEMO_PROFILE = { name: 'Traveller', email: 'guest@yatricheck.com', phone: '' };

export default function Profile() {
  const [tab, setTab] = useState('personal');
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* profile edit state */
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: DEMO_PROFILE.name, email: DEMO_PROFILE.email, phone: '' });

  /* travelers */
  const [travelers, setTravelers] = useState(MOCK_TRAVELERS);
  const [showAddTraveler, setShowAddTraveler] = useState(false);

  /* wishlist */
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

  /* payment */
  const [cards] = useState(MOCK_CARDS);
  const [showCVV, setShowCVV] = useState({});

  /* prefs */
  const [prefs, setPrefs] = useState({ seat: 'window', meal: 'veg', lang: 'en', currency: 'INR' });

  /* notifs */
  const [notifs, setNotifs] = useState({ email: true, sms: false, priceAlerts: true, deals: true });

  /* security */
  const [showPwd, setShowPwd] = useState({ old: false, new: false, confirm: false });
  const [twoFA, setTwoFA] = useState(false);

  /* booking filter */
  const [bookingFilter, setBookingFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    api.getProfile()
      .then(d => { setProfile(d); setEditForm({ name: d.name, email: d.email, phone: d.phone || '' }); })
      .catch(() => { /* token expired — stay on page with demo data */ })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => { localStorage.clear(); navigate('/'); };
  const toggleCVV = (id) => setShowCVV(p => ({ ...p, [id]: !p[id] }));

  const filteredBookings = MOCK_BOOKINGS.filter(b => bookingFilter === 'all' || b.status === bookingFilter);

  if (loading) return (
    <div className="profile-loading">
      <div className="profile-spinner" />
      <p>Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="profile-page">
      {/* animated blobs */}
      <div className="bg-blobs" aria-hidden>
        <div className="blob blob-1" /><div className="blob blob-2" />
      </div>

      <div className="profile-wrapper">
        {/* ── SIDEBAR ── */}
        <aside className="profile-sidebar glass-card">
          {/* avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-ring">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
                alt="avatar"
                className="profile-avatar-img"
              />
              <button className="avatar-cam-btn" title="Change photo"><Camera size={14}/></button>
            </div>
            <h2 className="profile-name">{profile?.name || 'Traveller'}</h2>
            <p className="profile-email">{profile?.email}</p>
            <div className="profile-badge">
              <Star size={12} fill="currentColor"/> Premium Member
            </div>
          </div>

          <nav className="profile-nav">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`profile-nav-item ${tab === id ? 'active' : ''}`}
                onClick={() => setTab(id)}
              >
                <Icon size={17}/>
                <span>{label}</span>
                <ChevronRight size={14} className="nav-arrow"/>
              </button>
            ))}
          </nav>

          <button className="profile-logout-btn" onClick={handleLogout}>
            <LogOut size={16}/> Sign Out
          </button>
        </aside>

        {/* ── MAIN ── */}
        <main className="profile-main">

          {/* ════ 1. PERSONAL INFO ════ */}
          {tab === 'personal' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Personal Information</h1>
                  <p className="section-sub">Manage your name, contact and profile details</p>
                </div>
                <button className="btn-outline" onClick={() => setEditing(!editing)}>
                  <Edit3 size={15}/> {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="info-card glass">
                <div className="info-grid">
                  {[
                    { label: 'Full Name', field: 'name', icon: User },
                    { label: 'Email Address', field: 'email', icon: Mail },
                    { label: 'Phone Number', field: 'phone', icon: Phone },
                  ].map(({ label, field, icon: Icon }) => (
                    <div key={field} className="info-field">
                      <label className="info-label"><Icon size={13}/> {label}</label>
                      {editing ? (
                        <input
                          className="profile-input"
                          value={editForm[field] || ''}
                          onChange={e => setEditForm({ ...editForm, [field]: e.target.value })}
                        />
                      ) : (
                        <span className="info-value">{editForm[field] || <span className="placeholder-text">Not set</span>}</span>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <div className="flex gap-3 mt-6">
                    <button className="btn-primary" onClick={() => { setProfile({ ...profile, ...editForm }); setEditing(false); }}>
                      <Check size={15}/> Save Changes
                    </button>
                    <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                )}
              </div>

              {/* stats row */}
              <div className="stats-row">
                {[
                  { label: 'Trips Taken', value: '7', icon: Plane },
                  { label: 'Countries Visited', value: '4', icon: Globe },
                  { label: 'Wishlist Items', value: wishlist.length, icon: Heart },
                  { label: 'Reward Points', value: '2,840', icon: Star },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="stat-card glass">
                    <Icon size={20} className="stat-icon"/>
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════ 2. SAVED TRAVELERS ════ */}
          {tab === 'travelers' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Saved Travelers</h1>
                  <p className="section-sub">Family members and passengers for quick booking</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddTraveler(true)}>
                  <Plus size={15}/> Add Traveler
                </button>
              </div>

              <div className="travelers-list">
                {travelers.map(t => (
                  <div key={t.id} className="traveler-card glass">
                    <div className="traveler-avatar">
                      {t.name.charAt(0)}
                    </div>
                    <div className="traveler-info">
                      <h3>{t.name}</h3>
                      <span className="relation-badge">{t.relation}</span>
                      <div className="traveler-meta">
                        <span><Calendar size={12}/> DOB: {t.dob}</span>
                        <span><Lock size={12}/> Passport: ••••{t.passport.slice(-3)}</span>
                      </div>
                    </div>
                    <button className="icon-btn danger" onClick={() => setTravelers(travelers.filter(x => x.id !== t.id))}>
                      <Trash2 size={15}/>
                    </button>
                  </div>
                ))}
              </div>

              {showAddTraveler && (
                <div className="add-card glass">
                  <h3 className="add-card-title"><Plus size={16}/> New Traveler</h3>
                  <div className="add-form-grid">
                    {['Full Name','Relation','Date of Birth','Passport Number'].map(f => (
                      <div key={f} className="info-field">
                        <label className="info-label">{f}</label>
                        <input className="profile-input" placeholder={`Enter ${f}`}/>
                      </div>
                    ))}
                  </div>
                  <div className="security-note"><AlertCircle size={13}/> Passport data is encrypted and stored securely</div>
                  <div className="flex gap-3 mt-4">
                    <button className="btn-primary" onClick={() => setShowAddTraveler(false)}><Check size={14}/> Save</button>
                    <button className="btn-outline" onClick={() => setShowAddTraveler(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ════ 3. BOOKING HISTORY ════ */}
          {tab === 'bookings' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Booking History</h1>
                  <p className="section-sub">All your past, upcoming and cancelled trips</p>
                </div>
              </div>

              <div className="booking-filter-tabs">
                {['all','upcoming','completed','cancelled'].map(f => (
                  <button key={f} className={`filter-tab ${bookingFilter === f ? 'active' : ''}`} onClick={() => setBookingFilter(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="bookings-list">
                {filteredBookings.length === 0 && (
                  <div className="empty-state glass">
                    <History size={40}/>
                    <p>No {bookingFilter} bookings found</p>
                  </div>
                )}
                {filteredBookings.map(b => (
                  <div key={b.id} className={`booking-card glass booking-${b.status}`}>
                    <div className="booking-img-wrap">
                      <img src={b.img} alt={b.destination}/>
                      <span className={`booking-status-badge status-${b.status}`}>
                        {b.status === 'upcoming' && <Plane size={11}/>}
                        {b.status === 'completed' && <Check size={11}/>}
                        {b.status === 'cancelled' && <X size={11}/>}
                        {b.status}
                      </span>
                    </div>
                    <div className="booking-body">
                      <h3 className="booking-dest">{b.destination}</h3>
                      <div className="booking-meta">
                        <span><Calendar size={13}/> {new Date(b.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                        <span><Moon size={13}/> {b.nights} nights</span>
                        <span><AlignLeft size={13}/> #{b.id}</span>
                      </div>
                    </div>
                    <div className="booking-right">
                      <span className="booking-price">{b.price}</span>
                      <button className="btn-outline btn-sm">View Details <ChevronRight size={13}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════ 4. PAYMENT METHODS ════ */}
          {tab === 'payment' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Payment Methods</h1>
                  <p className="section-sub">Manage your saved cards and UPI IDs</p>
                </div>
                <button className="btn-primary"><Plus size={15}/> Add Method</button>
              </div>

              <div className="payment-list">
                {cards.map(c => (
                  <div key={c.id} className={`payment-card glass ${c.primary ? 'payment-primary' : ''}`}>
                    <div className="payment-icon-wrap">
                      {c.type === 'UPI' ? <Smartphone size={22}/> : <CreditCard size={22}/>}
                    </div>
                    <div className="payment-info">
                      <div className="payment-top-row">
                        <span className="payment-type">{c.type}</span>
                        {c.primary && <span className="primary-badge">Primary</span>}
                      </div>
                      {c.last4 ? (
                        <span className="payment-number">•••• •••• •••• {c.last4} &nbsp; Exp: {c.expiry}</span>
                      ) : (
                        <span className="payment-number">{c.upi}</span>
                      )}
                    </div>
                    <div className="payment-actions">
                      {c.last4 && (
                        <button className="icon-btn" onClick={() => toggleCVV(c.id)} title="Show CVV">
                          {showCVV[c.id] ? <EyeOff size={15}/> : <Eye size={15}/>}
                        </button>
                      )}
                      <button className="icon-btn danger"><Trash2 size={15}/></button>
                    </div>
                    <div className="payment-secure-line"><Lock size={11}/> Encrypted &amp; Secure</div>
                  </div>
                ))}
              </div>

              <div className="security-note mt-4"><Shield size={13}/> Your payment data is PCI-DSS compliant and never stored in plain text.</div>
            </section>
          )}

          {/* ════ 5. PREFERENCES ════ */}
          {tab === 'prefs' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Preferences</h1>
                  <p className="section-sub">Personalise your travel experience</p>
                </div>
              </div>

              <div className="prefs-grid">
                <div className="pref-card glass">
                  <h3 className="pref-card-title"><Plane size={16}/> Seat Preference</h3>
                  <div className="pref-options">
                    {['window','aisle','middle'].map(s => (
                      <button key={s} className={`pref-chip ${prefs.seat === s ? 'active' : ''}`} onClick={() => setPrefs({ ...prefs, seat: s })}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-card glass">
                  <h3 className="pref-card-title"><Utensils size={16}/> Meal Preference</h3>
                  <div className="pref-options">
                    {['veg','non-veg','vegan','jain'].map(m => (
                      <button key={m} className={`pref-chip ${prefs.meal === m ? 'active' : ''}`} onClick={() => setPrefs({ ...prefs, meal: m })}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pref-card glass">
                  <h3 className="pref-card-title"><Globe size={16}/> Language</h3>
                  <div className="pref-options">
                    {[['en','English'],['hi','हिन्दी'],['mr','मराठी']].map(([k,v]) => (
                      <button key={k} className={`pref-chip ${prefs.lang === k ? 'active' : ''}`} onClick={() => setPrefs({ ...prefs, lang: k })}>{v}</button>
                    ))}
                  </div>
                </div>

                <div className="pref-card glass">
                  <h3 className="pref-card-title"><TrendingUp size={16}/> Currency</h3>
                  <div className="pref-options">
                    {['INR','USD','EUR','GBP'].map(c => (
                      <button key={c} className={`pref-chip ${prefs.currency === c ? 'active' : ''}`} onClick={() => setPrefs({ ...prefs, currency: c })}>{c}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn-primary mt-6"><Check size={15}/> Save Preferences</button>
            </section>
          )}

          {/* ════ 6. WISHLIST ════ */}
          {tab === 'wishlist' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Wishlist</h1>
                  <p className="section-sub">Your saved destinations and dream trips</p>
                </div>
              </div>

              {wishlist.length === 0 && (
                <div className="empty-state glass"><Heart size={40}/><p>Your wishlist is empty. Start exploring!</p></div>
              )}
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div key={item.id} className="wishlist-card glass-card">
                    <div className="wishlist-img-wrap">
                      <img src={item.img} alt={item.name}/>
                      <button className="remove-wish-btn" onClick={() => setWishlist(wishlist.filter(w => w.id !== item.id))}>
                        <X size={14}/>
                      </button>
                      <div className="wish-rating"><Star size={11} fill="currentColor"/> {item.rating}</div>
                    </div>
                    <div className="wishlist-body">
                      <h3>{item.name}</h3>
                      <span className="wish-price">{item.price}</span>
                      <button className="btn-outline btn-sm w-full mt-3" onClick={() => navigate('/explore')}><Bookmark size={13}/> Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════ 7. NOTIFICATIONS ════ */}
          {tab === 'notifs' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Notifications & Alerts</h1>
                  <p className="section-sub">Control how we keep you informed</p>
                </div>
              </div>

              <div className="notif-list">
                {[
                  { key: 'email',       label: 'Email Notifications',  desc: 'Booking confirmations, receipts and updates', icon: Mail },
                  { key: 'sms',         label: 'SMS Alerts',           desc: 'OTP, check-in reminders via text',            icon: Phone },
                  { key: 'priceAlerts', label: 'Price Drop Alerts',    desc: 'Get notified when your wishlist prices drop',  icon: TrendingUp },
                  { key: 'deals',       label: 'Exclusive Deals',      desc: 'Personalised offers and promotions',           icon: Star },
                ].map(({ key, label, desc, icon: Icon }) => (
                  <div key={key} className="notif-row glass">
                    <div className="notif-icon-wrap"><Icon size={18}/></div>
                    <div className="notif-text">
                      <span className="notif-label">{label}</span>
                      <span className="notif-desc">{desc}</span>
                    </div>
                    <button
                      className={`toggle-switch ${notifs[key] ? 'on' : ''}`}
                      onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                    >
                      <span className="toggle-knob"/>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════ 8. SECURITY ════ */}
          {tab === 'security' && (
            <section className="profile-section animate-fade-in">
              <div className="section-header">
                <div>
                  <h1 className="section-title">Security Settings</h1>
                  <p className="section-sub">Protect your account and manage access</p>
                </div>
              </div>

              {/* Change Password */}
              <div className="security-block glass">
                <h3 className="security-block-title"><Lock size={16}/> Change Password</h3>
                <div className="add-form-grid">
                  {[['old','Current Password'],['new','New Password'],['confirm','Confirm Password']].map(([k,lbl]) => (
                    <div key={k} className="info-field">
                      <label className="info-label">{lbl}</label>
                      <div className="pwd-input-wrap">
                        <input className="profile-input" type={showPwd[k] ? 'text' : 'password'} placeholder="••••••••"/>
                        <button className="pwd-eye-btn" onClick={() => setShowPwd(p => ({ ...p, [k]: !p[k] }))}>
                          {showPwd[k] ? <EyeOff size={15}/> : <Eye size={15}/>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-primary mt-4"><Lock size={14}/> Update Password</button>
              </div>

              {/* 2FA */}
              <div className="security-block glass">
                <div className="security-row">
                  <div className="notif-icon-wrap"><Smartphone size={18}/></div>
                  <div className="notif-text">
                    <span className="notif-label">Two-Factor Authentication</span>
                    <span className="notif-desc">Add an extra layer of security with OTP on every login</span>
                  </div>
                  <button className={`toggle-switch ${twoFA ? 'on' : ''}`} onClick={() => setTwoFA(!twoFA)}>
                    <span className="toggle-knob"/>
                  </button>
                </div>
                {twoFA && <div className="security-note mt-3"><Check size={13}/> 2FA enabled — OTP will be sent to your registered number</div>}
              </div>

              {/* Login Activity */}
              <div className="security-block glass">
                <h3 className="security-block-title"><Activity size={16}/> Login Activity</h3>
                <div className="activity-list">
                  {MOCK_ACTIVITY.map((a, i) => (
                    <div key={i} className="activity-row">
                      <div className={`activity-dot ${a.current ? 'active' : ''}`}/>
                      <div className="activity-info">
                        <span className="activity-device">{a.device} {a.current && <span className="current-badge">Current</span>}</span>
                        <span className="activity-meta">{a.location} · {a.date}</span>
                      </div>
                      {!a.current && <button className="btn-outline btn-sm danger-outline">Revoke</button>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
