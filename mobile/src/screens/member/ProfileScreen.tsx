import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { fetchMemberDashboard, updateMemberProfile, type MemberDashboardPayload, type MemberUser } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';
import { useScrollBottomPadding } from '../../utils/use-scroll-padding';


export function ProfileScreen(): JSX.Element {
  const scrollBottomPadding = useScrollBottomPadding();
  const { refreshSession } = useAuth();
  const [profile, setProfile] = useState<MemberUser | null>(null);
  const [dashboard, setDashboard] = useState<MemberDashboardPayload | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const payload = await fetchMemberDashboard(apiClient);
      const current = payload.user;
      setDashboard(payload);
      setProfile(current);
      setName(current.name);
      setEmail(current.email);
      setPhone(typeof current.phone === 'string' ? current.phone : '');
    } catch {
      setError('We could not load your profile.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const saveProfile = async () => {
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nextPhone = phone.trim();

    if (!nextName || !nextEmail) {
      setMessage('Name and email are required.');
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const updated = await updateMemberProfile(apiClient, { name: nextName, email: nextEmail, phone: nextPhone });
      setProfile(updated);
      setName(updated.name);
      setEmail(updated.email);
      setPhone(typeof updated.phone === 'string' ? updated.phone : '');
      setMessage('Profile updated.');
    } catch {
      setMessage('We could not update your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmSave = () => {
    Alert.alert(
      'Update profile?',
      'Review your details before saving changes to your member profile.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save changes', style: 'default', onPress: () => void saveProfile() },
      ],
    );
  };

  if (isLoading) return <LoadingState message="Loading profile…" />;
  if (error) return <ErrorState message={error} onRetry={loadProfile} />;
  if (!profile) return <EmptyState title="No profile data" message="Your member profile will appear here once available." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, scrollBottomPadding]}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Profile</Text>
        <Text style={styles.title}>{profile.name}</Text>
        <Text style={styles.subtitle}>{profile.email}</Text>
      </View>

      {dashboard && (
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Member Access</Text>
              <Text style={styles.statValue}>{profile.accessStatus || 'N/A'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Subscription</Text>
              <Text style={styles.statValue}>{dashboard.membership?.status || 'None'}</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Current Plan</Text>
              <Text style={styles.statValue}>{dashboard.membership?.planName || 'N/A'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Member Since</Text>
              <Text style={styles.statValue}>{profile.createdAt ? new Date(profile.createdAt as string).toLocaleDateString() : 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.formCard}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput editable={!isSaving} onChangeText={setName} placeholder="Your name" placeholderTextColor={colors.mutedForeground} style={styles.input} value={name} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput autoCapitalize="none" autoComplete="email" editable={!isSaving} keyboardType="email-address" onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="emailAddress" value={email} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput editable={!isSaving} keyboardType="phone-pad" onChangeText={setPhone} placeholder="Optional" placeholderTextColor={colors.mutedForeground} style={styles.input} textContentType="telephoneNumber" value={phone} />
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable accessibilityRole="button" disabled={isSaving} onPress={confirmSave} style={[styles.button, isSaving && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{isSaving ? 'Saving…' : 'Save profile'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  statsCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  statRow: { flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  statBox: { flex: 1 },
  statLabel: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase', marginBottom: spacing.xs },
  statValue: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.normal, textTransform: 'capitalize' },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  formCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  fieldGroup: { gap: spacing.xs },
  label: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});
