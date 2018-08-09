const API_URL = 'http://127.0.0.1:3001/api'

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
            ssr: true
        },
        math: {
            src: '@/plugins/vuelidate',
            ssr: true
        }
    },
    env: {
        API_URL
    }
}
