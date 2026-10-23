import type { Site } from '@/lib/types';

export type VisitorCategory = 'foreignAdult' | 'foreignStudent' | 'egyptianAdult' | 'egyptianStudent';
export type QuestInterest = 'history' | 'photography' | 'family' | 'balanced';
export type QuestEffort = 'light' | 'balanced' | 'active';

export type LiveQuestInput = {
  remainingMinutes: number;
  budgetEgp: number;
  visitorCategory: VisitorCategory;
  interest: QuestInterest;
  effort: QuestEffort;
  completedIds: string[];
  skippedIds: string[];
};

export type QuestStop = {
  site: Site;
  visitMinutes: number;
  ticketEgp: number;
  reason: string;
};

const VISIT_MINUTES: Record<string, number> = {
  'luxor-temple': 75,
  karnak: 120,
  'valley-of-kings': 120,
  'deir-al-bahari': 90,
};

function visitMinutes(site: Site, effort: QuestEffort): number {
  const base = VISIT_MINUTES[site.id] ?? 75;
  return effort === 'light' ? Math.ceil(base * 0.7) : effort === 'active' ? Math.ceil(base * 1.15) : base;
}

function interestScore(site: Site, interest: QuestInterest): number {
  const title = `${site.title} ${site.arabicTitle}`.toLowerCase();
  if (interest === 'photography') {
    if (site.id === 'karnak' || site.id === 'deir-al-bahari') return 4;
    return 2;
  }
  if (interest === 'family') {
    // Avoid making unverified child-suitability claims; prefer a shorter visit only.
    return (VISIT_MINUTES[site.id] ?? 75) <= 90 ? 3 : 1;
  }
  if (interest === 'history') {
    if (title.includes('karnak') || title.includes('ملوك') || title.includes('kings')) return 4;
    return 3;
  }
  return 2;
}

export function buildLiveQuest(sites: Site[], input: LiveQuestInput): {
  stops: QuestStop[];
  totalMinutes: number;
  totalTicketEgp: number;
  remainingBudgetEgp: number;
  remainingMinutes: number;
  excludedCount: number;
  notices: string[];
} {
  const excluded = new Set([...input.completedIds, ...input.skippedIds]);
  const eligible = sites
    .filter((site) => !excluded.has(site.id))
    .map((site) => ({
      site,
      visitMinutes: visitMinutes(site, input.effort),
      ticketEgp: site.price[input.visitorCategory],
      score: interestScore(site, input.interest),
    }))
    .filter((item) => Number.isFinite(item.ticketEgp) && item.ticketEgp >= 0)
    .sort((a, b) => b.score - a.score || a.visitMinutes - b.visitMinutes);

  const stops: QuestStop[] = [];
  let totalMinutes = 0;
  let totalTicketEgp = 0;
  for (const item of eligible) {
    // Leave a planning buffer for moving between sites and taking breaks.
    const bufferMinutes = stops.length === 0 ? 0 : 30;
    if (totalMinutes + bufferMinutes + item.visitMinutes > input.remainingMinutes) continue;
    if (totalTicketEgp + item.ticketEgp > input.budgetEgp) continue;
    stops.push({
      site: item.site,
      visitMinutes: item.visitMinutes,
      ticketEgp: item.ticketEgp,
      reason: input.interest === 'photography'
        ? 'اختيرت لملاءمتها لهدف التصوير؛ جودة الإضاءة والتصوير الفعلي تتغير حسب الظروف.'
        : input.interest === 'family'
          ? 'اختيرت لوقت زيارة مخطط أقصر نسبيًا؛ ملاءمة المكان للأطفال تحتاج تحققًا حسب احتياجات الأسرة.'
          : input.interest === 'history'
            ? 'اختيرت حسب اهتمامك بالتاريخ؛ ترتيب الزيارة قابل للتعديل.'
            : 'اختيرت لتحقيق توازن بين الوقت المتبقي والتكلفة التقديرية للتذكرة.',
    });
    totalMinutes += bufferMinutes + item.visitMinutes;
    totalTicketEgp += item.ticketEgp;
  }

  const notices = [
    'مدة الزيارة وأوقات الانتقال تقديرات تخطيطية وليست مواعيد رسمية أو قياسًا مباشرًا للحركة.',
    'أسعار التذاكر مأخوذة من قاعدة بيانات المشروع وليست متصلة بواجهة أسعار رسمية حية؛ تحقق من بوابة التذاكر الرسمية قبل الدفع.',
    'الحساب لا يشمل النقل أو الطعام أو الخدمات الإضافية.',
    'الساعات المنشورة لا تؤكد أن الموقع مفتوح الآن. افتح المصدر الرسمي قبل التحرك.',
  ];
  if (stops.some((stop) => stop.site.status !== 'VERIFIED')) {
    notices.push('بعض بيانات المواقع ليست بحالة VERIFIED؛ راجع حالة كل معلومة ومصدرها قبل الاعتماد عليها.');
  }
  return {
    stops,
    totalMinutes,
    totalTicketEgp,
    remainingBudgetEgp: Math.max(0, input.budgetEgp - totalTicketEgp),
    remainingMinutes: Math.max(0, input.remainingMinutes - totalMinutes),
    excludedCount: excluded.size,
    notices,
  };
}
