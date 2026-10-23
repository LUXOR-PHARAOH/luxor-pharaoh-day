import Link from 'next/link';

export default function Advanced() {
  return (
    <main className="wrap page">
      <div className="eyebrow">ADVANCED</div>
      <h1>تشغيل متقدم</h1>
      <p className="sub">صفحة حالة وتشغيل، وليست واجهة إدارية عامة.</p>
      <div className="list">
        <div><b>Source of truth:</b> GitHub main + CI + Vercel Production.</div>
        <div><b>Product layer:</b> Visitor Center + VIB Desk + Recovery + Offline Plan + Trust lifecycle.</div>
        <div><b>Atmosphere:</b> CSS motion layer + reduced-motion support + user-controlled ambient audio.</div>
        <div><b>Soundtrack policy:</b> no copyrighted commercial music is bundled. External music platforms remain user-initiated.</div>
        <div><b>Data lifecycle:</b> Source → Review → Verify → Publish → Monitor → Update/Expire.</div>
        <div><b>Release gate:</b> npm ci → lint → typecheck → build → browser QA.</div>
        <div><b>Commercial gate:</b> booking/payment/provider claims remain disabled until verified.</div>
        <div>
          <b>Browser acceptance:</b>{' '}
          <Link href="/production-qa">
            فتح دليل القبول التفاعلي / Open Production QA →
          </Link>
        </div>
      </div>
    </main>
  );
}
