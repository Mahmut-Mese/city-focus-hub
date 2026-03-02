import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSiteSettings } from '@/hooks/useCmsContent';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import { useSeo } from '@/lib/seo';

interface LayoutProps {
  children: ReactNode;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
    noindex?: boolean;
  };
}

export function Layout({ children, seo }: LayoutProps) {
  const { data: siteSettings = defaultSiteSettingsContent } = useSiteSettings();

  useSeo({
    siteName: siteSettings.siteName,
    title: seo?.title,
    description: seo?.description || siteSettings.tagline,
    image: seo?.image || siteSettings.navigation.logoUrl,
    type: seo?.type,
    noindex: seo?.noindex,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
