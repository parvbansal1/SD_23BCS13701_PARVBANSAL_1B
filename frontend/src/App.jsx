import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[100vh] bg-[#FAF8F5]">
                <div className="font-serif text-2xl italic text-[#1C1917] tracking-widest animate-pulse">
                  Loading...
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/hotel/:id" element={<PropertyDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="bg-[#1C1917] text-white py-20 mt-0">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                  <span className="font-serif tracking-widest uppercase text-3xl mb-6 block">
                    Stay<span className="italic font-light">Nexus</span>
                  </span>
                  <p className="text-[#A8A29E] text-sm max-w-sm leading-relaxed">
                    A curated collection of the world's most extraordinary architectural achievements, designed for the discerning traveler.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#57534E] mb-6">Discover</h4>
                  <ul className="space-y-4 text-sm text-[#E7E5E4]">
                    <li><span className="hover:text-white transition-colors cursor-pointer">The Collection</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Experiences</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Destinations</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Journal</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#57534E] mb-6">Company</h4>
                  <ul className="space-y-4 text-sm text-[#E7E5E4]">
                    <li><span className="hover:text-white transition-colors cursor-pointer">About Us</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Press</span></li>
                    <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-[#57534E] pt-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[#A8A29E]">
                <p>© 2026 StayNexus. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                  <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
