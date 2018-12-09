<template>
    <div
        class="list-row"
        :class="hideInformations ? 'info-active' : ''"
        @click="onClick()"
    >
        <div class="list-item"></div>

        <!-- Type -->
        <div class="list-item">
            <DirectoryIcon
                v-if="type === 'Directory'"
                class="type"
            ></DirectoryIcon>
            <FileIcon v-else-if="type === 'File'" class="type"></FileIcon>
        </div>

        <!-- Name -->
        <div
            class="list-item"
            :class="hideInformations ? 'info-active' : 'relative'"
        >
            <span>{{ name }}</span> <span class="ext">{{ extension }}</span>
        </div>

        <div
            class="dynamic-list-menu"
            :style="hideInformations ? 'width: auto' : ''"
        >
            <!-- Extended menu -->
            <div class="list-item">
                <ExtendedMenuIcon
                    class="extended-menu"
                    @click.stop="contextMenuToggled = !contextMenuToggled"
                ></ExtendedMenuIcon>
                <ContextMenu
                    :items="contextMenuItems"
                    :opened="contextMenuToggled"
                    @update:opened="contextMenuToggled = false"
                    @info="triggerInfo()"
                ></ContextMenu>
            </div>

            <!-- Size -->
            <div v-if="!hideInformations" class="list-item">
                <span v-if="type !== 'Directory'">{{ size | toUnit }}</span>
            </div>

            <!-- Date -->
            <div v-if="!hideInformations" class="list-item">
                <span>{{ timestamp | toDatetime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import FileIcon from '@/assets/img/icon/overview/file.svg'
import DirectoryIcon from '@/assets/img/icon/overview/directory.svg'
import ExtendedMenuIcon from '@/assets/img/icon/overview/extended-menu.svg'

/* Components */
import ContextMenu from '@/components/ContextMenu'

export default {
    components: {
        DirectoryIcon,
        FileIcon,
        ExtendedMenuIcon,
        ContextMenu
    },
    props: {
        uuid: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            default: '',
            required: false
        },
        type: {
            type: String,
            default: 'File'
        },
        scanStatus: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 0
        },
        timestamp: {
            type: String,
            required: true
        },
        isNewDirectory: {
            type: Boolean,
            default: false
        },
        extension: {
            type: String,
            default: ''
        },
        hideInformations: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            contextMenuToggled: false,
            contextMenuItems: [
                {
                    name: this.$i18n.t('partials.ListRow.info'),
                    iconClass: 'info',
                    emit: 'info'
                },
                {
                    name: this.$i18n.t('partials.ListRow.share'),
                    iconClass: 'share',
                    emit: 'share'
                },
                {
                    name: this.$i18n.t('partials.ListRow.rename'),
                    iconClass: 'edit',
                    emit: 'rename'
                },
                {
                    name: this.$i18n.t('partials.ListRow.download'),
                    iconClass: 'download',
                    emit: 'download'
                },
                {
                    name: this.$i18n.t('partials.ListRow.remove'),
                    iconClass: 'remove',
                    emit: 'remove'
                }
            ]
        }
    },
    methods: {
        triggerInfo: function() {
            this.$emit('info')
        },
        onClick: function() {
            if (this.type === 'Directory') {
                this.$router.push({
                    name: 'overview-dir',
                    params: { dir: this.uuid }
                })
            }
        }
    }
}
</script>

<style src="@/assets/scss/components/ListRow" lang="scss"></style>
