import {existsSync,readFileSync} from 'node:fs';
const required=['app/page.tsx','app/layout.tsx','app/globals.css','app/experiences/page.tsx','app/price-check/page.tsx','app/what-can-i-do-now/page.tsx','app/transport/page.tsx','app/before-you-buy/page.tsx','app/plan/page.tsx','app/help/page.tsx','app/trust/page.tsx','app/report-issue/page.tsx','app/faq/page.tsx','app/privacy/page.tsx','app/terms/page.tsx','app/advanced/page.tsx','app/sitemap.ts','public/robots.txt','public/manifest.webmanifest','public/icon.svg'];
const missing=required.filter(p=>!existsSync(p));
if(missing.length){console.error('Missing required production files:',missing.join(', '));process.exit(1);}
const pkg=JSON.parse(readFileSync('package.json','utf8'));
if(pkg.private!==true) throw new Error('package.json must remain private');
if(!pkg.scripts?.build||!pkg.scripts?.lint||!pkg.scripts?.typecheck) throw new Error('Required build/lint/typecheck scripts are missing');
console.log('Project structure: PASS');
