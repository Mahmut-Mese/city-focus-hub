import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Coffee, 
  Phone, 
  Shield, 
  Users, 
  Zap,
  Check
} from 'lucide-react';
import { meetingRoomPlans } from '@/data/mockData';

const iconMap: Record<string, any> = {
  Wifi,
  Coffee,
  Phone,
  Shield,
  Users,
  Zap,
};

const rooms = [
  {
    id: 'focus-room',
    name: 'Focus Room',
    description:
      'A quiet, private space designed for deep work and one-on-one meetings. Equipped with ergonomic furniture and soundproofing for maximum concentration.',
    features: ['Whiteboard', 'Video conferencing', 'Soundproof', 'Ergonomic chairs'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    badges: ['4 people', 'Whiteboard', 'Video call'],
  },
  {
    id: 'meeting-suite',
    name: 'Meeting Suite',
    description:
      'Our flagship meeting room perfect for client presentations, team meetings, and workshops. Features state-of-the-art AV equipment and comfortable seating.',
    features: ['Large display', 'Video conferencing', 'Catering available', 'Natural light'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    badges: ['12 people', 'Display', 'Catering'],
  },
  {
    id: 'open-lounge',
    name: 'Open Lounge',
    description:
      'A relaxed, open environment for informal meetings and collaborative sessions. Perfect for brainstorming and creative work with your team.',
    features: ['Flexible seating', 'Coffee bar access', 'Natural light', 'Collaborative space'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
    badges: ['20 people', 'Flexible', 'Coffee'],
  },
];

const amenityItems = [
  { icon: 'Wifi', title: 'Fast Wi-Fi', description: 'Gigabit internet for seamless work' },
  { icon: 'Coffee', title: 'Coffee Bar', description: 'Complimentary premium coffee & tea' },
  { icon: 'Phone', title: 'Call Pods', description: 'Private booths for calls' },
  { icon: 'Shield', title: 'Secure Access', description: '24/7 keycard entry system' },
  { icon: 'Users', title: 'Community', description: 'Networking events & workshops' },
  { icon: 'Zap', title: 'Reliable', description: 'Backup power & redundant systems' },
];

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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-4">Designed for real work.</h2>
            <p className="text-lg text-black/55">From quiet focus rooms to collaborative spaces</p>
          </div>
          <div className="space-y-12">
            {rooms.map((room) => (
              <div 
                key={room.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="relative lg:order-1">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {room.badges.map((badge) => (
                      <span key={badge} className="inline-flex h-7 items-center rounded-full bg-black px-3 text-xs text-white">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-7 md:p-9 lg:order-2">
                  <h3 className="font-serif text-5xl leading-none mb-4">{room.name}</h3>
                  <p className="text-black/60 mb-6 leading-relaxed">{room.description}</p>
                  <ul className="space-y-2 mb-7">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-black/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Button className="h-9 rounded-lg px-4 text-sm bg-black text-white hover:bg-black/90">Read more</Button>
                    <Button className="h-9 rounded-lg px-4 text-sm bg-black text-white hover:bg-black/90">Book now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-4">Everything you need to stay in flow.</h2>
            <p className="text-lg text-black/55">Premium amenities included with every booking</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenityItems.map((amenity) => {
              const Icon = iconMap[amenity.icon] || Wifi;
              return (
                <article key={amenity.title} className="rounded-2xl border border-black/10 bg-white p-8 text-center">
                  <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center mx-auto mb-5">
                    <Icon size={18} className="text-black/70" />
                  </div>
                  <h3 className="font-serif text-4xl leading-none mb-3">{amenity.title}</h3>
                  <p className="text-black/55">{amenity.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans for Rooms */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-4">Flexible plans, monochrome clarity.</h2>
            <p className="text-lg text-black/55">Choose the access that works for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {meetingRoomPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-2xl border p-6 text-center relative bg-white ${
                  plan.isPopular ? 'border-black shadow-[0_0_0_1px_#000]' : 'border-black/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex h-6 items-center rounded-full bg-black px-3 text-xs text-white">Most popular</span>
                  </div>
                )}
                <h3 className="font-serif text-4xl leading-none mb-3">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-5xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-black/45">/{plan.period}</span>
                </div>
                <Button className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90">
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
