'use client';

import {useEffect,useState} from 'react';

const KEY='lpd-plan';

export default function Plan(){
  const [plan,setPlan]=useState('');
  const [saved,setSaved]=useState(false);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    try{
      const v=localStorage.getItem(KEY);
      if(v) setPlan(v);
    }finally{
      setReady(true);
    }
  },[]);

  const save=()=>{
    localStorage.setItem(KEY,plan);
    setSaved(true);
  };

  const clear=()=>{
    localStorage.removeItem(KEY);
    setPlan('');
    setSaved(false);
  };

  return <main className="wrap page">
    <div className="eyebrow">MY LUXOR PLAN</div>
    <h1>خطتي في الأقصر</h1>
    <p className="sub">حفظ محلي على هذا الجهاز، بدون حساب أو إرسال للخادم. {ready?'خطتك السابقة متاحة على هذا الجهاز.':'جاري تحميل الخطة المحلية…'}</p>
    <div className="panel">
      <div className="field">
        <label htmlFor="plan">خطتك وملاحظاتك / Your plan</label>
        <textarea id="plan" rows={12} value={plan} onChange={e=>{setPlan(e.target.value);setSaved(false)}} placeholder="مثال: 08:00 بداية اليوم — 10:30 معلم — 13:00 راحة — 17:00 عودة"/>
      </div>
      <div className="actions">
        <button className="btn" onClick={save} disabled={!ready} data-analytics-event="plan_saved" data-analytics-value={plan.trim()?'with_content':'empty'}>حفظ محلي / Save</button>
        <button className="btn alt" onClick={clear} data-analytics-event="plan_cleared">مسح الخطة / Clear</button>
      </div>
      {saved&&<div className="notice" role="status">تم الحفظ على هذا الجهاز.</div>}
      <div className="notice">لا تكتب هنا أرقام بطاقات، كلمات مرور، OTP، أو بيانات حساسة.</div>
    </div>
  </main>;
}
