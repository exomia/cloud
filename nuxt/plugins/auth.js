export default function({ $axios }) {
    $axios.onRequest(config => {
        console.log(`[DEBUG] ${process.server ? 'SERVER' : 'CLIENT'} making request to ${config.url}`)
        if (!process.server) {
            if (localStorage) {
                const xToken = localStorage.getItem('x-token')
                if (xToken) {
                    $axios.setHeader('x-token', xToken)
                }

                const xRefreshToken = localStorage.getItem('x-refresh-token')
                if (xRefreshToken) {
                    $axios.setHeader('x-refresh-token', xRefreshToken)
                }
            }

            if (sessionStorage) {
                const xRefreshToken = sessionStorage.getItem('x-refresh-token')
                if (xRefreshToken) {
                    $axios.setHeader('x-refresh-token', xRefreshToken)
                }
            }
        }
    })

    //TODO: check if process.server == true does we have to send the cookie back to the client?
    $axios.onResponse(response => {
        const xToken = response.headers['x-token']
        const xRefreshLToken = response.headers['x-refresh-l-token']
        const xRefreshSToken = response.headers['x-refresh-s-token']

        if (xToken) {
            if (!process.server) {
                if (localStorage) {
                    localStorage.setItem('x-token', xToken)
                }
                setCookie('x-token-c', xToken)
            }
            //$axios.setHeader('x-token', xToken)
        }

        if (xRefreshLToken) {
            if (!process.server) {
                if (localStorage) {
                    localStorage.setItem('x-refresh-token', xRefreshLToken)
                }
                setCookie('x-refresh-token-c', xRefreshLToken, 7 * 24 * 60 * 60 * 1000)
            }
            //$axios.setHeader('x-refresh-token', xRefreshLToken)
        } else if (xRefreshSToken) {
            if (!process.server) {
                if (sessionStorage) {
                    sessionStorage.setItem('x-refresh-token', xRefreshSToken)
                }
                setCookie('x-refresh-token-c', xRefreshSToken)
            }
            //$axios.setHeader('x-refresh-token', xRefreshSToken)
        }
    })
}

function setCookie(name, value, expire = false) {
    let expires = ''
    if (expire) {
        expires = `expires=${new Date(Date.now() + expire).toUTCString()}`
    }
    document.cookie = `${name}=${value};${expires};path=/`
}
