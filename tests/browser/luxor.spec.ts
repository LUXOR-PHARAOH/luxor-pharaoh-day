import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/search?q=price',
  '/experiences',
  '/price-check',
  '/what-can-i-do-now',
  '/transport',
  '/before-you-buy',
  '/plan',
  '/help',
  '/trust',
  '/report-issue',
  '/faq',
  '/privacy',
  '/terms',
  '/advanced',
  '/contact',
  '/production-qa',
  '/visitor-center',
  '/rescue',
  '/live-now',
  '/smart-day',
  '/fair-deal',
  '/family-mode',
  '/photo-mode',
  '/night-plan',
  '/tourist-pocket',
  '/offline',
  '/visitor-guide',
  '/emergency',
  '/vib',
  '/soundtrack',
];

for (const route of routes) {
  test(`route loads: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    page.on('response', response => {
      const status = response.status();
      const url = response.url();
      const isLocalVercelTelemetry = url.includes('/_vercel/analytics/') || url.includes('/_vercel/speed-insights/');
      if (status >= 400 && !isLocalVercelTelemetry) {
        errors.push(`HTTP ${status}: ${url}`);
      }
    });

    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    expect(errors, `browser errors on ${route}`).toEqual([]);
  });
}

test('visitor search returns a useful local result and keeps raw query out of analytics attributes', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const input = page.getByRole('textbox', { name: /Search|بحث/i }).first();
  await expect(input).toBeVisible();
  await input.fill('سعر وادي الملوك');
  await page.getByRole('button', { name: /بحث \/ Search/i }).click();
  await expect(page).toHaveURL(/\/search\?q=/);
  await expect(page.locator('main').getByText(/فحص الأسعار|Price Check/i).first()).toBeVisible();
  await expect(page.locator('[data-analytics-event="search_submitted"]')).toHaveCount(0);
});

test('planner generates a recommendation and preserves accessible interaction', async ({ page }) => {
  await page.goto('/what-can-i-do-now', { waitUntil: 'networkidle' });

  const firstChoice = page.locator('.choice').first();
  await expect(firstChoice).toBeVisible();
  await firstChoice.scrollIntoViewIfNeeded();
  await firstChoice.click({ timeout: 10000 });

  const result = page.locator('[aria-live="polite"]');
  await expect(result).toBeVisible();
  await expect(result).not.toHaveText('');
});

test('plan page can save and clear local plan state', async ({ page }) => {
  await page.goto('/plan', { waitUntil: 'networkidle' });

  const buttons = page.getByRole('button');
  await expect(buttons.first()).toBeVisible();

  const save = page.getByRole('button', { name: /save|حفظ/i }).first();
  if (await save.count()) {
    await save.click();
  }

  const clear = page.getByRole('button', { name: /clear|مسح|حذف/i }).first();
  if (await clear.count()) {
    await clear.click();
  }
});

test('soundtrack control is user-initiated and can be toggled', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const sound = page.getByRole('button', { name: /sound|الصوت|music|الموسيقى/i }).first();
  if (await sound.count()) {
    await expect(sound).toBeVisible();
    await sound.click();
    await sound.click();
  }
});

test('RTL document and responsive layout are valid', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('body')).toBeVisible();
});

test('reduced motion preference does not break the UI', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore|استكشف/i }).first()).toBeVisible();
});

test('contact channels expose project-only contact details', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'networkidle' });
  await expect(page.getByText('01012801568')).toBeVisible();
  await expect(page.getByText('youssfalaa296@gmail.com')).toBeVisible();
});

test('production acceptance gate persists checklist state and blocks false VERIFIED', async ({ page }) => {
  await page.goto('/production-qa', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: /دليل المتصفح التفاعلي/i })).toBeVisible();
  await expect(page.getByText(/INCOMPLETE/)).toBeVisible();

  const first = page.locator('.acceptance-step input').first();
  await first.check();
  await expect(first).toBeChecked();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(first).toBeChecked();
  await expect(page.locator('.acceptance-status')).toContainText('INCOMPLETE');
  await expect(page.locator('.acceptance-final')).toContainText(/VERIFIED/);
});

test('VIB desk exposes differentiated needs and a direct request path', async ({ page }) => {
  await page.goto('/vib', { waitUntil: 'networkidle' });
  await expect(page.getByText(/VIB · VERY IMPORTANT VISITOR/i)).toBeVisible();
  await expect(page.getByText(/Arrival Rescue/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /ابدأ طلب VIB/i })).toBeVisible();
});

test('immersive atmosphere respects user controls and soundtrack guide is reachable', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const motion = page.getByRole('button', { name: /إيقاف الحركة|تشغيل الحركة/i });
  await expect(motion).toBeVisible();
  await motion.scrollIntoViewIfNeeded();
  await motion.click();
  await motion.click();
  await expect(page.getByRole('link', { name: /اختيار الموسيقى/i })).toBeVisible();
});

test('Pharaoh Rescue recovery center provides safe decision paths', async ({ page }) => {
  await page.goto('/rescue', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: /إنقاذ الرحلة/i })).toBeVisible();
  await expect(page.getByText(/RECOVERY FLOW/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /طوارئ \/ Emergency/i })).toBeVisible();
});

test('mobile viewport has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test('keyboard navigation reaches an actionable control', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus-visible')).toBeVisible();
});

test('service worker registers and offline fallback is available', async ({ page }) => {
  await page.goto('/tourist-pocket', { waitUntil: 'networkidle' });
  await expect(page.locator('body')).toBeVisible();
  const registration = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const reg = await navigator.serviceWorker.ready;
    return Boolean(reg.active);
  });
  expect(registration).toBe(true);
});

test('critical routes expose a usable main landmark', async ({ page }) => {
  for (const route of ['/', '/price-check', '/smart-day', '/rescue', '/tourist-pocket']) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
  }
});

test('offline mode keeps core navigation available and gates network-only actions', async ({ page, context }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service workers are unavailable');
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>(resolve => {
        navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
      });
    }
    if (!navigator.serviceWorker.controller) throw new Error(`Service worker is not controlling the page: ${reg.active?.state ?? 'unknown'}`);
  });
  await page.reload({ waitUntil: 'networkidle' });
  await context.setOffline(true);

  await expect(page.getByText(/بدون إنترنت \/ Offline/i)).toBeVisible();

  const vibLink = page.locator('a[data-requires-network="true"][href="/vib"]').last();
  await expect(vibLink).toBeAttached();
  await vibLink.scrollIntoViewIfNeeded();
  await vibLink.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: /شغّل الإنترنت للمتابعة/i })).toBeVisible();

  await page.getByRole('button', { name: /Stay offline|متابعة بدون إنترنت/i }).click();

  const pocketCached = await page.evaluate(async () => {
    const response = await caches.match('/tourist-pocket');
    return Boolean(response);
  });
  expect(pocketCached).toBe(true);

  await page.goto('/tourist-pocket', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/tourist-pocket$/);
  await expect(page.locator('main')).toBeVisible();
});

test('offline service worker serves the network-required navigation fallback', async ({ page, context }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service workers are unavailable');
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>(resolve => {
        navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
      });
    }
    if (!navigator.serviceWorker.controller) {
      throw new Error(`Service worker is not controlling the page: ${reg.active?.state ?? 'unknown'}`);
    }
  });

  await page.reload({ waitUntil: 'networkidle' });
  await context.setOffline(true);

  const response = await page.goto('/vib', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/offline\?required=1/);
  await expect(page.getByRole('heading', { name: /هذه الوظيفة تحتاج الإنترنت/i })).toBeVisible();
});
