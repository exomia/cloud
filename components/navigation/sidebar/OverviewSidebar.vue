<template>
    <div class="sidebar">
        <div>
            <sidebar-item iconClass="directory" href="overview" text="Alle Dateien"></sidebar-item>
        </div>
        <div>
            <a class="sidebar-item no-hover">
                <div class="volume-container">
                    <span class="volume-header">{{usedVolume | toUnitNoSuffix}}&nbsp;/&nbsp;{{maxVolume | toUnit}}</span>
                    <div class="volume-bg">
                        <div class="volume"
                        :style="{width: (100 / maxVolume * usedVolume) + '%' }"></div>
                    </div>
                </div>
            </a>
            <sidebar-item iconClass="trash" href="trash" text="Papierkorb"></sidebar-item>
            <sidebar-item iconClass="settings" href="settings" text="Einstellungen"></sidebar-item>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from '~/components/UI/SidebarItem'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['maxVolume', 'usedVolume'])
  }
}
</script>
