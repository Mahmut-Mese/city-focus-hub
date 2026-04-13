import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Wifi } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Button } from '@/components/ui/button';
import { useMeetingRooms, useMeetingRoomsPageContent, usePricingPlans } from '@/hooks/useCmsContent';
import { listPublicMeetingRoomResources, type MemberResource } from '@/lib/member-api';
import { contentIconMap } from '@/lib/site-icons';

function truncateDescription(value: string, maxLength = 180) {
  const normalized = value.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

function normalizeRoomKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(Number(amountMinor || 0) / 100);
}

function matchRoomToResource(
  room: { id: string; name: string; capacity?: number },
  resources: MemberResource[],
): MemberResource | null {
  const exactMatch = resources.find(
    (r) =>
      normalizeRoomKey(r.slug) === normalizeRoomKey(room.id) ||
      normalizeRoomKey(r.name) === normalizeRoomKey(room.name),
  );
  if (exactMatch) return exactMatch;
  if (!resources.length) return null;

  const capacity = Number(room.capacity || 0);
  if (!capacity) return resources[0] || null;

  return (
    [...resources].sort((left, right) => {
      const leftDiff = Math.abs(Number(left.capacity || 0) - capacity);
      const rightDiff = Math.abs(Number(right.capacity || 0) - capacity);
      if (leftDiff !== rightDiff) return leftDiff - rightDiff;
      return Number(right.capacity || 0) - Number(left.capacity || 0);
    })[0] || null
  );
}

export default function MeetingRooms() {
  const meetingRoomsQuery = useMeetingRooms();
  const meetingPlansQuery = usePricingPlans('meeting-room');
  const meetingRoomsPageQuery = useMeetingRoomsPageContent();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [resources, setResources] = useState<MemberResource[]>([]);

  useEffect(() => {
    listPublicMeetingRoomResources()
      .then((result) => setResources(result.resources || []))
      .catch(() => setResources([]));
  }, []);

  if (meetingRoomsQuery.isLoading || meetingPlansQuery.isLoading || meetingRoomsPageQuery.isLoading) {
    return null;
  }

  if (
    meetingRoomsQuery.isError
    || meetingRoomsPageQuery.isError
    || !meetingRoomsPageQuery.data
    || !meetingRoomsQuery.data
    || meetingRoomsQuery.data.length === 0
  ) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const content = meetingRoomsPageQuery.data;
  const rooms = meetingRoomsQuery.data.map((room) => ({
    id: room.slug || room.id,
    name: room.name,
    description: room.description || '',
    features: room.features,
    image: room.image || '',
    badges: room.badges,
    capacity: room.capacity || 0,
  }));
  // Meeting-room plans are CMS-only decorative links — only render section if data exists
  const roomPlans = (meetingPlansQuery.data ?? []).map((plan) => ({
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
          <div className="space-y-12">
            {rooms.map((room) => {
              const isExpanded = expandedRoomId === room.id;
              const visibleFeatures = isExpanded ? room.features : room.features.slice(0, 3);
              const matchedResource = matchRoomToResource(room, resources);
              const roomImage = room.image || matchedResource?.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800';

              return (
                <div key={room.id} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                  <div className="relative lg:order-1">
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                      <img src={roomImage} alt={room.name} className="h-full w-full object-cover" />
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
                    <h3 className="mb-1 font-sans text-xl leading-none md:text-2xl">{room.name}</h3>
                    <p className="mb-4 text-xl font-bold text-black">
                      {matchedResource?.hourlyRateMinor
                        ? <>{formatCurrency(matchedResource.hourlyRateMinor)}<span className="text-sm font-normal text-black/50"> / hour</span></>
                        : <span className="text-sm font-normal text-black/40">Loading price...</span>}
                    </p>
                    <p className="mb-6 leading-relaxed text-black/60">
                      {isExpanded ? room.description : truncateDescription(room.description)}
                    </p>
                    <ul className="mb-7 space-y-2">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-black/85">
                          <span className="h-1.5 w-1.5 rounded-full bg-black" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        type="button"
                        variant="default"
                        className="h-11 rounded-xl border border-black px-5 text-sm font-medium !bg-black !text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:!bg-black/90"
                      >
                        <Link to={`/meeting-rooms/${encodeURIComponent(room.id)}/book`}>
                          {content.bookNowLabel}
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                        variant="outline"
                        className="h-11 rounded-xl border border-black/15 bg-white px-5 text-sm font-medium text-black hover:bg-black/[0.03]"
                      >
                        {isExpanded ? content.readMoreLabel.replace(/more/i, 'less') : content.readMoreLabel}
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                      </Button>
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
            <h2 className="mb-4 font-sans text-3xl leading-tight md:text-4xl">{content.amenitiesTitle}</h2>
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
                  <h3 className="mb-3 font-sans text-2xl leading-none">{amenity.title}</h3>
                  <p className="text-black/55">{amenity.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {roomPlans.length > 0 && (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mb-4 font-sans text-3xl leading-tight md:text-4xl">{content.plansTitle}</h2>
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
                <h3 className="mb-3 font-sans text-2xl leading-none">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-3xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-black/45">/{plan.period}</span>
                </div>
                <Button asChild className="h-10 w-full rounded-lg bg-black px-5 text-sm text-white hover:bg-black/90">
                  <Link to="/pricing">{content.getStartedLabel}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </Layout>
  );
}
