export const state = () => ({
    data: [],
    path: [],
    directoryCount: 0,
    fileCount: 0,
    sizeSum: 0,
    createDirectoryShown: false,
    checkAll: false
})

export const getters = {
    isDirectoryEmpty: state => !state.data.length,
    getDirectoryData: state => state.data,
    sizeSum: state => state.sizeSum,
    path: state => state.path,
    currentDirectoryId: state => {
        if (!state.path || !state.path.length) {
            return 'ROOT'
        }
        return state.path[state.path.length - 1].id || 'ROOT'
    },
    isCreateDirectoryShown: state => state.createDirectoryShown,
    isCheckAll: state => state.checkAll,
    getDirectoryCount: state => state.directoryCount,
    getFileCount: state => state.fileCount
}

export const mutations = {
    addFile(state, file) {
        state.data.push({ ...file, size: file.size || 0, type: 'File', checked: false })
        this.commit('updateDirectorySummary')
    },
    addDirectory(state, directory) {
        state.data.push({ ...directory, size: directory.size || 0, type: 'Directory', checked: false })
        this.commit('updateDirectorySummary')
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
    },
    updateDirectorySummary(state) {
        /* Size Sum */
        let sum = 0
        state.data.forEach(e => {
            sum += e.size
        })
        state.sizeSum = sum
        /* Directory Count */
        state.directoryCount = state.data.filter(e => e.type === 'Directory').length
        /* File Count */
        state.fileCount = state.data.filter(e => e.type === 'File').length
    }
}

export const actions = {
    async setDirectoryData({ commit }, directory_id = 'ROOT') {
        const res = await this.$axios.$get(`/v1/directory/${directory_id}`)
        if (res) {
            await commit('resetDirectoryData')
            await commit('setDirectoryData', res)
        }
    }
}
