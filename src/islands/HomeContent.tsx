import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Play,
  Phone,
  Star,
} from 'lucide-react';
import { useHomepageContent, useSiteSettings } from '@/hooks/useCmsContent';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { contentIconMap } from '@/lib/site-icons';
import { postApi } from '@/lib/content-api';

type HomeContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_HOME_CONTACT_FORM: HomeContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function extractIframeSrc(value: string) {
  const match = value.match(/src=["']([^"']+)["']/i);
  return match?.[1] || '';
}

function normalizeVideoSource(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('<iframe')) {
    return extractIframeSrc(trimmed);
  }

  return trimmed;
}

function toEmbedUrl(value: string) {
  const normalized = normalizeVideoSource(value);

  if (!normalized) {
    return '';
  }

  try {
    const url = new URL(normalized);

    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') {
        const videoId = url.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : normalized;
      }

      if (url.pathname.startsWith('/embed/')) {
        return normalized;
      }
    }

    if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.replace(/^\/+/, '');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : normalized;
    }

    if (url.hostname.includes('vimeo.com') && !url.hostname.includes('player.vimeo.com')) {
      const videoId = url.pathname.replace(/^\/+/, '');
      return videoId ? `https://player.vimeo.com/video/${videoId}` : normalized;
    }

    return normalized;
  } catch {
    return normalized;
  }
}

function isDirectVideoFile(value: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value);
}

function buildHomeContactMessage(message: string, subject: string) {
  const normalizedMessage = String(message ?? '').trim();
  const normalizedSubject = String(subject ?? '').trim();

  if (!normalizedSubject) {
    return normalizedMessage;
  }

  return `Subject: ${normalizedSubject}\n\n${normalizedMessage}`;
}

export default function HomeContent() {
  const siteSettingsQuery = useSiteSettings();
  const homepageQuery = useHomepageContent();
  const [formState, setFormState] = useState<HomeContactFormState>(EMPTY_HOME_CONTACT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim());

  if (siteSettingsQuery.isLoading || homepageQuery.isLoading) {
    return null;
  }

  if (siteSettingsQuery.isError || homepageQuery.isError || !siteSettingsQuery.data || !homepageQuery.data) {
    return <CmsNoData />;
  }

  const siteSettings = siteSettingsQuery.data;
  const content = homepageQuery.data;
  const heroVideoUrl = toEmbedUrl(content.hero.videoUrl);
  const hasHeroVideo = heroVideoUrl.length > 0;

  const handleFieldChange = (field: keyof HomeContactFormState, value: string) => {
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
        message: buildHomeContactMessage(formState.message, formState.subject),
        sourcePage: 'home',
      });

      setFormState(EMPTY_HOME_CONTACT_FORM);
      setSubmitSuccess('Your request has been submitted.');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="relative min-h-[82vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-sans font-semibold text-white mb-5 leading-[0.96]">
              {content.hero.title}
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl mb-7 leading-relaxed">{content.hero.subtitle}</p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a href={content.hero.primaryCtaPath}>
                <Button className="h-9 rounded-full px-5 text-xs bg-white text-black hover:bg-white/90">
                  {content.hero.primaryCtaLabel}
                </Button>
              </a>
              <Button
                type="button"
                variant="outline"
                disabled={!hasHeroVideo}
                onClick={() => {
                  if (hasHeroVideo) {
                    setIsVideoOpen(true);
                  }
                }}
                className="h-9 rounded-full px-5 text-xs bg-transparent border-white text-white hover:bg-white/10 disabled:border-white/30 disabled:text-white/50"
              >
                <Play size={14} className="mr-2" />
                {content.hero.secondaryCtaLabel}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {content.featureChips.map((chip) => {
                const Icon = contentIconMap[chip.icon] || Clock;
                return (
                  <div key={chip.text} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5">
                    <Icon size={12} className="text-white" />
                    <span className="text-[11px] text-white/90">{chip.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-8"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close video"
            >
              x
            </button>
            <div className="aspect-video w-full bg-black">
              {isDirectVideoFile(heroVideoUrl) ? (
                <video
                  className="h-full w-full"
                  src={heroVideoUrl}
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  title={content.hero.secondaryCtaLabel}
                  src={heroVideoUrl}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <section className="py-14 md:py-16 border-t border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-7">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">
                {content.servicesEyebrow}
              </span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">{content.servicesKicker}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.services.map((service) => (
                <a key={service.title} href={service.link} className="group">
                  <article className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-sans text-2xl leading-tight mb-1.5">{service.title}</h3>
                      <p className="text-sm text-black/60 leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center justify-between text-xs text-black/60">
                        <span>More View • Details</span>
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/20">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-y border-black/10 bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">
                {content.aboutHighlight.eyebrow}
              </span>
              <h2 className="font-sans text-4xl md:text-5xl leading-[1.02] mt-3 mb-5 max-w-xl">{content.aboutHighlight.title}</h2>
              <p className="text-sm text-black/60 leading-relaxed mb-6 max-w-lg">{content.aboutHighlight.description}</p>
              <ul className="space-y-2.5 mb-7 text-sm text-black/80">
                {content.aboutHighlight.benefits.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex w-4 h-4 rounded-full bg-black items-center justify-center">
                      <Check size={11} className="text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={content.aboutHighlight.primaryCtaPath}>
                  <Button className="h-8 rounded-full px-4 text-[11px] bg-black text-white hover:bg-black/90">
                    {content.aboutHighlight.primaryCtaLabel}
                  </Button>
                </a>
                <a href={content.aboutHighlight.secondaryCtaPath}>
                  <Button variant="outline" className="h-8 rounded-full px-4 text-[11px] border-black/20 text-black hover:bg-black/5">
                    {content.aboutHighlight.secondaryCtaLabel}
                  </Button>
                </a>
              </div>
            </div>
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <img src={content.aboutHighlight.image} alt={content.aboutHighlight.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-b border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">
                {content.whyChooseEyebrow}
              </span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">{content.whyChooseKicker}</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">{content.whyChooseTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.whyChooseItems.map((item) => {
                const Icon = contentIconMap[item.icon] || Clock;
                return (
                  <article key={item.title} className="rounded-xl border border-black/10 bg-white p-4 md:p-5">
                    <div className="inline-flex w-9 h-9 rounded-xl bg-black items-center justify-center mb-3">
                      <Icon size={16} className="text-white" />
                    </div>
                    <h3 className="font-sans text-xl mb-1.5">{item.title}</h3>
                    <p className="text-sm text-black/60 leading-relaxed">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="our-space" className="scroll-mt-20 py-14 md:py-16 border-b border-black/10 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">
                {content.testimonialsEyebrow}
              </span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">{content.testimonialsKicker}</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">{content.testimonialsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-xl border border-black/10 bg-white p-4 md:p-5">
                  <div className="flex gap-1 mb-3 text-black">
                    {Array.from({ length: testimonial.stars }).map((_, index) => (
                      <Star key={index} size={13} className="fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-sm text-black/80 leading-relaxed mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-[11px] text-black/55">{testimonial.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 border-b border-black/10 bg-[#efefef]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-black/20 text-[9px] tracking-[0.18em] uppercase text-black/60">
                {content.galleryEyebrow}
              </span>
              <span className="text-[11px] text-black/45 uppercase tracking-[0.08em]">{content.galleryKicker}</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-center mb-8">{content.galleryTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:h-[360px]">
              <div className="rounded-xl overflow-hidden h-[260px] md:h-full md:row-span-2">
                <img src={content.galleryImages[0]?.image} alt={content.galleryImages[0]?.alt} className="w-full h-full object-cover" />
              </div>
              {content.galleryImages.slice(1, 3).map((image) => (
                <div key={image.image} className="rounded-xl overflow-hidden h-[170px] md:h-full">
                  <img src={image.image} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-white">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="rounded-xl border border-black/10 bg-white p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sans text-3xl">{content.contactForm.title}</h3>
                <span className="text-[10px] tracking-[0.15em] uppercase text-black/45">Contact</span>
              </div>
              <p className="text-sm text-black/60 mb-5">{content.contactForm.description}</p>
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={formState.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    placeholder={content.contactForm.namePlaceholder}
                    aria-label="Full name"
                    className="h-10 rounded-md border-black/15 text-sm"
                    autoComplete="name"
                  />
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    placeholder={content.contactForm.emailPlaceholder}
                    aria-label="Email address"
                    className="h-10 rounded-md border-black/15 text-sm"
                    autoComplete="email"
                  />
                </div>
                <Input
                  value={formState.subject}
                  onChange={(event) => handleFieldChange('subject', event.target.value)}
                  placeholder={content.contactForm.subjectPlaceholder}
                  aria-label="Subject"
                  className="h-10 rounded-md border-black/15 text-sm"
                />
                <Textarea
                  value={formState.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  placeholder={content.contactForm.messagePlaceholder}
                  aria-label="Message"
                  className="min-h-[108px] rounded-md border-black/15 text-sm"
                />
                {submitError ? <p className="text-sm font-medium text-red-600">{submitError}</p> : null}
                {submitSuccess ? <p className="text-sm font-medium text-green-700">{submitSuccess}</p> : null}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 rounded-full px-6 text-xs bg-black text-white hover:bg-black/90"
                >
                  {isSubmitting ? 'Submitting...' : content.contactForm.submitLabel}
                </Button>
              </form>
            </div>

            <div className="rounded-xl bg-[#111218] text-white p-6 md:p-7">
              <h3 className="font-sans text-3xl mb-5">{content.visitUsTitle}</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{content.addressLabel}</p>
                    <p className="text-white/70">{siteSettings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{content.emailLabel}</p>
                    <p className="text-white/70">{siteSettings.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{content.phoneLabel}</p>
                    <p className="text-white/70">{siteSettings.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                  <Clock size={16} className="text-white/80 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{content.openHoursLabel}</p>
                    <p className="text-white/70">{content.weekdayHours}</p>
                    <p className="text-white/70">{content.weekendHours}</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-6 h-8 rounded-full px-4 text-[11px] border-white/20 text-white bg-transparent hover:bg-white/10"
                asChild
              >
                <a href={content.mapUrl} target="_blank" rel="noopener noreferrer">
                  {content.mapButtonLabel}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
