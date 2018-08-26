import Vue from 'vue'

Vue.mixin({
    methods: {
        call: async function(url, data = {}, method = 'POST') {
            console.log(
                `[DEBUG] ${process.server ? 'SERVER' : 'CLIENT'} making request to ${
                    process.env.VUE_APP_API_URL
                }${url}`
            )
            return await fetch(`${process.env.VUE_APP_API_URL}${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': localStorage ? localStorage.getItem('x-token') : undefined,
                    'x-refresh-token': localStorage
                        ? localStorage.getItem('x-refresh-token') ||
                          sessionStorage.getItem('x-refresh-token')
                        : undefined
                },
                redirect: 'follow',
                mode: 'cors',
                body: JSON.stringify(data)
            })
                .then(handleResponse)
                .catch(handleError)
        }
    }
})
const COOKIE_LIFE_TIME = 7 * 24 * 60 * 60 * 1000

function handleResponse(res) {
    const xToken = res.headers.get('x-token')
    const xRefreshLToken = res.headers.get('x-refresh-l-token')
    const xRefreshSToken = res.headers.get('x-refresh-s-token')

    if (xToken) {
        if (localStorage) {
            localStorage.setItem('x-token', xToken)
        }
        setCookie('x-token-c', xToken)
    }
    if (xRefreshLToken) {
        if (localStorage) {
            localStorage.setItem('x-refresh-token', xRefreshLToken)
        }
        setCookie('x-refresh-token-c', xRefreshLToken, COOKIE_LIFE_TIME)
    } else if (xRefreshSToken) {
        if (sessionStorage) {
            sessionStorage.setItem('x-refresh-token', xRefreshSToken)
        }
        setCookie('x-refresh-token-c', xRefreshSToken)
    }
    return res.json()
}

function handleError(err) {
    console.error(err)
}

function setCookie(name, value, expire = false) {
    let expires = ''
    if (expire) {
        expires = 'expires=' + new Date(Date.now() + expire).toUTCString()
    }
    document.cookie = name + '=' + value + ';' + expires + ';path=/'
}
