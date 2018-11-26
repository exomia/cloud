export default {
    plugins: [
        /* Core plugins */
        "@uvue/core/plugins/asyncData",
        [
            "@uvue/core/plugins/vuex",
            {
                onHttpRequest: true,
                fetch: true,
            },
        ],
        "@uvue/core/plugins/middlewares",
        "@uvue/core/plugins/errorHandler",
        /* Custom plugins */
        "@/plugins/date",
        "@/plugins/file-size",
        "@/plugins/math",
        "@/plugins/vuelidate",
        "@/plugins/http",
        // "@/plugins/meta",
    ],
}
