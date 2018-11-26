/**
 * This plugin create an axios HTTP client to do request.
 * It handles tokens too to acess to private routes on API.
 */

import Vue from "vue"
import axios from "axios"
import { get as getCookie, set as setCookie } from "js-cookie"

export default {
    beforeCreate(context) {
        const { error, req } = context

        // Create axios client
        const http = axios.create({
            //baseURL: process.client ? '/' : process.env.VUE_APP_API_URL,
            baseURL: process.env.VUE_APP_API_URL,
        })

        // Use request interceptors
        http.interceptors.request.use(config => {
            let xToken = undefined
            let xRefreshToken = undefined

            // Get current token in cookies
            if (process.server) {
                if (req.cookies) {
                    xToken = req.cookies["x-token"]
                    xRefreshToken = req.cookies["x-refresh-token"]
                }
            } else {
                xToken = getCookie("x-token")
                xRefreshToken = getCookie("x-refresh-token")
            }

            // If token: add header
            if (xToken && xRefreshToken) {
                config.headers["x-token"] = xToken
                config.headers["x-refresh-token"] = xRefreshToken
            }

            return config
        })

        // Use response interceptor
        http.interceptors.response.use(
            response => {
                let xToken = response.headers["x-token"]
                let xRefreshToken = response.headers["x-refresh-token"]

                if (xToken) {
                    setCookie("x-token", xToken)
                }

                if (xRefreshToken) {
                    setCookie("x-refresh-token", xRefreshToken)
                }

                return response
            },
            err => {
                if (err.response) {
                    const { data, status } = err.response
                    return error(data.error, status)
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
            },
        })
    },
}
