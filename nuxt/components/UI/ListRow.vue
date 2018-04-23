<template>
    <div class="list-row list-row-hover">
        <div style="width: 100px">
            <input type="checkbox" class="checkbox" style="opacity: 0">
            <i v-if="type === 'Folder'" class="folder-icon"/>
            <i v-if="type === 'File'" class="file-icon"/>
        </div>
        <div style="width: calc(100% - 535px)">
            <span v-if="!renameActive" class="row-name">{{name}}</span>
            <input v-else class="text-input rename-input" type="text" v-model="name">
        </div>
        <div style="width: 85px">
            <a class="list-button em-button" @click="listOptionsActive = !listOptionsActive">
                <i class="extended-menu-icon"/>
            </a>
            <div v-show="listOptionsActive" class="option-list-display list-options">
                <a class="option-item">
                    <i class="info"/>
                    <span>Info</span>
                </a>
                <a class="option-item">
                    <i class="share"/>
                    <span>Teilen</span>
                </a>
                <a class="option-item" @click="renameActive = !renameActive; listOptionsActive = false">
                    <i class="edit"/>
                    <span>Umbenennen</span>
                </a>
                <a class="option-item" onclick="//rar download ?">
                    <i class="download"/>
                    <span>Herunterladen</span>
                </a>
                <a class="option-item">
                    <i class="remove"/>
                    <span>Löschen</span>
                </a>
            </div>
        </div>
        <div style="width: 100px">
            <i v-if="scanStatus == 0" class="status-icon-accepted"/>
            <i v-if="scanStatus == 1" class="status-icon-progress"/>
            <i v-if="scanStatus == 2" class="status-icon-attention"/>
        </div>
        <div style="width: 100px">
            <span>{{size | toUnit}}</span>
        </div>
        <div style="width: 150px">
            <span>{{date | toDatetime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            renameActive: false,
            listOptionsActive: false
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'File'
        },
        scanStatus: {
            type: Number,
            default: 1
        },
        size: {
            type: Number
        },
        date: {
            type: Number,
            required: true
        }
    }
}
</script>

<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
