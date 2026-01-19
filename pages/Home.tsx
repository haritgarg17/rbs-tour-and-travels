
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Star, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-white -mt-20 md:-mt-24">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1524492707941-5f39636ea307?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Incredible India Taj Mahal"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Discover the Soul of <br />
            <span className="text-emerald-400">Incredible India</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-200 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            From the snow-capped peaks of the North to the tropical shores of the South. Let RBS Tours guide your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            <Link to="/destinations" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Explore Destinations <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/ai-planner" className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              Plan with AI <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-emerald-600">15+</h3>
            <p className="text-slate-500 font-medium">Years Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-emerald-600">50k+</h3>
            <p className="text-slate-500 font-medium">Happy Travelers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-emerald-600">100%</h3>
            <p className="text-slate-500 font-medium">Safe Journey</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-emerald-600">24/7</h3>
            <p className="text-slate-500 font-medium">Support</p>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Experience India</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Popular Destinations</h2>
            </div>
            <Link to="/destinations" className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All Destinations <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POPULAR_DESTINATIONS.slice(0, 3).map((dest) => (
              <div key={dest.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-emerald-600 font-bold text-sm shadow-sm flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {dest.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {dest.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-slate-400 text-sm mb-2">
                    <MapPin className="h-4 w-4" /> {dest.state}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{dest.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{dest.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div>
                      <span className="text-xs text-slate-400 block uppercase font-bold tracking-tighter">Starting at</span>
                      <span className="text-xl font-bold text-emerald-600">₹{dest.price.toLocaleString()}</span>
                    </div>
                    <button className="bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Comprehensive Travel Services Across India</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="h-8 w-8" />, title: '24/7 Assistance', desc: 'Always available to help you during your travels.' },
              { icon: <ShieldCheck className="h-8 w-8" />, title: 'Safe & Secure', desc: 'Verified hotels and professional drivers for your safety.' },
              { icon: <Users className="h-8 w-8" />, title: 'Expert Guides', desc: 'Local guides who know the history and hidden spots.' },
              { icon: <Calendar className="h-8 w-8" />, title: 'Custom Plans', desc: 'Packages tailored to your budget and preferences.' }
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all text-center">
                <div className="inline-flex p-4 rounded-2xl bg-white text-emerald-600 shadow-sm mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready for your next adventure?</h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl relative z-10">
              Join thousands of satisfied travelers who explored India with RBS Tours. Get a customized quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link to="/contact" className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all">Contact Us</Link>
              <Link to="/ai-planner" className="bg-emerald-900 text-white border border-emerald-400/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-950 transition-all">Start AI Planning</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
