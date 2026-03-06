export interface SiteLink {
  name: string;
  path: string;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
}

export interface IconTextItem {
  icon: string;
  text: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  stars: number;
}

export interface WorkspaceItem {
  id: string;
  title: string;
  image: string;
  category: string;
  link: string;
}

export interface GalleryImageItem {
  image: string;
  alt: string;
}

export interface ComparisonRow {
  feature: string;
  values: ComparisonValueItem[];
}

export interface ComparisonValueItem {
  valueType: 'boolean' | 'text';
  booleanValue?: boolean;
  textValue?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface AmenityItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormContent {
  title: string;
  description?: string;
  submitLabel: string;
  namePlaceholder: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  subjectPlaceholder?: string;
  messagePlaceholder: string;
}

export interface LegalSectionItem {
  title: string;
  body: string;
}

export interface LegalPageContent {
  heroTitle: string;
  heroSubtitle: string;
  effectiveDateLabel: string;
  effectiveDateValue: string;
  introText: string;
  sections: LegalSectionItem[];
  contactTitle: string;
  contactBody: string;
  contactButtonLabel: string;
}

export interface SiteSettingsContent {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: SocialLinkItem[];
  navigation: {
    logoUrl: string;
    links: SiteLink[];
    ctaLabel: string;
    ctaPath: string;
  };
  footer: {
    logoUrl: string;
    description: string;
    serviceLinks: SiteLink[];
    aboutLinks: SiteLink[];
    contactTitle: string;
    copyright: string;
    legalLinks: SiteLink[];
  };
  homePage: {
    hero: {
      title: string;
      subtitle: string;
      backgroundImage: string;
      primaryCtaLabel: string;
      primaryCtaPath: string;
      secondaryCtaLabel: string;
    };
    featureChips: IconTextItem[];
    servicesEyebrow: string;
    servicesKicker: string;
    services: ServiceItem[];
    aboutHighlight: {
      eyebrow: string;
      title: string;
      description: string;
      benefits: string[];
      image: string;
      primaryCtaLabel: string;
      primaryCtaPath: string;
      secondaryCtaLabel: string;
      secondaryCtaPath: string;
    };
    whyChooseEyebrow: string;
    whyChooseKicker: string;
    whyChooseTitle: string;
    whyChooseItems: FeatureItem[];
    testimonialsEyebrow: string;
    testimonialsKicker: string;
    testimonialsTitle: string;
    testimonials: TestimonialItem[];
    galleryEyebrow: string;
    galleryKicker: string;
    galleryTitle: string;
    galleryImages: GalleryImageItem[];
    contactForm: ContactFormContent;
    visitUsTitle: string;
    addressLabel: string;
    emailLabel: string;
    phoneLabel: string;
    openHoursLabel: string;
    weekdayHours: string;
    weekendHours: string;
    mapButtonLabel: string;
  };
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    storyTitle: string;
    storyParagraphs: string[];
    storyImage: string;
    whyChooseTitle: string;
    whyChooseItems: FeatureItem[];
    amenitiesTitle: string;
    amenitiesImage: string;
    amenities: AmenityItem[];
  };
  blogPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    searchPlaceholder: string;
    quickSearchTitle: string;
    recentPostsTitle: string;
    categoriesTitle: string;
    popularTagsTitle: string;
    noResultsText: string;
    detailBackLabel: string;
    detailSearchTitle: string;
    detailSearchButtonLabel: string;
    detailRecentPostsTitle: string;
    detailPopularTagsTitle: string;
    detailRelatedWorkspacesTitle: string;
    detailCommentForm: ContactFormContent;
    relatedWorkspaces: WorkspaceItem[];
  };
  pricingPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    comparisonTitle: string;
    comparisonColumns: string[];
    comparisonRows: ComparisonRow[];
    faqTitle: string;
    faqSubtitle: string;
    faqItems: FaqEntry[];
    purchaseButtonLabel: string;
    recommendedLabel: string;
    featureListTitle: string;
    featureListSubtitle: string;
  };
  faqPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    noResultsText: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
  };
  meetingRoomsPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    roomsTitle: string;
    roomsSubtitle: string;
    amenitiesTitle: string;
    amenitiesSubtitle: string;
    amenities: AmenityItem[];
    plansTitle: string;
    plansSubtitle: string;
    readMoreLabel: string;
    bookNowLabel: string;
    getStartedLabel: string;
    popularLabel: string;
  };
  virtualOfficePage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    featuredImage: string;
    overviewTitle: string;
    overviewText: string;
    challengeTitle: string;
    challengeIntro: string;
    challengeItems: string[];
    resultTitle: string;
    resultText: string;
    galleryImages: GalleryImageItem[];
    projectInfoTitle: string;
    projectDateLabel: string;
    projectDateValue: string;
    projectCategoryLabel: string;
    projectCategoryValue: string;
    projectWebsiteLabel: string;
    projectWebsiteValue: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
    contactForm: ContactFormContent;
  };
  contactPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    introEyebrow: string;
    introTitle: string;
    addressCardTitle: string;
    emailCardTitle: string;
    phoneCardTitle: string;
    form: ContactFormContent;
    mapTitle: string;
    mapDescription: string;
  };
}

export const defaultSiteSettingsContent: SiteSettingsContent = {
  siteName: 'CoworkingHub',
  tagline: 'Your space to work, connect and focus in the heart of the City.',
  contactEmail: 'hello@coworking.com',
  contactPhone: '+1 (555) 013-0249',
  address: '42 Market Street, Suite 200, City Center',
  socialLinks: [
    { label: 'Facebook', href: '#', icon: 'Facebook' },
    { label: 'Twitter', href: '#', icon: 'Twitter' },
    { label: 'Instagram', href: '#', icon: 'Instagram' },
    { label: 'LinkedIn', href: '#', icon: 'Linkedin' },
  ],
  navigation: {
    logoUrl: '/logo.svg',
    links: [
      { name: 'Home', path: '/' },
      { name: 'Memberships', path: '/pricing' },
      { name: 'Meeting Room', path: '/meeting-rooms' },
      { name: 'Private Office', path: '/virtual-office' },
      { name: 'Contact', path: '/contact' },
    ],
    ctaLabel: 'Book a Tour',
    ctaPath: '/contact',
  },
  footer: {
    logoUrl: '/logo-white.svg',
    description:
      'Flexible coworking spaces in the heart of the city built for focus, meetings, and meaningful connections.',
    serviceLinks: [
      { name: 'Memberships', path: '/pricing' },
      { name: 'Meeting Room', path: '/meeting-rooms' },
      { name: 'Virtual Office', path: '/virtual-office' },
      { name: 'Private Office', path: '/virtual-office' },
    ],
    aboutLinks: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Space', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
    ],
    contactTitle: 'Contact',
    copyright: '© 2026 Coworking Hub. All rights reserved.',
    legalLinks: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
    ],
  },
  homePage: {
    hero: {
      title: 'Your space to work, connect and focus in the heart of the City.',
      subtitle:
        'CoworkingHub provides flexible workspace solutions tailored for freelancers, remote teams, and entrepreneurs. Enjoy a professional address, high-speed WiFi, and a community that helps you grow.',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
      primaryCtaLabel: 'Get Started',
      primaryCtaPath: '/pricing',
      secondaryCtaLabel: 'Watch Video',
    },
    featureChips: [
      { icon: 'Wifi', text: 'High-speed internet' },
      { icon: 'Users', text: 'Meeting room access' },
      { icon: 'Clock', text: 'Flexible membership' },
    ],
    servicesEyebrow: 'Services',
    servicesKicker: 'Explore our spaces',
    services: [
      {
        title: 'Coworking',
        description: 'Shared spaces designed for focus, creativity, and collaboration.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        link: '/pricing',
      },
      {
        title: 'Meeting Room',
        description: 'Fully-equipped rooms for presentations, interviews, and team sessions.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
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
      description:
        'Get all the benefits of a prestigious business address without the overhead of a physical office.',
      benefits: [
        'Premium mailing address',
        'Business coordinates',
        'Reception and support',
        'Member events and perks',
      ],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
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
        description: 'Front desk support, mail handling, and day-to-day assistance.',
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
      {
        image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1200',
        alt: 'Skylight architecture',
      },
      {
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200',
        alt: 'Creative workspace details',
      },
      {
        image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200',
        alt: 'Keyboard closeup',
      },
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
    visitUsTitle: 'Visit Us',
    addressLabel: 'Address',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    openHoursLabel: 'Open Hours',
    weekdayHours: 'Mon-Fri: 8:00 AM - 8:00 PM',
    weekendHours: 'Sat-Sun: 10:00 AM - 4:00 PM',
    mapButtonLabel: 'View on Google Maps',
  },
  aboutPage: {
    heroTitle: 'About Coworking Hub',
    heroSubtitle:
      "We're on a mission to create inspiring workspaces where innovation thrives and communities grow.",
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    storyTitle: 'Our Story',
    storyParagraphs: [
      "Founded in 2020, CoworkingHub was born from a simple idea: work doesn't have to be confined to a traditional office. We believe that the right environment can unlock creativity, foster collaboration, and drive success.",
      'What started as a single location has grown into a thriving community of entrepreneurs, freelancers, startups, and established businesses. Our spaces are designed to adapt to the way you work, not the other way around.',
      "Today, we're proud to host over 500 members who call CoworkingHub their professional home. From intimate focus rooms to expansive collaborative spaces, we offer the flexibility and amenities that modern professionals need.",
    ],
    storyImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    whyChooseTitle: 'Why Choose Us',
    whyChooseItems: [
      {
        icon: 'MapPin',
        title: 'Prime Location',
        description: "Situated in Central London (EC3V), offering unparalleled access to the City's business district and transport links.",
      },
      {
        icon: 'CalendarDays',
        title: 'Flexible Terms',
        description: 'No long-term commitments required. Choose from daily, weekly, or monthly memberships that adapt to your needs.',
      },
      {
        icon: 'HeadphonesIcon',
        title: 'Professional Support',
        description: 'Access business support services, mail handling, and professional reception services to enhance your operations.',
      },
    ],
    amenitiesTitle: 'World-Class Amenities',
    amenitiesImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    amenities: [
      { icon: 'Wifi', title: 'High-Speed Internet', description: 'Gigabit fiber connection throughout the space' },
      { icon: 'Users', title: 'Modern Meeting Rooms', description: 'State-of-the-art conference facilities' },
      { icon: 'Coffee', title: 'Kitchen & Breakout Areas', description: 'Fully equipped kitchen and relaxation zones' },
      { icon: 'Printer', title: 'Print & Scan Facilities', description: 'Professional printing and scanning services' },
    ],
  },
  blogPage: {
    heroTitle: 'News, guides & workspace insights',
    heroSubtitle: 'Stay updated with the latest trends in coworking and remote work',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    searchPlaceholder: 'Search articles...',
    quickSearchTitle: 'Quick Search',
    recentPostsTitle: 'Recent Posts',
    categoriesTitle: 'Categories',
    popularTagsTitle: 'Popular Tags',
    noResultsText: 'No articles found matching your criteria.',
    detailBackLabel: 'Back to Blog',
    detailSearchTitle: 'Search',
    detailSearchButtonLabel: 'Go',
    detailRecentPostsTitle: 'Recent posts',
    detailPopularTagsTitle: 'Popular tags',
    detailRelatedWorkspacesTitle: 'Related workspaces',
    detailCommentForm: {
      title: 'Post a comment',
      submitLabel: 'Post Comment',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Comment',
    },
    relatedWorkspaces: [
      {
        id: 'private-office-1',
        title: 'Executive Suite',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
        category: 'Private Office',
        link: '/virtual-office',
      },
      {
        id: 'private-office-2',
        title: 'Team Space',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
        category: 'Private Office',
        link: '/virtual-office',
      },
      {
        id: 'private-office-3',
        title: 'Corner Office',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
        category: 'Private Office',
        link: '/virtual-office',
      },
    ],
  },
  pricingPage: {
    heroTitle: 'Pricing',
    heroSubtitle: 'Flexible plans designed to fit your needs',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    comparisonTitle: 'Compare All Features',
    comparisonColumns: ['Lounge', 'Smart Office', 'Full Space'],
    comparisonRows: [
      {
        feature: 'Free Resources',
        values: [
          { valueType: 'boolean', booleanValue: true },
          { valueType: 'boolean', booleanValue: true },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
      {
        feature: 'Premium Resources',
        values: [
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: true },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
      {
        feature: 'Webinars & Workshops',
        values: [
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: true },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
      {
        feature: 'Download for Offline',
        values: [
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: true },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
      {
        feature: 'Team Members',
        values: [
          { valueType: 'text', textValue: '1' },
          { valueType: 'text', textValue: '5' },
          { valueType: 'text', textValue: 'Unlimited' },
        ],
      },
      {
        feature: 'API Access',
        values: [
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
      {
        feature: 'Dedicated Support',
        values: [
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: false },
          { valueType: 'boolean', booleanValue: true },
        ],
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our memberships',
    faqItems: [
      {
        question: 'Can I switch plans later?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
      },
      {
        question: 'Is there a free trial available?',
        answer: 'Yes, we offer a 14-day free trial for the Smart Office plan. No credit card required to start your trial.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
      },
    ],
    purchaseButtonLabel: 'Purchase Now',
    recommendedLabel: 'Recommend',
    featureListTitle: 'Features',
    featureListSubtitle: 'Everything in our free plan plus',
  },
  faqPage: {
    heroTitle: "FAQ's",
    heroSubtitle: 'Find answers to the most common questions about our coworking space',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    eyebrow: "Common FAQ'S",
    title: 'Frequently Asked Questions',
    description: 'Every product we create is engineered for beauty and durability ensuring your home.',
    searchPlaceholder: 'Search FAQs',
    noResultsText: 'No questions found matching your search.',
    ctaTitle: 'Still have questions?',
    ctaDescription: "Can't find the answer you're looking for? Our support team is here to help.",
    ctaButtonLabel: 'Contact Support',
  },
  meetingRoomsPage: {
    heroTitle: 'Meeting Rooms',
    heroSubtitle: 'Professional spaces designed for productive meetings',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920',
    roomsTitle: 'Designed for real work.',
    roomsSubtitle: 'From quiet focus rooms to collaborative spaces',
    amenitiesTitle: 'Everything you need to stay in flow.',
    amenitiesSubtitle: 'Premium amenities included with every booking',
    amenities: [
      { icon: 'Wifi', title: 'Fast Wi-Fi', description: 'Gigabit internet for seamless work' },
      { icon: 'Coffee', title: 'Coffee Bar', description: 'Complimentary premium coffee & tea' },
      { icon: 'Phone', title: 'Call Pods', description: 'Private booths for calls' },
      { icon: 'Shield', title: 'Secure Access', description: '24/7 keycard entry system' },
      { icon: 'Users', title: 'Community', description: 'Networking events & workshops' },
      { icon: 'Zap', title: 'Reliable', description: 'Backup power & redundant systems' },
    ],
    plansTitle: 'Flexible plans, monochrome clarity.',
    plansSubtitle: 'Choose the access that works for you',
    readMoreLabel: 'Read more',
    bookNowLabel: 'Book now',
    getStartedLabel: 'Get Started',
    popularLabel: 'Most popular',
  },
  virtualOfficePage: {
    heroTitle: 'Office Space',
    heroSubtitle: 'Premium private offices and virtual office solutions',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    featuredImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    overviewTitle: 'Project Overview',
    overviewText:
      "Our private office spaces are designed for teams who need a dedicated, professional environment. Each office comes fully furnished with ergonomic furniture, high-speed internet, and access to all common amenities. Whether you're a growing startup or an established company looking for a satellite office, we have solutions that scale with your needs.",
    challengeTitle: 'Challenge of This Project',
    challengeIntro: 'Many businesses face challenges when it comes to workspace decisions:',
    challengeItems: [
      'High upfront costs for traditional office leases',
      "Long-term commitments that don't fit scaling needs",
      'Managing office maintenance and utilities',
      'Finding the right location for clients and team',
    ],
    resultTitle: 'Final Result',
    resultText:
      'Our flexible office solutions eliminate these pain points. You get a premium workspace without the traditional overhead, with month-to-month flexibility and all-inclusive pricing. Our spaces have helped hundreds of businesses establish a professional presence while maintaining the agility they need to grow.',
    galleryImages: [
      {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
        alt: 'Office interior',
      },
      {
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
        alt: 'Workspace',
      },
    ],
    projectInfoTitle: 'Project Info',
    projectDateLabel: 'Date',
    projectDateValue: 'January 2026',
    projectCategoryLabel: 'Categories',
    projectCategoryValue: 'Private Office, Virtual Office',
    projectWebsiteLabel: 'Website',
    projectWebsiteValue: 'coworkinghub.com',
    ctaTitle: 'Get Any Coworking Services From us Now',
    ctaDescription: 'Contact us today to find your perfect workspace solution.',
    ctaButtonLabel: 'Contact Us',
    contactForm: {
      title: 'Contact Us',
      submitLabel: 'Send Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Message',
    },
  },
  contactPage: {
    heroTitle: 'Contact',
    heroSubtitle: "Get in touch with us. We'd love to hear from you.",
    heroBackgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    introEyebrow: 'Get In Touch',
    introTitle: 'Have Any Questions?',
    addressCardTitle: 'Our Address',
    emailCardTitle: 'Email Us',
    phoneCardTitle: 'Phone Number',
    form: {
      title: 'Get A Free Consultation',
      submitLabel: 'REQUEST SUBMIT',
      namePlaceholder: 'Name*',
      phonePlaceholder: 'Phone Number',
      emailPlaceholder: 'Email*',
      messagePlaceholder: 'Messages',
    },
    mapTitle: 'Interactive Map Location',
    mapDescription: 'London Eye, Riverside Building, County Hall',
  },
};

export const defaultPrivacyPolicyContent: LegalPageContent = {
  heroTitle: 'Privacy Policy',
  heroSubtitle: 'How we collect, use, and protect your information across our website and coworking services.',
  effectiveDateLabel: 'Effective date',
  effectiveDateValue: 'February 28, 2026',
  introText:
    'This Privacy Policy explains how CoworkingHub collects, uses, stores, and shares personal information when you visit our website, contact us, or use our workspace services.',
  sections: [
    {
      title: 'Information We Collect',
      body:
        'We may collect information you provide directly, such as your name, email address, phone number, company details, billing information, and any message you send through our forms.\n\nWe may also collect technical data such as IP address, browser type, device information, pages viewed, and referral sources.',
    },
    {
      title: 'How We Use Your Information',
      body:
        'We use your information to respond to enquiries, manage bookings, provide memberships and related services, send operational updates, improve the website, and comply with legal obligations.\n\nWe do not sell your personal information.',
    },
    {
      title: 'Sharing and Service Providers',
      body:
        'We may share information with trusted service providers who help us operate the website, manage payments, host infrastructure, send communications, or support business operations.\n\nThese providers may only use your information for the services they perform on our behalf.',
    },
    {
      title: 'Data Retention and Security',
      body:
        'We retain personal information only for as long as necessary for the purposes described in this policy, including legal, accounting, or operational requirements.\n\nWe use reasonable administrative, technical, and organisational measures to protect information against unauthorised access, disclosure, or loss.',
    },
    {
      title: 'Your Rights',
      body:
        'Depending on your location, you may have rights to request access to your data, ask for corrections, request deletion, object to certain processing, or request a copy of your information.\n\nTo exercise these rights, contact us using the details on this page.',
    },
  ],
  contactTitle: 'Questions about privacy?',
  contactBody: 'If you need more information about how your data is used, contact our team and we will respond as soon as possible.',
  contactButtonLabel: 'Contact Us',
};

export const defaultTermsContent: LegalPageContent = {
  heroTitle: 'Terms & Conditions',
  heroSubtitle: 'The rules, responsibilities, and legal terms for using our website and services.',
  effectiveDateLabel: 'Effective date',
  effectiveDateValue: 'February 28, 2026',
  introText:
    'These Terms & Conditions govern your access to our website and any services, memberships, bookings, or workspace facilities provided by CoworkingHub.',
  sections: [
    {
      title: 'Use of the Website',
      body:
        'You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.\n\nWe may suspend or restrict access if we believe misuse has occurred.',
    },
    {
      title: 'Bookings and Memberships',
      body:
        'Meeting room bookings, memberships, and workspace services are subject to availability, confirmation, and any separate commercial agreement or booking terms we provide.\n\nPricing, availability, and service scope may change from time to time.',
    },
    {
      title: 'Payments and Cancellations',
      body:
        'Where payments apply, you agree to pay the applicable fees for booked services or memberships. Cancellation, refund, and renewal rules may depend on the service purchased and any agreement accepted at the time of purchase.',
    },
    {
      title: 'Intellectual Property',
      body:
        'All content on this website, including text, branding, graphics, and design elements, is owned by or licensed to CoworkingHub unless otherwise stated.\n\nYou may not reproduce or redistribute website content without prior written permission.',
    },
    {
      title: 'Liability',
      body:
        'To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential losses arising from the use of the website or services.\n\nNothing in these terms excludes liability that cannot be excluded under applicable law.',
    },
  ],
  contactTitle: 'Need clarification on the terms?',
  contactBody: 'If you have questions before booking or signing up, contact our team and we can walk you through the relevant terms.',
  contactButtonLabel: 'Contact Us',
};
