/**
 * Just clear current error on route change
 */
export default {
    beforeStart({ router, error }) {
        router.beforeEach(next => {
            error.clear()
            next()
        })
    }
}
