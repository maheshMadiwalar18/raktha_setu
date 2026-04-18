
import React, { useState } from 'react';
import { HeartPulse, Clock, ShieldCheck, Users, Info, Droplet } from 'lucide-react';

const BenefitItem: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 shadow-sm">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const CompatibilityViewer = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const getCompatibility = (type: string) => {
    switch(type) {
        case 'A+': return { give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] };
        case 'O+': return { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] };
        case 'B+': return { give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] };
        case 'AB+': return { give: ['AB+'], receive: ['Everyone'] };
        case 'A-': return { give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] };
        case 'O-': return { give: ['Everyone'], receive: ['O-'] };
        case 'B-': return { give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] };
        case 'AB-': return { give: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] };
        default: return { give: [], receive: [] };
    }
  };

  const data = selectedType ? getCompatibility(selectedType) : null;

  return (
    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 mt-12 shadow-sm">
        <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Droplet className="w-6 h-6 text-brand-600 fill-brand-600" />
                Check Compatibility
            </h3>
            <p className="text-slate-500 mt-2">Select your blood group to see who you can save.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {bloodTypes.map(type => (
                <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-14 h-14 rounded-full font-bold text-lg transition-all transform hover:scale-110 ${
                        selectedType === type 
                        ? 'bg-brand-600 text-white shadow-lg scale-110 ring-4 ring-brand-100' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>

        {selectedType && data && (
            <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -mr-8 -mt-8 opacity-50"></div>
                    <p className="text-emerald-700 font-bold uppercase text-xs tracking-wider mb-3">You can donate to</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {data.give.map(t => (
                            <span key={t} className="bg-white text-emerald-800 px-4 py-2 rounded-xl font-bold shadow-sm border border-emerald-100">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -mr-8 -mt-8 opacity-50"></div>
                    <p className="text-blue-700 font-bold uppercase text-xs tracking-wider mb-3">You can receive from</p>
                    <div className="flex flex-wrap justify-center gap-2">
                         {data.receive.map(t => (
                            <span key={t} className="bg-white text-blue-800 px-4 py-2 rounded-xl font-bold shadow-sm border border-blue-100">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )}
        
        {!selectedType && (
            <div className="text-center text-slate-400 py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Click a blood type button above to reveal details</p>
            </div>
        )}
    </div>
  );
};

const WhyDonate: React.FC = () => {
  return (
    <section id="why-donate" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-600 rounded-3xl rotate-3 opacity-10"></div>
                <img 
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80" 
                alt="Happy Donor" 
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square hover:grayscale-0 transition-all duration-700"
                />
                {/* Overlay card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg border-l-4 border-brand-500">
                <p className="text-slate-800 italic font-medium">"I donate because I know 15 minutes of my time can give someone a lifetime."</p>
                <p className="text-brand-600 font-bold mt-2 text-sm">- Priya J., Regular Donor</p>
                </div>
            </div>
            
            <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
                <h4 className="font-bold text-brand-800 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Safety First
                </h4>
                <p className="text-brand-700 text-sm">
                    Sterile equipment is used for every donor. You cannot contract any disease by donating blood. It's 100% safe.
                </p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">Why It Matters</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Why Should You Donate Blood?</h3>
              <p className="text-slate-600 text-lg">
                Blood is the most precious gift that anyone can give to another person — the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components.
              </p>
            </div>

            <div className="space-y-8">
              <BenefitItem 
                title="Save up to 3 Lives" 
                desc="Just one donation can save up to three lives. Your contribution provides essential support for accident victims and surgery patients."
                icon={<HeartPulse />}
              />
              <BenefitItem 
                title="Health Check-up" 
                desc="Get a mini physical before donating. We check your pulse, blood pressure, body temperature and hemoglobin levels."
                icon={<ShieldCheck />}
              />
              <BenefitItem 
                title="Quick & Safe Process" 
                desc="The actual donation takes about 10-15 minutes. The entire process is safe, sterile, and conducted by professionals."
                icon={<Clock />}
              />
              <BenefitItem 
                title="Community Support" 
                desc="Strengthen your community by ensuring local hospitals have the supply they need for emergencies."
                icon={<Users />}
              />
            </div>

            {/* Interactive Compatibility Tool */}
            <CompatibilityViewer />

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
