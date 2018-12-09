<template>
    <nav class="path">
        <RouterLink
            class="path-item"
            tag="a"
            :to="{ name: 'overview-dir' }"
            :title="this.$i18n.t('title.overview')"
        >
            <HomeIcon></HomeIcon>
        </RouterLink>

        <template v-for="(pi, idx) in pathInfo">
            <PathArrowIcon :key="'pathInfoArrow-' + idx" class="path-arrow"></PathArrowIcon>
            <RouterLink
                :key="'pathInfo-' + idx"
                class="path-item"
                tag="a"
                :to="{ name: 'overview-dir', params: { dir: pi.uuid } }"
                :title="pi.name"
            >
                <span>{{ formatPath(pathInfo.length, idx, pi.name) }}</span>
            </RouterLink>
        </template>
    </nav>
</template>

<script>
/* SVG */
import HomeIcon from '@/assets/img/icon/overview/home.svg'
import PathArrowIcon from '@/assets/img/icon/overview/path-arrow.svg'

export default {
    components: {
        HomeIcon,
        PathArrowIcon
    },
    computed: {
        pathInfo() {
            return this.$store.getters.pathInfo
        }
    },
    methods: {
        formatPath: (cnt, idx, name) => {
            if (cnt > 1 && idx + 1 != cnt) {
                return '...'
            }
            return name
        }
    }
}
</script>

<style
    src="@/views/_overview/components/TheOverviewNavigation.scss"
    lang="scss"
    scoped
></style>
