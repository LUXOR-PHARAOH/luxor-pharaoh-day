import Link from 'next/link';

const moods=[
  {icon:'🏺',title:'Pharaoh Cinematic',desc:'موسيقى سينمائية وأوركسترا هادئة وأجواء صحراوية — مناسبة للاكتشاف والغروب.',search:'cinematic egyptian instrumental travel'},
  {icon:'🌍',title:'Global Travel Pulse',desc:'Organic house وAfro-house وdowntempo بإيقاع عالمي مريح للحركة.',search:'organic house afro house travel mix'},
  {icon:'🌙',title:'Nile Night',desc:'Ambient وchill وmelodic electronic لأجواء النيل والمساء.',search:'ambient chill melodic electronic night'},
  {icon:'⚡',title:'Adventure Mode',desc:'موسيقى سينمائية إلكترونية بطاقة أعلى للمغامرة والتحرك.',search:'cinematic electronic adventure instrumental'},
  {icon:'🇪🇬',title:'Egyptian Modern',desc:'مزيج عربي وإلكتروني حديث يحافظ على الهوية المحلية.',search:'modern egyptian instrumental electronic fusion'}
];

const services=[
  {name:'Spotify',label:'افتح على Spotify',url:(q:string)=>`https://open.spotify.com/search/${encodeURIComponent(q)}`},
  {name:'YouTube Music',label:'افتح على YouTube Music',url:(q:string)=>`https://music.youtube.com/search?q=${encodeURIComponent(q)}`},
  {name:'Apple Music',label:'افتح على Apple Music',url:(q:string)=>`https://music.apple.com/search?term=${encodeURIComponent(q)}`},
  {name:'Anghami',label:'افتح على Anghami',url:(q:string)=>`https://play.anghami.com/search/${encodeURIComponent(q)}`}
];

export default function Soundtrack(){
  return <main className="wrap page soundtrack-page">
    <div className="eyebrow">SOUNDTRACK · أجواء الرحلة</div>
    <h1>خلّي للأقصر صوتها الخاص</h1>
    <p className="lead">اختار المزاج المناسب لرحلتك، وافتح نتائج الموسيقى على المنصة التي تستخدمها. التشغيل اختياري وبقرارك، ولا يبدأ أي صوت تلقائيًا.</p>
    <div className="soundtrack-intro">
      <span className="soundtrack-art" aria-hidden="true">𓂀</span>
      <div><b>Atmosphere Mode</b><p>أجواء صوتية أصلية مولّدة داخل جهازك، من غير ملفات موسيقية تجارية مضمّنة. ارجع للرئيسية لتشغيلها أو إيقافها.</p><Link className="btn alt" href="/">العودة للتجربة وتشغيل الأجواء / Back to app</Link></div>
    </div>
    <div className="grid visitor-grid soundtrack-grid">
      {moods.map((mood)=><article className="card soundtrack-card" key={mood.title}>
        <span className="visitor-icon soundtrack-icon" aria-hidden="true">{mood.icon}</span>
        <h2>{mood.title}</h2><p>{mood.desc}</p>
        <div className="soundtrack-links">{services.map(service=><a key={service.name} href={service.url(mood.search)} target="_blank" rel="noopener noreferrer">{service.label} ↗</a>)}</div>
      </article>)}
    </div>
    <div className="notice"><b>حقوق الموسيقى:</b> لا نضمّن أغاني تجارية محمية أو نعيد بثها داخل التطبيق. الروابط تفتح نتائج بحث على خدمات خارجية؛ التوفر والتشغيل يخضعان لحساب المستخدم والمنطقة وشروط كل خدمة. استخدم فقط موسيقى مرخّصة إذا أردت إدماجها داخل التطبيق مستقبلًا.</div>
    <div className="actions"><Link className="btn" href="/">رجوع للرئيسية / Home</Link><Link className="btn alt" href="/vib">مساعد الرحلة / VIB Desk</Link></div>
  </main>
}