import React from 'react';
import { Compass, Cpu, Mail, Linkedin, Sparkles, Feather, ShieldCheck, Facebook, Instagram, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const { language } = useLanguage();

  const translations = {
    en: {
      badge: 'THE CREATIVE ENGINEER',
      title1: 'Deliberate layouts,',
      title2: 'meticulous engineering.',
      p1: 'Hello! We are Lumora Web Studio, a digital design and crafting studio focused on crafting highly polished web platforms. Our process is centered on absolute precision — we believe that a website is a direct extension of a brand\'s authority, and should read with natural harmony.',
      p2: 'Based in Karachi, Pakistan, we specialize in engineering bespoke websites from scratch. By ignoring complex page builders and heavy template frameworks, we write optimized, clean code that loads instantly, responds beautifully to any device, and builds lasting user trust.',
      pillar1Title: 'Visual Integrity',
      pillar1Desc: 'Elegant typographic paired grids.',
      pillar2Title: 'Clean Compilation',
      pillar2Desc: 'Sub-second load times achieved.',
      competencyTitle: 'TECHNICAL EXCELLENCE',
      competencies: [
        { name: 'Bespoke UI/UX Layout Design', value: 'High-Fidelity Grids' },
        { name: 'Responsive Hand-Coded Architecture', value: 'Pixel-Perfect viewports' },
        { name: 'React & TypeScript Development', value: 'Custom State Controllers' },
        { name: 'Tailwind CSS Stylist', value: 'Timeless layouts' },
        { name: 'Core Web Vitals Alignment', value: 'Sub-second speed' },
        { name: 'Search Engine Index Engineering', value: 'JSON-LD Structured data' },
      ]
    },
    fr: {
      badge: 'L\'ASSISTANT CRÉATIF',
      title1: 'Gabarits délibérés,',
      title2: 'ingénierie méticuleuse.',
      p1: 'Bonjour! Nous sommes Lumora Web Studio, un atelier de conception et de création numérique axé sur le développement de plateformes web haut de gamme. Notre processus est centré sur la précision absolue — nous croyons qu’un site web est une extension directe de l’autorité d’une marque, s’adaptant avec une harmonie naturelle.',
      p2: 'Spécialisés dans la conception de sites web haut de gamme à partir d’une page blanche, nous contournons les constructeurs de pages complexes et les thèmes de conception préfaits. Nous écrivons un code optimisé et propre qui charge instantanément, s’adapte magnifiquement à tous les écrans, et instaure une confiance durable.',
      pillar1Title: 'Intégrité Visuelle',
      pillar1Desc: 'Des grilles typographiques soignées et alignées.',
      pillar2Title: 'Compilation Propre',
      pillar2Desc: 'Chargement en moins d’une seconde garanti.',
      competencyTitle: 'EXCELLENCE TECHNIQUE',
      competencies: [
        { name: 'Conception d’interfaces sur mesure UI/UX', value: 'Grilles Haute Fidélité' },
        { name: 'Architecture réactive codée à la main', value: 'Pixel-Perfect' },
        { name: 'Développement avancé React et TypeScript', value: 'Données Typées Robustes' },
        { name: 'Mise en page épurée avec Tailwind CSS', value: 'Design Intemporel' },
        { name: 'Alignement avec les signaux web essentiels (Vitals)', value: 'Super Rapide' },
        { name: 'Optimisation pour le référencement naturel', value: 'Données Structurées JSON-LD' },
      ]
    }
  };

  const active = translations[language] || translations.en;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Soft Backdrop Orbs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Personal Story */}
          <div className="lg:col-span-6 text-left space-y-6">
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold">
              {active.badge}
            </p>

            <h2 className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {active.title1} <br />
              <span className="font-serif italic text-brand-500">
                {active.title2}
              </span>
            </h2>

            <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {active.p1}
            </p>

            <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-655'}`}>
              {active.p2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{active.pillar1Title}</p>
                  <p className="text-[11px] text-gray-500">{active.pillar1Desc}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{active.pillar2Title}</p>
                  <p className="text-[11px] text-gray-500">{active.pillar2Desc}</p>
                </div>
              </div>
            </div>

            {/* Contact coordinates */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 ${
              isDark ? 'bg-white/5 border-white/5' : 'bg-brand-50/50 border-brand-100'
            }`}>
              <div className="space-y-1">
                <p className="text-[10px] font-mono tracking-widest text-brand-500 uppercase font-black">INQUIRIES</p>
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:lumorawebstudio.services@gmail.com" className={`text-xs font-semibold hover:text-brand-500 transition-colors block ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    lumorawebstudio.services@gmail.com
                  </a>
                  <a href="https://wa.me/923378362651" target="_blank" rel="noreferrer" className={`text-xs font-semibold hover:text-brand-500 transition-colors block ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    WhatsApp / Call: 03378362651
                  </a>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a
                  id="about-contact-mail"
                  href="mailto:lumorawebstudio.services@gmail.com"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Send Mail"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  id="about-contact-whatsapp"
                  href="https://wa.me/923378362651"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Chat on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  id="about-contact-phone"
                  href="tel:03378362651"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Phone Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  id="about-contact-facebook"
                  href="https://www.facebook.com/share/1BVax64dgF/"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Visit Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  id="about-contact-instagram"
                  href="https://www.instagram.com/lumora_web_studio_?igsh=YXAwczNya2Jqc2xx"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Visit Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  id="about-contact-linkedin"
                  href="https://www.linkedin.com/in/lumora-web-studio-undefined-b64078416?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all border ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Visit LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Key Competencies Index */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-8 rounded-xl border ${
              isDark ? 'bg-dark-card border-white/5' : 'bg-white border-brand-100 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-100/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-500 animate-pulse" />
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {active.competencyTitle}
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-green-500/10 text-green-500">
                  W3C COMPLIANT
                </div>
              </div>

              <div className="space-y-4">
                {active.competencies.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-brand-100/5 text-left">
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-brand-500 text-right">
                      {skill.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
