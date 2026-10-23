const CACHE='lpd-pocket-v3';
const OFFLINE='/offline';

const CORE=[
  '/',
  '/tourist-pocket',
  '/plan',
  '/what-can-i-do-now',
  '/smart-day',
  '/experiences',
  '/price-check',
  '/transport',
  '/before-you-buy',
  '/visitor-guide',
  '/family-mode',
  '/photo-mode',
  '/night-plan',
  '/emergency',
  '/rescue',
  '/help',
  '/trust',
  '/report-issue',
  '/offline',
  '/offline?required=1',
  '/icon.svg',
  '/manifest.webmanifest'
];

const NETWORK_REQUIRED=[
  '/live-now',
  '/vib',
  '/contact',
  '/report-issue',
  '/advanced',
  '/admin',
  '/soundtrack'
];

const isNetworkRequired=(pathname)=>NETWORK_REQUIRED.some(route=>pathname===route || pathname.startsWith(route+'/'));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.allSettled(CORE.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'CACHE_OFFLINE_PACK') {
    event.waitUntil(
      caches.open(CACHE)
        .then(cache => Promise.allSettled(CORE.map(url => cache.add(url))))
    );
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const offlineRequired=url.pathname===OFFLINE && url.searchParams.get('required')==='1';
    if (offlineRequired) {
      event.respondWith(
        fetch(request).catch(() => caches.match('/offline?required=1').then(cached => cached || caches.match(OFFLINE)))
      );
      return;
    }
    const networkOnly=isNetworkRequired(url.pathname);

    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok && !networkOnly) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          if (networkOnly) {
            return caches.match(OFFLINE).then(cached => {
              if (!cached) return Response.error();
              const redirectUrl=new URL(OFFLINE,self.location.origin);
              redirectUrl.searchParams.set('required','1');
              return Response.redirect(redirectUrl.toString(),302);
            });
          }
          return caches.match(request).then(cached => cached || caches.match(OFFLINE));
        })
    );
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(cached =>
        cached ||
        fetch(request).then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
      )
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match(OFFLINE)))
  );
});
