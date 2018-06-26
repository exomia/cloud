export const state = () => ({
    data: [],
    path: [],
    subDirectoryCount: 20,
    subFileCount: 500,
    followingDirectories: 20,
    followingFiles: 500,
    sizeSum: 1303376534034,
    createDirectoryShown: false,
    checkAll: false
})

export const getters = {
    isDirectoryEmpty: state => !state.data.length,
    getDirectoryData: state => state.data,
    followingDirectories: state => state.followingDirectories,
    followingFiles: state => state.followingFiles,
    sizeSum: state => state.sizeSum,
    path: state => state.path,
    currentDirectoryId: state => {
        if (!state.path || !state.path.length) {
            return null
        }
        return state.path[state.path.length - 1].id || null
    },
    isCreateDirectoryShown: state => state.createDirectoryShown,
    isCheckAll: state => state.checkAll
}

export const mutations = {
    addFile(state, file) {
        state.data.push({ ...file, size: file.size || 0, type: 'File', checked: false })
    },
    addDirectory(state, directory) {
        state.data.push({ ...directory, size: directory.size || 0, type: 'Directory', checked: false })
    },
    setDirectoryData(state, { directories, files, path_info }) {
        directories.forEach(e => {
            this.commit('addDirectory', e)
        })
        files.forEach(e => {
            this.commit('addFile', e)
        })
        state.path = path_info
    },
    resetDirectoryData(state) {
        state.data = []
    },
    setCreateDirectoryShown(state, shown) {
        state.createDirectoryShown = shown
    },
    checkAll(state, checked) {
        state.checkAll = checked
    },
    sortByX(state, { val, desc = true }) {
        state.data.sort((a, b) => {
            const sort = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare(a[val], b[val])
            return desc ? sort : sort * -1
        })
    }
}

export const actions = {
    async setDirectoryData({ commit }, directory_id) {
        const res = await this.$axios.$post(`/v1/directory`, { directory_id })
        if (res) {
            await commit('resetDirectoryData')
            await commit('setDirectoryData', res)
        }
    }
}
