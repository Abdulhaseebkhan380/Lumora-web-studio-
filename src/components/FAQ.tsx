import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  isDark: boolean;
}

export default function FAQ({ isDark }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does a typical project require?',
      a: 'Most bespoke business platforms and custom portfolios are fully designed and developed in 2 to 3 weeks. Complex e-commerce stores or deep corporate listings databases require 4 to 6 weeks. Every deadline is fully aligned on beforehand and delivered with transparent daily updates.'
    },
    {
      q: 'Do you work on redesigning existing platforms?',
      a: 'Certainly. We specialize in transforming sluggish, outdated interfaces into elegant, custom-programmed web assets. We preserve your existing content parameters, SEO crawling hooks, and domain integrations to ensure zero launch-day downtime.'
    },
    {
      q: 'What is your process for custom programming?',
      a: 'Every interface is custom-developed from scratch using modern React and styled with modular tailwind specifications. This completely eliminates heavy templates, page builders, or unneeded scripts, yielding sub-second rendering averages.'
    },
    {
      q: 'Do you offer post-launch technical maintenance?',
      a: 'Yes, we provide personal maintenance agreements to monitor cloud security, perform database optimization, handle small text or image changes, and ensure your site’s Lighthouse scores remain perfectly optimized.'
    },
    {
      q: 'Do you work with international clients?',
      a: 'Regularly. We coordinate with clients globally. Projects are managed transparently with regular progress logs via email, and meetings are organized on channels that respect your schedule and timezone constraints.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-brand-500 font-bold mb-4">
            STUDIO ALIGNMENT INFO
          </p>
          <h2 id="faq-heading" className={`font-display text-4xl sm:text-5xl font-light tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently asked <br />
            <span className="font-serif italic text-brand-500">queries answered.</span>
          </h2>
          <p className={`font-sans text-base max-w-md mx-auto font-light ${isDark ? 'text-gray-400' : 'text-gray-655'}`}>
            Direct, simple replies to help clarify details about bespoke design collaborations.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                id={`faq-accordion-${idx}`}
                key={idx}
                className={`rounded-xl border transition-all duration-300 ${
                  isDark 
                    ? 'bg-dark-card/40 border-white/5' 
                    : 'bg-white border-brand-105 shadow-sm'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-medium text-base sm:text-lg select-none cursor-pointer"
                >
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors ${
                    isDark ? 'bg-white/5 text-gray-400' : 'bg-brand-50 text-brand-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-500" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Disclosure panel with transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-56 border-t border-inherit opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className={`p-6 text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
