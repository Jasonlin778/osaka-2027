// Offline cache for the Osaka 2027 app. Shell files are precached; place photos, fonts, Leaflet and Firebase scripts are cached as they are fetched.
const V = 'osaka-20261118-161148'; const SHELL = ["./", "index.html", "manifest.webmanifest", "basemap.json", "seed.json", "icon-192.png", "icon-512.png", "icon-180.png", "img/dotonbori.jpg", "img/osakajo.jpg", "img/fushimi-inari.jpg", "img/todaiji.jpg", "img/kiyomizu.jpg", "img/kobe.jpg", "img/osakajo-night.jpg", "img/arashiyama.jpg", "img/dotonbori-neon.jpg", "img/umeda-view.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('osaka-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET') return;
  if (u.hostname.includes('firestore') || u.hostname.includes('open-meteo')) return;
  const nav = e.request.mode === 'navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/');
  if (nav) { e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))); return; }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok && (u.origin === location.origin || /gstatic|googleapis|cdnjs/.test(u.hostname))) { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); } return r; })));
});
