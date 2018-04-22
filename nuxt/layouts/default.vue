<template>
  <div class="page">
    <the-header isAuthenticated/>
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
    }
}
</script>
