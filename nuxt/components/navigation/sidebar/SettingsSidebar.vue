<template>
  <div class="sidebar">
    <div>
        <sidebar-item iconClass="profile" routeName="settings-profile" text="Profil"/>
    </div>
    <div>
        <div class="sidebar-header">Admin</div>
        <sidebar-item iconClass="rights" routeName="settings-admin-rights" text="Rechte"/>
    </div>
</div>
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
