export const state = () => ({
    user: {
        name: '',
        email: '',
        flags: 0,
        volume: 123456,
        usedVolume: 123456
    }
})

export const getters = {
    userAuthData: state => {},
    volume: state => state.user.volume,
    usedVolume: state => state.user.usedVolume
}

export const mutations = {
    setAuthUser(state, { name, email, flags, volume, usedVolume }) {
        state.user.name = name || ''
        state.user.email = email || ''
        state.user.flags = Number(flags) || 0
        state.user.volume = Number(volume) || 0
        state.user.usedVolume = Number(usedVolume) || 0
    }
}
