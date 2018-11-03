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

                <a class="sidebar-item">
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
/* SVG */
import LogoIcon from "@/assets/img/icon/overview/logo.svg"
import ShareIcon from "@/assets/img/icon/overview/share.svg"
import SettingsIcon from "@/assets/img/icon/overview/settings.svg"
import LogoutIcon from "@/assets/img/icon/overview/logout.svg"
import FileIcon from "@/assets/img/icon/overview/file.svg"

export default {
    components: {
        LogoIcon,
        ShareIcon,
        SettingsIcon,
        LogoutIcon,
        FileIcon
    }
}
</script>

<style src="@/assets/css/components/navigation/sidebar/sidebar" lang="scss" scoped></style>