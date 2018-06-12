<template>
    <main>
        <overview-sidebar></overview-sidebar>
        <div class="overview"
             dropzone="copy"
             @dragover.prevent
             @drop.prevent.stop="onDrop">
            <overview-path></overview-path>
            <template v-if="!isDirectoryEmpty">
                <overview-list-header></overview-list-header>
                <overview-list></overview-list>
            </template>
            <template v-else>
                <overview-list-empty></overview-list-empty>
            </template>
            <overview-file-exchange-status v-if="fileExchangeActive"
                                           :name="fileExchangeFilename"
                                           :progress="fileExchangeProgress"
                                           :fileCount="fileExchangeCount"
                                           :fileSize="fileExchangeSize"
                                           :uploadSpeed="fileExchangeRate">
            </overview-file-exchange-status>
        </div>
    </main>
</template>

<script>
import OverviewSidebar from '~/components/navigation/sidebar/OverviewSidebar'
import OverviewPath from '~/components/partials/OverviewPath'
import OverviewListHeader from '~/components/partials/OverviewListHeader'
import OverviewList from '~/components/partials/OverviewList'
import OverviewFileExchangeStatus from '~/components/partials/OverviewFileExchangeStatus'
import OverviewListEmpty from '~/components/partials/OverviewListEmpty'

export default {
    components: {
        OverviewSidebar,
        OverviewPath,
        OverviewListHeader,
        OverviewList,
        OverviewFileExchangeStatus,
        OverviewListEmpty
    },
    computed: {
        fileExchangeFilename() {
            return this.$store.getters.exchangeFilename
        },
        fileExchangeActive() {
            return this.$store.getters.exchangeActive
        },
        fileExchangeCount() {
            return this.$store.getters.exchangeFileCount
        },
        fileExchangeSize() {
            return this.$store.getters.exchangeSize
        },
        fileExchangeProgress() {
            return this.$store.getters.exchangeProgress
        },
        fileExchangeRate() {
            return this.$store.getters.exchangeRate
        },
        isDirectoryEmpty() {
            return this.$store.getters.isDirectoryEmpty
        },
        currentDirectoryId() {
            return this.$store.getters.currentDirectoryId
        }
    },
    methods: {
        onDrop({ dataTransfer }) {
            if (dataTransfer) {
                console.log(dataTransfer)
                // Check if user has enough upload size left?
                this.$store.dispatch('startFileUpload', dataTransfer)
            }
        }
    }
}
</script>

<style src="~/assets/css/pages/overview/index.scss" lang="scss" scoped />
