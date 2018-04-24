export const UserGetters = {
    isAuthenticated: state => Boolean(state.user.email),
    userAuthData: state => {},
    volume: state => state.user.volume,
    usedVolume: state => state.user.usedVolume
}
