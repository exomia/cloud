<template>
    <div class="option-list-display">
        <div class="wrapper">
            <a v-for="(item, idx) of items"
               :key="'list-option' + idx"
               @click.stop="clickAction(item.emit)"
               class="option-item">
                <i :class="item.iconClass" />
                <span>{{item.name}}</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        clickAction: function(emit) {
            this.$emit(emit)
            this.$emit('clicked')
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
