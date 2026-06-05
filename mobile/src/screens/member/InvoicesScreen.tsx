import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { fetchMemberInvoices, type MemberInvoice } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';


function formatMoney(minor?: number, currency = 'GBP'): string {
  if (typeof minor !== 'number') return 'Amount unavailable';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(minor / 100);
}

function formatDate(value?: string | null): string {
  if (!value) return 'Date unavailable';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function getInvoiceUrl(invoice: MemberInvoice): { url: string | null; type: 'pdf' | 'hosted' | null } {
  const pdfUrl = typeof invoice.invoicePdf === 'string' && invoice.invoicePdf.startsWith('https://') ? invoice.invoicePdf : null;
  if (pdfUrl) return { url: pdfUrl, type: 'pdf' };
  const hostedUrl = typeof invoice.hostedInvoiceUrl === 'string' && invoice.hostedInvoiceUrl.startsWith('https://') ? invoice.hostedInvoiceUrl : null;
  return hostedUrl ? { url: hostedUrl, type: 'hosted' } : { url: null, type: null };
}

export function InvoicesScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const [invoices, setInvoices] = useState<MemberInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMessage, setOpenMessage] = useState<string | null>(null);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadInvoices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOpenMessage(null);
    try {
      setInvoices(await fetchMemberInvoices(apiClient));
    } catch {
      setError('We could not load your invoices.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadInvoices();
  }, [loadInvoices]);

  const openInvoice = async (invoice: MemberInvoice) => {
    const { url } = getInvoiceUrl(invoice);
    if (!url) {
      setOpenMessage('No invoice URL is available for this invoice.');
      return;
    }

    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      setOpenMessage('This invoice link could not be opened on this device.');
      return;
    }

    await Linking.openURL(url);
  };

  if (isLoading) return <LoadingState message="Loading invoices…" />;
  if (error) return <ErrorState message={error} onRetry={loadInvoices} />;
  if (invoices.length === 0) return <EmptyState title="No invoices yet" message="Your invoices will appear here once payments are created." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Billing</Text>
        <Text style={styles.title}>Invoices</Text>
        <Text style={styles.subtitle}>View invoice status and open invoice links securely.</Text>
      </View>

      {openMessage ? <Text style={styles.message}>{openMessage}</Text> : null}

      {invoices.map((invoice) => {
        const invoiceNumber = typeof invoice.invoiceNumber === 'string' && invoice.invoiceNumber ? invoice.invoiceNumber : `Invoice ${invoice.id}`;
        const currency = typeof invoice.currency === 'string' ? invoice.currency : 'GBP';
        const { url, type } = getInvoiceUrl(invoice);
        const openText = type === 'pdf' ? 'Open PDF' : type === 'hosted' ? 'Open hosted invoice' : 'Open invoice';
        const description = typeof invoice.description === 'string' ? invoice.description : 'No description provided';
        const displayDate = invoice.paidAt ? `Paid ${formatDate(typeof invoice.paidAt === 'string' ? invoice.paidAt : undefined)}` : `Created ${formatDate(invoice.createdAt)}`;
        
        return (
          <View key={String(invoice.id)} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.itemTitle}>{invoiceNumber}</Text>
              <Text style={styles.status}>{invoice.status}</Text>
            </View>
            <Text style={styles.meta}>{description}</Text>
            <Text style={styles.meta}>{displayDate}</Text>
            <Text style={styles.amount}>{formatMoney(invoice.totalMinor, currency)}</Text>
            <Pressable accessibilityRole="button" onPress={() => void openInvoice(invoice)} style={styles.button}>
              <Text style={styles.buttonText}>{openText}</Text>
            </Pressable>
          </View>
        );
      })}
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
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  row: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  itemTitle: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  status: { backgroundColor: colors.secondary, borderRadius: radius.full, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, textTransform: 'capitalize' },
  meta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  amount: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
});
