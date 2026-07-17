const CACHE_NAME = "play-vault-cache-v3";
const PRECACHE_URLS = [
  "about_us.html",
  "base-defender.html",
  "brick-blaster.html",
  "card-match.html",
  "catapult-fury.html",
  "color-drop.html",
  "contact_us.html",
  "dash-runner.html",
  "dice-merge.html",
  "faq.html",
  "galaxy-guardian.html",
  "game1.html",
  "game2.html",
  "gem_rush.html",
  "index.html",
  "jewel-swap.html",
  "liquid-sort.html",
  "memo_match.html",
  "merge-2048.html",
  "nibble-runner.html",
  "nova_blaster.html",
  "numera_merge.html",
  "orbit-eater.html",
  "paint-trail.html",
  "pop_panic.html",
  "privacy_policy.html",
  "rope-swinger.html",
  "skyline-flyer.html",
  "slide-free.html",
  "stack-crafter.html",
  "terms_of_service.html",
  "tic-tac-toe.html",
  "tiny-angler.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
