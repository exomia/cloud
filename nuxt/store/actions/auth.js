export const AuthActions = {
    async checkAuth(vuexContext, { req }) {
        console.log(req)
        //context.store.dispatch('loginUser', req.store.state)
    },
    async loginUser(vuexContext, { username, password, stayLoggedIn }) {
        if (username && password) {
            let { data } = await this.$axios.post('/v1/auth/login', { username, password, stayLoggedIn })
            console.log(data)
            if (data && !data.error) {
                vuexContext.commit('setAuthUser', data)
                this.app.router.push('/overview')
            }
        }
    }
}
