import { ExpressAdapter } from '@uvue/server'

export default {
    adapter: ExpressAdapter,
    plugins: [
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
        // Compress responses
        '@uvue/server/plugins/gzip',
        // Init api
        './src/api/install'
    ],
    // Watch for changes in these files to automatically reboot server
    watch: ['src/api/**/*.js'],
    // SPA paths: no SSR occur for these paths
    spaPaths: ['/spa']
}
