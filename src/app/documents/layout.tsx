import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Documents',
  description: 'Access official company documents, policies, and certifications for TERRADRILL & ENERGY PRIVATE LIMITED.',
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
