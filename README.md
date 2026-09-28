# LUXOR PHARAOH DAY 🏺👑

**أبرز تجربة اليوم الفرعوني في الأقصر**

**اعرف • اتأكد • اتحرك / KNOW • CHECK • GO**

منصة رقمية مستقلة ثنائية اللغة لمعلومات زائر الأقصر، مبنية للسرعة على الهاتف، وتركّز على المصدر، تاريخ المراجعة، وحالة المعلومة قبل اتخاذ القرار.

## الإنتاج الفعلي

المسار المعتمد:

`GitHub → Node 24.21.0 → npm 11.19.0 → package-lock.json → npm ci → Preflight → Build → Vercel → Production QA`

لا يوجد `package-lock.json` اصطناعي داخل الحزمة. يجب أن يُنشأ بواسطة npm 11.19.0 على Node 24.21.0 ثم يُحفظ في جذر المستودع.

## أوامر التشغيل

```bash
npm ci
npm run preflight
npm run verify
npm run build
npm start
```

## البيانات

الأسعار وساعات الزيارة الحالية في `lib/data.ts` مرتبطة بصفحات منشورة على موقع وزارة السياحة والآثار المصرية، وتحتوي على تاريخ مراجعة ورابط المصدر. المعلومات قابلة للتغيير ولا تُعامل كضمان دائم.

## الحالة

**Production Candidate — verification required**

لا تتحول الحالة إلى Production-Verified إلا بعد نجاح CI وVercel وQA على نفس الـcommit.

## الملفات المرجعية

- `docs/TECHNICAL-MASTER-REPORT.md`
- `docs/DATA-VERIFICATION-REPORT.md`
- `docs/DEPLOYMENT-RUNBOOK.md`
- `docs/QA-REPORT.md`
- `docs/SECURITY-CONTROL-REPORT.md`
- `docs/LOCKFILE-BOOTSTRAP-REPORT.md`
- `RELEASE-CHECKLIST.md`
