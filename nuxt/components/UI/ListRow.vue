<template>
    <div class="list-row list-row-hover"
         @click.prevent.stop="click">
        <div class="list-item"
             style="width: 100px">
            <input type="checkbox"
                   class="checkbox"
                   style="opacity: 0">
            <i v-if="type === 'Directory'"
               class="directory-icon" />
            <i v-if="type === 'File'"
               class="file-icon" />
        </div>
        <div class="list-item"
             style="width: calc(100% - 510px)">
            <span v-if="!renameActive"
                  class="row-name">{{newName}}</span>
            <input v-else
                   class="text-input rename-input"
                   type="text"
                   v-model="newName"
                   ref="rename"
                   @keydown.enter="rename()">
        </div>
        <div class="list-item"
             style="position: relative; width: 85px">
            <a class="list-button em-button"
               @click="listOptionsActive = !listOptionsActive">
                <i class="extended-menu-icon" />
            </a>
            <div v-show="listOptionsActive"
                 class="option-list-display list-options">
                <a class="option-item">
                    <i class="info" />
                    <span>Info</span>
                </a>
                <a class="option-item">
                    <i class="share" />
                    <span>Teilen</span>
                </a>
                <a class="option-item"
                   @click="renameActive = !renameActive; listOptionsActive = false">
                    <i class="edit" />
                    <span>Umbenennen</span>
                </a>
                <a class="option-item"
                   onclick="//rar download ?">
                    <i class="download" />
                    <span>Herunterladen</span>
                </a>
                <a class="option-item">
                    <i class="remove" />
                    <span>Löschen</span>
                </a>
            </div>
        </div>
        <div class="list-item"
             style="width: 100px">
            <i v-if="scanStatus == 0"
               class="status-icon-accepted" />
            <i v-if="scanStatus == 1"
               class="status-icon-progress" />
            <i v-if="scanStatus == 2"
               class="status-icon-attention" />
        </div>
        <div class="list-item"
             style="width: 100px">
            <span>{{size | toUnit}}</span>
        </div>
        <div class="list-item"
             style="width: 125px">
            <span>{{timestamp | toDatetime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newName: '',
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
        timestamp: {
            required: true
        },
        path: {
            type: String
        }
    },
    mounted() {
        this.newName = this.name
    },
    methods: {
        rename() {
            this.$nextTick(() => {
                this.renameActive = false
            })
        },
        click() {
            if (this.type === 'Directory') {
                this.$router.push({ name: 'overview-dir', params: { dir: this.path } })
            }
        }
    },
    watch: {
        renameActive() {
            if (this.renameActive) {
                this.$nextTick(() => {
                    this.$refs.rename.focus()
                    this.$refs.rename.setSelectionRange(0, this.name.length)
                })
            }
        }
    }
}
</script>

<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
