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
        title: "Default",
        titleTemplate: "Exomia Cloud - %s",
        htmlAttrs: {
            lang: "en"
        },
        meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "description", content: "My awesome application" }],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    components: {
        ErrorHandler
    }
}
</script>

<style src="@/assets/css/_global" lang="scss"></style>