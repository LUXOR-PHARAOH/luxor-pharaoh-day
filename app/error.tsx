'use client';
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="container legal"><p className="eyebrow">ERROR · خطأ</p><h1><span>حصلت مشكلة مؤقتة</span><small>A temporary error occurred</small></h1><button className="cta" onClick={()=>reset()}>حاول مرة أخرى · Try again</button></main>}
