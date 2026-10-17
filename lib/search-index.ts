export type SearchItem={title:string;arabic:string;description:string;href:string;intent:string;keywords:string[]};

export const searchIndex:SearchItem[]=[
  {title:'Explore',arabic:'استكشف المعالم',description:'المعالم والمعلومات الرسمية ومواعيد الزيارة والأسعار المنشورة.',href:'/experiences',intent:'sights',keywords:['معالم','آثار','معبد','مقابر','temple','tomb','sights','explore']},
  {title:'Price Check',arabic:'فحص الأسعار',description:'راجع السعر المنشور والمصدر وتاريخ المراجعة.',href:'/price-check',intent:'prices',keywords:['سعر','اسعار','تذكرة','تذاكر','price','ticket','tickets','cost']},
  {title:'What Can I Do Now?',arabic:'ماذا أفعل الآن؟',description:'خطة سريعة حسب الوقت والبداية والاهتمامات والميزانية.',href:'/what-can-i-do-now',intent:'planner',keywords:['الان','الآن','وقت','ساعتين','نصف يوم','يوم كامل','now','today','plan']},
  {title:'Smart Day',arabic:'يومي الذكي',description:'رتّب يومك من المواقع الموجودة في قاعدة البيانات.',href:'/smart-day',intent:'smart_day',keywords:['خطة','يومي','مسار','smart','day','itinerary']},
  {title:'Transport',arabic:'النقل',description:'خطوات عملية للتنقل والاتفاق على التفاصيل قبل التحرك.',href:'/transport',intent:'transport',keywords:['نقل','تاكسي','سيارة','تنقل','transport','taxi','car']},
  {title:'Before You Buy',arabic:'قبل ما تشتري',description:'قائمة تحقق للسعر والمشمول والمصدر والإلغاء.',href:'/before-you-buy',intent:'buying',keywords:['شراء','دفع','فلوس','سعر','buy','pay','payment','deal']},
  {title:'Visitor Guide',arabic:'دليل الزائر',description:'الوصول والاتصال والعائلات والاحتياجات اليومية والمساء.',href:'/visitor-guide',intent:'visitor_guide',keywords:['قبل الوصول','وصول','موبايل','اتصال','عائلة','اطفال','guide','arrival','family']},
  {title:'Pharaoh Rescue',arabic:'إنقاذ الرحلة',description:'مسارات بديلة عندما تتغير الخطة أو السعر أو الترتيب.',href:'/rescue',intent:'rescue',keywords:['مشكلة','اتغيرت','اغلق','مغلق','بديل','rescue','closed','change']},
  {title:'VIB Desk',arabic:'VIB Desk',description:'مساعدة عملية واحتياجات مخصصة بعد التحقق من إمكانية التنفيذ.',href:'/vib',intent:'service',keywords:['مساعدة','خدمة','كونسيرج','concierge','help','service','vib']},
  {title:'Tourist Pocket',arabic:'جيب السائح',description:'الأساسيات المحفوظة للعمل عند ضعف الاتصال.',href:'/tourist-pocket',intent:'offline',keywords:['بدون نت','انترنت','اوفسلاين','offline','internet','pocket']},
  {title:'Report an Issue',arabic:'بلّغ عن مشكلة',description:'أرسل بلاغًا عن سعر أو رابط أو معلومة تحتاج مراجعة.',href:'/report-issue',intent:'issue',keywords:['بلاغ','خطأ','مشكلة','غلط','report','issue','wrong']},
];

export function findSearchItems(query:string){
  const q=query.trim().toLocaleLowerCase('ar-EG');
  if(!q) return searchIndex;
  const tokens=q.split(/\s+/).filter(Boolean);
  return searchIndex
    .map(item=>({item,score:tokens.reduce((score,token)=>score+(item.keywords.some(k=>k.toLocaleLowerCase('ar-EG').includes(token))?3:0)+(item.title.toLocaleLowerCase().includes(token)||item.arabic.includes(token)?1:0),0)}))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .map(x=>x.item);
}

export function classifySearchIntent(query:string){
  const items=findSearchItems(query);
  return items[0]?.intent ?? 'other';
}
