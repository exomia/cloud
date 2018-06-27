<template>
    <div class="exchange-container">
        <div class="center">
            <div class="status">
                <div>
                    <i :class="[fileExchangeType === 0 ? 'upload' : 'download']"></i>
                    <span>{{fileExchangeFilename}}</span>
                </div>
                <button class="cancel"
                        @click="cancel()"></button>
            </div>
            <div class="bar">
                <div class="bar-progress"
                     :style="{width: (fileExchangeProgress * 100) + '%'}"></div>
            </div>
            <div class="status">
                <span>{{getFileCount(fileExchangeCount)}},&nbsp;{{fileExchangeSize | toUnit}}</span>
                <span>{{fileExchangeRate | toUnit}}/s</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        fileExchangeType() {
            return this.$store.getters.exchangeType
        },
        fileExchangeCount() {
            return this.$store.getters.exchangeFileCount
        },
        fileExchangeSize() {
            return this.$store.getters.exchangeSize
        },
        fileExchangeProgress() {
            return this.$store.getters.exchangeProgress
        },
        fileExchangeRate() {
            return this.$store.getters.exchangeRate
        },
        fileExchangeFilename() {
            return this.$store.getters.exchangeFilename
        }
    },
    methods: {
        cancel: function() {
            this.$store.commit('cancelExchange')
        },
        getFileCount: cnt => (cnt === 1 ? `${cnt} File` : `${cnt} Files`)
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewFileExchangeStatus.scss" lang="scss" scoped>
</style>
