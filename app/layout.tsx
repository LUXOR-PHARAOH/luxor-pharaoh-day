import type {Metadata} from 'next';
import SiteNav from '@/components/SiteNav';
import AtmosphereLayer from '@/components/AtmosphereLayer';
import OfflineRegister from '@/components/OfflineRegister';
import NetworkStatus from '@/components/NetworkStatus';
import AnalyticsTelemetry from '@/components/AnalyticsTelemetry';
import VercelTelemetry from '@/components/VercelTelemetry';
import './globals.css';

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://luxor-pharaoh-day-q3rd.vercel.app';
const whatsapp='201012801568';
const email='luxor-pharaohday@gmail.com';
const instagram='https://www.instagram.com/luxor_quest/';
const enableVercelTelemetry=process.env.VERCEL_ENV==='production';

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:'LUXOR PHARAOH DAY 🏺👑',template:'%s · LUXOR PHARAOH DAY'},
  description:'A Day in Luxor with the Pharaohs — منصة مستقلة ثنائية اللغة تساعد زوار الأقصر على المعرفة والتحقق والتخطيط والدعم العملي.',
  applicationName:'LUXOR PHARAOH DAY',
  keywords:['Luxor','Luxor tourism','Luxor Temple','Karnak','Egypt travel','الأقصر','سياحة الأقصر','VIB visitor concierge'],
  alternates:{canonical:siteUrl},
  openGraph:{type:'website',url:siteUrl,title:'LUXOR PHARAOH DAY 🏺👑',description:'اعرف • اتأكد • اتحرك — A Day in Luxor with the Pharaohs',siteName:'LUXOR PHARAOH DAY'},
  twitter:{card:'summary_large_image',title:'LUXOR PHARAOH DAY 🏺👑',description:'اعرف • اتأكد • اتحرك — A Day in Luxor with the Pharaohs'},
  robots:{index:process.env.VERCEL_ENV==='production',follow:true},
  icons:{icon:'/icon.svg',apple:'/icon.svg'}
};

const structuredData={
  '@context':'https://schema.org',
  '@type':'WebSite',
  name:'LUXOR PHARAOH DAY',
  url:siteUrl,
  description:'Independent bilingual visitor information, planning and practical support platform for Luxor.',
  inLanguage:['ar','en'],
  contactPoint:[{'@type':'ContactPoint',contactType:'customer support',telephone:'+20-101-280-1568',email}],
  sameAs:[instagram]
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body>
    <OfflineRegister/><NetworkStatus/><AnalyticsTelemetry/><AtmosphereLayer/>
    <SiteNav/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />
    <div id="main-content" className="app-content">{children}</div>
    <footer className="footer">
      <div className="wrap">
        <strong>LUXOR PHARAOH DAY 🏺👑</strong> · KNOW • CHECK • GO<br/>
        منصة مستقلة للمعلومات والتخطيط والدعم العملي — لا تمثل جهة حكومية ولا تدّعي ترخيص شركة سياحة.
        <div className="footer-contact">
          <a href={`https://wa.me/${whatsapp}`} data-requires-network="true">WhatsApp / واتساب</a> ·
          <a href={`mailto:${email}`} data-requires-network="true">Email / البريد</a> ·
          <a href={instagram} rel="noreferrer" data-requires-network="true">Instagram</a> ·
          <a href="/vib" data-requires-network="true">VIB Desk</a> ·
          <a href="/soundtrack" data-requires-network="true">Soundtrack</a> ·
          <a href="/contact" data-requires-network="true">Contact / تواصل</a>
        </div>
      </div>
    </footer>
    {enableVercelTelemetry && <VercelTelemetry/>}
  </body></html>
}
