/* Includes */
const ImageminPlugin = require('imagemin-webpack')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
//
const WebPWebpackPlugin = require('webp-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
//
const svgoConfig = require('./config/svgo.config.json')

// Optional
let BrotliPlugin
try {
    BrotliPlugin = require('brotli-webpack-plugin')
    // eslint-disable-next-line no-empty
} catch (e) {}

module.exports = {
    /* Disabled linting in production to prevent devDeps. error */
    lintOnSave: process.env.NODE_ENV !== 'production',

    /* Chaining webpack options */
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            /* Image Compression */
            const imageRule = config.module.rule('images')
            imageRule.uses.clear()

            config.module
                .rule('images')
                .test(/\.(png|jpe?g|webp)(\?.*)?$/)
                .use('file-loader')
                .loader('file-loader')
                .options({
                    name: 'images/[hash].[ext]'
                })
                .end()

            config
                .plugin('imagemin-webpack')
                .use(ImageminPlugin)
                .tap(() => [
                    {
                        name: '[path][name].[ext]',
                        cache: true,
                        bail: false, // Ignore errors on corrupted images
                        imageminOptions: {
                            plugins: [
                                imageminMozjpeg({
                                    quality: 75,
                                    dcScanOpt: 2
                                }),
                                imageminPngquant({
                                    quality: 75,
                                    strip: true
                                })
                            ]
                        }
                    }
                ])

            /* Generate webp fallback */
            config
                .plugin('webp')
                .use(WebPWebpackPlugin)
                .tap(() => [
                    {
                        match: /(jpe?g|png)$/,
                        webp: {
                            quality: 75,
                            inject: true
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
                    plugins: svgoConfig
                }
            })
    },

    pluginOptions: {
        i18n: {
            localeDir: 'i18n/locales'
        }
    },

    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src-sw.js',
            swDest: 'sw.js',
            importWorkboxFrom: 'local'
        }
    }
}
