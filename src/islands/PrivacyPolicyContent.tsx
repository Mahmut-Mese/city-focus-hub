import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { usePrivacyPolicyPageContent, useSiteSettings } from '@/hooks/useCmsContent';

export default function PrivacyPolicyContent() {
  const { data: content, isLoading, isError } = usePrivacyPolicyPageContent();
  const { data: siteSettings } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !content) return <CmsNoData />;

  return (
    <>
      <section className="bg-[#15161b] text-white py-18 md:py-24 border-b border-white/10">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center h-7 px-3 rounded-full border border-white/15 text-[10px] tracking-[0.16em] uppercase text-white/70 mb-5">
              Legal
            </span>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl leading-[0.98] mb-4">
              {content.heroTitle}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-2xl">
              {content.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#efefef] py-14 md:py-18">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10 items-start">
            <div className="space-y-6">
              <article className="rounded-3xl border border-black/10 bg-white p-7 md:p-9">
                <p className="text-lg leading-relaxed text-black/65">{content.introText}</p>
              </article>

              {content.sections.map((section, index) => (
                <article key={`${section.title}-${index}`} className="rounded-3xl border border-black/10 bg-white p-7 md:p-9">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex w-8 h-8 rounded-full bg-black text-white items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <h2 className="font-sans text-3xl md:text-4xl leading-none">{section.title}</h2>
                  </div>
                  <div className="prose prose-neutral max-w-none text-black/70 prose-headings:font-sans prose-headings:text-black prose-p:text-black/70 prose-li:text-black/70 prose-strong:text-black prose-a:text-black">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-3xl border border-black/10 bg-white p-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/45 mb-2">
                  {content.effectiveDateLabel}
                </p>
                <p className="font-sans text-3xl leading-none">{content.effectiveDateValue}</p>
              </div>

              <div className="rounded-3xl bg-[#15161b] text-white p-6">
                <h3 className="font-sans text-3xl leading-none mb-3">{content.contactTitle}</h3>
                <p className="text-white/70 leading-relaxed mb-5">{content.contactBody}</p>
                <div className="border-t border-white/10 pt-4 mb-5 space-y-2 text-sm text-white/80">
                  <p>{siteSettings?.contactEmail}</p>
                  <p>{siteSettings?.contactPhone}</p>
                </div>
                <a href="/contact">
                  <Button className="h-10 rounded-xl px-5 text-sm w-full bg-white text-black hover:bg-white/90">
                    {content.contactButtonLabel}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
