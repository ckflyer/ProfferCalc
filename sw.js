// ProfferCalc Service Worker - Minimal
// No app caching - app requires network to make calls anyway
// localStorage handles all user data (phone, password, configs)

const CACHE_NAME = "proffercalc-v1.000000000000000000000000000000000000000000000000000000000000";

// Install - nothing to cache
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate - clear ALL old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.map((name) => caches.delete(name)))
    ).then(() => self.clients.claim())
  );
});

// Fetch - always go to network, no caching
// This ensures users always get the latest version
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
