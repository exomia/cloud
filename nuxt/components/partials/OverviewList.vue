<template>
    <div class="list-container" style="height: calc(100% - 98px)">
        <list-row 
            v-for="(entry, idx) in dirItems" 
            :key="idx"
            :name="entry.name"
            :type="entry.type"
            :size="entry.size"
            :date="entry.date"/>
        <list-summary
            :followingDirectorys="followingDirectorys"
            :followingFilesDisplay="followingFilesDisplay"
            :sizeSum="sizeSum"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListRow from '~/components/UI/ListRow'
import ListSummary from '~/components/UI/ListSummary'

export default {
    data() {
        return {}
    },
    components: {
        ListRow,
        ListSummary
    },
    computed: {
        ...mapGetters(['dirItems', 'followingDirectorys', 'followingFiles', 'sizeSum']),
        followingFilesDisplay() {
            return `${this.followingFiles} ${this.followingFiles > 1 || this.followingFiles == 0 ? 'Dateien' : 'Datei'}`
        }
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewList.scss" lang="scss" scoped>
</style>
