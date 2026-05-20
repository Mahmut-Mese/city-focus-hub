# CMS Marker Parity Audit Plan

**Date:** 2026-05-19  
**Scope:** Local/Development Environment Only  
**Purpose:** Verify web-to-mobile CMS field parity using reversible markers

---

## Scope Declaration

> **THIS PLAN APPLIES ONLY TO LOCAL/DEV ENVIRONMENTS.**  
> Do not apply markers to staging, production, or production-like data. Use local MySQL database only.

---

## Inventory: Safe User-Facing CMS Fields

### Content Pages (AdminJS `content-pages.js`)

| Page | Safe Fields to Mark | Source |
|------|---------------------|--------|
| site-settings | siteName, tagline, contactEmail, contactPhone, address, navigation.links, navigation.ctaLabel, navigation.ctaPath, footer.description, footer.contactTitle, footer.copyright, footer.serviceLinks, footer.aboutLinks, footer.legalLinks, socialLinks | `adminjs/src/content-pages.js` |
| homepage | hero.title, hero.subtitle, hero.backgroundImage, hero.primaryCtaLabel, hero.primaryCtaPath, hero.secondaryCtaLabel, hero.videoUrl, featureChips, services, aboutHighlight, whyChooseItems, testimonials, galleryImages, contactForm, visitUsTitle, addressLabel, emailLabel, phoneLabel, openHoursLabel, weekdayHours, weekendHours, mapButtonLabel | JSON column in `site_settings` table |
| about-page | heroTitle, heroSubtitle, heroBackgroundImage, storyTitle, storyParagraphs, storyImage, whyChooseTitle, whyChooseItems, amenitiesTitle, amenitiesImage, amenities | `about_pages` table |
| blog-page | heroTitle, heroSubtitle, heroBackgroundImage, searchPlaceholder, quickSearchTitle, recentPostsTitle, categoriesTitle, popularTagsTitle, noResultsText, detailBackLabel, detailSearchTitle, detailSearchButtonLabel, detailRecentPostsTitle, detailPopularTagsTitle, detailRelatedWorkspacesTitle, detailCommentForm | JSON column in `site_settings` table |
| pricing-page | heroTitle, heroSubtitle, heroBackgroundImage, comparisonTitle, comparisonColumns, comparisonRows, faqTitle, faqSubtitle, faqItems, purchaseButtonLabel, recommendedLabel, featureListTitle, featureListSubtitle | JSON column in `site_settings` table |
| faq-page | heroTitle, heroSubtitle, heroBackgroundImage, eyebrow, title, description, searchPlaceholder, noResultsText, ctaTitle, ctaDescription, ctaButtonLabel | JSON column in `site_settings` table |
| meeting-rooms-page | heroTitle, heroSubtitle, heroBackgroundImage, roomsTitle, roomsSubtitle, amenitiesTitle, amenitiesSubtitle, amenities, plansTitle, plansSubtitle, readMoreLabel, bookNowLabel, getStartedLabel, popularLabel | JSON column in `site_settings` table |
| virtual-office-page | heroTitle, heroSubtitle, heroBackgroundImage, featuredImage, overviewTitle, overviewText, challengeTitle, challengeIntro, challengeItems, resultTitle, resultText, galleryImages, projectInfoTitle, projectDateLabel, projectDateValue, projectCategoryLabel, projectCategoryValue, projectWebsiteLabel, projectWebsiteValue, ctaTitle, ctaDescription, ctaButtonLabel, contactForm | JSON column in `site_settings` table |
| contact-page | heroTitle, heroSubtitle, heroBackgroundImage, introEyebrow, introTitle, addressCardTitle, emailCardTitle, phoneCardTitle, form, mapTitle, mapDescription | JSON column in `site_settings` table |
| privacy-policy-page | heroTitle, heroSubtitle, effectiveDateLabel, effectiveDateValue, introText, sections, contactTitle, contactBody, contactButtonLabel | `privacy_policy_pages` table |
| terms-page | heroTitle, heroSubtitle, effectiveDateLabel, effectiveDateValue, introText, sections, contactTitle, contactBody, contactButtonLabel | `terms_pages` table |

### Collections (AdminJS `collection-pages.js`)

| Collection | Safe Fields to Mark | Source |
|------------|---------------------|--------|
| blog-posts | title, slug, excerpt, content, contentImages, proTipTitle, proTipText, category, publishedDate, readTime, author, tags, featured, coverImage | `blog_posts` table |
| faq-items | question, answer, sortOrder, isFeatured | `faq_items` table |
| meeting-rooms | name, slug, description, capacity, sortOrder, isFeatured, features, badges, image | `meeting_rooms` table |
| pricing-plans | name, slug, planType, price, period, description, features, isPopular, sortOrder | `pricing_plans` table |
| db-meeting-rooms | name, slug, description, capacity, hourlyRate, image, features, badges, active | `resources` table (type='meeting_room') |
| db-membership-plans | name, slug, description, monthlyPrice, currency, intervalName, features, isPopular, sortOrder, active | `membership_plans` table |

### Mobile API (`mobile/src/api/content-api.ts`)

| Endpoint | Fields Used |
|----------|--------------|
| `/api/site-setting` | All site-settings fields |
| `/api/{pageName}` | All page-specific fields |
| `/api/{collectionName}` | All collection fields |
| `/api/public/plans` | Membership plans from membership service |

---

## Excluded Fields (Unsafe for Marking)

| Category | Reason |
|----------|--------|
| Auth tokens, session IDs, refresh tokens | Security - authentication material |
| Stripe payment IDs, subscription state, invoice amounts | Security - payment data |
| Member PII (real names, emails, phone numbers in user tables) | Privacy - member data |
| Operational state (active/inactive flags on users, booking statuses) | Operational - not content |
| Internal IDs (document_id, internal UUIDs) | Not user-facing content |
| Timestamps (created_at, updated_at, published_at) | Operational metadata |

---

## Reversible Strategy

### Marker Format
```
[MOBPAR-YYYYMMDD-NN]
```
Where:
- `YYYYMMDD` = audit date
- `NN` = sequential marker number (01-99)

### Workflow

1. **Snapshot Before**
   ```bash
   # Export current CMS data to JSON
   mysqldump -u root -p city_focus_hub site_settings about_pages blog_posts faq_items meeting_rooms pricing_plans --result-file=backup_pre_audit_$(date +%Y%m%d).sql
   ```

2. **Apply Markers**
   - Option A: AdminJS save/publish API (preferred for content pages)
   - Option B: Controlled SQL UPDATE with transaction
   ```sql
   START TRANSACTION;
   UPDATE site_settings SET site_name = CONCAT('[MOBPAR-20260519-01]', site_name) WHERE id = 1;
   -- Verify
   SELECT site_name FROM site_settings WHERE id = 1;
   COMMIT;
   ```

3. **Verify Parity**
   - Query web API endpoints
   - Query mobile API endpoints
   - Compare field presence and values

4. **Rollback**
   ```sql
   -- Restore from snapshot
   SOURCE backup_pre_audit_20260519.sql;
   ```
   Or:
   ```sql
   -- Remove markers selectively
   UPDATE site_settings SET site_name = REPLACE(site_name, '[MOBPAR-20260519-01]', '') WHERE site_name LIKE '%[MOBPAR-20260519-%';
   ```

---

## Web Verification Routes

| Page | Web Route | Mobile Screen |
|------|-----------|---------------|
| Site Settings | `GET /api/site-setting` | HomeScreen (navigation/footer) |
| Homepage | `GET /api/homepage` | HomeScreen |
| About | `GET /api/about-page` | AboutScreen |
| Blog List | `GET /api/blog-posts` | BlogListScreen |
| Blog Detail | `GET /api/blog-posts?filters[$or][0][slug][$eq]={slug}` | BlogDetailScreen |
| Pricing | `GET /api/pricing-page` + `GET /api/pricing-plans` | PricingScreen |
| FAQ | `GET /api/faq-page` + `GET /api/faq-items` | FaqScreen |
| Meeting Rooms | `GET /api/meeting-rooms-page` + `GET /api/meeting-rooms` | MeetingRoomsScreen |
| Virtual Office | `GET /api/virtual-office-page` | VirtualOfficeScreen |
| Contact | `GET /api/contact-page` | ContactScreen |
| Privacy | `GET /api/privacy-policy-page` | PrivacyScreen |
| Terms | `GET /api/terms-page` | TermsScreen |

---

## Expected Gaps (P240-P244)

| Batch | Known Parity Gaps |
|-------|-------------------|
| P240 | CMS image URL normalization - mobile may not render all media URLs correctly |
| P241 | Contact/FAQ/VirtualOffice - some backend CMS fields may be omitted in mobile screens |
| P242 | About/MeetingRooms/Pricing - images, recommended badge, room images, read-more behavior may differ |
| P243 | Blog - categories/tags/search/pro-tip/images/related content may have parity gaps |
| P244 | Site Settings - navigation/footer links may not fully match backend-driven data |

---

## Verification Commands

### Local Backend API
```bash
# Test web API endpoints
curl http://localhost:3001/api/site-setting
curl http://localhost:3001/api/about-page
curl http://localhost:3001/api/blog-posts
curl http://localhost:3001/api/faq-items
curl http://localhost:3001/api/meeting-rooms
curl http://localhost:3001/api/pricing-plans
```

### Mobile (Expo)
```bash
cd mobile
npm run start
# Then test via Metro bundler or
npm run test:smoke
```

### Database Queries
```sql
-- Check marker presence
SELECT * FROM site_settings WHERE site_name LIKE '%[MOBPAR-%';

-- Verify content integrity
SELECT COUNT(*) as total, 
       SUM(CASE WHEN published_at IS NOT NULL THEN 1 ELSE 0 END) as published 
FROM blog_posts;
```

---

## Rollback Checklist

- [ ] Restore database from snapshot file
- [ ] Verify AdminJS dashboard shows correct pre-audit state
- [ ] Confirm mobile app renders pre-audit content
- [ ] Clear any cached API responses
- [ ] Document any issues encountered during rollback

---

## Summary

This audit plan provides a reversible mechanism to verify CMS field parity between web and mobile apps in a local/dev environment. All markers use the `[MOBPAR-YYYYMMDD-NN]` format and can be removed via SQL REPLACE or database restore. The plan excludes all sensitive fields (auth, payment, member PII) and focuses on user-facing content fields only.