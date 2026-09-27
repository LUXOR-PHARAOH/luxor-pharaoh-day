import type { Experience } from '@/lib/data';

const statusText: Record<Experience['status'], [string, string]> = {
  CHECKED: ['مُراجع', 'Checked'],
  ESTIMATED: ['تقديري', 'Estimated'],
  UNVERIFIED: ['غير متحقق', 'Unverified'],
  PLANNED: ['مخطط', 'Planned']
};

export function ExperienceCard({ item }: { item: Experience }) {
  const [statusAr, statusEn] = statusText[item.status];
  return (
    <article className="card experienceCard">
      <div className="statusPill"><span>{statusAr}</span><small>{statusEn}</small></div>
      <p className="eyebrow">{item.category} · {item.durationMinutes} min</p>
      <h3><span>{item.titleAr}</span><small>{item.titleEn}</small></h3>
      <p className="muted"><span>{item.summaryAr}</span><br /><span>{item.summaryEn}</span></p>
      <div className="cardFooter">
        <span>{item.budget === 'low' ? 'اقتصادي · Budget-friendly' : item.budget === 'medium' ? 'متوسط · Mid-range' : 'مرتفع · Premium'}</span>
        <a href="/plan">إضافة للخطة · Add</a>
      </div>
    </article>
  );
}
