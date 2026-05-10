import { useState, useEffect } from 'react';
import {
  CheckCircle, ArrowRight, Download, Share2, Mail,
  Phone, MapPin, Calendar, Clock, Users, Plane,
  Hotel, Compass, CreditCard, Shield, Copy,
  ChevronRight, Star, Headphones, AlertCircle,
  Printer, ExternalLink, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import './Booking.css';

/* ── demo data shown when no real booking exists ── */
const DEMO = {
  bookingId: 'YTC-847291',
  destination: 'Maldives — North Malé Atoll',
  status: 'Confirmed',
  totalPaid: '₹89,999',
  travelDate: '2026-06-10',
  returnDate: '2026-06-15',
  duration: '5 Nights / 6 Days',
  travelers: 2,
  flight: {
    airline: 'IndiGo 6E-204',
    depart: 'BOM → MLE  |  10:30 AM',
    arrive: 'Arrives 14:45 PM (local)',
    returnFlight: 'MLE → BOM  |  16:00 PM',
    class: 'Economy',
    baggage: '20 kg check-in',
    pnr: 'PQ7R2X',
  },
  hotel: {
    name: 'Sun Siyam Olhuveli',
    stars: 5,
    location: 'South Malé Atoll',
    checkIn: '2026-06-10',
    checkOut: '2026-06-15',
    room: 'Water Villa with Pool',
    board: 'All Inclusive',
    confirmation: 'HTL-220491',
  },
  activities: [
    { name: 'Sunset Dolphin Cruise', date: '2026-06-11', time: '05:30 PM', included: true },
    { name: 'Snorkelling at Coral Garden', date: '2026-06-12', time: '09:00 AM', included: true },
    { name: 'Spa Session (60 min)', date: '2026-06-13', time: '11:00 AM', included: false },
  ],
  payment: {
    basePrice: '₹74,999',
    taxes: '₹8,000',
    serviceFee: '₹2,000',
    discount: '-₹5,000',
    total: '₹89,999',
    method: 'Visa •••• 4242',
    paidOn: '2026-05-04',
  },
  support: {
    email: 'support@yatricheck.com',
    phone: '+91 98765 43210',
    hours: '24 × 7',
  },
};

export default function Booking() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    api.getMyBookings()
      .then(list => { if (list.length > 0) setBooking(list[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* use real booking fields if available, else demo */
  const d = {
    bookingId:   booking?.bookingId   || DEMO.bookingId,
    destination: booking?.package?.title || DEMO.destination,
    status:      booking?.status      || DEMO.status,
    totalPaid:   booking?.totalPaid   || DEMO.totalPaid,
    travelDate:  booking?.date        || DEMO.travelDate,
  };

  const copyRef = () => {
    navigator.clipboard.writeText(d.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="bc-loading">
      <div className="bc-spinner" />
      <p>Loading your confirmation…</p>
    </div>
  );

  return (
    <div className="bc-page">
      {/* animated blobs */}
      <div className="bg-blobs" aria-hidden>
        <div className="blob blob-1" /><div className="blob blob-2" />
      </div>

      <div className="bc-wrapper">

        {/* ══ HERO: CONFIRMATION BANNER ══ */}
        <div className="bc-hero glass-card">
          {/* top accent line */}
          <div className="bc-hero-accent" />

          <div className="bc-hero-icon-wrap">
            <div className="bc-hero-ring">
              <CheckCircle className="bc-hero-icon" />
            </div>
            <div className="bc-confetti-dots" aria-hidden>
              {[...Array(8)].map((_, i) => <span key={i} className={`dot dot-${i}`} />)}
            </div>
          </div>

          <div className="bc-hero-text">
            <div className="bc-confirmed-badge">
              <Check size={13} /> Booking Confirmed
            </div>
            <h1 className="bc-hero-title">You're all set! 🎉</h1>
            <p className="bc-hero-sub">
              Your trip to <strong>{d.destination}</strong> has been successfully booked.
              A confirmation email has been sent to your registered address.
            </p>
          </div>

          {/* Booking reference */}
          <div className="bc-ref-box glass">
            <div className="bc-ref-left">
              <span className="bc-ref-label">Booking Reference</span>
              <span className="bc-ref-num">{d.bookingId}</span>
            </div>
            <button className="bc-copy-btn" onClick={copyRef} title="Copy reference">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Total price */}
          <div className="bc-total-banner">
            <span className="bc-total-label">Total Amount Paid</span>
            <span className="bc-total-price">{d.totalPaid}</span>
            <span className="bc-status-pill">
              <Shield size={12} /> {d.status}
            </span>
          </div>
        </div>

        {/* ══ CONTENT GRID ══ */}
        <div className="bc-grid">

          {/* LEFT COLUMN */}
          <div className="bc-left">

            {/* Trip Summary */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><MapPin size={18} /> Trip Summary</h2>
              <div className="bc-summary-grid">
                <div className="bc-summary-item">
                  <span className="bc-item-label"><MapPin size={12}/> Destination</span>
                  <span className="bc-item-val">{d.destination}</span>
                </div>
                <div className="bc-summary-item">
                  <span className="bc-item-label"><Calendar size={12}/> Travel Date</span>
                  <span className="bc-item-val">
                    {new Date(d.travelDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                  </span>
                </div>
                <div className="bc-summary-item">
                  <span className="bc-item-label"><Calendar size={12}/> Return Date</span>
                  <span className="bc-item-val">
                    {new Date(DEMO.returnDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                  </span>
                </div>
                <div className="bc-summary-item">
                  <span className="bc-item-label"><Clock size={12}/> Duration</span>
                  <span className="bc-item-val">{DEMO.duration}</span>
                </div>
                <div className="bc-summary-item">
                  <span className="bc-item-label"><Users size={12}/> Travellers</span>
                  <span className="bc-item-val">{DEMO.travelers} Adults</span>
                </div>
                <div className="bc-summary-item">
                  <span className="bc-item-label"><CreditCard size={12}/> Status</span>
                  <span className="bc-item-val bc-green">{d.status}</span>
                </div>
              </div>
            </section>

            {/* Flight Details */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><Plane size={18}/> Flight Details</h2>
              <div className="bc-flight-card glass">
                <div className="bc-flight-row">
                  <div>
                    <span className="bc-detail-label">Airline / Flight</span>
                    <span className="bc-detail-val">{DEMO.flight.airline}</span>
                  </div>
                  <span className="bc-pnr-badge">PNR: {DEMO.flight.pnr}</span>
                </div>
                <div className="bc-flight-route">
                  <div className="bc-route-point">
                    <span className="bc-route-code">BOM</span>
                    <span className="bc-route-sub">Mumbai</span>
                  </div>
                  <div className="bc-route-line">
                    <Plane size={16} className="bc-plane-icon" />
                  </div>
                  <div className="bc-route-point right">
                    <span className="bc-route-code">MLE</span>
                    <span className="bc-route-sub">Malé</span>
                  </div>
                </div>
                <div className="bc-meta-row">
                  {[
                    ['Depart', DEMO.flight.depart],
                    ['Arrive', DEMO.flight.arrive],
                    ['Class', DEMO.flight.class],
                    ['Baggage', DEMO.flight.baggage],
                  ].map(([k,v]) => (
                    <div key={k} className="bc-meta-item">
                      <span className="bc-detail-label">{k}</span>
                      <span className="bc-detail-val">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="bc-return-flight">
                  <Plane size={14} className="bc-plane-return" /> Return: {DEMO.flight.returnFlight}
                </div>
              </div>
            </section>

            {/* Hotel Details */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><Hotel size={18}/> Hotel Details</h2>
              <div className="bc-hotel-card glass">
                <div className="bc-hotel-top">
                  <div>
                    <h3 className="bc-hotel-name">{DEMO.hotel.name}</h3>
                    <div className="bc-stars">
                      {[...Array(DEMO.hotel.stars)].map((_, i) => <Star key={i} size={13} fill="#fbbf24" color="#fbbf24"/>)}
                    </div>
                    <span className="bc-detail-label"><MapPin size={11}/> {DEMO.hotel.location}</span>
                  </div>
                  <span className="bc-confirm-badge">#{DEMO.hotel.confirmation}</span>
                </div>
                <div className="bc-meta-row">
                  {[
                    ['Check-In', new Date(DEMO.hotel.checkIn).toLocaleDateString('en-IN', { day:'numeric', month:'short' })],
                    ['Check-Out', new Date(DEMO.hotel.checkOut).toLocaleDateString('en-IN', { day:'numeric', month:'short' })],
                    ['Room Type', DEMO.hotel.room],
                    ['Board', DEMO.hotel.board],
                  ].map(([k,v]) => (
                    <div key={k} className="bc-meta-item">
                      <span className="bc-detail-label">{k}</span>
                      <span className="bc-detail-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Activities */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><Compass size={18}/> Activities &amp; Experiences</h2>
              <div className="bc-activity-list">
                {DEMO.activities.map((a, i) => (
                  <div key={i} className="bc-activity-row glass">
                    <div className="bc-act-icon-wrap">
                      <Compass size={16}/>
                    </div>
                    <div className="bc-act-info">
                      <span className="bc-act-name">{a.name}</span>
                      <span className="bc-act-meta">
                        <Calendar size={11}/> {new Date(a.date).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                        &nbsp;&nbsp;<Clock size={11}/> {a.time}
                      </span>
                    </div>
                    <span className={`bc-act-badge ${a.included ? 'included' : 'optional'}`}>
                      {a.included ? 'Included' : 'Optional'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bc-right">

            {/* Payment Summary */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><CreditCard size={18}/> Payment Summary</h2>
              <div className="bc-payment-rows">
                {[
                  ['Base Price (2 adults)', DEMO.payment.basePrice, false],
                  ['Taxes &amp; Fees', DEMO.payment.taxes, false],
                  ['Service Fee', DEMO.payment.serviceFee, false],
                  ['Discount Applied', DEMO.payment.discount, 'disc'],
                ].map(([label, val, cls]) => (
                  <div key={label} className="bc-pay-row">
                    <span className="bc-pay-label" dangerouslySetInnerHTML={{ __html: label }} />
                    <span className={`bc-pay-val ${cls === 'disc' ? 'bc-green' : ''}`}>{val}</span>
                  </div>
                ))}
                <div className="bc-pay-divider" />
                <div className="bc-pay-row total">
                  <span className="bc-pay-label">Total Paid</span>
                  <span className="bc-pay-val total">{DEMO.payment.total}</span>
                </div>
              </div>
              <div className="bc-pay-method glass">
                <CreditCard size={15}/>
                <span>Paid via {DEMO.payment.method}</span>
                <span className="bc-pay-date">on {new Date(DEMO.payment.paidOn).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>
              <div className="bc-secure-note">
                <Shield size={12}/> Your payment is 100% secure and PCI-DSS compliant
              </div>
            </section>

            {/* Next Steps */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><ChevronRight size={18}/> Next Steps</h2>
              <ol className="bc-steps">
                {[
                  ['Check your email', 'Confirmation voucher sent to your registered email address.'],
                  ['Download e-ticket', 'Save your booking confirmation PDF for offline access.'],
                  ['Check-in online', 'Web check-in opens 48 hours before departure.'],
                  ['Arrive early', 'Reach the airport at least 3 hours before departure.'],
                  ['Enjoy your trip', 'Our support team is available 24×7 if you need help.'],
                ].map(([step, desc], i) => (
                  <li key={i} className="bc-step">
                    <div className="bc-step-num">{i + 1}</div>
                    <div>
                      <span className="bc-step-title">{step}</span>
                      <span className="bc-step-desc">{desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Contact & Support */}
            <section className="bc-section glass-card">
              <h2 className="bc-sec-title"><Headphones size={18}/> Contact &amp; Support</h2>
              <div className="bc-support-rows">
                <a href={`mailto:${DEMO.support.email}`} className="bc-support-item glass">
                  <Mail size={18} className="bc-support-icon" />
                  <div>
                    <span className="bc-support-label">Email Support</span>
                    <span className="bc-support-val">{DEMO.support.email}</span>
                  </div>
                  <ExternalLink size={14} className="bc-ext-icon"/>
                </a>
                <a href={`tel:${DEMO.support.phone}`} className="bc-support-item glass">
                  <Phone size={18} className="bc-support-icon" />
                  <div>
                    <span className="bc-support-label">Phone Support</span>
                    <span className="bc-support-val">{DEMO.support.phone}</span>
                  </div>
                  <ExternalLink size={14} className="bc-ext-icon"/>
                </a>
                <div className="bc-support-item glass">
                  <AlertCircle size={18} className="bc-support-icon" />
                  <div>
                    <span className="bc-support-label">Available</span>
                    <span className="bc-support-val">{DEMO.support.hours} — All days</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="bc-actions">
              <button className="bc-btn-primary" onClick={() => navigate('/profile')}>
                <Users size={17}/> My Trips Dashboard <ArrowRight size={17}/>
              </button>
              <button className="bc-btn-outline" onClick={() => window.print()}>
                <Printer size={17}/> Print Confirmation
              </button>
              <button className="bc-btn-outline" onClick={() => {}}>
                <Download size={17}/> Download E-Ticket
              </button>
              <button className="bc-btn-outline" onClick={() => navigate('/explore')}>
                <Compass size={17}/> Explore More Trips
              </button>
              <button className="bc-btn-ghost">
                <Share2 size={15}/> Share this trip
              </button>
            </section>

            {/* Visual Reassurance */}
            <div className="bc-reassurance glass">
              <div className="bc-reassure-item">
                <Shield size={20} className="bc-reassure-icon green"/>
                <span>Secure Payment</span>
              </div>
              <div className="bc-reassure-item">
                <CheckCircle size={20} className="bc-reassure-icon blue"/>
                <span>Verified Booking</span>
              </div>
              <div className="bc-reassure-item">
                <Headphones size={20} className="bc-reassure-icon purple"/>
                <span>24×7 Support</span>
              </div>
              <div className="bc-reassure-item">
                <Mail size={20} className="bc-reassure-icon orange"/>
                <span>Email Confirmed</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
