<template>
    <header class="space-between"
            v-if="isAuthenticated">
        <nuxt-link :to="localePath('overview-dir')"
                   tag="a"
                   class="button">
            <img class="logo"
                 src="~/assets/img/cloud-logo.svg"
                 alt="Exomia Cloud">
        </nuxt-link>
        <nuxt-link :to="localePath('overview-dir')"
                   tag="a"
                   class="logout-button">
            <i class="logout" />
            <span>Logout</span>
        </nuxt-link>
    </header>
    <header class="space-between"
            v-else>
        <nuxt-link :to="localePath('index')"
                   tag="a">
            <h1 class="header-title">{{title}}</h1>
        </nuxt-link>
        <nuxt-link v-for="locale in $i18n.locales"
                   v-if="locale.code !== $i18n.locale"
                   :key="locale.code"
                   :to="switchLocalePath(locale.code)"
                   class="lang"
                   :class="'lang-' + locale.code"
                   tag="a"></nuxt-link>
    </header>
</template>

<script>
export default {
    data() {
        return {
            title: process.env.projectTitle
        }
    },
    props: {
        isAuthenticated: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style src="~/assets/css/components/navigation/TheHeader.scss" lang="scss" scoped>
</style>
