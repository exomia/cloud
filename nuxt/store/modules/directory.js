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
    currentDirectoryUuid: state => {
        if (!state.path || !state.path.length) {
            return null
        }
        return state.path[state.path.length - 1].uuid
    },
    isCreateDirectoryShown: state => state.createDirectoryShown,
    isCheckAll: state => state.checkAll,
    getDirectoryCount: state => state.directoryCount,
    getFileCount: state => state.fileCount
}

export const mutations = {
    addFile(state, file) {
        state.data.push({
            ...file,
            size: file.size || 0,
            type: 'File',
            checked: false
        })
        this.commit('updateDirectorySummary')
        this.commit('sortByActiveMethod')
    },
    addDirectory(state, directory) {
        state.data.push({
            ...directory,
            size: directory.size || 0,
            type: 'Directory',
            checked: false
        })
        this.commit('updateDirectorySummary')
        this.commit('sortByActiveMethod')
    },
    setDirectoryData(state, { directories, files, path_info }) {
        for (let e in directories) {
            this.commit('addDirectory', directories[e])
        }
        for (let e in files) {
            this.commit('addFile', files[e])
        }
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
            return desc ? sort * -1 : sort
        })
        /* Switch on type Directory/File */
        if (val === 'type') {
            state.data.reverse()
        }
    },
    updateDirectorySummary(state) {
        /* Size Sum */
        let sum = 0
        for (let e of state.data) {
            sum += e.size * 1
        }
        state.sizeSum = sum
        /* Directory Count */
        state.directoryCount = state.data.filter(e => e.type === 'Directory').length
        /* File Count */
        state.fileCount = state.data.filter(e => e.type === 'File').length
    }
}

export const actions = {
    async setDirectoryData({ commit }, directory_uuid = null) {
        const res = await this.$axios.$get(`/v1/directory/${directory_uuid || ''}`)
        if (res) {
            await commit('resetDirectoryData')
            await commit('setDirectoryData', res)
        }
    }
}
