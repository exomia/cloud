<template>
    <div class="upload-container">
        <div class="center">
            <div class="status">
                <div>
                    <i class="upload"></i>
                    <span>{{uploadFilename}}</span>
                </div>
                <button class="cancel"
                        @click="cancel()"></button>
            </div>
            <div class="bar">
                <div class="bar-progress"
                     :style="{width: (uploadProgress * 100) + '%'}"></div>
            </div>
            <div class="status">
                <span>{{getFileCount(uploadCount)}},&nbsp;{{uploadSize | toUnit}}</span>
                <span>{{uploadRate | toUnit}}/s</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        uploadCount() {
            return this.$store.getters.uploadFileCount
        },
        uploadSize() {
            return this.$store.getters.uploadSize
        },
        uploadProgress() {
            return this.$store.getters.uploadProgress
        },
        uploadRate() {
            return this.$store.getters.uploadRate
        },
        uploadFilename() {
            return this.$store.getters.uploadFilename
        }
    },
    methods: {
        cancel: function() {
            this.$store.commit('cancelUpload')
        },
        getFileCount: cnt => (cnt === 1 ? `${cnt} File` : `${cnt} Files`)
    }
}
</script>

<style src="@/assets/css/components/partials/OverviewUploadStatus" lang="scss" scoped>
</style>
