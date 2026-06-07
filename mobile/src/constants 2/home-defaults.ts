import type { NativeHomeContent, NativeSiteSettings } from '../types/home-content';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920';
const MEETING_IMAGE = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200';

export const DEFAULT_HOME_CONTENT: NativeHomeContent = {
  hero: {
    title: 'Boutique Workspace in the City of London',
    subtitle:
      'The Leadenhall Works offers refined workspace solutions in a prestigious City of London address, with dedicated desks, private offices and meeting rooms designed for professionals, small teams and growing businesses.',
    backgroundImage: HERO_IMAGE,
    primaryCtaLabel: 'Explore Memberships',
    primaryCtaPath: '/pricing',
    secondaryCtaLabel: 'Watch Video',
    videoUrl: '',
  },
  featureChips: [
    { icon: 'Wifi', text: 'High-speed internet' },
    { icon: 'Users', text: 'Meeting room access' },
    { icon: 'Clock', text: 'Flexible workspace plans' },
  ],
  servicesEyebrow: 'Services',
  servicesKicker: 'Explore our spaces',
  services: [
    {
      title: 'Coworking',
      description: 'Shared spaces designed for focus, creativity, and collaboration.',
      image: HERO_IMAGE,
      link: '/pricing',
    },
    {
      title: 'Meeting Room',
      description: 'Fully-equipped rooms for presentations, interviews, and team sessions.',
      image: MEETING_IMAGE,
      link: '/meeting-rooms',
    },
    {
      title: 'Virtual Office',
      description: 'Build your company presence with a premium city business address.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      link: '/virtual-office',
    },
  ],
  aboutHighlight: {
    eyebrow: 'About',
    title: 'A City business address without the office cost',
    description: 'Get all the benefits of a prestigious business address without the overhead of a physical office.',
    benefits: ['Premium mailing address', 'Business coordinates', 'Reception and support'],
    image: MEETING_IMAGE,
    primaryCtaLabel: 'More Details',
    primaryCtaPath: '/virtual-office',
    secondaryCtaLabel: 'See Plans',
    secondaryCtaPath: '/pricing',
  },
  whyChooseEyebrow: 'Features',
  whyChooseKicker: 'Built for teams',
  whyChooseTitle: 'Why Choose CoworkingHub?',
  whyChooseItems: [
    {
      icon: 'LayoutGrid',
      title: 'Flexible Workstations',
      description: 'Choose hot desks, dedicated desks, or private spaces as you grow.',
    },
    {
      icon: 'CalendarDays',
      title: 'Private Cabinet Store',
      description: 'Secure personal lockers to keep your day-to-day items protected.',
    },
    {
      icon: 'HeadphonesIcon',
      title: 'Professional Support',
      description: 'Front desk support and day-to-day assistance.',
    },
  ],
  testimonialsEyebrow: 'Testimonials',
  testimonialsKicker: 'Member reviews',
  testimonialsTitle: 'What Our Members Say',
  testimonials: [
    {
      name: 'John Smith',
      role: 'Product Lead',
      content: 'A calm, professional space that makes it easy to focus and meet clients.',
      stars: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Startup Founder',
      content: 'The meeting rooms are excellent, and the staff is always helpful and responsive.',
      stars: 5,
    },
    {
      name: 'Daniel Wilson',
      role: 'Business Consultant',
      content: 'Flexible terms, central location, and a community that feels welcoming.',
      stars: 5,
    },
  ],
  galleryEyebrow: 'Gallery',
  galleryKicker: 'Our Space',
  galleryTitle: 'Our Space',
  galleryImages: [
    { image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1200', alt: 'Skylight architecture' },
    { image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200', alt: 'Creative workspace details' },
    { image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200', alt: 'Meeting room chairs' },
  ],
  contactForm: {
    title: 'Contact Us / Book a Tour',
    description: "We'll get back to you within one business day.",
    submitLabel: 'Send Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    subjectPlaceholder: 'Tour request',
    messagePlaceholder: 'Tell us all your needs',
  },
  visit: {
    title: 'Visit Us',
    addressLabel: 'Address',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    openHoursLabel: 'Open Hours',
    weekdayHours: 'Mon-Fri: 8:00 AM - 8:00 PM',
    weekendHours: 'Sat-Sun: 10:00 AM - 4:00 PM',
    mapButtonLabel: 'View on Google Maps',
    mapUrl: '',
  },
};

export const DEFAULT_SITE_SETTINGS: NativeSiteSettings = {
  siteName: 'The Leadenhall Works',
  tagline: 'Flexible coworking spaces in the heart of the city built for focus, meetings, and meaningful connections.',
  contactEmail: 'aras.akpinar@tlwhub.com',
  contactPhone: '+1 (555) 013-0249',
  address: '1 Whittington Ave EC3V 1LE',
  navigation: {
    logoUrl: '',
    ctaLabel: 'Explore Memberships',
    ctaPath: '/pricing',
    links: [
      { label: 'Memberships', path: '/pricing' },
      { label: 'Meeting Room', path: '/meeting-rooms' },
      { label: 'Virtual Office', path: '/virtual-office' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  footer: {
    logoUrl: '',
    description: 'Flexible coworking spaces in the heart of the city built for focus, meetings, and meaningful connections.',
    serviceLinks: [
      { label: 'Memberships', path: '/pricing' },
      { label: 'Meeting Room', path: '/meeting-rooms' },
      { label: 'Virtual Office', path: '/virtual-office' },
      { label: 'Private Office', path: '/pricing' },
    ],
    aboutLinks: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Space', path: '/' },
      { label: 'Blog', path: '/blog' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact', path: '/contact' },
    ],
    contactTitle: 'Contact',
    copyright: '© 2026 Coworking Hub. All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms', path: '/terms' },
    ],
    socialLinks: [],
  },
};
