<template>
    <nuxt-link :to="localePath(routeName)"
               tag="a"
               class="sidebar-item">
        <i v-if="iconClass"
           :class="[iconClass, hover ? 'no-hover' : '']" />
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
        routeName: {
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
