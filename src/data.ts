import { Project, Service, StatCard, ProblemCard } from './types';

export const STATS_DATA: StatCard[] = [
  {
    id: 'stat-projects',
    number: 142,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'High-converting custom websites built and launched globally.',
    iconName: 'Code'
  },
  {
    id: 'stat-clients',
    number: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'Long-term development partnerships with trusted enterprises.',
    iconName: 'Smile'
  },
  {
    id: 'stat-speed',
    number: 99,
    suffix: '/100',
    label: 'Avg Lighthouse Speed',
    description: 'Guaranteed core web vitals and ultra-lightweight execution.',
    iconName: 'Zap'
  },
  {
    id: 'stat-satisfaction',
    number: 4.9,
    suffix: '/5.0',
    label: 'Satisfaction Rating',
    description: 'Exceptional visual polish, active support, and clear dialogue.',
    iconName: 'Award'
  }
];

export const PROBLEMS_DATA: ProblemCard[] = [
  {
    id: 'prob-outdated',
    title: 'Outdated Design',
    iconName: 'Palette',
    description: 'A layout designed in 2018 signals that your business is inactive or lagging behind.',
    solution: 'Framer/Stripe level visual typography with sleek interactive details that establish modern authority.'
  },
  {
    id: 'prob-slow',
    title: 'Slow Loading Speed',
    iconName: 'Gauge',
    description: '53% of mobile visits are abandoned if a page takes longer than 3 seconds to load.',
    solution: 'React-optimized component structures and asset optimization ensuring 100ms first contentful paint.'
  },
  {
    id: 'prob-mobile',
    title: 'Poor Mobile Experience',
    iconName: 'Smartphone',
    description: 'Over 60% of all web traffic originates from mobile. Unresponsive grids frustrate readers.',
    solution: 'Responsive-first touch targets and fluid layouts engineered with pixel-perfection across all viewport ratios.'
  },
  {
    id: 'prob-trust',
    title: 'Low Customer Trust',
    iconName: 'ShieldAlert',
    description: 'Broken layouts, missing testimonials, or bad certificates make customers question your credibility.',
    solution: 'Professional trust-badges, secure architectures, and elegant content flows that command respect.'
  },
  {
    id: 'prob-conversion',
    title: 'Low Conversion Rates',
    iconName: 'TrendingDown',
    description: 'Traffic without direction leads to zero income. Confusing journeys lose sales.',
    solution: 'Strategic Call to Action triggers, clean lead hooks, and frictionless forms positioned natively.'
  },
  {
    id: 'prob-presence',
    title: 'Weak Online Presence',
    iconName: 'Globe',
    description: 'If your business is invisible on Google search, competitors take your local market share.',
    solution: 'Optimized semantic HTML elements, active meta structures, schemas, and clean directory layouts.'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-business',
    title: 'Business Websites',
    iconName: 'Briefcase',
    description: 'Stunning corporate portals styled to signal industry leadership, complete with client onboarding loops.',
    features: ['Custom design layout', 'High performance core', 'Lead integration', 'Interactive visual sections']
  },
  {
    id: 'srv-ecommerce',
    title: 'E-Commerce Stores',
    iconName: 'ShoppingBag',
    description: 'Frictionless purchasing systems built with dynamic visual carts, secure checkout, and ultra-fast speed.',
    features: ['High speed load times', 'Custom inventory system', 'Stripe & PayPal ready', 'Conversion optimized flow']
  },
  {
    id: 'srv-landing',
    title: 'Landing Pages',
    iconName: 'Sparkles',
    description: 'Laser-focused single pages engineered to convert specific marketing campaigns with maximum efficiency.',
    features: ['A/B optimized structure', 'Speed-optimized assets', 'CRM & Webhook links', 'Staggering first impression']
  },
  {
    id: 'srv-redesigns',
    title: 'Website Redesigns',
    iconName: 'RefreshCw',
    description: 'Complete overhaul of outdated pages into high-performing, hyper-modern web assets built to scale.',
    features: ['Legacy site audit', 'No downtime deployment', 'Aesthetic overhaul', 'Preserved SEO positioning']
  },
  {
    id: 'srv-maintenance',
    title: 'Website Maintenance',
    iconName: 'Wrench',
    description: 'Ongoing technical upkeep, swift response times, daily cloud backups, and proactive structural updates.',
    features: ['24/7 server health check', 'Routine package upgrades', 'Security reinforcement', 'Priority designer support']
  },
  {
    id: 'srv-seo',
    title: 'SEO Optimization',
    iconName: 'Search',
    description: 'Data-driven semantic structures, core web vital tune-ups, keyword alignments, and index acceleration.',
    features: ['JSON-LD structural data', 'Keyword mapping', 'Lighthouse optimization', 'Responsive speed pass']
  },
  {
    id: 'srv-ai',
    title: 'AI-Powered Solutions',
    iconName: 'Bot',
    description: 'Modern custom intelligence integrations, self-service chatbots, automated workflows, and predictive analytics tools.',
    features: ['Gemini API configurations', 'Live chat agent panels', 'Contextual prompt tuning', 'Serverless execution']
  }
];

export const PORTFOLIO_DATA: Project[] = [
  {
    id: 'proj-bakery',
    category: 'bakery',
    title: "Madi's Premium Cookie Boutique",
    clientName: "Madi's Cookie",
    description: "A deluxe, responsive e-commerce experience for artisanal giant 6-ounce loaded cookies featuring real-time interactive product building and luxurious visual menus.",
    features: ['High-DPI gourmet product showcases', 'Frictionless Stripe checkout flow', 'Speed-optimized interactive navigation', 'Conversion rates raised significantly'],
    mockupType: 'mobile',
    performanceScore: 100,
    conversionIncrease: '+89% order volume',
    liveUrl: 'https://ais-pre-nk2v5k5wxpbhn3adgv7hlm-763208867946.asia-east1.run.app/',
    imageUrl: new URL('./assets/images/cookie_website_mockup_1781476387360.jpg', import.meta.url).href
  },
  {
    id: 'proj-cleaning',
    category: 'cleaning',
    title: 'SparklePro Clean Service Hub',
    clientName: 'SparklePro Cleaning Services',
    description: 'A modern real-time service booking, dispatch, and automated pricing hub for luxury home and commercial sanitation providers.',
    features: ['Interactive service scheduler', 'Dynamic custom quote calculator', 'Automated local routing engine', 'Ultra-clean dark & light visuals'],
    mockupType: 'browser',
    performanceScore: 99,
    conversionIncrease: '+142% book rate',
    liveUrl: 'https://ais-pre-nnmyjp7wseq4rz6vqksn4g-763208867946.asia-east1.run.app',
    imageUrl: new URL('./assets/images/regenerated_image_1781477189983.png', import.meta.url).href
  },
  {
    id: 'proj-clinic',
    category: 'clinic',
    title: 'CarePlus Family Medical Hub',
    clientName: 'CarePlus Clinics',
    description: 'A premium, highly secure health clinic portal providing virtual appointment planning, doctor directories, and compassionate service lookups.',
    features: ['Frictionless clinic appointments', 'Modern patient onboarding portal', 'HIPAA compliant contact interfaces', 'Optimized first contentful paint (120ms)'],
    mockupType: 'browser',
    performanceScore: 99,
    conversionIncrease: '+64% bookings',
    liveUrl: 'https://ais-pre-e3im2c5m5toje2socoj7aj-763208867946.asia-east1.run.app',
    imageUrl: new URL('./assets/images/clinic_website_mockup_1781476770487.jpg', import.meta.url).href
  }
];

export interface BeforeAfterExample {
  id: string;
  industry: string;
  before: {
    title: string;
    lighthouse: { performance: number; seo: number; accessibility: number };
    tagline: string;
    description: string;
    colors: string;
    problems: string[];
  };
  after: {
    title: string;
    lighthouse: { performance: number; seo: number; accessibility: number };
    tagline: string;
    description: string;
    colors: string;
    features: string[];
  };
}

export const TRANSFORMATION_EXAMPLES: BeforeAfterExample[] = [
  {
    id: 'trans-salon',
    industry: 'Luxury Hair Salon',
    before: {
      title: 'AuraSpa-haircut-Karachi.blogspot.com',
      lighthouse: { performance: 38, seo: 45, accessibility: 50 },
      tagline: 'WELCOME TO AURA SPA',
      description: 'We do hair, nails, makeup. Click here to read prices, call us on phone, read our blogs... we also sell brand shampoo.',
      colors: 'Cluttered red-yellow theme, flashing GIF banners, broken styling grids',
      problems: [
        'Unresponsive on phone: users have to pinch-zoom',
        'Loading takes 6.8 seconds over mobile network',
        'Reservation is just static raw text saying "Call Us"',
        'Total chaos in visual hierarchy with comic sans font'
      ]
    },
    after: {
      title: 'aurasalon.studio',
      lighthouse: { performance: 99, seo: 100, accessibility: 100 },
      tagline: 'Reflect Your Inner Light',
      description: 'A customized interactive appointment platform with live stylist lookbooks & glassmorphic aesthetics.',
      colors: 'Midnight charcoal with pearl white & brand-blue accents',
      features: [
        'Fluid 1-tap mobile booking panel with live SMS updates',
        'Sub-second paint times via lazy loaded assets',
        'Immersive portfolio grid showcasing actual styles',
        'Fully-responsive UI engineered with micro-interactions'
      ]
    }
  },
  {
    id: 'trans-bakery',
    industry: 'Artisanal Cookie Boutique',
    before: {
      title: 'GrandmaCookies-Karachi.blogspot.com',
      lighthouse: { performance: 44, seo: 51, accessibility: 58 },
      tagline: 'Delicious Homemade Cookies!',
      description: 'Established in 2018. Our catalog is in a low-res photo. Email or WhatsApp us to place orders. Handcrafted with love.',
      colors: 'Distorted heavy background images, plain unformatted web text',
      problems: [
        'WhatsApp link takes 10+ seconds to load on poor mobile networks',
        'No interactive shopping cart; customer must manually write order names',
        'Unsafe HTTP site triggers warnings on web browsers',
        'Completely invisible on local Google Search map keywords'
      ]
    },
    after: {
      title: 'cookiecrumble.studio',
      lighthouse: { performance: 100, seo: 100, accessibility: 98 },
      tagline: 'Artisanal Cookies, Baked Fresh.',
      description: 'Seamless localized ecommerce boutique engineered with high-DPI product visualization and direct secure checkouts.',
      colors: 'Elegant slate-blue layout, typography-focused micro-states',
      features: [
        'Fluid add-to-cart & checkout integration',
        'Fully responsive modern interactive product catalogs',
        'Lighthouse performance optimized layouts loading in <120ms',
        'Prepopulated SEO metadata schema maximizing regional ranking'
      ]
    }
  }
];

export const SERVICES_ICONS_MAPPING = {
  Briefcase: 'Briefcase',
  ShoppingBag: 'ShoppingBag',
  Sparkles: 'Sparkles',
  RefreshCw: 'RefreshCw',
  Wrench: 'Wrench',
  Search: 'Search',
  Bot: 'Bot'
};
