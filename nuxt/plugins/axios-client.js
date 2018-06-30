export default function({ req, res, $axios }) {
    $axios.onRequest(config => {
        console.log(process.server ? 'SERVER' : 'CLIENT', 'Making request to ' + config.url)

        const xToken = !process.server ? localStorage.getItem('x-token') : req.cookies['x-token-c']

        const xRefreshToken = !process.server
            ? localStorage.getItem('x-refresh-token') || sessionStorage.getItem('x-refresh-token')
            : req.cookies['x-refresh-token-c']

        if (xToken) {
            $axios.setHeader('x-token', xToken)
        }

        if (xRefreshToken) {
            $axios.setHeader('x-refresh-token', xRefreshToken)
        }
    })

    $axios.onResponse(response => {
        const xToken = response.headers['x-token']
        const xRefreshLToken = response.headers['x-refresh-l-token']
        const xRefreshSToken = response.headers['x-refresh-s-token']

        const xTokenC = response.headers['x-token-c']
        const xRefreshTokenC = response.headers['x-refresh-token-c']

        if (!process.server) {
            if (xToken) {
                if (localStorage) {
                    localStorage.setItem('x-token', xToken)
                }
            }
            if (xRefreshLToken) {
                if (localStorage) {
                    localStorage.setItem('x-refresh-token', xRefreshLToken)
                }
            } else if (xRefreshSToken) {
                if (sessionStorage) {
                    sessionStorage.setItem('x-refresh-token', xRefreshSToken)
                }
            }

            if (xTokenC) {
                document.cookie = xTokenC + ''
            }
            if (xRefreshTokenC) {
                document.cookie = xRefreshTokenC + ''
            }
        } /*else {
            res.cookie('x-token-c', xToken, { http: true, secure: true })
            res.cookie('x-refresh-token-c', xRefreshLToken || xRefreshSToken, {
                http: true,
                secure: true
            })
        }*/
    })
}
