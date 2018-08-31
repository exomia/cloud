const path = require('path')
//
const { ImageminWebpackPlugin } = require('imagemin-webpack')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminOptipng = require('imagemin-optipng')
//
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin')

module.exports = {
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            /* Image Compression */
            const imageRule = config.module.rule('images')
            imageRule.uses.clear()

            config.module
                .rule('images')
                .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
                .use('file-loader')
                .loader('file-loader')
                .options({
                    rules: {
                        emitFile: true, // Don't forget emit images
                        name: 'img/[name].[hash:8].[ext]'
                    }
                })
                .end()

            config
                .plugin('imagemin-webpack')
                .use(ImageminWebpackPlugin)
                .tap(() => {
                    return [
                        {
                            imageminOptions: {
                                disable: process.env.NODE_ENV !== 'production',
                                cache: true,
                                bail: false, // Ignore errors on corrupted images
                                loader: false,
                                plugins: [
                                    imageminGifsicle({
                                        interlaced: true
                                    }),
                                    imageminMozjpeg({
                                        quality: '75',
                                        dcScanOpt: 2
                                    }),
                                    imageminOptipng({
                                        optimizationLevel: 5
                                    })
                                ]
                            }
                        }
                    ]
                })

            /* GZIP Compression */
            config
                .plugin('gzip')
                .use(BrotliGzipPlugin)
                .tap(() => {
                    return [
                        {
                            asset: '[path].gz[query]',
                            algorithm: 'gzip',
                            test: /\.(js|css|html|png|jpe?g|gif|webp|tff|woff|woff2|otf)$/,
                            threshold: 0,
                            minRatio: 0.8
                        }
                    ]
                })

            /* Brotli Compression */
            config
                .plugin('brotli')
                .use(BrotliGzipPlugin)
                .tap(() => {
                    return [
                        {
                            asset: '[path].br[query]',
                            algorithm: 'brotli',
                            test: /\.(js|css|html|png|jpe?g|gif|webp|tff|woff|woff2|otf)$/,
                            threshold: 0,
                            minRatio: 0.8
                        }
                    ]
                })
        }

        /* Inline svg */
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                limit: 10 * 1024,
                noquotes: true,
                svgo: {
                    plugins: [
                        {
                            removeXMLNS: true
                        }
                    ]
                }
            })
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
