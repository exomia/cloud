export default async ({ store: { commit }, redirect, http }) => {
    try {
        const { data } = await http.get('/v1/auth')
        if (!data.error) {
            return commit('setUserInfo', data)
        }
    } catch {
        /* IGNORE */
    }
    redirect({ name: 'home' })
}
