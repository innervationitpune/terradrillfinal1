import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TERRADRILL & ENERGY PRIVATE LIMITED for inquiries regarding trenchless engineering and infrastructure projects.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
