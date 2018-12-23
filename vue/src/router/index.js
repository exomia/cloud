import Vue from 'vue'
import Router from 'vue-router'

/* Middleware */
import checkAuth from '@/middlewares/checkAuth'
import authRedirect from '@/middlewares/authRedirect'

Vue.use(Router)

export default () => {
    return new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/home/'),
                meta: {
                    middlewares: [authRedirect]
                }
            },
            /* Password Reset */
            {
                path: '/resetPassword/:token',
                name: 'resetPassword',
                component: () => import(/* webpackChunkName: "home" */ '@/views/resetPassword/'),
                meta: {
                    middlewares: [authRedirect]
                }
            },
            /* Overview */
            {
                path: '/overview/:dir?',
                name: 'overview-dir',
                component: () => import('@/views/_overview/'),
                meta: {
                    middlewares: [checkAuth]
                }
            },
            /* Legal */
            {
                path: '/imprint',
                name: 'imprint',
                component: () => import(/* webpackChunkName: "legal" */ '@/views/imprint/')
            },
            {
                path: '/privacy',
                name: 'privacy',
                component: () => import(/* webpackChunkName: "legal" */ '@/views/privacy/')
            }
        ]
    })
}
