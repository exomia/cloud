export const state = () => ({
    directories: [],
    files: [],
    subDirectoryCount: 20,
    subFileCount: 500,
    followingDirectories: 20,
    followingFiles: 500,
    sizeSum: 1303376534034
})

export const getters = {
    directories: state => state.directories,
    files: state => state.files,
    followingDirectories: state => state.followingDirectories,
    followingFiles: state => state.followingFiles,
    sizeSum: state => state.sizeSum
}

export const mutations = {
    init(state, { directory_id, directories, files }) {
        state.directories = directories
        files.forEach(file => {
            state.files.push({ ...file, size: parseInt(file.size) })
        })
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
    async nuxtServerInit({ commit }) {
        const res = await this.$axios.$get('/v1/directory/')
        if (res) {
            commit('init', res)
        }
    }
}
