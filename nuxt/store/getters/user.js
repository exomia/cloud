export const UserGetters = {
  isAuthenticated: state => Boolean(state.user.token),
  usedVolume: state => state.user.usedVolume,
  maxVolume: state => state.user.maxVolume
}
