<template>
    <div class="list-container"
         style="height: calc(100vh - 169px)">
        <list-row v-for="entry in directories"
                  :key="entry.id"
                  :name="entry.name"
                  type="Directory"
                  :size="entry.size"
                  :timestamp="entry.timestamp"
                  :path="entry.id" />
        <list-row v-for="entry in files"
                  :key="entry.id"
                  :name="entry.name"
                  type="File"
                  :size="entry.size"
                  :timestamp="entry.timestamp" />
        <list-summary :followingDirectories="followingDirectories"
                      :followingFiles="followingFiles"
                      :sizeSum="sizeSum" />
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
        ...mapGetters(['directories', 'files', 'followingDirectories', 'followingFiles', 'sizeSum'])
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewList.scss" lang="scss" scoped>
</style>
