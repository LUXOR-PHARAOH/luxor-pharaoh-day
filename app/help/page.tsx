import Link from 'next/link';

export default function Help(){
  return <main className="wrap page">
    <div className="eyebrow">HELP / مساعدة</div>
    <h1>مساعدة الزائر</h1>
    <p className="sub">من سؤال بسيط إلى مشكلة أثناء الرحلة، ابدأ من المسار المناسب ثم تواصل معنا إذا احتجت دعمًا.</p>
    <div className="grid">
      <div className="card"><h3>معلومة أو سعر</h3><p>ابدأ من Price Check وراجع المصدر والتاريخ.</p><Link className="btn alt" href="/price-check">Price Check</Link></div>
      <div className="card"><h3>خطة يوم</h3><p>استخدم What Can I Do Now? ثم احفظ خطتك محليًا.</p><Link className="btn alt" href="/plan">My Plan</Link></div>
      <div className="card"><h3>خطأ في المعلومات</h3><p>سجّل المشكلة للمراجعة بدل الاعتماد عليها.</p><Link className="btn alt" href="/report-issue">Report an Issue</Link></div>
      <div className="card"><h3>دعم مباشر</h3><p>للاستفسارات العامة أو طلب المساعدة، استخدم قنوات التواصل المنشورة.</p><Link className="btn alt" href="/contact">Contact / تواصل</Link></div>
    </div>
    <section className="section">
      <h2>مهم قبل أي دفع</h2>
      <p>لا ترسل رقمًا سريًا، OTP، كلمة مرور، بيانات بطاقة أو بيانات حساسة عبر واتساب أو البريد. أي دفع لا يتم إلا بعد معرفة الخدمة والجهة والمبلغ وشروطها بوضوح.</p>
    </section>
  </main>
}
