import Router from 'vue-router'

/* Views */
import home from '@/views/home'
import overview from '@/views/overview/_dir/index'

export default () => {
    return new Router({
        mode: process.ssr ? 'history' : 'hash',
        routes: [{
                path: '/',
                name: 'home',
                component: home
            },
            {
                path: '/trash',
                name: 'trash',
                component: home
            },
            /* Overview */
            {
                path: '/:dir',
                name: 'overview-dir',
                component: overview
            },
            /* Legal */
            {
                path: '/imprint',
                name: 'imprint',
                component: () =>
                    import( /* webpackChunkName: "legal" */ '@/views/imprint')
            },
            {
                path: '/privacy',
                name: 'privacy',
                component: () =>
                    import( /* webpackChunkName: "legal" */ '@/views/privacy')
            },
            /* Settings */
            {
                path: '/settings',
                name: 'settings',
                component: () =>
                    import( /* webpackChunkName: "settings" */ '@/views/settings/index')
            },
            {
                path: '/settings/admin',
                name: 'settings-admin',
                component: () =>
                    import( /* webpackChunkName: "settings" */ '@/views/settings/admin/index')
            }
        ]
    })
}
