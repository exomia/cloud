/**
 * Server plugin to install middlewares on server to create
 * and API
 */
import koaApi from './index'

export default {
    install(app) {
        koaApi(app)
    }
}
