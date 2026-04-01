const CACHE = 'html-games-v3';
const BASE = '/html-games';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/favicon.svg',
  BASE + '/manifest.json',
  BASE + '/math-blitz/index.html',
  BASE + '/pattern-memory/index.html',
  BASE + '/memory-match/index.html',
  BASE + '/word-scramble/index.html',
  BASE + '/typing-rain/index.html',
  BASE + '/penguin-pursuit/index.html',
  BASE + '/lost-in-migration/index.html',
  BASE + '/eye-spy/index.html',
];

// Install: pre-cache every game immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: wipe old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
