import Link from 'next/link';

export default function NightPlan() {
  return (
    <main className="wrap page">
      <div className="eyebrow">NIGHT PLAN / خطة المساء</div>
      <h1>المساء بخطة رجوع واضحة</h1>
      <p className="lead">
        لا نعرض مكانًا على أنه مفتوح ليلًا بدون مصدر مناسب. خطتك الليلية تبدأ من وقت
        الخروج ونقطة العودة، وليس من قائمة عشوائية.
      </p>

      <section className="grid">
        <article className="card">
          <h2>1 · حدّد نقطة العودة</h2>
          <p>فندق / محطة / نقطة لقاء — واحفظها محليًا فقط إذا كانت مناسبة لك.</p>
        </article>

        <article className="card">
          <h2>2 · تحقق من المكان</h2>
          <p>افتح المصدر الرسمي أو جهة التشغيل قبل الانطلاق.</p>
        </article>

        <article className="card">
          <h2>3 · اترك خطة بديلة</h2>
          <p>إذا لم يتأكد التوافر، استخدم What Can I Do Now? أو Pharaoh Rescue.</p>
          <Link className="card-link" href="/rescue">
            خطة بديلة →
          </Link>
        </article>
      </section>
    </main>
  );
}
