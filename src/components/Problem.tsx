import React from 'react';
import { Sparkles, Compass, Feather } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProblemProps {
  isDark: boolean;
}

export default function Problem({ isDark }: ProblemProps) {
  const { language } = useLanguage();

  const translations = {
    en: {
      badge: 'CORE DESIGN DOCTRINE',
      title1: 'Timeless simplicity',
      title2: 'over modern digital noise.',
      desc: 'Bespoke web design is not about adding more decorations — it is about clarifying elements to forge a pristine connection with your customer.',
      quote: '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
      philo: [
        {
          title: 'Mindful Space',
          tagline: 'vs. Complex Bloat',
          description: 'Generous negative spacing allows your brand message to breathe. We carefully balance visual grids to command focus, keeping your interface free of unnecessary noise.',
          icon: <Feather className="w-5 h-5 text-brand-500" />
        },
        {
          title: 'Sub-Second Performance',
          tagline: 'vs. Loading Fatigue',
          description: 'We compile optimized custom architectures, ensuring sub-second execution on cellular devices. No heavy frameworks, no unnecessary scripts — just sheer structural speed.',
          icon: <Sparkles className="w-5 h-5 text-brand-500" />
        },
        {
          title: 'Bespoke Development',
          tagline: 'vs. Standard Templates',
          description: 'Each workspace is configured customized for your story. We design responsive layouts from a blank page, building tailor-made platforms that reflect corporate authority.',
          icon: <Compass className="w-5 h-5 text-brand-500" />
        }
      ]
    },
    fr: {
      badge: 'DOCTRINE DE CONCEPTION CLINIQUE',
      title1: 'Simplicité intemporelle',
      title2: 'au-delà du bruit numérique actuel.',
      desc: 'Le design web sur mesure ne consiste pas à rajouter des décorations — il s’agit de purifier les éléments pour forger une connexion pure avec votre client.',
      quote: '"La simplicité est la sophistication suprême." — Léonard de Vinci',
      philo: [
        {
          title: 'Espace Réfléchi',
          tagline: 'vs. Surcharge Complexe',
          description: 'Un espacement négatif généreux permet au message de votre marque de respirer. Nous équilibrons les grilles de façon ordonnée pour concentrer l’attention.',
          icon: <Feather className="w-5 h-5 text-brand-500" />
        },
        {
          title: 'Performance Supérieure',
          tagline: 'vs. Lenteur Système',
          description: 'Nous concevons des architectures optimisées, garantissant un chargement de moins d’une seconde même sur mobile. Pas de fioritures, juste de la vitesse.',
          icon: <Sparkles className="w-5 h-5 text-brand-500" />
        },
        {
          title: 'Développement Propriétaire',
          tagline: 'vs. Templates Standard',
          description: 'Chaque projet est conçu exclusivement pour votre histoire. Nous construisons des structures sur mesure au pixel près pour asseoir votre autorité professionnelle.',
          icon: <Compass className="w-5 h-5 text-brand-500" />
        }
      ]
    }
  };

  const active = translations[language] || translations.en;

  return (
    <section id="the-problem" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-brand-500/5">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            {active.badge}
          </p>
          <h2 className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {active.title1} <br />
            <span className="font-serif italic text-brand-500">
              {active.title2}
            </span>
          </h2>
          <p className={`font-sans text-base max-w-xl mx-auto font-light ${isDark ? 'text-gray-400' : 'text-gray-650'}`}>
            {active.desc}
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {active.philo.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                isDark 
                  ? 'bg-dark-card/40 border-white/5 hover:border-brand-500/30' 
                  : 'bg-white border-brand-100 hover:border-brand-500/40 shadow-sm shadow-brand-500/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-white/5 border border-white/5' : 'bg-brand-50 border border-brand-100'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-500 font-semibold bg-brand-500/10 px-2 py-1 rounded">
                    {item.tagline}
                  </span>
                </div>

                <h3 className={`font-display text-xl sm:text-2xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet visual alignment sentence */}
        <div className="text-center pt-6">
          <p className={`font-serif italic text-lg sm:text-xl text-brand-500`}>
            {active.quote}
          </p>
        </div>

      </div>
    </section>
  );
}
