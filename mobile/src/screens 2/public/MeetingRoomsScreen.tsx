import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getMediaUrl } from '../../api/content-api';
import { listPublicMeetingRoomResources } from '../../api/booking-api';
import type { MemberResource } from '../../api/member-api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchContentPage, fetchPricingPlans } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';
const DEFAULT_ROOM_IMAGE = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800';

type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
type AmenityItem = { title: string; description?: string };

function getString(source: ContentPage | ContentCollectionItem | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getOptionalString(source: ContentPage | ContentCollectionItem | null, key: string): string | null {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function getAmenities(source: ContentPage | null): AmenityItem[] {
  if (!source) return [];
  const value = source.amenities;
  if (!Array.isArray(value)) return [];

  return value
    .map((item): AmenityItem | null => {
      if (typeof item === 'string') {
        const normalized = item.trim();
        return normalized ? { title: normalized } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Record<string, unknown>;
      const rawTitle = entry.title ?? entry.name ?? entry.label;
      const rawDescription = entry.description ?? entry.body ?? entry.text;

      const title = typeof rawTitle === 'string' ? rawTitle.trim() : '';
      const description = typeof rawDescription === 'string' ? rawDescription.trim() : '';

      if (!title) return null;
      return description ? { title, description } : { title };
    })
    .filter((item): item is AmenityItem => item !== null);
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/[_-]+/g, ' ');
}

function isMeetingPlan(plan: ContentCollectionItem): boolean {
  const candidates = [plan.planType, plan.type, plan.category, plan.name]
    .map((value) => (typeof value === 'string' ? normalizeText(value) : ''))
    .filter((value) => value.length > 0);

  return candidates.some((value) => value.includes('meeting room') || value.includes('meeting-room') || value.includes('meeting'));
}

function getUniquePlans(plans: ContentCollectionItem[]): ContentCollectionItem[] {
  const seen = new Set<string>();
  const unique: ContentCollectionItem[] = [];

  plans.forEach((plan) => {
    const slug = typeof plan.slug === 'string' ? plan.slug.trim() : '';
    const id = typeof plan.id === 'string' || typeof plan.id === 'number' ? String(plan.id) : '';
    const name = typeof plan.name === 'string' ? plan.name.trim().toLowerCase() : '';
    const key = slug || id || name;
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push(plan);
  });

  return unique;
}

function getPlanPrice(plan: ContentCollectionItem): string {
  const monthlyPriceMinor = plan.monthlyPriceMinor;
  if (typeof monthlyPriceMinor === 'number' && Number.isFinite(monthlyPriceMinor)) {
    if (monthlyPriceMinor === 0) return 'Included';
    const currency = typeof plan.currency === 'string' && plan.currency.trim() ? plan.currency.toUpperCase() : 'GBP';
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(monthlyPriceMinor / 100);
  }

  const price = plan.price;
  if (typeof price === 'number' && Number.isFinite(price)) {
    if (price === 0) return 'Included';
    return `£${price}`;
  }

  return 'Contact us';
}

// Helpers from web
function truncateDescription(text: string, length: number = 100): string {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

function normalizeRoomKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function getResourceString(resource: MemberResource, key: string, fallback: string): string {
  const record = resource as Record<string, unknown>;
  const val = record[key];
  return typeof val === 'string' ? val : fallback;
}

function getResourceNumber(resource: MemberResource, key: string): number | undefined {
  const record = resource as Record<string, unknown>;
  const val = record[key];
  return typeof val === 'number' ? val : undefined;
}

function getResourceStringArray(resource: MemberResource, key: string): string[] {
  const record = resource as Record<string, unknown>;
  const val = record[key];
  if (Array.isArray(val)) {
    return val.filter((item): item is string => typeof item === 'string');
  }
  return [];
}

export function MeetingRoomsScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [rooms, setRooms] = useState<MemberResource[]>([]);
  const [roomPlans, setRoomPlans] = useState<ContentCollectionItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pageContent, typedPlans, resourcesPayload] = await Promise.all([
        fetchContentPage(apiClient, 'meeting-rooms-page'),
        fetchPricingPlans(apiClient, 'meeting-room'),
        listPublicMeetingRoomResources(apiClient).catch(() => ({ resources: [] }))
      ]);

      let plans = typedPlans.filter(isMeetingPlan);
      if (plans.length === 0) {
        const allPlans = await fetchPricingPlans(apiClient);
        plans = allPlans.filter(isMeetingPlan);
      }

      setPage(pageContent);
      setRooms((resourcesPayload.resources || []).filter(r => r.type === 'meeting_room'));
      setRoomPlans(getUniquePlans(plans));
    } catch {
      setError('We could not load meeting room content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const handleBookNow = useCallback((roomId?: string) => {
    navigation.navigate('MeetingRoomBooking', roomId ? { roomId } : undefined);
  }, [navigation]);

  if (isLoading) return <LoadingState message="Loading meeting room content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Meeting rooms in the City');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Book professional rooms for focused sessions, client meetings, and team workshops.');
  const heroBackgroundImage = getMediaUrl(page?.heroBackgroundImage) || DEFAULT_ROOM_IMAGE;
  
  const bookNowLabel = getString(page, 'bookNowLabel', 'Book now');
  const amenitiesTitle = getOptionalString(page, 'amenitiesTitle');
  const amenitiesSubtitle = getOptionalString(page, 'amenitiesSubtitle');
  const amenities = getAmenities(page);
  const plansTitle = getString(page, 'plansTitle', 'Meeting room plans');
  const plansSubtitle = getString(page, 'plansSubtitle', 'Compare plans, then continue on the pricing page to choose what fits your team.');
  const getStartedLabel = getString(page, 'getStartedLabel', 'View pricing');
  const popularLabel = getString(page, 'popularLabel', 'Popular');


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground source={{ uri: heroBackgroundImage }} style={styles.heroBackground} imageStyle={styles.heroBackgroundImage}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.titleWhite}>{heroTitle}</Text>
          <Text style={styles.subtitleWhite}>{heroSubtitle}</Text>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        {rooms.length > 0 ? rooms.map((room, index) => {
          const name = room.name || `Meeting room ${index + 1}`;
          const description = getResourceString(room, 'description', 'A professional meeting space for members and guests.');
          const capacity = room.capacity;
          const features = getResourceStringArray(room, 'features');
          const badges = getResourceStringArray(room, 'badges');
          const roomId = getResourceString(room, 'slug', String(room.id));


          const roomImage = getMediaUrl(getResourceString(room, 'image', '')) || DEFAULT_ROOM_IMAGE;
          const hourlyRateMinor = getResourceNumber(room, 'hourlyRateMinor') ?? 0;
          const currency = getResourceString(room, 'currency', 'GBP');
          const rateDisplay = hourlyRateMinor ? `${formatCurrency(hourlyRateMinor, currency)} / hour` : 'Loading price...';

          return (
            <View key={`${name}-${index}`} style={styles.roomContainer}>
              <View style={styles.roomImageContainer}>
                <Image source={{ uri: roomImage }} style={styles.roomImage} />
                {badges.length > 0 ? (
                  <View style={styles.roomBadgeOverlay}>
                    {badges.map((badge) => <Text key={badge} style={styles.roomBadge}>{badge}</Text>)}
                  </View>
                ) : null}
              </View>

              <View style={styles.roomDetailCard}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomName}>{name}</Text>
                </View>
                
                <Text style={styles.rate}>{rateDisplay}</Text>
                
                <Text style={styles.body}>
                  {truncateDescription(description, 180)}
                </Text>

                <View style={styles.featuresList}>
                  {features.slice(0, 3).map((feature) => (
                    <View key={feature} style={styles.bulletRow}>
                      <View style={styles.bullet} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.roomActions}>
                  <Pressable accessibilityRole="button" onPress={() => handleBookNow(roomId)} style={styles.blackButton}>
                    <Text style={styles.blackButtonText}>{bookNowLabel}</Text>
                  </Pressable>

                </View>
              </View>
            </View>
          );
        }) : (
          <View style={styles.roomDetailCard}>
            <Text style={styles.roomName}>Meeting room options</Text>
            <Text style={styles.body}>Room details are being prepared. Contact the team for availability and booking support.</Text>
            <Pressable accessibilityRole="button" onPress={() => handleBookNow()} style={styles.blackButton}>
              <Text style={styles.blackButtonText}>{bookNowLabel}</Text>
            </Pressable>
          </View>
        )}
      </View>

      {(amenitiesTitle || amenitiesSubtitle || amenities.length > 0) ? (
        <View style={styles.greyCenteredSection}>
          {amenitiesTitle ? <Text style={styles.sectionTitleCentered}>{amenitiesTitle}</Text> : null}
          {amenitiesSubtitle ? <Text style={styles.subtitleCentered}>{amenitiesSubtitle}</Text> : null}
          {amenities.length > 0 ? (
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity, index) => (
                <View key={`${amenity.title}-${index}`} style={styles.amenityCardGrey}>
                  <Text style={styles.amenityTitleCentered}>{amenity.title}</Text>
                  {amenity.description ? <Text style={styles.amenityDescriptionCentered}>{amenity.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {roomPlans.length > 0 ? (
        <View style={styles.whiteCenteredSection}>
          <Text style={styles.sectionTitleCentered}>{plansTitle}</Text>
          <Text style={styles.subtitleCentered}>{plansSubtitle}</Text>
          {roomPlans.map((plan, index) => {
            const name = getString(plan, 'name', `Meeting room plan ${index + 1}`);
            const price = getPlanPrice(plan);
            const period = getString(plan, 'period', 'month');
            const description = getString(plan, 'description', 'Meeting room plan details are available on the pricing page.');
            const isPopular = plan.isPopular === true;

            return (
              <View key={`${name}-${index}`} style={[styles.planCardWhite, isPopular ? styles.planCardPopular : null]}>
                {isPopular ? <Text style={styles.popularBadgeCentered}>{popularLabel}</Text> : null}
                <Text style={styles.planNameCentered}>{name}</Text>
                <Text style={styles.priceCentered}>{price === 'Contact us' ? price : `${price}/${period}`}</Text>
                <Text style={styles.bodyCentered}>{description}</Text>
                <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Pricing')} style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>{getStartedLabel}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xl },
  
  heroBackground: { width: '100%', minHeight: 300, justifyContent: 'flex-end' },
  heroBackgroundImage: { },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  heroContent: { padding: spacing.xl, gap: spacing.md },
  titleWhite: { color: colors.background, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitleWhite: { color: colors.background, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  
  section: { gap: spacing.xl, padding: spacing.xl },
  
  roomContainer: { gap: 0, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 },
  roomImageContainer: { width: '100%', height: 200, position: 'relative' },
  roomImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  roomBadgeOverlay: { position: 'absolute', top: spacing.md, left: spacing.md, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  roomBadge: { backgroundColor: colors.background, borderRadius: radius.full, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, overflow: 'hidden' },
  
  roomDetailCard: { padding: spacing.lg, gap: spacing.md },
  roomHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  roomName: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  capacity: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  rate: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  featuresList: { gap: spacing.sm },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.foreground, borderRadius: radius.full, height: 6, marginTop: 6, width: 6 },
  featureText: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  
  roomActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  blackButton: { flex: 1, alignItems: 'center', backgroundColor: colors.foreground, borderRadius: radius.md, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg },
  blackButtonText: { color: colors.background, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },

  
  greyCenteredSection: { backgroundColor: colors.secondary, padding: spacing.xl, gap: spacing.lg, alignItems: 'center' },
  whiteCenteredSection: { backgroundColor: colors.background, padding: spacing.xl, gap: spacing.lg, alignItems: 'center' },
  sectionTitleCentered: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  subtitleCentered: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  
  amenitiesGrid: { gap: spacing.md, width: '100%' },
  amenityCardGrey: { backgroundColor: colors.background, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.xs, alignItems: 'center' },
  amenityTitleCentered: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  amenityDescriptionCentered: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  
  planCardWhite: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg, backgroundColor: colors.background, width: '100%', alignItems: 'center' },
  planCardPopular: { borderColor: colors.primary },
  popularBadgeCentered: { backgroundColor: colors.primary, borderRadius: radius.full, color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, overflow: 'hidden', paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  planNameCentered: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  priceCentered: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  bodyCentered: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal, textAlign: 'center' },
  
  secondaryButton: { width: '100%', alignItems: 'center', borderColor: colors.primary, borderRadius: radius.md, borderWidth: 1, marginTop: spacing.sm, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg },
  secondaryButtonText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
});
