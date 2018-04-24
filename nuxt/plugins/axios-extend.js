export default function({ $axios, redirect, store }) {
    $axios.setHeader('Content-Type', 'application/json', ['post', 'get', 'put', 'patch', 'delete'])
    $axios.onRequest(config => {
        const t = localStorage.getItem('x-token')
        if (t) {
            $axios.setHeader('x-token', t)
        }
        const rt = localStorage.getItem('x-refresh-token') || sessionStorage.getItem('x-refresh-token')
        if (rt) {
            $axios.setHeader('x-refresh-token', t)
        }
        console.log('Making request to ' + config.url, config.headers)
    })
    $axios.onResponse(({ headers }) => {
        if (headers['x-token']) {
            localStorage.setItem('x-token', headers['x-token'])
        }
        if (headers['x-refresh-l-token']) {
            localStorage.setItem('x-refresh-token', headers['x-refresh-l-token'])
        } else if (headers['x-refresh-s-token']) {
            sessionStorage.setItem('x-refresh-token', headers['x-refresh-s-token'])
        }
    })

    $axios.onError(error => {
        console.error(error)
    })
    $axios.onRequestError(error => {
        console.error(error)
    })
    $axios.onResponseError(error => {
        console.error(error)
    })
    //if page needs authcheck do this
    store.dispatch('checkAuth')
}
