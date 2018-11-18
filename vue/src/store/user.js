export const state = () => ({
    email: '',
    flags: 0,
    volume: 0,
    usedVolume: 0
})

export const getters = {
    isAuthenticated: state => {
        return !!state.email
    },
    userAuthData: state => { },
    volume: state => state.volume,
    usedVolume: state => state.usedVolume
}

export const mutations = {
    setAuthUser(state, {
        email = '',
        scopes = {},
        volume = 0,
        usedVolume = 0
    }) {
        state.email = email
        state.scopes = scopes
        state.volume = Number(volume)
        state.usedVolume = Number(usedVolume)
    }
}

export const actions = {
    async onHttpRequest({ commit }, { http }) {
        const { data } = await http.get("/v1/auth");

        // If user is authenticated
        if (!data.error) {
            commit('setAuthUser', data);
        }
    },
}
