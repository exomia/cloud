export default {
    plugins: [
        // Add asyncData() process to page components
        '@uvue/core/plugins/asyncData',
        [
            '@uvue/core/plugins/vuex',
            {
                onHttpRequest: true,
                fetch: true
            }
        ],
        // Add middlewares system
        '@uvue/core/plugins/middlewares',
        // Catch errors
        '@uvue/core/plugins/errorHandler',
        // Clear errors on routes changes
        // '@/plugins/errorClear',
        /* Custom plugins */
        '@/plugins/http',
        '@/plugins/date',
        '@/plugins/fileSize',
        '@/plugins/vuelidate'
    ]
}
