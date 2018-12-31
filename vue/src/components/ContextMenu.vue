<template>
    <div v-if="opened" class="option-list-display">
        <div class="wrapper">
            <a
                v-for="(item, idx) of items"
                :key="'list-option' + idx"
                class="option-item"
                @click.stop="clickAction(item.emit)"
            >
                <!-- Choose icon -->
                <InfoIcon v-if="item.iconClass === 'info'"></InfoIcon>
                <ShareIcon v-if="item.iconClass === 'share'"></ShareIcon>
                <EditIcon v-if="item.iconClass === 'edit'"></EditIcon>
                <DownloadIcon v-if="item.iconClass === 'download'"></DownloadIcon>
                <RemoveIcon v-if="item.iconClass === 'remove'"></RemoveIcon>
                <span>{{ item.name }}</span>
            </a>
        </div>
    </div>
</template>

<script>
/* SVG */
import InfoIcon from '@/assets/img/icon/information.svg'
import ShareIcon from '@/assets/img/icon/share.svg'
import EditIcon from '@/assets/img/icon/edit.svg'
import DownloadIcon from '@/assets/img/icon/download.svg'
import RemoveIcon from '@/assets/img/icon/trash.svg'

export default {
    components: {
        InfoIcon,
        ShareIcon,
        EditIcon,
        DownloadIcon,
        RemoveIcon
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
    mounted() {
        const self = this
        document.body.addEventListener('click', function() {
            self.closeMenu()
        })
    },
    methods: {
        clickAction: function(emit) {
            this.$emit(emit)
            this.closeMenu()
        },
        closeMenu: function() {
            this.$emit('update:opened', false)
        }
    }
}
</script>

<style src="@/assets/scss/components/ContextMenu.scss" lang="scss" scoped></style>
