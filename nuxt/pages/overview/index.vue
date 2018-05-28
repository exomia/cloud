<template>
    <main>
        <overview-sidebar></overview-sidebar>
        <div class="overview" dropzone="copy" @dragover.prevent @drop="onDrop">
            <overview-path></overview-path>
            <overview-list-header></overview-list-header>
            <overview-list></overview-list>
            <overview-upload-status 
                v-if="uploadActive"
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
        OverviewUploadStatus
    },
    methods: {
        onDrop(e) {
            e.stopPropagation()
            e.preventDefault()
            console.log(e)
        }
    }
}
</script>

<style src="~/assets/css/pages/overview/index.scss" lang="scss" scoped />
