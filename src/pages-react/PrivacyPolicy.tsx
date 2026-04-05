import { LegalDocumentPage } from '@/components/shared/LegalDocumentPage';
import { Layout } from '@/components/layout/Layout';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { usePrivacyPolicyPageContent } from '@/hooks/useCmsContent';

export default function PrivacyPolicy() {
  const privacyPolicyQuery = usePrivacyPolicyPageContent();

  if (privacyPolicyQuery.isLoading) {
    return null;
  }

  if (privacyPolicyQuery.isError || !privacyPolicyQuery.data) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  return <LegalDocumentPage content={privacyPolicyQuery.data} />;
}
