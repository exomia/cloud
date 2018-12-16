export default {
    beforeCreate({ router }) {
        router.beforeEach((to, from, next) => {
            console.log('To: ' + to, 'From: ' + from)
            next()
        })
    }
}
