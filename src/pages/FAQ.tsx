import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';

const designFaqItems = [
  {
    question: 'What membership plans do you offer?',
    answer: 'We offer Day Pass, Flex, and Dedicated options. Each plan includes high-speed Wi-Fi, access to shared spaces, and member pricing on meeting rooms. You can upgrade or switch plans anytime.',
  },
  {
    question: 'How do I book a meeting room?',
    answer: 'You can book through our front desk or member portal. Room access and rates depend on your plan.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our standard hours are Monday to Friday, 8:00 AM to 8:00 PM, with extended access for eligible plans.',
  },
  {
    question: 'Can I bring guests to the coworking space?',
    answer: 'Yes. Guest access is allowed based on availability and your membership tier.',
  },
  {
    question: 'Is parking available?',
    answer: 'Nearby public parking is available, and selected plans include discounted options.',
  },
  {
    question: 'How do I cancel my membership?',
    answer: 'Membership changes and cancellations can be requested from your account dashboard or by contacting support.',
  },
  {
    question: 'What amenities are included with membership?',
    answer: 'Amenities include high-speed internet, lounge access, community events, and access to meeting spaces.',
  },
  {
    question: 'Do you offer day passes?',
    answer: 'Yes. Day passes are available for drop-in access and can be purchased online or on-site.',
  },
  {
    question: 'How fast is the Wi-Fi?',
    answer: 'Our network is enterprise-grade and designed for video calls, uploads, and daily collaborative work.',
  },
  {
    question: 'Can I have mail delivered to the space?',
    answer: 'Mail handling is available for eligible memberships, including virtual office plans.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Refunds follow our billing terms and depend on plan type and billing cycle status.',
  },
  {
    question: 'Are private offices available?',
    answer: 'Yes. We provide private office options for teams that need dedicated, secure space.',
  },
  {
    question: 'Do you provide printing and scanning services?',
    answer: 'Yes. Shared print and scan stations are available for members during operating hours.',
  },
  {
    question: 'How do I access the building after hours?',
    answer: 'Eligible members receive secure keycard access for approved after-hours entry.',
  },
  {
    question: 'Is there a kitchen or break area available?',
    answer: 'Yes. Members can use shared kitchens, coffee points, and breakout areas.',
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = designFaqItems.filter(
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

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div>
              <span className="inline-flex items-center h-7 px-3 rounded-full border border-black/15 text-[10px] tracking-[0.1em] uppercase font-semibold mb-6">
                Common FAQ'S
              </span>
              <h2 className="font-serif text-6xl leading-none mb-5">
                Frequently Asked Questions
              </h2>
              <p className="text-black/55 text-lg mb-6">
                Every product we create is engineered for beauty and durability ensuring your home.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                <Input
                  placeholder="Search FAQs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-black/15 bg-white"
                />
              </div>
            </div>

            {/* Right Column - Accordion */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="rounded-2xl border border-black/10 bg-white overflow-hidden">
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
                    <p className="text-muted-foreground">No questions found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="rounded-3xl border border-black/10 bg-white text-center py-14 px-6">
            <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center mx-auto mb-6">
              <CircleHelp size={22} className="text-black/60" />
            </div>
            <h2 className="font-serif text-6xl leading-none mb-4">Still have questions?</h2>
            <p className="text-black/55 text-lg mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <Link to="/contact">
              <Button className="h-11 rounded-xl px-6 text-base bg-black text-white hover:bg-black/90">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
