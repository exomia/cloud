import Vue from 'vue'
import App from './App.vue'
import createI18n from './i18n'

Vue.config.productionTip = false

export default ({
    router,
    store
}) => {
    return new Vue({
        router,
        store,
        i18n: createI18n(),
        render: h => h(App)
    })
}
