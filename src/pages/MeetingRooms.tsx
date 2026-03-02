import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { Button } from '@/components/ui/button';
import { Check, Wifi } from 'lucide-react';
import { useMeetingRooms, useMeetingRoomsPageContent, usePricingPlans } from '@/hooks/useCmsContent';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import { contentIconMap } from '@/lib/site-icons';

export default function MeetingRooms() {
  const { data: cmsRooms = [] } = useMeetingRooms();
  const { data: cmsMeetingPlans = [] } = usePricingPlans('meeting-room');
  const { data: content = defaultSiteSettingsContent.meetingRoomsPage } = useMeetingRoomsPageContent();

  const rooms = cmsRooms.map((room) => ({
    id: room.slug || room.id,
    name: room.name,
    description: room.description || 'Professional room setup for productive sessions.',
    features: room.features,
    image: room.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    badges: room.badges,
  }));

  const roomPlans = cmsMeetingPlans.map((plan) => ({
    id: plan.slug || plan.id,
    name: plan.name,
    price: plan.price,
    period: plan.period,
    isPopular: plan.isPopular,
  }));

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || content.roomsSubtitle,
        image: content.heroBackgroundImage || rooms[0]?.image,
      }}
    >
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
        size="sm"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.roomsTitle}</h2>
            <p className="text-lg text-black/55">{content.roomsSubtitle}</p>
          </div>
          <div className="space-y-12">
            {rooms.map((room) => (
              <div key={room.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative lg:order-1">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
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
                  <h3 className="font-sans text-5xl leading-none mb-4">{room.name}</h3>
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
                    <Button className="h-9 rounded-lg px-4 text-sm bg-black text-white hover:bg-black/90">{content.readMoreLabel}</Button>
                    <Button className="h-9 rounded-lg px-4 text-sm bg-black text-white hover:bg-black/90">{content.bookNowLabel}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.amenitiesTitle}</h2>
            <p className="text-lg text-black/55">{content.amenitiesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.amenities.map((amenity) => {
              const Icon = contentIconMap[amenity.icon] || Wifi;
              return (
                <article key={amenity.title} className="rounded-2xl border border-black/10 bg-white p-8 text-center">
                  <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center mx-auto mb-5">
                    <Icon size={18} className="text-black/70" />
                  </div>
                  <h3 className="font-sans text-4xl leading-none mb-3">{amenity.title}</h3>
                  <p className="text-black/55">{amenity.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.plansTitle}</h2>
            <p className="text-lg text-black/55">{content.plansSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {roomPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 text-center relative bg-white ${
                  plan.isPopular ? 'border-black shadow-[0_0_0_1px_#000]' : 'border-black/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex h-6 items-center rounded-full bg-black px-3 text-xs text-white">{content.popularLabel}</span>
                  </div>
                )}
                <h3 className="font-sans text-4xl leading-none mb-3">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-5xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-black/45">/{plan.period}</span>
                </div>
                <Button className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90">
                  {content.getStartedLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
