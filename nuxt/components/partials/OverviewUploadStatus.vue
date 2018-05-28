<template>
    <div class="upload-container">
        <div class="upload-bar">
            <div class="upload-progress"></div>
        </div>
        <div class="status">
            <span>{{getFileCount(fileCount)}},&nbsp;{{getFileSize(fileSize)}}</span>
            <span>{{getUploadSpeed(uploadSpeed)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        fileCount: {
            type: Number,
            require: true
        },
        fileSize: {
            type: Number,
            require: true
        },
        uploadSpeed: {
            type: Number,
            require: true
        }
    },
    methods: {
        getFileCount(count) {
            return count == 1 ? `${count} File` : `${count} Files`
        },
        getFileSize(size) {
            return `${size} MB`
        },
        getUploadSpeed(speed) {
            return `${speed} MB/s`
        }
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewUploadStatus.scss" lang="scss" scoped>
</style>
