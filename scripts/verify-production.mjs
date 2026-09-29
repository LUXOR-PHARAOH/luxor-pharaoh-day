import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = ['package.json','package-lock.json','next.config.ts','tsconfig.json','vercel.json','app/page.tsx','public/luxor-pharaoh-day-hero.svg','app/loading.tsx','app/not-found.tsx','app/error.tsx','app/global-error.tsx'];
const missing = required.filter((file)=>!fs.existsSync(path.join(root,file)));
if (missing.length) { console.error('Missing production files:', missing.join(', ')); process.exit(1); }
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const lock=JSON.parse(fs.readFileSync(path.join(root,'package-lock.json'),'utf8'));
if(lock.lockfileVersion !== 3) throw new Error(`Expected lockfileVersion 3, found ${lock.lockfileVersion}`);
if(lock.packages?.['']?.name !== pkg.name) throw new Error('Lockfile root package name does not match package.json');
for (const section of ['dependencies','devDependencies']) {
  for (const [name, spec] of Object.entries(pkg[section] ?? {})) {
    const actual=lock.packages?.['']?.[section]?.[name];
    if(actual !== spec) throw new Error(`Lockfile root mismatch for ${name}: ${actual} !== ${spec}`);
  }
}
console.log('Production structure + lockfile contract: PASS');
