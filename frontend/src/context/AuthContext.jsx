import React, { createContext, useState, useEffect } from 'react';
import { HOTELS_DATA } from '../data/hotels';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Global State
  const [hotels, setHotels] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load from local storage for persistence
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
    
    const savedHotels = JSON.parse(localStorage.getItem('global_hotels'));
    if (savedHotels && savedHotels.length > 0) {
      setHotels(savedHotels);
    } else {
      setHotels(HOTELS_DATA);
      localStorage.setItem('global_hotels', JSON.stringify(HOTELS_DATA));
    }

    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setWishlist(savedWishlist);
    setBookings(savedBookings);
    
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const userData = { email, name: email.split('@')[0], role: role || 'USER' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password, role) => {
    const userData = { email, name, role: role || 'USER' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const addHotel = (hotelData) => {
    setHotels(prev => {
      const updated = [hotelData, ...prev];
      localStorage.setItem('global_hotels', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWishlist = (hotel) => {
    setWishlist(prev => {
      const exists = prev.find(h => h.id === hotel.id);
      const updated = exists ? prev.filter(h => h.id !== hotel.id) : [...prev, hotel];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const addBooking = (bookingData) => {
    setBookings(prev => {
      const updated = [...prev, bookingData];
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
  };

  const cancelBooking = (id) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b);
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register, logout, loading, 
      hotels, addHotel,
      wishlist, toggleWishlist, 
      bookings, addBooking, cancelBooking 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
