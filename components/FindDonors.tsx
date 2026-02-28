
import React, { useState, useEffect } from 'react';
import { Search, Map, List, Filter, Phone, MapPin, Droplet, Star, CheckCircle, Clock, XCircle, X } from 'lucide-react';
import BloodMap from './BloodMap';

 const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%23e2e8f0'/%3E%3Cpath d='M48 48c8.8 0 16-7.2 16-16S56.8 16 48 16s-16 7.2-16 16 7.2 16 16 16zm0 8c-14.4 0-26 9.6-26 21.3V80h52v-2.7C74 65.6 62.4 56 48 56z' fill='%2394a3b8'/%3E%3C/svg%3E";

export interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  distance: number;
  lastDonation: string;
  status: 'Available' | 'Busy' | 'Not Eligible';
  donations: number;
  rating: number;
  avatar: string;
  location: string;
  coordinates: [number, number];
}

const MOCK_DONORS: Donor[] = [
  {
    id: 1,
    name: "Meera Reddy",
    bloodGroup: "O+",
    distance: 1.2,
    lastDonation: "3 months ago",
    status: 'Available',
    donations: 12,
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&w=150&h=150",
    location: "Connaught Place, Delhi",
    coordinates: [28.6304, 77.2177]
  },
  {
    id: 2,
    name: "Amit Kumar",
    bloodGroup: "AB-",
    distance: 3.5,
    lastDonation: "1 month ago",
    status: 'Not Eligible',
    donations: 8,
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&h=150",
    location: "Bandra West, Mumbai",
    coordinates: [19.0596, 72.8295]
  },
  {
    id: 3,
    name: "Varun Shah",
    bloodGroup: "A+",
    distance: 4.8,
    lastDonation: "6 months ago",
    status: 'Available',
    donations: 24,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150",
    location: "Indiranagar, Bangalore",
    coordinates: [12.9719, 77.6412]
  },
  {
    id: 4,
    name: "Sneha Joshi",
    bloodGroup: "O-",
    distance: 5.2,
    lastDonation: "2 weeks ago",
    status: 'Busy',
    donations: 5,
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1595276367372-5264b360f792?auto=format&fit=crop&w=150&h=150",
    location: "Hauz Khas, Delhi",
    coordinates: [28.5494, 77.1998]
  }
];

const FindDonors: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    bloodGroup: 'All',
    maxDistance: '10',
    availability: 'All'
  });
  const [donorsList, setDonorsList] = useState<Donor[]>([]);
  
  // Interactive States
  const [activeContact, setActiveContact] = useState<Donor | null>(null);

  useEffect(() => {
     // Fetch mock donors and local storage donors
     const storedUsers = JSON.parse(localStorage.getItem('rakhtsetu_users') || '[]');
     const formattedStoredDonors: Donor[] = storedUsers.map((u: any, idx: number) => ({
         id: 1000 + idx, // Simple offset for IDs
         name: u.name,
         bloodGroup: u.bloodGroup,
         distance: 2.5, // Mock distance since we can't calculate easily without current pos
         lastDonation: u.lastDonation || 'Never',
         status: 'Available',
         donations: 0,
         rating: 5.0,
         avatar: u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=random`,
         location: u.location,
         coordinates: u.coordinates || [20.5937, 78.9629] // Fallback to center of India if no coords
     }));

     setDonorsList([...MOCK_DONORS, ...formattedStoredDonors]);
  }, []);

  const handleContact = (donor: Donor) => {
      setActiveContact(donor);
  };

  // Filter logic
  const filteredDonors = donorsList.filter(donor => {
      if (filters.bloodGroup !== 'All' && donor.bloodGroup !== filters.bloodGroup) return false;
      if (filters.availability === 'Available' && donor.status !== 'Available') return false;
      // Note: Distance filter is ignored for this demo as distance is static
      return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Busy': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Not Eligible': return 'text-slate-500 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="w-3 h-3" />;
      case 'Busy': return <Clock className="w-3 h-3" />;
      case 'Not Eligible': return <XCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 animate-fadeIn pb-20 relative">
      
      {/* Contact Modal */}
      {activeContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 relative">
                  <button 
                      onClick={() => setActiveContact(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                  >
                      <X className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center mb-6">
                      <img src={activeContact.avatar} alt={activeContact.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-slate-100 object-cover" onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }} />
                      <h3 className="text-xl font-bold text-slate-900">{activeContact.name}</h3>
                      <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {activeContact.location}
                      </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</p>
                      <p className="text-lg font-mono font-bold text-slate-800 tracking-wide">+91 98765 43210</p>
                      <p className="text-xs text-brand-600 mt-2">Please mention RakhtSetu when calling.</p>
                  </div>

                  <div className="flex gap-3">
                      <a href="tel:+919876543210" className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors">
                          <Phone className="w-4 h-4" /> Call Now
                      </a>
                      <button onClick={() => setActiveContact(null)} className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Find Blood Donors</h1>
              <p className="text-slate-500 text-sm mt-1">Locate heroes nearby who are ready to help.</p>
            </div>
            
            <div className="flex items-center bg-slate-100 p-1 rounded-lg self-start md:self-auto border border-slate-200">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <List className="w-4 h-4" /> List View
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Map className="w-4 h-4" /> Map View
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-400 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
              <Search className="w-4 h-4" />
              <input type="text" placeholder="Search by location..." className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-sm w-40 sm:w-60" />
            </div>
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <select 
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
              value={filters.bloodGroup}
              onChange={(e) => setFilters({...filters, bloodGroup: e.target.value})}
            >
              <option value="All">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <select 
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
              value={filters.maxDistance}
              onChange={(e) => setFilters({...filters, maxDistance: e.target.value})}
            >
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
              <option value="50">Within 50 km</option>
            </select>

            <select 
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
            >
              <option value="All">Any Status</option>
              <option value="Available">Available Only</option>
            </select>

            <button className="ml-auto text-brand-600 text-sm font-semibold hover:text-brand-700 flex items-center gap-1">
               <Filter className="w-4 h-4" /> Advanced
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div key={donor.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                {/* Background accent */}
                <div className="absolute top-0 left-0 w-full h-24 bg-slate-50 group-hover:bg-red-50/50 transition-colors"></div>
                
                <div className="p-6 relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <img src={donor.avatar} alt={donor.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform" onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }} />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        <div className={`w-4 h-4 rounded-full border-2 border-white ${donor.status === 'Available' ? 'bg-green-500' : donor.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                      </div>
                    </div>
                    <div className="bg-brand-600 text-white px-3 py-1.5 rounded-xl font-bold text-lg shadow-sm">
                      {donor.bloodGroup}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{donor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {donor.location} ({donor.distance} km)
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5 text-brand-500" />
                        {donor.donations} Donations
                      </div>
                      <div className="w-px h-4 bg-slate-200"></div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {donor.rating}
                      </div>
                    </div>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-4">
                       <span>Last Donated:</span>
                       <span className="font-medium text-slate-700">{donor.lastDonation}</span>
                    </div>

                    <div className="flex gap-3">
                       <button 
                         onClick={() => handleContact(donor)}
                         disabled={donor.status !== 'Available'}
                         className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md
                           ${donor.status === 'Available' 
                             ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/30' 
                             : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
                       >
                          <Phone className="w-4 h-4" />
                          Call
                       </button>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-full justify-center ${getStatusColor(donor.status)}`}>
                        {getStatusIcon(donor.status)}
                        {donor.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredDonors.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                    No donors match your current filters.
                </div>
            )}
          </div>
        ) : (
          /* Map View */
          <div className="h-[650px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <BloodMap donors={filteredDonors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDonors;
