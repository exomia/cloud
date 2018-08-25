module.exports = {
    plugins: {
        date: {
            src: '@/plugins/date',
            ssr: true
        },
        file_size: {
            src: '@/plugins/file-size',
            ssr: true
        },
        math: {
            src: '@/plugins/math',
            ssr: false
        },
        math: {
            src: '@/plugins/vuelidate',
            ssr: true
        },
        call: {
            src: '@/plugins/call',
            ssr: true
        }
    }
}
