'use client';
import {useState} from 'react';

export default function Report(){
  const [sent,setSent]=useState(false);
  const [details,setDetails]=useState('');
  const [place,setPlace]=useState('');
  const [type,setType]=useState('معلومة قديمة');

  const whatsappText=encodeURIComponent(`بلاغ LUXOR PHARAOH DAY\nالنوع: ${type}\nالمكان/الرابط: ${place}\nالتفاصيل: ${details}`);
  const mailBody=encodeURIComponent(`النوع: ${type}\nالمكان/الرابط: ${place}\nالتفاصيل: ${details}`);

  return <main className="wrap page">
    <div className="eyebrow">REPORT / بلّغ</div>
    <h1>Report an Issue</h1>
    <p className="sub">البلاغ لا يغيّر بيانات الإنتاج تلقائيًا؛ تتم مراجعته قبل اعتماد أي تصحيح.</p>
    {sent?<div className="notice">تم تجهيز البلاغ. اختر قناة الإرسال أدناه.</div>:null}
    <div className="panel">
      <div className="formgrid">
        <div className="field"><label htmlFor="type">نوع المشكلة</label><select id="type" value={type} onChange={e=>setType(e.target.value)}><option>معلومة قديمة</option><option>سعر</option><option>رابط</option><option>مشكلة تقنية</option><option>معلومة غير صحيحة</option></select></div>
        <div className="field"><label htmlFor="place">الصفحة أو المكان</label><input id="place" value={place} onChange={e=>setPlace(e.target.value)} placeholder="مثال: Luxor Temple أو رابط الصفحة"/></div>
      </div>
      <div className="field" style={{marginTop:14}}><label htmlFor="details">التفاصيل</label><textarea id="details" rows={5} value={details} onChange={e=>setDetails(e.target.value)} placeholder="ما الذي يحتاج تصحيحًا؟"/></div>
      <button className="btn" style={{marginTop:14}} onClick={()=>setSent(true)} data-analytics-event="issue_prepared" data-analytics-value={type}>تجهيز البلاغ / Prepare report</button>
      {sent?<div className="actions" style={{marginTop:14}}>
        <a className="btn" href={`https://wa.me/201012801568?text=${whatsappText}`} target="_blank" rel="noreferrer">إرسال عبر WhatsApp</a>
        <a className="btn alt" href={`mailto:youssfalaa296@gmail.com?subject=Luxor%20Pharaoh%20Day%20Issue&body=${mailBody}`}>إرسال بالبريد</a>
      </div>:null}
    </div>
  </main>
}
