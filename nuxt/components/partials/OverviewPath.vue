<template>
    <div class="path-container">
        <nuxt-link :to="localePath('overview-dir')"
                   tag="a"
                   class="home-button">
            <i class="icon-home" />
        </nuxt-link>

        <template v-for="entry in path">
            <i class="icon-arrow"
               :key="entry.id + '-icon'" />
            <nuxt-link :to="entry.id"
                       tag="span"
                       class="path-name"
                       :key="entry.id + '-span'">
                {{entry.name}}
            </nuxt-link>
        </template>

        <div class="options">
            <a class="option-button"
               @click="optionsShown = !optionsShown">
                <i class="option-button-icon" />
            </a>
            <div v-show="optionsShown"
                 class="option-display">
                <input ref="fileInput"
                       type="file"
                       style="display: none"
                       multiple>
                <a class="option-item"
                   @click="triggerFileInput()">
                    <i class="upload" />
                    <span>Datei Hochladen</span>
                </a>
                <a class="option-item"
                   @click="triggerCreateNewDirectory()">
                    <i class="directory" />
                    <span>Neuer Ordner</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            optionsShown: false
        }
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
