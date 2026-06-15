import React from 'react';
import { Code, Smile, Zap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatsProps {
  isDark: boolean;
}

export default function Stats({ isDark }: StatsProps) {
  const { statsData, t } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code': return <Code className="w-5 h-5 text-brand-500" />;
      case 'Smile': return <Smile className="w-5 h-5 text-brand-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-brand-500" />;
      case 'Award': return <Award className="w-5 h-5 text-brand-500" />;
      default: return <Code className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <section id="statistics" className="py-20 relative overflow-hidden border-y border-brand-100/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((item) => (
            <div
              id={item.id}
              key={item.id}
              className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                isDark 
                  ? 'bg-dark-card/30 border-white/5 shadow-sm' 
                  : 'bg-white border-brand-100 shadow-sm shadow-brand-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-brand-500">
                  {getIcon(item.iconName)}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">✓ {(item.iconName === 'Code' || item.iconName === 'Zap') ? 'METRIC' : 'QUALITY'}</div>
              </div>

              <div className="mb-1">
                <span className={`font-display text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-950'
                }`}>
                  {item.number}{item.suffix}
                </span>
              </div>

              <h3 className={`font-sans text-sm font-semibold mb-1 ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {item.label}
              </h3>

              <p className={`font-sans text-xs leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
