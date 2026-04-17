import React, { useState } from 'react';
import { User, Calendar, MapPin, Phone, Activity, CheckCircle, Droplet, Heart, Mail, Lock, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DonorRegister: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    location: '',
    coordinates: null as [number, number] | null,
    lastDonation: '',
    conditions: [] as string[],
    isEligible: false,
    avatar: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState('');

  const handleLocationClick = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          coordinates: [position.coords.latitude, position.coords.longitude]
        }));
        setLoadingLocation(false);
      }, () => {
        alert('Could not fetch location');
        setLoadingLocation(false);
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        await register(formData);
        // Successful registration will trigger the global email simulation
        navigate('/dashboard');
    } catch (err: any) {
        setError(err.message || 'Registration failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Sidebar - Benefits */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Why Become a Donor?</h2>
                <p className="text-brand-100 mb-8 leading-relaxed">
                    Your donation can save up to 3 lives. Join our community of heroes today.
                </p>
                
                <ul className="space-y-4">
                    {[
                        "Free health checkup",
                        "Community recognition",
                        "Save lives in emergencies",
                        "Reduce risk of heart attack"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-brand-50">
                            <CheckCircle className="w-5 h-5 text-brand-300 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-900 mb-2">Did you know?</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                    Every 2 seconds someone in the US needs blood. It is essential for surgeries, cancer treatment, and chronic illnesses.
                 </p>
            </div>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Donor Registration</h1>
                    <p className="text-slate-500 mb-8">Create your account to join the RakhtSetu network.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-2 text-red-700">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {/* Profile Photo Upload */}
                        <div className="flex justify-center mb-8">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-100 shadow-inner">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <User className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-brand-600 text-white p-2 rounded-full cursor-pointer hover:bg-brand-700 transition-colors shadow-md transform hover:scale-110">
                                    <Camera className="w-4 h-4" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>

                        {/* Account Details Section */}
                        <div className="space-y-6">
                           <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Account Information</h3>
                           <div className="grid md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input 
                                            required 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none" 
                                            placeholder="Amit Kumar" 
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input 
                                            required 
                                            type="email" 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                            placeholder="amit@example.com" 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input 
                                            required 
                                            type="password" 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                            placeholder="Create a password" 
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input 
                                            required 
                                            type="tel" 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                            placeholder="+91 98765 43210" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Donor Details Section */}
                        <div className="space-y-6 pt-4">
                            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Medical Profile</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Age */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Age</label>
                                    <input 
                                        required 
                                        type="number" 
                                        min="18" 
                                        max="65" 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                        placeholder="Age (18-65)" 
                                        value={formData.age}
                                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                                    />
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Gender</label>
                                    <select 
                                        required 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-600"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Blood Group */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                                    <div className="relative">
                                        <Droplet className="absolute left-3 top-3 w-5 h-5 text-brand-500" />
                                        <select 
                                            required 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-600 appearance-none"
                                            value={formData.bloodGroup}
                                            onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                                        >
                                            <option value="">Select Group</option>
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
                                </div>

                                {/* Last Donation */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Last Donation Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input 
                                            type="date" 
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-600" 
                                            value={formData.lastDonation}
                                            onChange={(e) => setFormData({...formData, lastDonation: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                             <label className="text-sm font-semibold text-slate-700">Location</label>
                             <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                        placeholder="Enter city or zip code" 
                                    />
                                </div>
                                <button 
                                    type="button"
                                    onClick={handleLocationClick}
                                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    {loadingLocation ? '...' : <><MapPin className="w-4 h-4" /> GPS</>}
                                </button>
                             </div>
                        </div>

                        {/* Health Conditions */}
                         <div className="space-y-3 pt-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-brand-500" />
                                Health Conditions
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {['None', 'Diabetes', 'Hypertension', 'Recent Surgery', 'Anemia', 'Other'].map((condition) => (
                                    <label key={condition} className="flex items-center space-x-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                        <input type="checkbox" className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
                                        <span className="text-slate-600 text-sm">{condition}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Eligibility Check */}
                         <div className="pt-4">
                            <label className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer border border-blue-100 hover:bg-blue-100/50 transition-colors">
                                <input 
                                    required 
                                    type="checkbox" 
                                    checked={formData.isEligible}
                                    onChange={(e) => setFormData({...formData, isEligible: e.target.checked})}
                                    className="mt-1 w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500" 
                                />
                                <span className="text-sm text-blue-800">
                                    I confirm that I am eligible to donate blood and I agree to the <a href="#" className="underline font-semibold hover:text-blue-900">Terms & Conditions</a>. I understand that my information will be shared with registered blood banks.
                                </span>
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                'Creating Profile...'
                            ) : (
                                <>
                                    <Heart className="w-5 h-5 fill-white" />
                                    Register as Donor
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;