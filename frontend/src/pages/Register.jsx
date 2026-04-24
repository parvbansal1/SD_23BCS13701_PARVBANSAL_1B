import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [role, setRole] = useState('USER');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const user = await register(name, formData.email, formData.password, role);
    if (user.role === 'HOTEL_MANAGER') {
      navigate('/manager-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-row-reverse">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" alt="Luxury Architecture" className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-block mb-12 font-serif text-xl">Stay<span className="italic font-light">Nexus</span></Link>
          <h1 className="font-serif text-4xl mb-8">Request Access</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <button type="button" onClick={() => setRole('USER')} className={`flex-1 py-3 text-xs uppercase tracking-widest border transition-colors ${role === 'USER' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'border-[#E7E5E4] text-[#1C1917]'}`}>Traveler</button>
              <button type="button" onClick={() => setRole('HOTEL_MANAGER')} className={`flex-1 py-3 text-xs uppercase tracking-widest border transition-colors ${role === 'HOTEL_MANAGER' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'border-[#E7E5E4] text-[#1C1917]'}`}>Manager</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-transparent border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917]" />
              </div>
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-transparent border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917]" />
              </div>
            </div>
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917]" />
            </div>
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-transparent border-b border-[#E7E5E4] py-2 focus:outline-none focus:border-[#1C1917]" />
            </div>
            <button type="submit" className="w-full py-4 mt-8 bg-[#1C1917] text-white text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors">Submit Application</button>
          </form>
          
          <div className="mt-12 text-center text-sm text-[#57534E]">
            Already a member? <Link to="/login" className="text-[#1C1917] border-b border-[#1C1917] hover:text-[#8C3A3A]">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
