import { remove as removeCookie } from 'js-cookie'

export default async ({ store: { commit }, http, route, redirect }) => {
    try {
        const { data } = await http.get('/v1/auth')
        if (!data.error) {
            return commit('setUserInfo', data)
        }
    } catch {
        /* IGNORE */
    }
    if (route.name !== 'home') {
        if (!process.server) {
            removeCookie('x-token')
            removeCookie('x-refresh-token')
        }
        return redirect({ name: 'home' })
    }
}
