import { CancelToken } from "axios"

export const state = () => ({
    canceled: false,
    active: false,
    fileInfos: [],
    currentFileName: "",
    currentFileRate: 0,
})

export const getters = {
    uploadFilename: state => state.currentFileName,
    uploadActive: state => state.active,
    uploadSize: state => {
        let mx = 0
        state.fileInfos.forEach(f => {
            mx += f.file.size
        })
        return mx
    },
    uploadProgress: state => {
        if (state.fileInfos) {
            let sum = 0
            state.fileInfos.forEach(f => {
                sum += f.progress
            })
            return sum / state.fileInfos.length
        }
        return 0
    },
    uploadFileCount: state => state.fileInfos.length,
    uploadRate: state => state.currentFileRate,
}

export const mutations = {
    cancelUpload(state, reset = false) {
        state.canceled = !reset
    },
    addFileInfo(state, file) {
        let fi = {
            file,
            progress: 0,
            start: 0,
            _cancelTokenSource: CancelToken.source(),
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
    },
}

// export const actions = {
//     async startFileUpload({ commit, state, getters }, dataTransfer) {
//         //TODO: Ask api if file already exsists

//         // Return when no dataTransfer is given
//         if (!dataTransfer) {
//             return
//         }

//         // Adds file to upload list
//         for (const file of dataTransfer.files) {
//             commit('addFileInfo', file)
//         }

//         // Checks if queue is already in progress
//         if (state.active === false) {
//             state.active = true

//             // Starts the upload
//             for (let i = 0; i < state.fileInfos.length; i++) {
//                 let fi = state.fileInfos[i]

//                 // Creates form data & appends file
//                 const fd = new FormData()
//                 fd.append('upload-file', fi.file)

//                 // Axios config
//                 const config = {
//                     onUploadProgress: ({ loaded, total }) => {
//                         // Check if action got canceled
//                         if (state.canceled) {
//                             fi.cancel('Canceled via cancel button')
//                         }

//                         fi.progress = loaded / total
//                         commit('setCurrentFileRate', (loaded / (Date.now() - fi.start)) * 1000)
//                     },
//                     cancelToken: fi._cancelTokenSource.token
//                 }

//                 // Sets file to upload and writes the filename to display
//                 commit('setCurrentFileName', fi.file.name)

//                 try {
//                     // Set upload start time
//                     fi.start = Date.now()

//                     // Start uploading to server
//                     const res = await this.$axios.$put(`/v1/file/${getters.currentDirectoryUuid}`, fd, config)

//                     if (res.error) {
//                         console.error(res.error)
//                     }

//                     if (!res.error && res.file) {
//                         commit('addFile', res.file)
//                     }
//                 } catch (e) {
//                     console.error(e)
//                     break
//                 }
//             }

//             // Sets upload action to inactive
//             state.active = false

//             // Clear file array
//             commit('resetFileInfos')

//             // Reset cancel action
//             commit('cancelUpload', true)
//         }
//     }
// }
