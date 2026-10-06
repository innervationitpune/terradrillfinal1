import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Presence & Capability',
  description: 'TERRADRILL & ENERGY PRIVATE LIMITED delivers complex infrastructure solutions across diverse international geographies.',
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
