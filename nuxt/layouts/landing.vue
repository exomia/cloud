<template>
  <div>
    <the-header></the-header>
    <nuxt/>
    <the-footer></the-footer>
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
