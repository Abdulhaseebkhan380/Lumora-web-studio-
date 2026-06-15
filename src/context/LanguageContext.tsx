import React, { createContext, useContext, useState, useEffect } from 'react';
import { StatCard, ProblemCard, Service, Project } from '../types';

export type Language = 'en' | 'fr' | 'ur' | 'es';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  statsData: StatCard[];
  problemsData: ProblemCard[];
  servicesData: Service[];
  portfolioData: Project[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Static translation dictionary for general UI strings
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.cta': "Let's Talk",
    'nav.langToggle': 'FR',

    // Hero Section
    'hero.badge': 'ESTABLISHED IN KARACHI • AVAILABLE WORLDWIDE',
    'hero.titleLine1': 'Bespoke websites',
    'hero.titleLine2': 'crafted to endure.',
    'hero.description': 'Welcome to Lumora Web Studio. We partner with visionary businesses to shape memorable, high-converting digital spaces. No bloated templates or sluggish systems — just beautiful typography, absolute detail, and clean, high-performance code.',
    'hero.ctaStart': 'Start A Project',
    'hero.ctaExplore': 'Explore Studies',
    'hero.focusTitle': '01 // VISUAL FOCUS',
    'hero.quote': 'Form follows function.',
    'hero.quoteDesc': 'Every line written serves a user response. We measure performance in sub-seconds and beauty in the alignment of invisible margins.',
    'hero.loadTime': 'LOAD TIME',
    'hero.loadTimeValue': '0.4s Average',
    'hero.satisfaction': 'SATISFACTION',
    'hero.satisfactionValue': '100% Retained',

    // Stats Section
    'stats.badge': 'METRICS OF TRUST',
    'stats.title1': 'Numbers that define',
    'stats.title2': 'our commitment.',
    'stats.desc': 'We don’t believe in fluff. Here are the exact engineering indices and client retention rates behind our boutique development studio.',

    // Problem Section
    'problem.badge': 'THE TRUTH ABOUT WEB DESIGN',
    'problem.title1': 'Does your website',
    'problem.title2': 'silently lose customers?',
    'problem.desc': 'Your digital storefront is the single most important asset your brand controls. Major modern performance faults can easily turn potential visitors into competitors’ buyers.',
    'problem.hoverPrompt': 'Hover over any leak to view the engineered cure.',
    'problem.cure': 'ENGINEERED CURE',

    // Services Section
    'services.badge': 'STUDIO EXPERTISE',
    'services.title1': 'Meticulous development',
    'services.title2': 'from line zero.',
    'services.desc': 'We deploy optimized full-stack web architectures tailored to capture qualified organic leads and project high-tier market authority.',

    // Portfolio Section
    'portfolio.badge': 'CASE STUDIES',
    'portfolio.title1': 'Recent digital assets',
    'portfolio.title2': 'shipped live.',
    'portfolio.desc': 'A curated breakdown of engineered websites designed from the floor up to amplify brand authority, load instantly, and drive order volumes.',
    'portfolio.all': 'All Markets',
    'portfolio.bakery': 'Artisanal Bakery',
    'portfolio.cleaning': 'Luxury Sanitation',
    'portfolio.clinic': 'Private Health Clinic',
    'portfolio.conversion': 'CONVERSION STEP-UP',
    'portfolio.perf': 'PERFORMANCE INDEX',
    'portfolio.features': 'CORE STRUCTURAL INJECTIONS',
    'portfolio.viewProject': 'Launch Live Link',
    'portfolio.github': 'View Repository',

    // About Section
    'about.badge': 'THE CREATIVE ENGINEER',
    'about.title1': 'Deliberate layouts,',
    'about.title2': 'meticulous engineering.',
    'about.desc1': "Hello! We are Lumora Web Studio, a digital design and crafting studio focused on crafting highly polished web platforms. Our process is centered on absolute precision — we believe that a website is a direct extension of a brand's authority, and should read with natural harmony.",
    'about.desc2': 'Based in Karachi, Pakistan, we specialize in engineering bespoke websites from scratch. By ignoring complex page builders and heavy template frameworks, we write optimized, clean code that loads instantly, responds beautifully to any device, and builds lasting user trust.',
    'about.pillar1': 'Visual Integrity',
    'about.pillar1Desc': 'Elegant typographic paired grids.',
    'about.pillar2': 'Sub-Second Speed',
    'about.pillar2Desc': 'Clean, lightweight React bundle execution.',
    'about.competenciesTitle': 'CORE COMPETENCIES & INDEXES',

    // Transformation Section
    'trans.badge': 'THE ANATOMY OF UPGRADES',
    'trans.title1': 'Real business overhauls:',
    'trans.title2': 'Before and After.',
    'trans.desc': 'See how we convert sluggish, outdated websites into hyper-optimized, visually captivating web engines that redefine the balance sheet.',
    'trans.beforeTitle': 'THE LEGACY PRESENCE',
    'trans.afterTitle': 'THE ENGINEERED UPGRADE',
    'trans.problems': 'EXPERIENCED CHRONIC LEAKS',
    'trans.solutions': 'CORE STRUCTURAL INTEGRITY',
    'trans.score': 'LIGHTHOUSE METRIC',

    // Why Choose Us Section
    'why.badge': 'WHY WORK WITH LUMORA STUDIO',
    'why.title1': 'A digital alliance built',
    'why.title2': 'for sustained growth.',
    'why.desc': 'We offer a boutique partnership. No generic templates, no hidden fees, and absolute accountability at every development stage.',
    'why.grid1': 'Absolute Bespoke Layouts',
    'why.grid1Desc': 'Zero page-builders or pre-packaged themes. We write unique, customized React/Tailwind architectures that match your brand precisely.',
    'why.grid2': 'Conversion-First Mechanics',
    'why.grid2Desc': 'We construct calculated visual funnels, frictionless scheduling systems, and strategic trigger cues that turn reads into revenue.',
    'why.grid3': 'Direct Executive Dialogue',
    'why.grid3Desc': 'Work directly with expert layout designers and software developers. No middle managers or communication lapses.',
    'why.grid4': 'Absolute Performance Guarantee',
    'why.grid4Desc': 'Every site we ship scores 95+ on Google Lighthouse parameters. Enjoy maximum SEO visibility and frictionless reader experiences.',

    // Audit / Lead Magnet
    'audit.title': 'Secure a Custom Digital Strategic Blueprint',
    'audit.desc': 'Want to know exactly how much revenue your current website is leaking? Provide your platform details, and we’ll run a comprehensive Lighthouse audit alongside custom layout redesign concepts. 100% free, delivered in 48 hours.',
    'audit.nameLabel': 'Your Name',
    'audit.namePlaceholder': 'e.g., Alex Carter',
    'audit.emailLabel': 'Business Email',
    'audit.emailPlaceholder': 'e.g., alex@business.com',
    'audit.webLabel': 'Current Website (Optional)',
    'audit.webPlaceholder': 'e.g., www.mybusiness.com',
    'audit.messageLabel': 'Main Goal / Visual Desires',
    'audit.messagePlaceholder': 'Describe your vision or the problems you wish to resolve...',
    'audit.submitting': 'Analyzing assets...',
    'audit.submit': 'Request Free Blueprint',
    'audit.success': 'Request Saved! We will deliver your bespoke Blueprint soon.',
    'audit.reset': 'Submit Another Request',

    // Contact Section
    'contact.badge': 'INITIATE THE VOYAGE',
    'contact.title1': 'Let’s construct something',
    'contact.title2': 'exceptional together.',
    'contact.desc': 'Ready to establish real authority? Fill out the brief below. We respond within a single business day with clear timelines.',
    'contact.nameLabel': 'Your Name',
    'contact.namePlaceholder': 'e.g., Michael Scott',
    'contact.emailLabel': 'Your Email',
    'contact.emailPlaceholder': 'e.g., michael@dundermifflin.com',
    'contact.msgLabel': 'Project Description & Constraints',
    'contact.msgPlaceholder': 'Tell us about your company, target timelines, and general feature needs...',
    'contact.submitting': 'Dispatching request...',
    'contact.submit': 'Send Direct Inquiry',
    'contact.success': 'Thank you! Your message has been received by our studio dispatch.',
    'contact.info': 'STUDIO DETAILS',
    'contact.infoLoc': 'Karachi, Pakistan',
    'contact.infoHours': 'Monday - Saturday: 9:00 AM - 7:00 PM',

    // FAQ Section
    'faq.badge': 'TRANSPARENT ANSWERS',
    'faq.title1': 'Common questions',
    'faq.title2': 'answered simply.',
    'faq.desc': 'Everything you need to know about our visual craft, pricing ranges, and precise project delivery phases.',
    'faq.q1': 'What makes Lumora different from page-builder agencies?',
    'faq.a1': 'We do not build on bloated systems like WordPress or generic Shopify themes. Every site is hand-coded using modern React and Tailwind. This ensures your site loads in sub-seconds, achieves full custom layout potential, and is infinitely scalable.',
    'faq.q2': 'How long does a classic bespoke website project take?',
    'faq.a2': 'Typically, a structured high-performance company portal takes 2 to 3 weeks from visual mockups to final live shipment. Complex e-commerce systems with customized inventories can take 4 to 5 weeks.',
    'faq.q3': 'Will I be able to edit and modify content easily?',
    'faq.a3': 'Absolutely. We configure frictionless, lightweight Content Management Systems (CMS) or clean local states suited for non-technical team members to edit text, photos, and blogs smoothly without writing code.',
    'faq.q4': 'How long do we support the code post-launch?',
    'faq.a4': 'Every deployed asset includes 30 days of complimentary priority developer support and active monitoring. We also offer highly affordable ongoing maintenance retainer agreements.',
    'faq.q5': 'What is your baseline starting price?',
    'faq.a5': 'Because every website we build is entirely personalized, pricing adapts to your specific needs. However, single high-converting landing pages start around $800, and fully featured corporate portals generally start from $1,500.',

    // Final CTA Section
    'final.title': 'Ready to claim prime digital authority?',
    'final.desc': 'Quit losing critical customers to outdated styling and lethargic speeds. Let’s collaborate to build a bespoke web presence that outperforms competition.',
    'final.btn1': 'Claim Free Site Audit',
    'final.btn2': 'Talk to Our Team',

    // Footer
    'footer.rights': 'Lumora Web Studio. All layout concepts reserved.',
    'footer.scrollTop': 'Back to top'
  },
  fr: {
    // Navbar
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'À Propos',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.cta': 'Discutons',
    'nav.langToggle': 'EN',

    // Hero Section
    'hero.badge': 'ÉTABLI À KARACHI • DISPONIBLE DANS LE MONDE ENTIER',
    'hero.titleLine1': 'Des sites web sur mesure',
    'hero.titleLine2': 'conçus pour durer.',
    'hero.description': 'Bienvenue chez Lumora Web Studio. Nous nous associons à des entreprises visionnaires pour façonner des espaces numériques mémorables et à fort taux de conversion. Pas de modèles lourds ou de systèmes lents — juste de la belle typographie, des détails absolue et un code propre et ultra-performant.',
    'hero.ctaStart': 'Démarrer un projet',
    'hero.ctaExplore': 'Explorer les projets',
    'hero.focusTitle': '01 // FOCUS VISUEL',
    'hero.quote': 'La forme suit la fonction.',
    'hero.quoteDesc': 'Chaque ligne écrite sert une réponse utilisateur. Nous mesurons la performance en millisecondes et la beauté par l’alignement des marges invisibles.',
    'hero.loadTime': 'TEMPS DE CHARGE',
    'hero.loadTimeValue': '0.4s en moyenne',
    'hero.satisfaction': 'SATISFACTION',
    'hero.satisfactionValue': '100% Fidélisé',

    // Stats Section
    'stats.badge': 'CHIFFRES DE CONFIANCE',
    'stats.title1': 'Les chiffres qui définissent',
    'stats.title2': 'notre engagement.',
    'stats.desc': 'Nous ne croyons pas au superflu. Voici les indices d’ingénierie exacts et les taux de rétention de notre studio de développement boutique.',

    // Problem Section
    'problem.badge': 'LA VÉRITÉ SUR LE WEB DESIGN',
    'problem.title1': 'Votre site web perd-il',
    'problem.title2': 'discrètement des clients ?',
    'problem.desc': 'Votre vitrine numérique est l’atout le plus important que contrôle votre marque. Les défauts de performance actuels transforment rapidement les visiteurs en acheteurs chez vos concurrents.',
    'problem.hoverPrompt': 'Survolez une fuite pour voir la solution technique apportée.',
    'problem.cure': 'CURE TECHNIQUE',

    // Services Section
    'services.badge': 'EXPERTISE DU STUDIO',
    'services.title1': 'Développement méticuleux',
    'services.title2': 'depuis la ligne zéro.',
    'services.desc': 'Nous déployons des architectures web full-stack optimisées et adaptées pour capter des prospects qualifiés et projeter une forte autorité.',

    // Portfolio Section
    'portfolio.badge': 'ÉTUDES DE CAS',
    'portfolio.title1': 'Projets numériques récents',
    'portfolio.title2': 'déployés en direct.',
    'portfolio.desc': 'Une sélection de sites web techniques conçus de toutes pièces pour amplifier l’autorité de la marque, charger instantanément et stimuler les ventes.',
    'portfolio.all': 'Tous les marchés',
    'portfolio.bakery': 'Boulangerie Artisanale',
    'portfolio.cleaning': 'Entretien de Luxe',
    'portfolio.clinic': 'Clinique Médicale Privée',
    'portfolio.conversion': 'HAUSSE DE CONVERSION',
    'portfolio.perf': 'INDICE DE PERFORMANCE',
    'portfolio.features': 'INJECTIONS STRUCTURELLES CLÉS',
    'portfolio.viewProject': 'Lancement du site live',
    'portfolio.github': 'Voir le dépôt',

    // About Section
    'about.badge': 'L’INGÉNIEUR CRÉATIF',
    'about.title1': 'Des mises en page réfléchies,',
    'about.title2': 'une ingénierie méticuleuse.',
    'about.desc1': 'Bonjour ! Nous sommes Lumora Web Studio, un studio de design et de création numérique axé sur la création de plateformes web hautement polies. Notre processus est centré sur une précision absolue — nous croyons qu’un site web est une extension directe de l’autorité d’une marque, et doit se lire avec une harmonie naturelle.',
    'about.desc2': 'Basés à Karachi, au Pakistan, nous nous spécialisons dans la création de sites web sur mesure à partir de zéro. En ignorant les constructeurs de pages complexes et les cadres de modèles lourds, nous écrivons un code optimisé et propre qui se charge instantanément et s’adapte magnifiquement à tous les appareils.',
    'about.pillar1': 'Intégrité Visuelle',
    'about.pillar1Desc': 'Élégantes grilles typographiques appairées.',
    'about.pillar2': 'Vitesse Sub-Seconde',
    'about.pillar2Desc': 'Exécution propre et légère des bundles React.',
    'about.competenciesTitle': 'COMPÉTENCES CLÉS & INDICES',

    // Transformation Section
    'trans.badge': 'L’ANATOMIE DES MISES À NIVEAU',
    'trans.title1': 'De vraies refontes d’entreprises :',
    'trans.title2': 'Avant et Après.',
    'trans.desc': 'Découvrez comment nous convertissons des sites web lents et obsolètes en moteurs web hyper-optimisés et visuellement captivants.',
    'trans.beforeTitle': 'LA PRÉSENCE HISTORIQUE',
    'trans.afterTitle': 'LA MISE À NIVEAU TECHNIQUE',
    'trans.problems': 'FUITES CHRONIQUES RENCONTRÉES',
    'trans.solutions': 'INTÉGRITÉ STRUCTURELLE CLÉ',
    'trans.score': 'INDICE LIGHTHOUSE',

    // Why Choose Us Section
    'why.badge': 'POURQUOI TRAVAILLER AVEC LUMORA',
    'why.title1': 'Une alliance numérique conçue',
    'why.title2': 'pour une croissance durable.',
    'why.desc': 'Nous proposons un partenariat boutique. Pas de modèles génériques, pas de frais cachés, et une responsabilité absolue à chaque étape.',
    'why.grid1': 'Mises en page 100% sur mesure',
    'why.grid1Desc': 'Zéro constructeur de pages. Nous écrivons des architectures React/Tailwind uniques qui correspondent précisément à votre marque.',
    'why.grid2': 'Mécanique axée conversion',
    'why.grid2Desc': 'Nous construisons des entonnoirs visuels calculés, des formulaires fluides et des déclencheurs stratégiques qui convertissent vos visiteurs.',
    'why.grid3': 'Dialogue direct de haut niveau',
    'why.grid3Desc': 'Travaillez directement avec des designers de mise en page experts et des développeurs juniors chevronnés. Pas d’intermédiaires.',
    'why.grid4': 'Garantie de performance absolue',
    'why.grid4Desc': 'Chaque site que nous livrons obtient une note supérieure à 95 sur Google Lighthouse. Maximisez votre SEO et fidélisez vos lecteurs.',

    // Audit / Lead Magnet
    'audit.title': "Bénéficiez d'un rapport stratégique personnalisé",
    'audit.desc': 'Vous voulez savoir exactement combien de revenus votre site web actuel laisse échapper ? Partagez vos détails, et nous lancerons un audit Lighthouse complet avec des maquettes de refonte. 100% gratuit, livré en 48 heures.',
    'audit.nameLabel': 'Votre Nom',
    'audit.namePlaceholder': 'ex: Alex Carter',
    'audit.emailLabel': 'E-mail Professionnel',
    'audit.emailPlaceholder': 'ex: alex@business.com',
    'audit.webLabel': 'Site Web Actuel (Optionnel)',
    'audit.webPlaceholder': 'ex: www.monentreprise.com',
    'audit.messageLabel': 'Objectif principal / Envies visuelles',
    'audit.messagePlaceholder': 'Décrivez votre vision ou les problèmes que vous souhaitez résoudre...',
    'audit.submitting': 'Analyse des données...',
    'audit.submit': 'Demander le rapport gratuit',
    'audit.success': 'Demande enregistrée ! Nous vous livrerons votre plan de refonte rapidement.',
    'audit.reset': 'Soumettre une autre demande',

    // Contact Section
    'contact.badge': 'INITIATE LE VOYAGE',
    'contact.title1': 'Construisons ensemble',
    'contact.title2': 'quelque chose d’exceptionnel.',
    'contact.desc': 'Prêt à établir une véritable autorité numérique ? Remplissez ce bref formulaire. Nous répondons en un jour ouvrable avec des délais clairs.',
    'contact.nameLabel': 'Votre Nom',
    'contact.namePlaceholder': 'ex: Michel Scott',
    'contact.emailLabel': 'Votre E-mail',
    'contact.emailPlaceholder': 'ex: michel@entreprise.com',
    'contact.msgLabel': 'Description du projet & contraintes',
    'contact.msgPlaceholder': 'Parlez-nous de votre entreprise, de vos délais cibles et de vos besoins généraux...',
    'contact.submitting': 'Envoi de votre message...',
    'contact.submit': 'Envoyer la demande',
    'contact.success': 'Merci ! Votre message a bien été transmis et enregistré par notre bureau.',
    'contact.info': 'COORDONNÉES DU STUDIO',
    'contact.infoLoc': 'Karachi, Pakistan',
    'contact.infoHours': 'Lundi - Samedi : 09h00 - 19h00',

    // FAQ Section
    'faq.badge': 'RÉPONSES TRANSPARENTES',
    'faq.title1': 'Questions courantes',
    'faq.title2': 'répondues simplement.',
    'faq.desc': 'Tout ce que vous devez savoir sur notre art visuel, nos gammes de prix et nos étapes de livraison de projet méticuleuses.',
    'faq.q1': 'En quoi Lumora se distingue des agences utilisant des constructeurs ?',
    'faq.a1': 'We do not build on bloated systems like WordPress or generic Shopify themes. Every site is hand-coded using modern React and Tailwind. This ensures your site loads in sub-seconds, achieves full custom layout potential, and is infinitely scalable.',
    'faq.q2': 'Combien de temps prend un projet classique sur mesure ?',
    'faq.a2': 'Généralement, un portail d’entreprise performant prend 2 à 3 semaines, de la maquette au lancement final. Un système e-commerce complexe peut nécessiter 4 à 5 semaines.',
    'faq.q3': 'Pourrai-je facilement éditer et modifier le contenu ?',
    'faq.a3': 'Absolument. Nous mettons en œuvre des systèmes de gestion légers ou des variables d’état simples pour permettre à des collaborateurs non techniques de modifier textes et images sans écrire de code.',
    'faq.q4': 'Combien de temps dure le support après le lancement ?',
    'faq.a4': 'Chaque projet livré bénéficie de 30 jours de support prioritaire gratuit et de surveillance active de la part de notre équipe. Nous proposons également des contrats de maintenance abordables.',
    'faq.q5': 'Quel est votre prix d’entrée ?',
    'faq.a5': 'Étant donné que chaque site est entièrement fait sur mesure, nos prix s’adaptent à vos besoins. Cependant, nos landing pages de conversion démarrent à $800, et nos portails d’entreprise complets démarrent généralement à $1 500.',

    // Final CTA Section
    'final.title': 'Prêt à réclamer une autorité de premier plan ?',
    'final.desc': 'Arrêtez de perdre des clients à cause d’un style obsolète et de temps de chargement excessifs. Collaborons pour bâtir une présence web sur mesure qui surpasse vos concurrents.',
    'final.btn1': 'Obtenir mon audit gratuit',
    'final.btn2': 'Parler à notre équipe',

    // Footer
    'footer.rights': 'Lumora Web Studio. Tous les concepts de mise en page sont réservés.',
    'footer.scrollTop': 'Retour en haut'
  },
  es: {
    // Navbar
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Nosotros',
    'nav.faq': 'Preguntas',
    'nav.contact': 'Contacto',
    'nav.cta': 'Hablemos',
    'nav.langToggle': 'ES',

    // Hero Section
    'hero.badge': 'ESTABLECIDOS EN KARACHI • DISPONIBLES EN TODO EL MUNDO',
    'hero.titleLine1': 'Sitios web a medida',
    'hero.titleLine2': 'diseñados para perdurar.',
    'hero.description': 'Bienvenido a Lumora Web Studio. Nos asociamos con empresas visionarias para dar forma a espacios digitales memorables y de alta conversión. Sin plantillas infladas ni sistemas lentos — solo hermosa tipografía, atención absoluta al detalle y código limpio de alto rendimiento.',
    'hero.ctaStart': 'Iniciar un Proyecto',
    'hero.ctaExplore': 'Explorar Estudios',
    'hero.focusTitle': '01 // ENFOQUE VISUAL',
    'hero.quote': 'La forma sigue a la función.',
    'hero.quoteDesc': 'Cada línea escrita responde a la necesidad de un usuario. Medimos el rendimiento en milésimas de segundo y la belleza en la alineación de márgenes invisibles.',
    'hero.loadTime': 'TIEMPO DE CARGA',
    'hero.loadTimeValue': '0.4s promedio',
    'hero.satisfaction': 'SATISFACCIÓN',
    'hero.satisfactionValue': '100% Retenido',

    // Stats Section
    'stats.badge': 'MÉTRICAS DE CONFIANZA',
    'stats.title1': 'Números que definen',
    'stats.title2': 'nuestro compromiso.',
    'stats.desc': 'No creemos en adornos. Estos son los índices de ingeniería exactos y niveles de retención detrás de nuestro estudio boutique de desarrollo.',

    // Problem Section
    'problem.badge': 'LA REALIDAD DEL DISEÑO WEB',
    'problem.title1': '¿Su sitio web está',
    'problem.title2': 'perdiendo clientes en silencio?',
    'problem.desc': 'Su escaparate digital es el activo más importante que controla su marca. Las fallas de rendimiento modernas pueden convertir fácilmente a visitantes potenciales en clientes de la competencia.',
    'problem.hoverPrompt': 'Pase el cursor sobre cualquier escape para ver la solución técnica.',
    'problem.cure': 'SOLUCIÓN TÉCNICA',

    // Services Section
    'services.badge': 'EXPERTISE DEL ESTUDIO',
    'services.title1': 'Desarrollo meticuloso',
    'services.title2': 'desde la primera línea.',
    'services.desc': 'Desplegamos arquitecturas web robustas y optimizadas, hechas a medida para capturar clientes potenciales calificados y proyectar alta autoridad en el mercado.',

    // Portfolio Section
    'portfolio.badge': 'ESTUDIOS DE CASO',
    'portfolio.title1': 'Activos digitales recientes',
    'portfolio.title2': 'lanzados en vivo.',
    'portfolio.desc': 'Un desglose minucioso de sitios web diseñados desde cero para amplificar la autoridad de marca, cargar instantáneamente e impulsar las ventas.',
    'portfolio.all': 'Todos los mercados',
    'portfolio.bakery': 'Panadería Artesanal',
    'portfolio.cleaning': 'Limpieza de Lujo',
    'portfolio.clinic': 'Clínica de Salud Privada',
    'portfolio.conversion': 'INCREMENTO DE CONVERSIÓN',
    'portfolio.perf': 'ÍNDICE DE RENDIMIENTO',
    'portfolio.features': 'INTEGRACIONES ESTRUCTURALES CLAVE',
    'portfolio.viewProject': 'Ver Proyecto ↗',
    'portfolio.github': 'Ver Repositorio',

    // About Section
    'about.badge': 'EL INGENIERO CREATIVO',
    'about.title1': 'Diseños deliberados,',
    'about.title2': 'ingeniería meticulosa.',
    'about.desc1': '¡Hola! Somos Lumora Web Studio, un estudio de diseño y creación digital enfocado en el desarrollo de plataformas web altamente cuidadas. Nuestro proceso se centra en la precisión absoluta: creemos que un sitio web es una extensión directa de la autoridad de una marca, y debe leerse con armonía natural.',
    'about.desc2': 'Con sede en Karachi, Pakistán, nos especializamos en crear sitios web a medida desde cero. Al evitar los constructores de páginas complejos y las plantillas pesadas, escribimos código optimizado y limpio que se carga al instante y se adapta de forma hermosa a cualquier dispositivo.',
    'about.pillar1': 'Integridad Visual',
    'about.pillar1Desc': 'Elegantes rejillas tipográficas perfectamente alineadas.',
    'about.pillar2': 'Velocidad Sub-segundo',
    'about.pillar2Desc': 'Ejecución limpia y ligera del paquete React.',
    'about.competenciesTitle': 'COMPETENCIAS CLAVE E ÍNDICES',

    // Transformation Section
    'trans.badge': 'LA ANATOMÍA DE LAS MEJORAS',
    'trans.title1': 'Reformas comerciales reales:',
    'trans.title2': 'Antes y Después.',
    'trans.desc': 'Vea cómo convertimos sitios web lentos y desactualizados en motores web hiperoptimizados y visualmente cautivadores.',
    'trans.beforeTitle': 'LA PRESENCIA HEREDADA',
    'trans.afterTitle': 'LA ACTUALIZACIÓN MEJORADA',
    'trans.problems': 'FILTRACIONES CRÓNICAS DETECTADAS',
    'trans.solutions': 'INTEGRIDAD ESTRUCTURAL CLAVE',
    'trans.score': 'ÍNDICE LIGHTHOUSE',

    // Why Choose Us Section
    'why.badge': 'POR QUÉ TRABAJAR CON LUMORA STUDIO',
    'why.title1': 'Una alianza digital creada',
    'why.title2': 'para el crecimiento sostenido.',
    'why.desc': 'Ofrecemos una asociación boutique. Sin plantillas genéricas, sin tarifas ocultas y con absoluta responsabilidad en cada etapa.',
    'why.grid1': 'Diseños Totalmente a Medida',
    'why.grid1Desc': 'Sin constructores de páginas ni temas preempaquetados. Escribimos arquitecturas únicas de React/Tailwind que se adaptan exactamente a su marca.',
    'why.grid2': 'Mecánicas Enfocadas en el Cliente',
    'why.grid2Desc': 'Construimos embudos visuales calculados, sistemas de reserva sin fricciones y llamadas a la acción estratégicas que convierten visitas en ingresos.',
    'why.grid3': 'Diálogo Directo de Alto Nivel',
    'why.grid3Desc': 'Trabaje directamente con diseñadores y desarrolladores expertos. Sin intermediarios ni fallas en la comunicación.',
    'why.grid4': 'Garantía de Rendimiento Absoluto',
    'why.grid4Desc': 'Cada sitio que entregamos supera los 95 puntos en Google Lighthouse. Disfrute de máxima visibilidad SEO y experiencias fluidas.',

    // Audit / Lead Magnet
    'audit.title': 'Obtenga un Informe Estratégico Personalizado',
    'audit.desc': '¿Quiere saber exactamente cuántos ingresos está perdiendo su sitio web actual? Comparta sus detalles y realizaremos una auditoría Lighthouse exhaustiva junto con conceptos de rediseño. 100% gratis, en 48 horas.',
    'audit.nameLabel': 'Su Nombre',
    'audit.namePlaceholder': 'ej., Alex Carter',
    'audit.emailLabel': 'Correo de Negocios',
    'audit.emailPlaceholder': 'ej., alex@empresa.com',
    'audit.webLabel': 'Sitio Web Actual (Opcional)',
    'audit.webPlaceholder': 'ej., www.miempresa.com',
    'audit.messageLabel': 'Objetivo Principal / Visión Deseada',
    'audit.messagePlaceholder': 'Describa su visión o los problemas que desea resolver...',
    'audit.submitting': 'Analizando activos...',
    'audit.submit': 'Solicitar Plan Gratuito',
    'audit.success': '¡Solicitud guardada! Le entregaremos su plan estratégico pronto.',
    'audit.reset': 'Enviar otra solicitud',

    // Contact Section
    'contact.badge': 'INICIAR EL VIAJE',
    'contact.title1': 'Construyamos algo',
    'contact.title2': 'excepcional juntos.',
    'contact.desc': '¿Listo para establecer una verdadera autoridad digital? Complete el formulario a continuación. Respondemos en un día hábil con cronogramas claros.',
    'contact.nameLabel': 'Su Nombre',
    'contact.namePlaceholder': 'ej., Michael Scott',
    'contact.emailLabel': 'Su Correo',
    'contact.emailPlaceholder': 'ej., michael@empresa.com',
    'contact.msgLabel': 'Descripción del Proyecto y Restricciones',
    'contact.msgPlaceholder': 'Háblenos de su empresa, plazos previstos y requisitos generales...',
    'contact.submitting': 'Enviando consulta...',
    'contact.submit': 'Enviar Consulta Directa',
    'contact.success': '¡Gracias! Su mensaje ha sido recibido por nuestra oficina de despacho.',
    'contact.info': 'DATOS DEL ESTUDIO',
    'contact.infoLoc': 'Karachi, Pakistán',
    'contact.infoHours': 'Lunes - Sábado: 9:00 AM - 7:00 PM',

    // FAQ Section
    'faq.badge': 'RESPUESTAS TRANSPARENTES',
    'faq.title1': 'Preguntas comunes',
    'faq.title2': 'respondidas de manera simple.',
    'faq.desc': 'Todo lo que necesita saber sobre nuestro arte visual, precios y meticulosas fases de entrega de proyectos.',
    'faq.q1': '¿Qué hace que Lumora sea diferente de las agencias de plantillas?',
    'faq.a1': 'No creamos en sistemas inflados como WordPress o plantillas de Shopify genéricas. Cada sitio es codificado a mano usando React y Tailwind. Esto garantiza que su sitio cargue en milisegundos, aproveche todo el potencial gráfico e implemente escalabilidad infinita.',
    'faq.q2': '¿Cuánto tiempo toma un desarrollo a medida?',
    'faq.a2': 'Típicamente, un portal corporativo estructurado de alto rendimiento toma de 2 a 3 semanas desde los bocetos hasta el lanzamiento final. Los sistemas e-commerce complejos con inventarios personalizados pueden tomar de 4 a 5 semanas.',
    'faq.q3': '¿Podré editar y modificar el contenido fácilmente?',
    'faq.a3': 'Por supuesto. Configuramos gestores de contenido sencillos o variables locales simples para que miembros no técnicos puedan editar textos, fotos y blogs sin problemas sin tocar código.',
    'faq.q4': '¿Cuánto tiempo de soporte ofrecen tras el lanzamiento?',
    'faq.a4': 'Cada sitio web entregado incluye 30 días de soporte de desarrollo de software libre de mantenimiento y soporte de prioridad. También ofrecemos acuerdos de mantenimiento mensual muy económicos.',
    'faq.q5': '¿Cuál es su precio base de partida?',
    'faq.a5': 'Debido a que cada sitio web es completamente personalizado, el precio se adapta a sus necesidades. Sin embargo, las landing pages de conversión comienzan alrededor de $800 y los portales corporativos completos generalmente parten desde $1,500.',

    // Final CTA Section
    'final.title': '¿Listo para reclamar su autoridad digital?',
    'final.desc': 'Deje de perder clientes por estilos desactualizados y velocidades lentas. Colaboremos para construir una presencia web a medida que supere a su competencia.',
    'final.btn1': 'Obtener Auditoría Gratuita',
    'final.btn2': 'Consultar con el Equipo',

    // Footer
    'footer.rights': 'Lumora Web Studio. Todos los conceptos de diseño reservados.',
    'footer.scrollTop': 'Volver arriba'
  },
  ur: {
    // Navbar
    'nav.services': 'خدمات',
    'nav.portfolio': 'پورٹ فولیو',
    'nav.about': 'ہمارے بارے میں',
    'nav.faq': 'سوالات',
    'nav.contact': 'رابطہ',
    'nav.cta': 'بات کریں',
    'nav.langToggle': 'UR',

    // Hero Section
    'hero.badge': 'کراچی میں قائم • دنیا بھر میں دستیاب',
    'hero.titleLine1': 'مخصوص ویب سائٹس',
    'hero.titleLine2': 'جو مستقل اثر چھوڑیں۔',
    'hero.description': 'لیومورا ویب اسٹوڈیو میں خوش آمدید۔ ہم دوراندیش کاروباری اداروں کے ساتھ مل کر یادگار اور اعلیٰ معیار کی ڈیجیٹل جگہیں بناتے ہیں۔ کوئی عام ٹیمپلیٹس یا سست سسٹمز نہیں — صرف خوبصورت ٹائپوگرافی، باریک کام اور صاف کوڈ لکھا جاتا ہے۔',
    'hero.ctaStart': 'پروجیکٹ شروع کریں',
    'hero.ctaExplore': 'کام کا جائزہ لیں',
    'hero.focusTitle': '01 // بصری توجہ',
    'hero.quote': 'ڈیزائن مقصد کے تابع ہے۔',
    'hero.quoteDesc': 'ہر لکھی ہوئی لائن صارف کے تجربے کو بہتر کرتی ہے۔ ہم سیکنڈ کے دسویں حصے میں کارکردگی اور پوشیدہ مارجنز کی صف بندی میں خوبصورتی کی پیمائش کرتے ہیں۔',
    'hero.loadTime': 'لوڈ ہونے کا وقت',
    'hero.loadTimeValue': '0.4s اوسط',
    'hero.satisfaction': 'صارف کا اطمینان',
    'hero.satisfactionValue': '100% برقرار',

    // Stats Section
    'stats.badge': 'اعتماد کے پیمانے',
    'stats.title1': 'نمبرز جو ہمارے',
    'stats.title2': 'عزم کو ظاہر کرتے ہیں۔',
    'stats.desc': 'ہم مبالغہ آرائی پر یقین نہیں رکھتے۔ یہ ہمارے اسٹوڈیو کی ترقی کے پیچھے موجود درست ہندسی اشاریے اور کسٹمر برقراری کی شرحیں ہیں۔',

    // Problem Section
    'problem.badge': 'ویب ڈیزائن کی حقیقت',
    'problem.title1': 'کیا آپ کی ویب سائٹ',
    'problem.title2': 'خاموشی سے کسٹمرز کھو رہی ہے؟',
    'problem.desc': 'آپ کا ڈیجیٹل شو روم آپ کا سب سے اہم اثاثہ ہے۔ کارکردگی میں معمولی خرابی بھی ممکنہ کسٹمرز کو حریفوں کی طرف موڑ سکتی ہے۔',
    'problem.hoverPrompt': 'کسی بھی مسئلے پر ماؤس لائیں تاکہ اس کا حل دیکھا جا سکے۔',
    'problem.cure': 'تکنیکی حل',

    // Services Section
    'services.badge': 'اسٹوڈیو کی مہارت',
    'services.title1': 'باریک بینی سے ڈیولپمنٹ',
    'services.title2': 'شروعاتی لائن سے۔',
    'services.desc': 'ہم آپ کے برانڈ کے لیے موزوں اور بہتر ویب سسٹمز چلاتے ہیں جو مستند کسٹمرز کو راغب کرتے ہیں اور مارکیٹ پیٹرن پر پورا اترتے ہیں۔',

    // Portfolio Section
    'portfolio.badge': 'پروجیکٹس کی تفصیل',
    'portfolio.title1': 'حالیہ ڈیجیٹل اثاثے',
    'portfolio.title2': 'جو لائیو چل رہے ہیں۔',
    'portfolio.desc': 'برانڈ کی اہمیت کو بڑھانے، فوری لوڈ ہونے اور سیلز میں اضافے کے لیے بنائے گئے پروجیکٹس کا تفصیلی جائزہ۔',
    'portfolio.all': 'تمام مارکیٹس',
    'portfolio.bakery': 'بیکری پروجیکٹ',
    'portfolio.cleaning': 'صفائی کی خدمات',
    'portfolio.clinic': 'پرائیویٹ کلینک',
    'portfolio.conversion': 'سیلز میں اضافہ',
    'portfolio.perf': 'کارکردگی کا انڈیکس',
    'portfolio.features': 'بنیادی تکنیکی تبدیلیاں',
    'portfolio.viewProject': 'لائیو لنک دیکھیں ↗',
    'portfolio.github': 'کوڈ دیکھیں',

    // About Section
    'about.badge': 'تخلیقی انجینئر',
    'about.title1': 'منصوبہ بند ڈیزائن،',
    'about.title2': 'کامل انجینئرنگ۔',
    'about.desc1': 'السلام علیکم! ہم لیومورا ویب اسٹوڈیو ہیں، ایک ڈیجیٹل ڈیزائننگ اسٹوڈیو جو انتہائی نفیس ویب پلیٹ فارمز بنانے پر مرکوز ہے۔ ہمارا عمل مکمل درستگی پر مبنی ہے۔ ہم سمجھتے ہیں کہ ویب سائٹ آپ کے برانڈ کا پہلا اور سب سے اہم تاثر ہے۔',
    'about.desc2': 'کراچی، پاکستان میں قائم، ہم شروع سے ہر چیز خود کوڈ کرتے ہیں۔ کسی بھی عام بلڈر یا بھاری تھیمز کا استعمال کیے بغیر، ہم صاف کوڈ لکھتے ہیں جو فوری لوڈ ہوتا ہے، ہر اسکرین پر بہترین نظر آتا ہے، اور مستقل اعتماد پیدا کرتا ہے۔',
    'about.pillar1': 'بصری سالمیت',
    'about.pillar1Desc': 'نفیس اور زبردست ڈیزائن گرڈز۔',
    'about.pillar2': 'فوری رفتار',
    'about.pillar2Desc': 'صاف اور ہلکا پھلکا ری ایکٹ بنڈل۔',
    'about.competenciesTitle': 'اہم مہارتیں اور اشاریے',

    // Transformation Section
    'trans.badge': 'تبدیلی کے مراحل',
    'trans.title1': 'کاروباری ویب سائٹس کا موازنہ:',
    'trans.title2': 'پہلے اور بعد میں۔',
    'trans.desc': 'دیکھیں کہ ہم کس طرح سست اور پرانی ویب سائٹس کو تیز ترین اور خوبصورت ویب سسٹمز میں تبدیل کرتے ہیں۔',
    'trans.beforeTitle': 'پرانا روایتی ڈیزائن',
    'trans.afterTitle': 'جدید انجینئرڈ ڈیزائن',
    'trans.problems': 'درپیش مستقل تکنیکی مسائل',
    'trans.solutions': 'بنیادی ساختی تبدیلیاں',
    'trans.score': 'لائٹ ہاؤس اسکور',

    // Why Choose Us Section
    'why.badge': 'لیومورا اسٹوڈیو کے ساتھ کیوں کام کریں',
    'why.title1': 'پائیدار ترقی کے لیے',
    'why.title2': 'ایک بہترین شراکت داری۔',
    'why.desc': 'ہم ایک پائیدار شراکت داری پیش کرتے ہیں۔ کوئی عام ٹیمپلیٹس نہیں، کوئی خفیہ چارجز نہیں، اور ہر مرحلے پر مکمل جوابدہی۔',
    'why.grid1': 'مکمل طور پر مخصوص ڈیزائنز',
    'why.grid1Desc': 'سائٹ بلڈرز کے بغیر۔ ہم برانڈ کے مطابق موزوں ترین ری ایکٹ اور ٹیل ونڈ فن تعمیر تیار کرتے ہیں۔',
    'why.grid2': 'سیلز فوکس میکانکس',
    'why.grid2Desc': 'ہم مربوط بصری راستے، آسان شیڈولنگ سسٹمز اور تزویراتی کالز بناتے ہیں جو دیکھنے والوں کو کسٹمرز میں تبدیل کرتے ہیں۔',
    'why.grid3': 'براہ راست رابطہ',
    'why.grid3Desc': 'براہ راست ماہر ڈیزائنرز اور انجینئرز کے ساتھ کام کریں۔ کوئی درمیانی مینیجر نہیں، سست کمیونیکیشن سے بچیں۔',
    'why.grid4': 'اعلیٰ ترین رفتار کی ضمانت',
    'why.grid4Desc': 'ہماری تیار کردہ ہر سائٹ گوگل لائٹ ہاؤس پر 95+ اسکور کرتی ہے۔ بہترین ایس ای او اور شاندار تجربہ حاصل کریں۔',

    // Audit / Lead Magnet
    'audit.title': 'مفت کسٹمر سٹریٹیجی رپورٹ حاصل کریں',
    'audit.desc': 'جاننا چاہتے ہیں کہ آپ کی موجودہ ویب سائٹ کتنے کسٹمرز گنوا رہی ہے؟ تفصیلات فراہم کریں، اور ہم نئے متبادل ڈیزائن کے ساتھ تفصیلی تجزیہ فراہم کریں گے۔ 48 گھنٹوں میں پہنچائی جائے گی، 100% مفت۔',
    'audit.nameLabel': 'آپ کا نام',
    'audit.namePlaceholder': 'مثال کے طور پر: علی خان',
    'audit.emailLabel': 'کاروباری ای میل',
    'audit.emailPlaceholder': 'مثال کے طور پر: ali@business.com',
    'audit.webLabel': 'موجودہ ویب سائٹ (اختیاری)',
    'audit.webPlaceholder': 'مثال کے طور پر: www.mybusiness.com',
    'audit.messageLabel': 'بنیادی مقصد یا بصری خواہشات',
    'audit.messagePlaceholder': 'اپنے آئیڈیاز یا مسائل کی تفصیل لکھیں جنہیں بہتر کرنا ہے...',
    'audit.submitting': 'تجزیہ جاری ہے...',
    'audit.submit': 'مفت رپورٹ کی درخواست کریں',
    'audit.success': 'درخواست محفوظ کر لی گئی ہے! ہم جلد آپ سے رابطہ کریں گے۔',
    'audit.reset': 'ایک اور درخواست بھیجیں',

    // Contact Section
    'contact.badge': 'ڈیجیٹل سفر کا آغاز',
    'contact.title1': 'آئیں مل کر بنائیں',
    'contact.title2': 'کچھ انتہائی زبردست۔',
    'contact.desc': 'سچی ڈیجیٹل اتھارٹی قائم کرنے کے لیے تیار ہیں؟ نیچے دیا گیا فارم بھریں۔ ہم ایک کاروباری دن کے اندر واضح ٹائم لائن کے ساتھ جواب دیتے ہیں۔',
    'contact.nameLabel': 'آپ کا نام',
    'contact.namePlaceholder': 'مثال کے طور پر: محمد علی',
    'contact.emailLabel': 'آپ کا ای میل',
    'contact.emailPlaceholder': 'مثال کے طور پر: owners@company.com',
    'contact.msgLabel': 'پروجیکٹ کی تفصیل اور ضروریات',
    'contact.msgPlaceholder': 'اپنے برانڈ، مطلوبہ ٹائم لائن اور عمومی ضروریات کے بارے میں بتائیں...',
    'contact.submitting': 'درخواست بھیجی جا رہی ہے...',
    'contact.submit': 'براہ راست انکوائری بھیجیں',
    'contact.success': 'شکریہ! آپ کا پیغام کامیابی کے ساتھ وصول ہو چکا ہے۔',
    'contact.info': 'اسٹوڈیو کی تفصیلات',
    'contact.infoLoc': 'کراچی، پاکستان',
    'contact.infoHours': 'پیر تا ہفتہ: صبح 9:00 بجے سے شام 7:00 بجے تک',

    // FAQ Section
    'faq.badge': 'تفصیلی جوابات',
    'faq.title1': 'عام سوالات کے',
    'faq.title2': 'آسان جوابات۔',
    'faq.desc': 'ہماری خدمات، قیمتوں کی حدود، اور پروجیکٹ ڈیلیوری کے مراحل کے بارے میں جو کچھ آپ جاننا چاہتے ہیں۔',
    'faq.q1': 'لیومورا ویب بلڈر ایجنسیوں سے کیسے مختلف ہے؟',
    'faq.a1': 'ہم ورڈپریس یا دیگر سست پہلے سے بنے تھیمز پر کام نہیں کرتے۔ ہماری تمام ویب سائٹس ہاتھ سے ری ایکٹ اور ٹیل ونڈ کا استعمال کرتے ہوئے لکھی جاتی ہیں جو چند ملی سیکنڈز میں لوڈ ہوتی ہیں اور حتمی برتری فراہم کرتی ہیں۔',
    'faq.q2': 'یک کسٹم ویب سائٹ پروجیکٹ میں کتنا وقت لگتا ہے؟',
    'faq.a2': 'عام طور پر، ایک معیاری کارپوریٹ پورٹل میں ڈیزائن سے لے کر لائیو لوڈنگ تک 2 سے 3 ہفتے لگتے ہیں۔ پیچیدہ ای کامرس سسٹمز میں 4 سے 5 ہفتے لگ سکتے ہیں۔',
    'faq.q3': 'کیا میں آسانی سے ویب سائٹ کے مواد کو تبدیل کر سکوں گا؟',
    'faq.a3': 'بلکل۔ ہم مواد کے انتظام کے لیے آسان اور ہلکا پھلکا لوکل سسٹم تشکیل دیتے ہیں تاکہ غیر تکنیکی عملہ بغیر کسی کوڈ کے متن اور تصاویر کو اچھے طریقے سے تبدیل کر سکے۔',
    'faq.q4': 'لانچ کے بعد پروجیکٹ سپورٹ کتنے عرصے تک ملتی ہے؟',
    'faq.a4': 'ہماری تیار کردہ ہر ویب سائٹ کے ساتھ 30 دنوں کی مفت سپورٹ اور لائیو مانیٹرنگ شامل ہے۔ ہم آگے کی باقاعدہ دیکھ بھال کے آسان معاہدے بھی فراہم کرتے ہیں۔',
    'faq.q5': 'پروجیکٹس کی ابتدائی قیمت کیا ہے؟',
    'faq.a5': 'چونکہ ہر ویب سائٹ شروع سے برانڈ کے مطابق بنائی جاتی ہے، اس لیے قیمت آپ کی ضروریات پر منحصر ہوتی ہے۔ تاہم، سنگل لینڈنگ پیج تقریباً $800 اور مکمل بزنس پورٹل $1,500 سے شروع ہوتا ہے۔',

    // Final CTA Section
    'final.title': 'کیا آپ برتر ڈیجیٹل برانڈ بنانے کے لیے تیار ہیں؟',
    'final.desc': 'پرانے ڈیزائنز اور سست رفتار کی وجہ سے کسٹمرز کھونا بند کریں۔ آئیں مل کر حریفوں پر سبقت حاصل کرنے کے لیے بہترین ویب سائٹ بنائیں۔',
    'final.btn1': 'مفت آڈٹ حاصل کریں',
    'final.btn2': 'ہماری ٹیم سے بات کریں',

    // Footer
    'footer.rights': 'لیومورا ویب اسٹوڈیو۔ تمام حقوق محفوظ ہیں۔',
    'footer.scrollTop': 'اوپر جائیں'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Attempt local storage checkout
    try {
      const saved = localStorage.getItem('lumora_studio_lang');
      return (saved === 'en' || saved === 'fr' || saved === 'ur' || saved === 'es') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lumora_studio_lang', lang);
    } catch (e) {
      console.warn(e);
    }
  };

  const t = (key: string): string => {
    const translationSet = TRANSLATIONS[language];
    return translationSet[key] || TRANSLATIONS['en'][key] || key;
  };

  // Provide translated datasets dynamically
  const statsData: StatCard[] = [
    {
      id: 'stat-projects',
      number: 142,
      suffix: '+',
      label: {
        en: 'Projects Delivered',
        fr: 'Projets Livrés',
        es: 'Proyectos Entregados',
        ur: 'پروجیکٹس کی فراہمی'
      }[language] || 'Projects Delivered',
      description: {
        en: 'High-converting custom websites built and launched globally.',
        fr: 'Sites web sur mesure à forte conversion conçus et lancés mondialement.',
        es: 'Sitios web personalizados de alta conversión creados y lanzados globalmente.',
        ur: 'دنیا بھر میں لانچ کی گئیں اعلیٰ معیار اور سیلز فوکس ویب سائٹس۔'
      }[language] || 'High-converting custom websites built and launched globally.',
      iconName: 'Code'
    },
    {
      id: 'stat-clients',
      number: 98,
      suffix: '%',
      label: {
        en: 'Client Retention',
        fr: 'Rétention Clients',
        es: 'Retención de Clientes',
        ur: 'مستقل گاہک'
      }[language] || 'Client Retention',
      description: {
        en: 'Long-term development partnerships with trusted enterprises.',
        fr: 'Partenariats de développement à long terme avec des entreprises de confiance.',
        es: 'Asociaciones de desarrollo a largo plazo con empresas de confianza.',
        ur: 'بھروسہ مند کاروباری اداروں کے ساتھ طویل مدتی ورکنگ شراکت داری۔'
      }[language] || 'Long-term development partnerships with trusted enterprises.',
      iconName: 'Smile'
    },
    {
      id: 'stat-speed',
      number: 99,
      suffix: '/100',
      label: {
        en: 'Avg Lighthouse Speed',
        fr: 'Vitesse Lighthouse Moyenne',
        es: 'Velocidad Lighthouse Promedio',
        ur: 'اوسط لائٹ ہاؤس اسپیڈ'
      }[language] || 'Avg Lighthouse Speed',
      description: {
        en: 'Guaranteed core web vitals and ultra-lightweight execution.',
        fr: 'Signes vitaux de base garantis et exécution ultra-légère.',
        es: 'Core Web Vitals garantizados y ejecución ultraligera.',
        ur: 'گارنٹیڈ اہم ویب سائٹس کے اشاریے اور انتہائی ہلکا پھلکا کوڈ۔'
      }[language] || 'Guaranteed core web vitals and ultra-lightweight execution.',
      iconName: 'Zap'
    },
    {
      id: 'stat-satisfaction',
      number: 4.9,
      suffix: '/5.0',
      label: {
        en: 'Satisfaction Rating',
        fr: 'Note de Satisfaction',
        es: 'Clasificación de Satisfacción',
        ur: 'اطمینان کی درجہ بندی'
      }[language] || 'Satisfaction Rating',
      description: {
        en: 'Exceptional visual polish, active support, and clear dialogue.',
        fr: 'Finition visuelle exceptionnelle, support réactif et dialogue transparent.',
        es: 'Pulido visual excepcional, soporte activo y comunicación clara.',
        ur: 'غیر معمولی بصری نفاست، فعال سپورٹ، اور واضح گفتگو۔'
      }[language] || 'Exceptional visual polish, active support, and clear dialogue.',
      iconName: 'Award'
    }
  ];

  const problemsData: ProblemCard[] = [
    {
      id: 'prob-outdated',
      title: {
        en: 'Outdated Design',
        fr: 'Design Obsolète',
        es: 'Diseño Obsoleto',
        ur: 'پرانا آبدیدہ ڈیزائن'
      }[language] || 'Outdated Design',
      iconName: 'Palette',
      description: {
        en: 'A layout designed in 2018 signals that your business is inactive or lagging behind.',
        fr: 'Un design datant de 2018 signale que votre entreprise est inactive ou en retard.',
        es: 'Un diseño creado en 2018 indica que su negocio está inactivo o rezagado.',
        ur: '2018 میں تیار کیا گیا پرانا ڈیزائن یہ ظاہر کرتا ہے کہ آپ کا کاروبار سست یا پیچھے ہے۔'
      }[language] || 'A layout designed in 2018 signals that your business is inactive or lagging behind.',
      solution: {
        en: 'Framer/Stripe level visual typography with sleek interactive details that establish modern authority.',
        fr: 'Une typographie de niveau Framer/Stripe avec des détails interactifs élégants qui imposent l’autorité.',
        es: 'Tipografía visual de nivel Framer/Stripe con detalles interactivos que imponen autoridad.',
        ur: 'پیشہ ورانہ فریم ورک کی طرز کی خوبصورت ٹائپوگرافی جو برانڈ کا رعب قائم کرے۔'
      }[language] || 'Framer/Stripe level visual typography with sleek interactive details that establish modern authority.'
    },
    {
      id: 'prob-slow',
      title: {
        en: 'Slow Loading Speed',
        fr: 'Chargement Lent',
        es: 'Velocidad de Carga Lenta',
        ur: 'لوڈ ہونے کی سست رفتار'
      }[language] || 'Slow Loading Speed',
      iconName: 'Gauge',
      description: {
        en: '53% of mobile visits are abandoned if a page takes longer than 3 seconds to load.',
        fr: '53% des visites mobiles sont abandonnées si le chargement prend plus de 3 secondes.',
        es: 'El 53% de las visitas móviles se abandonan si el sitio tarda más de 3 segundos en cargar.',
        ur: 'اگر موبائل پر پیج 3 سیکنڈ سے زیادہ وقت لے تو 53 فیصد صارفین واپس چلے جاتے ہیں۔'
      }[language] || '53% of mobile visits are abandoned if a page takes longer than 3 seconds to load.',
      solution: {
        en: 'React-optimized component structures and asset optimization ensuring 100ms first contentful paint.',
        fr: 'Structures de composants React optimisées garantissant un affichage en moins de 100ms.',
        es: 'Estructuras de componentes de React y optimización de recursos que garantizan carga en 100ms.',
        ur: 'ری ایکٹ پر مبنی بہترین ساخت اور امیج اور میڈیا فائلز کی مکمل اسپیڈ آپٹیمائزیشن۔'
      }[language] || 'React-optimized component structures and asset optimization ensuring 100ms first contentful paint.'
    },
    {
      id: 'prob-mobile',
      title: {
        en: 'Poor Mobile Experience',
        fr: 'Expérience Mobile Limite',
        es: 'Mala Experiencia Móvil',
        ur: 'موبائل پر خراب ڈسپلے'
      }[language] || 'Poor Mobile Experience',
      iconName: 'Smartphone',
      description: {
        en: 'Over 60% of all web traffic originates from mobile. Unresponsive grids frustrate readers.',
        fr: 'Plus de 60% du trafic provient du mobile. Les grilles non réactives frustrent les lecteurs.',
        es: 'Más del 60% de todo el tráfico web proviene de móviles. Las redes no adaptables frustran.',
        ur: '60 فیصد سے زیادہ انٹرنیٹ ٹریفک موبائل سے آتا ہے۔ غیر لچکدار لے آؤٹ کسٹمرز کو ناراض کرتا ہے۔'
      }[language] || 'Over 60% of all web traffic originates from mobile. Unresponsive grids frustrate readers.',
      solution: {
        en: 'Responsive-first touch targets and fluid layouts engineered with pixel-perfection across all viewport ratios.',
        fr: 'Cibles tactiles axées mobile d’abord et grilles réactives au pixel près sur tous les viewports.',
        es: 'Objetivos de tacto móvil primero y diseños fluidos con perfección de píxeles.',
        ur: 'موبائل فرسٹ ڈیزائن جو ہر موبائل اور ٹیبلٹ اسکرین کے سائز پر کامل فیٹ بیٹھتا ہے۔'
      }[language] || 'Responsive-first touch targets and fluid layouts engineered with pixel-perfection across all viewport ratios.'
    },
    {
      id: 'prob-trust',
      title: {
        en: 'Low Customer Trust',
        fr: 'Faible Confiance Client',
        es: 'Baja Confianza del Cliente',
        ur: 'غیر یقینی اعتماد'
      }[language] || 'Low Customer Trust',
      iconName: 'ShieldAlert',
      description: {
        en: 'Broken layouts, missing testimonials, or bad certificates make customers question your credibility.',
        fr: 'Affichages cassés, témoignages absents ou certificats expirés font douter de votre crédibilité.',
        es: 'Diseños rotos, falta de testimonios o certificados caducados hacen que se dude de su credibilidad.',
        ur: 'ٹوٹے ہوئے لے آؤٹ، ریویوز کی کمی، سست رفتار کسٹمرز کو آپ کی ساکھ پر سوال اٹھانے پر مجبور کرتے ہیں۔'
      }[language] || 'Broken layouts, missing testimonials, or bad certificates make customers question your credibility.',
      solution: {
        en: 'Professional trust-badges, secure architectures, and elegant content flows that command respect.',
        fr: 'Badges de confiance soignés, architectures sécurisées et flux de contenu qui imposent le respect.',
        es: 'Insignias de confianza profesional, arquitecturas seguras y flujos de contenido elegantes.',
        ur: 'پیشہ ورانہ بااعتماد بیجز، انتہائی محفوظ کلاؤڈ ہوسٹنگ، اور شاندار لائیو کارکردگی۔'
      }[language] || 'Professional trust-badges, secure architectures, and elegant content flows that command respect.'
    },
    {
      id: 'prob-conversion',
      title: {
        en: 'Low Conversion Rates',
        fr: 'Faibles Taux de Conversion',
        es: 'Bajos Ratios de Conversión',
        ur: 'سیلز میں کمی کی شرح'
      }[language] || 'Low Conversion Rates',
      iconName: 'TrendingDown',
      description: {
        en: 'Traffic without direction leads to zero income. Confusing journeys lose sales.',
        fr: 'Un trafic dépourvu de direction claire mène à zéro gain. Les parcours confus perdent des ventes.',
        es: 'El tráfico sin dirección no genera ingresos. Los recorridos confusos pierden ventas.',
        ur: 'بغیر سمت اور واضح گائیڈ کے ملنے والا ٹریفک بیکار ثابت ہوتا ہے۔ صارف الجھن میں آرڈر نہیں دیتا۔'
      }[language] || 'Traffic without direction leads to zero income. Confusing journeys lose sales.',
      solution: {
        en: 'Strategic Call to Action triggers, clean lead hooks, and frictionless forms positioned natively.',
        fr: 'Déclencheurs d’appels à l’action calculés, formulaires de capture fluides et intégration native.',
        es: 'Llamadas a la acción estratégicas, captura de leads limpia y formularios fluidos.',
        ur: 'بہترین تزویراتی بٹنز (CTA)، آسان فارمز اور درست مقامات پر کسٹمر رابطہ سہولت۔'
      }[language] || 'Strategic Call to Action triggers, clean lead hooks, and frictionless forms positioned natively.'
    },
    {
      id: 'prob-presence',
      title: {
        en: 'Weak Online Presence',
        fr: 'Présence en Ligne Faible',
        es: 'Débil Presencia en Línea',
        ur: 'انٹرنیٹ پر غیر مرئی موجودگی'
      }[language] || 'Weak Online Presence',
      iconName: 'Globe',
      description: {
        en: 'If your business is invisible on Google search, competitors take your local market share.',
        fr: 'Si votre entreprise est invisible sur Google, vos concurrents captent le marché local.',
        es: 'Si su negocio es invisible en Google, los competidores se quedan con su cuota de mercado.',
        ur: 'اگر آپ کا برانڈ گوگل اور سرچ سسٹمز پر سر فہرست نہیں ہے تو حریف سارا مارکیٹ جیت جاتے ہیں۔'
      }[language] || 'If your business is invisible on Google search, competitors take your local market share.',
      solution: {
        en: 'Optimized semantic HTML elements, active meta structures, schemas, and clean directory layouts.',
        fr: 'Éléments HTML sémantiques polis, balises méta actives, schémas riches et arborescence propre.',
        es: 'Elementos HTML semánticos, estructuras meta activas, esquemas y directorios ordenados.',
        ur: 'بہترین سیمیٹک ایچ ٹی ایم ایل اجزاء، فعال میٹا ڈیٹا، اور سرچ انجن آپٹیمائزیشن۔'
      }[language] || 'Optimized semantic HTML elements, active meta structures, schemas, and clean directory layouts.'
    }
  ];

  const servicesData: Service[] = [
    {
      id: 'srv-business',
      title: {
        en: 'Business Websites',
        fr: 'Sites Web Professionnels',
        es: 'Sitios Web Corporativos',
        ur: 'کاروباری ویب سائٹس'
      }[language] || 'Business Websites',
      iconName: 'Briefcase',
      description: {
        en: 'Stunning corporate portals styled to signal industry leadership, complete with client onboarding loops.',
        fr: 'De superbes portails d’entreprise conçus pour imposer le leadership, avec formulaires d’onboarding.',
        es: 'Imponentes portales corporativos diseñados para marcar el liderazgo en el sector, con flujos de registro.',
        ur: 'برانڈ کی اہمیت کو نمایاں کرنے والے شاندار تجارتی پورٹلز اور کسٹمر رابطہ سسٹمز۔'
      }[language] || 'Stunning corporate portals styled to signal industry leadership, complete with client onboarding loops.',
      features: {
        en: ['Custom design layout', 'High performance core', 'Lead integration', 'Interactive visual sections'],
        fr: ['Mise en page 100% sur mesure', 'Noyau haute performance', 'Formulaire de prospects captif', 'Sections visuelles de pointe'],
        es: ['Diseño totalmente exclusivo', 'Núcleo de alta velocidad', 'Capturación de leads integrada', 'Secciones de diseño visual'],
        ur: ['منفرد کسٹم لے آؤٹ', 'اعلی کارکردگی کا حامل کور', 'گاہک رابطہ گائیڈز', 'متحرک بصری سیکشنز']
      }[language] || ['Custom design layout', 'High performance core', 'Lead integration', 'Interactive visual sections']
    },
    {
      id: 'srv-ecommerce',
      title: {
        en: 'E-Commerce Stores',
        fr: 'Boutiques E-Commerce',
        es: 'Tiendas de Comercio Electrónico',
        ur: 'ای کامرس آن لائن اسٹورز'
      }[language] || 'E-Commerce Stores',
      iconName: 'ShoppingBag',
      description: {
        en: 'Frictionless purchasing systems built with dynamic visual carts, secure checkout, and ultra-fast speed.',
        fr: 'Des systèmes de vente fluides dotés de chariots dynamiques, paiements sécurisés et vitesse optimale.',
        es: 'Sistemas de pago fluidos con carritos dinámicos, pagos seguros y velocidad excepcional.',
        ur: 'چست آن لائن خریداری کے نظام، بہترین بصری کارڈز، اور مکمل محفوظ ادائیگی پورٹل۔'
      }[language] || 'Frictionless purchasing systems built with dynamic visual carts, secure checkout, and ultra-fast speed.',
      features: {
        en: ['High speed load times', 'Custom inventory system', 'Stripe & PayPal ready', 'Conversion optimized flow'],
        fr: ['Chargement ultra-rapide', 'Gestion dynamique de stock', 'Prêt pour Stripe & PayPal', 'Entonnoir de conversion fluide'],
        es: ['Tiempos de carga ultra veloces', 'Control de stock a medida', 'Listo para Stripe y PayPal', 'Embudo de ventas optimizado'],
        ur: ['تیز ترین لوڈنگ اسپیڈ', 'اپنی مرضی کا انوینٹری سسٹم', 'اسٹرائپ اور پے پال سپورٹ', 'بہترین آرڈر فنل لے آؤٹ']
      }[language] || ['High speed load times', 'Custom inventory system', 'Stripe & PayPal ready', 'Conversion optimized flow']
    },
    {
      id: 'srv-landing',
      title: {
        en: 'Landing Pages',
        fr: 'Landing Pages de Vente',
        es: 'Páginas de Aterrizaje (Landing)',
        ur: 'سیلز لینڈنگ پیجز'
      }[language] || 'Landing Pages',
      iconName: 'Sparkles',
      description: {
        en: 'Laser-focused single pages engineered to convert specific marketing campaigns with maximum efficiency.',
        fr: 'Pages uniques ciblées au laser conçues pour convertir vos campagnes publicitaires avec un rendement maximal.',
        es: 'Páginas exclusivas diseñadas con precisión de láser para optimizar sus campañas publicitarias específicas.',
        ur: 'اشتہاری مہمات کو کسٹمرز میں تبدیل کرنے کے لیے مخصوص سنگل پیج لے آؤٹ۔'
      }[language] || 'Laser-focused single pages engineered to convert specific marketing campaigns with maximum efficiency.',
      features: {
        en: ['A/B optimized structure', 'Speed-optimized assets', 'CRM & Webhook links', 'Staggering first impression'],
        fr: ['Structure pensée A/B Testing', 'Médias optimisés en vitesse', 'Liaison CRM & Webhooks', 'Impact visuel instantané'],
        es: ['Alineación pensada para A/B Test', 'Medios y fotos comprimidas', 'Campañas y CRM enlazadas', 'Impacto inicial fantástico'],
        ur: ['بہترین مارکیٹنگ پلان', 'کمپریسڈ تصاویر اور ویڈیوز', 'سی آر ایم اور ویب ہک کنکشن', 'پہلی ہی نظر میں زبردست تاثر']
      }[language] || ['A/B optimized structure', 'Speed-optimized assets', 'CRM & Webhook links', 'Staggering first impression']
    },
    {
      id: 'srv-redesigns',
      title: {
        en: 'Website Redesigns',
        fr: 'Refontes de Sites Web',
        es: 'Rediseños de Sitios Web',
        ur: 'ویب سائٹ کے نئے ماڈل'
      }[language] || 'Website Redesigns',
      iconName: 'RefreshCw',
      description: {
        en: 'Complete overhaul of outdated pages into high-performing, hyper-modern web assets built to scale.',
        fr: 'Overhaul de vos pages vieillissantes vers des actifs ultra-modernes de haute facture conçus pour durer.',
        es: 'Transformación de portales obsoletos en hermosos activos web hiperoptimizados.',
        ur: 'پرانی ویب سائٹس کے لے آؤٹ کو تبدیل کر کے انتہائی تیز رفتار اور شاندار ڈیزائنز میں ڈھالنا۔'
      }[language] || 'Complete overhaul of outdated pages into high-performing, hyper-modern web assets built to scale.',
      features: {
        en: ['Legacy site audit', 'No downtime deployment', 'Aesthetic overhaul', 'Preserved SEO positioning'],
        fr: ['Audit complet du site hérité', 'Déploiement sans coupure', 'Refonte esthétique profonde', 'Positionnement SEO préservé'],
        es: ['Auditoria de su presencia web', 'Despliegue sin interrupciones', 'Estilo estético renovado', 'Sin riesgo de perder SEO'],
        ur: ['پرانی ویب سائٹ کا تفصیلی آڈٹ', 'بغیر لوڈنگ بند کیے لانچ', 'جدید دیدہ زیب تزئین نو', 'ایس ای او رینکنگ برقرار رکھنا']
      }[language] || ['Legacy site audit', 'No downtime deployment', 'Aesthetic overhaul', 'Preserved SEO positioning']
    },
    {
      id: 'srv-maintenance',
      title: {
        en: 'Website Maintenance',
        fr: 'Support et Maintenance',
        es: 'Mantenimiento del Sitio Web',
        ur: 'ویب سائٹ کی دیکھ بھال'
      }[language] || 'Website Maintenance',
      iconName: 'Wrench',
      description: {
        en: 'Ongoing technical upkeep, swift response times, daily cloud backups, and proactive structural updates.',
        fr: 'Suivi technique récurrent, délais d’intervention courts, sauvegardes quotidiennes et mises à jour proactives.',
        es: 'Mantenimiento técnico diario, respuestas veloces, backups en la nube proactivos.',
        ur: 'ویب سائٹ کی مسلسل دیکھ بھال، مسائل کا فوری حل، روزانہ کے بیک اپس اور مسلسل اپ ڈیٹس۔'
      }[language] || 'Ongoing technical upkeep, swift response times, daily cloud backups, and proactive structural updates.',
      features: {
        en: ['24/7 server health check', 'Routine package upgrades', 'Security reinforcement', 'Priority designer support'],
        fr: ['Surveillance serveur 24/7', 'Mises à jour des dépendances', 'Sécurisation et pare-feu', 'Support designer prioritaire'],
        es: ['Monitoreo continuo 24/7', 'Actualización de librerías', 'Mejoras continuas de seguridad', 'Plan de soporte prioritario'],
        ur: ['سرور کی 24/7 مانیٹرنگ', 'باقاعدہ لائبریری اپ گریڈز', 'سیکیورٹی سسٹمز کو مضبوط بنانا', 'خصوصی تکنیکی مدد کی فراہمی']
      }[language] || ['24/7 server health check', 'Routine package upgrades', 'Security reinforcement', 'Priority designer support']
    },
    {
      id: 'srv-seo',
      title: {
        en: 'SEO Optimization',
        fr: 'Optimisation SEO Locale',
        es: 'Optimización SEO Local',
        ur: 'انجن آپٹیمائزیشن (SEO)'
      }[language] || 'SEO Optimization',
      iconName: 'Search',
      description: {
        en: 'Data-driven semantic structures, core web vital tune-ups, keyword alignments, and index acceleration.',
        fr: 'Grilles sémantiques riches, réglage des signaux vitaux du web, ciblage de mots clés et référencement Google rapide.',
        es: 'Estructuras sémanticas avanzadas, análisis de velocidad, posicionamiento de palabras clave y rastreo activo.',
        ur: 'گوگل اور دیگر سرچ انجنوں پر سب سے نمایاں رینکنگ، بہترین کی ورڈز اور ایس ای او آرکیٹیکچر۔'
      }[language] || 'Data-driven semantic structures, core web vital tune-ups, keyword alignments, and index acceleration.',
      features: {
        en: ['JSON-LD structural data', 'Keyword mapping', 'Lighthouse optimization', 'Responsive speed pass'],
        fr: ['Données structurées JSON-LD', 'Recherche de mots clés', 'Optimisation Lighthouse', 'Rapport de rapidité mobile'],
        es: ['Estructura de metadatos JSON-LD', 'Plan de palabras clave', 'Máximo puntaje en Lighthouse', 'Rápido índice móvil'],
        ur: ['گوگل اسٹرکچرڈ ڈیٹا', 'کی ورڈز ریسرچ رپوٹ', 'لائٹ ہاؤس اور اسپیڈ آڈٹ', 'موبائل پر تیز ترین انڈیکسنگ']
      }[language] || ['JSON-LD structural data', 'Keyword mapping', 'Lighthouse optimization', 'Responsive speed pass']
    },
    {
      id: 'srv-ai',
      title: {
        en: 'AI-Powered Solutions',
        fr: 'Intégrations IA Sur-Mesure',
        es: 'Soluciones con IA',
        ur: 'مصنوعی ذہانت (AI) حل'
      }[language] || 'AI-Powered Solutions',
      iconName: 'Bot',
      description: {
        en: 'Modern custom intelligence integrations, self-service chatbots, automated workflows, and predictive analytics tools.',
        fr: 'Intégrations d’intelligence artificielle, agents de chat autonomes, flux d’automations et analyses prédictives.',
        es: 'Integraciones con inteligencia artificial, chatbots automatizados y flujos dinámicos.',
        ur: 'جدید کسٹم آرٹیفیشل انٹیلیجنس، رئیل ٹائم چیٹ بوٹس، اور تیز ترین آٹومیشن کے طریقے...'
      }[language] || 'Modern custom intelligence integrations, self-service chatbots, automated workflows, and predictive analytics tools.',
      features: {
        en: ['Gemini API configurations', 'Live chat agent panels', 'Contextual prompt tuning', 'Serverless execution'],
        fr: ['Configurations de l’API Gemini', 'Agents de messagerie réactifs', 'Optimisation fine des prompts', 'Exécution sans serveur'],
        es: ['Integraciones de API Gemini', 'Agentes de soporte contextual', 'Alineación fina de prompts', 'Ejecución serverless optimizada'],
        ur: ['گوگل جیمنائی API کنفیگریشن', 'لائیو چیٹ بوٹس اور ایجنٹس', 'مخصوص ہدایات (Prompt Tuning)', 'بغیر سرور کلاؤڈ ڈیولپمنٹ']
      }[language] || ['Gemini API configurations', 'Live chat agent panels', 'Contextual prompt tuning', 'Serverless execution']
    }
  ];

  const portfolioData: Project[] = [
    {
      id: 'proj-bakery',
      category: 'bakery',
      title: {
        en: "Madi's Premium Cookie Boutique",
        fr: "Boutique de Cookies Premium de Madi",
        es: "Boutique de Cookies Premium de Madi",
        ur: "ماڈیز پریمیم کوکی بوٹیک"
      }[language] || "Madi's Premium Cookie Boutique",
      clientName: "Madi's Cookie",
      description: {
        en: "A deluxe, responsive e-commerce experience for artisanal giant 6-ounce loaded cookies featuring real-time interactive product building and luxurious visual menus.",
        fr: "Une vitrine e-commerce de luxe pour de délicieux cookies artisanaux de 170g, avec un configurateur interactif de produits et des cartes élégantes.",
        es: "Una experiencia e-commerce de lujo para cookies artesanales gigantes de 170g, con configurador de productos dinámico y elegante menú visual.",
        ur: "لذیذ اور منفرد ذائقوں کے کسٹم کوکی پورٹل کے لیے ایک عیش و آرام بھرا ای کامرس لے آؤٹ جس میں آن لائن مصنوعات دیکھنے اور خریدنے کی جدید ترین سہولیات ہیں۔"
      }[language] || "A deluxe, responsive e-commerce experience for artisanal giant 6-ounce loaded cookies featuring real-time interactive product building and luxurious visual menus.",
      features: {
        en: ['High-DPI gourmet product showcases', 'Frictionless Stripe checkout flow', 'Speed-optimized interactive navigation', 'Conversion rates raised significantly'],
        fr: ['Photos de produits gourmands haute fidélité', 'Tunnel d’achat Stripe ultra-fluide', 'Navigation interactive fluide', 'Taux de conversion nettement améliorés'],
        es: ['Fotos de productos gourmet HD', 'Pasarela de compras con Stripe', 'Uso súper rápido e interactivo', 'Tasas de venta un 89% más altas'],
        ur: ['اعلیٰ کوالٹی تصاویر اور ویڈیوز', 'انتہائی آسان اسٹرائپ پیمنٹ سسٹم', 'نہایت تیز رفتار نیویگیشن طریقہ', 'سیلز اور آرڈرز کی شرح میں نمایاں اضافہ']
      }[language] || ['High-DPI gourmet product showcases', 'Frictionless Stripe checkout flow', 'Speed-optimized interactive navigation', 'Conversion rates raised significantly'],
      mockupType: 'mobile',
      performanceScore: 100,
      conversionIncrease: {
        en: '+89% order volume',
        fr: '+89% de volume de commandes',
        es: '+89% en volumen de ventas',
        ur: 'آرڈرز کے حجم میں 89 فیصد اضافہ'
      }[language] || '+89% order volume',
      liveUrl: 'https://ais-pre-nk2v5k5wxpbhn3adgv7hlm-763208867946.asia-east1.run.app/',
      imageUrl: new URL('../assets/images/cookie_website_mockup_1781476387360.jpg', import.meta.url).href
    },
    {
      id: 'proj-cleaning',
      category: 'cleaning',
      title: {
        en: 'SparklePro Clean Service Hub',
        fr: 'Portail Pro de Nettoyage SparklePro',
        es: 'Portal Premium SparklePro Clean',
        ur: 'اسپارکل پرو برانڈ کلیننگ پورٹل'
      }[language] || 'SparklePro Clean Service Hub',
      clientName: 'SparklePro Cleaning Services',
      description: {
        en: 'A modern real-time service booking, dispatch, and automated pricing hub for luxury home and commercial sanitation providers.',
        fr: 'Un centre de réservation moderne, de suivi de dispatch et de calcul automatique des tarifs pour le nettoyage professionnel haut de gamme.',
        es: 'Sistema para concertar reservas, logística y presupuestos automatizados para servicios premium.',
        ur: 'رہائشی اور تجارتی خدمات کے لیے آن لائن بکنگ سسٹم، آٹومیٹک ریٹ کیلکولیٹر اور ڈسپیچ پورٹل।'
      }[language] || 'A modern real-time service booking, dispatch, and automated pricing hub for luxury home and commercial sanitation providers.',
      features: {
        en: ['Interactive service scheduler', 'Dynamic custom quote calculator', 'Automated local routing engine', 'Ultra-clean dark & light visuals'],
        fr: ['Planificateur de rendez-vous interactif', 'Calculateur de devis dynamique', 'Planification algorithmique de desserte', 'Design clair-obscur soigné'],
        es: ['Planificador de reservas dinámico', 'Calculadora de presupuesto automática', 'Ordenación logística automatizada', 'Aspecto estético oscuro y claro limpio'],
        ur: ['متعامل بکنگ شیڈولنگ کیلنڈر', 'آسان کسٹم ریٹ کیلکولیٹر', 'محل وقوع کے مطابق لوکل روٹنگ نظام', 'انتہائی سلیک اور خوبصورت تھیمز']
      }[language] || ['Interactive service scheduler', 'Dynamic custom quote calculator', 'Automated local routing engine', 'Ultra-clean dark & light visuals'],
      mockupType: 'browser',
      performanceScore: 99,
      conversionIncrease: {
        en: '+142% book rate',
        fr: '+142% de taux de réservation',
        es: '+142% en tasa de reservas',
        ur: 'بکنگ کی شرح میں 142 فیصد اضافہ'
      }[language] || '+142% book rate',
      liveUrl: 'https://ais-pre-nnmyjp7wseq4rz6vqksn4g-763208867946.asia-east1.run.app',
      imageUrl: new URL('../assets/images/regenerated_image_1781477189983.png', import.meta.url).href
    },
    {
      id: 'proj-clinic',
      category: 'clinic',
      title: {
        en: 'CarePlus Family Medical Hub',
        fr: 'Portail Médical de Famille CarePlus',
        es: 'Centro Médico CarePlus Family',
        ur: 'کیئر پلس کلینک ہیلتھ پورٹل'
      }[language] || 'CarePlus Family Medical Hub',
      clientName: 'CarePlus Clinics',
      description: {
        en: 'A premium, highly secure health clinic portal providing virtual appointment planning, doctor directories, and compassionate service lookups.',
        fr: 'Portail médical confidentiel et élégant, facilitant la prise de rendez-vous en ligne, la recherche de médecins et les conseils santé de proximité.',
        es: 'Portal de atención de salud privado con gestión de citas virtuales y listado de personal médico.',
        ur: 'ایک انتہائی محفوظ اور کسٹم ہیلتھ پورٹل جس میں ڈاکٹرز سے ملاقات کا وقت، میڈیکل ہسٹری اور ماہرین کی تفصیلات شامل ہیں۔'
      }[language] || 'A premium, highly secure health clinic portal providing virtual appointment planning, doctor directories, and compassionate service lookups.',
      features: {
        en: ['Frictionless clinic appointments', 'Modern patient onboarding portal', 'HIPAA compliant contact interfaces', 'Optimized first contentful paint (120ms)'],
        fr: ['Rendez-vous cliniques sans friction', 'Portail d’onboarding patient soigné', 'Interfaces hautement confidentielles et sécurisées', 'Affichage principal optimisé en 120ms'],
        es: ['Citas médicas sin complicaciones', 'Registro de historiales médicos limpio', 'Entornos virtuales HIPAA súper seguros', 'Visualización inicial cargada en 120ms'],
        ur: ['بغیر کسی رکاوٹ کے فارمز کی ادائیگی', 'جدید کسٹمر رجسٹریشن پورٹل', 'انتہائی محفوظ اور سیکیور ڈاکٹر سسٹمز', 'فوری ترین لوڈنگ اسپیڈ']
      }[language] || ['Frictionless clinic appointments', 'Modern patient onboarding portal', 'HIPAA compliant contact interfaces', 'Optimized first contentful paint (120ms)'],
      mockupType: 'browser',
      performanceScore: 99,
      conversionIncrease: {
        en: '+64% bookings',
        fr: '+64% de réservations en ligne',
        es: '+64% en reserva de turnos',
        ur: 'کلائنٹس کی بکنگ میں 64 فیصد اضافہ'
      }[language] || '+64% bookings',
      liveUrl: 'https://ais-pre-e3im2c5m5toje2socoj7aj-763208867946.asia-east1.run.app',
      imageUrl: new URL('../assets/images/clinic_website_mockup_1781476770487.jpg', import.meta.url).href
    }
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, statsData, problemsData, servicesData, portfolioData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
