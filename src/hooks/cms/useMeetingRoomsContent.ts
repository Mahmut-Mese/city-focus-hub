import { useQuery } from '@tanstack/react-query';
import type { CmsMeetingRoom } from '@/types/cms';
import { fetchApi, getMediaUrl, unwrapCollection, unwrapSingle } from '@/lib/content-api';
import { defaultSiteSettingsContent, type SiteSettingsContent } from '@/data/siteContent';
import {
  appendStatusParam,
  getBoolean,
  getString,
  isRecord,
  toAmenityItems,
  toStringArray,
  usePreviewStatus,
} from './cms-utils';

function mapMeetingRoomsPageContent(raw: Record<string, unknown>): SiteSettingsContent['meetingRoomsPage'] {
  const fallback = defaultSiteSettingsContent.meetingRoomsPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    roomsTitle: getString(raw.roomsTitle, fallback.roomsTitle),
    roomsSubtitle: getString(raw.roomsSubtitle, fallback.roomsSubtitle),
    amenitiesTitle: getString(raw.amenitiesTitle, fallback.amenitiesTitle),
    amenitiesSubtitle: getString(raw.amenitiesSubtitle, fallback.amenitiesSubtitle),
    amenities: toAmenityItems(raw.amenities, fallback.amenities),
    plansTitle: getString(raw.plansTitle, fallback.plansTitle),
    plansSubtitle: getString(raw.plansSubtitle, fallback.plansSubtitle),
    readMoreLabel: getString(raw.readMoreLabel, fallback.readMoreLabel),
    bookNowLabel: getString(raw.bookNowLabel, fallback.bookNowLabel),
    getStartedLabel: getString(raw.getStartedLabel, fallback.getStartedLabel),
    popularLabel: getString(raw.popularLabel, fallback.popularLabel),
  };
}

export { mapMeetingRoomsPageContent };

export function useMeetingRooms() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'meeting-rooms', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsMeetingRoom[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/meeting-rooms?sort=sortOrder:asc&pagination[pageSize]=100&populate=*', previewStatus),
      );
      const rooms = unwrapCollection<Record<string, unknown>>(payload);

      return rooms
        .map((room) => ({
          id: String(room.id ?? room.documentId ?? ''),
          name: String(room.name ?? ''),
          slug: String(room.slug ?? room.id ?? room.documentId ?? ''),
          description: typeof room.description === 'string' ? room.description : undefined,
          capacity: typeof room.capacity === 'number' ? room.capacity : undefined,
          image: getMediaUrl(room.image) || (typeof room.imageUrl === 'string' ? room.imageUrl : ''),
          features: toStringArray(room.features),
          badges: toStringArray(room.badges),
          isFeatured: getBoolean(room.isFeatured),
          sortOrder: Number(room.sortOrder ?? 1),
        }))
        .filter((room) => !room.isFeatured)
        .sort((left, right) => left.sortOrder - right.sortOrder);
    },
  });
}

export function useMeetingRoomsPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'meeting-rooms-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['meetingRoomsPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/meeting-rooms-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapMeetingRoomsPageContent(raw) : null;
    },
  });
}
