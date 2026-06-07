import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage, getMediaUrl, submitContactSubmission } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
type UnknownRecord = Record<string, unknown>;
type GalleryImage = { image: string; alt: string };

function isRecord(value: unknown): value is UnknownRecord { return typeof value === 'object' && value !== null && !Array.isArray(value); }
function unwrapRecord(value: unknown): UnknownRecord {
  if (!isRecord(value)) return {};
  if (isRecord(value.data)) { if (isRecord(value.data.attributes)) return value.data.attributes; return value.data; }
  if (isRecord(value.attributes)) return value.attributes;
  return value;
}
function getString(source: unknown, key: string, fallback = ''): string {
  const value = unwrapRecord(source)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}
function getNested(source: unknown, key: string): unknown { return unwrapRecord(source)[key]; }
function isValidEmail(value: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

function getStringList(source: unknown, key: string): string[] {
  const raw = unwrapRecord(source)[key];
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === 'string') return item.trim();
    const record = unwrapRecord(item);
    return getString(record, 'title', getString(record, 'label', getString(record, 'name', getString(record, 'text', ''))));
  }).filter((item) => item.length > 0);
}

function getGalleryImages(source: unknown, apiBaseUrl: string): GalleryImage[] {
  const raw = unwrapRecord(source).galleryImages;
  if (!Array.isArray(raw)) return [];
  return raw.map((item, index): GalleryImage | null => {
    const record = unwrapRecord(item);
    const image = getMediaUrl(record.image ?? item, apiBaseUrl);
    const alt = getString(record, 'alt', `Gallery image ${index + 1}`);
    return image ? { image, alt } : null;
  }).filter((item): item is GalleryImage => item !== null);
}

export function VirtualOfficeScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const apiBaseUrl = getApiBaseUrl();
  const apiClient = useMemo(() => createApiClient({ baseUrl: apiBaseUrl }), [apiBaseUrl]);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true); setError(null);
    try { setContent(await fetchContentPage(apiClient, 'virtual-office-page')); }
    catch { setError('We could not load virtual office content.'); }
    finally { setIsLoading(false); }
  }, [apiClient]);

  useEffect(() => { void loadContent(); }, [loadContent]);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedMessage = message.trim();
    if (!normalizedName) { setFormMessage('Name is required.'); return; }
    if (!normalizedEmail) { setFormMessage('Email is required.'); return; }
    if (!isValidEmail(normalizedEmail)) { setFormMessage('Enter a valid email address.'); return; }
    if (!normalizedMessage) { setFormMessage('Message is required.'); return; }
    setIsSubmitting(true); setFormMessage(null);
    try {
      await submitContactSubmission(apiClient, { name: normalizedName, email: normalizedEmail, message: normalizedMessage, sourcePage: 'mobile-virtual-office' });
      setFormMessage('Your request has been submitted.'); setName(''); setEmail(''); setMessage('');
    } catch { setFormMessage('We could not submit your message. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  if (isLoading) return <LoadingState message="Loading virtual office content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(content, 'heroTitle', 'Virtual office services');
  const heroSubtitle = getString(content, 'heroSubtitle', 'A professional City of London business presence with practical workspace support.');
  const heroImageUrl = getMediaUrl(getNested(content, 'heroBackgroundImage'), apiBaseUrl);
  const featuredImage = getMediaUrl(getNested(content, 'featuredImage'), apiBaseUrl);
  const overviewTitle = getString(content, 'overviewTitle', 'Overview');
  const overviewText = getString(content, 'overviewText', '');
  const challengeTitle = getString(content, 'challengeTitle', 'Challenges');
  const challengeIntro = getString(content, 'challengeIntro', '');
  const challengeItems = getStringList(content, 'challengeItems');
  const resultTitle = getString(content, 'resultTitle', 'Result');
  const resultText = getString(content, 'resultText', '');
  const galleryImages = getGalleryImages(content, apiBaseUrl);
  const projectInfoTitle = getString(content, 'projectInfoTitle', 'Project info');
  const projectDateLabel = getString(content, 'projectDateLabel', 'Date');
  const projectDateValue = getString(content, 'projectDateValue', '');
  const projectCategoryLabel = getString(content, 'projectCategoryLabel', 'Category');
  const projectCategoryValue = getString(content, 'projectCategoryValue', '');
  const projectWebsiteLabel = getString(content, 'projectWebsiteLabel', 'Website');
  const projectWebsiteValue = getString(content, 'projectWebsiteValue', '');
  const ctaTitle = getString(content, 'ctaTitle', 'Get started');
  const ctaDescription = getString(content, 'ctaDescription', 'Choose a membership plan or contact the team to discuss virtual office support.');
  const ctaButtonLabel = getString(content, 'ctaButtonLabel', 'Contact us');
  const contactForm = getNested(content, 'contactForm');
  const formTitle = getString(contactForm, 'title', 'Send us a message');
  const namePlaceholder = getString(contactForm, 'namePlaceholder', 'Your name');
  const emailPlaceholder = getString(contactForm, 'emailPlaceholder', 'you@example.com');
  const messagePlaceholder = getString(contactForm, 'messagePlaceholder', 'Tell us what you need');
  const submitLabel = getString(contactForm, 'submitLabel', 'Submit');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {heroImageUrl ? (
        <ImageBackground source={{ uri: heroImageUrl }} resizeMode="cover" style={styles.heroCard}><View style={styles.heroOverlay}><Text style={styles.eyebrow}>Virtual office</Text><Text style={styles.title}>{heroTitle}</Text><Text style={styles.subtitleOnImage}>{heroSubtitle}</Text></View></ImageBackground>
      ) : (
        <View style={styles.heroFallback}><Text style={styles.eyebrow}>Virtual office</Text><Text style={styles.title}>{heroTitle}</Text><Text style={styles.subtitle}>{heroSubtitle}</Text></View>
      )}

      {featuredImage ? <Image accessibilityLabel={heroTitle} resizeMode="cover" source={{ uri: featuredImage }} style={styles.featuredImage} /> : null}

      {(overviewTitle || overviewText) ? <View style={styles.sectionCard}><Text style={styles.sectionTitle}>{overviewTitle}</Text>{overviewText ? <Text style={styles.body}>{overviewText}</Text> : null}</View> : null}
      {(challengeTitle || challengeIntro || challengeItems.length > 0) ? <View style={styles.sectionCard}><Text style={styles.sectionTitle}>{challengeTitle}</Text>{challengeIntro ? <Text style={styles.body}>{challengeIntro}</Text> : null}{challengeItems.map((item) => <View key={item} style={styles.bulletRow}><View style={styles.bullet} /><Text style={styles.body}>{item}</Text></View>)}</View> : null}
      {(resultTitle || resultText) ? <View style={styles.sectionCard}><Text style={styles.sectionTitle}>{resultTitle}</Text>{resultText ? <Text style={styles.body}>{resultText}</Text> : null}</View> : null}

      {galleryImages.length > 0 ? <View style={styles.sectionCard}><Text style={styles.sectionTitle}>Gallery</Text>{galleryImages.map((item) => <View key={item.image} style={styles.galleryCard}><Image accessibilityLabel={item.alt} resizeMode="cover" source={{ uri: item.image }} style={styles.galleryImage} />{item.alt ? <Text style={styles.caption}>{item.alt}</Text> : null}</View>)}</View> : null}

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{projectInfoTitle}</Text>
        {projectDateValue ? <Text style={styles.body}>{projectDateLabel}: {projectDateValue}</Text> : null}
        {projectCategoryValue ? <Text style={styles.body}>{projectCategoryLabel}: {projectCategoryValue}</Text> : null}
        {projectWebsiteValue ? <Text style={styles.body}>{projectWebsiteLabel}: {projectWebsiteValue}</Text> : null}
      </View>

      <View style={styles.ctaCard}>
        <Text style={styles.sectionTitle}>{ctaTitle}</Text><Text style={styles.body}>{ctaDescription}</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Pricing')} style={styles.primaryButton}><Text style={styles.primaryButtonText}>View membership plans</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Contact')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>{ctaButtonLabel}</Text></Pressable>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{formTitle}</Text>
        <View style={styles.fieldGroup}><Text style={styles.label}>Name</Text><TextInput editable={!isSubmitting} onChangeText={setName} placeholder={namePlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.input} value={name} /></View>
        <View style={styles.fieldGroup}><Text style={styles.label}>Email</Text><TextInput autoCapitalize="none" editable={!isSubmitting} keyboardType="email-address" onChangeText={setEmail} placeholder={emailPlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.input} value={email} /></View>
        <View style={styles.fieldGroup}><Text style={styles.label}>Message</Text><TextInput editable={!isSubmitting} multiline onChangeText={setMessage} placeholder={messagePlaceholder} placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.messageInput]} textAlignVertical="top" value={message} /></View>
        {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
        <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit} style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]}><Text style={styles.primaryButtonText}>{isSubmitting ? 'Submitting…' : submitLabel}</Text></Pressable>
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
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  subtitleOnImage: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  featuredImage: { borderRadius: radius.lg, height: 220, width: '100%' },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  ctaCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  body: { color: colors.foreground, flexShrink: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  galleryCard: { gap: spacing.xs },
  galleryImage: { borderRadius: radius.md, height: 180, width: '100%' },
  caption: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: 46, paddingHorizontal: spacing.lg },
  primaryButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700' },
  secondaryButton: { alignItems: 'center', backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 46, paddingHorizontal: spacing.lg },
  secondaryButtonText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700' },
  fieldGroup: { gap: spacing.xs },
  label: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600' },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 46, paddingHorizontal: spacing.md },
  messageInput: { minHeight: 120, paddingTop: spacing.md },
  formMessage: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm },
  buttonDisabled: { opacity: 0.65 },
});