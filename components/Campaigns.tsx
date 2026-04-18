import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Clock, Users, Search, Filter, 
  Plus, Map as MapIcon, List, X, CheckCircle, 
  Building2, HeartHandshake, Droplet, ArrowRight, Info
} from 'lucide-react';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23e2e8f0'/%3E%3Cpath d='M389 392l111-133 112 133 151-181 248 306H389z' fill='%23cbd5e1'/%3E%3Ccircle cx='430' cy='216' r='44' fill='%23cbd5e1'/%3E%3Cpath d='M520 486h360' stroke='%2394a3b8' stroke-width='24' stroke-linecap='round'/%3E%3C/svg%3E";

// Types
type CampaignStatus = 'Upcoming' | 'Ongoing' | 'Completed';
type CampaignType = 'Blood Drive' | 'Awareness' | 'Emergency Camp';

interface Campaign {
  id: number;
  title: string;
  organizer: string;
  type: CampaignType;
  date: string;
  time: string;
  location: string;
  city: string;
  distance: number; // km
  image: string;
  status: CampaignStatus;
  bloodGroups: string[];
  attendees: number;
}

// Mock Data with Indian Themes
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Bangalore Red Cross Drive",
    organizer: "Indian Red Cross Society",
    type: 'Blood Drive',
    date: "Oct 25, 2023",
    time: "09:00 AM - 05:00 PM",
    location: "Kanteerava Stadium, Bangalore",
    city: "Bangalore",
    distance: 2.5,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    status: 'Upcoming',
    bloodGroups: ['All Groups'],
    attendees: 120
  },
  {
    id: 2,
    title: "Cyber City Emergency Camp",
    organizer: "DLF Foundation",
    type: 'Emergency Camp',
    date: "Today",
    time: "10:00 AM - 06:00 PM",
    location: "Cyber Hub, Gurugram",
    city: "Gurugram",
    distance: 8.2,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    status: 'Ongoing',
    bloodGroups: ['O+', 'O-', 'B+'],
    attendees: 45
  },
  {
    id: 3,
    title: "Mumbai Railway Station Drive",
    organizer: "Rotary Club Mumbai",
    type: 'Awareness',
    date: "Nov 10, 2023",
    time: "08:00 AM - 08:00 PM",
    location: "CST Station Main Hall",
    city: "Mumbai",
    distance: 15.0,
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80",
    status: 'Upcoming',
    bloodGroups: ['N/A'],
    attendees: 200
  },
  {
    id: 4,
    title: "Kerala Flood Relief Camp",
    organizer: "Kerala Govt. Health Dept",
    type: 'Blood Drive',
    date: "Oct 15, 2023",
    time: "08:00 AM - 04:00 PM",
    location: "Town Hall, Kochi",
    city: "Kochi",
    distance: 4.1,
    image: "https://images.unsplash.com/photo-1605280266973-7c79075c3285?auto=format&fit=crop&w=800&q=80",
    status: 'Completed',
    bloodGroups: ['A+', 'B+'],
    attendees: 85
  }
];

const Campaigns: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCampaigns, setDisplayCampaigns] = useState<Campaign[]>([]);
  
  // Interaction States with Persistence
  const [joinedCampaigns, setJoinedCampaigns] = useState<number[]>(() => {
    const saved = localStorage.getItem('rakhtsetu_joined_campaigns');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  
  // Filter States
  const [filterType, setFilterType] = useState('All');
  const [filterDistance, setFilterDistance] = useState('All');
  const [filterBloodGroup, setFilterBloodGroup] = useState('All');

  // Load Admin campaigns and merge with Mock data
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem('rakhtsetu_campaigns') || '[]');
    // Transform stored campaigns to match Campaign interface if necessary, 
    // though AdminDashboard saves them in a compatible structure mostly.
    const merged = [...MOCK_CAMPAIGNS, ...storedCampaigns];
    setDisplayCampaigns(merged);
  }, []);

  const handleJoin = (e: React.MouseEvent, id: number, title: string) => {
    e.stopPropagation();
    if (joinedCampaigns.includes(id)) return;

    const updatedJoined = [...joinedCampaigns, id];
    setJoinedCampaigns(updatedJoined);
    localStorage.setItem('rakhtsetu_joined_campaigns', JSON.stringify(updatedJoined));

    setNotification({
        message: `Successfully registered for "${title}"`,
        type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter Logic
  const filteredCampaigns = displayCampaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'All' || c.type === filterType;
    
    const matchesDistance = filterDistance === 'All' || 
                            (filterDistance === '5' && c.distance <= 5) ||
                            (filterDistance === '10' && c.distance <= 10) ||
                            (filterDistance === '25' && c.distance <= 25);
    
    const matchesBloodGroup = filterBloodGroup === 'All' || 
                              (c.bloodGroups && c.bloodGroups.includes('All Groups')) || 
                              (c.bloodGroups && c.bloodGroups.includes(filterBloodGroup));

    return matchesSearch && matchesType && matchesDistance && matchesBloodGroup;
  });

  return (
    <div className="min-h-screen bg-slate-50 animate-fadeIn pb-20 relative">
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-xl border flex items-center gap-3 animate-slideLeft ${
            notification.type === 'success' ? 'bg-white border-green-100 text-green-800' : 'bg-slate-800 text-white border-slate-700'
        }`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Info className="w-5 h-5 text-blue-400" />}
            <span className="font-medium">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
            </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 pt-16 pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl opacity-40 -mr-32 -mt-32 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-brand-700 text-sm font-bold mb-2 animate-fadeIn">
                    <HeartHandshake className="w-4 h-4" /> 
                    <span>Community Drives</span>
                 </div>
                 <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] animate-fadeInUp">
                    Join Lifesaving <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">
                      Camps in India
                    </span>
                 </h1>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    Find local donation drives, awareness camps, and emergency collection events happening in your city. Your participation can save lives.
                 </p>
                 
                 <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100">
                        <CheckCircle className="w-5 h-5 text-green-500" /> 15+ Active Drives
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100">
                        <Users className="w-5 h-5 text-blue-500" /> 2k+ Donors Joined
                    </div>
                 </div>
              </div>
              
              {/* Hero Illustration Area */}
              <div className="flex-1 relative w-full max-w-lg animate-fadeInRight" style={{animationDelay: '0.3s'}}>
                 <div className="absolute inset-0 bg-brand-600 rounded-[3rem] rotate-6 opacity-5 transform scale-90"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" 
                    alt="Volunteers" 
                    className="relative rounded-[2.5rem] shadow-2xl rotate-3 border-4 border-white w-full object-cover h-80 lg:h-96 hover:rotate-0 transition-all duration-500 cursor-pointer"
                    onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }}
                 />
                 
                 {/* Floating Info Card */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-float hidden sm:block">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold shadow-sm">
                          <Calendar className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Next Event</p>
                          <p className="font-bold text-slate-900 text-lg">Tomorrow, 9 AM</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTERS */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-slate-200 shadow-sm transition-all duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
               
               {/* Search Bar */}
               <div className="relative w-full xl:max-w-md group">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search by city (e.g. Pune), or organizer..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none transition-all"
                  />
               </div>

               {/* Filters & Controls */}
               <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                  
                  {/* Filter: Type */}
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-brand-300 focus:border-brand-500 outline-none cursor-pointer min-w-[140px]"
                  >
                     <option value="All">All Types</option>
                     <option value="Blood Drive">Blood Drives</option>
                     <option value="Emergency Camp">Emergency</option>
                     <option value="Awareness">Awareness</option>
                  </select>

                  {/* Filter: Distance */}
                  <select 
                    value={filterDistance}
                    onChange={(e) => setFilterDistance(e.target.value)}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-brand-300 focus:border-brand-500 outline-none cursor-pointer min-w-[140px]"
                  >
                     <option value="All">Any Distance</option>
                     <option value="5">Within 5km</option>
                     <option value="10">Within 10km</option>
                     <option value="25">Within 25km</option>
                  </select>

                  {/* Filter: Blood Group */}
                  <div className="relative min-w-[140px]">
                     <select 
                        value={filterBloodGroup}
                        onChange={(e) => setFilterBloodGroup(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-brand-300 focus:border-brand-500 outline-none cursor-pointer appearance-none"
                     >
                        <option value="All">All Groups</option>
                        <option value="A+">A+</option>
                        <option value="O+">O+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="O-">O-</option>
                        <option value="B-">B-</option>
                        <option value="AB-">AB-</option>
                     </select>
                     <Droplet className="absolute left-3 top-3.5 w-4 h-4 text-brand-500 pointer-events-none" />
                  </div>

                  <div className="w-px h-8 bg-slate-200 mx-1 hidden md:block"></div>

                  {/* View Toggles */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 flex-shrink-0">
                     <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                        title="List View"
                     >
                        <List className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Map View"
                     >
                        <MapIcon className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         
         {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 overflow-hidden flex flex-col h-full">
                     {/* Card Image */}
                     <div className="relative h-56 overflow-hidden">
                        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                           <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-sm flex items-center gap-1.5 ${
                              campaign.status === 'Ongoing' ? 'bg-green-500 text-white animate-pulse' :
                              campaign.status === 'Upcoming' ? 'bg-blue-500 text-white' :
                              'bg-slate-600 text-white'
                           }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                              {campaign.status}
                           </span>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 text-white max-w-[90%]">
                           <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                              <Building2 className="w-3.5 h-3.5" /> {campaign.organizer}
                           </div>
                        </div>
                     </div>

                     {/* Card Content */}
                     <div className="p-7 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">
                           {campaign.title}
                        </h3>
                        
                        <div className="space-y-4 mb-6 mt-2">
                           <div className="flex items-start gap-3 text-slate-600 text-sm">
                              <MapPin className="w-5 h-5 mt-0.5 text-brand-500 shrink-0" />
                              <span>{campaign.location}, {campaign.city} <span className="text-slate-400 font-medium">({campaign.distance} km)</span></span>
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-3 text-slate-600 text-sm bg-slate-50 p-2 rounded-lg">
                                 <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                                 <span className="font-medium">{campaign.date}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-600 text-sm bg-slate-50 p-2 rounded-lg">
                                 <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                                 <span className="font-medium truncate">{campaign.time}</span>
                              </div>
                           </div>
                        </div>

                        <div className="mb-6">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Blood Groups Needed</p>
                           <div className="flex flex-wrap gap-2">
                              {campaign.bloodGroups && campaign.bloodGroups.map((bg, idx) => (
                                 <span key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                    bg === 'All Groups' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                                 }`}>
                                    {bg}
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex gap-3">
                           <button 
                              onClick={(e) => handleJoin(e, campaign.id, campaign.title)}
                              disabled={campaign.status === 'Completed' || joinedCampaigns.includes(campaign.id)}
                              className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2
                                ${joinedCampaigns.includes(campaign.id) 
                                  ? 'bg-green-600 text-white shadow-green-500/20' 
                                  : campaign.status === 'Completed'
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20 hover:-translate-y-0.5'
                                }`}
                           >
                              {joinedCampaigns.includes(campaign.id) ? (
                                 <>Joined <CheckCircle className="w-4 h-4" /></>
                              ) : campaign.status === 'Completed' ? (
                                 <>Completed</>
                              ) : (
                                 <>Join Now <ArrowRight className="w-4 h-4" /></>
                              )}
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            // 4. MAP VIEW PLACEHOLDER
            <div className="h-[650px] bg-slate-100 rounded-[2.5rem] overflow-hidden relative border border-slate-200 shadow-inner group">
               {/* Decorative background representing map */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-[url('https://www.transparenttextures.com/patterns/map-icons.png')] opacity-50"></div>
               
               {/* Center Message */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md border border-white transform transition-all hover:scale-105">
                      <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapIcon className="w-10 h-10 text-brand-600 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Interactive Map View</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                         Visualize <strong>{filteredCampaigns.length} active campaigns</strong> in your region. 
                         Filter by distance to find the nearest donation drive.
                      </p>
                      <button 
                        onClick={() => setViewMode('list')}
                        className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-colors"
                      >
                         Switch to List View
                      </button>
                  </div>
               </div>
            </div>
         )}

         {filteredCampaigns.length === 0 && (
             <div className="text-center py-24">
                 <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Search className="w-10 h-10 text-slate-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">No campaigns found</h3>
                 <p className="text-slate-500 max-w-md mx-auto">We couldn't find any campaigns matching your filters. Try adjusting your search criteria.</p>
                 <button 
                    onClick={() => {setSearchQuery(''); setFilterType('All'); setFilterDistance('All'); setFilterBloodGroup('All');}}
                    className="mt-6 text-brand-600 font-bold hover:underline"
                 >
                    Clear all filters
                 </button>
             </div>
         )}
      </div>

    </div>
  );
};

export default Campaigns;
