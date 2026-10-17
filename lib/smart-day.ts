import { officialSites } from '@/lib/data';

export type BuilderInput={duration:'2h'|'half'|'full';interest:string;effort:string;kids:boolean;avoidCrowds:boolean;budget:string};

function score(title:string,interest:string,kids:boolean,avoidCrowds:boolean){
  let s=0;
  const t=title.toLowerCase();
  if(interest==='آثار وتاريخ') s+=3;
  if(interest==='تصوير') s+=2;
  if(interest==='النيل') s+= t.includes('luxor')?1:0;
  if(kids && t.includes('temple')) s+=1;
  if(avoidCrowds) s+=1;
  return s;
}
export function buildDay(input:BuilderInput){
  const limit=input.duration==='2h'?1:input.duration==='half'?2:3;
  const ranked=[...officialSites].sort((a,b)=>score(b.title,input.interest,input.kids,input.avoidCrowds)-score(a.title,input.interest,input.kids,input.avoidCrowds));
  const selected=ranked.slice(0,Math.min(limit,ranked.length));
  return {selected,notes:[
    input.effort==='خفيف'?'اختيار عدد أقل مع فواصل راحة.':'حافظ على هامش للانتقال والراحة.',
    input.kids?'مع الأطفال: تجنب ضغط الجدول وأعد التحقق من المسافات.':'لا تفترض أن المسافات أو النقل متاحة لحظيًا.',
    input.budget.includes('أقل')?'ابدأ بالمواقع ذات التكلفة المنشورة فقط وقارن الإجمالي قبل الدفع.':'تحقق من السعر النهائي وما يشمله قبل الدفع.',
    input.avoidCrowds?'الزحام ليس مضمونًا من الساعات المنشورة؛ استخدمها كإشارة فقط.':'الساعات المنشورة ليست إثباتًا للتوافر اللحظي.',
  ]};
}
