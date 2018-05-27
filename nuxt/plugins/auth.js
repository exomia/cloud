import Vue from 'vue'

const Auth = {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                if (typeof this.$options.__proto__.auth !== 'undefined') {
                    // When auth is required
                    if (this.$options.__proto__.auth === true) {
                        // Redirect when user is not authenticated
                        if (!this.$store.getters.isAuthenticated) {
                            console.log('NOT AUTHENTICATED')
                            //this.$router.history.push('/')
                        }
                    }
                }
            }
        })
    }
}

Vue.use(Auth)
