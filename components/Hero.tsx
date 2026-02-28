
import React, { useState, useEffect } from 'react';
import { Heart, Activity, Droplet } from 'lucide-react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const headlines = [
  {
    line1: "Your Blood Can",
    highlight: "Save a Life",
    line2: "Today",
    kannada: "ನಿಮ್ಮ ರಕ್ತವೇ ಯಾರಿಗೋ ಹೊಸ ಜೀವನದ ಸೇತುವೆ."
  },
  {
    line1: "Be a Hero",
    highlight: "For Someone",
    line2: "In Need",
    kannada: "ಅಗತ್ಯವಿರುವವರಿಗೆ ನೀವಾಗಬಲ್ಲಿರಿ ಆಪದ್ಬಾಂಧವ."
  },
  {
    line1: "One Donation Can",
    highlight: "Save Three",
    line2: "Lives",
    kannada: "ಒಂದು ರಕ್ತದಾನ, ಉಳಿಸಬಹುದು ಮೂರು ಪ್ರಾಣ."
  },
  {
    line1: "Join the Movement",
    highlight: "Of Lifesavers",
    line2: "Now",
    kannada: "ಜೀವ ಉಳಿಸುವ ಪುಣ್ಯಕಾರ್ಯದಲ್ಲಿ ಕೈಜೋಡಿಸಿ."
  }
];

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeTicker, setActiveTicker] = useState(0);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  
  const tickers = [
    "Amit donated in Delhi a few minutes ago",
    "Emergency request matched in Mumbai",
    "New donation camp starting in Bangalore",
    "Priya donated today — thank you!",
    "St. Mary's Hospital needs O+ donors"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTicker((prev) => (prev + 1) % tickers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentData = headlines[currentHeadline];

  return (
    <section className="relative pt-10 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-brand-700 text-sm font-semibold mb-2 opacity-0 animate-fadeInUp">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              Urgent Need: A+ and O- Donors
            </div>
            
            {/* Dynamic Headlines Area */}
            <div className="min-h-[220px] lg:min-h-[280px] flex flex-col justify-center">
                <div key={currentHeadline} className="animate-fadeIn">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
                      {currentData.line1} <br className="hidden lg:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-rose-500">
                        {currentData.highlight}
                      </span> {currentData.line2}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-600 leading-tight">
                        {currentData.kannada}
                    </h2>
                </div>
            </div>
            
            <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                When you donate, you’re helping someone’s family get through a hard day. Register as a donor, find a camp near you, or raise an emergency request.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <button 
                onClick={() => onNavigate('register')}
                className="group relative flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-2">
                   <Heart className="h-5 w-5 fill-white animate-heartbeat" />
                   Donate Blood
                </div>
              </button>
              <button 
                onClick={() => onNavigate('emergency')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:border-brand-200 hover:text-brand-600"
              >
                <Activity className="h-5 w-5" />
                Request Blood
              </button>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
               <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&h=100" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&w=100&h=100" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&h=100" alt="User" />
                  <div className="h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs">+2k</div>
               </div>
               <p>People joined this week</p>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative hidden lg:block h-[500px] w-full animate-fadeIn" style={{ animationDuration: '1.5s' }}>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>

            {/* Main Illustration Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                
                {/* The Heart "Bag" */}
                <div className="relative z-10 animate-float">
                     {/* Bag Handle */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-16 bg-red-200 rounded-full opacity-50"></div>
                     
                     {/* Heart Shape */}
                     <div className="relative w-64 h-64">
                        <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-2xl text-brand-600">
                           <defs>
                              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#991b1b" />
                              </linearGradient>
                           </defs>
                           <path fill="url(#heartGradient)" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                           
                           {/* Glossy Reflection */}
                           <path fill="white" fillOpacity="0.15" d="M7.5 3c-3.08 0-5.5 2.42-5.5 5.5 0 2.5 1.5 4.8 3.5 6.5C5.1 14.1 4.5 12.5 4.5 10.5c0-3.08 2.42-5.5 5.5-5.5 1.5 0 2.8.8 3.5 2 .5-1.8-1.5-4-6-4z"/>
                        </svg>
                        
                        {/* Label */}
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-[2px] border border-white/20 px-5 py-2 rounded-2xl shadow-inner">
                                <span className="text-white font-bold text-4xl tracking-widest drop-shadow-md">O+</span>
                            </div>
                         </div>
                     </div>
                </div>

                {/* Tube Connection */}
                <div className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none -z-10">
                    <svg className="w-full h-full overflow-visible">
                        <path 
                            d="M 50 50 Q 50 150 150 220" 
                            transform="translate(-30, 50)"
                            fill="none" 
                            stroke="#ef4444" 
                            strokeWidth="6" 
                            strokeLinecap="round"
                            className="opacity-30"
                            strokeDasharray="10 10"
                        />
                    </svg>
                </div>

                {/* Donor Card (Bottom Right) */}
                <div className="absolute bottom-12 -right-0 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&h=100" alt="Donor" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Hero of the day</p>
                            <p className="font-bold text-slate-900">Aarav Patel</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                         <div className="flex justify-between text-xs font-semibold text-slate-500">
                            <span>Donating...</span>
                            <span>80%</span>
                         </div>
                         <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 rounded-full w-[80%] animate-pulse"></div>
                         </div>
                    </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-10 left-0 bg-white p-3 rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                     <Heart className="w-6 h-6 text-brand-500 fill-brand-500 animate-heartbeat" />
                </div>
                <div className="absolute bottom-40 -left-10 bg-red-100 p-3 rounded-full animate-pulse">
                     <Droplet className="w-4 h-4 text-red-500 fill-red-500" />
                </div>
                <div className="absolute top-1/3 right-0 bg-white/80 backdrop-blur p-2 rounded-lg shadow-sm animate-float" style={{ animationDelay: '0.5s' }}>
                     <Activity className="w-5 h-5 text-emerald-500" />
                </div>
            </div>
          </div>
        </div>

        {/* Live Activity Ticker */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4 hidden lg:block">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/50 flex items-center justify-center gap-3 animate-fadeInUp">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span key={activeTicker} className="text-sm font-medium text-slate-700 truncate animate-fadeIn">
                    {tickers[activeTicker]}
                </span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
