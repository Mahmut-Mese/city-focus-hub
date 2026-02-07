import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Coffee, 
  Phone, 
  Shield, 
  Users, 
  Zap,
  Users as UsersIcon
} from 'lucide-react';
import { meetingRooms, meetingRoomPlans, amenities } from '@/data/mockData';

const iconMap: Record<string, any> = {
  Wifi,
  Coffee,
  Phone,
  Shield,
  Users,
  Zap,
};

export default function MeetingRooms() {
  return (
    <Layout>
      <HeroSection
        title="Meeting Rooms"
        subtitle="Professional spaces designed for productive meetings"
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920"
        size="sm"
      />

      {/* Rooms Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle 
            title="Designed for real work." 
            subtitle="From quiet focus rooms to collaborative spaces"
          />
          <div className="space-y-12">
            {meetingRooms.map((room, index) => (
              <div 
                key={room.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {room.badges.map((badge) => (
                      <span key={badge} className="chip-dark text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`card-elevated p-6 md:p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">{room.name}</h3>
                  <p className="text-muted-foreground mb-6">{room.description}</p>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="btn-pill-secondary">Read more</Button>
                    <Button className="btn-pill-primary">Book now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionTitle 
            title="Everything you need to stay in flow." 
            subtitle="Premium amenities included with every booking"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity) => {
              const Icon = iconMap[amenity.icon] || Wifi;
              return (
                <FeatureCard
                  key={amenity.title}
                  icon={Icon}
                  title={amenity.title}
                  description={amenity.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans for Rooms */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle 
            title="Flexible plans, monochrome clarity." 
            subtitle="Choose the access that works for you"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {meetingRoomPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`card-elevated p-6 text-center relative ${
                  plan.isPopular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="chip-dark text-xs">Most popular</span>
                  </div>
                )}
                <h3 className="font-serif text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <Button 
                  className={plan.isPopular ? 'btn-pill-primary w-full' : 'btn-pill-secondary w-full'}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
