import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, Loader2 } from 'lucide-react';
import { Page } from '../App';

interface EmergencyProps {
  onNavigate?: (page: Page) => void;
}

const Emergency: React.FC<EmergencyProps> = ({ onNavigate }) => {
  const [isCalling, setIsCalling] = useState(false);

  const handleCallSupport = () => {
      setIsCalling(true);
      // Simulate call duration
      setTimeout(() => {
          setIsCalling(false);
      }, 3000);
  };

  return (
    <section id="emergency" className="py-12 px-4 relative">
      {isCalling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
              <div className="text-center text-white">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <PhoneCall className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Calling Support...</h3>
                  <p className="text-slate-300">+1-800-BLOOD-HELP</p>
                  <button onClick={() => setIsCalling(false)} className="mt-8 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-sm font-medium">
                      Cancel Call
                  </button>
              </div>
          </div>
      )}

      <div className="max-w-5xl mx-auto bg-red-600 rounded-3xl shadow-2xl shadow-red-500/40 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-500 rounded-full opacity-5 animate-pulse" style={{ animationDuration: '4s' }}></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Need blood urgently?</h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            If you’re in a critical situation, raise a request here. We’ll help you reach donors who match the blood group.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('emergency')}
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Raise Emergency Request
            </button>
             <button 
                onClick={handleCallSupport}
                className="bg-red-700 text-white hover:bg-red-800 border border-red-500 px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
             >
              <PhoneCall className="w-5 h-5" />
              Call Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;