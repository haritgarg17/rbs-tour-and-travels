
import React from 'react';
import { Plane, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <Plane className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-white">RBS Tours</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for exploring the incredible beauty of India. From the majestic Himalayas to the serene backwaters of Kerala, we make your journey unforgettable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Popular Destinations</Link></li>
              <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Travel Services</h4>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">Hotel Bookings</li>
              <li className="hover:text-white transition-colors cursor-pointer">Car & Taxi Rentals</li>
              <li className="hover:text-white transition-colors cursor-pointer">Guided Group Tours</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custom Packages</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>123, Travel Lane, CP, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>hello@rbstours.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} RBS Tour and Travels. All rights reserved. Built for Incredible India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
