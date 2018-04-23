<template>
    <div class="path-container">
        <nuxt-link :to="{ name: 'overview' }" tag="a" class="home-button">
            <i class="icon-home"/>
        </nuxt-link>

        <template v-for="entry in dirPath">
            <i class="icon-arrow" :key="entry.uuid"/>
            <nuxt-link :to="entry.uuid" tag="span" class="path-name" :key="entry.uuid">
                {{entry.name}}
            </nuxt-link>
        </template>

        <div class="options">
            <a class="option-button" @click="optionsShown = !optionsShown">
                <i class="option-button-icon"/>
            </a>
            <div v-show="optionsShown" class="option-display">
                <a class="option-item" @click="optionsShown = false">
                    <i class="upload"/>
                    <span>Datei Hochladen</span>
                </a>
                <a class="option-item" @click="optionsShown = false">
                    <i class="directory"/>
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
        ...mapGetters(['dirPath'])
    }
}
</script>

<style src="~/assets/css/components/partials/OverviewPath.scss" lang="scss" scoped>
</style>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
