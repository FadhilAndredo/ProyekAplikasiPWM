const CACHE_NAME = 'cuaca-app-v1';
const urlsToCache = ['/', '/index.html', '/style.css', '/script.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const allow = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => !allow.includes(key) && caches.delete(key)))
    )
  );
});
