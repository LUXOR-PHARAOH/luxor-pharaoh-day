import type {Metadata} from 'next';
import {officialSites} from '@/lib/data';
import {freshnessSummary} from '@/lib/trust';

export const metadata: Metadata = {
  title: 'Verification Control Room',
  robots: {index: false, follow: false},
};

export default async function Verification({
  searchParams,
}: {
  searchParams: Promise<{key?: string}>;
}) {
  const p = await searchParams;
  const enabled = process.env.VERIFICATION_DASHBOARD_ENABLED === 'true';
  const productionLocked = process.env.VERCEL_ENV === 'production';

  // Fail closed: the temporary query-string key is never accepted on Production.
  const authorized =
    !productionLocked &&
    enabled &&
    !!p.key &&
    !!process.env.VERIFICATION_ADMIN_KEY &&
    p.key === process.env.VERIFICATION_ADMIN_KEY;

  if (!authorized) {
    return (
      <main className="wrap page">
        <div className="eyebrow">INTERNAL CONTROL</div>
        <h1>Verification Control Room</h1>
        <p className="notice">
          هذه الواجهة داخلية ومغلقة افتراضيًا. لا يتم قبول مفتاح URL في Production.
          قبل التشغيل التشغيلي يجب وضعها خلف مصادقة حقيقية/حماية Vercel ثم تفعيلها صراحة.
        </p>
      </main>
    );
  }

  const summary = freshnessSummary(officialSites);

  return (
    <main className="wrap page">
      <div className="eyebrow">VERIFICATION CONTROL ROOM</div>
      <h1>مراجعة البيانات قبل Production</h1>
      <p className="lead">
        القاعدة: بلاغ المستخدم لا يعدّل Production. المراجع يفحص المصدر الرسمي،
        يحدّث البيانات في GitHub عبر مراجعة، ثم CI يعيد التحقق.
      </p>

      <div className="grid">
        <article className="card"><h2>Fresh</h2><p>{summary.fresh} / {summary.total}</p></article>
        <article className="card"><h2>Stale</h2><p>{summary.stale}</p></article>
        <article className="card"><h2>Needs review</h2><p>{summary.needsReview}</p></article><article className="card"><h2>Due soon</h2><p>{summary.dueSoon}</p></article>
      </div>

      <section className="section">
        <h2>Queue</h2>
        <div className="list">
          {summary.records.map(({site, trust}) => (
            <article key={site.id}>
              <b>{site.arabicTitle} · {site.title}</b>
              <p>{trust.labelAr} · {trust.ageDays} يوم · {trust.dueSoon?'مراجعة قريبة / Due soon':''} · آخر مراجعة {trust.lastReviewed}</p>
              <a href={site.sourceUrl} target="_blank" rel="noreferrer">افتح المصدر الرسمي →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
