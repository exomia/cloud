<template>
  <div id="page">
    <the-header v-if="isAuthenticated" isAuthenticated/>
    <the-header v-if="!isAuthenticated"/>
    <nuxt/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '~/components/navigation/TheHeader'
import TheFooter from '~/components/navigation/TheFooter'

export default {
    components: {
        TheHeader,
        TheFooter
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    }
}
</script>
