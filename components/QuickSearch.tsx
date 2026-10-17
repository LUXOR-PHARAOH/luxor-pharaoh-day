'use client';

import {FormEvent,useState} from 'react';
import {useRouter} from 'next/navigation';
import {trackEvent} from '@/lib/analytics';
import {classifySearchIntent} from '@/lib/search-index';

export default function QuickSearch(){
  const [query,setQuery]=useState('');
  const router=useRouter();
  const submit=(event:FormEvent)=>{
    event.preventDefault();
    const value=query.trim();
    if(!value) return;
    trackEvent('search_submitted',{intent:classifySearchIntent(value)});
    router.push('/search?q='+encodeURIComponent(value));
  };
  return <section className="search-panel" aria-label="Search / بحث">
    <div><span className="tag">SEARCH / بحث</span><h2>قول لنا بتدور على إيه</h2><p className="sub">ابحث بالعربي أو English — البحث محلي وسريع، ونقيس نوع الاحتياج فقط.</p></div>
    <form className="search-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="quick-search">Search</label>
      <input id="quick-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="مثال: سعر وادي الملوك / Valley of the Kings price" autoComplete="off"/>
      <button className="btn" type="submit">بحث / Search</button>
    </form>
  </section>;
}
