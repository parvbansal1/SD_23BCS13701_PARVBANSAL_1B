import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, Map, Palmtree } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const CATEGORIES = [
  { name: 'All', icon: Compass },
  { name: 'Luxury', icon: Palmtree },
  { name: 'City', icon: Map },
];

export default function Home() {
  const { hotels } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setListings(hotels);
  }, [hotels]);

  const handleSearch = () => {
    if (!searchCity.trim()) {
      setListings(hotels);
      return;
    }
    const filtered = hotels.filter(hotel => 
      hotel.location.toLowerCase().includes(searchCity.toLowerCase()) || 
      hotel.name.toLowerCase().includes(searchCity.toLowerCase())
    );
    setListings(filtered);
  };

  const filteredListings = activeCategory === 'All' 
    ? listings 
    : listings.filter(l => (l.category || 'Luxury') === activeCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#1C1917]">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=100&w=2560" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover scale-105 animate-[kenburns_20s_ease-out_forwards]"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2560&q=80'; }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 mt-16 w-full max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-6 leading-tight animate-fade-up">
            Curated Spaces for<br/><span className="italic font-light">Discerning Travelers</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.2em] mb-12 animate-fade-up delay-200">
            An exclusive collection of extraordinary Indian Heritage properties
          </p>
          
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-none border border-white/30 flex items-center shadow-2xl animate-fade-up delay-400">
            <div className="flex-1 flex items-center px-6 border-r border-white/20">
              <Search size={18} className="text-white/70 mr-4" />
              <input 
                type="text" 
                placeholder="Search city or residence..." 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/70 text-lg font-serif italic py-3"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-white text-[#1C1917] px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#8C3A3A] hover:text-white transition-colors h-full flex items-center ml-2"
            >
              Explore
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest flex flex-col items-center gap-2 animate-fade-up delay-700">
          <span>Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/30"></div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-4 flex flex-col md:flex-row justify-between items-end border-b border-[#E7E5E4] gap-6">
        <div className="flex overflow-x-auto hide-scrollbar gap-10">
          {CATEGORIES.map(category => (
            <button 
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center gap-2 min-w-max pb-4 border-b-2 transition-colors ${activeCategory === category.name ? 'border-[#1C1917] text-[#1C1917]' : 'border-transparent text-[#A8A29E] hover:text-[#1C1917]'}`}
            >
              <category.icon size={22} strokeWidth={1} />
              <span className="text-xs uppercase tracking-widest">{category.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pb-4">
           <span className="text-xs uppercase tracking-widest text-[#A8A29E]">Sort By:</span>
           <select 
             className="bg-transparent text-xs uppercase tracking-widest text-[#1C1917] focus:outline-none cursor-pointer border-b border-[#E7E5E4] pb-1 hover:border-[#1C1917] transition-colors appearance-none pr-4"
             onChange={(e) => {
               const val = e.target.value;
               let sorted = [...listings];
               if (val === 'low') sorted.sort((a,b) => a.price - b.price);
               if (val === 'high') sorted.sort((a,b) => b.price - a.price);
               setListings(sorted);
             }}
           >
             <option value="rec">Recommended</option>
             <option value="low">Price: Low to High</option>
             <option value="high">Price: High to Low</option>
           </select>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8 animate-fade-up">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-2">The Collection</h2>
            <p className="text-[#57534E] max-w-md text-sm leading-relaxed">
              Every property in our portfolio has been meticulously selected for its architectural significance.
            </p>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="py-20 text-center border border-[#E7E5E4]">
            <h3 className="font-serif text-2xl text-[#1C1917] mb-4">No residences match your criteria.</h3>
            <button 
              onClick={() => { setSearchCity(''); setActiveCategory('All'); handleSearch(); }}
              className="bg-[#1C1917] text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#8C3A3A] transition-colors mt-4"
            >
              View All Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredListings.map((listing, index) => {
              const marginTop = index % 3 === 1 ? 'lg:mt-16' : index % 3 === 2 ? 'lg:mt-32' : '';
              
              return (
                <Link to={`/hotel/${listing.id}`} key={listing.id} className={`group block ${marginTop} animate-fade-up`}>
                  <div className="overflow-hidden aspect-[4/5] mb-6 relative bg-[#E7E5E4]">
                    <img 
                      src={listing.imageUrl} 
                      alt={listing.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="pr-4">
                      <h3 className="font-serif text-2xl text-[#1C1917] group-hover:text-[#8C3A3A] transition-colors mb-2">
                        {listing.name}
                      </h3>
                      <p className="text-[#A8A29E] text-xs uppercase tracking-widest">
                        {listing.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1C1917] font-medium">
                        ${listing.price}
                      </p>
                      <p className="text-[#A8A29E] text-xs uppercase tracking-wider mt-1">/ Night</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
