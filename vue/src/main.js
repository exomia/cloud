import Vue from "vue"
import App from "./App.vue"

import createRouter from "./router"
import createStore from "./store"
import createI18n from "./i18n"
import "./registerServiceWorker"
import VueMeta from "vue-meta"

Vue.config.productionTip = false

Vue.use(VueMeta, {
    keyName: "head",
})

export default () => {
    const store = createStore()
    const router = createRouter()
    const i18n = createI18n()
    return new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    })
}
