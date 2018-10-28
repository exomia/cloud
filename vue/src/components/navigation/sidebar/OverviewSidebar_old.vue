<template>
    <aside>
        <div>
            <sidebar-item iconClass="directory"
                          routeName="overview-dir"
                          :text="$t('sidebar.overview.allFiles')" />
        </div>
        <div>
            <a class="sidebar-item no-hover">
                <div class="volume-container">
                    <span class="volume-header">{{usedVolume | toUnit}}&nbsp;/&nbsp;{{volume | toUnit}}</span>
                    <div class="volume">
                        <div class="volume-progress"
                             :style="{width: (100 / volume * usedVolume) + '%' }" />
                    </div>
                </div>
            </a>
            <sidebar-item iconClass="trash"
                          routeName="trash"
                          :text="$t('sidebar.overview.trash')" />
            <sidebar-item iconClass="settings"
                          routeName="settings"
                          :text="$t('sidebar.overview.settings')" />
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from '@/components/UI/SidebarItem'

export default {
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters(['usedVolume', 'volume'])
    }
}
</script>

<style src="@/assets/css/components/navigation/sidebar/sidebar" lang="scss">
</style>
