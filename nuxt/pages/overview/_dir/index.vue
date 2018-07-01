<template>
    <main>
        <overview-sidebar></overview-sidebar>
        <div class="overview"
             dropzone="copy"
             @dragover.prevent
             @drop.prevent.stop="onDrop">
            <overview-path></overview-path>
            <overview-list-empty v-if="isDirectoryEmpty"></overview-list-empty>
            <template v-else>
                <list-header></list-header>
                <overview-list></overview-list>
            </template>
            <overview-upload-status v-if="uploadActive">
            </overview-upload-status>
        </div>
    </main>
</template>

<script>
import OverviewSidebar from '~/components/navigation/sidebar/OverviewSidebar'
import OverviewPath from '~/components/partials/OverviewPath'
import ListHeader from '~/components/UI/ListHeader'
import OverviewList from '~/components/partials/OverviewList'
import OverviewUploadStatus from '~/components/partials/OverviewUploadStatus'
import OverviewListEmpty from '~/components/partials/OverviewListEmpty'

export default {
    middleware: ['auth', 'directory'],
    /*meta: {
        auth: {
            security: 1
        }
    },*/
    head() {
        return {
            title: `${process.env.PROJECT_TITLE} - ${this.$i18n.t('title.overview')}`
        }
    },
    data() {
        return {
            checked: false
        }
    },
    components: {
        OverviewSidebar,
        OverviewPath,
        ListHeader,
        OverviewList,
        OverviewUploadStatus,
        OverviewListEmpty
    },
    computed: {
        uploadActive() {
            return this.$store.getters.uploadActive
        },
        isDirectoryEmpty() {
            return this.$store.getters.isDirectoryEmpty
        },
        currentDirectoryUuid() {
            return this.$store.getters.currentDirectoryUuid
        }
    },
    methods: {
        toggleCheckbox() {
            this.checked = !this.checked
        },
        onDrop({ dataTransfer }) {
            if (dataTransfer) {
                // Check if user has enough upload size left?
                this.$store.dispatch('startFileUpload', dataTransfer)
            }
        }
    }
}
</script>

<style src="~/assets/css/pages/overview/index.scss" lang="scss" scoped></style>