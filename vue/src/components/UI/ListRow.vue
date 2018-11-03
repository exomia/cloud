<template>
    <div class="list-row">

        <div class="list-item"></div>

        <div class="list-item">
            <FileIcon class="type"></FileIcon>
        </div>

        <div class="list-item stretch">
            <span>Testfile</span>
            <span class="ext">.exe</span>
        </div>

        <div class="dynamic-list-menu">

            <div class="list-item">
                <ExtendedMenuIcon class="extended-menu"></ExtendedMenuIcon>
            </div>

            <div class="list-item">
                <span>25.2 MB</span>
            </div>

            <div class="list-item">
                <span>31.10.2018</span>
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
    components: {
        DirectoryIcon,
        FileIcon,
        ExtendedMenuIcon
    }
}
</script>

<style src="@/assets/css/components/UI/ListRow" lang="scss"></style>
