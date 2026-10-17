import Link from 'next/link';
import ExperienceCard from '@/components/ExperienceCard';
import SoundtrackControl from '@/components/SoundtrackControl';
import VibConcierge from '@/components/VibConcierge';
import QuickSearch from '@/components/QuickSearch';

const quick=[
  ['⌕','استكشف','Explore','/experiences','اعثر على أماكن وتجارب تناسبك.'],
  ['✦','يومي الذكي','Smart Day','/smart-day','ابنِ يومك حسب الوقت والميزانية والاهتمامات.'],
  ['⟳','رحلتي المتكيّفة','Live Quest','/live-quest','عدّل خطتك حسب الوقت والميزانية وما أنجزته بالفعل.'],
  ['✓','فحص الأسعار','Price Check','/price-check','اعرف السعر وما يشمله ومصدر المعلومة.'],
  ['↗','النقل','Transport','/transport','خطوات تنقل عملية قبل التحرك.'],
  ['♡','خطتي','My Plan','/plan','احفظ يومك محليًا بدون تسجيل إجباري.'],
  ['◌','جيب السائح','Tourist Pocket','/tourist-pocket','معلومات أساسية للعمل عند ضعف الاتصال.'],
] as const;

export default function Home(){
  return <main className="app-home wrap">
    <section className="app-hero">
      <div className="hero-copy">
        <div className="eyebrow">A DAY IN LUXOR WITH THE PHARAOHS · YOUR DIGITAL TRAVEL COMPANION</div>
        <h1>اعرف <span>•</span> اتأكد <span>•</span> اتحرك</h1>
        <p className="lead">دليل ذكي للأقصر يساعدك على اكتشاف المكان، التحقق من المعلومات، بناء يومك، ثم التحرك بثقة — من أول لحظة إلى آخر اليوم.</p>
        <div className="hero-actions">
          <Link className="btn" href="/what-can-i-do-now">ابدأ الآن<br/><small>Start Now</small></Link>
          <Link className="btn alt" href="/smart-day">ابنِ يومي<br/><small>Build My Day</small></Link>
        </div>
        <div className="trust"><b>✓ مصادر واضحة / Clear Sources</b><b>✓ عربي + English</b><b>✓ بدون تسجيل إجباري / No forced signup</b></div>
      </div>
      <div className="hero-device">
        <div className="device-top"><span>9:41</span><span>● ● ●</span></div>
        <div className="device-logo">𓂀</div>
        <strong>LUXOR<br/>PHARAOH DAY</strong>
        <span className="device-tag">Your Day in Luxor</span>
        <div className="device-scene">𓉢 𓂀 𓏏</div>
        <div className="device-status">✓ معلومات موثوقة<br/><small>Verified visitor information</small></div>
      </div>
    </section>

    <QuickSearch/>\n\n    <section className="now-panel" aria-labelledby="now-title">
      <div><span className="tag">WHAT CAN I DO NOW?</span><h2 id="now-title">ماذا أستطيع أن أفعل الآن؟<br/><small>What can I do now?</small></h2><p>ابدأ من احتياجك بدل البحث في عشرات الصفحات.</p></div>
      <Link className="button primary" href="/what-can-i-do-now">حدد وقتي وميزانيتي<br/><small>Set my time & budget</small></Link>
    </section>

    <section className="section app-section">
      <div className="section-head"><div><span className="tag">APP NAVIGATION</span><h2>كل وظيفة في شاشة واضحة</h2><p className="sub">Every task has its own focused screen — no endless feed.</p></div></div>
      <div className="quick-grid">
        {quick.map(([icon,ar,en,href,desc])=><Link className="quick-card" key={href} href={href}><span className="quick-icon">{icon}</span><strong>{ar}</strong><small>{en}</small><p>{desc}</p><span className="quick-arrow">↗</span></Link>)}
      </div>
    </section>

    <VibConcierge/>

    <section className="section app-section">
      <div className="section-head"><div><span className="tag">TRUST FIRST</span><h2>قبل أن تشتري أو تتحرك</h2><p className="sub">Check the source, freshness and what still needs confirmation.</p></div><Link className="button" href="/trust">الثقة والشفافية<br/><small>Trust & Transparency</small></Link></div>
      <div className="grid">
        <ExperienceCard title="Explore" ar="استكشف" desc="المعالم والخيارات التي تناسب وقتك واهتماماتك." href="/experiences"/>
        <ExperienceCard title="Price Check" ar="فحص الأسعار" desc="السعر، المصدر، آخر مراجعة، وما يجب تأكيده." href="/price-check"/>
        <ExperienceCard title="Pharaoh Rescue" ar="إنقاذ الخطة" desc="بديل عملي إذا أُغلق مكان أو تغير السعر أو حدثت مشكلة." href="/rescue"/>
      </div>
    </section>

    <section className="app-promo">
      <div><span className="tag">YOUR LUXOR PLAN</span><h2>خطتك معك حتى لو تغيّر اليوم</h2><p>احفظ خطتك، راجع البدائل، واستخدم الأدوات الأساسية حتى عند ضعف الاتصال.</p></div>
      <div className="actions"><Link className="btn" href="/plan">خطتي / My Plan</Link><Link className="btn alt" href="/tourist-pocket">جيب السائح / Tourist Pocket</Link></div>
    </section>
    <SoundtrackControl/>
  </main>
}