<template>
    <router-link :to="{ name: routeName }"
                 tag="a"
                 class="sidebar-item">
        <i v-if="iconClass"
           :class="[iconClass, hover ? 'no-hover' : '']" />
        <span>{{text}}</span>
    </router-link>
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
