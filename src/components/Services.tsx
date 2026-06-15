import React from 'react';
import { Briefcase, ShoppingBag, Sparkles, RefreshCw, Wrench, Search, Bot, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  isDark: boolean;
}

export default function Services({ isDark }: ServicesProps) {
  const { servicesData, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-brand-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-brand-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-brand-500" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-brand-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-brand-500" />;
      case 'Search':
        return <Search className="w-5 h-5 text-brand-500" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-brand-500" />;
      default:
        return <Briefcase className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20">
          <div className="text-left max-w-2xl">
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
              {t('services.badge')}
            </p>
            <h2 id="services-heading" className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('services.title1')} <br />
              <span className="font-serif italic text-brand-500">
                {t('services.title2')}
              </span>
            </h2>
            <p className={`font-sans text-base max-w-xl font-light ${isDark ? 'text-gray-400' : 'text-gray-650'}`}>
              {t('services.desc')}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              id="services-top-cta"
              href="#contact"
              className={`px-6 py-3 rounded-lg border font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 ${
                isDark 
                  ? 'bg-transparent border-white/10 text-white hover:border-white/30' 
                  : 'bg-white border-brand-100 text-gray-800 hover:border-brand-500 shadow-sm'
              }`}
            >
              {t('nav.cta')}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((srv) => (
            <div
              id={srv.id}
              key={srv.id}
              className={`p-8 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                isDark 
                  ? 'bg-dark-card/40 border-white/5 hover:border-brand-500/30' 
                  : 'bg-white border-brand-105 hover:border-brand-500/40 shadow-sm shadow-brand-500/5'
              }`}
            >
              <div>
                {/* Visual Header */}
                <div className="mb-6">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-white/5' : 'bg-brand-50'
                  }`}>
                    {getIcon(srv.iconName)}
                  </div>
                </div>

                {/* Info */}
                <h3 className={`font-display text-xl font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {srv.title}
                </h3>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {srv.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 mb-8">
                  {srv.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60"></span>
                      <span className={`font-sans text-xs font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquire Action Link */}
              <a
                id={`srv-cta-${srv.id}`}
                href="#contact"
                className={`w-full py-2.5 rounded-lg border text-center font-sans text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-brand-500 hover:text-white hover:border-transparent' 
                    : 'bg-brand-50/50 border-brand-100 text-gray-750 hover:bg-brand-500 hover:text-white hover:border-transparent'
                }`}
              >
                {t('nav.cta')}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
