import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { CTABanner } from '@/components/shared/CTABanner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { faqItems } from '@/data/mockData';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <HeroSection
        title="FAQ's"
        subtitle="Find answers to the most common questions about our coworking space"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
        size="sm"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Use the search or contact our support team.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Right Column - Accordion */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="card-elevated overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
                    >
                      <span className="font-semibold pr-4">{faq.question}</span>
                      {openIndex === index ? (
                        <ChevronUp size={20} className="flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown size={20} className="flex-shrink-0 text-muted-foreground" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-5 pb-5">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No questions found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <Link to="/contact">
            <Button className="btn-pill-primary">Contact Support</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
