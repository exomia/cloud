<template>
      <div class="list-summary">
        <div style="width: 100px" class="list-item"></div>
        <div style="width: calc(100% - 510px)" class="list-item">
            <span>{{followingDirectorys}} Ordner, {{followingFilesDisplay}}</span>
        </div>
        <div style="width: 185px" class="list-item"></div>
        <div style="width: 100px" class="list-item">
            <span>{{sizeSum | toUnit}}</span>
        </div>
        <div style="width: 125px" class="list-item"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        followingDirectorys: {
            type: Number,
            required: true
        },
        followingFiles: {
            type: Number,
            required: true
        },
        sizeSum: {
            type: Number,
            required: true
        }
    },
    computed: {
        followingFilesDisplay() {
            return `${this.followingFiles} ${this.followingFiles > 1 || this.followingFiles == 0 ? 'Dateien' : 'Datei'}`
        }
    }
}
</script>

<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>
