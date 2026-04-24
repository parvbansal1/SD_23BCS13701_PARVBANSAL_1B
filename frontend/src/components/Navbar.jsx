import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages or when scrolled, use a solid elegant background
  const navClass = `fixed w-full z-50 transition-all duration-500 ease-in-out ${
    isHome && !scrolled 
      ? 'bg-transparent py-8' 
      : 'bg-[#FAF8F5]/95 backdrop-blur-md py-4 shadow-sm border-b border-[#E7E5E4]'
  }`;

  const textClass = isHome && !scrolled ? 'text-white' : 'text-[#1C1917]';
  const logoClass = `font-serif tracking-widest uppercase text-2xl md:text-3xl font-semibold ${textClass}`;

  return (
    <nav className={navClass}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex justify-between items-center">
        
        <div className="flex-1 flex items-center gap-8">
          {(!user || user.role !== 'HOTEL_MANAGER') && (
            <Link to="/login" className={`text-xs uppercase tracking-widest font-medium hover:opacity-70 transition-opacity hidden md:block ${textClass}`}>
              Become a Manager
            </Link>
          )}
          {user && user.role === 'HOTEL_MANAGER' && (
            <Link to="/manager-dashboard" className={`text-xs uppercase tracking-widest font-medium hover:opacity-70 transition-opacity hidden md:block ${textClass}`}>
              Manager Dashboard
            </Link>
          )}
        </div>

        <div className="flex-shrink-0 flex justify-center">
          <Link to="/" className={logoClass}>
            Stay<span className="italic font-light">Nexus</span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-3 py-2 px-3 hover:opacity-70 transition-opacity ${textClass}`}
            >
              <span className="text-xs uppercase tracking-widest font-medium hidden sm:block">
                {user ? 'Account' : 'Menu'}
              </span>
              {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-[#FAF8F5] border border-[#E7E5E4] shadow-2xl p-6 text-[#1C1917] transform origin-top-right transition-all">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-[#E7E5E4]">
                      <p className="text-xs tracking-widest uppercase text-[#A8A29E] mb-1">Signed in as</p>
                      <p className="font-serif text-lg truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest hover:text-[#8C3A3A] transition-colors pt-2">My Itineraries</Link>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-sm uppercase tracking-widest hover:text-[#8C3A3A] transition-colors">Wishlist</Link>
                    <div className="h-[1px] bg-[#E7E5E4] my-2 w-full"></div>
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="text-left text-sm uppercase tracking-widest hover:text-[#8C3A3A] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="group flex flex-col">
                      <span className="font-serif text-2xl group-hover:text-[#8C3A3A] transition-colors">Sign In</span>
                      <span className="text-xs uppercase tracking-widest text-[#A8A29E] mt-1">Access your account</span>
                    </Link>
                    <div className="h-[1px] bg-[#E7E5E4] w-full"></div>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="group flex flex-col">
                      <span className="font-serif text-2xl group-hover:text-[#8C3A3A] transition-colors">Register</span>
                      <span className="text-xs uppercase tracking-widest text-[#A8A29E] mt-1">Join the collective</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
