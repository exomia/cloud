<template>
    <div class="list-row row-wrapper info">
        <!-- Type -->
        <div class="infobox iconbox">
            <DirectoryIcon v-if="type === 'Directory'" class="type"></DirectoryIcon>
            <FileIcon v-else-if="type === 'File'" class="type"></FileIcon>
        </div>
        <!-- Title -->
        <div class="infobox titlebox">
            <h2>{{ name }}</h2>
            <span>{{ size | toUnit }},&nbsp;{{ timestamp | toDatetime }}</span>
        </div>
        <!-- Menu -->
        <div class="infobox menu">
            <div class="option">
                <div class="icon-wrapper"><DownloadIcon></DownloadIcon></div>
                <span>{{ $t('components.ListRowInfo.download') }}</span>
            </div>
            <div class="option">
                <div class="icon-wrapper"><ShareIcon></ShareIcon></div>
                <span>{{ $t('components.ListRowInfo.share') }}</span>
            </div>
            <div class="option">
                <div class="icon-wrapper"><EditIcon></EditIcon></div>
                <span>{{ $t('components.ListRowInfo.edit') }}</span>
            </div>
            <div class="option">
                <div class="icon-wrapper"><RemoveIcon></RemoveIcon></div>
                <span>{{ $t('components.ListRowInfo.remove') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import FileIcon from '@/assets/img/icon/file.svg'
import DirectoryIcon from '@/assets/img/icon/directory.svg'
//
import DownloadIcon from '@/assets/img/icon/download.svg'
import ShareIcon from '@/assets/img/icon/share.svg'
import EditIcon from '@/assets/img/icon/edit.svg'
import RemoveIcon from '@/assets/img/icon/trash.svg'

export default {
    components: {
        FileIcon,
        DirectoryIcon,
        ShareIcon,
        EditIcon,
        DownloadIcon,
        RemoveIcon
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
        size: {
            type: Number,
            default: 0
        },
        timestamp: {
            type: String,
            required: true
        },
        extension: {
            type: String,
            default: ''
        }
    }
}
</script>

<style src="@/assets/scss/components/ListRowInfo.scss" lang="scss" scoped></style>
