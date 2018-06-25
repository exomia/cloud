<template>
    <div class="list-container"
         style="height: calc(100vh - 184px)">
        <list-row v-if="createDirectoryShown"
                  type="Directory"
                  :size="0"
                  :timestamp="Date.now()"
                  isNewDirectory></list-row>
        <list-row v-for="entry in directories"
                  :key="entry.id"
                  :id="entry.id"
                  :name="entry.name"
                  type="Directory"
                  :size="entry.size"
                  :timestamp="entry.timestamp" />
        <list-row v-for="entry in files"
                  :key="entry.id"
                  :id="entry.id"
                  :name="entry.name"
                  type="File"
                  :size="entry.size"
                  :timestamp="entry.timestamp"
                  :extension="entry.extension" />
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
    components: {
        ListRow,
        ListSummary
    },
    computed: {
        ...mapGetters(['directories', 'files', 'followingDirectories', 'followingFiles', 'sizeSum']),
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

<style src="~/assets/css/components/partials/OverviewList.scss" lang="scss" scoped>
</style>
