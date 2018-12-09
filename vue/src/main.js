import Vue from 'vue'
import App from './App.vue'

import createRouter from './router/'
import createStore from './store/'
import createI18n from './i18n/'
import VueMeta from 'vue-meta'
import './registerServiceWorker'

Vue.use(VueMeta)

Vue.config.productionTip = false

export default () => {
    const store = createStore()
    const router = createRouter()
    const i18n = createI18n()
    return new Vue({
        router,
        store,
        i18n,
        render: h => h(App)
    })
}
