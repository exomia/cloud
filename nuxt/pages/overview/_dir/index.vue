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
            <overview-upload-status v-if="uploadActive"
                                    :fileCount="fileCount"
                                    :fileSize="fileSize"
                                    :uploadSpeed="uploadSpeed">
            </overview-upload-status>
        </div>
    </main>
</template>

<script>
import OverviewSidebar from '~/components/navigation/sidebar/OverviewSidebar'
import OverviewPath from '~/components/partials/OverviewPath'
import OverviewListHeader from '~/components/partials/OverviewListHeader'
import OverviewList from '~/components/partials/OverviewList'
import OverviewUploadStatus from '~/components/partials/OverviewUploadStatus'
import OverviewListEmpty from '~/components/partials/OverviewListEmpty'

export default {
    data() {
        return {
            uploadActive: false,
            fileCount: 2,
            fileSize: 10,
            uploadSpeed: 2
        }
    },
    components: {
        OverviewSidebar,
        OverviewPath,
        OverviewListHeader,
        OverviewList,
        OverviewUploadStatus,
        OverviewListEmpty
    },
    computed: {
        isDirectoryEmpty() {
            return this.$store.getters.isDirectoryEmpty
        }
    },
    methods: {
        onDrop(e) {
            console.log(e)
        }
    }
}
</script>

<style src="~/assets/css/pages/overview/index.scss" lang="scss" scoped />
