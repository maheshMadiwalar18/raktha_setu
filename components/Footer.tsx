import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RakhtSetuLogo = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2C16 2 6 12 6 19C6 24.5228 10.4772 29 16 29C21.5228 29 26 24.5228 26 19C26 12 16 2 16 2Z" fill="#ef4444" />
    <path d="M8.5 22C10.5 19.5 13 18 16 18C19 18 21.5 19.5 23.5 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <RakhtSetuLogo className="h-6 w-6" />
              <span className="font-bold text-lg tracking-tight">
                Rakht<span className="text-brand-500">Setu</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Bridging the gap between donors and those in need. Join our mission to ensure no life is lost due to blood shortage.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link to="/register" className="hover:text-brand-500 transition-colors">Donate Blood</Link></li>
              <li><Link to="/emergency" className="hover:text-brand-500 transition-colors">Emergency Request</Link></li>
              <li><Link to="/find-donors" className="hover:text-brand-500 transition-colors">Find Donors</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Support</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/help" className="hover:text-brand-500 transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-brand-500 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h4 className="text-white font-bold text-sm mb-3">Contact Us</h4>
             <ul className="space-y-2 text-xs">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>#42, 100 Feet Rd, Indiranagar, Bangalore, Karnataka 560038</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                  <span>help@rakhtsetu.com</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>
            &copy; {new Date().getFullYear()} RakhtSetu Platform. All rights reserved. 
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline mt-1 sm:mt-0">
               by <a href="https://www.linkedin.com/in/mahesh-r-madiwalar-9a468b345/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors font-medium">code_bloodie</a>
            </span>
          </p>
          <div className="flex gap-6">
            <Link 
              to="/admin"
              className="flex items-center gap-2 hover:text-brand-500 transition-colors"
            >
              <Lock className="w-3 h-3" /> Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;