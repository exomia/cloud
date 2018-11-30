<template>
    <div v-if="opened" class="option-list-display">
        <div class="wrapper">
            <a
                v-for="(item, idx) of items"
                :key="'list-option' + idx"
                @click.stop="clickAction(item.emit)"
                class="option-item"
            >
                <!-- Choose icon -->
                <info-icon v-if="item.iconClass === 'info'"></info-icon>
                <share-icon v-if="item.iconClass === 'share'"></share-icon>
                <edit-icon v-if="item.iconClass === 'edit'"></edit-icon>
                <download-icon v-if="item.iconClass === 'download'"></download-icon>
                <remove-icon v-if="item.iconClass === 'remove'"></remove-icon>
                <span>{{item.name}}</span>
            </a>
        </div>
    </div>
</template>

<script>
/* SVG */
import InfoIcon from "@/assets/img/icon/information.svg";
import ShareIcon from "@/assets/img/icon/overview/share.svg";
import EditIcon from "@/assets/img/icon/edit.svg";
import DownloadIcon from "@/assets/img/icon/download.svg";
import RemoveIcon from "@/assets/img/icon/trash.svg";

export default {
    methods: {
        clickAction: function(emit) {
            this.$emit(emit);
            this.closeMenu();
        },
        closeMenu: function() {
            this.$emit("update:opened", false);
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        opened: {
            type: Boolean,
            required: true
        }
    },
    components: {
        InfoIcon,
        ShareIcon,
        EditIcon,
        DownloadIcon,
        RemoveIcon
    },
    mounted() {
        let self = this;
        document.body.addEventListener("click", function() {
            self.closeMenu();
        });
    }
};
</script>

<style src="@/assets/css/components/extras/ContextMenu" lang="scss" scoped>
</style>
