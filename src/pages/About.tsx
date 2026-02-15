import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { MapPin, CalendarDays, HeadphonesIcon, Wifi, Users, Coffee, Printer, Check } from 'lucide-react';
import { aboutAmenities } from '@/data/mockData';

const whyChooseItems = [
  {
    icon: MapPin,
    title: 'Prime Location',
    description: "Situated in Central London (EC3V), offering unparalleled access to the City's business district and transport links.",
  },
  {
    icon: CalendarDays,
    title: 'Flexible Terms',
    description: 'No long-term commitments required. Choose from daily, weekly, or monthly memberships that adapt to your needs.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Professional Support',
    description: 'Access business support services, mail handling, and professional reception services to enhance your operations.',
  },
];

const amenityIconMap: Record<string, any> = {
  Wifi,
  Users,
  Coffee,
  Printer,
};

export default function About() {
  return (
    <Layout>
      <HeroSection
        title="About Coworking Hub"
        subtitle="We're on a mission to create inspiring workspaces where innovation thrives and communities grow."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
        size="sm"
      />

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded in 2020, CoworkingHub was born from a simple idea: work doesn't have to be confined 
                to a traditional office. We believe that the right environment can unlock creativity, 
                foster collaboration, and drive success.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                What started as a single location has grown into a thriving community of entrepreneurs, 
                freelancers, startups, and established businesses. Our spaces are designed to adapt to 
                the way you work, not the other way around.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to host over 500 members who call CoworkingHub their professional home. 
                From intimate focus rooms to expansive collaborative spaces, we offer the flexibility and 
                amenities that modern professionals need.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
                alt="Our workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Why Choose Us" 
            className="mb-10 md:mb-12"
            titleClassName="text-3xl md:text-4xl lg:text-5xl"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyChooseItems.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                align="left"
                className="rounded-3xl border border-border/80 bg-card p-8 shadow-none"
                iconContainerClassName="rounded-2xl w-14 h-14 bg-primary shadow-none mb-7"
                iconClassName="w-6 h-6 text-primary-foreground"
                titleClassName="text-3xl md:text-[2.2rem] leading-tight mb-4"
                descriptionClassName="max-w-none text-[1.05rem] md:text-[1.15rem] leading-relaxed"
              />
            ))}
          </div>
        </div>
      </section>

      {/* World-Class Amenities Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
                alt="Amenities"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:order-2">
              <h2 className="font-sans text-3xl md:text-4xl font-bold mb-8">World-Class Amenities</h2>
              <div className="space-y-6">
                {aboutAmenities.map((amenity) => {
                  const Icon = amenityIconMap[amenity.icon] || Wifi;
                  return (
                    <div key={amenity.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{amenity.title}</h3>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

  
    </Layout>
  );
}
