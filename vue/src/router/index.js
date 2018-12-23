import Vue from 'vue'
import Router from 'vue-router'

/* Views */
import Home from '@/views/home/'
import resetPassword from '@/views/resetPassword/'

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
                component: Home,
                meta: {
                    middlewares: [authRedirect]
                }
            },
            {
                path: '/trash',
                name: 'trash',
                meta: {
                    middlewares: [checkAuth]
                }
            },
            /* Password Reset */
            {
                path: '/resetPassword/:token',
                name: 'resetPassword',
                component: resetPassword
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
