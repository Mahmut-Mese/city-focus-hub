import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage, submitContactSubmission } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function getString(source: ContentPage | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function ContactScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const page = await fetchContentPage(apiClient, 'contact-page');
      setContent(page);
    } catch {
      setError('We could not load contact content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim();
    const normalizedMessage = message.trim();

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      setFormMessage('Enter your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const response = await submitContactSubmission(apiClient, {
        name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone || undefined,
        message: normalizedMessage,
        sourcePage: 'mobile-contact',
      });
      setFormMessage(response.message || 'Your request has been submitted.');
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
  const formTitle = getString(content, 'formTitle', 'Send an enquiry');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Contact</Text>
          <Text style={styles.title}>{heroTitle}</Text>
          <Text style={styles.subtitle}>{heroSubtitle}</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>{formTitle}</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput editable={!isSubmitting} onChangeText={setName} placeholder="Your name" placeholderTextColor={colors.mutedForeground} style={styles.input} value={name} />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput autoCapitalize="none" autoComplete="email" editable={!isSubmitting} keyboardType="email-address" onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="emailAddress" value={email} />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput editable={!isSubmitting} keyboardType="phone-pad" onChangeText={setPhone} placeholder="Optional" placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="telephoneNumber" value={phone} />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput editable={!isSubmitting} multiline onChangeText={setMessage} placeholder="How can we help?" placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.messageInput]} textAlignVertical="top" value={message} />
          </View>
          {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
          <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit} style={[styles.button, isSubmitting && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>{isSubmitting ? 'Submitting…' : 'Submit enquiry'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  formCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  fieldGroup: { gap: spacing.xs },
  label: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  messageInput: { minHeight: 120, paddingTop: spacing.md },
  formMessage: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});
