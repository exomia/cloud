<template>
    <div id="app">
        <RouterView v-if="!$errorHandler.error" />
        <ErrorHandler v-else></ErrorHandler>
        <NotificationList></NotificationList>
    </div>
</template>

<script>
import ErrorHandler from '@/views/errorHandler'
import NotificationList from '@/components/NotificationList'

export default {
    metaInfo() {
        return {
            titleTemplate: 'Exomia Cloud - %s',
            htmlAttrs: {
                lang: 'en'
            },
            noscript: [{ innerHTML: this.$t('misc.noscript') }],
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    'http-equiv': 'Content-Type',
                    content: 'text/html; charset=utf-8'
                },
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

                {
                    name: 'description',
                    content:
                        'A fast allround solution to a modern self-hosted cloud that aims to be super fast, slim and serves a crisp user experience.'
                },
                { name: 'keywords', content: '' },
                { name: 'author', content: 'exomia.com' },
                { name: 'copyright', content: 'exomia.com' },
                // PWA
                {
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes'
                },
                {
                    name: 'apple-mobile-web-app-title',
                    content: 'Exomia Cloud'
                },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black'
                },
                {
                    name: 'application-name',
                    content: 'Exomia Cloud'
                },
                {
                    name: 'msapplication-TileColor',
                    content: '#ffffff'
                },
                {
                    name: 'theme-color',
                    content: '#ffffff'
                }
            ],
            link: [
                // PWA & Favicons
                { rel: 'manifest', href: './manifest.json' },
                { rel: 'mask-icon', href: './favicons/safari-pinned-tab.svg' },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: './favicons/apple-touch-icon.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: './favicons/favicon-32x32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: './favicons/favicon-16x16.png'
                },
                { rel: 'icon', type: 'image/x-icon', href: './favicons/favicon.ico' },
                { rel: 'shortcut icon', type: 'image/x-icon', href: './favicons/favicon.ico' }
                // // Fonts
                // {
                //     rel: 'preload',
                //     as: 'font',
                //     href: '/assets/fonts/Roboto-Light.woff2',
                //     type: 'font/woff2',
                //     crossorigin: 'anonymous'
                // },
                // {
                //     rel: 'preload',
                //     as: 'font',
                //     href: '/assets/fonts/Roboto-Regular.woff2',
                //     type: 'font/woff2',
                //     crossorigin: 'anonymous'
                // },
                // {
                //     rel: 'preload',
                //     as: 'font',
                //     href: '/assets/fonts/Roboto-Condensed.woff2',
                //     type: 'font/woff2',
                //     crossorigin: 'anonymous'
                // }
            ]
        }
    },
    components: {
        ErrorHandler,
        NotificationList
    }
}
</script>

<style src="@/assets/scss/_global.scss" lang="scss"></style>
