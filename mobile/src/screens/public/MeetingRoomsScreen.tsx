import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchContentPage, fetchMeetingRooms } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function getString(source: ContentPage | ContentCollectionItem | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getNumber(source: ContentCollectionItem, key: string): number | null {
  const value = source[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getStringArray(source: ContentCollectionItem, key: string): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function MeetingRoomsScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [rooms, setRooms] = useState<ContentCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pageContent, roomItems] = await Promise.all([
        fetchContentPage(apiClient, 'meeting-rooms-page'),
        fetchMeetingRooms(apiClient),
      ]);
      setPage(pageContent);
      setRooms(roomItems);
    } catch {
      setError('We could not load meeting room content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading meeting room content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Meeting rooms in the City');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Book professional rooms for focused sessions, client meetings, and team workshops.');
  const roomsTitle = getString(page, 'roomsTitle', 'Available spaces');
  const roomsSubtitle = getString(page, 'roomsSubtitle', 'Explore rooms and contact the team to confirm live availability.');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Meeting rooms</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{roomsTitle}</Text>
        <Text style={styles.subtitle}>{roomsSubtitle}</Text>
        {rooms.length > 0 ? rooms.map((room, index) => {
          const name = getString(room, 'name', `Meeting room ${index + 1}`);
          const description = getString(room, 'description', 'A professional meeting space for members and guests.');
          const capacity = getNumber(room, 'capacity');
          const features = getStringArray(room, 'features');
          const badges = getStringArray(room, 'badges');

          return (
            <View key={`${name}-${index}`} style={styles.roomCard}>
              <View style={styles.roomHeader}>
                <Text style={styles.roomName}>{name}</Text>
                {capacity ? <Text style={styles.capacity}>Up to {capacity}</Text> : null}
              </View>
              <Text style={styles.body}>{description}</Text>
              {badges.length > 0 ? (
                <View style={styles.badgeRow}>
                  {badges.slice(0, 3).map((badge) => <Text key={badge} style={styles.badge}>{badge}</Text>)}
                </View>
              ) : null}
              {features.slice(0, 4).map((feature) => (
                <View key={feature} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          );
        }) : (
          <View style={styles.roomCard}>
            <Text style={styles.roomName}>Meeting room options</Text>
            <Text style={styles.body}>Room details are being prepared. Contact the team for availability and booking support.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  section: { gap: spacing.md },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  roomCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  roomHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  roomName: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  capacity: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  badge: { backgroundColor: colors.secondary, borderRadius: radius.full, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  featureText: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
});