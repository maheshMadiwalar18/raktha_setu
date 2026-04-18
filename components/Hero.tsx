import React from 'react';
import { Heart, Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-brand-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Urgent Need: A+ and O- Donors in Bangalore
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Donate Blood, <br className="hidden lg:block" />
              <span className="text-brand-600">Save Lives Today</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Join thousands of donors across the country. Register to donate, find emergency requirements near you, or request blood for a loved one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/register')}
                className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
              >
                <Heart className="h-5 w-5" />
                Register as Donor
              </button>
              <button 
                onClick={() => navigate('/emergency')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-lg font-semibold transition-colors"
              >
                Request Blood
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
               <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="Donor 1" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="Donor 2" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" alt="Donor 3" />
               </div>
               <p><span className="font-semibold text-slate-700">10,000+</span> donors joined</p>
            </div>
          </div>

          {/* Simple Image Hero */}
          <div className="relative hidden lg:block rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80" 
              alt="Blood Donation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-xl text-white inline-block w-max">
                <div className="flex items-center gap-3">
                  <div className="bg-white/30 p-2 rounded-full">
                     <Droplet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/80">Latest Update</p>
                    <p className="text-sm font-bold">100+ requests resolved today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
