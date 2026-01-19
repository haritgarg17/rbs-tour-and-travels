
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MapPin, Calendar, Clock, Loader2, IndianRupee, Lightbulb } from 'lucide-react';
import { getTravelItinerary, chatWithAssistant } from '../services/geminiService';
import { TripPlan, ChatMessage } from '../types';

const AIPlanner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, plan]);

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setPlan(null);
    try {
      const result = await getTravelItinerary(query);
      setPlan(result);
      setMessages(prev => [...prev, { role: 'user', content: query }]);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (msg: string) => {
    if (!msg.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setQuery('');
    
    try {
      const response = await chatWithAssistant(msg, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="h-4 w-4 text-amber-500" /> Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">AI Travel Architect</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Describe your dream India vacation and let our AI create the perfect itinerary for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Input Box */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100">
            <form onSubmit={handlePlanTrip} className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to go? Mention your days, budget, and interests..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 pr-16 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none h-32 text-lg"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white p-4 rounded-xl shadow-lg shadow-emerald-200 transition-all"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
              </button>
            </form>
            
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['7 days Kerala tour', 'Backpacking in Himachal', 'Heritage trip to Rajasthan'].map((prompt) => (
                <button 
                  key={prompt}
                  onClick={() => setQuery(prompt)}
                  className="text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 px-4 py-2 rounded-full transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Result Section */}
          {(plan || messages.length > 0) && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
              {plan && (
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
                  <div className="bg-emerald-600 p-8 md:p-10 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{plan.destination}</h2>
                        <p className="text-emerald-100 flex items-center gap-2"><Clock className="h-4 w-4" /> {plan.duration} Itinerary</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                        <span className="text-emerald-200 text-sm block uppercase font-bold">Estimated Budget</span>
                        <span className="text-2xl font-bold flex items-center gap-1 text-amber-400"><IndianRupee className="h-5 w-5" /> {plan.estimatedCost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-emerald-600" /> Daily Breakdown
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-100">
                          {plan.itinerary.map((item, idx) => (
                            <div key={idx} className="pl-10 relative">
                              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-emerald-600 border-4 border-white shadow-sm z-10"></div>
                              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1 block">Day {item.day} - {item.location}</span>
                              <p className="text-slate-700 leading-relaxed font-medium">{item.activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100/50">
                          <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-amber-500" /> Pro Travel Tips
                          </h3>
                          <ul className="space-y-3">
                            {plan.tips.map((tip, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
                          <h4 className="font-bold mb-2">Book This Trip?</h4>
                          <p className="text-sm text-slate-400 mb-6">Our agents can book all transport and stays for you today.</p>
                          <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold transition-all">Get Quote Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length > 0 && (
                <div className="bg-slate-100/50 rounded-[2.5rem] p-6 md:p-10 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600" /> Assistant Conversation
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar" ref={scrollRef}>
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === 'user' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 shadow-sm'}`}>
                          <p className="text-sm leading-relaxed">{m.content}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                          <span className="text-xs text-slate-500 font-medium">Assistant is thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex gap-3">
                    <input 
                      type="text"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                      placeholder="Ask a follow-up question..."
                      onKeyPress={(e) => e.key === 'Enter' && handleChat((e.target as HTMLInputElement).value)}
                    />
                    <button 
                      onClick={() => {
                        const input = document.querySelector('input') as HTMLInputElement;
                        handleChat(input.value);
                      }}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
