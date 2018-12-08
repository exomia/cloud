<template>
    <div id="app">
        <RouterView v-if="!$errorHandler.error"/>
        <ErrorHandler v-else></ErrorHandler>
    </div>
</template>

<script>
import ErrorHandler from '@/views/errorHandler'

export default {
    metaInfo: {
        titleTemplate: 'Exomia Cloud - %s',
        htmlAttrs: {
            lang: 'en'
        },
        noscript: [{ innerHTML: 'This website requires JavaScript.' }],
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
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { name: 'author', content: 'exomia.com' },
            { name: 'copyright', content: 'exomia.com' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            // Fonts
            {
                rel: 'preload',
                as: 'font',
                href: '/assets/fonts/Roboto-Light.woff2',
                type: 'font/woff2'
            },
            {
                rel: 'preload',
                as: 'font',
                href: '/assets/fonts/Roboto-Regular.woff2',
                type: 'font/woff2'
            },
            {
                rel: 'preload',
                as: 'font',
                href: '/assets/fonts/Roboto-Condensed.woff2',
                type: 'font/woff2'
            }
        ]
    },
    components: {
        ErrorHandler
    }
}
</script>

<style src="@/assets/css/_global" lang="scss">
</style>
