import Vue from "vue"
import App from "./App.vue"

import createRouter from "./router"
import createStore from "./store"
import createI18n from "./i18n"

Vue.config.productionTip = false

// export default ({
//     router,
//     store
// }) => {
//     return new Vue({
//         router,
//         store,
//         i18n: createI18n(),
//         middlewares: [
//             async ctx => {
//                 console.log(ctx.router)
//             },
//         ],
//         render: h => h(App)
//     })
// }
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
