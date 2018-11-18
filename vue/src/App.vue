<template>
  <div id="app">
    <router-view v-if="!$errorHandler.error"/>
    <ErrorHandler v-else></ErrorHandler>
  </div>
</template>

<script>
import TheHeader from "@/components/navigation/TheHeader"
import TheFooter from "@/components/navigation/TheFooter"
import ErrorHandler from "@/views/errorHandler"

export default {
    head: {
        title: "Default",
        titleTemplate: "Exomia Cloud - %s",
        htmlAttrs: {
            lang: "en"
        },
        meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "description", content: "My awesome application" }],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    components: {
        TheHeader,
        TheFooter,
        ErrorHandler
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    }
}
</script>

<style src="@/assets/css/_global" lang="scss"></style>