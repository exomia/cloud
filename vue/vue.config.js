const path = require('path')

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    },

    configureWebpack: {
        resolve: {
            extensions: ['.scss']
        }
    },

    pluginOptions: {
        i18n: {
            locale: 'de',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },

    pwa: {
        workboxOptions: {
            templatedUrls: {
                '/': 'index.ssr.html'
            }
        }
    }
}
