const path = require('path')

const { ImageminWebpackPlugin } = require('imagemin-webpack')

// Before importing imagemin plugin make sure you add it in `package.json` (`dependencies`) and install
const imageminGifsicle = require('imagemin-gifsicle')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')

module.exports = {
    chainWebpack: config => {
        config
            .plugin('imagemin-webpack-plugin')
            .use(ImageminWebpackPlugin)
            .tap(() => {
                return [
                    {
                        imageminOptions: {
                            // Lossless optimization with custom option
                            // Feel free to experement with options for better result for you
                            plugins: [
                                imageminGifsicle({
                                    interlaced: true
                                }),
                                imageminJpegtran({
                                    progressive: false
                                }),
                                imageminOptipng({
                                    optimizationLevel: 5
                                }),
                                imageminSvgo({
                                    removeViewBox: true
                                })
                            ],
                            loader: false,
                            include: './src'
                        }
                    }
                ]
            })

        /* Inline svg */
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
