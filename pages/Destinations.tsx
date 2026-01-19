
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, MapPin, Star, X, ChevronRight, 
  ArrowUpRight, ArrowRight, Clock, Coffee, 
  Home as HomeIcon, Camera, Car, SlidersHorizontal, 
  ChevronDown, ArrowUpDown, Filter, RotateCcw
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../constants';
import { Destination } from '../types';

const InclusionIcon: React.FC<{ type: string }> = ({ type }) => {
  const normalized = type.toLowerCase();
  if (normalized.includes('hotel') || normalized.includes('stay') || normalized.includes('resort')) return <HomeIcon className="h-3.5 w-3.5" />;
  if (normalized.includes('meal') || normalized.includes('breakfast') || normalized.includes('cuisine')) return <Coffee className="h-3.5 w-3.5" />;
  if (normalized.includes('tour') || normalized.includes('guide') || normalized.includes('safari')) return <Camera className="h-3.5 w-3.5" />;
  if (normalized.includes('transfer') || normalized.includes('car') || normalized.includes('vehicle')) return <Car className="h-3.5 w-3.5" />;
  return null;
};

const DestinationCard: React.FC<{ dest: Destination }> = ({ dest }) => {
  return (
    <div 
      className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_70px_rgba(5,150,105,0.18)] hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-slate-100 hover:border-emerald-200/60 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <img 
          src={dest.image} 
          alt={dest.name} 
          className="w-full h-full object-cover scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-125 group-hover:-translate-y-4" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        <div className="absolute top-5 right-5">
          <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-emerald-600 font-bold text-sm shadow-lg flex items-center gap-1.5 border border-white/20 transform group-hover:scale-110 transition-transform duration-300">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {dest.rating}
          </div>
        </div>
        
        <div className="absolute bottom-5 left-5 flex flex-col gap-2">
          <div className="bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-xl w-fit">
            {dest.category}
          </div>
          <div className="flex items-center gap-1.5 text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-bold">{dest.duration || 'Flexible'}</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-20 bg-white">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
          <MapPin className="h-3 w-3 text-emerald-500" /> {dest.state}
        </div>
        
        <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
          {dest.name}
          <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-emerald-600" />
        </h3>
        
        <p className="text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-2 font-medium text-sm">
          {dest.description}
        </p>

        {dest.inclusions && (
          <div className="flex flex-wrap gap-2 mb-8 border-t border-slate-50 pt-4">
            {dest.inclusions.slice(0, 2).map((inc, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-500 text-[10px] font-bold">
                <InclusionIcon type={inc} />
                {inc}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 block uppercase font-black tracking-widest mb-1">Starting Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                ₹{dest.price.toLocaleString()}
              </span>
            </div>
          </div>
          <button className="group/btn relative overflow-hidden bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2">
            <span className="relative z-10 text-xs">Book</span>
            <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-slate-900 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'default'>('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const categories = ['Cultural', 'Mountains', 'Coastal', 'Spiritual', 'Adventure'];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = POPULAR_DESTINATIONS.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dest.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const uniqueSuggestions = Array.from(new Set([
        ...filtered.map(d => d.name),
        ...filtered.map(d => d.state)
      ])).slice(0, 5);
      setSuggestions(uniqueSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(40000);
    setSearchTerm('');
    setSortBy('default');
  };

  const filteredAndSortedDestinations = useMemo(() => {
    let result = POPULAR_DESTINATIONS.filter(dest => {
      const matchesSearch = 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dest.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        selectedCategories.length === 0 || selectedCategories.includes(dest.category);
      const matchesPrice = dest.price <= maxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategories, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-100 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Explore Destinations</h1>
              <p className="text-slate-500 font-medium text-lg">Discover the most breathtaking locations across Incredible India, handpicked for you.</p>
            </div>
            
            {/* Search Bar Container */}
            <div className="relative w-full md:w-[400px]" ref={suggestionRef}>
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="text"
                placeholder="Search destination or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                className="w-full pl-12 pr-12 py-5 bg-slate-50 border-none rounded-[2rem] text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium shadow-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-emerald-600">
                  <X className="h-4 w-4" />
                </button>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-slate-100 z-[60] overflow-hidden">
                  <div className="p-3">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSearchTerm(s); setShowSuggestions(false); }}
                        className="w-full flex items-center gap-3 px-4 py-4 text-left text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl transition-colors group"
                      >
                        <MapPin className="h-4 w-4 text-slate-400 group-hover:text-emerald-500" />
                        <span className="font-semibold">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-32 h-fit">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Filters</h3>
                <button onClick={clearFilters} className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:text-emerald-700">
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Categories */}
              <div className="mb-10">
                <h4 className="font-bold text-slate-800 text-sm mb-5">Categories</h4>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <input 