import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User, Heart } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl px-6 py-3 flex items-center justify-between z-50">
      <Link to="/home" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <MapPin className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight outfit">YatriCheck</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium text-sm">
        <Link to="/home" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
        <Link to="/profile" className="hover:text-primary transition-colors">My Trips</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors"
        >
          Login / Signup
        </Link>
        
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
