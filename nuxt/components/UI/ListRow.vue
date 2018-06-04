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
                   @blur="rename()"
                   @keydown.enter="rename()">
        </div>
        <div class="list-item"
             style="position: relative; width: 85px">
            <a class="list-button em-button"
               @click.stop="listOptionsActive = !listOptionsActive">
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
                   @click.stop="renameActive = !renameActive; listOptionsActive = false">
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
        id: {
            type: String,
            required: true
        },
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
        }
    },
    mounted() {
        this.newName = this.name
    },
    methods: {
        rename() {
            this.$nextTick(() => {
                this.renameActive = false
                /* Early return when name is invalid */
                if (!this.newName) {
                    this.newName = this.name
                    return
                }

                if (this.type === 'Directory') {
                    this.$axios.$post('/v1/directory/rename', {
                        directory_id: this.id,
                        new_name: this.newName
                    })
                } else if (this.type === 'File') {
                    this.$axios.$post('/v1/file/rename', {
                        file_id: this.id,
                        new_name: this.newName
                    })
                }
            })
        },
        click() {
            if (this.type === 'Directory') {
                this.$router.push({ name: 'overview-dir', params: { dir: this.id } })
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
