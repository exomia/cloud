<template>
  <div id="app">
    <router-view v-if="!$errorHandler.error"/>
    <ErrorHandler v-else></ErrorHandler>
  </div>
</template>

<script>
import ErrorHandler from "@/views/errorHandler"

export default {
    metaInfo: {
        titleTemplate: "Exomia Cloud - %s",
        htmlAttrs: {
            lang: "en"
        },
        noscript: [
            { innerHTML: 'This website requires JavaScript.' }
        ],
        meta: [
            { charset: "utf-8" }, 
            { name: "viewport", content: "width=device-width, initial-scale=1" }, 
            { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
            { name: "description", content: "" },
            { name: "keywords", content: "" },
            { name: "author", content: "exomia.com" },
            { name: "copyright", content: "exomia.com" }
            ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    components: {
        ErrorHandler
    }
}
</script>

<style src="@/assets/css/_global" lang="scss"></style>