<template>
    <aside>
        <div class="img"></div>
        <div class="overlay"></div>
        <div class="wrapper">
            <section class="menu">
                <div class="sidebar-header">
                    <LogoIcon class="logo"></LogoIcon>
                    <h1>Exomia Cloud</h1>
                </div>

                <a class="sidebar-item">
                    <div class="sidebar-item-inner">
                        <FileIcon class="icon"></FileIcon>
                        <span>Alle Dateien</span>
                    </div>
                </a>

                <a class="sidebar-item">
                    <div class="sidebar-item-inner">
                        <ShareIcon class="icon"></ShareIcon>
                        <span>Freigegebene Inhalte</span>
                    </div>
                </a>
            </section>

            <section class="menu">
                <a class="sidebar-item">
                    <div class="sidebar-item-inner">
                        <SettingsIcon class="icon"></SettingsIcon>
                        <span>Settings</span>
                    </div>
                </a>

                <a class="sidebar-item" @click="logout()">
                    <div class="sidebar-item-inner">
                        <LogoutIcon class="icon"></LogoutIcon>
                        <span>Logout</span>
                    </div>
                </a>
            </section>
        </div>
    </aside>
</template>

<script>
/* Import */
import { remove as removeCookie } from 'js-cookie'

/* SVG */
import LogoIcon from '@/assets/img/icon/overview/logo.svg'
import ShareIcon from '@/assets/img/icon/overview/share.svg'
import SettingsIcon from '@/assets/img/icon/overview/settings.svg'
import LogoutIcon from '@/assets/img/icon/overview/logout.svg'
import FileIcon from '@/assets/img/icon/overview/file.svg'

export default {
    components: {
        LogoIcon,
        ShareIcon,
        SettingsIcon,
        LogoutIcon,
        FileIcon
    },
    methods: {
        logout() {
            // Remove cookies
            removeCookie('x-token')
            removeCookie('x-refresh-token')

            // Redirect
            const self = this
            this.$nextTick(function() {
                self.$router.push({
                    name: 'home'
                })
            })
        }
    }
}
</script>

<style src="@/assets/scss/components/sidebar" lang="scss" scoped></style>
