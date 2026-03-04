import { LegalDocumentPage } from '@/components/shared/LegalDocumentPage';
import { Layout } from '@/components/layout/Layout';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { useTermsPageContent } from '@/hooks/useCmsContent';

export default function Terms() {
  const termsQuery = useTermsPageContent();

  if (termsQuery.isLoading) {
    return null;
  }

  if (termsQuery.isError || !termsQuery.data) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  return <LegalDocumentPage content={termsQuery.data} />;
}
