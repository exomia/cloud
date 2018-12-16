/* Includes */
const ImageminPlugin = require('imagemin-webpack')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')
//
const CompressionPlugin = require('compression-webpack-plugin')

// Optional
let BrotliPlugin = undefined
try {
    BrotliPlugin = require('brotli-webpack-plugin')
    // eslint-disable-next-line no-empty
} catch (e) {}

module.exports = {
    /* Workaround uvue */
    transpileDependencies: [/register-service-worker/],

    /* Chaining webpack options */
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
                .use(ImageminPlugin)
                .tap(() => [
                    {
                        imageminOptions: {
                            cache: true,
                            bail: false, // Ignore errors on corrupted images
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
                                }),
                                imageminSvgo({
                                    removeViewBox: true
                                })
                            ]
                        }
                    }
                ])

            /* GZIP Compression */
            config
                .plugin('gzip')
                .use(CompressionPlugin)
                .tap(() => [
                    {
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.(txt|js|css|html|png|jpe?g|gif|webp|tff|woff|woff2|otf)$/,
                        threshold: 0,
                        minRatio: 0.8
                    }
                ])

            /* Brotli Compression */
            if (BrotliPlugin) {
                config
                    .plugin('brotli')
                    .use(BrotliPlugin)
                    .tap(() => [
                        {
                            asset: '[path].br[query]',
                            test: /\.(txt|js|css|html|png|jpe?g|gif|webp|tff|woff|woff2|otf)$/,
                            threshold: 0,
                            minRatio: 0.8
                        }
                    ])
            }
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
                    plugins: [{ prefixIds: true, removeXMLNS: true }]
                }
            })
    },
    pluginOptions: {
        i18n: {
            localeDir: 'i18n/locales'
        }
    }
}
