<template>
    <header class="space-between" v-if="isAuthenticated">
        <nuxt-link :to="{ name: 'index' }" tag="a" class="button">
            <img class="logo" src="~/assets/img/cloud-logo.svg" alt="Trident Cloud">
        </nuxt-link>
        <nuxt-link :to="{ name: 'index' }" tag="a" class="logout-button">
            <i class="logout"/>
            <span>Logout</span>
        </nuxt-link>
    </header>
    <header class="justify-center" v-else>
        <nuxt-link :to="{ name: 'index' }" tag="a">
            <h1 class="header-title">{{title}}</h1>
        </nuxt-link>
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
