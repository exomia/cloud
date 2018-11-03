<template>
    <nav class="path">

        <div class="path-item">
            <HomeIcon></HomeIcon>
        </div>

        <PathArrowIcon class="path-arrow"></PathArrowIcon>
        <div class="path-item">
            <span>Test Ordner</span>
        </div>

        <PathArrowIcon class="path-arrow"></PathArrowIcon>
        <div class="path-item">
            <span>Test Ordner</span>
        </div>

    </nav>
</template>

<script>
/* SVG */
import HomeIcon from "@/assets/img/icon/overview/home.svg"
import PathArrowIcon from "@/assets/img/icon/overview/path-arrow.svg"

export default {
    components: {
        HomeIcon,
        PathArrowIcon
    }
}
</script>

<style src="@/assets/css/components/partials/overview/Nav" lang="scss" scoped></style>
