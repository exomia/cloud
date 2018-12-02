/**
 * Server plugin to install middlewares on server to create
 * and API
 */
import expressApi from './index'

export default {
    install(app) {
        expressApi(app)
    },
}
