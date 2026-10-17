'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

const links=[
  ['/','الرئيسية / Home'],
  ['/experiences','استكشف / Explore'],
  ['/smart-day','يومي الذكي / Smart Day'],
  ['/price-check','فحص الأسعار / Price Check'],
  ['/transport','النقل / Transport'],
  ['/plan','خطتي / My Plan'],
  ['/tourist-pocket','جيب السائح / Tourist Pocket'],
  ['/vib','VIB Desk'],
  ['/rescue','إنقاذ / Rescue'],
] as const;

const networkOnly=new Set(['/vib','/visitor-center']);

const bottomLinks=[
  ['/','الرئيسية','Home','⌂'],
  ['/experiences','استكشف','Explore','⌕'],
  ['/smart-day','يومي','My Day','✦'],
  ['/plan','خطتي','My Plan','♡'],
  ['/visitor-center','المزيد','More','☰'],
] as const;

export default function SiteNav(){
  const pathname=usePathname();
  return <>
    <a className="skip" href="#main-content">تخطي إلى المحتوى / Skip to content</a>
    <header className="nav">
      <div className="wrap navin">
        <Link className="brand" href="/" aria-label="LUXOR PHARAOH DAY home">
          <span className="brand-mark">𓂀</span>
          <span><b>LUXOR PHARAOH DAY</b><small>يومك في الأقصر / Your Day in Luxor</small></span>
        </Link>
        <nav className="links" aria-label="Primary navigation">
          {links.map(([href,label])=><Link key={href} href={href} data-requires-network={networkOnly.has(href)?'true':undefined} aria-current={pathname===href?'page':undefined}>{label}</Link>)}
        </nav>
        <Link className="nav-quick" href="/what-can-i-do-now">ابدأ الآن<br/><span>Start Now</span></Link>
      </div>
    </header>
    <nav className="bottom-nav" aria-label="App navigation">
      {bottomLinks.map(([href,ar,en,icon])=>
        <Link key={href} href={href} data-requires-network={networkOnly.has(href)?'true':undefined} className={pathname===href?'active':''} aria-current={pathname===href?'page':undefined}>
          <span className="bottom-icon" aria-hidden="true">{icon}</span>
          <span>{ar}</span><small>{en}</small>
        </Link>
      )}
    </nav>
  </>;
}