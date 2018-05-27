import cookieparser from 'cookieparser'

export const state = () => ({
    auth: {
        token: null
    }
})

export const getters = {
    isAuthenticated: state => Boolean(state.auth.token)
}

export const mutations = {
    authenticate(state, token) {
        state.auth.token = token
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let token = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            token = JSON.parse(parsed.auth)
        }
        commit('authenticate', token)
    }
}
