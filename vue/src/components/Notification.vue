<template>
    <div class="notification" :class="type">
        <h1>{{ header }}</h1>
        <span>{{ msg }}</span>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        msg: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            header: this.$t('components.Notification.notification')
        }
    },
    mounted() {
        this.setHeader()
    },
    methods: {
        setHeader: function() {
            // TODO: Implement translations
            if (this.type === 'success') {
                this.header = this.$t('components.Notification.success')
            } else if (this.type === 'warning') {
                this.header = this.$t('components.Notification.warning')
            } else if (this.type === 'error') {
                this.header = this.$t('components.Notification.error')
            }
        }
    }
}
</script>

<style src="@/assets/scss/components/Notification.scss" lang="scss" scoped></style>
