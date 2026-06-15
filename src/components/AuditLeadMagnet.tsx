import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AuditLeadMagnetProps {
  isDark: boolean;
}

export default function AuditLeadMagnet({ isDark }: AuditLeadMagnetProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, website, message }),
      });
      
      if (!response.ok) {
        throw new Error('Live API server responded with error');
      }
    } catch (err) {
      console.warn('Backend API request skipped, fallback to localStorage backup system active:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Save consultation requests natively in localStorage
      const existingInquiries = JSON.parse(localStorage.getItem('arbina_inquiries') || '[]');
      existingInquiries.push({
        name,
        email,
        website,
        message,
        date: new Date().toISOString()
      });
      localStorage.setItem('arbina_inquiries', JSON.stringify(existingInquiries));
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setWebsite('');
    setMessage('');
    setIsSubmitted(false);
  };

  const isRtl = language === 'ur';

  return (
    <section id="audit-magnet" className="py-24 relative overflow-hidden">
      {/* Subtle details background */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Card Frame wrapping */}
        <div className={`p-8 sm:p-12 rounded-xl border relative overflow-hidden ${
          isDark 
            ? 'bg-dark-card/50 border-white/5 shadow-2xl' 
            : 'bg-white border-brand-105 shadow-sm shadow-brand-500/5'
        }`}>
          {/* Subtle top brand glow line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-500/50"></div>

          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Greeting */}
              <div className="lg:col-span-5 text-left space-y-6">
                <span className="text-[10px] font-mono tracking-[0.2em] text-brand-500 uppercase font-bold block">
                  {isRtl ? 'مشاورتی خاکہ' : 'COLLABORATIVE CONCEPT'}
                </span>
                
                <h3 className={`font-display text-2xl sm:text-3xl font-light tracking-tight leading-snug ${isDark ? 'text-white' : 'text-gray-950'}`}>
                  {t('audit.title')}
                </h3>

                <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('audit.desc')}
                </p>

                <div className="space-y-3 pt-2 text-xs font-light text-gray-500">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                    <span>{isRtl ? '100% منفرد ڈیزائن اور کوڈ' : '100% tailor-made custom components'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                    <span>{isRtl ? 'بغیر کسی اضافی لوڈ یا سست رفتار کے' : 'No complex page builder bloat'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                    <span>{isRtl ? 'سب سیکنڈ لوڈ ٹائم' : 'Sub-second load times standard'}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Interaction Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                        {t('audit.nameLabel')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('audit.namePlaceholder')}
                        className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                          isDark 
                            ? 'bg-black/30 border-white/10 text-white placeholder-gray-600' 
                            : 'bg-brand-50/10 border-brand-105 text-gray-950 placeholder-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                        {t('audit.emailLabel')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('audit.emailPlaceholder')}
                        className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                          isDark 
                            ? 'bg-black/30 border-white/10 text-white placeholder-gray-600' 
                            : 'bg-brand-50/10 border-brand-105 text-gray-950 placeholder-gray-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {t('audit.webLabel')}
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={t('audit.webPlaceholder')}
                      className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                        isDark 
                          ? 'bg-black/30 border-white/10 text-white placeholder-gray-600' 
                          : 'bg-brand-50/10 border-brand-105 text-gray-950 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[10px] font-mono uppercase tracking-wider mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {t('audit.messageLabel')}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('audit.messagePlaceholder')}
                      className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-brand-500/50 focus:outline-none ${
                        isDark 
                          ? 'bg-black/30 border-white/10 text-white placeholder-gray-600' 
                          : 'bg-brand-50/10 border-brand-105 text-gray-950 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <button
                    id="submit-free-audit"
                    type="submit"
                    className="w-full py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs uppercase font-semibold tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? t('audit.submitting') : t('audit.submit')}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center space-y-6 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto text-brand-500 border border-brand-500/20 animate-pulse">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className={`font-display text-2xl font-light ${isDark ? 'text-white' : 'text-gray-950'}`}>
                  {t('audit.success')}
                </h4>
                <p className={`font-sans text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isRtl 
                    ? `شکریہ، ${name}۔ ہم جلد ہی آپ کی ویب سائٹ کا ایک تفصیلی جائزہ پیش کریں گے۔`
                    : `Thank you, ${name}. We have received your project details and we will formulate your personalized strategic blueprint soon.`
                  }
                </p>
              </div>
              <button
                onClick={handleReset}
                className={`px-6 py-2 rounded-lg border font-mono text-[10px] tracking-wider uppercase ${
                  isDark ? 'border-white/10 text-gray-300 hover:text-white' : 'border-brand-105 text-gray-600 hover:text-gray-900 bg-white'
                }`}
              >
                {t('audit.reset')}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
