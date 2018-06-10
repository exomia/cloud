import cookieparser from 'cookieparser'

export const state = () => ({
    token: null
})

export const getters = {
    isAuthenticated: state => Boolean(state.token)
}

export const mutations = {
    authenticate(state, token) {
        state.token = token
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
    },
    async loginUser(vuexContext, { username, password, stayLoggedIn }) {
        // Check if login would be valid
        if (username && password) {
            const res = await this.$axios.$post('/v1/auth/login', { username, password })
            //console.log(res)
        }
    }
}
