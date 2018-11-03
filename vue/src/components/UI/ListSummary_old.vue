<template>
    <div class="list-summary">
        <!-- File/Directory -->
        <div class="list-item"
             style="width: 50px"></div>
        <!-- Type -->
        <div class="list-item"
             style="width: 100px"></div>
        <!-- Name -->
        <div class="list-item"
             style="width: calc(100vw - 605px - 50px)">
            <span>{{directoryCount}} Ordner, {{formatFileCount}}</span>
        </div>
        <!-- Extended menu button -->
        <div class="list-item"
             style="width: 100px"></div>
        <!-- Size -->
        <div class="list-item"
             style="width: 100px">
            <span>{{sizeSum | toUnit}}</span>
        </div>
        <!-- Timestamp -->
        <div class="list-item"
             style="width: 100px"></div>
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
            return `${this.fileCount} ${
                this.fileCount > 1 || this.fileCount == 0 ? 'Dateien' : 'Datei'
            }`
        }
    }
}
</script>

<style src="@/assets/css/components/UI/Row" lang="scss" scoped>
</style>
