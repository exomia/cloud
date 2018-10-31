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
import OverviewSidebar from "@/components/navigation/sidebar/OverviewSidebar_old"
import OverviewPath from "@/components/partials/OverviewPath_old"
import ListHeader from "@/components/UI/ListHeader_old"
import OverviewList from "@/components/partials/OverviewList_old"
import OverviewUploadStatus from "@/components/partials/OverviewUploadStatus_old"
import OverviewListEmpty from "@/components/partials/OverviewListEmpty_old"

export default {
    /*meta: {
        auth: {
            security: 1
        }
    },*/
    head() {
        return {
            title: this.$t("title.overview")
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
                this.$store.dispatch("startFileUpload", dataTransfer)
            }
        }
    }
}
</script>

<style src="@/assets/css/pages/overview/index_old" lang="scss" scoped></style>