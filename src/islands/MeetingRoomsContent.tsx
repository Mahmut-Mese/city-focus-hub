import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Wifi } from 'lucide-react';
import { HeroSection } from '@/components/shared/HeroSection';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Button } from '@/components/ui/button';
import { useMeetingRoomsPageContent, usePricingPlans } from '@/hooks/useCmsContent';
import { listPublicMeetingRoomResources, type MemberResource } from '@/lib/member-api';
import { contentIconMap } from '@/lib/site-icons';

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(Number(amountMinor || 0) / 100);
}

export default function MeetingRoomsContent() {
  const meetingPlansQuery = usePricingPlans('meeting-room');
  const meetingRoomsPageQuery = useMeetingRoomsPageContent();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);

  useEffect(() => {
    listPublicMeetingRoomResources()
      .then((result) => setResources((result.resources || []).filter((r) => r.type === 'meeting_room')))
      .catch(() => setResources([]))
      .finally(() => setResourcesLoading(false));
  }, []);

  if (meetingPlansQuery.isLoading || meetingRoomsPageQuery.isLoading || resourcesLoading) {
    return null;
  }

  if (
    meetingPlansQuery.isError
    || meetingRoomsPageQuery.isError
    || !meetingRoomsPageQuery.data
    || !meetingPlansQuery.data
    || meetingPlansQuery.data.length === 0
    || resources.length === 0
  ) {
    return <CmsNoData />;
  }

  const content = meetingRoomsPageQuery.data;
  const roomPlans = meetingPlansQuery.data.map((plan) => ({
    id: plan.slug || plan.id,
    name: plan.name,
    price: plan.price,
    period: plan.period,
    isPopular: plan.isPopular,
  }));

  return (
    <>
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
        size="sm"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            {resources.map((room) => {
              const isExpanded = expandedRoomId === room.slug;
              const visibleFeatures = isExpanded ? room.features : room.features.slice(0, 3);

              return (
                <div key={room.slug} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                  <div className="relative lg:order-1">
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                      {room.image ? (
                        <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-black/5" />
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {room.badges.map((badge) => (
                        <span key={badge} className="inline-flex h-7 items-center rounded-full bg-black px-3 text-xs text-white">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-7 transition-all duration-300 md:p-9 lg:order-2">
                    <h3 className="mb-2 font-sans text-3xl leading-none">{room.name}</h3>
                    <p className="mb-4 text-xl font-bold text-black">
                      {room.hourlyRateMinor
                        ? <>{formatCurrency(room.hourlyRateMinor)}<span className="text-sm font-normal text-black/50"> / hour</span></>
                        : <span className="text-sm font-normal text-black/40">Price on request</span>}
                    </p>
                    <p className="mb-6 leading-relaxed text-black/60">
                      {room.description}
                    </p>
                    {visibleFeatures.length > 0 && (
                      <ul className="mb-7 space-y-2">
                        {visibleFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm text-black/85">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        type="button"
                        variant="default"
                        className="h-11 rounded-xl border border-black px-5 text-sm font-medium !bg-black !text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:!bg-black/90"
                      >
                        <a href={`/meeting-rooms/book?room=${encodeURIComponent(room.slug)}`}>
                          {content.bookNowLabel}
                        </a>
                      </Button>

                      {room.features.length > 3 && (
                        <Button
                          type="button"
                          onClick={() => setExpandedRoomId(isExpanded ? null : room.slug)}
                          variant="outline"
                          className="h-11 rounded-xl border border-black/15 bg-white px-5 text-sm font-medium text-black hover:bg-black/[0.03]"
                        >
                          {isExpanded ? content.readMoreLabel.replace(/more/i, 'less') : content.readMoreLabel}
                          {isExpanded ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mb-4 font-sans text-5xl leading-tight md:text-6xl">{content.amenitiesTitle}</h2>
            <p className="text-lg text-black/55">{content.amenitiesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.amenities.map((amenity) => {
              const Icon = contentIconMap[amenity.icon] || Wifi;
              return (
                <article key={amenity.title} className="rounded-2xl border border-black/10 bg-white p-8 text-center">
                  <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                    <Icon size={18} className="text-black/70" />
                  </div>
                  <h3 className="mb-3 font-sans text-4xl leading-none">{amenity.title}</h3>
                  <p className="text-black/55">{amenity.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mb-4 font-sans text-5xl leading-tight md:text-6xl">{content.plansTitle}</h2>
            <p className="text-lg text-black/55">{content.plansSubtitle}</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {roomPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-white p-6 text-center ${
                  plan.isPopular ? 'border-black shadow-[0_0_0_1px_#000]' : 'border-black/10'
                }`}
              >
                {plan.isPopular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex h-6 items-center rounded-full bg-black px-3 text-xs text-white">
                      {content.popularLabel}
                    </span>
                  </div>
                ) : null}
                <h3 className="mb-3 font-sans text-4xl leading-none">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-5xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-black/45">/{plan.period}</span>
                </div>
                <Button asChild className="h-10 w-full rounded-lg bg-black px-5 text-sm text-white hover:bg-black/90">
                  <a href="/pricing">{content.getStartedLabel}</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
