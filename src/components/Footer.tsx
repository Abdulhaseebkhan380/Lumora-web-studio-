import React from 'react';
import { Linkedin, Mail, ArrowUpCircle, Heart, Facebook, Instagram, Phone, MessageSquare } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-16 text-left relative overflow-hidden ${
      isDark 
        ? 'bg-dark-bg/40 border-white/5 text-gray-400' 
        : 'bg-[#fafafa] border-brand-100 text-gray-500'
    }`}>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">
          
          {/* Col 1: Brand Description */}
          <div className="lg:col-span-5 space-y-6">
            <a id="footer-logo" href="#" className="flex items-center group self-start">
              <Logo className="h-10 sm:h-12" isDark={isDark} />
            </a>

            <p className="text-xs font-light leading-relaxed max-w-sm">
              We design and code bespoke digital platforms focused on extreme simplicity, typographic rhythm, and sub-second rendering. Handcrafted in Karachi for global brands and independent creators.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-2 flex-wrap">
              <a
                id="footer-social-mail"
                href="mailto:lumorawebstudio.services@gmail.com"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="Mail"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                id="footer-social-whatsapp"
                href="https://wa.me/923378362651"
                target="_blank"
                rel="noreferrer"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                id="footer-social-phone"
                href="tel:03378362651"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="Call direct"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                id="footer-social-facebook"
                href="https://www.facebook.com/share/1BVax64dgF/"
                target="_blank"
                rel="noreferrer"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-social-instagram"
                href="https://www.instagram.com/lumora_web_studio_?igsh=YXAwczNya2Jqc2xx"
                target="_blank"
                rel="noreferrer"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-linkedin"
                href="https://www.linkedin.com/in/lumora-web-studio-undefined-b64078416?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-all text-xs border ${
                  isDark ? 'bg-white/5 border-white/10 text-brand-300 hover:text-white' : 'bg-white border-brand-100 text-gray-700 shadow-sm hover:text-brand-500'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Navigation Links
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><a href="#services" className="hover:text-brand-500 transition-colors">Client Services</a></li>
              <li><a href="#portfolio" className="hover:text-brand-500 transition-colors">Case Studies</a></li>
              <li><a href="#about" className="hover:text-brand-500 transition-colors">About Studio</a></li>
              <li><a href="#transformation" className="hover:text-brand-500 transition-colors">Methodology</a></li>
              <li><a href="#faq" className="hover:text-brand-500 transition-colors">FAQ Answers</a></li>
              <li><a href="#contact" className="hover:text-brand-500 transition-colors">Direct Contact</a></li>
              <li className="pt-1 border-t border-dashed border-gray-500/20">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('toggle-admin-inbox'))} 
                  className="hover:text-brand-500 transition-colors cursor-pointer text-left font-sans text-[10px] font-mono tracking-wider uppercase text-slate-500 hover:text-brand-500 flex items-center gap-1 bg-transparent border-none p-0"
                >
                  <span>🔒 STUDIO DATABASE VAULT</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-950'}`}>
              Studio Coordinates
            </h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li>
                <span className="block font-semibold text-[10px] text-gray-500 font-mono">PRIMARY INQUIRIES</span>
                <a href="mailto:lumorawebstudio.services@gmail.com" className="hover:text-brand-500 underline decoration-dashed break-all">
                  lumorawebstudio.services@gmail.com
                </a>
              </li>
              <li>
                <span className="block font-semibold text-[10px] text-gray-500 font-mono">WHATSAPP & VOICE</span>
                <a href="https://wa.me/923378362651" target="_blank" rel="noreferrer" className="hover:text-brand-500 underline decoration-dashed break-all">
                  +92 337 8362651
                </a>
              </li>
              <li>
                <span className="block font-semibold text-[10px] text-gray-500 font-mono">HQ GEOGRAPHY</span>
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-white/5' : 'border-brand-100'
        }`}>
          <div className="font-light">
            © {currentYear} Lumora Web Studio. All layout concepts reserved.
          </div>

          <div className="flex items-center gap-2 font-light">
            <span>React & Tailwind CSS</span>
            <Heart className="w-3 h-3 text-brand-500 fill-brand-500" />
            <span>Karachi, Pakistan</span>
          </div>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className={`p-1.5 rounded-sm hover:scale-105 transition-transform ${
              isDark ? 'bg-white/5 text-gray-400' : 'bg-brand-50 text-brand-500'
            }`}
            aria-label="Scroll back layout to top"
          >
            <ArrowUpCircle className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
