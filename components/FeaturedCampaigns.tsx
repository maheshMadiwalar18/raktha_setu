
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, HeartHandshake } from 'lucide-react';
import { Page } from '../App';

 const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23e2e8f0'/%3E%3Cpath d='M389 392l111-133 112 133 151-181 248 306H389z' fill='%23cbd5e1'/%3E%3Ccircle cx='430' cy='216' r='44' fill='%23cbd5e1'/%3E%3Cpath d='M520 486h360' stroke='%2394a3b8' stroke-width='24' stroke-linecap='round'/%3E%3C/svg%3E";

interface FeaturedCampaignsProps {
  onNavigate: (page: Page) => void;
}

const FeaturedCampaigns: React.FC<FeaturedCampaignsProps> = ({ onNavigate }) => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    // Combine static mock data with any local storage data (from Admin panel)
    const STATIC_CAMPAIGNS = [
        {
            id: 1,
            title: "Bangalore Red Cross Drive",
            date: "Oct 25, 2023",
            time: "09:00 AM - 05:00 PM",
            location: "Indiranagar, Bangalore",
            image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
            status: 'Upcoming',
            type: 'Blood Drive'
        },
        {
            id: 2,
            title: "Cyber City Emergency Camp",
            date: "Today",
            time: "10:00 AM - 06:00 PM",
            location: "Cyber Hub, Gurugram",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
            status: 'Ongoing',
            type: 'Emergency'
        },
        {
            id: 3,
            title: "Mumbai Railway Station Drive",
            date: "Nov 10, 2023",
            time: "08:00 AM - 08:00 PM",
            location: "CST Station, Mumbai",
            image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80",
            status: 'Upcoming',
            type: 'Awareness'
        }
    ];

    const storedCampaigns = JSON.parse(localStorage.getItem('rakhtsetu_campaigns') || '[]');
    
    // Format stored campaigns to match display structure if needed
    const formattedStored = storedCampaigns.map((c: any) => ({
        id: c.id,
        title: c.title,
        date: c.date,
        time: c.time,
        location: c.city ? `${c.location}, ${c.city}` : c.location,
        image: c.image || "https://images.unsplash.com/photo-1596367402913-9247e132f153?auto=format&fit=crop&w=800&q=80",
        status: c.status,
        type: c.type
    }));

    // Merge and take top 3
    setCampaigns([...STATIC_CAMPAIGNS, ...formattedStored].slice(0, 3));
  }, []);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-3 uppercase tracking-wide">
                 <HeartHandshake className="w-3 h-3" /> Community Impact
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Upcoming Campaigns</h2>
              <p className="text-slate-500 max-w-2xl text-lg">Join these donation drives across India and be a part of the mission.</p>
           </div>
           <button 
             onClick={() => onNavigate('campaigns')}
             className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors bg-brand-50 px-5 py-2.5 rounded-xl hover:bg-brand-100"
           >
             View All Campaigns <ArrowRight className="w-4 h-4" />
           </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
                <div 
                    key={campaign.id} 
                    className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/5 transition-all cursor-pointer flex flex-col h-full bg-white" 
                    onClick={() => onNavigate('campaigns')}
                >
                    <div className="relative h-48 overflow-hidden">
                        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                        
                        <div className="absolute top-4 left-4">
                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-sm border border-white/20 flex items-center gap-1.5 ${
                                campaign.status === 'Ongoing' ? 'bg-green-500 text-white animate-pulse' : 
                                campaign.status === 'Completed' ? 'bg-slate-500 text-white' : 'bg-white/90 text-brand-700'
                             }`}>
                                {campaign.status === 'Ongoing' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                                {campaign.status}
                             </span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 block">{campaign.type}</span>
                            <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                                {campaign.title}
                            </h3>
                        </div>
                        
                        <div className="space-y-3 mt-auto">
                            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                                <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                                <span className="font-medium">{campaign.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                                <span className="font-medium">{campaign.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                                <span className="font-medium truncate">{campaign.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 text-center md:hidden">
            <button 
             onClick={() => onNavigate('campaigns')}
             className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
           >
             View All Campaigns <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
