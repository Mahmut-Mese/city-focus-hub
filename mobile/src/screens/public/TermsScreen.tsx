import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;

type LegalSection = { title?: unknown; body?: unknown };

function getString(source: ContentPage | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function optionalString(source: ContentPage | null, key: string): string | null {
  const value = source?.[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getSections(source: ContentPage | null): Array<{ title?: string; body?: string }> {
  const value = source?.sections;
  if (!Array.isArray(value)) return [];

  const sections: Array<{ title?: string; body?: string }> = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const section = item as LegalSection;
    const title = typeof section.title === 'string' ? section.title.trim() : '';
    const body = typeof section.body === 'string' ? section.body.trim() : '';
    if (title || body) {
      sections.push({
        ...(title ? { title } : {}),
        ...(body ? { body } : {}),
      });
    }
  }

  return sections;
}

export function TermsScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const page = await fetchContentPage(apiClient, 'terms-page');
      setContent(page);
    } catch {
      setError('We could not load the terms.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading terms…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(content, 'heroTitle', getString(content, 'title', 'Terms and Conditions'));
  const heroSubtitle = optionalString(content, 'heroSubtitle');
  const introText = optionalString(content, 'introText');
  const effectiveDateLabel = optionalString(content, 'effectiveDateLabel');
  const effectiveDateValue = optionalString(content, 'effectiveDateValue') ?? optionalString(content, 'updatedAt') ?? optionalString(content, 'lastUpdated');
  const contactTitle = optionalString(content, 'contactTitle');
  const contactBody = optionalString(content, 'contactBody');
  const contactButtonLabel = optionalString(content, 'contactButtonLabel');
  const sections = getSections(content);
  const body = getString(content, 'body', getString(content, 'content', 'Terms content is being prepared. Please contact the team if you need a copy of our current terms and conditions.'));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Legal</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        {heroSubtitle ? <Text style={styles.subtitle}>{heroSubtitle}</Text> : null}
        {effectiveDateLabel && effectiveDateValue ? <Text style={styles.subtitle}>{effectiveDateLabel}: {effectiveDateValue}</Text> : null}
      </View>
      {introText ? (
        <View style={styles.legalCard}>
          <Text style={styles.body}>{introText}</Text>
        </View>
      ) : null}
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <View key={`${section.title ?? 'section'}-${index}`} style={styles.legalCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNumberBubble}>
                <Text style={styles.sectionNumberText}>{index + 1}</Text>
              </View>
              {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
            </View>
            {section.body ? <Text style={styles.body}>{section.body}</Text> : null}
          </View>
        ))
      ) : (
        <View style={styles.legalCard}>
          <Text style={styles.body}>{body}</Text>
        </View>
      )}
      {contactTitle || contactBody || contactButtonLabel ? (
        <View style={styles.contactCard}>
          {contactTitle ? <Text style={styles.sectionTitle}>{contactTitle}</Text> : null}
          {contactBody ? <Text style={styles.body}>{contactBody}</Text> : null}
          {contactButtonLabel ? (
            <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Contact')} style={styles.contactButton}>
              <Text style={styles.contactButtonText}>{contactButtonLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
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
  legalCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, padding: spacing.lg },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  sectionNumberBubble: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.full, height: 24, justifyContent: 'center', width: 24 },
  sectionNumberText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  sectionTitle: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.relaxed },
  contactCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  contactButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: 44, paddingHorizontal: spacing.lg },
  contactButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
});
