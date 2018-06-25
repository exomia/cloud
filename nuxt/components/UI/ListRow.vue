<template>
    <div class="list-row list-row-hover"
         @click.prevent.stop="click">
        <!-- File/Directory -->
        <div class="list-item"
             style="width: 100px">
            <input type="checkbox"
                   class="checkbox"
                   style="opacity: 0"
                   v-model="checked">
            <i v-if="type === 'Directory'"
               class="directory-icon" />
            <i v-if="type === 'File'"
               class="file-icon" />
        </div>
        <!-- Name -->
        <div class="list-item"
             style="width: calc(100% - 510px)">
            <!-- Rename / New Directory -->
            <input v-if="inputActive"
                   class="text-input"
                   type="text"
                   v-model="newName"
                   ref="input"
                   @click.prevent.stop
                   @blur="setName()"
                   @keydown.enter="setName()">
            <span v-else
                  class="row-name">{{newName}}</span>
        </div>
        <!-- Extended menu button -->
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
                   @click.stop="inputActive = !inputActive; listOptionsActive = false">
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
        <!-- Clamav -->
        <div class="list-item"
             style="width: 100px">
            <i v-if="scanStatus == 0"
               class="status-icon-accepted" />
            <i v-if="scanStatus == 1"
               class="status-icon-progress" />
            <i v-if="scanStatus == 2"
               class="status-icon-attention" />
        </div>
        <!-- Size -->
        <div class="list-item"
             style="width: 100px">
            <span>{{size | toUnit}}</span>
        </div>
        <!-- Timestamp -->
        <div class="list-item"
             style="width: 125px">
            <span>{{timestamp | toDatetime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
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
        isNewDirectory: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newName: '',
            inputActive: false,
            listOptionsActive: false,
            checked: false
        }
    },
    mounted() {
        this.newName = this.name
        if (this.isNewDirectory) {
            this.focusInput()
        }
    },
    methods: {
        click() {
            if (this.type === 'Directory') {
                /* Open directory */
                $nuxt.$router.push({
                    name: `overview-dir___${this.$i18n.locale}`,
                    params: { dir: this.id }
                })
            } else if (this.type === 'File') {
                // const source = CancelToken.source()
                // const config = {
                //     onDownloadProgress: function(event) {
                //         var percentCompleted = Math.round(event.loaded * 100 / event.total)
                //         console.log('download', percentCompleted)
                //         //if (percentCompleted > 50) source.cancel('download canceled by user')
                //     },
                //     cancelToken: source.token
                // }
                // this.$axios
                //     .$post(
                //         '/v1/file/download',
                //         {
                //             file_id: this.id
                //         },
                //         config
                //     )
                //     .then(result => {
                //         if (result.error) {
                //             console.error(result.error)
                //             return
                //         }
                //         let byteCharacters = atob(result.file.data)
                //         let byteArrays = []
                //         for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                //             let slice = byteCharacters.slice(offset, offset + 512)
                //             const byteNumbers = new Array(slice.length)
                //             for (let i = 0; i < slice.length; i++) {
                //                 byteNumbers[i] = slice.charCodeAt(i)
                //             }
                //             byteArrays.push(new Uint8Array(byteNumbers))
                //         }
                //         const link = document.createElement('a')
                //         link.href = window.URL.createObjectURL(new Blob(byteArrays, { type: result.file.mimetype }))
                //         link.setAttribute('download', result.file.name)
                //         link.click()
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            }
        },
        setName() {
            this.$nextTick(async () => {
                /* Create new Directory */
                if (this.isNewDirectory) {
                    /* If create directory is hidden */
                    if (!this.isCreateDirectoryShown) {
                        return
                    }

                    /* Check if input was filled */
                    if (!this.newName) {
                        return
                    }

                    /* Hide create directory row */
                    this.$store.commit('setCreateDirectoryShown', false)

                    /* Send new directory name to server */
                    const res = await this.$axios.$post('/v1/directory/add', {
                        name: this.newName,
                        parent_directory_id: this.$route.params.dir || ''
                    })

                    /* Add directory if no error occoured */
                    if (!res.error) {
                        this.$store.commit('addDirectory', res)
                    }
                } else if (!this.isNewDirectory) {
                    this.inputActive = false
                    /* Early return when name is invalid */
                    if (!this.newName || this.newName === this.name) {
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
                }
            })
        },
        focusInput() {
            this.inputActive = true
            this.$nextTick(() => {
                this.$refs.input.focus()
                if (this.name && this.name.length) {
                    this.$refs.input.setSelectionRange(0, this.name.length)
                }
            })
        }
    },
    computed: {
        directories: function() {
            return this.$store.getters.directories
        },
        isCreateDirectoryShown: function() {
            return this.$store.getters.isCreateDirectoryShown
        },
        isCheckAll: function() {
            return this.$store.getters.isCheckAll
        }
    },
    watch: {
        inputActive() {
            if (this.inputActive) {
                this.focusInput()
            }
        },
        isCheckAll: function() {
            this.checked = this.isCheckAll
        }
    }
}
</script>

<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>

<style src="~/assets/css/components/extras/FloatingMenu.scss" lang="scss" scoped>
</style>
