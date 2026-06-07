import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchContentPage, fetchFaqItems, getMediaUrl } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function unwrapRecord(value: unknown): UnknownRecord {
  if (!isRecord(value)) return {};
  if (isRecord(value.data)) {
    if (isRecord(value.data.attributes)) return value.data.attributes;
    return value.data;
  }
  if (isRecord(value.attributes)) return value.attributes;
  return value;
}

function getString(source: unknown, key: string, fallback: string): string {
  const value = unwrapRecord(source)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function getNested(source: unknown, key: string): unknown {
  return unwrapRecord(source)[key];
}

export function FaqScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const apiBaseUrl = getApiBaseUrl();
  const apiClient = useMemo(() => createApiClient({ baseUrl: apiBaseUrl }), [apiBaseUrl]);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [items, setItems] = useState<ContentCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [pageContent, faqItems] = await Promise.all([
        fetchContentPage(apiClient, 'faq-page'),
        fetchFaqItems(apiClient),
      ]);
      setPage(pageContent);
      setItems(faqItems);
    } catch {
      setError('We could not load FAQ content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => { void loadContent(); }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading FAQ content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Frequently asked questions');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Answers about coworking, meeting rooms, memberships, and services.');
  const heroImageUrl = getMediaUrl(getNested(page, 'heroBackgroundImage'), apiBaseUrl);
  const eyebrow = getString(page, 'eyebrow', 'FAQ');
  const title = getString(page, 'title', 'Common questions');
  const description = getString(page, 'description', '');
  const searchPlaceholder = getString(page, 'searchPlaceholder', 'Search frequently asked questions');
  const noResultsText = getString(page, 'noResultsText', 'No matching FAQs found.');
  const ctaTitle = getString(page, 'ctaTitle', 'Still have questions?');
  const ctaDescription = getString(page, 'ctaDescription', 'Contact the team and we will be happy to help.');
  const ctaButtonLabel = getString(page, 'ctaButtonLabel', 'Contact us');

  const rows = items.map((item, index) => ({
    id: String(unwrapRecord(item).id ?? index),
    question: getString(item, 'question', `Question ${index + 1}`),
    answer: getString(item, 'answer', 'Contact the team for more information.'),
  }));
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredRows = normalizedSearch
    ? rows.filter((row) => `${row.question} ${row.answer}`.toLowerCase().includes(normalizedSearch))
    : rows;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {heroImageUrl ? (
        <ImageBackground source={{ uri: heroImageUrl }} resizeMode="cover" style={styles.heroCard}>
          <View style={styles.heroOverlay}>
            <Text style={styles.eyebrow}>{eyebrow}</Text>
            <Text style={styles.title}>{heroTitle}</Text>
            <Text style={styles.subtitleOnImage}>{heroSubtitle}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.heroFallback}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{heroTitle}</Text>
          <Text style={styles.subtitle}>{heroSubtitle}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {description ? <Text style={styles.answer}>{description}</Text> : null}
        <TextInput autoCapitalize="none" onChangeText={setSearchQuery} placeholder={searchPlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.searchInput} value={searchQuery} />
      </View>

      {filteredRows.length > 0 ? filteredRows.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <View key={`${item.id}-${item.question}`} style={styles.card}>
            <Pressable accessibilityRole="button" onPress={() => setOpenIndex(isOpen ? null : index)} style={styles.questionRow}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.toggle}>{isOpen ? '−' : '+'}</Text>
            </Pressable>
            {isOpen ? <Text style={styles.answer}>{item.answer}</Text> : null}
          </View>
        );
      }) : (
        <View style={styles.card}><Text style={styles.answer}>{noResultsText}</Text></View>
      )}

      <View style={styles.ctaCard}>
        <Text style={styles.sectionTitle}>{ctaTitle}</Text>
        <Text style={styles.answer}>{ctaDescription}</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Contact')} style={styles.button}>
          <Text style={styles.buttonText}>{ctaButtonLabel}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { borderRadius: radius.lg, overflow: 'hidden' },
  heroOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', gap: spacing.md, padding: spacing.xl },
  heroFallback: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.xl },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  subtitleOnImage: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  searchInput: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  questionRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  question: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  toggle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['2xl'], lineHeight: typography.lineHeight.normal },
  answer: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  ctaCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: 48, paddingHorizontal: spacing.lg },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});