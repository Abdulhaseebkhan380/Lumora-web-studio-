import React from 'react';
import { ArrowUpRight, Award, Compass, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Subtle Classic Radial Backgrounds */}
      <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      {/* Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 ${isDark ? 'bg-grid-pattern' : 'bg-grid-pattern-light'}`}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Headline & Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            {t('hero.badge')}
          </p>

          <h1 className={`font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] font-light mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('hero.titleLine1')} <br />
            <span className="font-serif italic text-brand-500">
              {t('hero.titleLine2')}
            </span>
          </h1>

          <p className={`font-sans text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('hero.description')}
          </p>

          {/* Clean Editorial Actions */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mb-12">
            <a
              id="hero-cta-contact"
              href="#contact"
              className="px-8 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 group"
            >
              {t('hero.ctaStart')}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              id="hero-cta-portfolio"
              href="#portfolio"
              className={`px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 border ${
                isDark 
                  ? 'bg-transparent border-white/10 hover:border-white/30 text-white' 
                  : 'bg-transparent border-brand-200 hover:border-brand-500 text-gray-800'
              }`}
            >
              {t('hero.ctaExplore')}
            </a>
          </div>
        </div>

        {/* Right: Elegant Graphic Sculpture/Layout Frame */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center">
          <div className={`w-full max-w-md rounded-2xl p-8 border ${
            isDark 
              ? 'bg-dark-card border-white/5 text-white shadow-2xl' 
              : 'bg-white border-brand-100 text-gray-800 shadow-xl'
          }`}>
            <div className="border-b border-brand-100/10 pb-6 mb-6 flex justify-between items-center">
              <span className="font-mono text-xs text-brand-500 tracking-wider">{t('hero.focusTitle')}</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-500/40"></span>
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <h3 className="font-serif italic text-2xl text-brand-500">{t('hero.quote')}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {t('hero.quoteDesc')}
                </p>
              </div>

              {/* Core classic stats indices */}
              <div className={`grid grid-cols-2 gap-4 pt-6 border-t font-mono ${isDark ? 'border-white/5' : 'border-brand-100/30'}`}>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-500 tracking-widest uppercase">{t('hero.loadTime')}</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('hero.loadTimeValue')}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-500 tracking-widest uppercase">{t('hero.satisfaction')}</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('hero.satisfactionValue')}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-500 tracking-widest uppercase">METHOD</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom Code</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-500 tracking-widest uppercase">STANDARDS</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>W3C Semantic</span>
                </div>
              </div>

              {/* Quality Seal */}
              <div className={`p-4 rounded-lg flex items-center gap-3.5 ${
                isDark ? 'bg-white/5' : 'bg-brand-50/50'
              }`}>
                <Award className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <p className="text-xs leading-relaxed text-gray-500">
                  Every product is custom compiled using modern modular React. No third-party drag-and-drop systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
