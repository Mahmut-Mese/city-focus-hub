import { LegalDocumentPage } from '@/components/shared/LegalDocumentPage';
import { defaultPrivacyPolicyContent } from '@/data/siteContent';
import { usePrivacyPolicyPageContent } from '@/hooks/useCmsContent';

export default function PrivacyPolicy() {
  const { data: content = defaultPrivacyPolicyContent } = usePrivacyPolicyPageContent();

  return <LegalDocumentPage content={content} />;
}
