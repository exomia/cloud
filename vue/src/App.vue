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
                // { 'http-equiv': 'Accept-CH', content: 'DPR, Viewport-Width, Width' },
                { name: 'description', content: '' },
                { name: 'keywords', content: '' },
                { name: 'author', content: 'exomia.com' },
                { name: 'copyright', content: 'exomia.com' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'preload',
                    as: 'font',
                    href: '/assets/fonts/Roboto-Light.woff2',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                },
                {
                    rel: 'preload',
                    as: 'font',
                    href: '/assets/fonts/Roboto-Regular.woff2',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                },
                {
                    rel: 'preload',
                    as: 'font',
                    href: '/assets/fonts/Roboto-Condensed.woff2',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                }
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
