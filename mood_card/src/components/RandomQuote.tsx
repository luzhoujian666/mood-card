import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { RANDOM_QUOTES } from '../moodData';
import { motion, AnimatePresence } from 'motion/react';

export default function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [isRotating, setIsRotating] = useState(false);

  const getNewQuote = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 600);
    
    // Choose a random quote from the list
    let nextQuote = quote;
    while (nextQuote === quote) {
      const randomIndex = Math.floor(Math.random() * RANDOM_QUOTES.length);
      nextQuote = RANDOM_QUOTES[randomIndex];
    }
    setQuote(nextQuote);
  };

  useEffect(() => {
    // Set initial quote
    getNewQuote();
  }, []);

  return (
    <div 
      id="random-quote-container"
      className="bg-white border border-amber-100/70 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden"
    >
      {/* Decorative Warm Accent background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-50/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-50/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50/60 rounded-xl text-amber-700">
            <Sparkles size={16} />
          </div>
          <h3 className="font-sans font-bold text-sm text-slate-700">오늘의 랜덤 한마디</h3>
        </div>
        <button
          id="refresh-quote-btn"
          onClick={getNewQuote}
          className="p-1.5 px-3.5 text-xs flex items-center gap-1.5 text-slate-600 hover:text-amber-800 hover:bg-amber-50 border border-slate-200/60 rounded-full transition-all cursor-pointer font-medium bg-white"
          title="새로운 문장 보기"
        >
          <RefreshCw 
            size={12} 
            className={`transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`} 
          />
          <span>바꾸기</span>
        </button>
      </div>

      <div className="min-h-[4.5rem] flex flex-col justify-center py-2 relative">
        <AnimatePresence mode="out-in">
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-diary text-base text-slate-800 leading-relaxed text-center font-medium whitespace-pre-line"
          >
            “ {quote} ”
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-2 text-[10px] text-center text-slate-400 font-sans font-light tracking-wide">
        스스로에게 가볍게 마음을 건네 보세요.
      </div>
    </div>
  );
}
