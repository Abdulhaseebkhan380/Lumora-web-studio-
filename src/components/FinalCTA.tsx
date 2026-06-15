import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  isDark: boolean;
}

export default function FinalCTA({ isDark }: FinalCTAProps) {
  return (
    <section id="final-cta" className="py-24 relative overflow-hidden">
      {/* Radiant backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Glow Box container */}
        <div className={`p-8 sm:p-16 rounded-xl border text-center max-w-4xl mx-auto relative overflow-hidden ${
          isDark 
            ? 'border-white/5 bg-gradient-to-tr from-brand-950/20 to-transparent' 
            : 'bg-brand-50/50 border-brand-105'
        }`}>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Subtle Star icon */}
            <div className="text-brand-500 mb-6 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/80 animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40"></span>
            </div>

            <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
              ESTABLISHED IN KARACHI
            </p>

            <h2 id="final-cta-heading" className={`font-display text-4xl sm:text-5xl font-light tracking-tight leading-none mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Step into timeless <br />
              <span className="font-serif italic text-brand-500">digital presentation.</span>
            </h2>

            <p className={`font-sans text-xs sm:text-sm max-w-lg mx-auto mb-10 leading-relaxed font-light ${
              isDark ? 'text-gray-400' : 'text-gray-655'
            }`}>
              Let's create a beautiful, bespoke interface that commands visual authority and loads instantly for your audience.
            </p>

            {/* CTA Option button */}
            <div className="flex justify-center w-full">
              <a
                id="final-cta-contact"
                href="#contact"
                className="px-8 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-md shadow-brand-500/10 flex items-center gap-2"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
