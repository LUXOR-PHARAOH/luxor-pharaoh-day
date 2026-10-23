'use client';

import {useEffect,useState} from 'react';

export default function NetworkStatus(){
  const [online,setOnline]=useState(true);
  const [showHelp,setShowHelp]=useState(false);

  useEffect(()=>{
    const sync=()=>setOnline(navigator.onLine);
    sync();
    window.addEventListener('online',sync);
    window.addEventListener('offline',sync);

    const onClick=(event:MouseEvent)=>{
      const target=event.target as HTMLElement|null;
      const link=target?.closest<HTMLAnchorElement>('a[data-requires-network="true"]');
      if(!link || navigator.onLine) return;
      event.preventDefault();
      event.stopPropagation();
      setShowHelp(true);
    };

    document.addEventListener('click',onClick,true);
    return ()=>{
      window.removeEventListener('online',sync);
      window.removeEventListener('offline',sync);
      document.removeEventListener('click',onClick,true);
    };
  },[]);

  if(online && !showHelp) return null;

  return <>
    {!online && <div className="network-banner" role="status" aria-live="polite">
      <span className="network-dot" aria-hidden="true">●</span>
      <span><b>بدون إنترنت / Offline</b> — الأدوات المحلية ما زالت تعمل. بعض الخدمات تحتاج اتصالًا.</span>
      <button type="button" onClick={()=>setShowHelp(true)}>ما الذي يحتاج الإنترنت؟</button>
    </div>}

    {showHelp && !online && <div className="network-modal-backdrop" role="presentation" onClick={()=>setShowHelp(false)}>
      <section className="network-modal" role="dialog" aria-modal="true" aria-labelledby="network-title" onClick={e=>e.stopPropagation()}>
        <div className="network-icon" aria-hidden="true">⌁</div>
        <span className="tag">INTERNET REQUIRED / يحتاج اتصالًا</span>
        <h2 id="network-title">شغّل الإنترنت للمتابعة</h2>
        <p>هذه الوظيفة تحتاج اتصالًا لأنها تتعامل مع خدمة أو معلومة يجب طلبها من الشبكة الآن. يمكنك الاستمرار في استخدام الأدوات المحفوظة على الجهاز بدون إنترنت.</p>
        <div className="network-actions">
          <button className="btn" type="button" onClick={()=>window.location.reload()}>حاول مرة أخرى<br/><small>Try again</small></button>
          <button className="btn alt" type="button" onClick={()=>setShowHelp(false)}>متابعة بدون إنترنت<br/><small>Stay offline</small></button>
        </div>
        <div className="network-offline-links">
          <a href="/tourist-pocket">جيب السائح / Tourist Pocket</a>
          <a href="/plan">خطتي / My Plan</a>
          <a href="/smart-day">يومي الذكي / Smart Day</a>
        </div>
      </section>
    </div>}
  </>;
}
