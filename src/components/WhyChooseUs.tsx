import React from 'react';
import { Palette, Zap, Cpu, MessageSquare, Check } from 'lucide-react';

interface WhyChooseUsProps {
  isDark: boolean;
}

export default function WhyChooseUs({ isDark }: WhyChooseUsProps) {
  const details = [
    {
      title: 'Aesthetic Rigor',
      desc: 'Form is never secondary. We design layouts that celebrate deliberate asymmetry, elegant margins, and exquisite typography.',
      icon: <Palette className="w-5 h-5 text-brand-500" />
    },
    {
      title: 'Optimal Core Code',
      desc: 'Sub-second rendering averages across standard 3G/4G cellular networks, built entirely with custom React logic.',
      icon: <Cpu className="w-5 h-5 text-brand-500" />
    },
    {
      title: 'Standards Compliance',
      desc: 'Fully indexable by global search crawl engines. Safe, W3C structural HTML semantics with SSL and local caching.',
      icon: <Zap className="w-5 h-5 text-brand-500" />
    },
    {
      title: 'Transparent Dialogue',
      desc: 'No developer jargon. We communicate through transparent schedules, structured milestones, and regular status checkouts.',
      icon: <MessageSquare className="w-5 h-5 text-brand-500" />
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-brand-500/5">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            CORE STUDIO COVENANTS
          </p>
          <h2 id="why-choose-us-heading" className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Why strategic brands <br />
            <span className="font-serif italic text-brand-500">
              align with Lumora.
            </span>
          </h2>
        </div>

        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((item, idx) => (
            <div
              id={`why-choice-${idx}`}
              key={idx}
              className={`p-6 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                isDark 
                  ? 'bg-dark-card/40 border-white/5 hover:border-brand-500/30' 
                  : 'bg-white border-brand-105 hover:border-brand-500/30 shadow-sm shadow-brand-500/5'
              }`}
            >
              <div>
                {/* Icon alignment */}
                <div className={`w-8 h-8 rounded bg-brand-500/5 flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>

                <h3 className={`font-display text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`font-sans text-xs leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>

              {/* Minimal step footer */}
              <div className="mt-8 pt-4 border-t border-brand-100/10 text-[9px] font-mono text-gray-500 flex justify-between uppercase">
                <span>COMMITMENT 0{idx + 1}</span>
                <span className="text-brand-500">✓ SECURED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
