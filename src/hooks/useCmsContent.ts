// Barrel re-export — all CMS hooks are split into domain files under ./cms/
// Existing consumers import from '@/hooks/useCmsContent' and continue to work.

export { useBlogPosts, useBlogPostBySlug, useBlogPageContent } from './cms/useBlogContent';
export { usePricingPlans, usePricingPageContent, useDbPlans } from './cms/usePricingContent';
export { useFaqItems, useFaqPageContent } from './cms/useFaqContent';
export { useMeetingRooms, useMeetingRoomsPageContent } from './cms/useMeetingRoomsContent';
export {
  useHomepageContent,
  useAboutPageContent,
  useVirtualOfficePageContent,
  useContactPageContent,
  usePrivacyPolicyPageContent,
  useTermsPageContent,
  useSiteSettings,
} from './cms/usePageContent';
