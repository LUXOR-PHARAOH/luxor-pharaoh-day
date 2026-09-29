export function HeroScene() {
  return (
    <div className="heroScene" aria-hidden="true">
      <svg viewBox="0 0 900 420" role="presentation" focusable="false">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#07131e" />
            <stop offset="0.65" stopColor="#132b3b" />
            <stop offset="1" stopColor="#3d2b1d" />
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="50%">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.38" stopColor="#d8ad53" stopOpacity="0.95" />
            <stop offset="1" stopColor="#d8ad53" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="900" height="420" fill="url(#sky)" />
        <circle cx="680" cy="128" r="112" fill="url(#sun)" className="sunPulse" />
        <path d="M0 320 C160 280 280 330 410 300 C550 268 700 320 900 270 L900 420 L0 420 Z" fill="#0a0f14" />
        <path d="M70 330 L150 230 L230 330 Z M165 330 L220 175 L275 330 Z" fill="#0a0f14" />
        <path d="M495 330 L540 165 L585 330 Z" fill="#0a0f14" />
        <path d="M710 330 L745 210 L780 330 Z" fill="#0a0f14" />
        <path d="M0 357 H900" stroke="#d8ad53" strokeOpacity="0.18" />
        <g className="birds" fill="none" stroke="#f5e2ad" strokeWidth="3" strokeLinecap="round">
          <path d="M160 104 q14 -12 28 0 q14 -12 28 0" />
          <path d="M290 150 q10 -9 20 0 q10 -9 20 0" />
          <path d="M430 102 q12 -11 24 0 q12 -11 24 0" />
        </g>
      </svg>
      <div className="heroGlow" />
    </div>
  );
}
