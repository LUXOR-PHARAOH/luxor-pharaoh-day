import type { TrustRecord } from '@/lib/trust';

type Props={trust?:TrustRecord;status?:'VERIFIED'|'ESTIMATED'|'NEEDS_REVIEW'};

export default function TrustBadge({trust,status='VERIFIED'}:Props){
  if(trust) return <span className="tag" title={`Source: ${trust.source} · Last reviewed: ${trust.lastReviewed} · Review window: ${trust.reviewAfterDays} days`}>{trust.labelAr} · {trust.labelEn}</span>;
  const label=status==='VERIFIED'?'Verified / موثوق':status==='ESTIMATED'?'Estimated / تقديري':'Needs Review / يحتاج مراجعة';
  return <span className="tag" title="الحالة مبنية على المصدر وسجل المراجعة">{label}</span>;
}
