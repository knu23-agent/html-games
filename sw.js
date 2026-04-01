const CACHE = 'html-games-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/math-blitz/index.html',
  '/pattern-memory/index.html',
  '/memory-match/index.html',
  '/word-scramble/index.html',
  '/typing-rain/index.html',
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
