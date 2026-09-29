import Link from 'next/link';
import { HeroScene } from '@/components/HeroScene';
import { ExperienceCard } from '@/components/ExperienceCard';
import { Planner } from '@/components/Planner';
import { experiences } from '@/lib/data';

export default function Home() {
  return <main>
    <section className="hero container">
      <div className="heroGrid">
        <div className="heroCopy">
          <div className="kicker">LUXOR · YOUR PHARAOH DAY</div>
          <h1><span>أبرز تجربة اليوم الفرعوني في الأقصر</span><small>Your Pharaoh Day in Luxor</small></h1>
          <p className="heroLead">اعرف ماذا تفعل، اتأكد من المعلومات قبل الاختيار، ثم تحرك بخطوة واضحة — KNOW · CHECK · GO.</p>
          <div className="ctaRow"><Link className="cta" href="/experiences">استكشف اليوم · Explore</Link><Link className="ghost" href="/plan">ابدأ خطتك · Build a plan</Link></div>
          <div className="infoBand"><strong>شفافية أولًا</strong><br />المعلومات قد تكون مؤقتة أو تقديرية. راجع المصدر وتاريخ التحديث قبل اتخاذ قرار شراء.</div>
        </div>
        <HeroScene />
      </div>
    </section>
    <section className="section container">
      <div className="sectionHeader"><div><p className="eyebrow">KNOW · CHECK · GO</p><h2>اختيارات تناسب وقتك</h2><small>Options shaped around your time</small></div><Link href="/experiences">كل التجارب · All experiences</Link></div>
      <div className="grid">{experiences.map((item)=><ExperienceCard key={item.id} item={item}/>)}</div>
      <Planner />
    </section>
  </main>;
}
