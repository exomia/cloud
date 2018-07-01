import pkg from './package'

const API_URL = process.env.API_URL || 'http://127.0.0.1:3001/api'

module.exports = {
    mode: 'universal',

    /*
    ** Env Variables
    */
    env: {
        PROJECT_TITLE: 'Exomia Cloud',
        API_URL
    },

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Roboto:300,400'
            }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#3B8070' },

    /*
    ** Global CSS
    */
    css: ['~/assets/css/_global.scss', '~/assets/css/_pageTransition.scss'],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: ['~/plugins/auth', '~/plugins/file-size', '~/plugins/date', '~/plugins/vuelidate'],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],

    /*
    ** Axios module configuration
    */
    axios: {
        baseURL: API_URL,
        credentials: false,
        retry: { retries: 3 },
        responseType: 'json',
        timeout: 1000 * 5, //5sec
        debug: false,
        https: false
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
    },

    /*
    ** Router config
    */
    router: {
        //middleware: ['directory']
    }

    // transition: {
    //     name: 'fade',
    //     mode: 'out-in'
    // }
}
