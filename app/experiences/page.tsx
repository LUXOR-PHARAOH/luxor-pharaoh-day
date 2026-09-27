import { ExperienceCard } from '@/components/ExperienceCard';
import { experiences } from '@/lib/data';

export default function ExperiencesPage() {
  return <main className="container routeHero"><p className="eyebrow">KNOW · اكتشف</p><h1><span>التجارب المتاحة</span><small>Experiences</small></h1><p className="muted">فكرة كل تجربة مبنية على الوقت والاهتمام والميزانية، مع حالة واضحة للمعلومة بدل ادعاء أنها مؤكدة.</p><div className="grid section">{experiences.map((item)=><ExperienceCard key={item.id} item={item}/>)}</div></main>;
}
