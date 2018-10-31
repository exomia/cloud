<template>
    <main>
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

            <div class="list-row header">

                <div class="list-item">
                    <input type="checkbox">
                </div>

                <div class="list-item">
                    <span>Typ</span>
                    <DropdownIcon class="dropdown"></DropdownIcon>
                </div>

                <div class="list-item stretch">
                    <span>Name</span>
                    <DropdownIcon class="dropdown"></DropdownIcon>
                </div>

                <div class="dynamic-list-menu">

                    <div class="list-item"></div>

                    <div class="list-item">
                        <span>Größe</span>
                        <DropdownIcon class="dropdown"></DropdownIcon>
                    </div>

                    <div class="list-item">
                        <span>Datum</span>
                        <DropdownIcon class="dropdown"></DropdownIcon>
                    </div>

                </div>
            </div>

            <section class="list">

                <div class="list-row"
                     v-for="n in 20"
                     :key="n">

                    <div class="list-item"></div>

                    <div class="list-item">
                        <FileIcon class="type"></FileIcon>
                    </div>

                    <div class="list-item stretch">
                        <span>Testfile</span>
                        <span class="ext">.exe</span>
                    </div>

                    <div class="dynamic-list-menu">

                        <div class="list-item">
                            <ExtendedMenuIcon class="extended-menu"></ExtendedMenuIcon>
                        </div>

                        <div class="list-item">
                            <span>25.2 MB</span>
                        </div>

                        <div class="list-item">
                            <span>31.10.2018</span>
                        </div>

                    </div>
                </div>

            </section>
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
import DropdownIcon from "@/assets/img/icon/overview/dropdown.svg"
import ExtendedMenuIcon from "@/assets/img/icon/overview/extended-menu.svg"

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
        PathArrowIcon,
        DropdownIcon,
        ExtendedMenuIcon
    }
}
</script>

<style src="@/assets/css/pages/overview/index" lang="scss" scoped></style>
