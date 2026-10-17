import Link from 'next/link';

export default function Contact(){
  return <main className="wrap page">
    <div className="eyebrow">CONTACT / تواصل</div>
    <h1>تواصل مع LUXOR PHARAOH DAY</h1>
    <p className="sub">للاستفسارات، التخطيط، الدعم العملي، أو الإبلاغ عن مشكلة. ابدأ برسالة قصيرة وواضحة، وسنحدد ما يمكن تقديمه فعليًا.</p>
    <div className="grid">
      <div className="card"><span className="tag">WHATSAPP</span><h3>واتساب</h3><p>01012801568</p><a className="btn" href="https://wa.me/201012801568" target="_blank" rel="noreferrer">فتح WhatsApp</a></div>
      <div className="card"><span className="tag">EMAIL</span><h3>البريد الإلكتروني</h3><p>youssfalaa296@gmail.com</p><a className="btn alt" href="mailto:youssfalaa296@gmail.com">إرسال بريد</a></div>
      <div className="card"><span className="tag">SOCIAL</span><h3>Instagram</h3><p>المحتوى والتحديثات العامة للمشروع.</p><a className="btn alt" href="https://www.instagram.com/luxor_quest/" target="_blank" rel="noreferrer">Instagram</a></div>
    </div>
    <section className="section">
      <h2>ما الذي يمكن أن نساعدك فيه؟</h2>
      <div className="list">
        <div>التخطيط قبل الوصول وأثناء الرحلة.</div>
        <div>البحث عن المعلومات الرسمية ومراجعة المصادر.</div>
        <div>اقتراح خيارات حسب الوقت والميزانية والاهتمامات.</div>
        <div>مساعدة عملية في فهم الخطوة التالية والتواصل مع الجهات/المقدمين المناسبين عند توفر بيانات موثوقة.</div>
        <div>استقبال بلاغات الأخطاء ومراجعتها.</div>
        <div>الخدمات الإضافية لا تُعتبر متاحة تلقائيًا؛ تُضاف فقط بعد التحقق من إمكانية تقديمها قانونيًا وتشغيليًا.</div>
      </div>
    </section>
    <section className="section">
      <h2>الدفع</h2>
      <p>وسيلة الدفع التي زودتنا بها للمشروع هي Vodafone Cash على نفس رقم التواصل. لن نعرضها كدفع لحجز سياحي أو خدمة منظمة قبل اكتمال المتطلبات القانونية والتشغيلية الخاصة بهذا النوع من النشاط. عند تفعيل خدمة مدفوعة مسموح بها، يجب تأكيد الخدمة والمبلغ والشروط أولًا عبر قناة التواصل.</p>
      <p className="sub">التسجيل للمستخدم مجاني وبدون عقد أو رسوم تسجيل.</p>
    </section>
    <section className="section">
      <h2>روابط سريعة</h2>
      <div className="actions"><Link className="btn alt" href="/trust">Trust & Transparency</Link><Link className="btn alt" href="/terms">Terms</Link><Link className="btn alt" href="/privacy">Privacy</Link></div>
    </section>
  </main>
}
