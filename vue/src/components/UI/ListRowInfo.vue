<template>
    <div class="list-row row-wrapper info">
        <!-- Type -->
        <div class="infobox iconbox">
            <DirectoryIcon v-if="type === 'Directory'" class="type"></DirectoryIcon>
            <FileIcon v-else-if="type === 'File'" class="type"></FileIcon>
        </div>
        <!-- Title -->
        <div class="infobox titlebox">
            <h2>Testdirectory</h2>
            <span>25.2 MB, 30.11.2018</span>
        </div>
        <!-- Menu -->
        <div class="infobox menu">
            <div class="option">
                <div class="icon-wrapper">
                    <DownloadIcon></DownloadIcon>
                </div>
                <span>Download</span>
            </div>
            <div class="option">
                <div class="icon-wrapper">
                    <ShareIcon></ShareIcon>
                </div>
                <span>Share</span>
            </div>
            <div class="option">
                <div class="icon-wrapper">
                    <EditIcon></EditIcon>
                </div>
                <span>Edit</span>
            </div>
            <div class="option">
                <div class="icon-wrapper">
                    <RemoveIcon></RemoveIcon>
                </div>
                <span>Remove</span>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import FileIcon from "@/assets/img/icon/overview/file.svg";
import DirectoryIcon from "@/assets/img/icon/overview/directory.svg";
//
import DownloadIcon from "@/assets/img/icon/download.svg";
import ShareIcon from "@/assets/img/icon/overview/share.svg";
import EditIcon from "@/assets/img/icon/edit.svg";
import RemoveIcon from "@/assets/img/icon/trash.svg";

export default {
    data() {
        return {
            type: "Directory"
        };
    },
    components: {
        FileIcon,
        DirectoryIcon,
        ShareIcon,
        EditIcon,
        DownloadIcon,
        RemoveIcon
    }
};
</script>

<style src="@/assets/css/components/UI/ListRowInfo" lang="scss" scoped></style>