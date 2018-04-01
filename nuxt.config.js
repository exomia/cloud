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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  loading: { color: '#007e33' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/_global.scss', '~/assets/css/_pageTransition.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

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
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
