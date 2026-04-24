import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ManagerDashboard() {
  const { user, addHotel, hotels } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'HOTEL_MANAGER') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({ name: '', city: '', description: '', price: '', image: '' });
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      id: Date.now(),
      name: formData.name,
      location: formData.city,
      description: formData.description,
      price: parseFloat(formData.price),
      rating: 5.0,
      reviewsCount: 0,
      hostName: user.name,
      imageUrl: formData.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200"
      ],
      amenities: ["Wifi", "Private Parking", "Concierge"],
      category: "Luxury",
      managerEmail: user.email
    };
    addHotel(newHotel);
    setFormData({ name: '', city: '', description: '', price: '', image: '' });
    alert("Residence officially added to portfolio!");
  };

  const managerHotels = hotels.filter(h => h.managerEmail === user?.email);

  if (!user) return null;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Form */}
        <div className="lg:w-1/2">
          <h1 className="font-serif text-4xl mb-2 text-[#1C1917]">Manager Dashboard</h1>
          <p className="text-xs uppercase tracking-widest text-[#A8A29E] mb-12">Add to Portfolio</p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-[#E7E5E4] shadow-xl">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Residence Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917] bg-transparent" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Location</label>
              <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917] bg-transparent" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917] bg-transparent resize-none"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Price (USD)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917] bg-transparent" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Optional" className="w-full border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917] bg-transparent" />
              </div>
            </div>
            <button type="submit" className="w-full py-4 mt-4 bg-[#1C1917] text-white text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors">Submit Property</button>
          </form>
        </div>

        {/* Right Side: Added Hotels */}
        <div className="lg:w-1/2">
          <h2 className="font-serif text-3xl mb-8 border-b border-[#E7E5E4] pb-4 text-[#1C1917]">Your Properties</h2>
          {managerHotels.length === 0 ? (
            <p className="text-[#57534E] italic font-serif">You have not added any properties yet.</p>
          ) : (
            <div className="space-y-6">
              {managerHotels.map(h => (
                <div key={h.id} className="flex gap-4 bg-white p-4 border border-[#E7E5E4] hover:shadow-lg transition-shadow">
                  <img src={h.imageUrl} alt={h.name} className="w-24 h-24 object-cover" />
                  <div>
                    <h3 className="font-serif text-xl">{h.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-[#A8A29E]">{h.location}</p>
                    <p className="font-medium mt-2">${h.price} / Night</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
