export const UserMutations = {
    setAuthUser(state, { name, email, flags, volume, usedVolume }) {
        state.user.name = name || ''
        state.user.email = email || ''
        state.user.flags = Number(flags) || 0
        state.user.volume = Number(volume) || 0
        state.user.usedVolume = Number(usedVolume) || 0
    }
}
