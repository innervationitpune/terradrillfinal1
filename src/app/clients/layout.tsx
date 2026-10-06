import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Clients & Partners',
  description: 'TERRADRILL & ENERGY PRIVATE LIMITED is trusted by leading government agencies, public sector undertakings, and private enterprises globally.',
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
