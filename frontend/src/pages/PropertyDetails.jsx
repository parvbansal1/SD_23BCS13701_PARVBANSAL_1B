import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, ChevronLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addBooking, toggleWishlist, wishlist, hotels } = useContext(AuthContext);
  
  const [property, setProperty] = useState(null);
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const matchedHotel = hotels.find(h => h.id === parseInt(id));
    setProperty(matchedHotel || null);
  }, [id, hotels]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please designate your dates of stay.");
      return;
    }

    setBookingLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      const price = property.price || 850;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const newBooking = {
        id: Date.now(),
        hotelId: property.id,
        hotelName: property.name,
        location: property.location,
        imageUrl: property.imageUrl,
        checkIn,
        checkOut,
        totalPrice: (nights * price) + 150 + Math.round((nights * price) * 0.1),
        status: 'CONFIRMED'
      };
      
      addBooking(newBooking);
      setBookingLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  if (!property) {
    return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-2xl italic text-[#8C3A3A]">Residence unavailable.</div>;
  }

  const isWishlisted = wishlist.some(h => h.id === property.id);
  const price = property.price || 850;
  
  let totalPrice = 0;
  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (nights > 0) {
      totalPrice = nights * price;
    }
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-32">
      <div className="w-full px-6 md:px-12 pt-24 md:pt-32 pb-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="text-[#1C1917] flex items-center gap-2 text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ChevronLeft size={16} /> Collection
          </button>
          
          <button 
            onClick={() => toggleWishlist(property)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1C1917] hover:opacity-70 transition-opacity"
          >
            <Heart size={16} className={isWishlisted ? "fill-[#8C3A3A] text-[#8C3A3A]" : ""} /> 
            {isWishlisted ? "Saved" : "Save"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[50vh] md:h-[70vh]">
          <div className="md:col-span-2 md:row-span-2 h-full overflow-hidden">
            <img src={property.imageUrl} alt={property.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block h-full overflow-hidden">
            <img src={property.gallery?.[0] || property.imageUrl} alt="Gallery 1" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block h-full overflow-hidden">
            <img src={property.gallery?.[1] || property.imageUrl} alt="Gallery 2" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block md:col-span-2 h-full overflow-hidden">
            <img src={property.gallery?.[2] || property.imageUrl} alt="Gallery 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="pb-8 mb-12">
              <p className="text-[#A8A29E] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={14} /> {property.location}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl text-[#1C1917] mb-8 leading-tight">
                {property.name}
              </h1>
              
              <div className="flex items-center gap-6 text-sm uppercase tracking-widest border-y border-[#E7E5E4] py-6">
                <span className="flex items-center gap-2 text-[#1C1917] font-bold"><Star size={14} className="fill-[#1C1917]"/> {property.rating}</span>
                <span className="text-[#A8A29E]">{property.reviewsCount} Reviews</span>
                <span className="text-[#A8A29E]">4 Guests</span>
                <span className="text-[#A8A29E]">2 Bedrooms</span>
              </div>
            </div>

            <div className="mb-16 flex items-center gap-6">
              <div className="w-16 h-16 bg-[#1C1917] text-white rounded-full flex items-center justify-center font-serif text-2xl">
                {property.hostName?.charAt(0) || 'E'}
              </div>
              <div>
                <p className="text-[#A8A29E] text-xs uppercase tracking-widest mb-1">Curated by</p>
                <h2 className="font-serif text-2xl text-[#1C1917]">{property.hostName}</h2>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-xs uppercase tracking-widest text-[#A8A29E] mb-6">The Residence</h3>
              <p className="font-serif text-xl md:text-2xl text-[#1C1917] leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="mb-16 border-t border-[#E7E5E4] pt-12">
              <h3 className="text-xs uppercase tracking-widest text-[#A8A29E] mb-8">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4"><Star size={16} strokeWidth={1} className="text-[#1C1917]"/> <span className="text-sm font-medium text-[#57534E]">{amenity}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-white border border-[#E7E5E4] p-8 shadow-2xl">
              <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-[#E7E5E4]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-[#1C1917]">${price}</span>
                  <span className="text-[#A8A29E] text-xs uppercase tracking-widest">/ Night</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Check-in</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border-b border-[#E7E5E4] py-2 text-[#1C1917] focus:outline-none focus:border-[#1C1917] transition-colors bg-transparent font-sans" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Check-out</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border-b border-[#E7E5E4] py-2 text-[#1C1917] focus:outline-none focus:border-[#1C1917] transition-colors bg-transparent font-sans" 
                  />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-[#1C1917] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors disabled:opacity-50 mb-8"
              >
                {bookingLoading ? 'Processing...' : (user ? 'Reserve Residence' : 'Sign in to Reserve')}
              </button>

              {nights > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#E7E5E4] text-sm">
                  <div className="flex justify-between text-[#57534E]">
                    <span>${price} × {nights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-[#57534E]">
                    <span>Concierge Fee</span>
                    <span>$150</span>
                  </div>
                  <div className="flex justify-between text-[#57534E]">
                    <span>Taxes</span>
                    <span>${Math.round(totalPrice * 0.1)}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E7E5E4] flex justify-between font-serif text-2xl text-[#1C1917]">
                    <span>Total</span>
                    <span>${totalPrice + 150 + Math.round(totalPrice * 0.1)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
