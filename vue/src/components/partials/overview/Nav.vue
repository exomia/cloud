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
            <PathArrowIcon
                :key="'pathInfoArrow-' + idx"
                class="path-arrow"
            ></PathArrowIcon>
            <RouterLink
                :key="'pathInfo-' + idx"
                class="path-item"
                tag="a"
                :to="{ name: 'overview-dir', params: { dir: pi.uuid } }"
                :title="pi.name"
            >
                <span>{{ formatName(pi.name) }}</span>
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
        formatName: name => {
            if (name && name.length > 20) return name.substring(0, 20) + '...'
            return name
        }
    }
}
</script>

<style
    src="@/assets/css/components/partials/overview/Nav"
    lang="scss"
    scoped
></style>
