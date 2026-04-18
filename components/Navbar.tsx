import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, LogIn, LogOut, User, Zap, HeartHandshake, AlertTriangle } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%23e2e8f0'/%3E%3Cpath d='M48 48c8.8 0 16-7.2 16-16S56.8 16 48 16s-16 7.2-16 16 7.2 16 16 16zm0 8c-14.4 0-26 9.6-26 21.3V80h52v-2.7C74 65.6 62.4 56 48 56z' fill='%2394a3b8'/%3E%3C/svg%3E";

interface NavbarProps {}

// Custom Logo Component: Blood Drop forming a Bridge
const RakhtSetuLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2C16 2 6 12 6 19C6 24.5228 10.4772 29 16 29C21.5228 29 26 24.5228 26 19C26 12 16 2 16 2Z" fill="#dc2626" />
    <path d="M8.5 22C10.5 19.5 13 18 16 18C19 18 21.5 19.5 23.5 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [isKannada, setIsKannada] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsKannada((prev) => !prev);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    if (target.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      if (currentPage !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const element = document.querySelector(target);
         element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-red-50 p-1.5 rounded-full group-hover:bg-red-100 transition-colors">
              <RakhtSetuLogo className="h-8 w-8 animate-pulse-slow" />
            </div>
            
            {/* Rotating Logo Text */}
            <div className="relative h-8 w-40 overflow-hidden flex items-center">
               <span className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out font-bold text-2xl tracking-tight text-slate-900 transform ${isKannada ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                  Rakht<span className="text-brand-600">Setu</span>
               </span>
               <span className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out font-bold text-2xl tracking-tight text-slate-900 transform ${isKannada ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                  ರಕ್ತ<span className="text-brand-600">ಸೇತು</span>
               </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className={`font-medium transition-colors ${currentPage === '/' ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>Home</Link>
            <Link to="/find-donors" className={`font-medium transition-colors ${currentPage === '/find-donors' ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>Find Donors</Link>
            <Link to="/campaigns" className={`font-medium transition-colors ${currentPage === '/campaigns' ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>Campaigns</Link>
            <Link to="/emergency" className={`font-medium transition-colors flex items-center gap-1 ${currentPage === '/emergency' ? 'text-red-600' : 'text-red-500 hover:text-red-700'}`}>
               Emergency Request
            </Link>
            <a href="#why-donate" onClick={(e) => handleNavClick(e, '#why-donate')} className="font-medium text-slate-600 hover:text-brand-600 transition-colors">Why Donate</a>
            
            {isAuthenticated ? (
               <div className="flex items-center gap-4 ml-2">
                 {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg transition-colors ${currentPage.startsWith('/admin') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin
                    </Link>
                 )}
                 <div className="relative group">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all bg-white"
                    >
                       <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }} />
                       <span className="font-bold text-sm text-slate-700 max-w-[100px] truncate">{user?.name}</span>
                    </button>
                    {/* Dropdown for logout */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                       <div className="p-1">
                          <Link to="/dashboard" className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                             <User className="w-4 h-4" /> Dashboard
                          </Link>
                          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                             <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
            ) : (
               <div className="flex items-center gap-3 ml-2">
                  <Link 
                    to="/login"
                    className="font-bold text-slate-700 hover:text-brand-600 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register"
                    className="bg-brand-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4" /> Donate
                  </Link>
               </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-slideDown shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Home</Link>
            <Link to="/find-donors" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Find Donors</Link>
            <Link to="/campaigns" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Campaigns</Link>
            <Link to="/emergency" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-red-600 hover:bg-red-50">Emergency Request</Link>
            <a href="#why-donate" onClick={(e) => handleNavClick(e, '#why-donate')} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Why Donate</a>
            {isAuthenticated ? (
               <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">My Dashboard</Link>
                  {user?.role === 'admin' && (
                     <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
               </>
            ) : (
               <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 px-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full inline-block text-center py-3 border border-slate-200 rounded-xl font-bold text-slate-700">Log In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="w-full inline-block text-center py-3 bg-brand-600 text-white rounded-xl font-bold">Donate Now</Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
