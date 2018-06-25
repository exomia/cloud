export const state = () => ({
    directories: [],
    files: [],
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
    //rewrite because it does not work like that anymore
    isDirectoryEmpty: state => !(state.directories || state.files),
    directories: state => state.directories,
    files: state => state.files,
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
        state.files.push({ ...file, checked: false })
    },
    addDirectory(state, { directory }) {
        state.directories.push({ ...directory, checked: false })
    },
    setDirectories(state, { directories, files, path_info }) {
        state.directories = directories
        state.files = files
        state.path = path_info
    },
    setAuthUser(state, { name, email, flags, volume, usedVolume }) {
        state.user.name = name || ''
        state.user.email = email || ''
        state.user.flags = Number(flags) || 0
        state.user.volume = Number(volume) || 0
        state.user.usedVolume = Number(usedVolume) || 0
    },
    setCreateDirectoryShown(state, shown) {
        state.createDirectoryShown = shown
    },
    checkAll(state, checked) {
        state.checkAll = checked
    }
}

export const actions = {
    async setDirectories({ commit }, directory_id) {
        const res = await this.$axios.$post(`/v1/directory`, { directory_id })
        if (res) {
            await commit('setDirectories', res)
        }
    }
}
