export const state = () => ({
    name: '',
    email: '',
    flags: 0,
    volume: 123456,
    usedVolume: 123456
})

export const getters = {
    userAuthData: state => {},
    volume: state => state.volume,
    usedVolume: state => state.usedVolume
}

export const mutations = {
    setAuthUser(state, { name, email, flags, volume, usedVolume }) {
        state.name = name || ''
        state.email = email || ''
        state.flags = Number(flags) || 0
        state.volume = Number(volume) || 0
        state.usedVolume = Number(usedVolume) || 0
    }
}
