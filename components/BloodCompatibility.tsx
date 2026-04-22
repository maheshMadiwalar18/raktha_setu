import React, { useState } from 'react';
import { Droplet, ArrowRight, HeartPulse } from 'lucide-react';

const compatibilityData = {
  'A+': { gives: ['A+', 'AB+'], receives: ['A+', 'A-', 'O+', 'O-'] },
  'O+': { gives: ['O+', 'A+', 'B+', 'AB+'], receives: ['O+', 'O-'] },
  'B+': { gives: ['B+', 'AB+'], receives: ['B+', 'B-', 'O+', 'O-'] },
  'AB+': { gives: ['AB+'], receives: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  'A-': { gives: ['A+', 'A-', 'AB+', 'AB-'], receives: ['A-', 'O-'] },
  'O-': { gives: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], receives: ['O-'] },
  'B-': { gives: ['B+', 'B-', 'AB+', 'AB-'], receives: ['B-', 'O-'] },
  'AB-': { gives: ['AB+', 'AB-'], receives: ['AB-', 'A-', 'B-', 'O-'] }
};

const bloodTypes = Object.keys(compatibilityData);

const BloodCompatibility: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('O+');

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
      {/* Decorative blobs for modern aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-red-500 font-bold tracking-wider uppercase text-xs mb-1 block">Interactive Tool</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-2">
             Blood Compatibility Matrix
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Select a blood type to instantly see who can donate to whom. Understanding compatibility is the first step to saving a life!
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-red-900/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-red-500/10 hover:bg-white/80">
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`relative px-4 py-2 rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-2 transform ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 scale-105 z-10'
                    : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-200 shadow-sm hover:-translate-y-0.5'
                }`}
              >
                <Droplet className={`w-4 h-4 ${selectedType === type ? 'fill-current' : ''}`} />
                {type}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative">
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-lg border border-red-50 z-20 items-center justify-center">
               <ArrowRight className="w-5 h-5 text-red-400" />
            </div>

            {/* Gives To */}
            <div className="bg-gradient-to-br from-white to-red-50/50 p-5 rounded-2xl border border-red-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-md text-red-600">
                   <HeartPulse className="w-4 h-4" />
                </div>
                You Can Give To
              </h3>
              <div className="flex flex-wrap gap-2">
                {compatibilityData[selectedType as keyof typeof compatibilityData].gives.map(type => (
                  <span key={type} className="px-3 py-1.5 bg-white text-red-600 font-bold rounded-lg shadow-sm border border-red-100 text-sm">
                    {type}
                  </span>
                ))}
              </div>
              {selectedType === 'O-' && (
                <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <span className="text-xl leading-none mt-0.5">🌟</span>
                  <p className="text-sm text-green-800 font-medium"><strong>Universal Donor!</strong><br/>Your blood can save almost anyone unconditionally in emergency scenarios.</p>
                </div>
              )}
            </div>

            {/* Receives From */}
            <div className="bg-gradient-to-br from-white to-rose-50/50 p-5 rounded-2xl border border-rose-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 rounded-md text-rose-600">
                    <Droplet className="w-4 h-4 fill-current" />
                </div>
                You Can Receive From
              </h3>
              <div className="flex flex-wrap gap-2">
                {compatibilityData[selectedType as keyof typeof compatibilityData].receives.map(type => (
                  <span key={type} className="px-3 py-1.5 bg-white text-rose-600 font-bold rounded-lg shadow-sm border border-rose-100 text-sm">
                    {type}
                  </span>
                ))}
              </div>
               {selectedType === 'AB+' && (
                <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                  <span className="text-xl leading-none mt-0.5">🛡️</span>
                  <p className="text-sm text-blue-800 font-medium"><strong>Universal Recipient!</strong><br/>You are incredibly lucky. You can receive blood from any blood type safely.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodCompatibility;
