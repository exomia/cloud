/**
 * Server plugin to install middlewares on server to create
 * and API
 */
import setup from './lib/setup'

export default {
    async install(app) {
        // Running setup
        setup()

        // Dynamic import api
        const module = await import('./index')
        module.default(app)
    },
}
