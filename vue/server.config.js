export default {
    plugins: [
        [
            '@uvue/server/plugins/cookie',
            {
                secret: '1234'
            }
        ],
        '@uvue/server/plugins/modernBuild'
    ]
}
