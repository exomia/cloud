export const AuthActions = {
    async loginUser(vuexContext, { username, password, stayLoggedIn }) {
        if (username && password) {
            let { data } = await this.$axios.post('/v1/auth', { username, password, stayLoggedIn })
            if (data && !data.error) {
                vuexContext.commit('setAuthUser', data)
                this.app.router.push('/overview')
            }
        }
    }
}
