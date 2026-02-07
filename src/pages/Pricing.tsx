import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { PricingCard } from '@/components/shared/PricingCard';
import { CTABanner } from '@/components/shared/CTABanner';
import { Check, X } from 'lucide-react';
import { pricingPlans, featureComparison, faqItems } from '@/data/mockData';

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
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Compare All Features" 
            subtitle="Find the plan that's right for you"
          />
          <div className="max-w-4xl mx-auto">
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Lounge</th>
                      <th className="text-center p-4 font-semibold bg-secondary">Smart Office</th>
                      <th className="text-center p-4 font-semibold">Full Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                        <td className="p-4 text-sm">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.lounge === 'boolean' ? (
                            row.lounge ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.lounge}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-secondary/50">
                          {typeof row.smartOffice === 'boolean' ? (
                            row.smartOffice ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.smartOffice}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.fullSpace === 'boolean' ? (
                            row.fullSpace ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{row.fullSpace}</span>
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
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Frequently Asked Questions" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {faqItems.slice(0, 3).map((faq) => (
              <div key={faq.question} className="card-elevated p-6">
                <h3 className="font-serif font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Get Started?"
        subtitle="Join thousands of professionals who trust CoworkingHub"
        primaryButton={{ text: 'Start Free Trial', link: '/contact' }}
        secondaryButton={{ text: 'Contact Sales', link: '/contact' }}
      />
    </Layout>
  );
}
