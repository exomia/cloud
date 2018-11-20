<template>
    <div class="list-row">

        <div class="list-item"></div>

        <!-- Type -->
        <div class="list-item">
            <DirectoryIcon v-if="type === 'Directory'" class="type"></DirectoryIcon>
            <FileIcon v-else-if="type === 'File'" class="type"></FileIcon>
        </div>

        <!-- Name -->
        <div class="list-item stretch">
            <span>{{name}}</span>
            <span class="ext">{{extension}}</span>
        </div>

        <div class="dynamic-list-menu">

            <!-- Extended menu -->
            <div class="list-item">
                <ExtendedMenuIcon class="extended-menu"></ExtendedMenuIcon>
            </div>

            <!-- Size -->
            <div class="list-item">
                <span>{{size | toUnit}}</span>
            </div>

            <!-- Date -->
            <div class="list-item">
                <span>{{timestamp | toDatetime}}</span>
            </div>

        </div>
    </div>
</template>

<script>
/* SVG */
import FileIcon from "@/assets/img/icon/overview/file.svg"
import DirectoryIcon from "@/assets/img/icon/overview/directory.svg"
import ExtendedMenuIcon from "@/assets/img/icon/overview/extended-menu.svg"

export default {
    props: {
        uuid: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            default: "File",
        },
        scanStatus: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
        },
        timestamp: {
            required: true,
        },
        isNewDirectory: {
            type: Boolean,
            default: false,
        },
        extension: {
            type: String,
        },
    },
    components: {
        DirectoryIcon,
        FileIcon,
        ExtendedMenuIcon,
    },
}
</script>

<style src="@/assets/css/components/UI/ListRow" lang="scss"></style>
