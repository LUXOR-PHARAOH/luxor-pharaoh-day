'use client';

import {useEffect, useMemo, useState, useSyncExternalStore} from 'react';

type Step = {id:string; title:string; detail:string};
type AcceptanceState = {checked:Record<string,boolean>; evidence:string};

const steps: Step[] = [
  {id:'production',title:'Open Production',detail:'افتح رابط الإنتاج الحالي وتأكد أن النطاق هو Production وليس Preview.'},
  {id:'touch',title:'Touch Navigation',detail:'اختبر الضغط والتمرير والتنقل بإصبعك على الهاتف أو عبر Device Mode.'},
  {id:'planner',title:'Planner',detail:'افتح What Can I Do Now? وتأكد من ظهور خيارات الوقت والاهتمامات والميزانية.'},
  {id:'generate',title:'Generate',detail:'غيّر اختيارًا واضغط Generate/توليد، ثم تحقق من ظهور نتيجة مفهومة.'},
  {id:'save',title:'Save',detail:'افتح My Plan واحفظ الخطة محليًا وتحقق من حالة الحفظ.'},
  {id:'clear',title:'Clear',detail:'امسح الخطة وتأكد أن الحالة تعود إلى الحالة الفارغة بدون أخطاء.'},
  {id:'sound-on-off',title:'Sound ON/OFF',detail:'شغّل الصوت من زر المستخدم ثم أوقفه. لا يجب أن يبدأ تلقائيًا.'},
  {id:'rtl',title:'RTL',detail:'تحقق من الاتجاه العربي والمحاذاة والأزرار والقوائم بدون قص أو تداخل.'},
  {id:'ltr',title:'LTR',detail:'اختبر المحتوى الإنجليزي واتجاه LTR وتأكد من عدم كسر التخطيط.'},
  {id:'reduced-motion',title:'Reduced Motion',detail:'فعّل prefers-reduced-motion وتأكد أن الوظائف الأساسية تظل قابلة للاستخدام.'},
  {id:'console',title:'Console',detail:'افتح DevTools > Console وتأكد من عدم وجود أخطاء JavaScript غير متوقعة.'},
  {id:'responsive',title:'Responsive Desktop/Mobile',detail:'اختبر Mobile وDesktop وقياسات وسطية، مع اللمس ولوحة المفاتيح عند الإمكان.'},
  {id:'final',title:'Final Production Check',detail:'راجع HTTPS والروابط و404 المقصود وrobots وsitemap وmanifest وmetadata وعدم وجود أسرار.'},
];

const storageKey='luxor-pharaoh-day-production-acceptance-v1';
const serverSnapshot: AcceptanceState = {checked:{}, evidence:''};
let snapshot: AcceptanceState = serverSnapshot;
const listeners = new Set<() => void>();

function getSnapshot(){ return snapshot; }
function getServerSnapshot(){ return serverSnapshot; }
function subscribe(listener:()=>void){ listeners.add(listener); return ()=>listeners.delete(listener); }

function readStoredState(): AcceptanceState {
  if(typeof window==='undefined') return serverSnapshot;
  try {
    const raw=window.localStorage.getItem(storageKey);
    if(!raw) return serverSnapshot;
    const parsed=JSON.parse(raw);
    return {
      checked: parsed?.checked && typeof parsed.checked === 'object' ? parsed.checked : {},
      evidence: typeof parsed?.evidence === 'string' ? parsed.evidence : '',
    };
  } catch {
    return serverSnapshot;
  }
}

function persist(next:AcceptanceState){
  try {
    window.localStorage.setItem(storageKey,JSON.stringify({...next,updatedAt:new Date().toISOString()}));
  } catch {}
}

function publish(next:AcceptanceState){
  snapshot=next;
  persist(next);
  listeners.forEach(listener=>listener());
}

function hydrate(){
  const stored=readStoredState();
  if(stored!==snapshot){
    snapshot=stored;
    listeners.forEach(listener=>listener());
  }
}

export default function ProductionAcceptance(){
  const state=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot);
  const [copied,setCopied]=useState(false);

  useEffect(()=>{hydrate();},[]);

  const {checked,evidence}=state;
  const completed=steps.filter(s=>checked[s.id]).length;
  const ready=completed===steps.length;
  const report=useMemo(()=>[
    'LUXOR PHARAOH DAY — PRODUCTION BROWSER ACCEPTANCE',
    'Status: '+(ready?'READY FOR FINAL ACCEPTANCE':'INCOMPLETE'),
    'Completed: '+completed+'/'+steps.length,
    'Production URL: '+(typeof window!=='undefined'?window.location.origin:'Production URL'),
    'Checked at: '+new Date().toISOString(),
    evidence?'Evidence: '+evidence:'Evidence: not supplied','',
    ...steps.map((s,i)=>(i+1)+'. ['+(checked[s.id]?'x':' ')+'] '+s.title+' — '+s.detail),
  ].join('\n'),[checked,completed,evidence,ready]);

  async function copyReport(){
    try{await navigator.clipboard.writeText(report);setCopied(true);setTimeout(()=>setCopied(false),1600);}catch{}
  }
  function reset(){
    try{window.localStorage.removeItem(storageKey);}catch{}
    publish(serverSnapshot);
  }

  return <section className="acceptance">
    <div className="acceptance-head"><div><div className="eyebrow">PRODUCTION ACCEPTANCE</div><h1>دليل المتصفح التفاعلي</h1><p className="sub">بوابة قبول تشغيلية لتوثيق الاختبار اليدوي النهائي. لا تغيّر بيانات الإنتاج ولا تمنح حالة VERIFIED تلقائيًا.</p></div><div className={'acceptance-status '+(ready?'ready':'')} aria-live="polite"><b>{ready?'READY FOR FINAL ACCEPTANCE':'INCOMPLETE'}</b><span>{completed}/{steps.length} مكتملة</span></div></div>
    <div className="acceptance-actions">
      <a className="button primary" href="/" target="_blank" rel="noreferrer">فتح Production ↗</a>
      <a className="button" href="/what-can-i-do-now" target="_blank" rel="noreferrer">فتح Planner ↗</a>
      <button className="button" type="button" onClick={copyReport}>{copied?'تم النسخ ✓':'نسخ تقرير القبول'}</button>
      <button className="button danger" type="button" onClick={reset}>إعادة الاختبار</button>
    </div>
    <div className="acceptance-list">{steps.map((step,index)=><label className={'acceptance-step '+(checked[step.id]?'done':'')} key={step.id}><input type="checkbox" checked={!!checked[step.id]} onChange={e=>publish({...state,checked:{...checked,[step.id]:e.target.checked}})}/><span className="acceptance-number">{index+1}</span><span><strong>{step.title}</strong><small>{step.detail}</small></span></label>)}</div>
    <label className="evidence"><span>دليل/ملاحظات الاختبار (اختياري)</span><textarea value={evidence} onChange={e=>publish({...state,evidence:e.target.value})} placeholder="Chrome Android/Desktop، تاريخ الاختبار، ملاحظات أو رابط دليل..." rows={4}/></label>
    <div className={'acceptance-final '+(ready?'ready':'')} aria-live="polite"><strong>{ready?'بوابة القبول اليدوي مكتملة.':'بوابة القبول اليدوي غير مكتملة.'}</strong><p>{ready?'يمكن الآن مقارنة الدليل مع CI + Vercel Production قبل اعتماد RELEASE_STATUS = VERIFIED.':'أكمل جميع الخطوات. يجب ألا تُعتمد VERIFIED قبل نجاح الاختبارات الآلية ووجود Deployment Production فعلي مطابق للمصدر.'}</p></div>
  </section>;
}
