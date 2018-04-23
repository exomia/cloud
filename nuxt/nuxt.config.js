const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
  ** Env Variables
  */
    env: {
        projectTitle: 'Exomia Cloud'
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
    plugins: [
        '~/plugins/file-size.js',
        '~/plugins/date.js',
        '~/plugins/vuelidate',
        { src: '~/plugins/axios-extend', ssr: false }
    ],

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
        baseURL: process.env.BASE_URL || 'http://127.0.0.1:3001',
        credentials: false,
        retry: { retries: 3 },
        responseType: 'json',
        timeout: 1000 * 5, //5sec
        debug: process.env.NODE_ENV != 'production'
    },

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    transition: {
        name: 'fade',
        mode: 'out-in'
    }
}
