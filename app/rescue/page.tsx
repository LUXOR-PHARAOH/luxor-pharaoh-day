'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const cases = [
  ['🚕','مشكلة تنقل / Transport','اتفق على نقطة الانطلاق والوصول والسعر قبل التحرك. إذا تعطل النقل، ارجع إلى Transport بدل الاعتماد على معلومة غير مؤكدة.','/transport'],
  ['💰','السعر غير واضح / Price','لا تدفع قبل معرفة المبلغ وما يشمله. استخدم Price Check ثم احتفظ بأي إيصال أو إثبات دفع.','/price-check'],
  ['🏺','مكان مغلق أو تغيرت الخطة / Closed','لا نفترض التوافر. اختر بديلًا حسب الوقت والميزانية والاهتمام من What Can I Do Now?','/what-can-i-do-now'],
  ['📣','معلومة تبدو خاطئة / Report','أرسل البلاغ للمراجعة. البلاغ لا يغيّر بيانات الإنتاج تلقائيًا.','/report-issue'],
  ['💎','أحتاج مساعدة شخصية / VIB','ابدأ بطلب VIB لشرح الخطوة التالية. الحجز أو الدفع أو الخدمة المنظمة لا تُعتبر متاحة إلا إذا ظهرت بحالة تشغيل مؤكدة.','/vib'],
  ['🚨','خطر فوري / Emergency','في الخطر الفوري لا تنتظر المنصة: استخدم الجهة المختصة مباشرة.','/emergency'],
] as const;

const priorities = ['أريد حلًا سريعًا','أريد أقل تكلفة','أريد أقل مجهود','أحتاج مساعدة الآن'];

export default function Rescue() {
  const [priority, setPriority] = useState(priorities[0]);
  const [details, setDetails] = useState('');
  const summary = useMemo(
    () => details.trim()
      ? `الأولوية: ${priority}. وصف الموقف: ${details.trim()}`
      : `الأولوية: ${priority}. اختر المسار الأقرب لموقفك ثم راجع المصدر قبل أي قرار مالي.`,
    [priority, details]
  );

  return (
    <main className="wrap page">
      <div className="eyebrow">PHARAOH RESCUE / إنقاذ الرحلة</div>
      <h1>إنقاذ الرحلة<br/><span>حصلت مشكلة؟ خلّي أول خطوة واضحة.</span></h1>
      <p className="lead">
        مركز Recovery داخل LUXOR PHARAOH DAY. لا نعد بحل أو توافر خدمة غير متحقق؛
        نرتب لك مسار القرار الصحيح ونوضح متى تحتاج جهة رسمية أو دعمًا مباشرًا.
      </p>

      <section className="hero-mini">
        <div>
          <span className="tag">RECOVERY FLOW</span>
          <h2>Situation → Check → Options → Go → Recovery</h2>
          <p>ابدأ بالأولوية، ثم اختر نوع المشكلة. في الطوارئ لا تنتظر التطبيق.</p>
        </div>
        <div className="actions">
          <Link className="btn" href="/visitor-center">مركز الزائر</Link>
          <Link className="btn alt" href="/help">مساعدة</Link>
        </div>
      </section>

      <section className="panel">
        <div className="field">
          <label>إيه أهم حاجة دلوقتي؟ / Priority</label>
          <div className="choice-row">
            {priorities.map((item) => (
              <button
                type="button"
                className={priority === item ? 'choice active' : 'choice'}
                onClick={() => setPriority(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="details">وصف مختصر / Situation</label>
          <textarea
            id="details"
            rows={4}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="مثال: المكان اتقفل وأنا فاضلي ساعتين..."
          />
        </div>
        <div className="result" aria-live="polite">
          <strong>ملخص الموقف</strong>
          <p>{summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="grid">
          {cases.map(([icon, title, description, href]) => (
            <article className="card" key={title}>
              <span className="visitor-icon" aria-hidden="true">{icon}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <Link className="card-link" href={href}>فتح المسار →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>قاعدة أمان مهمة</h2>
        <p className="sub">
          لا ترسل OTP أو كلمات المرور أو بيانات البطاقات. LUXOR PHARAOH DAY منصة معلومات وتخطيط مستقلة،
          وليست شرطة أو إسعافًا أو جهة حكومية.
        </p>
        <div className="actions">
          <Link className="btn" href="/emergency">طوارئ / Emergency</Link>
          <Link className="btn alt" href="/report-issue">Report an Issue</Link>
        </div>
      </section>
    </main>
  );
}
