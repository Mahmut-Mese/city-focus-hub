import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Check, X } from 'lucide-react';

const pricingPlans = [
  {
    id: 'lounge',
    name: 'Lounge',
    price: 29,
    description: 'Customized anything in anytime',
    features: ['Any free table', 'Free WiFi', 'Kitchen & Bar', '24/7 Room Support'],
    isPopular: false,
  },
  {
    id: 'smart-office',
    name: 'Smart Office',
    price: 39,
    description: 'Customized anything in anytime',
    features: ['Any free table', 'Free WiFi', 'Kitchen & Bar', '24/7 Room Support'],
    isPopular: true,
  },
  {
    id: 'full-space',
    name: 'Full Space',
    price: 59,
    description: 'Customized anything in anytime',
    features: ['Any free table', 'Free WiFi', 'Kitchen & Bar', '24/7 Room Support'],
    isPopular: false,
  },
];

const featureComparison = [
  { feature: 'Free Resources', lounge: true, smartOffice: true, fullSpace: true },
  { feature: 'Premium Resources', lounge: false, smartOffice: true, fullSpace: true },
  { feature: 'Webinars & Workshops', lounge: false, smartOffice: true, fullSpace: true },
  { feature: 'Download for Offline', lounge: false, smartOffice: true, fullSpace: true },
  { feature: 'Team Members', lounge: '1', smartOffice: '5', fullSpace: 'Unlimited' },
  { feature: 'API Access', lounge: false, smartOffice: false, fullSpace: true },
  { feature: 'Dedicated Support', lounge: false, smartOffice: false, fullSpace: true },
];

const pricingFaq = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for the Smart Office plan. No credit card required to start your trial.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans.',
  },
];

export default function Pricing() {
  return (
    <Layout>
      <HeroSection
        title="Pricing"
        subtitle="Flexible plans designed to fit your needs"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
        size="sm"
      />

      {/* Pricing Cards */}
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
                      Recommend
                    </span>
                  </div>
                )}

                <h3 className="font-semibold text-[34px] font-sans mb-1 leading-none">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold leading-none">${plan.price}</span>
                  <span className="text-sm text-black/45"> /month</span>
                </div>
                <p className="text-sm text-black/50 mb-4">{plan.description}</p>

                <button className="w-full h-11 rounded-xl bg-black text-white text-sm font-semibold uppercase tracking-[0.02em]">
                  Purchase Now
                </button>

                <div className="mt-6 pt-5 border-t border-black/10">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5">Features</p>
                  <p className="text-xs text-black/45 mb-4">Everything in our free plan plus</p>
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

      {/* Feature Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Compare All Features" 
            className="mb-10 md:mb-12"
          />
          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">Features</th>
                      <th className="text-center p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">Lounge</th>
                      <th className="text-center p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">Smart Office</th>
                      <th className="text-center p-5 text-[12px] tracking-[0.08em] uppercase font-semibold">Full Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((row) => (
                      <tr key={row.feature} className="border-b border-black/10 last:border-b-0">
                        <td className="p-5 text-sm">{row.feature}</td>
                        <td className="p-5 text-center">
                          {typeof row.lounge === 'boolean' ? (
                            row.lounge ? (
                              <Check className="w-4 h-4 text-black mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-black/25 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.lounge}</span>
                          )}
                        </td>
                        <td className="p-5 text-center">
                          {typeof row.smartOffice === 'boolean' ? (
                            row.smartOffice ? (
                              <Check className="w-4 h-4 text-black mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-black/25 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.smartOffice}</span>
                          )}
                        </td>
                        <td className="p-5 text-center">
                          {typeof row.fullSpace === 'boolean' ? (
                            row.fullSpace ? (
                              <Check className="w-4 h-4 text-black mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-black/25 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium">{row.fullSpace}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our memberships"
            className="mb-10 md:mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingFaq.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-black/10 bg-white p-6">
                <h3 className="font-sans font-semibold text-2xl mb-2.5 leading-tight">{faq.question}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
