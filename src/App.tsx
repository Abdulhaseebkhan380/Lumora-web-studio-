import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Problem from './components/Problem';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Transformation from './components/Transformation';
import WhyChooseUs from './components/WhyChooseUs';
import AuditLeadMagnet from './components/AuditLeadMagnet';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminInbox from './components/AdminInbox';
import AnimatedSection from './components/AnimatedSection';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { language } = useLanguage();

  // Handle dynamic document direction and lang attributes
  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  // Sync schema metadata & semantic SEO tags
  useEffect(() => {
    // Dynamically adjust body background transition colors
    if (isDark) {
      document.body.classList.add('bg-dark-bg');
      document.body.classList.remove('light-theme', 'bg-white');
    } else {
      document.body.classList.add('light-theme', 'bg-white');
      document.body.classList.remove('bg-dark-bg');
    }

    // Dynamic SEO update
    document.title = "Lumora Web Studio | Elegant Custom Web Design & Code";

    // Inject SEO Schema structured JSON-LD
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Lumora Web Studio",
      "image": "https://lumora.studio/icon.png",
      "description": "Bespoke web design & digital architectural design studio delivering sub-second custom responsive websites and conversion pipelines.",
      "url": "https://lumora.studio",
      "telephone": "+923000000000",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gulshan-e-Iqbal Block 1",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "75300",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.8607,
        "longitude": 67.0011
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    const existingScript = document.getElementById('lumora-rich-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'lumora-rich-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('lumora-rich-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [isDark]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative ${
      isDark ? 'bg-dark-bg text-white' : 'bg-[#fafafa] text-gray-950'
    }`}>
      {/* Absolute Header Navigation */}
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />

      {/* Main Structural Agency Sections */}
      <main className="relative">
        <AnimatedSection duration={1.0} yOffset={25}>
          <Hero isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Stats isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Problem isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Services isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Portfolio isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <About isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Transformation isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <WhyChooseUs isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <AuditLeadMagnet isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <Contact isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <FAQ isDark={isDark} />
        </AnimatedSection>
        
        <AnimatedSection>
          <FinalCTA isDark={isDark} />
        </AnimatedSection>
      </main>

      {/* Structured Footer */}
      <Footer isDark={isDark} />

      {/* Secure Studio Message Vault Overlay */}
      <AdminInbox isDark={isDark} />
    </div>
  );
}
