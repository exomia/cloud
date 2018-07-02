<template>
    <aside>
        <div>
            <sidebar-item iconClass="profile"
                          routeName="settings"
                          :text="$t('sidebar.settings.profile')" />
        </div>
        <div>
            <div class="sidebar-header">{{$t('sidebar.settings.admin')}}</div>
            <sidebar-item iconClass="rights"
                          routeName="settings-admin-rights"
                          :text="$t('sidebar.settings.rights')" />
        </div>
    </aside>
</template>

<script>
import SidebarItem from '~/components/UI/SidebarItem'
export default {
    components: {
        SidebarItem
    }
}
</script>

<style src="~/assets/css/components/navigation/sidebar/sidebar.scss" lang="scss">
</style>
