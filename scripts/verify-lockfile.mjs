import {existsSync,readFileSync} from 'node:fs';
if(!existsSync('package-lock.json')){console.error('package-lock.json is missing');process.exit(1);}
const lock=JSON.parse(readFileSync('package-lock.json','utf8'));
const pkg=JSON.parse(readFileSync('package.json','utf8'));
if(lock.lockfileVersion!==3) throw new Error('package-lock.json must use lockfileVersion 3');
if(lock.name!==pkg.name||lock.version!==pkg.version) throw new Error('package-lock identity does not match package.json');
for(const name of Object.keys(pkg.dependencies||{})){if(!lock.packages?.['node_modules/'+name]) throw new Error('Missing locked dependency: '+name);}
console.log('Lockfile integrity: PASS');
