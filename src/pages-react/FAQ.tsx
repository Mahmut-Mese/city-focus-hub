import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Search, ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';
import { useFaqItems, useFaqPageContent } from '@/hooks/useCmsContent';

export default function FAQ() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItemsQuery = useFaqItems();
  const faqPageQuery = useFaqPageContent();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  if (faqItemsQuery.isLoading || faqPageQuery.isLoading) {
    return null;
  }

  if (
    faqItemsQuery.isError
    || faqPageQuery.isError
    || !faqItemsQuery.data
    || !faqPageQuery.data
    || faqItemsQuery.data.length === 0
  ) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const cmsFaqItems = faqItemsQuery.data;
  const content = faqPageQuery.data;

  const faqItems = cmsFaqItems.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const filteredFaqs = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || content.description,
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <span className="inline-flex items-center h-7 px-3 rounded-full border border-black/15 text-[10px] tracking-[0.1em] uppercase font-semibold mb-6">
                {content.eyebrow}
              </span>
              <h2 className="font-sans text-3xl leading-none mb-5 md:text-4xl">{content.title}</h2>
              <p className="text-black/55 text-lg mb-6">{content.description}</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                <Input
                  placeholder={content.searchPlaceholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="pl-10 h-12 border-black/15 bg-white"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.question} className="rounded-2xl border border-black/10 bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-semibold pr-4 text-[1.05rem]">{faq.question}</span>
                      {openIndex === index ? (
                        <ChevronUp size={18} className="flex-shrink-0 text-black/45" />
                      ) : (
                        <ChevronDown size={18} className="flex-shrink-0 text-black/45" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-black/55 text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{content.noResultsText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="rounded-3xl border border-black/10 bg-white text-center py-14 px-6">
            <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center mx-auto mb-6">
              <CircleHelp size={22} className="text-black/60" />
            </div>
            <h2 className="font-sans text-3xl leading-none mb-4 md:text-4xl">{content.ctaTitle}</h2>
            <p className="text-black/55 text-lg mb-8 max-w-xl mx-auto">{content.ctaDescription}</p>
            <Link to="/contact">
              <Button className="h-11 rounded-xl px-6 text-base bg-black text-white hover:bg-black/90">
                {content.ctaButtonLabel}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
