import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languagesList: { code: 'en' | 'fr' | 'es' | 'ur'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ur', label: 'اردو' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.faq'), href: '#faq' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-dark-bg/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-[#faf8f5]/90 backdrop-blur-md border-b border-brand-100 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Lumora Web Studio Vector */}
        <a id="nav-logo" href="#" className="flex items-center group">
          <Logo className="h-9 sm:h-11" isDark={isDark} />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              id={`nav-link-${link.name.toLowerCase()}`}
              key={link.name}
              href={link.href}
              className={`font-sans text-xs uppercase tracking-widest font-medium transition-colors hover:text-brand-500 relative py-1 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Controls (Theme Toggle, Language Switcher & CTA) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Elegant Language Dropdown */}
          <div className="relative">
            <button
              id="language-switcher"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`px-3 py-2 rounded-lg border font-mono text-[10px] font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  : 'bg-white border-brand-100 hover:bg-brand-50/50 text-gray-700'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span className="uppercase">{language}</span>
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div
                  className={`absolute right-0 mt-2 w-32 rounded-lg border shadow-lg py-1.5 z-50 transition-all ${
                    isDark
                      ? 'bg-dark-card border-white/10 text-gray-300'
                      : 'bg-white border-brand-105 text-gray-700'
                  }`}
                >
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3.5 py-1.5 text-xs transition-colors hover:text-brand-500 cursor-pointer ${
                        language === lang.code
                          ? 'font-bold text-brand-500'
                          : ''
                      } ${language === 'ur' ? 'text-right' : 'text-left'}`}
                      style={{ direction: lang.code === 'ur' ? 'rtl' : 'ltr' }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            id="theme-toggler"
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                : 'bg-white border-brand-100 hover:bg-brand-50/50 text-gray-700'
            }`}
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <a
            id="nav-cta"
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center gap-1.5"
          >
            {t('nav.cta')}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Switcher Dropdown */}
          <div className="relative">
            <button
              id="mobile-language-switcher"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`p-2 rounded-xl border font-mono text-[10px] font-bold tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 text-brand-200'
                  : 'bg-white border-brand-150 text-gray-700'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span className="uppercase">{language}</span>
            </button>
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div
                  className={`absolute right-0 mt-2 w-32 rounded-lg border shadow-lg py-1.5 z-50 transition-all ${
                    isDark
                      ? 'bg-dark-card border-white/10 text-gray-300'
                      : 'bg-white border-brand-105 text-gray-700'
                  }`}
                >
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3.5 py-1.5 text-xs transition-colors hover:text-brand-500 cursor-pointer ${
                        language === lang.code
                          ? 'font-bold text-brand-500'
                          : ''
                      } ${language === 'ur' ? 'text-right' : 'text-left'}`}
                      style={{ direction: lang.code === 'ur' ? 'rtl' : 'ltr' }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            id="mobile-theme-toggler"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border-white/10 text-brand-200'
                : 'bg-white border-brand-150 text-gray-700'
            }`}
            aria-label="Toggle mobile theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            id="mobile-menu-toggler"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl border transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-white border-brand-150 text-gray-900'
            }`}
            aria-label="Open mobile menu"
          >
            {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-y-0 right-0 w-72 z-40 transform transition-transform duration-300 ease-out md:hidden shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDark ? 'bg-dark-card border-l border-white/10 text-white' : 'bg-white border-l border-brand-100 text-gray-900'}`}
        style={{ top: '69px', height: 'calc(100vh - 69px)' }}
      >
        <div className="p-6 flex flex-col gap-6 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-lg font-display font-medium text-xl transition-colors flex items-center justify-between ${
                  isDark ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-brand-50 text-gray-700'
                }`}
              >
                {link.name}
                <span className="text-brand-500 font-serif">.</span>
              </a>
            ))}
          </div>

          <div className="mt-8 border-t border-brand-100 pt-6">
            <a
              id="mobile-nav-cta"
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-center font-medium uppercase text-xs tracking-widest block"
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
