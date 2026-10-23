'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { officialSites } from '@/lib/data';
import { buildLiveQuest, type QuestEffort, type QuestInterest, type VisitorCategory } from '@/lib/live-quest';

const STORAGE_KEY = 'lpd-live-quest-progress-v1';

export default function LiveQuestPage() {
  const [remainingMinutes, setRemainingMinutes] = useState(240);
  const [budgetEgp, setBudgetEgp] = useState('1000');
  const [visitorCategory, setVisitorCategory] = useState<VisitorCategory>('egyptianAdult');
  const [interest, setInterest] = useState<QuestInterest>('balanced');
  const [effort, setEffort] = useState<QuestEffort>('balanced');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer hydration state updates until after the effect body to avoid cascading renders.
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { completedIds?: string[]; skippedIds?: string[] };
          setCompletedIds(Array.isArray(parsed.completedIds) ? parsed.completedIds : []);
          setSkippedIds(Array.isArray(parsed.skippedIds) ? parsed.skippedIds : []);
        }
      } catch {
        // Invalid local progress is ignored; the planner remains usable.
      } finally {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedIds, skippedIds }));
    } catch {
      // Storage can be unavailable in private browsing or under device restrictions.
    }
  }, [completedIds, skippedIds, ready]);

  const budget = Number(budgetEgp);
  const validBudget = Number.isFinite(budget) && budget >= 0;
  const plan = useMemo(() => buildLiveQuest(officialSites, {
    remainingMinutes,
    budgetEgp: validBudget ? budget : 0,
    visitorCategory,
    interest,
    effort,
    completedIds,
    skippedIds,
  }), [remainingMinutes, budget, validBudget, visitorCategory, interest, effort, completedIds, skippedIds]);

  const markCompleted = (id: string) => {
    setCompletedIds((current) => current.includes(id) ? current : [...current, id]);
    setSkippedIds((current) => current.filter((item) => item !== id));
  };
  const markSkipped = (id: string) => {
    setSkippedIds((current) => current.includes(id) ? current : [...current, id]);
    setCompletedIds((current) => current.filter((item) => item !== id));
  };
  const resetProgress = () => {
    setCompletedIds([]);
    setSkippedIds([]);
  };

  return (
    <main className="wrap page">
      <div className="eyebrow">LIVE QUEST / ADAPTIVE DAY PLANNER</div>
      <h1>خلّي خطتك تتكيّف مع يومك</h1>
      <p className="lead">
        حدّث الوقت والميزانية، وسجّل الأماكن التي زرتها أو قررت تجاوزها؛ يعيد المحرك ترتيب الخيارات من بيانات المواقع الموجودة بالمشروع.
        لا يحتاج حسابًا ولا يرسل تقدمك إلى خادم.
      </p>

      <section className="panel planner" aria-label="إعدادات إعادة تخطيط اليوم">
        <div className="field">
          <label htmlFor="remaining-time">الوقت المتبقي / Time left</label>
          <select id="remaining-time" value={remainingMinutes} onChange={(event) => setRemainingMinutes(Number(event.target.value))}>
            <option value={60}>ساعة واحدة</option>
            <option value={120}>ساعتان</option>
            <option value={240}>4 ساعات</option>
            <option value={360}>6 ساعات</option>
            <option value={480}>يوم طويل — 8 ساعات</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="quest-budget">ميزانية التذاكر المتبقية بالجنيه / Ticket budget (EGP)</label>
          <input id="quest-budget" type="number" min="0" step="10" inputMode="numeric" value={budgetEgp} onChange={(event) => setBudgetEgp(event.target.value)} aria-invalid={!validBudget} />
          {!validBudget && <p role="alert">أدخل ميزانية صحيحة تساوي صفرًا أو أكثر.</p>}
        </div>
        <div className="field">
          <label htmlFor="visitor-category">فئة التذكرة / Ticket category</label>
          <select id="visitor-category" value={visitorCategory} onChange={(event) => setVisitorCategory(event.target.value as VisitorCategory)}>
            <option value="egyptianAdult">مصري — بالغ</option>
            <option value="egyptianStudent">مصري — طالب</option>
            <option value="foreignAdult">زائر أجنبي — بالغ</option>
            <option value="foreignStudent">زائر أجنبي — طالب</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="quest-interest">أهم أولوية / Main interest</label>
          <select id="quest-interest" value={interest} onChange={(event) => setInterest(event.target.value as QuestInterest)}>
            <option value="balanced">خطة متوازنة</option>
            <option value="history">التاريخ والآثار</option>
            <option value="photography">التصوير</option>
            <option value="family">وقت زيارة أقصر نسبيًا</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="quest-effort">مستوى المجهود / Pace</label>
          <select id="quest-effort" value={effort} onChange={(event) => setEffort(event.target.value as QuestEffort)}>
            <option value="light">خفيف مع وقت أكثر للراحة</option>
            <option value="balanced">متوازن</option>
            <option value="active">نشط</option>
          </select>
        </div>
      </section>

      <section className="section" aria-live="polite">
        <div className="section-head">
          <div>
            <span className="tag">YOUR UPDATED PLAN</span>
            <h2>خطة اليوم بعد التعديل</h2>
            <p className="sub">الأرقام تقديرات تخطيطية مبنية على البيانات المتاحة، وليست تتبعًا حيًا للموقع أو الزحام.</p>
          </div>
          <button className="btn alt" type="button" onClick={resetProgress}>إعادة ضبط التقدم</button>
        </div>

        <div className="grid">
          <article className="card"><span className="tag">PLANNED TIME</span><h3>{plan.totalMinutes} دقيقة</h3><p>وقت الزيارة وفواصل انتقال تقديرية.</p></article>
          <article className="card"><span className="tag">TICKET TOTAL</span><h3>{plan.totalTicketEgp} ج.م</h3><p>إجمالي تخطيطي من بيانات المشروع؛ ليس سعرًا حيًا مؤكدًا.</p></article>
          <article className="card"><span className="tag">BUDGET LEFT</span><h3>{plan.remainingBudgetEgp} ج.م</h3><p>المتبقي من ميزانية التذاكر فقط، وليس كامل مصروفات اليوم.</p></article>
        </div>

        {plan.stops.length === 0 ? (
          <div className="notice" role="status">
            لا توجد خيارات ضمن الوقت والميزانية المحددين بعد استبعاد الأماكن المكتملة أو المتجاوزة. زوّد الوقت أو الميزانية، أو أعد ضبط التقدم.
          </div>
        ) : (
          <div className="grid">
            {plan.stops.map((stop, index) => (
              <article className="card" key={stop.site.id}>
                <span className="tag">STOP {index + 1} · {stop.visitMinutes} MIN EST.</span>
                <h3>{stop.site.arabicTitle} · {stop.site.title}</h3>
                <p>تذكرة الفئة المختارة: {stop.ticketEgp} {stop.site.currency}</p>
                <p>{stop.reason}</p>
                <p>الجدول المنشور: {stop.site.hours}</p>
                <p>حالة البيانات: {stop.site.status} · آخر مراجعة مسجلة: {stop.site.lastReviewed}</p>
                <div className="actions">
                  <a className="btn alt" href={stop.site.sourceUrl} target="_blank" rel="noreferrer">افتح المصدر الرسمي ↗</a>
                  <button className="btn" type="button" onClick={() => markCompleted(stop.site.id)}>تمت الزيارة</button>
                  <button className="btn alt" type="button" onClick={() => markSkipped(stop.site.id)}>تجاوز المكان</button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="notice">
          <strong>مهم قبل التحرك:</strong>
          <ul>{plan.notices.map((notice) => <li key={notice}>{notice}</li>)}</ul>
        </div>
        <p className="sub">تقدم الزيارة يُحفظ محليًا على هذا الجهاز فقط. <Link href="/price-check">راجع الأسعار</Link> · <a href="https://mota.gov.eg/ar/الخدمات-الرقمية/المواقع-الأثرية-والمتاحف/شراء-تذاكر-الزيارة/شراء-تذاكر-الزيارة/" target="_blank" rel="noreferrer">بوابة التذاكر الرسمية ↗</a> · <Link href="/transport">راجع خيارات التنقل</Link> · <Link href="/report-issue">أبلغ عن معلومة خاطئة</Link>.</p>
      </section>
    </main>
  );
}
