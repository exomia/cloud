<template>
    <div class="list-row" @click="onClick()">
        <div class="list-item"></div>

        <!-- Type -->
        <div class="list-item">
            <DirectoryIcon v-if="type === 'Directory'" class="type"></DirectoryIcon>
            <FileIcon v-else-if="type === 'File'" class="type"></FileIcon>
        </div>

        <!-- Name -->
        <div class="list-item stretch">
            <span>{{name}}</span>
            <span class="ext">{{extension}}</span>
        </div>

        <div class="dynamic-list-menu">
            <!-- Extended menu -->
            <div class="list-item">
                <ExtendedMenuIcon
                    class="extended-menu"
                    @click.stop="floatingMenuToggled = !floatingMenuToggled"
                ></ExtendedMenuIcon>
                <FloatingMenu
                    v-if="floatingMenuToggled"
                    :items="floatingMenuItems"
                    @clicked="floatingMenuToggled = false"
                    @info="console.log()"
                    @share="console.log()"
                    @rename="console.log()"
                    @download="console.log()"
                    @remove="console.log()"
                ></FloatingMenu>
            </div>

            <!-- Size -->
            <div class="list-item">
                <span v-if="type !== 'Directory'">{{size | toUnit}}</span>
            </div>

            <!-- Date -->
            <div class="list-item">
                <span>{{timestamp | toDatetime}}</span>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import FileIcon from "@/assets/img/icon/overview/file.svg";
import DirectoryIcon from "@/assets/img/icon/overview/directory.svg";
import ExtendedMenuIcon from "@/assets/img/icon/overview/extended-menu.svg";

/* Components */
import FloatingMenu from "@/components/UI/FloatingMenu";

export default {
    data() {
        return {
            floatingMenuToggled: false,
            floatingMenuItems: [
                {
                    name: this.$i18n.t("partials.ListRow.info"),
                    iconClass: "info",
                    emit: "info"
                },
                {
                    name: this.$i18n.t("partials.ListRow.share"),
                    iconClass: "share",
                    emit: "share"
                },
                {
                    name: this.$i18n.t("partials.ListRow.rename"),
                    iconClass: "edit",
                    emit: "rename"
                },
                {
                    name: this.$i18n.t("partials.ListRow.download"),
                    iconClass: "download",
                    emit: "download"
                },
                {
                    name: this.$i18n.t("partials.ListRow.remove"),
                    iconClass: "remove",
                    emit: "remove"
                }
            ]
        };
    },
    props: {
        uuid: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: "File"
        },
        scanStatus: {
            type: Number,
            default: 0
        },
        size: {
            type: Number
        },
        timestamp: {
            required: true
        },
        isNewDirectory: {
            type: Boolean,
            default: false
        },
        extension: {
            type: String
        }
    },
    components: {
        DirectoryIcon,
        FileIcon,
        ExtendedMenuIcon,
        FloatingMenu
    },
    methods: {
        onClick: function() {
            if (this.type === "Directory") {
                this.$router.push({
                    name: "overview-dir",
                    params: { dir: this.uuid }
                });
            }
        }
    }
};
</script>

<style src="@/assets/css/components/UI/ListRow" lang="scss"></style>
