import React, { useState } from 'react';
import { Eye, Code, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';

interface PortfolioProps {
  isDark: boolean;
}

export default function Portfolio({ isDark }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { portfolioData, t } = useLanguage();

  // Classic Simplified Category Filters
  const categoriesList = [
    { key: 'all', label: t('portfolio.all') },
    { key: 'bakery', label: t('portfolio.bakery') },
    { key: 'cleaning', label: t('portfolio.cleaning') },
    { key: 'clinic', label: t('portfolio.clinic') },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            {t('portfolio.badge')}
          </p>
          <h2 className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('portfolio.title1')} <br />
            <span className="font-serif italic text-brand-500">
              {t('portfolio.title2')}
            </span>
          </h2>
          <p className={`font-sans text-base max-w-xl mx-auto font-light ${isDark ? 'text-gray-400' : 'text-gray-650'}`}>
            {t('portfolio.desc')}
          </p>
        </div>

        {/* Quiet Minimal Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categoriesList.map((category) => (
            <button
              id={`portfolio-cat-${category.key}`}
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === category.key
                  ? 'bg-brand-500 text-white shadow-sm'
                  : isDark
                    ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                    : 'bg-brand-50 text-gray-800 hover:bg-brand-100/50 border border-brand-100/40'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div
              id={project.id}
              key={project.id}
              className={`rounded-xl border text-left flex flex-col justify-between group overflow-hidden transition-all duration-400 ${
                isDark 
                  ? 'bg-dark-card/50 border-white/5 hover:border-brand-500/30' 
                  : 'bg-white border-brand-105 hover:border-brand-500/30 shadow-sm shadow-brand-500/5'
              }`}
            >
              {/* Browser bar effect */}
              <div className={`px-4 py-3 bg-inherit border-b border-inherit flex items-center justify-between`}>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500/30"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500/50"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500/70"></span>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                  {project.category} // archive
                </div>
              </div>

              {/* Image and Live Preview Container */}
              {project.imageUrl && (
                <div className={`relative w-full border-b ${isDark ? 'border-white/10' : 'border-gray-100'} bg-black/5`}>
                  <div className="relative aspect-[16/10] overflow-hidden group/thumb">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} Screenshot`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/thumb:scale-[1.03]"
                    />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center animate-fade-in"
                      >
                        <span className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-sans text-xs uppercase tracking-widest font-semibold shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer">
                          {t('portfolio.viewProject')} ↗
                        </span>
                      </a>
                    )}
                  </div>

                  {/* Elegant Live Preview Control below the picture */}
                  <div className={`px-5 py-3 flex items-center justify-between border-t text-xs font-mono select-none ${
                    isDark ? 'border-white/5 bg-white/[0.02] text-gray-400' : 'border-gray-100 bg-brand-50/10 text-gray-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold">
                        Showcase Live
                      </span>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-widest font-semibold text-brand-500 hover:text-brand-600 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                      >
                        Live Preview ↗
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Card Main Body */}
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-500 uppercase font-semibold block mb-2">
                    {project.clientName}
                  </span>
                  <h3 className={`font-display text-2xl font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-950'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light line-clamp-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                </div>

                {/* Tags block */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-md text-[10px] font-mono ${
                        isDark 
                          ? 'bg-white/5 text-gray-400' 
                          : 'bg-brand-50 text-brand-700 font-medium'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className={`p-6 border-t border-inherit/40 bg-inherit flex justify-between items-center`}>
                <span className="font-mono text-xs text-green-500 font-semibold uppercase">
                  LH {project.performanceScore} Score ✓
                </span>
                <button
                  id={`portfolio-demo-${project.id}`}
                  onClick={() => setActiveProject(project)}
                  className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  Explore Case
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CASE STUDY DETAIL DIALOG */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className={`w-full max-w-2xl rounded-xl border overflow-hidden shadow-2xl relative text-left ${
            isDark ? 'bg-dark-card border-white/15 text-white' : 'bg-white border-brand-105 text-gray-950'
          }`}>
            {/* Header */}
            <div className={`px-6 py-4 border-b border-inherit bg-inherit flex items-center justify-between`}>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-500">
                CASE REVIEW // {activeProject.clientName}
              </span>
              <button
                id="close-preview-dialog"
                onClick={() => setActiveProject(null)}
                className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                aria-label="Close case review"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <span className="text-xs font-mono text-gray-500 tracking-wider">PROJECT STATEMENT</span>
                <h3 className="font-display text-3xl font-light">
                  {activeProject.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-100/10">
                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Aesthetic Choice</span>
                  <p className={`text-xs sm:text-sm font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bespoke grid structure with absolute typography hierarchies and high-fidelity asset loading protocols.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Coded Framework</span>
                  <p className={`text-xs sm:text-sm font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Handcrafted React components engineered strictly on Tailwind styles with zero bloated framework elements.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t('portfolio.features')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeProject.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                      <span className="font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Interactive Embed container */}
              {activeProject.liveUrl && (
                <div className="space-y-2 pt-4 border-t border-brand-100/10">
                  <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">LIVE INTERACTIVE EMBED</span>
                  <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'} h-64 sm:h-96 w-full relative group`}>
                    <iframe 
                      src={activeProject.liveUrl} 
                      className="w-full h-full border-0 bg-white" 
                      title={`${activeProject.title} Live Demo`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center text-white">
                      <span className="text-[10px] font-mono animate-pulse">Live sandboxed emulator</span>
                      <a 
                        href={activeProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] uppercase font-mono tracking-widest bg-brand-500 px-3 py-1.5 rounded hover:bg-brand-600 transition-colors text-white"
                      >
                        Open Fullscreen External ↗
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats alignment bar */}
              <div className={`p-4 rounded-lg flex items-center justify-between font-mono bg-brand-500/10 text-brand-500 text-xs`}>
                <span>GOOGLE LIGHTHOUSE PERFORMANCE SCORE:</span>
                <span className="font-bold">{activeProject.performanceScore}/100 PROVEN</span>
              </div>
            </div>

            {/* Back action */}
            <div className="p-6 bg-inherit border-t border-inherit flex justify-end gap-3 flex-wrap">
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-2.5 rounded-lg border border-brand-500/50 hover:bg-brand-500/10 transition-all font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 ${
                    isDark ? 'text-brand-200' : 'text-brand-700'
                  }`}
                >
                  <span>Launch Live Site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Return To Index
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
