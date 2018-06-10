<template>
    <div class="exchange-container">
        <div class="center">
            <button class="cancel"
                    @click="cancel()"></button>
            <div class="bar">
                <div class="bar-progress"
                     :style="{width: (progress * 100) + '%'}"></div>
            </div>
            <div class="status">
                <span>{{getFileCount(fileCount)}},&nbsp;{{fileSize | toUnit}}</span>
                <span>{{name}}</span>
                <span>{{uploadSpeed | toUnit}}/s</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        progress: {
            type: Number,
            required: true
        },
        fileCount: {
            type: Number,
            required: true
        },
        fileSize: {
            type: Number,
            required: true
        },
        uploadSpeed: {
            type: Number,
            required: true
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
