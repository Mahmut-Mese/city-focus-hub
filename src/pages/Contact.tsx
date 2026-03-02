import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useContactPageContent, useSiteSettings } from '@/hooks/useCmsContent';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import { socialIconMap } from '@/lib/site-icons';

export default function Contact() {
  const { data: siteSettings = defaultSiteSettingsContent } = useSiteSettings();
  const { data: content = defaultSiteSettingsContent.contactPage } = useContactPageContent();

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || `${content.introTitle} ${siteSettings.address}`,
        image: content.heroBackgroundImage,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="inline-flex items-center h-8 px-4 rounded-full border border-black/15 text-[12px] font-semibold tracking-[0.08em] uppercase mb-6">
                {content.introEyebrow}
              </span>
              <h2 className="font-sans text-6xl leading-none mb-6">{content.introTitle}</h2>
              <div className="flex gap-4">
                {siteSettings.socialLinks.map(({ icon, href, label }) => {
                  const Icon = socialIconMap[icon];
                  if (!Icon) {
                    return null;
                  }

                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-12 h-12 rounded-full border border-black/20 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <MapPin size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">{content.addressCardTitle}</h3>
                    <p className="text-black/60 text-lg whitespace-pre-line">{siteSettings.address}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Mail size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">{content.emailCardTitle}</h3>
                    <p className="text-black/60 text-lg">{siteSettings.contactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Phone size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl leading-none mb-2">{content.phoneCardTitle}</h3>
                    <p className="text-black/60 text-lg">{siteSettings.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <h3 className="font-sans text-5xl leading-none mb-6">{content.form.title}</h3>
              <form className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input placeholder={content.form.namePlaceholder} className="h-12 border-black/15 text-base" />
                  <Input type="tel" placeholder={content.form.phonePlaceholder} className="h-12 border-black/15 text-base" />
                </div>
                <Input type="email" placeholder={content.form.emailPlaceholder} className="h-12 border-black/15 text-base" />
                <Textarea placeholder={content.form.messagePlaceholder} className="min-h-[170px] border-black/15 text-base" />
                <Button className="h-12 rounded-xl px-6 text-lg w-full bg-black text-white hover:bg-black/90">
                  {content.form.submitLabel}
                </Button>
              </form>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              <div className="w-full h-full min-h-[420px] bg-[#f4f4f4] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={46} className="mx-auto mb-4 text-black/45" />
                  <h3 className="font-semibold text-3xl mb-2">{content.mapTitle}</h3>
                  <p className="text-black/45 text-lg">{content.mapDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
