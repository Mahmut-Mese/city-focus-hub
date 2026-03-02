import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Globe, Phone, Check } from 'lucide-react';
import { useSiteSettings, useVirtualOfficePageContent } from '@/hooks/useCmsContent';
import { defaultSiteSettingsContent } from '@/data/siteContent';

export default function VirtualOffice() {
  const { data: siteSettings = defaultSiteSettingsContent } = useSiteSettings();
  const { data: content = defaultSiteSettingsContent.virtualOfficePage } = useVirtualOfficePageContent();

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || content.overviewText || siteSettings.tagline,
        image: content.featuredImage || content.heroBackgroundImage,
      }}
    >
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
        size="sm"
      />

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img src={content.featuredImage} alt={content.heroTitle} className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">{content.overviewTitle}</h2>
                <p className="text-black/60 leading-relaxed text-lg">{content.overviewText}</p>
              </div>

              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">{content.challengeTitle}</h2>
                <p className="text-black/60 mb-4 text-lg">{content.challengeIntro}</p>
                <ul className="space-y-2">
                  {content.challengeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-black/65 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-sans text-5xl leading-none mb-4">{content.resultTitle}</h2>
                <p className="text-black/60 leading-relaxed text-lg">{content.resultText}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {content.galleryImages.map((item) => (
                  <div key={item.image} className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-sans text-4xl leading-none mb-5">{content.projectInfoTitle}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">{content.projectDateLabel}</p>
                      <p className="font-medium text-lg">{content.projectDateValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">{content.projectCategoryLabel}</p>
                      <p className="font-medium text-lg">{content.projectCategoryValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-black/45" />
                    <div>
                      <p className="text-sm text-black/45">{content.projectWebsiteLabel}</p>
                      <p className="font-medium text-lg">{content.projectWebsiteValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1015] text-white p-6 rounded-2xl">
                <h3 className="font-sans text-4xl leading-tight mb-2">{content.ctaTitle}</h3>
                <p className="text-white/75 text-base mb-4">{content.ctaDescription}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Call us</p>
                    <p className="font-semibold text-xl">{siteSettings.contactPhone}</p>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="h-10 rounded-lg px-5 text-sm w-full bg-white text-black hover:bg-white/90">{content.ctaButtonLabel}</Button>
                </Link>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-sans text-4xl leading-none mb-4">{content.contactForm.title}</h3>
                <form className="space-y-4">
                  <Input placeholder={content.contactForm.namePlaceholder} className="h-11 border-black/15" />
                  <Input type="email" placeholder={content.contactForm.emailPlaceholder} className="h-11 border-black/15" />
                  <Textarea placeholder={content.contactForm.messagePlaceholder} className="min-h-[100px] border-black/15" />
                  <Button className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90">{content.contactForm.submitLabel}</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
