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
  hideNavigation?: boolean;
  hideFooter?: boolean;
}

export function Layout({ children, seo, hideNavigation = false, hideFooter = false }: LayoutProps) {
  const { data: siteSettings, isLoading } = useSiteSettings();

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
      {/* #128: Render a placeholder bar during loading to prevent layout shift (CLS). */}
      {!hideNavigation ? (
        siteSettings ? <Navbar /> : isLoading ? <div className="h-16 w-full bg-white/80" aria-hidden="true" /> : null
      ) : null}
      <main className="flex-1">{children}</main>
      {!hideFooter ? (
        siteSettings ? <Footer /> : isLoading ? <div className="h-32 w-full bg-[#10153f]/5" aria-hidden="true" /> : null
      ) : null}
    </div>
  );
}
