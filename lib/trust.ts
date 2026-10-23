import type { Site, VerificationStatus } from './types';

export type TrustState = VerificationStatus | 'LIVE' | 'SCHEDULED' | 'STALE';

export type TrustRecord = {
  state: TrustState;
  labelAr: string;
  labelEn: string;
  source: string;
  sourceUrl: string;
  lastReviewed: string;
  reviewAfterDays: number;
  ageDays: number;
  daysUntilReview: number;
  dueSoon: boolean;
  isFresh: boolean;
};

const DAY=86400000;
const REVIEW_WINDOW_DAYS=14;
const DUE_SOON_DAYS=3;

export function daysSince(iso:string, now=new Date()):number{
  const t=Date.parse(iso);
  if(!Number.isFinite(t)) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.floor((now.getTime()-t)/DAY));
}

export function trustForSite(site:Site, now=new Date()):TrustRecord{
  const age=daysSince(site.lastReviewed,now);
  const reviewAfterDays=REVIEW_WINDOW_DAYS;
  const daysUntilReview=Number.isFinite(age)?Math.max(0,reviewAfterDays-age):0;
  const stale=age>reviewAfterDays;
  const dueSoon=!stale && daysUntilReview<=DUE_SOON_DAYS;
  const state:TrustState=stale?'STALE':site.status;
  const labels:Record<TrustState,[string,string]>={
    VERIFIED:['مؤكد من المصدر','Verified source'],
    ESTIMATED:['تقديري','Estimated'],
    NEEDS_REVIEW:['يحتاج مراجعة','Needs review'],
    LIVE:['مباشر / حي','Live'],
    SCHEDULED:['مجدول من المصدر','Scheduled from source'],
    STALE:['بيانات قديمة','Stale data'],
  };
  const [labelAr,labelEn]=labels[state];
  return {state,labelAr,labelEn,source:site.source,sourceUrl:site.sourceUrl,lastReviewed:site.lastReviewed,reviewAfterDays,ageDays:age,daysUntilReview,dueSoon,isFresh:!stale};
}

export function reviewDue(site:Site,now=new Date()):boolean{
  return !trustForSite(site,now).isFresh;
}

export function freshnessSummary(sites:Site[],now=new Date()){
  const records=sites.map(s=>({site:s,trust:trustForSite(s,now)}));
  return {
    total:records.length,
    fresh:records.filter(x=>x.trust.isFresh).length,
    stale:records.filter(x=>!x.trust.isFresh).length,
    dueSoon:records.filter(x=>x.trust.dueSoon).length,
    needsReview:records.filter(x=>x.trust.state==='NEEDS_REVIEW'||x.trust.state==='STALE').length,
    records,
  };
}
