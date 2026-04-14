import { FormEvent, useState } from 'react';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Calendar, Tag, Globe, Phone, Check, ArrowRight } from 'lucide-react';
import { useSiteSettings, useVirtualOfficePageContent } from '@/hooks/useCmsContent';
import { postApi } from '@/lib/content-api';

type VirtualOfficeContactFormState = {
  name: string;
  email: string;
  message: string;
};

const EMPTY_VIRTUAL_OFFICE_FORM: VirtualOfficeContactFormState = {
  name: '',
  email: '',
  message: '',
};

export default function VirtualOfficeContent() {
  const siteSettingsQuery = useSiteSettings();
  const virtualOfficeQuery = useVirtualOfficePageContent();
  const [formState, setFormState] = useState<VirtualOfficeContactFormState>(EMPTY_VIRTUAL_OFFICE_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim());

  if (siteSettingsQuery.isLoading || virtualOfficeQuery.isLoading) {
    return null;
  }

  if (siteSettingsQuery.isError || virtualOfficeQuery.isError || !siteSettingsQuery.data || !virtualOfficeQuery.data) {
    return <CmsNoData />;
  }

  const siteSettings = siteSettingsQuery.data;
  const content = virtualOfficeQuery.data;

  const handleFieldChange = (field: keyof VirtualOfficeContactFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!formState.name.trim()) {
      setSubmitError('Name is required.');
      return;
    }

    if (!formState.email.trim()) {
      setSubmitError('Email is required.');
      return;
    }

    if (!emailLooksValid) {
      setSubmitError('Enter a valid email address.');
      return;
    }

    if (!formState.message.trim()) {
      setSubmitError('Message is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      await postApi('/contact-submissions', {
        name: formState.name,
        phone: '',
        email: formState.email,
        message: formState.message,
        sourcePage: 'virtual-office',
      });

      setFormState(EMPTY_VIRTUAL_OFFICE_FORM);
      setSubmitSuccess('Your request has been submitted.');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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

              <div className="rounded-2xl border-2 border-black bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Private Office</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold leading-none">£150</span>
                  <span className="text-sm text-black/45">/month</span>
                </div>
                <p className="mt-3 text-sm text-black/55">Premium private office with all amenities included.</p>
                <ul className="mt-4 space-y-2.5">
                  {['Prestigious business address', 'Mail forwarding', 'Member community access', 'Discounted day passes', 'Dedicated private space'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-black/80" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/pricing/checkout?plan=virtual-office" className="mt-5 block">
                  <Button className="h-11 w-full rounded-xl bg-black text-sm font-semibold uppercase tracking-[0.02em] text-white hover:bg-black/90">
                    Get Started <ArrowRight size={16} className="ml-1.5" />
                  </Button>
                </a>
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
                <a href="/contact">
                  <Button className="h-10 rounded-lg px-5 text-sm w-full bg-white text-black hover:bg-white/90">{content.ctaButtonLabel}</Button>
                </a>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="font-sans text-4xl leading-none mb-4">{content.contactForm.title}</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    value={formState.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    placeholder={content.contactForm.namePlaceholder}
                    aria-label="Full name"
                    className="h-11 border-black/15"
                    autoComplete="name"
                  />
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    placeholder={content.contactForm.emailPlaceholder}
                    aria-label="Email address"
                    className="h-11 border-black/15"
                    autoComplete="email"
                  />
                  <Textarea
                    value={formState.message}
                    onChange={(event) => handleFieldChange('message', event.target.value)}
                    placeholder={content.contactForm.messagePlaceholder}
                    aria-label="Message"
                    className="min-h-[100px] border-black/15"
                  />
                  {submitError ? <p className="text-sm font-medium text-red-600">{submitError}</p> : null}
                  {submitSuccess ? <p className="text-sm font-medium text-green-700">{submitSuccess}</p> : null}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90"
                  >
                    {isSubmitting ? 'Submitting...' : content.contactForm.submitLabel}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
