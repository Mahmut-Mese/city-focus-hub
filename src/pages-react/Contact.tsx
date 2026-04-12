import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useContactPageContent, useSiteSettings } from '@/hooks/useCmsContent';
import { socialIconMap } from '@/lib/site-icons';
import { postApi } from '@/lib/content-api';

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const EMPTY_FORM: ContactFormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

function buildPrefilledForm(searchParams: URLSearchParams): ContactFormState {
  return {
    ...EMPTY_FORM,
    message: searchParams.get('message')?.trim() || '',
  };
}

function getEnquiryBanner(searchParams: URLSearchParams) {
  const room = searchParams.get('room')?.trim() || '';
  const plan = searchParams.get('plan')?.trim() || '';
  const intent = searchParams.get('intent')?.trim() || '';
  const target = room || plan;

  if (!target) {
    return '';
  }

  if (intent === 'purchase') {
    return `Purchase enquiry for ${target}`;
  }

  if (intent === 'booking') {
    return `Booking enquiry for ${target}`;
  }

  if (intent === 'details') {
    return `Details enquiry for ${target}`;
  }

  return `Enquiry for ${target}`;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const siteSettingsQuery = useSiteSettings();
  const contactPageQuery = useContactPageContent();
  const [formState, setFormState] = useState<ContactFormState>(() => buildPrefilledForm(searchParams));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim());
  const enquiryBanner = useMemo(() => getEnquiryBanner(searchParams), [searchParams]);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      message: buildPrefilledForm(searchParams).message,
    }));
    setSubmitError('');
    setSubmitSuccess('');
  }, [searchParams]);

  if (siteSettingsQuery.isLoading || contactPageQuery.isLoading) {
    return null;
  }

  if (siteSettingsQuery.isError || contactPageQuery.isError || !siteSettingsQuery.data || !contactPageQuery.data) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const siteSettings = siteSettingsQuery.data;
  const content = contactPageQuery.data;
  const mapQuery = encodeURIComponent(siteSettings.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLocationUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
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
        ...formState,
        sourcePage: 'contact',
      });
      setFormState(EMPTY_FORM);
      setSubmitSuccess('Your request has been submitted.');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h2 className="font-sans text-3xl leading-none mb-6 md:text-4xl">{content.introTitle}</h2>
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
                    <h3 className="font-semibold text-xl leading-none mb-2">{content.addressCardTitle}</h3>
                    <p className="text-black/60 text-base whitespace-pre-line">{siteSettings.address}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Mail size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl leading-none mb-2">{content.emailCardTitle}</h3>
                    <p className="text-black/60 text-base">{siteSettings.contactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f1f1] flex items-center justify-center">
                    <Phone size={20} className="text-black/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl leading-none mb-2">{content.phoneCardTitle}</h3>
                    <p className="text-black/60 text-base">{siteSettings.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <h3 className="font-sans text-3xl leading-none mb-6">{content.form.title}</h3>
              {enquiryBanner ? (
                <div className="mb-5 rounded-2xl border border-black/10 bg-[#f7f3ee] px-4 py-3 text-sm font-medium text-black/75">
                  {enquiryBanner}
                </div>
              ) : null}
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    value={formState.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    placeholder={content.form.namePlaceholder}
                    aria-label="Full name"
                    className="h-12 border-black/15 text-base"
                    autoComplete="name"
                  />
                  <Input
                    type="tel"
                    value={formState.phone}
                    onChange={(event) => handleFieldChange('phone', event.target.value)}
                    placeholder={content.form.phonePlaceholder}
                    aria-label="Phone number"
                    className="h-12 border-black/15 text-base"
                    autoComplete="tel"
                  />
                </div>
                <Input
                  type="email"
                  value={formState.email}
                  onChange={(event) => handleFieldChange('email', event.target.value)}
                  placeholder={content.form.emailPlaceholder}
                  aria-label="Email address"
                  className="h-12 border-black/15 text-base"
                  autoComplete="email"
                />
                <Textarea
                  value={formState.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  placeholder={content.form.messagePlaceholder}
                  aria-label="Message"
                  className="min-h-[170px] border-black/15 text-base"
                />
                {submitError ? (
                  <p className="text-sm font-medium text-red-600">{submitError}</p>
                ) : null}
                {submitSuccess ? (
                  <p className="text-sm font-medium text-green-700">{submitSuccess}</p>
                ) : null}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-xl px-6 text-lg w-full bg-black text-white hover:bg-black/90"
                >
                  {isSubmitting ? 'Submitting...' : content.form.submitLabel}
                </Button>
              </form>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              <div className="relative min-h-[420px]">
                <iframe
                  title={content.mapTitle}
                  src={mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/50 bg-white/92 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-2xl leading-none mb-2">{content.mapTitle}</h3>
                      <p className="text-black/55">{content.mapDescription || siteSettings.address}</p>
                    </div>
                  </div>
                  <a
                    href={mapLocationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-10 items-center rounded-xl bg-black px-4 text-sm font-medium text-white hover:bg-black/90"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
