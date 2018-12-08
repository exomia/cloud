import { get as getCookie } from 'js-cookie'

export default ({ req, route, redirect }) => {
    let xTokenSet = false
    let xRefreshTokenSet = false

    if (process.server) {
        if (req.cookies) {
            xTokenSet = !!req.cookies['x-token']
            xRefreshTokenSet = !!req.cookies['x-refresh-token']
        }
    } else {
        xTokenSet = !!getCookie('x-token')
        xRefreshTokenSet = !!getCookie('x-refresh-token')
    }

    if (xTokenSet && xRefreshTokenSet && route.name !== 'overview-dir') {
        // return redirect({ name: 'overview-dir' })
    }
}
