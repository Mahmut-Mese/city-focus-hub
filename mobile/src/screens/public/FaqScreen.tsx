import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchContentPage, fetchFaqItems } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function getString(source: ContentPage | ContentCollectionItem | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function FaqScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [items, setItems] = useState<ContentCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading FAQ content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Frequently asked questions');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Answers about coworking, meeting rooms, memberships, and services.');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>FAQ</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>

      {items.length > 0 ? items.map((item, index) => {
        const question = getString(item, 'question', `Question ${index + 1}`);
        const answer = getString(item, 'answer', 'Contact the team for more information.');
        return (
          <View key={`${question}-${index}`} style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.answer}>{answer}</Text>
          </View>
        );
      }) : (
        <View style={styles.card}>
          <Text style={styles.question}>Need help?</Text>
          <Text style={styles.answer}>FAQ content is being prepared. Contact the team and we will be happy to help.</Text>
        </View>
      )}
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
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  question: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  answer: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
});
