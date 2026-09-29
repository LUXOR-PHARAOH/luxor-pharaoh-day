'use client';

import { useEffect, useMemo, useState } from 'react';
import { experiences } from '@/lib/data';

const STORAGE_KEY = 'luxor-pharaoh-day-plan-v1';

export function Planner() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try { setIds(JSON.parse(saved) as string[]); } catch { setIds([]); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const selected = useMemo(() => experiences.filter((item) => ids.includes(item.id)), [ids]);

  function toggle(id: string) {
    setIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  async function sharePlan() {
    const title = selected.map((item) => `${item.titleAr} · ${item.titleEn}`).join('\n');
    if (!title) return;
    const payload = `LUXOR PHARAOH DAY — My Luxor Plan\n${title}`;
    if (navigator.share) {
      await navigator.share({ title: 'LUXOR PHARAOH DAY', text: payload });
      return;
    }
    await navigator.clipboard.writeText(payload);
  }

  return (
    <section className="plannerPanel">
      <div>
        <p className="eyebrow">MY LUXOR DAY · خطتي</p>
        <h2><span>ابنِ يومك خطوة بخطوة</span><small>Build your day, one step at a time</small></h2>
        <p className="muted">احفظ اختياراتك على جهازك بدون إنشاء حساب. · Save your plan locally without an account.</p>
      </div>
      <div className="plannerGrid">
        {experiences.map((item) => {
          const active = ids.includes(item.id);
          return (
            <button className={`planChoice ${active ? 'active' : ''}`} key={item.id} onClick={() => toggle(item.id)} aria-pressed={active}>
              <span>{active ? '✓' : '+'}</span>
              <strong>{item.titleAr}</strong>
              <small>{item.titleEn}</small>
            </button>
          );
        })}
      </div>
      <div className="planSummary">
        <div><span>اختياراتك · Selected</span><strong>{selected.length}</strong></div>
        {selected.length > 0 ? (
          <div className="summaryList">{selected.map((item) => <span key={item.id}>✓ {item.titleAr} · {item.titleEn}</span>)}</div>
        ) : <span className="muted">لم تضف تجربة بعد. · No experience selected yet.</span>}
        {selected.length > 0 && <button className="ghost" onClick={sharePlan}>مشاركة الخطة · Share plan</button>}
      </div>
    </section>
  );
}
