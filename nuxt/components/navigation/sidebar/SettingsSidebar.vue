<template>
  <div class="sidebar">
    <div>
        <sidebar-item iconClass="profile" routeName="settings-profile" text="Profil"></sidebar-item>
    </div>
    <div>
        <div class="sidebar-header">Admin</div>
        <sidebar-item iconClass="rights" routeName="settings-admin-rights" text="Rechte"></sidebar-item>
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
