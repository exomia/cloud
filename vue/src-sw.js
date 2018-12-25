self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(res) {
            if (res) {
                return res
            } else {
                return fetch(e.request)
            }
        })
    )
})

// workbox.core.setCacheNameDetails({ prefix: 'exomia-cloud' })

// Cache images
workbox.routing.registerRoute(
    /.*\.(?:png|jpe?g|webp|svg)/,
    workbox.strategies.cacheFirst({
        // cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images
                maxEntries: 40,
                // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60
            })
        ]
    })
)

// Cache css
workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
        // cacheName: 'css'
    })
)

// Cache js
workbox.routing.registerRoute(
    /.*\.js/,
    workbox.strategies.networkFirst({
        // cacheName: 'js'
    })
)

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
