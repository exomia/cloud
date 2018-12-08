import { ExpressAdapter } from '@uvue/server'

export default {
    adapter: ExpressAdapter,
    plugins: [
        // Compress responses
        '@uvue/server/plugins/gzip',
        // Parse cookies
        [
            '@uvue/server/plugins/cookie',
            {
                secret: 'secret'
            }
        ],
        // Modern build
        '@uvue/server/plugins/modernBuild',
        // Serve static files
        '@uvue/server/plugins/static',
        // Init api
        './src/api/install'
    ],
    // Watch for changes in these files to automatically reboot server
    watch: ['src/api/**/*.js'],
    // Activating prefetch & preload
    renderer: {
        // shouldPrefetch: null,
        shouldPreload: (file, type) => {
            // type is inferred based on the file extension.
            // https://fetch.spec.whatwg.org/#concept-request-destination
            if (type === 'script' || type === 'style') {
                return true
            }
            if (type === 'font') {
                // only preload woff2 fonts
                return /\.woff2$/.test(file)
            }
            if (type === 'image') {
                // only preload important images
                return file === 'login_bg.jpg'
            }
        }
    }
}
