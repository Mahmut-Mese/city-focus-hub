import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Wifi } from 'lucide-react';
import { useAboutPageContent, useSiteSettings } from '@/hooks/useCmsContent';
import { contentIconMap } from '@/lib/site-icons';

export default function About() {
  const siteSettingsQuery = useSiteSettings();
  const aboutPageQuery = useAboutPageContent();

  if (siteSettingsQuery.isLoading || aboutPageQuery.isLoading) {
    return null;
  }

  if (siteSettingsQuery.isError || aboutPageQuery.isError || !siteSettingsQuery.data || !aboutPageQuery.data) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const siteSettings = siteSettingsQuery.data;
  const content = aboutPageQuery.data;

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || siteSettings.tagline,
        image: content.storyImage || content.heroBackgroundImage,
      }}
    >
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
        size="sm"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6">{content.storyTitle}</h2>
              {content.storyParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={content.storyImage} alt={content.storyTitle} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-custom">
          <SectionTitle
            title={content.whyChooseTitle}
            className="mb-10 md:mb-12"
            titleClassName="text-3xl md:text-4xl lg:text-5xl"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {content.whyChooseItems.map((item) => {
              const Icon = contentIconMap[item.icon] || Wifi;
              return (
                <FeatureCard
                  key={item.title}
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  align="left"
                  className="rounded-3xl border border-border/80 bg-card p-8 shadow-none"
                  iconContainerClassName="rounded-2xl w-14 h-14 bg-primary shadow-none mb-7"
                  iconClassName="w-6 h-6 text-primary-foreground"
                  titleClassName="text-3xl md:text-[2.2rem] leading-tight mb-4"
                  descriptionClassName="max-w-none text-[1.05rem] md:text-[1.15rem] leading-relaxed"
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden lg:order-1">
              <img src={content.amenitiesImage} alt={content.amenitiesTitle} className="w-full h-full object-cover" />
            </div>
            <div className="lg:order-2">
              <h2 className="font-sans text-3xl md:text-4xl font-bold mb-8">{content.amenitiesTitle}</h2>
              <div className="space-y-6">
                {content.amenities.map((amenity) => {
                  const Icon = contentIconMap[amenity.icon] || Wifi;
                  return (
                    <div key={amenity.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{amenity.title}</h3>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
