import Link from 'next/link';

const services=[
['🛬','Arrival Rescue','خطة وصول عملية: نقطة البداية، الاتصال، أول حركة، وأول ساعاتك في الأقصر.'],
['⚡','Last-Minute Day Rescue','إعادة بناء اليوم عندما يتبقى لك ساعتان أو نصف يوم أو حدث تغيير مفاجئ.'],
['💎','VIB Personal Desk','مساعدة شخصية في ترتيب الخيارات والطلبات الخاصة؛ أي خدمة منظمة أو مدفوعة لا تُفعّل إلا بعد تحقق قانوني وتشغيلي.'],
['🛡️','Fair Price Guardian','قائمة تحقق للسعر والمشمول والاستثناءات والأسئلة التي يجب طرحها قبل الدفع.'],
['📸','Pharaoh Photo Route','اقتراح ترتيب اليوم حسب الضوء والوقت والاهتمام بالتصوير، دون ادعاء حجز مصور أو موقع.'],
['👨‍👩‍👧','Family Ease','مسارات أخف، فترات راحة، ونصائح لتقليل المشي والانتظار.'],
['♿','Easy-Move Mode','اختيارات أقل مجهودًا وأسئلة تحقق عن السلالم والمسافات قبل اعتماد الخطة.'],
['🌙','Night Return Plan','تخطيط المساء مع نقطة خروج ووقت عودة وخطة بديلة.'],
['🧰','Problem Recovery','لو أُغلق مكان أو تغيرت خطة أو ظهر خلاف: بدائل حسب الوقت والميزانية والموقع.'],
['📶','Digital Trip Pack','خطة محلية محفوظة على الجهاز: الأماكن المختارة، الملاحظات، أرقام الطوارئ ومسارات المساعدة.'],
['🛍️','Daily Essentials','إرشادات للاتصال، المال، الشحن، المياه والاحتياجات اليومية دون ادعاء توفر لحظي غير متحقق.'],
['📣','Truth & Report','إبلاغ عن معلومة خاطئة أو تجربة تحتاج مراجعة؛ البلاغ لا يعدّل البيانات تلقائيًا.'],
];

export default function VibPage(){return <main className="wrap page"><div className="eyebrow">VIB · VERY IMPORTANT VISITOR</div><h1>خدمات تتعامل مع احتياجك — مش مجرد قائمة أماكن</h1><p className="lead">طبقة خدمات جديدة داخل LUXOR PHARAOH DAY: من الوصول والإنقاذ السريع لليوم إلى التخطيط العائلي والتصوير والمساعدة الشخصية. VIB هنا تعني <b>Very Important Visitor</b> — كل زائر له احتياج مهم.</p><div className="notice"><b>حدود التشغيل:</b> VIB لا تعني أن كل خدمة محجوزة أو مضمونة. الحجز، النقل المدفوع، الجولات، أو أي نشاط منظم لا يظهر كخدمة جاهزة إلا بعد التحقق القانوني والتشغيلي من الجهة والخدمة.</div><div className="grid visitor-grid">{services.map(([icon,title,desc])=><article className="card service-card" key={title}><span className="visitor-icon" aria-hidden="true">{icon}</span><h2>{title}</h2><p>{desc}</p><Link className="card-link" href="/contact">اطلب معرفة الخطوة التالية →</Link></article>)}</div><section className="section" id="recovery"><div className="hero-mini"><div><span className="tag">VIB FLOW</span><h2>قل لي المشكلة — وأنا أرتب لك المسار</h2><p>Situation → Check → Options → Plan → Go → Recovery</p></div><div className="actions"><a className="btn" href="https://wa.me/201012801568?text=LUXOR%20PHARAOH%20DAY%20VIB%20DESK%20-%20I%20need%20help%20with%3A%20">ابدأ طلب VIB / Start</a><Link className="btn alt" href="/visitor-center">مركز الزائر</Link></div></div></section></main>}
