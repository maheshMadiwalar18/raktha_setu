import React from 'react';
import { Users, Droplet, Heart, Activity } from 'lucide-react';

const StatItem: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
    <div className="mb-3 text-brand-100 opacity-90 p-2 bg-white/10 rounded-full">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    </div>
    <div className="text-2xl lg:text-3xl font-extrabold text-white mb-1.5 tracking-tight">{value}</div>
    <div className="text-brand-100 font-medium tracking-wide uppercase text-xs">{label}</div>
  </div>
);

const Stats: React.FC = () => {
  const counts = { donors: 15420, lives: 4500, units: 2300, requests: 120 };

  return (
    <section className="py-10 bg-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 to-brand-700/85"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-8">What we’ve done together</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatItem label="Total Donors" value={`${counts.donors.toLocaleString()}+`} icon={<Users />} />
          <StatItem label="Lives Saved" value={`${counts.lives.toLocaleString()}+`} icon={<Heart />} />
          <StatItem label="Units Collected" value={`${counts.units.toLocaleString()}+`} icon={<Droplet />} />
          <StatItem label="Active Requests" value={counts.requests.toString()} icon={<Activity />} />
        </div>
      </div>
    </section>
  );
};

export default Stats;