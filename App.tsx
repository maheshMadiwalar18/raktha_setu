import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Stats from './components/Stats';
import WhyDonate from './components/WhyDonate';
import HowItWorks from './components/HowItWorks';
import Quotes from './components/Quotes';
import Emergency from './components/Emergency';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import DonorRegister from './components/DonorRegister';
import EmergencyRequest from './components/EmergencyRequest';
import DonorDashboard from './components/DonorDashboard';
import FindDonors from './components/FindDonors';
import Campaigns from './components/Campaigns';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import BloodCompatibility from './components/BloodCompatibility';
import AdminDashboard from './components/AdminDashboard';
import ApiDocs from './components/ApiDocs';
import DatabaseSchema from './components/DatabaseSchema';
import Login from './components/Login';
import About from './components/About';
import Support from './components/Support';
import { AuthProvider } from './context/AuthContext';

const Home = () => (
  <>
    <Hero />
    <QuickActions />
    <Stats />
    <FeaturedCampaigns />
    <BloodCompatibility />
    <WhyDonate />
    <HowItWorks />
    <Quotes />
    <Emergency />
    <Testimonials />
  </>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<DonorRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/emergency" element={<EmergencyRequest />} />
        <Route path="/dashboard" element={<DonorDashboard />} />
        <Route path="/find-donors" element={<FindDonors />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/schema" element={<DatabaseSchema />} />
        <Route path="/help" element={<Support page="help" />} />
        <Route path="/privacy" element={<Support page="privacy" />} />
        <Route path="/terms" element={<Support page="terms" />} />
        <Route path="/cookie-policy" element={<Support page="cookie-policy" />} />
      </Routes>
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
