import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ORIGO | Market-Signal Architecture',
  description:
    'Fewer guesses. Better decisions. Faster growth. Transform your business with signal-driven decision architecture.',
  keywords: [
    'market signal',
    'decision architecture',
    'business strategy',
    'market intelligence',
    'commercial strategy',
  ],
  openGraph: {
    title: 'ORIGO | Market-Signal Architecture',
    description: 'Fewer guesses. Better decisions. Faster growth.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#0a0a0a] text-neutral-100">
        {children}
        <ConditionalFooter />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}