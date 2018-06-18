// Type 0 = Upload | Type 1 = Download

import { CancelToken } from 'axios'

export const state = () => ({
    canceled: false,
    active: false,
    type: 0,
    fileInfos: [],
    currentFileName: '',
    currentFileRate: 0
})

export const getters = {
    exchangeFilename: state => state.currentFileName,
    exchangeActive: state => state.active,
    exchangeType: state => state.type,
    exchangeTypeName: state => (state.type === 1 ? 'download' : 'upload'),
    exchangeSize: state => {
        let mx = 0
        state.fileInfos.forEach(f => {
            mx += f.file.size
        })
        return mx
    },
    exchangeProgress: state => {
        if (state.fileInfos) {
            let sum = 0
            state.fileInfos.forEach(f => {
                sum += f.progress
            })
            return sum / state.fileInfos.length
        }
        return 0
    },
    exchangeFileCount: state => state.fileInfos.length,
    exchangeRate: state => state.currentFileRate
}

export const mutations = {
    cancelExchange(state, reset = false) {
        if (reset) {
            state.canceled = false
        } else {
            state.canceled = true
        }
    },
    setExchangeType(state, isDownload) {
        if (isDownload === 1 || isDownload === 0) {
            state.type = isDownload
        } else {
            throw new Error(`Unknown exchange type: ${isDownload}`)
        }
    },
    addFileInfo(state, file) {
        let fi = {
            file,
            status: undefined,
            progress: 0,
            start: 0,
            _cancelTokenSource: CancelToken.source()
        }
        fi.cancel = msg => {
            fi._cancelTokenSource.cancel(msg)
        }
        state.fileInfos.push(fi)
    },
    resetFileInfos(state) {
        state.fileInfos = []
    },
    setCurrentFileName(state, name) {
        state.currentFileName = name
    },
    setCurrentFileRate(state, rate) {
        state.currentFileRate = rate
    }
}

export const actions = {
    async startFileUpload({ commit, state, getters }, dataTransfer) {
        // When action is already running and the exchangeType
        // is not set to upload return to prevent interruption
        if (state.active === true && getters.exchangeType !== 0) {
            return
        }

        // Return when no dataTransfer is given
        if (!dataTransfer) {
            return
        }

        // Sets exchange type to upload
        commit('setExchangeType', 0)

        // Adds file to upload list
        for (const file of dataTransfer.files) {
            commit('addFileInfo', file)
        }

        // Checks if queue is already in progress
        if (state.active === false) {
            state.active = true

            // Starts the upload
            for (let i = 0; i < state.fileInfos.length; i++) {
                let fi = state.fileInfos[i]

                // Continue when file was already uploaded (should never happen)
                if (fi.status === 'done') {
                    continue
                }

                // Creates form data & appends file
                const fd = new FormData()
                fd.append('upload-file', fi.file)

                // Axios config
                const config = {
                    onUploadProgress: ({ loaded, total }) => {
                        // Check if action got canceled
                        if (state.canceled) {
                            fi.cancel('Canceled via cancel button')
                        }

                        fi.progress = loaded / total
                        commit('setCurrentFileRate', (loaded / (Date.now() - fi.start)) * 1000)
                    },
                    cancelToken: fi._cancelTokenSource.token
                }

                // Sets file to upload and writes the filename to display
                fi.status = 'uploading'
                commit('setCurrentFileName', fi.file.name)

                try {
                    // Set upload start time
                    fi.start = Date.now()

                    // Start uploading to server
                    const res = await this.$axios.$post(`/v1/file/upload/${this.currentDirectoryId || ''}`, fd, config)

                    if (res.error) {
                        console.log(res.error)
                    }

                    if (!res.error && res.file) {
                        commit('addFile', res.file)
                    }

                    // Catch error !here!

                    fi.status = 'done'
                } catch (e) {
                    console.error(e)
                    break
                }
            }

            // Sets upload action to inactive
            state.active = false

            // Clear file array
            commit('resetFileInfos')

            // Reset cancel action
            commit('cancelExchange', true)
        }
    }
}
