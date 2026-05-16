# Native Home Web-Parity Spec

- **Last updated:** 2026-05-15
- **Status:** Phase 18 draft
- **Constraints:** native RN only, no WebView, no direct mobile-to-Verkada, payment source-of-truth unchanged, production release blockers unchanged

---

## H180 Section Inventory

Compare web `src/pages-react/Home.tsx` + `src/data/siteContent.ts` against current mobile `HomeScreen.tsx`.

### Current Mobile Gaps and Exact Target Sections

#### 1. Header / Logo / Account / Menu

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Logo | `siteSettings.navigation.logoUrl` | Not implemented | Display logo image from site settings; fallback to text brand |
| Navigation links | `siteSettings.navigation.links` | Not implemented | Horizontal scroll or menu drawer; tap navigates to existing routes |
| CTA button | `siteSettings.navigation.ctaLabel`, `ctaPath` | Not implemented | Primary CTA button (e.g., "Book a Tour") navigates to `/contact` |
| Account menu | N/A (web uses auth state) | Not implemented | Menu icon opens drawer or navigates to auth screen |

**Native behavior:** Header stays fixed at top; logo left-aligned, menu right-aligned; CTA button prominent; account icon for auth state.

---

#### 2. Hero Background Image Overlay with Title / Subtitle / CTA Buttons / Feature Chips

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Background image | `content.hero.backgroundImage` | Not implemented | `ImageBackground` with cover resize mode; dark overlay (`rgba(0,0,0,0.6)`) for text contrast |
| Title | `content.hero.title` | Implemented (line 70) | Large bold white text; matches web size ratio |
| Subtitle | `content.hero.subtitle` | Implemented (line 71) | White/light text below title; max 2-3 lines |
| Primary CTA | `content.hero.primaryCtaLabel`, `primaryCtaPath` | Not implemented | White-filled button; navigates to path (e.g., `/pricing`) |
| Secondary CTA (video) | `content.hero.secondaryCtaLabel`, `videoUrl` | Not implemented | Outlined button; triggers video open behavior (see H183) |
| Feature chips | `content.featureChips[]` | Not implemented | Horizontal row of chips with icon + text; scrollable if overflow |

**Native behavior:** Hero fills screen width; background image loads remotely; overlay ensures text readability; CTAs use TouchableOpacity with proper press states; chips use horizontal ScrollView.

---

#### 3. Services Cards

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Section eyebrow | `content.servicesEyebrow` | Not implemented | Small uppercase label above title |
| Section kicker | `content.servicesKicker` | Not implemented | Small label right-aligned |
| Cards array | `content.services[]` | Not implemented | Vertical or grid list of cards |
| Card image | `service.image` | Not implemented | `Image` with cover resize; aspect ratio 16:9 |
| Card title | `service.title` | Not implemented | Bold title text |
| Card description | `service.description` | Not implemented | Muted description text |
| Card link | `service.link` | Not implemented | Tap navigates to path |

**Native behavior:** Services section with 3 cards; each card has image, title, description, and "More View" indicator; tap navigates to `/pricing`, `/meeting-rooms`, or `/virtual-office`.

---

#### 4. About Highlight

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Eyebrow | `content.aboutHighlight.eyebrow` | Not implemented | Uppercase label |
| Title | `content.aboutHighlight.title` | Not implemented | Large heading |
| Description | `content.aboutHighlight.description` | Not implemented | Body text |
| Benefits list | `content.aboutHighlight.benefits[]` | Partially implemented (featureItems, lines 60-64) | Checkmark + text rows |
| Image | `content.aboutHighlight.image` | Not implemented | `Image` with cover; rounded corners |
| Primary CTA | `content.aboutHighlight.primaryCtaLabel`, `primaryCtaPath` | Not implemented | Black-filled button |
| Secondary CTA | `content.aboutHighlight.secondaryCtaLabel`, `secondaryCtaPath` | Not implemented | Outlined button |

**Native behavior:** Two-column layout on larger screens; single column on mobile; benefits list with checkmark icons; two CTA buttons horizontally.

---

#### 5. Why Choose Feature Cards

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Eyebrow | `content.whyChooseEyebrow` | Not implemented | Uppercase label |
| Kicker | `content.whyChooseKicker` | Not implemented | Right-aligned label |
| Title | `content.whyChooseTitle` | Not implemented | Section heading |
| Items array | `content.whyChooseItems[]` | Not implemented | Grid of feature cards |
| Icon | `item.icon` | Not implemented | Black circle background with icon |
| Item title | `item.title` | Not implemented | Bold title |
| Item description | `item.description` | Not implemented | Muted description |

**Native behavior:** 3-column grid on tablet/desktop; single column on phone; each card has icon, title, description.

---

#### 6. Testimonials

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Eyebrow | `content.testimonialsEyebrow` | Not implemented | Uppercase label |
| Kicker | `content.testimonialsKicker` | Not implemented | Right-aligned label |
| Title | `content.testimonialsTitle` | Not implemented | Section heading |
| Testimonials array | `content.testimonials[]` | Not implemented | Grid of testimonial cards |
| Stars | `testimonial.stars` | Not implemented | Filled star icons (1-5) |
| Content | `testimonial.content` | Not implemented | Quote text |
| Name | `testimonial.name` | Not implemented | Bold name |
| Role | `testimonial.role` | Not implemented | Muted role text |

**Native behavior:** 3-column grid; each card shows star rating, quote, name, role.

---

#### 7. Gallery

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Eyebrow | `content.galleryEyebrow` | Not implemented | Uppercase label |
| Kicker | `content.galleryKicker` | Not implemented | Right-aligned label |
| Title | `content.galleryTitle` | Not implemented | Section heading |
| Images array | `content.galleryImages[]` | Not implemented | Grid layout |
| Image | `image.image` | Not implemented | `Image` with cover |
| Alt text | `image.alt` | Not implemented | Accessibility label |

**Native behavior:** First image spans full height on left; remaining images in 2-column grid on right; or horizontal scroll on phone.

---

#### 8. Contact Form / Visit Us Card

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Contact form title | `content.contactForm.title` | Not implemented | Section heading |
| Description | `content.contactForm.description` | Not implemented | Body text |
| Name field | `content.contactForm.namePlaceholder` | Not implemented | TextInput |
| Email field | `content.contactForm.emailPlaceholder` | Not implemented | TextInput (keyboardType="email-address") |
| Subject field | `content.contactForm.subjectPlaceholder` | Not implemented | TextInput |
| Message field | `content.contactForm.messagePlaceholder` | Not implemented | TextInput (multiline) |
| Submit label | `content.contactForm.submitLabel` | Not implemented | Button text |
| Submit action | POST to `/api/contact-submissions` | Not implemented | Wire to `submitContactSubmission` (display-first acceptable) |
| Visit Us title | `content.visitUsTitle` | Not implemented | Heading |
| Address | `siteSettings.address` | Not implemented | Display with MapPin icon |
| Email | `siteSettings.contactEmail` | Not implemented | Display with Mail icon |
| Phone | `siteSettings.contactPhone` | Not implemented | Display with Phone icon |
| Hours | `content.weekdayHours`, `content.weekendHours` | Not implemented | Display with Clock icon |
| Map button | `content.mapButtonLabel`, `content.mapUrl` | Not implemented | Button opens external maps URL |

**Native behavior:** Two-column layout: contact form on left, visit info on right (dark background); form validation before submit; map button uses `Linking.openURL`.

---

#### 9. Footer

| Aspect | Web Source | Current Mobile Status | Native Target Behavior |
|--------|------------|----------------------|----------------------|
| Logo | `siteSettings.footer.logoUrl` | Not implemented | Footer logo |
| Description | `siteSettings.footer.description` | Not implemented | Footer text |
| Service links | `siteSettings.footer.serviceLinks[]` | Not implemented | Link list |
| About links | `siteSettings.footer.aboutLinks[]` | Not implemented | Link list |
| Contact title | `siteSettings.footer.contactTitle` | Not implemented | Section heading |
| Copyright | `siteSettings.footer.copyright` | Not implemented | Copyright text |
| Legal links | `siteSettings.footer.legalLinks[]` | Not implemented | Privacy, Terms links |

**Native behavior:** Footer at bottom of scroll; links navigate to existing pages; copyright displays year.

---

## H181 Content Mapping And Fallback Rules

### API Sources

1. **Homepage API:** `fetchContentPage(apiClient, 'homepage')` returns `ContentPage` with homepage-specific fields
2. **Site Settings API:** `fetchSiteSetting(apiClient)` returns `ContentPage` with site-wide settings

### Content Mapping to Native Types

| Native Field | API Source | Type | Fallback Rule |
|--------------|------------|------|---------------|
| `hero.title` | `hero.title` (string) | `string` | Default: "Premium coworking in the City of London" |
| `hero.subtitle` | `hero.subtitle` (string) | `string` | Default: "Flexible workspaces, meeting rooms, and member services at The Leadenhall Works." |
| `hero.backgroundImage` | `hero.backgroundImage` (string URL) | `string` | Default: Unsplash URL from siteContent.ts |
| `hero.primaryCtaLabel` | `hero.primaryCtaLabel` (string) | `string` | Default: "Get Started" |
| `hero.primaryCtaPath` | `hero.primaryCtaPath` (string) | `string` | Default: "/pricing" |
| `hero.secondaryCtaLabel` | `hero.secondaryCtaLabel` (string) | `string` | Default: "Watch Video" |
| `hero.videoUrl` | `hero.videoUrl` (string) | `string` | Default: "" (empty = no video) |
| `featureChips` | `featureChips` (array of objects) | `IconTextItem[]` | Default: 3 chips from siteContent.ts |
| `services` | `services` (array of objects) | `ServiceItem[]` | Default: 3 services from siteContent.ts |
| `servicesEyebrow` | `servicesEyebrow` (string) | `string` | Default: "Services" |
| `servicesKicker` | `servicesKicker` (string) | `string` | Default: "Explore our spaces" |
| `aboutHighlight` | `aboutHighlight` (object) | `AboutHighlight` | Default: full object from siteContent.ts |
| `whyChooseEyebrow` | `whyChooseEyebrow` (string) | `string` | Default: "Features" |
| `whyChooseKicker` | `whyChooseKicker` (string) | `string` | Default: "Built for teams" |
| `whyChooseTitle` | `whyChooseTitle` (string) | `string` | Default: "Why Choose CoworkingHub?" |
| `whyChooseItems` | `whyChooseItems` (array) | `FeatureItem[]` | Default: 3 items from siteContent.ts |
| `testimonialsEyebrow` | `testimonialsEyebrow` (string) | `string` | Default: "Testimonials" |
| `testimonialsKicker` | `testimonialsKicker` (string) | `string` | Default: "Member reviews" |
| `testimonialsTitle` | `testimonialsTitle` (string) | `string` | Default: "What Our Members Say" |
| `testimonials` | `testimonials` (array) | `TestimonialItem[]` | Default: 3 testimonials from siteContent.ts |
| `galleryEyebrow` | `galleryEyebrow` (string) | `string` | Default: "Gallery" |
| `galleryKicker` | `galleryKicker` (string) | `string` | Default: "Our Space" |
| `galleryTitle` | `galleryTitle` (string) | `string` | Default: "Our Space" |
| `galleryImages` | `galleryImages` (array) | `GalleryImageItem[]` | Default: 3 images from siteContent.ts |
| `contactForm` | `contactForm` (object) | `ContactFormContent` | Default: full object from siteContent.ts |
| `visitUsTitle` | `visitUsTitle` (string) | `string` | Default: "Visit Us" |
| `addressLabel` | `addressLabel` (string) | `string` | Default: "Address" |
| `emailLabel` | `emailLabel` (string) | `string` | Default: "Email" |
| `phoneLabel` | `phoneLabel` (string) | `string` | Default: "Phone" |
| `openHoursLabel` | `openHoursLabel` (string) | `string` | Default: "Open Hours" |
| `weekdayHours` | `weekdayHours` (string) | `string` | Default: "Mon-Fri: 8:00 AM - 8:00 PM" |
| `weekendHours` | `weekendHours` (string) | `string` | Default: "Sat-Sun: 10:00 AM - 4:00 PM" |
| `mapButtonLabel` | `mapButtonLabel` (string) | `string` | Default: "View on Google Maps" |
| `mapUrl` | `mapUrl` (string URL) | `string` | Default: "" (no map) |
| `siteName` | `siteSetting.siteName` | `string` | Default: "The Leadenhall Works" |
| `tagline` | `siteSetting.tagline` | `string` | Default: from siteContent.ts |
| `contactEmail` | `siteSetting.contactEmail` | `string` | Default: from siteContent.ts |
| `contactPhone` | `siteSetting.contactPhone` | `string` | Default: from siteContent.ts |
| `address` | `siteSetting.address` | `string` | Default: from siteContent.ts |
| `navigation` | `siteSetting.navigation` | `Navigation` | Default: from siteContent.ts |
| `footer` | `siteSetting.footer` | `Footer` | Default: from siteContent.ts |

### Fallback Rules

1. **String fields:** If value is not a string or is empty/whitespace, use default from `siteContent.ts`-equivalent.
2. **Array fields:** If value is not an array or empty, use default array from `siteContent.ts`-equivalent.
3. **Object fields:** If value is not a valid object, use default object from `siteContent.ts`-equivalent.
4. **Image URLs:** Validate URL format; if invalid, use default image from `siteContent.ts`.
5. **Star counts:** Clamp to 1-5 range; default to 5 if invalid.
6. **Paths:** Validate non-empty string; default to "/" if invalid.

### Safe Coercion Requirements

- **Strings:** Use `String(value).trim()` or fallback
- **Arrays:** Use `Array.isArray(value) ? value : []` then filter valid items
- **Objects:** Use `typeof value === 'object' && value !== null` check
- **Image URLs:** Validate with `URL` constructor or regex; fallback on failure
- **Numbers (stars):** Use `Number(value)` then `Math.min(5, Math.max(1, n))`
- **Paths:** Ensure starts with "/" or is valid route

**Critical:** Invalid or missing content must fall back to `src/data/siteContent.ts`-equivalent native defaults, NOT blank screens.

---

## H183 Native Image And Video Handling Decision

### Image Handling

| Use Case | Component | Resize Mode | Fallback |
|----------|-----------|-------------|----------|
| Hero background | `ImageBackground` | `"cover"` | Solid color background (`colors.secondary`) |
| Services card images | `Image` | `"cover"` | Placeholder or hidden |
| About highlight image | `Image` | `"cover"` | Placeholder or hidden |
| Gallery images | `Image` | `"cover"` | Placeholder or hidden |
| Feature/why-choose icons | `View` with text/symbol | N/A | Text fallback |

**Remote images:** Allowed. Use `cache="cover"` for Android, standard caching for iOS. Include `onError` handler to show fallback.

### Video Handling

- **No iframe:** Explicitly out of scope. No `WebView` for video embedding.
- **No embedded video player:** Do not embed video in app for now.
- **Hero video CTA behavior:**
  1. Check if `videoUrl` is non-empty and valid URL
  2. Use `Linking.canOpenURL(url)` to verify safe external handler exists
  3. If safe, open with `Linking.openURL(url)` on button press
  4. If not safe or URL invalid, disable button with `disabled={true}` and accessible state (`accessibilityLabel="Video unavailable"`)
  5. Never attempt inline video playback

**Accessibility:** Video button must have proper `accessibilityLabel` and `accessibilityState` for screen readers.

---

## Implementation Slices For H184 Approval

### Slice A: Types / Parser / Defaults

**Files likely to change:**
- New: `mobile/src/types/home-content.ts` (or similar)
- New: `mobile/src/utils/home-content-parser.ts`
- New: `mobile/src/constants/home-defaults.ts` (from siteContent.ts equivalents)

**Risk level:** Low

**Security classification:** None (content types only)

**Verification:** TypeScript compiles; default values match siteContent.ts

---

### Slice B: Presentational Primitives

**Files likely to change:**
- New: `mobile/src/components/home/Chip.tsx`
- New: `mobile/src/components/home/Card.tsx`
- New: `mobile/src/components/home/SectionHeader.tsx`
- New: `mobile/src/components/home/IconRow.tsx`
- Update: `mobile/src/theme/index.ts` (if new tokens needed)

**Risk level:** Low

**Security classification:** None

**Verification:** Components render in isolation; match web visual patterns

---

### Slice C: Hero / Header

**Files likely to change:**
- Update: `mobile/src/screens/public/HomeScreen.tsx` (major update)
- New: `mobile/src/components/home/HeroSection.tsx`
- New: `mobile/src/components/home/HeaderBar.tsx`
- New: `mobile/src/components/home/FeatureChips.tsx`

**Risk level:** Medium

**Security classification:** None

**Verification:** Hero displays background image, overlay, text, CTAs; header shows logo/menu; chips scroll horizontally

---

### Slice D: Services / About / Features / Testimonials / Gallery

**Files likely to change:**
- New: `mobile/src/components/home/ServicesSection.tsx`
- New: `mobile/src/components/home/ServiceCard.tsx`
- New: `mobile/src/components/home/AboutSection.tsx`
- New: `mobile/src/components/home/WhyChooseSection.tsx`
- New: `mobile/src/components/home/TestimonialsSection.tsx`
- New: `mobile/src/components/home/GallerySection.tsx`
- Update: `mobile/src/screens/public/HomeScreen.tsx`

**Risk level:** Medium

**Security classification:** None

**Verification:** All sections render with correct content; images load; navigation works

---

### Slice E: Contact / Visit / Footer + Optional Contact Submit

**Files likely to change:**
- New: `mobile/src/components/home/ContactSection.tsx`
- New: `mobile/src/components/home/VisitUsCard.tsx`
- New: `mobile/src/components/home/Footer.tsx`
- Update: `mobile/src/api/content-api.ts` (if new wrapper needed)
- Update: `mobile/src/screens/public/HomeScreen.tsx`

**Risk level:** Medium

**Security classification:** None (contact form uses existing safe endpoint)

**Verification:** Form displays; validation works; submit calls `submitContactSubmission`; visit info displays; map button opens external URL

---

### Slice F: Navigation / Menu / CTA Interactions

**Files likely to change:**
- Update: `mobile/src/navigation/PublicNavigator.tsx` (if new routes needed)
- Update: existing CTA handlers in HomeScreen components
- New: `mobile/src/hooks/useNavigation.ts` (if needed)

**Risk level:** Medium

**Security classification:** None

**Verification:** All CTA buttons navigate to correct screens; menu opens drawer or navigates

---

### Slice G: QA / Visual Checklist

**Files likely to change:**
- None (verification only)

**Risk level:** Low

**Security classification:** None

**Verification:**
- TypeScript compiles without errors
- Expo starts without crash
- Simulator renders all sections
- Visual checklist against web reference screenshots
- Navigation paths work end-to-end

---

## Acceptance Criteria

1. **Section parity:** All 9 target sections from web Home.tsx are implemented in native React Native
2. **Content contract:** Homepage and site settings APIs map to native types with defined fallback rules
3. **No blank screens:** Invalid/missing content falls back to siteContent.ts-equivalent defaults
4. **Image handling:** Hero uses `ImageBackground`; cards/gallery use `Image`; remote images allowed with fallbacks
5. **Video handling:** No WebView; video CTA opens external URL safely or is disabled with accessible state
6. **Native only:** No WebView, no iframe embedding
7. **Navigation:** CTA buttons navigate to existing public/auth/member screens
8. **Contact form:** Optional submission wired to existing `submitContactSubmission` endpoint
9. **Static QA:** TypeScript passes, Expo starts without errors
10. **Production blockers unchanged:** Release gates remain in place

---

## Non-Goals

- **WebView:** Explicitly out of scope; native React Native components only
- **Pixel-perfect CSS:** Native components use React Native styling; visual parity is approximate
- **Payment/auth rewrites:** Payment source-of-truth and auth flow remain unchanged
- **Verkada:** Mobile does not call Verkada directly; backend-only integration
- **Production submission:** This spec delivers UI/content parity only; production release blockers remain

---

## Notes

- This spec covers Phase 18 tasks H180, H181, H183. H182 (OPS endpoint verification) and H184 (slice approval) are separate.
- All content mapping assumes `fetchContentPage` returns `ContentPage` with CMS structure; H182 verifies actual endpoint shape.
- Default values should be extracted from `src/data/siteContent.ts` equivalents to ensure consistency.
- Contact form submission is marked "display-first acceptable" per HOME_PARITY_CHAIN.md H207 - wiring optional, not required for parity.