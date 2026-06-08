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
      videoUrl: string;
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

export {
  defaultPrivacyPolicyContent,
  defaultSiteSettingsContent,
  defaultTermsContent,
} from './siteContent.js';
