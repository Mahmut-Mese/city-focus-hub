import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage, fetchSiteSetting, getMediaUrl, submitContactSubmission } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type UnknownRecord = Record<string, unknown>;
type SocialLink = { label: string; href: string };

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

function parseSocialLinks(source: unknown): SocialLink[] {
  const raw = unwrapRecord(source).socialLinks;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): SocialLink | null => {
      const record = unwrapRecord(item);
      const hrefValue = record.href ?? record.url;
      const labelValue = record.label ?? record.name ?? record.title ?? hrefValue;
      const href = typeof hrefValue === 'string' ? hrefValue.trim() : '';
      const label = typeof labelValue === 'string' ? labelValue.trim() : '';
      if (!href || !label || !/^https?:\/\//i.test(href)) return null;
      return { label, href };
    })
    .filter((item): item is SocialLink => item !== null);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactScreen(): JSX.Element {
  const apiBaseUrl = getApiBaseUrl();
  const apiClient = useMemo(() => createApiClient({ baseUrl: apiBaseUrl }), [apiBaseUrl]);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [siteSettings, setSiteSettings] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [mapMessage, setMapMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [page, settings] = await Promise.all([
        fetchContentPage(apiClient, 'contact-page'),
        fetchSiteSetting(apiClient).catch(() => null),
      ]);
      setContent(page);
      setSiteSettings(settings);
    } catch {
      setError('We could not load contact content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => { void loadContent(); }, [loadContent]);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim();
    const normalizedMessage = message.trim();
    if (!normalizedName) { setFormMessage('Name is required.'); return; }
    if (!normalizedEmail) { setFormMessage('Email is required.'); return; }
    if (!isValidEmail(normalizedEmail)) { setFormMessage('Enter a valid email address.'); return; }
    if (!normalizedMessage) { setFormMessage('Message is required.'); return; }
    setIsSubmitting(true);
    setFormMessage(null);
    try {
      await submitContactSubmission(apiClient, { name: normalizedName, email: normalizedEmail, phone: normalizedPhone || undefined, message: normalizedMessage, sourcePage: 'mobile-contact' });
      setFormMessage('Your request has been submitted.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setFormMessage('We could not submit your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingState message="Loading contact content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(content, 'heroTitle', 'Contact The Leadenhall Works');
  const heroSubtitle = getString(content, 'heroSubtitle', 'Tell us what you need and the team will get back to you.');
  const heroImageUrl = getMediaUrl(getNested(content, 'heroBackgroundImage'), apiBaseUrl);
  const introEyebrow = getString(content, 'introEyebrow', 'Contact');
  const introTitle = getString(content, 'introTitle', '');
  const addressCardTitle = getString(content, 'addressCardTitle', 'Address');
  const emailCardTitle = getString(content, 'emailCardTitle', 'Email');
  const phoneCardTitle = getString(content, 'phoneCardTitle', 'Phone');
  const mapTitle = getString(content, 'mapTitle', 'Find us');
  const address = getString(siteSettings, 'address', 'Leadenhall, London');
  const contactEmail = getString(siteSettings, 'contactEmail', 'hello@leadenhallworks.com');
  const contactPhone = getString(siteSettings, 'contactPhone', 'Contact the team for phone support');
  const mapDescription = getString(content, 'mapDescription', address);
  const form = getNested(content, 'form');
  const formTitle = getString(form, 'title', 'Send an enquiry');
  const namePlaceholder = getString(form, 'namePlaceholder', 'Your name');
  const phonePlaceholder = getString(form, 'phonePlaceholder', 'Optional');
  const emailPlaceholder = getString(form, 'emailPlaceholder', 'you@example.com');
  const messagePlaceholder = getString(form, 'messagePlaceholder', 'How can we help?');
  const submitLabel = getString(form, 'submitLabel', 'Submit enquiry');
  const socialLinks = parseSocialLinks(siteSettings);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleOpenInMaps = async () => {
    setMapMessage(null);
    try { await Linking.openURL(mapUrl); } catch { setMapMessage('Unable to open Google Maps right now. Please try again later.'); }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {heroImageUrl ? (
          <ImageBackground source={{ uri: heroImageUrl }} resizeMode="cover" style={styles.heroCard}>
            <View style={styles.heroOverlay}>
              <Text style={styles.eyebrow}>{introEyebrow}</Text>
              <Text style={styles.title}>{heroTitle}</Text>
              <Text style={styles.subtitleOnImage}>{heroSubtitle}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.heroFallback}>
            <Text style={styles.eyebrow}>{introEyebrow}</Text>
            <Text style={styles.title}>{heroTitle}</Text>
            <Text style={styles.subtitle}>{heroSubtitle}</Text>
          </View>
        )}

        {introTitle ? <View style={styles.infoCard}><Text style={styles.sectionTitle}>{introTitle}</Text></View> : null}

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}><Text style={styles.infoTitle}>{addressCardTitle}</Text><Text style={styles.infoValue}>{address}</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoTitle}>{emailCardTitle}</Text><Text style={styles.infoValue}>{contactEmail}</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoTitle}>{phoneCardTitle}</Text><Text style={styles.infoValue}>{contactPhone}</Text></View>
        </View>

        {socialLinks.length > 0 ? (
          <View style={styles.socialLinksContainer}>
            {socialLinks.map((link) => (
              <Pressable key={`${link.label}-${link.href}`} accessibilityRole="link" onPress={() => Linking.openURL(link.href)} style={styles.socialChip}>
                <Text style={styles.socialChipText}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={styles.mapCard}>
          <Text style={styles.sectionTitle}>{mapTitle}</Text>
          <Text style={styles.subtitle}>{mapDescription}</Text>
          <Pressable accessibilityRole="button" onPress={handleOpenInMaps} style={styles.button}><Text style={styles.buttonText}>Open in Google Maps</Text></Pressable>
          {mapMessage ? <Text style={styles.formMessage}>{mapMessage}</Text> : null}
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>{formTitle}</Text>
          <View style={styles.fieldGroup}><Text style={styles.label}>Name</Text><TextInput editable={!isSubmitting} onChangeText={setName} placeholder={namePlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.input} value={name} /></View>
          <View style={styles.fieldGroup}><Text style={styles.label}>Phone</Text><TextInput editable={!isSubmitting} keyboardType="phone-pad" onChangeText={setPhone} placeholder={phonePlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="telephoneNumber" value={phone} /></View>
          <View style={styles.fieldGroup}><Text style={styles.label}>Email</Text><TextInput autoCapitalize="none" autoComplete="email" editable={!isSubmitting} keyboardType="email-address" onChangeText={setEmail} placeholder={emailPlaceholder} placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="emailAddress" value={email} /></View>
          <View style={styles.fieldGroup}><Text style={styles.label}>Message</Text><TextInput editable={!isSubmitting} multiline onChangeText={setMessage} placeholder={messagePlaceholder} placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.messageInput]} textAlignVertical="top" value={message} /></View>
          {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
          <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit} style={[styles.button, isSubmitting && styles.buttonDisabled]}><Text style={styles.buttonText}>{isSubmitting ? 'Submitting…' : submitLabel}</Text></Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { borderRadius: radius.lg, overflow: 'hidden' },
  heroOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', gap: spacing.md, padding: spacing.xl },
  heroFallback: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.xl },
  infoGrid: { gap: spacing.md },
  infoCard: { backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.xs, padding: spacing.lg },
  infoTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  infoValue: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  mapCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  subtitleOnImage: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  formCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  fieldGroup: { gap: spacing.xs },
  label: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  messageInput: { minHeight: 120, paddingTop: spacing.md },
  formMessage: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: 48, paddingHorizontal: spacing.lg },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  socialLinksContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  socialChip: { backgroundColor: colors.secondary, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  socialChipText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm },
});