/**
 * This plugin create an axios HTTP client to do request.
 * It handles tokens too to acess to private routes on API.
 */

import Vue from 'vue'
import axios from 'axios'
import { get as getCookie, set as setCookie } from 'js-cookie'

export default {
    beforeCreate(context) {
        const { error, req } = context

        // Create axios client
        const http = axios.create({
            baseURL: process.env.VUE_APP_API_URL
        })

        // Use request interceptors
        http.interceptors.request.use(config => {
            let xToken = undefined
            let xRefreshToken = undefined

            // Get current token in cookies
            if (process.server) {
                if (req.cookies) {
                    xToken = req.cookies['x-token-c']
                    xRefreshToken = req.cookies['x-refresh-token-c']
                }
            } else {
                xToken = getCookie('x-token-c')
                xRefreshToken = getCookie('x-refresh-token-c')
            }

            // If token: add header
            if (xToken && xRefreshToken) {
                config.headers['x-token'] = xToken
                config.headers['x-refresh-token'] = xRefreshToken
            }

            return config
        })

        // Use response interceptor
        http.interceptors.response.use(
            response => {
                let xToken = response.headers['x-token']
                let xRefreshToken = response.headers['x-refresh-s-token'] || response.headers['x-refresh-l-token']

                if (xToken) {
                    setCookie('x-token-c', xToken)
                }

                if (xRefreshToken) {
                    setCookie('x-refresh-token-c', xRefreshToken)
                }

                return response
            },
            err => {
                if (err.response) {
                    const { data } = err.response
                    // Catch error and use UVue error handler plugin to display it
                    return error(data.error || 'Oups!', err.response.status)
                }
                return Promise.reject(err)
            }
        )

        // Install a shortcut to http client in context
        context.http = http

        // With this we can call http client everywhere in components or Vuex actions
        Vue.use({
            install(Vue) {
                Vue.http = Vue.prototype.$http = http
            }
        })
    }
}
