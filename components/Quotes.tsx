import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  {
    text: "The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, a loved one—or even you.",
    author: "Red Cross Society",
    impact: "Saves 3 lives"
  },
  {
    text: "Blood donation is the real act of humanity. You don't have to be a doctor to save lives, just a donor with a heart of gold.",
    author: "Unknown Hero",
    impact: "Pure Humanity"
  },
  {
    text: "To give blood is to give life. Every drop counts, and every donor is a hero in someone's story.",
    author: "RakhtSetu Community",
    impact: "Unspeakable Joy"
  },
  {
    text: "Excuses never save a life, but blood donation does. Be the reason for someone's heartbeat today.",
    author: "Global Health Forum",
    impact: "Direct Impact"
  },
  {
    text: "Your blood is precious to you, but it's even more precious to the person who needs it to survive.",
    author: "Medical Journal",
    impact: "Vital Support"
  }
];

const Quotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextQuote();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-60"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
            <span className="inline-block p-3 bg-red-100 rounded-2xl text-red-600 mb-4 animate-bounce">
                <Heart className="w-8 h-8 fill-red-600" />
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Voices of <span className="text-brand-600">Inspiration</span></h2>
        </div>

        <div className="relative group">
          {/* Quote Card */}
          <div className={`bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl border border-slate-100 transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-brand-600" />
            </div>
            
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic mb-8">
                "{MOTIVATIONAL_QUOTES[currentIndex].text}"
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-brand-500 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{MOTIVATIONAL_QUOTES[currentIndex].author}</h4>
                    <p className="text-slate-500 text-sm">Visionary Member</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-brand-50 px-6 py-3 rounded-2xl border border-brand-100">
                    <span className="text-brand-600 font-black text-xl">#</span>
                    <span className="text-brand-800 font-bold tracking-wide uppercase text-sm">
                        {MOTIVATIONAL_QUOTES[currentIndex].impact}
                    </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              onClick={prevQuote}
              className="p-4 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-brand-600 hover:border-brand-300 hover:shadow-lg transition-all group active:scale-90"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex gap-2">
              {MOTIVATIONAL_QUOTES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300 cursor-pointer'}`}
                  onClick={() => !isAnimating && setCurrentIndex(idx)}
                />
              ))}
            </div>
            <button 
              onClick={nextQuote}
              className="p-4 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-brand-600 hover:border-brand-300 hover:shadow-lg transition-all group active:scale-90"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
