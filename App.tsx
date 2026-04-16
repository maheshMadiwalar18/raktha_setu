

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Stats from './components/Stats';
import WhyDonate from './components/WhyDonate';
import HowItWorks from './components/HowItWorks';
import Emergency from './components/Emergency';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import DonorRegister from './components/DonorRegister';
import EmergencyRequest from './components/EmergencyRequest';
import DonorDashboard from './components/DonorDashboard';
import FindDonors from './components/FindDonors';
import Campaigns from './components/Campaigns';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import AdminDashboard from './components/AdminDashboard';
import ApiDocs from './components/ApiDocs';
import DatabaseSchema from './components/DatabaseSchema';
import Login from './components/Login';
import About from './components/About';
import Support from './components/Support';
import { AuthProvider } from './context/AuthContext';

export type Page = 'home' | 'register' | 'emergency' | 'dashboard' | 'find-donors' | 'campaigns' | 'admin' | 'api-docs' | 'schema' | 'login' | 'about' | 'help' | 'privacy' | 'terms' | 'cookie-policy';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'register':
        return <DonorRegister onNavigate={navigateTo} />;
      case 'login':
        return <Login onNavigate={navigateTo} />;
      case 'about':
        return <About />;
      case 'emergency':
        return <EmergencyRequest />;
      case 'dashboard':
        return <DonorDashboard />;
      case 'find-donors':
        return <FindDonors />;
      case 'campaigns':
        return <Campaigns />;
      case 'admin':
        return <AdminDashboard />;
      case 'api-docs':
        return <ApiDocs />;
      case 'schema':
        return <DatabaseSchema />;
      case 'help':
      case 'privacy':
      case 'terms':
      case 'cookie-policy':
        return <Support page={currentPage} />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigateTo} />
            <QuickActions onNavigate={navigateTo} />
            <Stats />
            <FeaturedCampaigns onNavigate={navigateTo} />
            <WhyDonate />
            <HowItWorks />
            <Emergency onNavigate={navigateTo} />
            <Testimonials />
          </>
        );
    }
  };



  // Admin dashboard has its own layout
  if (currentPage === 'admin') {
    return (
        <AdminDashboard />
    );
  }
  
  // Pages that share similar full-page layout structure with nav
  const fullPageViews = [
    'api-docs', 'schema', 'login', 'about', 'register', 'emergency', 
    'dashboard', 'find-donors', 'campaigns', 'help', 'privacy', 'terms', 'cookie-policy'
  ];

  if (fullPageViews.includes(currentPage)) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
             <Navbar onNavigate={navigateTo} currentPage={currentPage} />
             {renderContent()}
             <Footer onNavigate={navigateTo} />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <main>
        {renderContent()}
      </main>
      
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
