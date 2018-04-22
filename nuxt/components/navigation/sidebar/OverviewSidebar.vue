<template>
    <div class="sidebar">
        <div>
            <sidebar-item iconClass="directory" routeName="overview" text="Alle Dateien"/>
        </div>
        <div>
            <a class="sidebar-item no-hover">
                <div class="volume-container">
                    <span class="volume-header">{{usedVolume | toUnitNoSuffix}}&nbsp;/&nbsp;{{maxVolume | toUnit}}</span>
                    <div class="volume-bg">
                        <div class="volume" :style="{width: (100 / maxVolume * usedVolume) + '%' }"/>
                    </div>
                </div>
            </a>
            <sidebar-item iconClass="trash" routeName="trash" text="Papierkorb"/>
            <sidebar-item iconClass="settings" routeName="settings-profile" text="Einstellungen"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from '~/components/UI/SidebarItem'

export default {
    components: {
        'sidebar-item': SidebarItem
    },
    computed: {
        ...mapGetters(['maxVolume', 'usedVolume'])
    }
}
</script>
