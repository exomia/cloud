<template>
    <div class="list-container" style="height: calc(100vh - 169px)">
        <list-row 
            v-for="(entry, idx) in files" 
            :key="idx"
            :name="entry.name"
            :type="entry.type"
            :size="entry.size"
            :timestamp="entry.timestamp"/>
        <list-summary
            :followingDirectories="followingDirectories"
            :followingFiles="followingFiles"
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
        ...mapGetters(['files', 'followingDirectories', 'followingFiles', 'sizeSum'])
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewList.scss" lang="scss" scoped>
</style>
