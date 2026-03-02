export type PlanType = 'coworking' | 'meeting-room';

export interface CmsBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  contentImages: string[];
  proTipTitle?: string;
  proTipText?: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export interface CmsFaqItem {
  id: string;
  question: string;
  answer: string;
  isFeatured: boolean;
  sortOrder: number;
}

export interface CmsPricingPlan {
  id: string;
  name: string;
  slug: string;
  planType: PlanType;
  price: number;
  period: string;
  description?: string;
  features: string[];
  isPopular: boolean;
  sortOrder: number;
}

export interface CmsMeetingRoom {
  id: string;
  name: string;
  slug: string;
  description?: string;
  capacity?: number;
  image: string;
  features: string[];
  badges: string[];
  isFeatured: boolean;
  sortOrder: number;
}
