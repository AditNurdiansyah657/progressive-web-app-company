/* ============================================
    BizDirectory PWA — Service Worker v1.0
    Handles caching, offline support, bg sync
    ============================================ */

const CACHE_NAME = 'bizdirectory-v1.2';
const DYNAMIC_CACHE = 'bizdirectory-dynamic-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap'
];

/* ─── Install ─── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

/* ─── Activate ─── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== DYNAMIC_CACHE)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      );
    }).then(() => self.clients.claim())
  );
});

/* ─── Fetch Strategy ─── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Google Sheets API — Network first, cache fallback
  if (url.hostname === 'docs.google.com' || url.hostname === 'sheets.googleapis.com') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Google Fonts — Cache first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Logo images — Stale while revalidate
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Everything else — Cache first with network fallback
  event.respondWith(cacheFirstStrategy(request));
});

/* ─── Caching Strategies ─── */
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request.clone());
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ error: 'Offline', cached: false }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request.clone());
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline content unavailable', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request.clone()).then(response => {
    if (response.ok) {
      caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);

  return cached || await fetchPromise || new Response('', { status: 404 });
}

/* ─── Background Sync ─── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-sheets') {
    console.log('[SW] Background sync: refreshing sheet data');
    event.waitUntil(syncSheetData());
  }
});

async function syncSheetData() {
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'SYNC_COMPLETE' }));
}

/* ─── Push Notifications ─── */
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'BizDirectory Update', {
      body: data.body || 'New content is available.',
      icon: './icons/icon-192.png',
      badge: './icons/icon-72.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});