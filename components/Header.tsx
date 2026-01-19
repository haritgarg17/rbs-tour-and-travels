
import React, { useState, useEffect } from 'react';
import { Menu, X, Plane, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md border-slate-200 py-3' 
          : 'bg-white/80 backdrop-blur-md border-slate-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`transition-all duration-300 p-2 rounded-lg bg-emerald-600`}>
              <Plane className="h-6 w-6 text-white" />
            </div>
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
              RBS <span className="text-emerald-600">Tours</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</Link>
            <Link to="/destinations" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Destinations</Link>
            <Link to="/ai-planner" className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-semibold hover:bg-emerald-100 transition-colors">AI Trip Planner</Link>
            <Link to="/contact" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Contact</Link>
            <a 
              href="tel:+919876543210" 
              className={`flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                isScrolled ? 'shadow-md shadow-emerald-200' : 'shadow-lg shadow-emerald-200 hover:bg-emerald-700'
              }`}
            >
              <Phone className="h-4 w-4" />
              +91 98765 43210
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 font-medium py-2 hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/destinations" onClick={() => setIsOpen(false)} className="text-slate-600 font-medium py-2 hover:text-emerald-600 transition-colors">Destinations</Link>
          <Link to="/ai-planner" onClick={() => setIsOpen(false)} className="text-emerald-600 font-bold py-2">AI Trip Planner</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-slate-600 font-medium py-2 hover:text-emerald-600 transition-colors">Contact</Link>
          <a href="tel:+919876543210" className="bg-emerald-600 text-white text-center py-3 rounded-xl font-medium shadow-lg shadow-emerald-100">Call Us Now</a>
        </div>
      )}
    </nav>
  );
};

export default Header;
