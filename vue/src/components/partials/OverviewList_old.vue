<template>
    <div class="list-container"
         style="height: calc(100vh - 175px)">
        <list-row v-if="createDirectoryShown"
                  type="Directory"
                  :size="0"
                  :timestamp="Date.now()"
                  isNewDirectory></list-row>
        <list-row v-for="entry in getDirectoryData"
                  :key="entry.uuid"
                  :uuid="entry.uuid"
                  :name="entry.name"
                  :type="entry.type"
                  :size="entry.size"
                  :timestamp="entry.timestamp"
                  :extension="entry.extension" />
        <list-summary :directoryCount="getDirectoryCount"
                      :fileCount="getFileCount"
                      :sizeSum="sizeSum" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListRow from '@/components/UI/ListRow'
import ListSummary from '@/components/UI/ListSummary'

export default {
    components: {
        ListRow,
        ListSummary
    },
    computed: {
        ...mapGetters(['getDirectoryData', 'getDirectoryCount', 'getFileCount', 'sizeSum']),
        createDirectoryShown: {
            get() {
                return this.$store.getters.isCreateDirectoryShown
            },
            set(val) {
                this.$store.commit('setCreateDirectoryShown', val)
            }
        }
    }
}
</script>

<style src="@/assets/css/components/partials/OverviewList" lang="scss" scoped>
</style>
