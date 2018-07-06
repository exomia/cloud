<template>
    <div class="path-container">
        <nuxt-link :to="localePath('overview-dir')"
                   tag="a"
                   class="home-button">
            <i class="icon-home" />
        </nuxt-link>

        <template v-for="entry in path">
            <i class="icon-arrow"
               :key="entry.uuid + '-icon'" />
            <nuxt-link :to="entry.uuid"
                       tag="span"
                       class="path-name"
                       :key="entry.uuid + '-span'">
                {{entry.name}}
            </nuxt-link>
        </template>

        <div class="options">
            <a class="option-button"
               @click="floatingMenuActive = !floatingMenuActive">
                <i class="option-button-icon" />
            </a>
            <div v-if="floatingMenuActive"
                 class="option-display">
                <div class="wrapper">
                    <input ref="fileInput"
                           type="file"
                           style="display: none"
                           multiple>
                    <floating-menu v-if="floatingMenuActive"
                                   class="topbar-settings"
                                   :items="floatingMenuItems"
                                   @clicked="floatingMenuActive = false"
                                   @triggerFileInput="triggerFileInput()"
                                   @triggerCreateNewDirectory="triggerCreateNewDirectory()"></floating-menu>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FloatingMenu from '~/components/UI/FloatingMenu.vue'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            floatingMenuActive: false,
            floatingMenuItems: [
                {
                    name: this.$i18n.t('partials.OverviewPath.uploadFile'),
                    iconClass: 'upload',
                    emit: 'triggerFileInput'
                },
                {
                    name: this.$i18n.t('partials.OverviewPath.newDirectory'),
                    iconClass: 'directory',
                    emit: 'triggerCreateNewDirectory'
                }
            ]
        }
    },
    components: {
        FloatingMenu
    },
    computed: {
        ...mapGetters(['directories', 'path'])
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click()
            this.optionsShown = false
        },
        triggerCreateNewDirectory() {
            this.$store.commit('setCreateDirectoryShown', true)
            this.optionsShown = false
        }
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewPath.scss" lang="scss" scoped>
</style>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
