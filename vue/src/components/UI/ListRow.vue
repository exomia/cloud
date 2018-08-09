<template>
    <div class="list-row list-row-hover"
         @click.prevent.stop="click">
        <!-- File/Directory -->
        <div class="list-item justify-center"
             style="width: 50px">
            <input type="checkbox"
                   style="display: none"
                   @click.stop
                   v-model="checked">
        </div>
        <!-- Type -->
        <div class="list-item justify-start"
             style="width: 100px">
            <i v-if="type === 'Directory'"
               class="directory-icon" />
            <i v-if="type === 'File'"
               class="file-icon" />
        </div>
        <!-- Name -->
        <div class="list-item space-between"
             style="width: calc(100vw - 605px - 50px)">
            <!-- Rename / New Directory -->
            <input v-if="inputActive"
                   class="text-input"
                   type="text"
                   v-model="newName"
                   ref="input"
                   @click.prevent.stop
                   @blur="rename()"
                   @keydown.enter="rename()">
            <template v-else>
                <div>
                    <span>{{newName}}</span>
                    <span class="extension">{{extension}}</span>
                </div>
            </template>
            <template>
                <i v-if="scanStatus == 1"
                   class="status-icon-process" />
                <i v-if="scanStatus == 2"
                   class="status-icon-detected" />
            </template>
        </div>
        <!-- Extended menu button -->
        <div class="list-item"
             style="width: 100px">
            <a class="list-button em-button"
               @click.stop="floatingMenuActive = !floatingMenuActive">
                <i class="extended-menu-icon" />
            </a>
            <floating-menu v-if="floatingMenuActive"
                           class="row-settings"
                           :items="floatingMenuItems"
                           @clicked="floatingMenuActive = false"
                           @info="info()"
                           @share="share()"
                           @rename="inputActive = !inputActive"
                           @download="download()"
                           @remove="remove()"></floating-menu>
        </div>
        <!-- Size -->
        <div class="list-item"
             style="width: 100px">
            <span v-if="size > 0">{{size | toUnit}}</span>
        </div>
        <!-- Timestamp -->
        <div class="list-item"
             style="width: 100px">
            <span>{{timestamp | toDatetime}}</span>
        </div>
    </div>
</template>

<script>
import FloatingMenu from '@/components/UI/FloatingMenu.vue'

export default {
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
            default: 'File'
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
        FloatingMenu
    },
    data() {
        return {
            newName: '',
            inputActive: false,
            checked: false,
            floatingMenuActive: false,
            floatingMenuItems: [
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
                    params: { dir: this.uuid }
                })
            } else if (this.type === 'File') {
                /* Starts file download */
                //TODO: test if still working out of dev mode (api no auth check)
                const downloadFrame = document.createElement('iframe')
                downloadFrame.style = 'display: none;'
                downloadFrame.src = `${process.env.API_URL}/v1/file/${this.uuid}`
                document.querySelector('body').appendChild(downloadFrame)
                setTimeout(() => document.querySelector('body').removeChild(downloadFrame), 1000)
            }
        },
        focusInput() {
            this.inputActive = true
            this.$nextTick(() => {
                this.$refs.input.focus()
                if (this.name && this.name.length) {
                    this.$refs.input.setSelectionRange(0, this.name.length)
                }
            })
        },
        info() {
            /** Function is not implemented yet */
            console.log('Show info')
        },
        share() {
            /** Function is not implemented yet */
            console.log('Share')
        },
        rename() {
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
                    const res = await this.$axios.$put(
                        `/v1/directory/${this.$store.getters.currentDirectoryUuid}`,
                        {
                            name: this.newName
                        }
                    )

                    /* Add directory if no error occoured */
                    if (!res.error) {
                        this.$store.commit('addDirectory', res.directory)
                    }
                } else if (!this.isNewDirectory) {
                    this.inputActive = false
                    /* Early return when name is invalid */
                    if (!this.newName || this.newName === this.name) {
                        this.newName = this.name
                        return
                    }

                    if (this.type === 'Directory') {
                        this.$axios.$post(`/v1/directory/${this.uuid}/rename`, {
                            new_name: this.newName
                        })
                    } else if (this.type === 'File') {
                        this.$axios.$post(`/v1/file/${this.uuid}/rename`, {
                            new_name: this.newName
                        })
                    }
                }
            })
        },
        download() {},
        remove() {}
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

<style src="@/assets/css/components/UI/Row" lang="scss" scoped>
</style>
