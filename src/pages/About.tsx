import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { MapPin, Clock2, HeadphonesIcon, Wifi, Users, Coffee, Printer, Check } from 'lucide-react';
import { aboutAmenities } from '@/data/mockData';

const whyChooseItems = [
  {
    icon: MapPin,
    title: 'Prime Location',
    description: 'Situated in the heart of the city with excellent transport links and nearby amenities.',
  },
  {
    icon: Clock2,
    title: 'Flexible Terms',
    description: 'Month-to-month contracts with the freedom to scale up or down as needed.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Professional Support',
    description: 'Dedicated staff available to help with your daily needs and requirements.',
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
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
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Why Choose Us" 
            subtitle="What sets CoworkingHub apart from the rest"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyChooseItems.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">World-Class Amenities</h2>
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

      {/* Stats Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Active Members' },
              { number: '50+', label: 'Private Offices' },
              { number: '10', label: 'Meeting Rooms' },
              { number: '24/7', label: 'Access Available' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.number}</p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
