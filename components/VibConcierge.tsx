'use client';

import {useMemo,useState} from 'react';

const needs=[
  ['⚡','إنقاذ اليوم','عندي وقت قليل وخطة اليوم محتاجة ترتيب.'],
  ['🛬','وصول ذكي','وصلت الأقصر وأحتاج أول خطوات واضحة.'],
  ['💎','VIB / Very Important Visitor','أريد مساعدة شخصية وخيارات مميزة بعد التحقق.'],
  ['🛡️','حماية من المفاجآت','السعر أو الخدمة غير واضحين وأريد قائمة تحقق.'],
  ['👨‍👩‍👧','عائلة','أريد يومًا أخف وأسهل للأطفال.'],
  ['📸','يوم الصور','أريد ترتيب اليوم حول أفضل أجواء التصوير.'],
  ['🌙','المساء','أريد فكرة مسائية مع خطة عودة واضحة.'],
  ['🧰','احتياج عاجل','أحتاج حلًا عمليًا لمشكلة حدثت الآن.'],
] as const;

type NeedIcon = typeof needs[number][0];

export default function VibConcierge(){
  const [selected,setSelected]=useState<NeedIcon>(needs[0][0]);
  const item=useMemo(()=>needs.find(x=>x[0]===selected)??needs[0],[selected]);
  const message=encodeURIComponent('LUXOR PHARAOH DAY — Concierge Request\nNeed: '+item[1]+'\nDetails: ');
  return <section className="section concierge">
    <div className="eyebrow">VIB DESK · VERY IMPORTANT VISITOR</div>
    <h2>مش مجرد برنامج سياحي — مساعد يتعامل مع الموقف</h2>
    <p className="sub">اختَر احتياجك. المنصة ترتب لك الخطوة التالية، وتوضح ما يمكن تنفيذه الآن وما يحتاج تحققًا أو شريكًا مرخصًا.</p>
    <div className="need-grid">{needs.map(([icon,title,desc])=><button type="button" className={selected===icon?'need-card active':'need-card'} key={title} onClick={()=>setSelected(icon)} data-analytics-event="service_need_selected" data-analytics-value={title}><span>{icon}</span><strong>{title}</strong><small>{desc}</small></button>)}</div>
    <div className="concierge-result">
      <div><span className="tag">SELECTED</span><h3>{item[1]}</h3><p>{item[2]}</p></div>
      <div className="actions"><a className="btn" href={'https://wa.me/201012801568?text='+message} target="_blank" rel="noreferrer">اطلب المساعدة / Ask VIB Desk</a><a className="btn alt" href="/vib">استكشف VIB والخدمات</a></div>
    </div>
  </section>;
}
