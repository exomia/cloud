export default {
    plugins: [
        // Parse cookies
        [
            "@uvue/server/plugins/cookie",
            {
                secret: "secret",
            },
        ],
        // Modern build
        "@uvue/server/plugins/modernBuild",
        // Serve static files
        "@uvue/server/plugins/static",
        // Compress responses
        "@uvue/server/plugins/gzip",
    ],
}
