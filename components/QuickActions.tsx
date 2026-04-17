import React from 'react';
import { UserPlus, Search, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionCard: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorClass: string;
  onClick?: () => void;
}> = ({ title, desc, icon, colorClass, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
  >
    <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150 -mr-4 -mt-4`}>
        {/* Decorative large icon bg */}
        <div className={colorClass}>{icon}</div>
    </div>
    
    <div className={`inline-flex items-center justify-center p-3 rounded-xl ${colorClass.replace('text-', 'bg-').replace('600', '100')} ${colorClass} mb-6 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 mb-6 leading-relaxed">{desc}</p>
    
    <div className="flex items-center text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
      Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <ActionCard
            title="Become a Donor"
            desc="Register in minutes and help someone in your city when it matters most."
            icon={<UserPlus />}
            colorClass="text-brand-600"
            onClick={() => navigate('/register')}
          />
          <ActionCard
            title="Request Blood"
            desc="In a hurry? Create a request and notify matching donors nearby."
            icon={<Search />}
            colorClass="text-blue-600"
            onClick={() => navigate('/emergency')}
          />
           <ActionCard
            title="Find Nearby Donors"
            desc="Find donors and camps near you using the map view."
            icon={<MapPin />}
            colorClass="text-emerald-600"
            onClick={() => navigate('/find-donors')}
          />
        </div>
      </div>
    </section>
  );
};

export default QuickActions;