import React, { useEffect, useState } from 'react';
import { Users, Droplet, Heart, Activity } from 'lucide-react';

const StatItem: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
    <div className="mb-4 text-brand-100 opacity-90 p-3 bg-white/10 rounded-full">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 32 })}
    </div>
    <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">{value}</div>
    <div className="text-brand-100 font-medium tracking-wide uppercase text-sm">{label}</div>
  </div>
);

const Stats: React.FC = () => {
  // Simulating loading stats for effect
  const [counts, setCounts] = useState({ donors: 0, lives: 0, units: 0, requests: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => {
        if (prev.donors >= 15000) clearInterval(interval);
        return {
          donors: Math.min(prev.donors + 150, 15420),
          lives: Math.min(prev.lives + 55, 4500),
          units: Math.min(prev.units + 25, 2300),
          requests: Math.min(prev.requests + 2, 120),
        };
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 to-brand-700/85"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">What we’ve done together</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
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