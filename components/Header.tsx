import Link from 'next/link';

const nav = [
  ['التجارب', 'Experiences', '/experiences'],
  ['خطتي', 'My Plan', '/plan'],
  ['النقل', 'Transport', '/transport'],
  ['قبل ما تشتري', 'Before You Buy', '/before-you-buy']
] as const;

export function Header() {
  return (
    <header className="siteHeader">
      <div className="headerInner container">
        <Link className="brand" href="/" aria-label="LUXOR PHARAOH DAY">
          <span className="brandMark">🏺</span>
          <span>
            <strong>LUXOR PHARAOH DAY</strong>
            <small>يومك الفرعوني في الأقصر · Your Pharaoh Day in Luxor</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {nav.map(([ar, en, href]) => (
            <Link href={href} key={href}><span>{ar}</span><small>{en}</small></Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
