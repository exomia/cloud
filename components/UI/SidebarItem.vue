<template>
    <nuxt-link :to="{ name: href }" tag="a" class="sidebar-item">
        <i v-if="iconClass" :class="[iconClass, hover ? 'no-hover' : '']"></i>
        <span>{{text}}</span>
    </nuxt-link>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    hover: {
      type: Boolean,
      default: false
    }
  }
}
</script>
