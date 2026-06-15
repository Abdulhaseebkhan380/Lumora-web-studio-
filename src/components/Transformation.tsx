import React from 'react';
import { Compass, Feather, Cpu, ArrowRight } from 'lucide-react';

interface TransformationProps {
  isDark: boolean;
}

export default function Transformation({ isDark }: TransformationProps) {
  const steps = [
    {
      num: '01',
      title: 'Structural Alignment',
      subtitle: 'Discovery & Creative Direction',
      description: 'We align on your specific goals to explore visual boundaries, design high-fidelity grids, and establish a classic editorial aesthetic customized for your audience.',
      icon: <Compass className="w-5 h-5 text-brand-500" />
    },
    {
      num: '02',
      title: 'Meticulous Visual Design',
      subtitle: 'Form, Proportion & Typography',
      description: 'We focus purely on layout hierarchy, letter tracking, and positive/negative space balancing. Every pixel is custom configured to evoke your brand’s authority.',
      icon: <Feather className="w-5 h-5 text-brand-500" />
    },
    {
      num: '03',
      title: 'High-Performance Coding',
      subtitle: 'Semantic, Lightweight Production',
      description: 'The approved design is compiled directly into sub-second, clean React code with optimal local database caching, structured SEO schema tags, and responsive layouts.',
      icon: <Cpu className="w-5 h-5 text-brand-500" />
    }
  ];

  return (
    <section id="transformation" className="py-24 relative overflow-hidden bg-gradient-to-b from-brand-500/5 to-transparent border-y border-brand-100/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            PROJECT METHODOLOGY
          </p>
          <h2 className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our methodical approach <br />
            <span className="font-serif italic text-brand-500">
              to digital craftsmanship.
            </span>
          </h2>
          <p className={`font-sans text-base max-w-xl mx-auto font-light ${isDark ? 'text-gray-400' : 'text-gray-650'}`}>
            Standard layouts are rushed. We follow a strict creative process to ensure your web presence is beautiful, responsive, and enduring.
          </p>
        </div>

        {/* Process Steps List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border text-left relative transition-all duration-350 ${
                isDark 
                  ? 'bg-dark-card/40 border-white/5 hover:border-brand-500/35' 
                  : 'bg-white border-brand-100 hover:border-brand-500/30'
              }`}
            >
              {/* Stepper Index badge */}
              <div className="absolute top-6 right-6 font-serif italic text-3xl text-brand-500/20 font-bold select-none">
                {step.num}
              </div>

              <div className="space-y-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-white/5' : 'bg-brand-50'
                }`}>
                  {step.icon}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-500 block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className={`font-display text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-950'}`}>
                    {step.title}
                  </h3>
                </div>

                <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
