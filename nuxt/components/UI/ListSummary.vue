<template>
    <div class="list-summary">
        <div class="list-item"
             style="width: 100px"></div>
        <div class="list-item"
             style="width: calc(100% - 510px)">
            <span>{{directoryCount}} Ordner, {{formatFileCount}}</span>
        </div>
        <div class="list-item"
             style="width: 185px"></div>
        <div class="list-item"
             style="width: 100px">
            <span>{{sizeSum | toUnit}}</span>
        </div>
        <div class="list-item"
             style="width: 125px"></div>
    </div>
</template>

<script>
export default {
    props: {
        directoryCount: {
            type: Number,
            required: true
        },
        fileCount: {
            type: Number,
            required: true
        },
        sizeSum: {
            type: Number,
            required: true
        }
    },
    computed: {
        formatFileCount() {
            return `${this.fileCount} ${this.fileCount > 1 || this.fileCount == 0 ? 'Dateien' : 'Datei'}`
        }
    }
}
</script>

<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>
