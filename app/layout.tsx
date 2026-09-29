import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUXOR PHARAOH DAY — يومك الفرعوني في الأقصر',
  description: 'منصة رقمية مستقلة تساعد زوار الأقصر على اكتشاف الخيارات وفحص المعلومات ثم التحرك بثقة.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://luxor-pharaoh-day.vercel.app'),
  openGraph: { title: 'LUXOR PHARAOH DAY', description: 'Your Pharaoh Day in Luxor' },
  twitter: { card: 'summary_large_image', title: 'LUXOR PHARAOH DAY', description: 'Your Pharaoh Day in Luxor' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><Header />{children}<footer className="footer"><div className="container"><strong>LUXOR PHARAOH DAY 🏺👑</strong><p>اعرف · اتأكد · اتحرك<br />Know · Check · Go</p></div></footer><SpeedInsights /></body></html>;
}
