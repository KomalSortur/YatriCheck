import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Explore from './pages/Explore';
import PackageDetails from './pages/PackageDetails';
import Booking from './pages/Booking';
import Profile from './pages/Profile';

// Layout wrapper to handle Navbar/Footer visibility
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // We only hide the Navbar/Footer on the Login page (/)
  const isLoginPage = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main">
      {!isLoginPage && <Navbar />}
      
      {/* Persistent Back Button - Positioned below Navbar */}
      {!isLoginPage && (
        <div className="back-btn-wrapper">
          <button 
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* LOGIN IS THE FIRST PAGE (ROOT) */}
          <Route path="/" element={<Login />} />
          
          {/* HOME PAGE COMES AFTER LOGIN */}
          <Route path="/home" element={<Home />} />
          
          <Route path="/explore" element={<Explore />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
