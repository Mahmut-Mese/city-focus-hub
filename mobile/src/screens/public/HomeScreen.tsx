import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { fetchContentPage, fetchSiteSetting, submitContactSubmission } from '../../api/content-api';
import { useAuth } from '../../auth/AuthProvider';
import { HomeCard, HomeChip, HomeIcon, HomeImage, HomeSectionHeader } from '../../components/home';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { parseHomeContent, parseSiteSettings } from '../../utils/home-content-parser';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type MenuLink = {
  label: string;
  path: string;
};

const EMPTY_FORM: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

async function openExternalUrl(url: string): Promise<void> {
  if (!url) return;
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  } catch {
    // External links are best-effort only.
  }
}

function buildContactMessage(formState: ContactFormState): string {
  const message = formState.message.trim();
  const subject = formState.subject.trim();
  return subject ? `Subject: ${subject}\n\n${message}` : message;
}

function LeadenhallLogo({ inverted = false }: { inverted?: boolean }): JSX.Element {
  if (!inverted) {
    return (
      <View accessibilityLabel="THE LEADENHALL WORKS" accessible style={styles.topLogoTile}>
        <View style={[styles.topLogoStroke, styles.topLogoLeft]} />
        <View style={[styles.topLogoStroke, styles.topLogoRoof]} />
        <View style={[styles.topLogoStroke, styles.topLogoCentre]} />
        <View style={[styles.topLogoStroke, styles.topLogoInnerRoof]} />
        <View style={[styles.topLogoStroke, styles.topLogoInner]} />
        <View style={[styles.topLogoStroke, styles.topLogoCrossbar]} />
        <View style={[styles.topLogoStroke, styles.topLogoRight]} />
      </View>
    );
  }
  const strokeColor = inverted ? colors.primaryForeground : colors.primary;
  const textColor = inverted ? colors.primaryForeground : colors.foreground;

  const isFooter = inverted;
  const markSize = isFooter ? 48 : 42;
  
  const wordStyleBase = {
    color: textColor,
    fontFamily: typography.fontFamily.editorial,
    fontWeight: '400' as const,
  };
  
  const wordStyle = isFooter
    ? { fontSize: 10, lineHeight: 11, letterSpacing: 0.8 }
    : { fontSize: 8, lineHeight: 9, letterSpacing: 0.6 };
    
  const wordStyleMiddle = isFooter
    ? { fontSize: 14, lineHeight: 15 }
    : { fontSize: 11.5, lineHeight: 12.5 };
    
  const wordStyleBottom = isFooter
    ? { fontSize: 14, lineHeight: 15 }
    : { fontSize: 11.5, lineHeight: 12.5 };

  return (
    <View style={[styles.brandRow, !isFooter && { maxWidth: 160, flexShrink: 1 }]}>
      <View style={[styles.brandMark, { borderColor: strokeColor, width: markSize, height: markSize }]}>
        <View style={[styles.brandLineVertical, { backgroundColor: strokeColor, left: '28%', top: '22%', height: '56%' }]} />
        <View style={[styles.brandLineDiagonal, { backgroundColor: strokeColor, left: '28%', top: '22%', width: '56%' }]} />
        <View style={[styles.brandLineCornerVertical, { backgroundColor: strokeColor, left: '72%', top: '64%', height: '14%' }]} />
        <View style={[styles.brandLineCornerHorizontal, { backgroundColor: strokeColor, left: '72%', top: '64%', width: '14%' }]} />
      </View>
      <View style={[styles.brandWordmark, !isFooter && { maxWidth: 116, flexShrink: 1 }]}>
        <Text style={[wordStyleBase, wordStyle]}>THE</Text>
        <Text style={[wordStyleBase, wordStyle, wordStyleMiddle]}>LEADENHALL</Text>
        <Text style={[wordStyleBase, wordStyle, wordStyleBottom]}>WORKS</Text>
      </View>
    </View>
  );
}

export function HomeScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const { isAuthenticated } = useAuth();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [homeSource, setHomeSource] = useState<Record<string, unknown> | null>(null);
  const [siteSource, setSiteSource] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<ContactFormState>(EMPTY_FORM);
  const [formMessage, setFormMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [homePage, siteSetting] = await Promise.all([
        fetchContentPage(apiClient, 'homepage'),
        fetchSiteSetting(apiClient),
      ]);
      setHomeSource(homePage);
      setSiteSource(siteSetting);
    } catch {
      setError('We could not load the home page content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const navigateToPath = useCallback((path: string) => {
    switch (path) {
      case '/pricing':
        navigation.navigate('Pricing');
        return;
      case '/meeting-rooms':
        navigation.navigate('MeetingRooms');
        return;
      case '/virtual-office':
        navigation.navigate('VirtualOffice');
        return;
      case '/about':
        navigation.navigate('About');
        return;
      case '/faq':
        navigation.navigate('FAQ');
        return;
      case '/blog':
        navigation.navigate('BlogList');
        return;
      case '/contact':
        navigation.navigate('Contact');
        return;
      case '/privacy':
        navigation.navigate('Privacy');
        return;
      case '/terms':
        navigation.navigate('Terms');
        return;
      default:
        navigation.navigate('Home');
    }
  }, [navigation]);

  const handleMenuLinkPress = useCallback((path: string) => {
    setIsMenuOpen(false);
    navigateToPath(path);
  }, [navigateToPath]);

  const handleAccountPress = useCallback(() => {
    setIsMenuOpen(false);
    const rootNavigation = navigation.getParent<RootNavigation>();
    if (isAuthenticated) {
      rootNavigation?.navigate('Member', { screen: 'Dashboard' });
      return;
    }
    rootNavigation?.navigate('Auth', { screen: 'Login' });
  }, [isAuthenticated, navigation]);

  if (isLoading) {
    return <LoadingState message="Loading home content…" />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadContent} />;
  }

  const home = parseHomeContent(homeSource);
  const siteSettings = parseSiteSettings(siteSource);
  const videoAvailable = home.hero.videoUrl.length > 0;
  const mapAvailable = home.visit.mapUrl.length > 0;

  const fallbackMenu: MenuLink[] = [
    { label: 'Membership', path: '/pricing' },
    { label: 'Meeting Rooms', path: '/meeting-rooms' },
    { label: 'Contact', path: '/contact' },
  ];
  const parsedLinks = siteSettings.navigation.links.length > 0 ? siteSettings.navigation.links : fallbackMenu;
  const menuLinks: MenuLink[] = [...parsedLinks];
  if (siteSettings.navigation.ctaLabel && siteSettings.navigation.ctaPath) {
    menuLinks.push({ label: siteSettings.navigation.ctaLabel, path: siteSettings.navigation.ctaPath });
  }

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFormMessage('');
  };

  const handleContactSubmit = async () => {
    if (isSubmitting) return;
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormMessage('Name, email, and message are required.');
      return;
    }

    setIsSubmitting(true);
    setFormMessage('');
    try {
      await submitContactSubmission(apiClient, {
        name: formState.name.trim(),
        email: formState.email.trim(),
        message: buildContactMessage(formState),
        sourcePage: 'homepage',
      });
      setFormState(EMPTY_FORM);
      setFormMessage('Thanks — your message has been sent.');
    } catch {
      setFormMessage('We could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <LeadenhallLogo />
        <View style={styles.headerSpacer} />
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Account"
          testID="home-account-button"
          style={styles.headerIcon}
          onPress={handleAccountPress}
        >
          <HomeIcon name="User" size={16} />
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Menu"
          accessibilityState={{ expanded: isMenuOpen }}
          testID="home-menu-button"
          style={styles.headerIcon}
          onPress={() => setIsMenuOpen((current) => !current)}
        >
          <HomeIcon name="Menu" size={18} />
        </Pressable>
      </View>

      {isMenuOpen ? (
        <View style={styles.menuPanel}>
          {menuLinks.map((link) => (
            <Pressable
              key={link.path}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={link.label}
              testID={`home-menu-link-${link.path.replace(/^\//, '').replace(/\//g, '-') || 'home'}`}
              style={styles.menuItem}
              onPress={() => handleMenuLinkPress(link.path)}
            >
              <Text style={styles.menuItemText}>{link.label}</Text>
              <HomeIcon name="ArrowRight" size={12} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <ImageBackground source={{ uri: home.hero.backgroundImage }} resizeMode="cover" style={styles.hero} imageStyle={styles.heroImage} testID="home-hero-section">
        <View style={styles.heroOverlay} />
        <View style={styles.heroInner}>
          <Text style={styles.heroTitle}>{home.hero.title}</Text>
          <Text style={styles.heroSubtitle}>{home.hero.subtitle}</Text>
          <View style={styles.heroButtons}>
            <Pressable style={styles.primaryButton} onPress={() => navigateToPath(home.hero.primaryCtaPath)} accessibilityRole="button">
              <Text style={styles.primaryButtonText}>{home.hero.primaryCtaLabel}</Text>
            </Pressable>
            <Pressable
              style={[styles.secondaryButton, !videoAvailable ? styles.disabledButton : null]}
              disabled={!videoAvailable}
              onPress={() => void openExternalUrl(home.hero.videoUrl)}
              accessibilityRole="button"
              accessibilityState={{ disabled: !videoAvailable }}
            >
              <HomeIcon name="Play" size={12} color={colors.primaryForeground} />
              <Text style={styles.secondaryButtonText}>{home.hero.secondaryCtaLabel}</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {home.featureChips.map((chip) => <HomeChip key={`${chip.icon}-${chip.text}`} icon={chip.icon} label={chip.text} inverted />)}
          </ScrollView>
        </View>
      </ImageBackground>

      <View style={styles.graySection} testID="home-services-section">
        <HomeSectionHeader eyebrow={home.servicesEyebrow} kicker={home.servicesKicker} />
        {home.services.map((service) => (
          <HomeCard key={service.title} padded={false} onPress={() => navigateToPath(service.link)} accessibilityLabel={service.title}>
            <HomeImage uri={service.image} accessibilityLabel={service.title} containerStyle={styles.serviceImageWrap} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDescription}>{service.description}</Text>
              <View style={styles.cardLinkRow}>
                <Text style={styles.cardLinkText}>More View • Details</Text>
                <View style={styles.arrowCircle}><HomeIcon name="ArrowRight" size={13} /></View>
              </View>
            </View>
          </HomeCard>
        ))}
      </View>

      <View style={styles.whiteSection} testID="home-about-highlight-section">
        <HomeSectionHeader eyebrow={home.aboutHighlight.eyebrow} title={home.aboutHighlight.title} />
        <Text style={styles.sectionDescription}>{home.aboutHighlight.description}</Text>
        {home.aboutHighlight.benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitRow}>
            <View style={styles.checkCircle}><HomeIcon name="Check" size={11} color={colors.primaryForeground} /></View>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
        <View style={styles.inlineButtons}>
          <Pressable style={styles.darkSmallButton} onPress={() => navigateToPath(home.aboutHighlight.primaryCtaPath)}>
            <Text style={styles.darkSmallButtonText}>{home.aboutHighlight.primaryCtaLabel}</Text>
          </Pressable>
          <Pressable style={styles.lightSmallButton} onPress={() => navigateToPath(home.aboutHighlight.secondaryCtaPath)}>
            <Text style={styles.lightSmallButtonText}>{home.aboutHighlight.secondaryCtaLabel}</Text>
          </Pressable>
        </View>
        <HomeImage uri={home.aboutHighlight.image} accessibilityLabel={home.aboutHighlight.title} containerStyle={styles.aboutImage} />
      </View>

      <View style={styles.graySection} testID="home-features-section">
        <HomeSectionHeader eyebrow={home.whyChooseEyebrow} kicker={home.whyChooseKicker} title={home.whyChooseTitle} centeredTitle />
        {home.whyChooseItems.map((item) => (
          <HomeCard key={item.title}>
            <HomeIcon name={item.icon} size={16} color={colors.primaryForeground} backgroundColor={colors.primary} style={styles.featureIcon} />
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </HomeCard>
        ))}
      </View>

      <View style={styles.whiteSection} testID="home-testimonials-section">
        <HomeSectionHeader eyebrow={home.testimonialsEyebrow} kicker={home.testimonialsKicker} title={home.testimonialsTitle} centeredTitle />
        {home.testimonials.map((testimonial) => (
          <HomeCard key={testimonial.name}>
            <View style={styles.stars}>{Array.from({ length: testimonial.stars }, (_, index) => <HomeIcon key={`${testimonial.name}-${index}`} name="Star" size={13} />)}</View>
            <Text style={styles.quoteText}>"{testimonial.content}"</Text>
            <Text style={styles.testimonialName}>{testimonial.name}</Text>
            <Text style={styles.testimonialRole}>{testimonial.role}</Text>
          </HomeCard>
        ))}
      </View>

      <View style={styles.graySection} testID="home-gallery-section">
        <HomeSectionHeader eyebrow={home.galleryEyebrow} kicker={home.galleryKicker} title={home.galleryTitle} centeredTitle />
        {home.galleryImages.map((image, index) => (
          <HomeImage key={`${image.image}-${index}`} uri={image.image} accessibilityLabel={image.alt} containerStyle={index === 0 ? styles.galleryLarge : styles.gallerySmall} />
        ))}
      </View>

      <View style={styles.whiteSection} testID="home-contact-section">
        <HomeCard style={styles.contactCard}>
          <View style={styles.contactHeaderRow}>
            <Text style={styles.contactTitle}>{home.contactForm.title}</Text>
            <Text style={styles.kickerText}>Contact</Text>
          </View>
          <Text style={styles.sectionDescription}>{home.contactForm.description}</Text>
          <TextInput style={styles.input} placeholder={home.contactForm.namePlaceholder} value={formState.name} onChangeText={(value) => handleFieldChange('name', value)} />
          <TextInput style={styles.input} placeholder={home.contactForm.emailPlaceholder} value={formState.email} onChangeText={(value) => handleFieldChange('email', value)} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder={home.contactForm.subjectPlaceholder} value={formState.subject} onChangeText={(value) => handleFieldChange('subject', value)} />
          <TextInput style={[styles.input, styles.messageInput]} placeholder={home.contactForm.messagePlaceholder} value={formState.message} onChangeText={(value) => handleFieldChange('message', value)} multiline />
          {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
          <Pressable
            style={[styles.darkSmallButton, isSubmitting ? styles.disabledButton : null]}
            onPress={() => void handleContactSubmit()}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityState={{ disabled: isSubmitting }}
          >
            <Text style={styles.darkSmallButtonText}>{isSubmitting ? 'Sending…' : home.contactForm.submitLabel}</Text>
          </Pressable>
        </HomeCard>

        <View style={styles.visitCard}>
          <Text style={styles.visitTitle}>{home.visit.title}</Text>
          <InfoRow icon="MapPin" label={home.visit.addressLabel} value={siteSettings.address} />
          <InfoRow icon="Mail" label={home.visit.emailLabel} value={siteSettings.contactEmail} />
          <InfoRow icon="Phone" label={home.visit.phoneLabel} value={siteSettings.contactPhone} />
          <View style={styles.visitDivider} />
          <InfoRow icon="Clock" label={home.visit.openHoursLabel} value={`${home.visit.weekdayHours}\n${home.visit.weekendHours}`} />
          <Pressable style={[styles.visitButton, !mapAvailable ? styles.disabledButton : null]} disabled={!mapAvailable} onPress={() => void openExternalUrl(home.visit.mapUrl)}>
            <Text style={styles.visitButtonText}>{home.visit.mapButtonLabel}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footer} testID="home-footer-section">
        <View style={styles.footerLogoRow}>
          <LeadenhallLogo inverted />
        </View>
        <Text style={styles.footerDescription}>{siteSettings.footer.description || siteSettings.tagline}</Text>
        <FooterLinks title="Services" links={siteSettings.footer.serviceLinks} onPress={navigateToPath} />
        <FooterLinks title="About" links={siteSettings.footer.aboutLinks} onPress={navigateToPath} />
        <FooterLinks title={siteSettings.footer.contactTitle} links={[{ label: siteSettings.address, path: '/contact' }, { label: siteSettings.contactEmail, path: '/contact' }, { label: siteSettings.contactPhone, path: '/contact' }]} onPress={navigateToPath} />
        {siteSettings.footer.socialLinks.length > 0 ? (
          <FooterLinks title="Follow Us" links={siteSettings.footer.socialLinks} onPress={(path) => void openExternalUrl(path)} horizontal />
        ) : null}
        <Text style={styles.copyright}>{siteSettings.footer.copyright}</Text>
        <FooterLinks title="" links={siteSettings.footer.legalLinks} onPress={navigateToPath} horizontal />
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }): JSX.Element {
  return (
    <View style={styles.infoRow}>
      <HomeIcon name={icon} size={15} color={colors.primaryForeground} />
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function FooterLinks({ title, links, onPress, horizontal = false }: { title: string; links: { label: string; path: string }[]; onPress: (path: string) => void; horizontal?: boolean }): JSX.Element {
  return (
    <View style={styles.footerLinkGroup}>
      {title ? <Text style={styles.footerTitle}>{title}</Text> : null}
      <View style={horizontal ? styles.footerHorizontalLinks : styles.footerVerticalLinks}>
        {links.map((link) => (
          <Pressable key={`${link.label}-${link.path}`} onPress={() => onPress(link.path)}>
            <Text style={styles.footerLink}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing['2xl'] },
  header: { alignItems: 'center', backgroundColor: colors.background, borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
   brandRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs },
   brandMark: { borderWidth: 2, position: 'relative' },
   brandLineVertical: { position: 'absolute', width: 2 },
   brandLineDiagonal: { position: 'absolute', transform: [{ rotate: '-29deg' }] },
   brandLineCornerVertical: { position: 'absolute', width: 2 },
    brandLineCornerHorizontal: { position: 'absolute', height: 2 },
    // Top logo styles
    topLogoTile: { backgroundColor: colors.background, borderColor: colors.primary, borderWidth: 1, height: 42, position: 'relative', width: 42 },
    topLogoStroke: { backgroundColor: colors.primary, position: 'absolute' },
    topLogoLeft: { bottom: 4, left: 10, top: 14, width: 3 },
    topLogoRoof: { height: 4, left: 10, top: 13, transform: [{ rotate: '-29deg' }], width: 23 },
    topLogoCentre: { bottom: 4, left: 28, top: 7, width: 3 },
    topLogoInnerRoof: { height: 4, left: 15, top: 20, transform: [{ rotate: '-28deg' }], width: 14 },
    topLogoInner: { bottom: 4, left: 22, top: 20, width: 3 },
    topLogoCrossbar: { height: 3, left: 28, top: 24, width: 11 },
    topLogoRight: { bottom: 4, left: 38, top: 24, width: 3 },
    brandWordmark: { justifyContent: 'center' },
  headerSpacer: { flex: 1 },
  headerIcon: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.full, borderWidth: 1, height: 38, justifyContent: 'center', width: 38 },
  menuPanel: { backgroundColor: colors.background, borderBottomColor: colors.border, borderBottomWidth: 1, gap: spacing.xs, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  menuItem: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  menuItemText: { color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '600' },
  hero: { minHeight: 560, justifyContent: 'center' },
  heroImage: { backgroundColor: colors.primary },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.58)' },
  heroInner: { gap: spacing.lg, padding: spacing.xl },
  heroTitle: { color: colors.primaryForeground, fontSize: 34, fontWeight: '700', lineHeight: 36 },
  heroSubtitle: { color: 'rgba(255,255,255,0.82)', fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  heroButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  primaryButton: { backgroundColor: colors.primaryForeground, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, alignItems: 'center', justifyContent: 'center', minHeight: 44 },
  primaryButtonText: { color: colors.primary, fontSize: typography.fontSize.xs, fontWeight: '700', lineHeight: 16 },
  secondaryButton: { alignItems: 'center', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.75)', borderRadius: radius.full, borderWidth: 1, flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 44 },
  secondaryButtonText: { color: colors.primaryForeground, fontSize: typography.fontSize.xs, fontWeight: '700', lineHeight: 16 },
  disabledButton: { opacity: 0.45 },
  chipRow: { gap: spacing.sm, paddingRight: spacing.xl },
  graySection: { backgroundColor: '#EFEFEF', gap: spacing.lg, padding: spacing.lg },
  whiteSection: { backgroundColor: colors.background, gap: spacing.lg, padding: spacing.lg },
  serviceImageWrap: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 180 },
  cardBody: { gap: spacing.lg, padding: spacing.lg },
  cardTitle: { color: colors.foreground, fontSize: typography.fontSize['2xl'], fontWeight: '700', lineHeight: 30 },
  cardDescription: { color: colors.mutedForeground, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  cardLinkRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  cardLinkText: { color: colors.mutedForeground, fontSize: typography.fontSize.xs },
  arrowCircle: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.full, borderWidth: 1, height: 30, justifyContent: 'center', width: 30 },
  sectionDescription: { color: colors.mutedForeground, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  benefitRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  checkCircle: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.full, height: 20, justifyContent: 'center', width: 20 },
  benefitText: { color: colors.foreground, fontSize: typography.fontSize.sm },
  inlineButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  darkSmallButton: { alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 40 },
  darkSmallButtonText: { color: colors.primaryForeground, fontSize: typography.fontSize.xs, fontWeight: '700', lineHeight: 16 },
  lightSmallButton: { alignItems: 'center', justifyContent: 'center', borderColor: colors.border, borderRadius: radius.full, borderWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 40 },
  lightSmallButtonText: { color: colors.foreground, fontSize: typography.fontSize.xs, fontWeight: '700', lineHeight: 16 },
  aboutImage: { height: 220 },
  featureIcon: { marginBottom: spacing.md },
  featureTitle: { color: colors.foreground, fontSize: typography.fontSize.lg, fontWeight: '700', marginBottom: spacing.xs },
  stars: { flexDirection: 'row', gap: 2, marginBottom: spacing.sm },
  quoteText: { color: colors.foreground, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal, marginBottom: spacing.md },
  testimonialName: { color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '700' },
  testimonialRole: { color: colors.mutedForeground, fontSize: typography.fontSize.xs },
  galleryLarge: { height: 260 },
  gallerySmall: { height: 170 },
  contactCard: { gap: spacing.md },
  contactHeaderRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  contactTitle: { color: colors.foreground, flex: 1, fontSize: typography.fontSize['2xl'], fontWeight: '700', lineHeight: 30 },
  kickerText: { color: colors.mutedForeground, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontSize: typography.fontSize.sm, minHeight: 44, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  messageInput: { minHeight: 112, textAlignVertical: 'top' },
  formMessage: { color: colors.mutedForeground, fontSize: typography.fontSize.sm },
  visitCard: { backgroundColor: '#111218', borderRadius: radius.lg, gap: spacing.lg, padding: spacing.xl },
  visitTitle: { color: colors.primaryForeground, fontSize: typography.fontSize['2xl'], fontWeight: '700' },
  infoRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md },
  infoTextWrap: { flex: 1 },
  infoLabel: { color: colors.primaryForeground, fontSize: typography.fontSize.sm, fontWeight: '700' },
  infoValue: { color: 'rgba(255,255,255,0.72)', fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  visitDivider: { backgroundColor: 'rgba(255,255,255,0.12)', height: 1 },
  visitButton: { alignSelf: 'flex-start', borderColor: 'rgba(255,255,255,0.25)', borderRadius: radius.full, borderWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  visitButtonText: { color: colors.primaryForeground, fontSize: typography.fontSize.xs },
  footer: { backgroundColor: '#111218', gap: spacing.lg, padding: spacing.xl },
  footerLogoRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },

  footerDescription: { color: 'rgba(255,255,255,0.65)', fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  footerLinkGroup: { gap: spacing.sm },
  footerTitle: { color: colors.primaryForeground, fontSize: typography.fontSize.sm, fontWeight: '700' },
  footerVerticalLinks: { gap: spacing.sm },
  footerHorizontalLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  footerLink: { color: 'rgba(255,255,255,0.65)', fontSize: typography.fontSize.sm },
  copyright: { borderTopColor: 'rgba(255,255,255,0.12)', borderTopWidth: 1, color: 'rgba(255,255,255,0.45)', fontSize: typography.fontSize.xs, paddingTop: spacing.lg, textAlign: 'center' },
});
