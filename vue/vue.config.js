const path = require('path')

module.exports = {
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
