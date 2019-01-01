<template>
    <div class="upload-container">
        <div class="center">
            <div class="status">
                <div>
                    <UploadIcon></UploadIcon>
                    <span>{{ uploadFilename }}</span>
                </div>
                <button @click="cancel()">
                    <CrossIcon></CrossIcon>
                </button>
            </div>
            <div class="bar">
                <div class="bar-progress" :style="{ width: uploadProgress * 100 + '%' }"></div>
            </div>
            <div class="status">
                <span>{{ getFileCount(uploadCount) }},&nbsp;{{ uploadSize | toUnit }}</span>
                <span>{{ uploadRate | toUnit }}/s</span>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import CrossIcon from '@/assets/img/icon/cross.svg'
import UploadIcon from '@/assets/img/icon/upload.svg'

export default {
    components: {
        CrossIcon,
        UploadIcon
    },
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
        // TODO: i18n Plural?
        getFileCount: cnt => (cnt === 1 ? `${cnt} File` : `${cnt} Files`)
    }
}
</script>

<style src="@/views/_overview/components/TheUploadStatus.scss" lang="scss" scoped></style>
