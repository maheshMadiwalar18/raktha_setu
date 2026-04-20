import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Emergency: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="emergency" className="py-12 px-4 relative">

      <div className="max-w-5xl mx-auto bg-red-600 rounded-3xl shadow-2xl shadow-red-500/40 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Simple background pattern instead of pulsing rings */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

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
              onClick={() => navigate('/emergency')}
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform flex items-center justify-center gap-2"
            >
              Raise Emergency Request
            </button>
             <a 
                href="tel:104"
                className="bg-red-700 text-white hover:bg-red-800 border border-red-500 px-8 py-4 rounded-xl font-bold text-lg transition-transform flex items-center justify-center gap-2"
             >
              <PhoneCall className="w-5 h-5" />
              Call 104 (Health Helpline)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;