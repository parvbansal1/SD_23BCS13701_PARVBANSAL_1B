import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function HostDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    description: '',
    price: '',
    roomsAvailable: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Authentication required.");
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        name: formData.name,
        city: formData.city,
        description: formData.description,
        price: parseFloat(formData.price),
        roomsAvailable: parseInt(formData.roomsAvailable),
        managerName: user.firstName || 'Portfolio Curator'
      };

      await api.post('/admin/hotels', payload);
      setSuccess('Residence successfully added to portfolio.');
      setFormData({ name: '', city: '', description: '', price: '', roomsAvailable: 1 });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      // Offline fallback
      const newHotel = {
        id: Date.now(),
        name: formData.name,
        location: formData.city,
        description: formData.description,
        price: parseFloat(formData.price),
        rating: 5.0,
        reviewsCount: 0,
        hostName: user.name || user.email?.split('@')[0] || 'Portfolio Curator',
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200"
        ],
        amenities: ["Wifi", "Private Parking", "Concierge"],
        category: "Luxury"
      };
      
      const customHotels = JSON.parse(localStorage.getItem('custom_hotels') || '[]');
      localStorage.setItem('custom_hotels', JSON.stringify([...customHotels, newHotel]));

      setSuccess('Residence locally added to portfolio (offline mode).');
      setFormData({ name: '', city: '', description: '', price: '', roomsAvailable: 1 });
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-5xl mb-6 text-[#1C1917]">Curate with Us</h2>
        <p className="text-[#57534E] mb-12 max-w-md mx-auto text-sm">Join an exclusive collective of property owners and list your architectural masterpiece.</p>
        <button onClick={() => navigate('/login')} className="bg-[#1C1917] hover:bg-[#8C3A3A] text-white px-10 py-4 text-xs uppercase tracking-widest transition-colors">
          Sign In to Curate
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center border-b border-[#E7E5E4] pb-12">
          <h1 className="font-serif text-5xl text-[#1C1917] mb-4">Add to Portfolio</h1>
          <p className="text-[#A8A29E] text-xs uppercase tracking-widest">Provide the details of your exclusive residence.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {error && <div className="text-[#8C3A3A] text-sm border-l-2 border-[#8C3A3A] pl-4 py-1 italic font-serif">{error}</div>}
          {success && <div className="text-[#1C1917] text-sm border-l-2 border-[#1C1917] pl-4 py-1 italic font-serif">{success}</div>}

          <div className="space-y-10">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 group-focus-within:text-[#1C1917] transition-colors">
                Residence Nomenclature
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., The Glass Pavilion"
                className="w-full bg-transparent border-b border-[#E7E5E4] py-3 text-xl font-serif text-[#1C1917] focus:outline-none focus:border-[#1C1917] transition-colors placeholder:text-[#E7E5E4]"
              />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 group-focus-within:text-[#1C1917] transition-colors">
                Location
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Carmel-by-the-Sea, California"
                className="w-full bg-transparent border-b border-[#E7E5E4] py-2 text-[#1C1917] font-sans focus:outline-none focus:border-[#1C1917] transition-colors placeholder:text-[#E7E5E4]"
              />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 group-focus-within:text-[#1C1917] transition-colors">
                Editorial Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail the architectural significance and unique aspects of your space..."
                className="w-full bg-transparent border-b border-[#E7E5E4] py-2 text-[#1C1917] font-sans focus:outline-none focus:border-[#1C1917] transition-colors resize-none placeholder:text-[#E7E5E4]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 group-focus-within:text-[#1C1917] transition-colors">
                  Nightly Investment (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="850"
                  className="w-full bg-transparent border-b border-[#E7E5E4] py-2 text-[#1C1917] font-sans focus:outline-none focus:border-[#1C1917] transition-colors placeholder:text-[#E7E5E4]"
                />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 group-focus-within:text-[#1C1917] transition-colors">
                  Available Suites
                </label>
                <input
                  type="number"
                  name="roomsAvailable"
                  required
                  min="1"
                  value={formData.roomsAvailable}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#E7E5E4] py-2 text-[#1C1917] font-sans focus:outline-none focus:border-[#1C1917] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-[#E7E5E4]">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1917] hover:bg-[#8C3A3A] text-white text-xs uppercase tracking-widest py-5 transition-colors disabled:opacity-50"
            >
              {loading ? 'Curating...' : 'Submit to Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
