<template>
    <main>
        <aside>
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
        <div class="center">
            <nav class="path">

                <div class="path-item">
                    <HomeIcon></HomeIcon>
                </div>

                <PathArrowIcon class="path-arrow"></PathArrowIcon>
                <div class="path-item">
                    <span>Test Ordner</span>
                </div>

                <PathArrowIcon class="path-arrow"></PathArrowIcon>
                <div class="path-item">
                    <span>Test Ordner</span>
                </div>

            </nav>
        </div>
    </main>
</template>

<script>
/* SVG */
import LogoIcon from "@/assets/img/icon/overview/logo.svg"
import DirectoryIcon from "@/assets/img/icon/overview/directory.svg"
import FileIcon from "@/assets/img/icon/overview/file.svg"
import ShareIcon from "@/assets/img/icon/overview/share.svg"
import SettingsIcon from "@/assets/img/icon/overview/settings.svg"
import LogoutIcon from "@/assets/img/icon/overview/logout.svg"
import HomeIcon from "@/assets/img/icon/overview/home.svg"
import PathArrowIcon from "@/assets/img/icon/overview/path-arrow.svg"

export default {
    head() {
        return {
            title: this.$t("title.overview")
        }
    },
    components: {
        LogoIcon,
        DirectoryIcon,
        FileIcon,
        ShareIcon,
        SettingsIcon,
        LogoutIcon,
        HomeIcon,
        PathArrowIcon
    }
}
</script>

<style src="@/assets/css/pages/overview/index" lang="scss" scoped></style>
