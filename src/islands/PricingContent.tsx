import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Check, X } from 'lucide-react';
import { useDbPlans, usePricingPageContent } from '@/hooks/useCmsContent';

function buildCheckoutPath(planSlug: string) {
  return `/pricing/${encodeURIComponent(planSlug)}/checkout`;
}

export default function PricingContent() {
  const plansQuery = useDbPlans();
  const pricingPageQuery = usePricingPageContent();

  if (plansQuery.isLoading || pricingPageQuery.isLoading) {
    return null;
  }

  if (
    plansQuery.isError
    || pricingPageQuery.isError
    || !pricingPageQuery.data
    || !plansQuery.data
    || plansQuery.data.length === 0
  ) {
    return <CmsNoData />;
  }

  const dbPlans = plansQuery.data;
  const content = pricingPageQuery.data;

  const pricingPlans = dbPlans.map((plan) => ({
    id: plan.slug,
    name: plan.name,
    price: plan.monthlyPriceMinor / 100,
    description: plan.description || '',
    features: plan.features,
    isPopular: plan.isPopular,
    period: 'month',
  }));

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`relative rounded-2xl border bg-white p-6 md:p-7 ${
                  plan.isPopular ? 'border-black shadow-[0_0_0_1px_#000]' : 'border-black/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden rounded-tr-2xl">
                    <span className="absolute -right-7 top-4 rotate-45 bg-black px-7 py-1 text-[9px] font-semibold tracking-[0.14em] text-white uppercase">
                      {content.recommendedLabel}
                    </span>
                  </div>
                )}

                <h3 className="font-semibold text-[34px] font-sans mb-1 leading-none">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-sm text-black/45"> /{plan.period}</span>
                </div>
                <p className="text-sm text-black/50 mb-4">{plan.description}</p>

                <a
                  href={buildCheckoutPath(plan.id)}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold uppercase tracking-[0.02em] text-white"
                >
                  {content.purchaseButtonLabel}
                </a>

                <div className="mt-6 pt-5 border-t border-black/10">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5">{content.featureListTitle}</p>
                  <p className="text-xs text-black/45 mb-4">{content.featureListSubtitle}</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-black/80" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle title={content.comparisonTitle} className="mb-10 md:mb-12" />
          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">Features</th>
                      {content.comparisonColumns.map((column) => (
                        <th key={column} className="text-center p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-black/10 last:border-b-0">
                        <td className="p-5 text-sm">{row.feature}</td>
                        {row.values.map((value, index) => (
                          <td key={`${row.feature}-${index}`} className="p-5 text-center">
                            {value.valueType === 'boolean' && value.booleanValue ? (
                              <Check className="w-4 h-4 text-black mx-auto" />
                            ) : value.valueType === 'boolean' ? (
                              <X className="w-4 h-4 text-black/25 mx-auto" />
                            ) : (
                              <span className="text-sm">{value.textValue}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <SectionTitle
            title={content.faqTitle}
            subtitle={content.faqSubtitle}
            className="mb-10 md:mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-black/10 bg-white p-6">
                <h3 className="font-sans font-semibold text-2xl mb-2.5 leading-tight">{faq.question}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
