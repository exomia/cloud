export const state = () => ({
    directories: [],
    files: [],
    path: [],
    subDirectoryCount: 20,
    subFileCount: 500,
    followingDirectories: 20,
    followingFiles: 500,
    sizeSum: 1303376534034
})

export const getters = {
    isDirectoryEmpty: state => !state.directories.length && !state.files.length,
    directories: state => state.directories,
    files: state => state.files,
    followingDirectories: state => state.followingDirectories,
    followingFiles: state => state.followingFiles,
    sizeSum: state => state.sizeSum,
    path: state => state.path
}

export const mutations = {
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
    }
}

export const actions = {
    async setDirectories({ commit }, directory_id) {
        const res = await this.$axios.$get(`/v1/directory/${directory_id || ''}`)
        if (res) {
            await commit('setDirectories', res)
        }
    }
}
