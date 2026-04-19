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
    <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
      {/* Decorative blobs for modern aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-500 font-bold tracking-wider uppercase text-sm mb-2 block">Interactive Tool</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 flex items-center justify-center gap-3">
             Blood Compatibility Matrix
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Select a blood type to instantly see who can donate to whom. Understanding compatibility is the first step to saving a life!
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-red-900/5 rounded-[2rem] p-8 md:p-12 transition-all duration-500 hover:shadow-red-500/10 hover:bg-white/80">
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`relative px-6 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-2 transform ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl shadow-red-500/30 scale-110 z-10'
                    : 'bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-200 shadow-sm hover:-translate-y-1'
                }`}
              >
                <Droplet className={`w-5 h-5 ${selectedType === type ? 'fill-current' : ''}`} />
                {type}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg border border-red-50 z-20 items-center justify-center">
               <ArrowRight className="w-8 h-8 text-red-400" />
            </div>

            {/* Gives To */}
            <div className="bg-gradient-to-br from-white to-red-50/50 p-8 rounded-3xl border border-red-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                   <HeartPulse className="w-6 h-6" />
                </div>
                You Can Give To
              </h3>
              <div className="flex flex-wrap gap-3">
                {compatibilityData[selectedType as keyof typeof compatibilityData].gives.map(type => (
                  <span key={type} className="px-5 py-3 bg-white text-red-600 font-bold rounded-xl shadow-sm border border-red-100 text-lg">
                    {type}
                  </span>
                ))}
              </div>
              {selectedType === 'O-' && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">🌟</span>
                  <p className="text-base text-green-800 font-medium"><strong>Universal Donor!</strong><br/>Your blood can save almost anyone unconditionally in emergency scenarios.</p>
                </div>
              )}
            </div>

            {/* Receives From */}
            <div className="bg-gradient-to-br from-white to-rose-50/50 p-8 rounded-3xl border border-rose-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                    <Droplet className="w-6 h-6 fill-current" />
                </div>
                You Can Receive From
              </h3>
              <div className="flex flex-wrap gap-3">
                {compatibilityData[selectedType as keyof typeof compatibilityData].receives.map(type => (
                  <span key={type} className="px-5 py-3 bg-white text-rose-600 font-bold rounded-xl shadow-sm border border-rose-100 text-lg">
                    {type}
                  </span>
                ))}
              </div>
               {selectedType === 'AB+' && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <p className="text-base text-blue-800 font-medium"><strong>Universal Recipient!</strong><br/>You are incredibly lucky. You can receive blood from any blood type safely.</p>
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
