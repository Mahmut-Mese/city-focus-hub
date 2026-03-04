import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSiteSettings } from '@/hooks/useCmsContent';
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
  const { data: siteSettings } = useSiteSettings();

  useSeo({
    siteName: siteSettings?.siteName || 'CMS',
    title: seo?.title,
    description: seo?.description || siteSettings?.tagline,
    image: seo?.image || siteSettings?.navigation.logoUrl,
    type: seo?.type,
    noindex: seo?.noindex,
  });

  return (
    <div className="min-h-screen flex flex-col">
      {siteSettings ? <Navbar /> : null}
      <main className="flex-1">{children}</main>
      {siteSettings ? <Footer /> : null}
    </div>
  );
}
