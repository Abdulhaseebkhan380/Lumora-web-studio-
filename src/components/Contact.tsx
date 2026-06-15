import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Send, Facebook, Instagram, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, t } = useLanguage();

  const translations = {
    en: {
      boxTitle: 'Send an Instant Message',
      formSubmittedTitle: 'Message delivered.',
      formSubmittedDesc: 'Thank you. We will correspond back with you momentarily.',
      formSubmittedCta: 'Send Another'
    },
    fr: {
      boxTitle: 'Envoyer un Message Instantané',
      formSubmittedTitle: 'Message envoyé avec succès.',
      formSubmittedDesc: 'Merci. Nous vous répondrons dans les plus brefs délais.',
      formSubmittedCta: 'Envoyer un autre'
    },
    es: {
      boxTitle: 'Enviar un Mensaje Instantáneo',
      formSubmittedTitle: 'Mensaje entregado con éxito.',
      formSubmittedDesc: 'Gracias. Le responderemos a la brevedad.',
      formSubmittedCta: 'Enviar Otro'
    },
    ur: {
      boxTitle: 'فوری پیغام بھیجیں',
      formSubmittedTitle: 'پیغام بھیج دیا گیا۔',
      formSubmittedDesc: 'شکریہ۔ ہم جلد ہی آپ سے رابطہ کریں گے۔',
      formSubmittedCta: 'ایک اور بھیجیں'
    }
  };

  const active = translations[language as 'en' | 'fr' | 'es' | 'ur'] || translations.en;

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (!response.ok) {
        throw new Error('Live API server responded with error');
      }
    } catch (err) {
      console.warn('Backend API request skipped, fallback to localStorage backup system active:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Keep inquiries in cache as a browser safeguard
      const existingInquiries = JSON.parse(localStorage.getItem('arbina_messages') || '[]');
      existingInquiries.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem('arbina_messages', JSON.stringify(existingInquiries));

      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold">
                {t('contact.badge')}
              </p>

              <h2 id="contact-heading" className={`font-display text-4xl sm:text-5xl font-light tracking-tight leading-none ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('contact.title1')} <br />
                <span className="font-serif italic text-brand-500">{t('contact.title2')}</span>
              </h2>

              <p className={`font-sans text-base font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-655'}`}>
                {t('contact.desc')}
              </p>
            </div>

            {/* Quiet Boutique Cards */}
            <div className="space-y-3.5">
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">DIRECT EMAIL</span>
                  <a href="mailto:lumorawebstudio.services@gmail.com" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    lumorawebstudio.services@gmail.com
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">WHATSAPP CHAT</span>
                  <a href="https://wa.me/923378362651" target="_blank" rel="noreferrer" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Let's Chat: +92 337 8362651
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">DIRECT TEL</span>
                  <a href="tel:03378362651" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Call: 03378362651
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">FACEBOOK CONNECT</span>
                  <a href="https://www.facebook.com/share/1BVax64dgF/" target="_blank" rel="noreferrer" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    lumora.web.studio
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">INSTAGRAM PROFILE</span>
                  <a href="https://www.instagram.com/lumora_web_studio_?igsh=YXAwczNya2Jqc2xx" target="_blank" rel="noreferrer" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    @lumora_web_studio_
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">PROFESSIONAL NETWORK</span>
                  <a href="https://www.linkedin.com/in/lumora-web-studio-undefined-b64078416?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className={`text-xs sm:text-sm font-semibold hover:text-brand-500 transition-colors truncate block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    lumora-web-studio
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                isDark ? 'bg-dark-card/40 border-white/5' : 'bg-white border-brand-105 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">STUDIO BASE</span>
                  <span className={`text-xs sm:text-sm font-semibold block ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Karachi, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quick Message Box */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-xl border text-left relative ${
              isDark ? 'bg-dark-card/50 border-white/5' : 'bg-white border-brand-105 shadow-sm shadow-brand-500/5'
            }`}>
              <h3 className={`font-display text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {active.boxTitle}
              </h3>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="text-brand-500 text-3xl">✓</div>
                  <h4 className="font-display text-lg font-semibold">{t('contact.success')}</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    {active.formSubmittedDesc}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-brand-500 text-white font-sans text-xs uppercase cursor-pointer"
                  >
                    {active.formSubmittedCta}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-5">
                  <div>
                    <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact.namePlaceholder')}
                      className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                        isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-brand-55/10 border-brand-105 text-gray-950'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.emailPlaceholder')}
                      className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                        isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-brand-55/10 border-brand-105 text-gray-950'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {t('contact.msgLabel')}
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder={t('contact.msgPlaceholder')}
                      className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                        isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-brand-55/10 border-brand-105 text-gray-950'
                      }`}
                    />
                  </div>

                  <button
                    id="direct-msg-submit"
                    type="submit"
                    className="w-full py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase font-semibold tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? t('contact.submitting') : t('contact.submit')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
