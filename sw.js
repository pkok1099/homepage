const CACHE_NAME = 'onlasdan-v1';

// Daftar semua file yang ingin disimpan agar bisa diakses offline
const urlsToCache = [
  '/',
  '/index.html', // <-- GANTI dengan nama file HTML Anda jika berbeda
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Roboto:wght@400;700&family=Dancing+Script:wght@700&display=swap',
  // --- Tambahkan semua ikon Anda ---
  '/icons/icon-48x48.png',
  '/icons/icon-70x70.png',
  '/icons/icon-72x72.png',
  '/icons/icon-76x76.png',
  '/icons/icon-96x96.png',
  '/icons/icon-120x120.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-150x150.png',
  '/icons/icon-152x152.png',
  '/icons/icon-167x167.png',
  '/icons/icon-180x180.png',
  '/icons/icon-192x192.png',
  '/icons/icon-310x310.png',
  '/icons/icon-512x512.png',
  // --- Tambahkan semua splash screen Anda ---
  '/splash/splash-320x426.png',
  '/splash/splash-320x470.png',
  '/splash/splash-480x640.png',
  '/splash/splash-720x960.png',
  '/splash/splash-750x1334.png',
  '/splash/splash-960x1280.png',
  '/splash/splash-1125x2436.png',
  '/splash/splash-1242x2208.png',
  '/splash/splash-1280x1920.png',
  '/splash/splash-1536x2048.png',
  '/splash/splash-1668x2224.png',
  '/splash/splash-2048x2732.png'
];

// Event untuk menginstall service worker dan menyimpan file-file penting
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Membuka cache dan menyimpan file');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event untuk melayani permintaan file (dari cache dulu, jika tidak ada baru ambil dari internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada di cache, ambil dari internet
        return fetch(event.request);
      })
  );
});