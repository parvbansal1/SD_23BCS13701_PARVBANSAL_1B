import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, CreditCard, User, LogOut, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout, bookings, cancelBooking, wishlist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trips');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-32 pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Sidebar / Profile Info */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-32">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Member Since 2026</p>
              <h1 className="font-serif text-4xl text-[#1C1917] mb-2">{user.name || user.email?.split('@')[0] || 'Esteemed Guest'}</h1>
              <p className="text-[#57534E] text-sm">{user.email}</p>
            </div>
            
            <nav className="flex flex-col gap-6">
              <button 
                onClick={() => setActiveTab('trips')}
                className={`flex items-center gap-4 text-xs uppercase tracking-widest transition-colors text-left ${activeTab === 'trips' ? 'text-[#1C1917] font-bold' : 'text-[#57534E] hover:text-[#1C1917]'}`}
              >
                <Calendar size={16} strokeWidth={1} /> My Itineraries
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center gap-4 text-xs uppercase tracking-widest transition-colors text-left ${activeTab === 'wishlist' ? 'text-[#1C1917] font-bold' : 'text-[#57534E] hover:text-[#1C1917]'}`}
              >
                <Heart size={16} strokeWidth={1} /> Wishlist
              </button>
              <button className="flex items-center gap-4 text-xs uppercase tracking-widest text-[#57534E] hover:text-[#1C1917] transition-colors text-left">
                <User size={16} strokeWidth={1} /> Portfolio Profile
              </button>
              <div className="h-[1px] w-full bg-[#E7E5E4] my-2"></div>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-4 text-xs uppercase tracking-widest text-[#8C3A3A] hover:text-[#6E2D2D] transition-colors text-left"
              >
                <LogOut size={16} strokeWidth={1} /> Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {activeTab === 'trips' && (
            <>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-12 border-b border-[#E7E5E4] pb-6">Your Itinerary</h2>
              
              {bookings.length === 0 ? (
                <div className="py-20 text-center border border-[#E7E5E4]">
                  <h3 className="font-serif text-2xl text-[#1C1917] mb-4">Your portfolio is empty.</h3>
                  <p className="text-[#57534E] mb-8 text-sm max-w-md mx-auto">
                    Begin curating your next journey by exploring our exclusive collection of residences.
                  </p>
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-[#1C1917] text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-16">
                  {bookings.map(booking => (
                    <div key={booking.id} className="group flex flex-col md:flex-row gap-8 border-b border-[#E7E5E4] pb-16 last:border-0 last:pb-0">
                      
                      <div className="md:w-72 lg:w-80 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/hotel/${booking.hotelId}`)}>
                        <img 
                          src={booking.imageUrl} 
                          alt={booking.hotelName} 
                          className="w-full h-56 object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur-md ${
                            booking.status === 'CONFIRMED' ? 'bg-black/40' : 
                            booking.status === 'CANCELLED' ? 'bg-[#8C3A3A]/80' : 
                            'bg-black/20'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 
                            className="font-serif text-3xl text-[#1C1917] mb-2 group-hover:text-[#8C3A3A] transition-colors cursor-pointer"
                            onClick={() => navigate(`/hotel/${booking.hotelId}`)}
                          >
                            {booking.hotelName}
                          </h3>
                          <p className="text-[#A8A29E] text-xs uppercase tracking-widest flex items-center gap-2 mb-8">
                            <MapPin size={12} /> {booking.location}
                          </p>
                          
                          <div className="flex gap-12 mb-8">
                            <div>
                              <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest mb-1">Arrival</p>
                              <p className="text-[#1C1917] text-sm font-medium">{booking.checkIn}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest mb-1">Departure</p>
                              <p className="text-[#1C1917] text-sm font-medium">{booking.checkOut}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-between pt-6 border-t border-[#E7E5E4]">
                          <div>
                            <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest mb-1">Investment</p>
                            <p className="font-serif text-2xl text-[#1C1917]">${booking.totalPrice}</p>
                          </div>
                          <div className="flex gap-4">
                            {booking.status !== 'CANCELLED' && (
                              <button 
                                onClick={() => {
                                  if(window.confirm('Are you sure you wish to cancel this reservation?')) {
                                    cancelBooking(booking.id);
                                  }
                                }}
                                className="text-xs uppercase tracking-widest text-[#57534E] hover:text-[#8C3A3A] transition-colors pb-1 border-b border-transparent hover:border-[#8C3A3A]"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'wishlist' && (
            <>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-12 border-b border-[#E7E5E4] pb-6">Your Wishlist</h2>
              
              {wishlist.length === 0 ? (
                <div className="py-20 text-center border border-[#E7E5E4]">
                  <h3 className="font-serif text-2xl text-[#1C1917] mb-4">No curated favorites.</h3>
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-[#1C1917] text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors mt-4"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {wishlist.map(hotel => (
                    <div key={hotel.id} className="group cursor-pointer" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                      <div className="overflow-hidden aspect-[4/5] mb-4 relative bg-[#E7E5E4]">
                        <img 
                          src={hotel.imageUrl} 
                          alt={hotel.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                      </div>
                      <h3 className="font-serif text-xl text-[#1C1917] group-hover:text-[#8C3A3A] transition-colors">{hotel.name}</h3>
                      <p className="text-[#A8A29E] text-xs uppercase tracking-widest mt-1">{hotel.location}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
