import { MapPin, Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 py-12 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-primary w-6 h-6" />
            <span className="text-2xl font-bold outfit">YatriCheck</span>
          </div>
          <p className="text-text-muted max-w-2xl mx-auto">
            Your ultimate companion for planning unforgettable journeys. Explore destinations, book packages, and manage your trips with ease.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-4 flex flex-col items-center text-center">
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="flex flex-wrap justify-center gap-12 text-text-muted text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col items-center text-center">
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-all"><Globe size={20} /></a>
            <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-all"><Mail size={20} /></a>
            <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-all"><Phone size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 text-sm text-text-muted">
        © 2024 YatriCheck. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
