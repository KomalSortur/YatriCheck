import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore' },
    { name: 'Package', path: '/explore' },
    { name: 'Booking confirmation', path: '/booking' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="navbar-main">
      {/* Brand Logo */}
      <Link to="/home" className="nav-brand">
        <div className="nav-logo-icon">
          <MapPin className="text-white w-5 h-5" />
        </div>
        <span>YatraCheck</span>
      </Link>

      {/* Centered Navigation Capsule */}
      <div className="nav-capsule">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => 
              `nav-link-item ${isActive ? 'active' : ''}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Right Side Action */}
      <div className="nav-actions">
        <button 
          onClick={() => navigate('/')}
          className="nav-logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

