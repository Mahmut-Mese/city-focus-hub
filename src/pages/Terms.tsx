import { LegalDocumentPage } from '@/components/shared/LegalDocumentPage';
import { defaultTermsContent } from '@/data/siteContent';
import { useTermsPageContent } from '@/hooks/useCmsContent';

export default function Terms() {
  const { data: content = defaultTermsContent } = useTermsPageContent();

  return <LegalDocumentPage content={content} />;
}
