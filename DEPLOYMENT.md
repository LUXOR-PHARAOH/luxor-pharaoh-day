# LUXOR PHARAOH DAY — Production Deployment

## Release gate

`Node 24.21.0 → npm 11.19.0 → package-lock.json → npm ci → Preflight → Build → Vercel → Production QA`

## Bootstrap lockfile

1. افتح GitHub Actions.
2. شغّل **Bootstrap npm 11 lockfile** يدويًا.
3. تحقق من Node 24.21.0 وnpm 11.19.0.
4. يتحقق الـworkflow من المشروع، يولد `package-lock.json` بـnpm 11، ثم ينفذ `npm ci` و`preflight` و`build`.
5. ينشئ الـworkflow فرعًا `automation/npm11-lockfile` ويفتح PR إلى `main` بدل الكتابة المباشرة على الفرع المحمي.

## Vercel

- Framework: Next.js
- Root Directory: `/`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: اتركه فارغًا/افتراضيًا
- `NEXT_PUBLIC_SITE_URL`: أصل الموقع الفعلي في Production، ويمكن نفس المتغير في Preview وDevelopment حسب الحاجة.

## مسار النشر الموصى به

يفضل ربط Vercel مباشرة بمستودع GitHub بدل إضافة أسرار Vercel إلى GitHub Actions. عند كل push/PR يمكن استخدام Preview، وبعد نجاح المراجعة يتم نشر `main` إلى Production.

## QA قبل الاعتماد

تحقق من `/`, `/experiences`, `/plan`, `/transport`, `/before-you-buy`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`، مع اختبار RTL، الهاتف، حفظ الخطة محليًا، الحركة مع `prefers-reduced-motion`، الروابط، metadata، وعدم ظهور أسرار أو بيانات اتصال غير معتمدة.
