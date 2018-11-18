import Vue from "vue"
import Router from "vue-router"

/* Views */
import Home from "@/views/home"

Vue.use(Router)

export default () => {
  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/trash",
        name: "trash",
        component: () => import("@/views/home")
      },
      /* Overview */
      {
        path: "/overview/:dir?",
        name: "overview-dir",
        component: () => import("@/views/overview/_dir/index")
      },
      /* Legal */
      {
        path: "/imprint",
        name: "imprint",
        component: () => import("@/views/imprint")
      },
      {
        path: "/privacy",
        name: "privacy",
        component: () => import("@/views/privacy")
      },
      /* Settings */
      // {
      //     path: '/settings',
      //     name: 'settings',
      //     component: () =>
      //         import('@/views/settings/index')
      // },
      // {
      //     path: '/settings/admin',
      //     name: 'settings-admin',
      //     component: () =>
      //         import('@/views/settings/admin/index')
      // },
      /**
       * 404 - Not found error page
       * Need to be the last defined route!
       */
      {
        path: "*",
        name: "not-found",
        component: () => import("@/views/error/404.vue"),
      }
    ]
  })
}
