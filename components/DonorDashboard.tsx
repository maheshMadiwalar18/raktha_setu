import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Droplet, Calendar, MapPin, Clock, CheckCircle, 
  XCircle, AlertCircle, ChevronRight, Heart, Bell, Shield,
  Edit2, X, Save, Phone, Info, Mail, Camera, Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%23e2e8f0'/%3E%3Cpath d='M48 48c8.8 0 16-7.2 16-16S56.8 16 48 16s-16 7.2-16 16 7.2 16 16 16zm0 8c-14.4 0-26 9.6-26 21.3V80h52v-2.7C74 65.6 62.4 56 48 56z' fill='%2394a3b8'/%3E%3C/svg%3E";

const DonorDashboard: React.FC = () => {
  const { user, updateProfile, notifications, markNotificationsAsRead } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'history'>('requests');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleNotifications = () => {
      if (!isNotifOpen) {
          markNotificationsAsRead();
      }
      setIsNotifOpen(!isNotifOpen);
  };

  // Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
      isOpen: boolean;
      type: 'accept' | 'ignore';
      requestId: number | null;
      title: string;
      message: string;
  }>({
      isOpen: false,
      type: 'accept',
      requestId: null,
      title: '',
      message: ''
  });

  // Edit Profile State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
      name: '',
      location: '',
      phone: '',
      bloodGroup: '',
      avatar: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Local state for requests to allow interactions
  const [requests, setRequests] = useState([
    {
      id: 1,
      patient: "Priya Desai",
      hospital: "St. Mary's Hospital",
      distance: "2.5 km",
      bloodGroup: "O+",
      urgency: "High",
      timeLeft: "2 hours",
      units: 2
    },
    {
      id: 2,
      patient: "Rajesh Kumar",
      hospital: "City General",
      distance: "4.1 km",
      bloodGroup: "O+",
      urgency: "Critical",
      timeLeft: "45 mins",
      units: 3
    },
    {
      id: 3,
      patient: "Arjun Nair",
      hospital: "Children's Care Center",
      distance: "5.8 km",
      bloodGroup: "O-", 
      urgency: "Medium",
      timeLeft: "5 hours",
      units: 1
    }
  ]);

  const userData = {
    name: user?.name || "Donor",
    bloodGroup: user?.bloodGroup || "O+",
    lastDonation: user?.lastDonation || "Never",
    totalDonations: user?.donations || 0,
    livesSaved: (user?.donations || 0) * 3,
    isEligible: user?.isEligible !== false,
    nextEligibleDate: "Now",
    location: user?.location || "Unknown Location",
    phone: user?.phone || "+91 9876543210",
    id: user?.id || "#---",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"
  };

  const history = [
    { id: 101, date: "Oct 15, 2023", location: "City General", units: 1, status: "Completed" },
  ];

  // --- Helper Functions ---
  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 4000);
  };

  // --- Handlers ---

  const handleOpenEdit = () => {
      setEditFormData({
          name: userData.name,
          location: userData.location,
          phone: userData.phone,
          bloodGroup: userData.bloodGroup,
          avatar: userData.avatar
      });
      setIsEditModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainAvatarUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        updateProfile({ avatar: newAvatar });
        showNotification("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      await updateProfile({
          name: editFormData.name,
          location: editFormData.location,
          phone: editFormData.phone,
          bloodGroup: editFormData.bloodGroup,
          avatar: editFormData.avatar
      });
      setIsSaving(false);
      setIsEditModalOpen(false);
      showNotification("Profile updated successfully!");
  };

  const handleAcceptRequest = (id: number) => {
      const req = requests.find(r => r.id === id);
      setConfirmDialog({
          isOpen: true,
          type: 'accept',
          requestId: id,
          title: 'Accept Blood Request?',
          message: `This will share your contact details with ${req?.hospital} for patient ${req?.patient}.`
      });
  };

  const handleIgnoreRequest = (id: number) => {
      setConfirmDialog({
          isOpen: true,
          type: 'ignore',
          requestId: id,
          title: 'Ignore Request?',
          message: 'Are you sure you want to ignore this request? It will be removed from your dashboard.'
      });
  };

  const confirmAction = () => {
      if (confirmDialog.type === 'accept' && confirmDialog.requestId) {
          const req = requests.find(r => r.id === confirmDialog.requestId);
          showNotification(`Thank you! You accepted the request for ${req?.patient}. The hospital will contact you shortly.`, 'success');
          setRequests(prev => prev.filter(r => r.id !== confirmDialog.requestId));
      } else if (confirmDialog.type === 'ignore' && confirmDialog.requestId) {
          setRequests(prev => prev.filter(r => r.id !== confirmDialog.requestId));
          showNotification('Request ignored.', 'info');
      }
      setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleScheduleAppointment = () => {
      showNotification("Appointment scheduler opening...", 'info');
  };

  const handleDownloadCertificate = (date: string) => {
      showNotification(`Certificate for ${date} downloaded to your device.`, 'success');
  };

  // Gamification logic
  const nextBadgeGoal = 5;
  const currentDonations = userData.totalDonations;
  const progressPercent = Math.min((currentDonations / nextBadgeGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-fadeIn relative">
      {/* Notification Toast */}
      {notification && (
          <div className={`fixed top-24 right-4 z-[100] px-6 py-4 rounded-xl shadow-xl border flex items-center gap-3 animate-slideLeft ${
              notification.type === 'success' ? 'bg-white border-green-100 text-green-800' : 'bg-slate-800 text-white border-slate-700'
          }`}>
              {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Info className="w-5 h-5 text-blue-400" />}
              <span className="font-medium">{notification.message}</span>
              <button onClick={() => setNotification(null)} className="ml-2 opacity-60 hover:opacity-100">
                  <X className="w-4 h-4" />
              </button>
          </div>
      )}

      {/* Dashboard Header */}
      <div className="bg-slate-900 text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <div className="flex items-center gap-3">
                 <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
                 <button 
                    onClick={handleOpenEdit}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-slate-300 hover:text-white"
                    title="Edit Profile"
                 >
                     <Edit2 className="w-4 h-4" />
                 </button>
             </div>
             <p className="text-slate-400 mt-1 flex items-center gap-2">
               <MapPin className="w-4 h-4" /> {userData.location} &bull; Donor ID: {userData.id}
             </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm text-slate-400">Current Status</p>
                <p className={`font-bold flex items-center justify-end gap-1 ${userData.isEligible ? 'text-green-400' : 'text-amber-400'}`}>
                   {userData.isEligible ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                   {userData.isEligible ? 'Eligible to Donate' : 'Waiting Period'}
                </p>
             </div>
             
             {/* Notification Bell with Dropdown */}
             <div className="relative" ref={notifRef}>
                <div 
                  onClick={toggleNotifications}
                  className="bg-white/10 p-2 rounded-full relative cursor-pointer hover:bg-white/20 transition-colors"
                >
                    <Bell className="w-6 h-6 text-white" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                    )}
                </div>

                {isNotifOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-scaleUp origin-top-right">
                        <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-700 text-sm">Notifications</h3>
                            <span className="text-xs text-slate-500">{notifications.length} Total</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-slate-400 text-sm">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                                        <div className="flex gap-3">
                                            <div className="mt-1 flex-shrink-0">
                                                {notif.type === 'email' ? (
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                        <AlertCircle className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 mb-0.5">{notif.sender || 'System'} &bull; {notif.timestamp}</p>
                                                <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{notif.title}</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{notif.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
                            <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">View All Activity</button>
                        </div>
                    </div>
                )}
             </div>

             <img 
               src={userData.avatar} 
               alt="Profile" 
               className="w-12 h-12 rounded-full border-2 border-brand-500 object-cover"
               onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }}
             />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile & Stats */}
          <div className="lg:col-span-4 space-y-6">
             
             {/* Profile Card */}
             <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                     <button onClick={handleOpenEdit} className="text-slate-400 hover:text-brand-600 transition-colors">
                         <Edit2 className="w-4 h-4" />
                     </button>
                </div>
                
                {/* Main Avatar with Direct Camera Upload */}
                <div className="relative inline-block mb-4 group">
                    <img 
                        src={userData.avatar} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full border-4 border-slate-50 object-cover shadow-sm"
                        onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }}
                    />
                    <label className="absolute bottom-0 right-0 bg-white text-slate-700 p-2 rounded-full cursor-pointer hover:bg-brand-50 hover:text-brand-600 transition-colors shadow-md border border-slate-200">
                        <Camera className="w-4 h-4" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleMainAvatarUpdate} />
                    </label>
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className={`w-3 h-3 rounded-full ${userData.isEligible ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{userData.name}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-brand-700 rounded-full text-sm font-bold mb-6">
                    <Droplet className="w-4 h-4 fill-current" /> {userData.bloodGroup}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                   <div>
                      <p className="text-2xl font-bold text-slate-800">{userData.totalDonations}</p>
                      <p className="text-xs text-slate-500">Donations</p>
                   </div>
                   <div>
                      <p className="text-2xl font-bold text-slate-800">{userData.livesSaved}</p>
                      <p className="text-xs text-slate-500">Lives Saved</p>
                   </div>
                </div>
             </div>

             {/* Eligibility Status */}
             <div className={`rounded-2xl shadow-md p-6 border ${userData.isEligible ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-start justify-between mb-2">
                   <h3 className={`font-bold text-lg ${userData.isEligible ? 'text-green-800' : 'text-amber-800'}`}>
                     {userData.isEligible ? 'You are Eligible!' : 'Wait Period Active'}
                   </h3>
                   {userData.isEligible ? <CheckCircle className="text-green-600 w-6 h-6" /> : <Clock className="text-amber-600 w-6 h-6" />}
                </div>
                <p className={`text-sm leading-relaxed ${userData.isEligible ? 'text-green-700' : 'text-amber-700'}`}>
                   {userData.isEligible 
                     ? "You meet all requirements to donate blood today. Find a center nearby!" 
                     : `Your next eligibility date is ${userData.nextEligibleDate}. Thank you for your recent donation.`}
                </p>
                {userData.isEligible && (
                   <button 
                     onClick={handleScheduleAppointment}
                     className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                   >
                      <Calendar className="w-4 h-4" /> Schedule Appointment
                   </button>
                )}
             </div>

             {/* Next Badge Progress */}
             <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" /> Next Badge
                    </h3>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Silver Donor</span>
                </div>
                
                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
                   <span>Progress</span>
                   <span>{currentDonations} / {nextBadgeGoal} Donations</span>
                </div>
                
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                   <div 
                      className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-1000 ease-out relative"
                      style={{ width: `${progressPercent}%` }}
                   >
                       {/* Shimmer Effect */}
                       <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] -translate-x-full"></div>
                   </div>
                </div>
                
                <p className="text-xs text-slate-400 mt-3 italic">
                   Donate {nextBadgeGoal - currentDonations} more times to unlock the 'Silver Donor' badge and earn community recognition.
                </p>
             </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="lg:col-span-8 space-y-8">
             
             {/* Map Section Placeholder */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-64 relative group cursor-pointer hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/map-icons.png')]">
                   <div className="text-center">
                      <MapPin className="w-12 h-12 text-brand-400 mx-auto mb-2 animate-bounce" />
                      <p className="text-slate-500 font-medium">Interactive Map View</p>
                   </div>
                </div>
                {/* Overlay Controls */}
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md flex gap-2">
                   <button className="p-2 hover:bg-slate-50 rounded-md transition-colors text-slate-600"><MapPin className="w-4 h-4" /></button>
                   <button className="p-2 hover:bg-slate-50 rounded-md transition-colors text-slate-600"><Clock className="w-4 h-4" /></button>
                </div>
             </div>

             {/* Content Tabs */}
             <div>
                <div className="flex border-b border-slate-200 mb-6">
                   <button 
                     onClick={() => setActiveTab('requests')}
                     className={`pb-4 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'requests' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                      Nearby Requests
                      {activeTab === 'requests' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600"></span>}
                   </button>
                   <button 
                     onClick={() => setActiveTab('history')}
                     className={`pb-4 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'history' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                      Donation History
                      {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600"></span>}
                   </button>
                </div>

                {/* Requests List */}
                {activeTab === 'requests' && (
                  <div className="space-y-4">
                     {requests.length === 0 ? (
                         <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                             <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                 <CheckCircle className="w-8 h-8 text-green-500" />
                             </div>
                             <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
                             <p className="text-slate-500">No pending requests in your area.</p>
                         </div>
                     ) : (
                         requests.map((req) => (
                            <div key={req.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-center">
                               {/* Urgency Indicator */}
                               <div className={`w-full sm:w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                                  req.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 
                                  req.urgency === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-700'
                               }`}>
                                  <AlertCircle className="w-6 h-6 mb-1" />
                                  <span className="text-[10px] font-bold uppercase">{req.urgency}</span>
                               </div>

                               <div className="flex-grow text-center sm:text-left">
                                  <h4 className="font-bold text-slate-900 text-lg">{req.hospital}</h4>
                                  <p className="text-slate-500 text-sm mb-2 flex items-center justify-center sm:justify-start gap-2">
                                     <User className="w-3 h-3" /> Patient: {req.patient} &bull; {req.distance} away
                                  </p>
                                  <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-medium">
                                     <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{req.bloodGroup} Required</span>
                                     <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{req.units} Units</span>
                                     <span className="text-red-600 flex items-center gap-1"><Clock className="w-3 h-3" /> Expires in {req.timeLeft}</span>
                                  </div>
                               </div>

                               <div className="flex gap-2 w-full sm:w-auto">
                                  <button 
                                    onClick={() => handleIgnoreRequest(req.id)}
                                    className="flex-1 sm:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                                  >
                                     Ignore
                                  </button>
                                  <button 
                                    onClick={() => handleAcceptRequest(req.id)}
                                    className="flex-1 sm:flex-none bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium text-sm shadow-sm shadow-brand-500/30 transition-colors"
                                  >
                                     Accept
                                  </button>
                               </div>
                            </div>
                         ))
                     )}
                  </div>
                )}

                {/* History List */}
                {activeTab === 'history' && (
                   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left text-sm text-slate-600">
                         <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                            <tr>
                               <th className="p-4">Date</th>
                               <th className="p-4">Location</th>
                               <th className="p-4">Units</th>
                               <th className="p-4">Status</th>
                               <th className="p-4">Certificate</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {history.map((item) => (
                               <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-4 font-medium text-slate-900">{item.date}</td>
                                  <td className="p-4">{item.location}</td>
                                  <td className="p-4">{item.units} Unit</td>
                                  <td className="p-4">
                                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        <CheckCircle className="w-3 h-3" /> {item.status}
                                     </span>
                                  </td>
                                  <td className="p-4">
                                     <button 
                                        onClick={() => handleDownloadCertificate(item.date)}
                                        className="text-brand-600 hover:text-brand-700 font-medium text-xs border border-brand-200 px-3 py-1 rounded hover:bg-brand-50 transition-colors"
                                     >
                                        Download
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 animate-scaleUp">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      confirmDialog.type === 'accept' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                      {confirmDialog.type === 'accept' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{confirmDialog.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{confirmDialog.message}</p>
                  <div className="flex gap-3">
                      <button 
                          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                          className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={confirmAction}
                          className={`flex-1 py-2.5 font-semibold rounded-xl text-white shadow-lg transition-all ${
                              confirmDialog.type === 'accept' 
                                  ? 'bg-green-600 hover:bg-green-700 shadow-green-500/30' 
                                  : 'bg-slate-600 hover:bg-slate-700 shadow-slate-500/30'
                          }`}
                      >
                          Confirm
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                  <div className="flex justify-between items-center p-6 border-b border-slate-100">
                      <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
                      <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <X className="w-6 h-6" />
                      </button>
                  </div>
                  <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                      {/* Avatar Upload */}
                      <div className="flex flex-col items-center gap-4 mb-6">
                        <div className="relative group">
                          <img 
                            src={editFormData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"} 
                            alt="Profile Preview" 
                            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
                            onError={(e) => { if (e.currentTarget.src !== FALLBACK_AVATAR) e.currentTarget.src = FALLBACK_AVATAR; }}
                          />
                          <label className="absolute bottom-0 right-0 bg-brand-600 text-white p-2 rounded-full cursor-pointer hover:bg-brand-700 transition-colors shadow-sm">
                            <Camera className="w-4 h-4" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                          </label>
                        </div>
                        <span className="text-xs text-slate-500">Click camera icon to change</span>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Full Name</label>
                          <input 
                              type="text" 
                              required
                              value={editFormData.name}
                              onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                          <input 
                              type="tel" 
                              required
                              value={editFormData.phone}
                              onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Location</label>
                          <input 
                              type="text" 
                              required
                              value={editFormData.location}
                              onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                          <select 
                              value={editFormData.bloodGroup}
                              onChange={(e) => setEditFormData({...editFormData, bloodGroup: e.target.value})}
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                          >
                               <option value="A+">A+</option>
                               <option value="A-">A-</option>
                               <option value="B+">B+</option>
                               <option value="B-">B-</option>
                               <option value="AB+">AB+</option>
                               <option value="AB-">AB-</option>
                               <option value="O+">O+</option>
                               <option value="O-">O-</option>
                          </select>
                      </div>
                      
                      <div className="pt-4 flex gap-3">
                          <button 
                              type="button" 
                              onClick={() => setIsEditModalOpen(false)}
                              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              disabled={isSaving}
                              className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-colors flex items-center justify-center gap-2"
                          >
                              {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default DonorDashboard;