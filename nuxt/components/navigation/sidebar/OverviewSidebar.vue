<template>
    <aside>
        <div>
            <sidebar-item iconClass="directory" routeName="overview-dir" text="Alle Dateien"/>
        </div>
        <div>
            <a class="sidebar-item no-hover">
                <div class="volume-container">
                    <span class="volume-header">{{usedVolume | toUnit}}&nbsp;/&nbsp;{{volume | toUnit}}</span>
                    <div class="volume-bg">
                        <div class="volume" :style="{width: (100 / volume * usedVolume) + '%' }"/>
                    </div>
                </div>
            </a>
            <sidebar-item iconClass="trash" routeName="trash" text="Papierkorb"/>
            <sidebar-item iconClass="settings" routeName="settings-profile" text="Einstellungen"/>
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from '~/components/UI/SidebarItem'

export default {
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters(['usedVolume', 'volume'])
    }
}
</script>

<style src="~/assets/css/components/navigation/sidebar/sidebar.scss" lang="scss">
</style>
