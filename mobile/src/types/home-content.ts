export type NativeLinkItem = {
  label: string;
  path: string;
};

export type NativeIconTextItem = {
  icon: string;
  text: string;
};

export type NativeHeroContent = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCtaLabel: string;
  primaryCtaPath: string;
  secondaryCtaLabel: string;
  videoUrl: string;
};

export type NativeServiceItem = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type NativeAboutHighlight = {
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

export type NativeFeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type NativeTestimonialItem = {
  name: string;
  role: string;
  content: string;
  stars: number;
};

export type NativeGalleryImageItem = {
  image: string;
  alt: string;
};

export type NativeContactFormContent = {
  title: string;
  description: string;
  submitLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
};

export type NativeVisitContent = {
  title: string;
  addressLabel: string;
  emailLabel: string;
  phoneLabel: string;
  openHoursLabel: string;
  weekdayHours: string;
  weekendHours: string;
  mapButtonLabel: string;
  mapUrl: string;
};

export type NativeNavigationContent = {
  logoUrl: string;
  ctaLabel: string;
  ctaPath: string;
  links: NativeLinkItem[];
};

export type NativeFooterContent = {
  logoUrl: string;
  description: string;
  serviceLinks: NativeLinkItem[];
  aboutLinks: NativeLinkItem[];
  contactTitle: string;
  copyright: string;
  legalLinks: NativeLinkItem[];
  socialLinks: NativeLinkItem[];
};

export type NativeSiteSettings = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: NativeNavigationContent;
  footer: NativeFooterContent;
};

export type NativeHomeContent = {
  hero: NativeHeroContent;
  featureChips: NativeIconTextItem[];
  servicesEyebrow: string;
  servicesKicker: string;
  services: NativeServiceItem[];
  aboutHighlight: NativeAboutHighlight;
  whyChooseEyebrow: string;
  whyChooseKicker: string;
  whyChooseTitle: string;
  whyChooseItems: NativeFeatureItem[];
  testimonialsEyebrow: string;
  testimonialsKicker: string;
  testimonialsTitle: string;
  testimonials: NativeTestimonialItem[];
  galleryEyebrow: string;
  galleryKicker: string;
  galleryTitle: string;
  galleryImages: NativeGalleryImageItem[];
  contactForm: NativeContactFormContent;
  visit: NativeVisitContent;
};