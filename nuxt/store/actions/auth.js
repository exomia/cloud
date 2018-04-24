export const AuthActions = {
    async checkAuth(vuexContext) {
        let { data } = await this.$axios.get('/v1/auth')
        console.log(data)
    },
    async loginUser(vuexContext, { username, password, stayLoggedIn }) {
        if (username && password) {
            let { data } = await this.$axios.post('/v1/auth/login', { username, password, stayLoggedIn })
            if (data && !data.error) {
                vuexContext.commit('setAuthUser', data)
                this.app.router.push('/overview')
            }
        }
    }
}
