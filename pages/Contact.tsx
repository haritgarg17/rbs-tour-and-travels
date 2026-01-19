
import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Clock, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions about our tours or need a custom package? Our team of Indian travel experts is ready to help you plan your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-600" /> Contact Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Office</h4>
                    <p className="text-slate-500 text-sm">123, Travel Lane, Connaught Place, New Delhi, India - 110001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone Number</h4>
                    <p className="text-slate-500 text-sm">+91 98765 43210<br />+91 11 2345 6789</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Address</h4>
                    <p className="text-slate-500 text-sm">hello@rbstours.com<br />support@rbstours.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" /> Working Hours
              </h3>
              <ul className="space-y-2 text-emerald-100 text-sm">
                <li className="flex justify-between"><span>Mon - Sat</span> <span>09:00 AM - 08:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>10:00 AM - 04:00 PM</span></li>
              </ul>
              <div className="mt-8 p-4 bg-white/10 rounded-2xl">
                <p className="text-sm">Emergency travel support available 24/7 for existing customers.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-emerald-600" /> Send us a Message
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="+91" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all">
                    <option>General Inquiry</option>
                    <option>Book a Tour</option>
                    <option>Custom Package</option>
                    <option>Taxi/Car Rental</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">Send Message Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
