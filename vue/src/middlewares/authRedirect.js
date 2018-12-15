import { get as getCookie } from 'js-cookie'

export default ({ req, router }) => {
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

    if (xTokenSet && xRefreshTokenSet) {
        //TODO: Doing redirect on server instead of client side
        process.nextTick(() => {
            router.push({ name: 'overview-dir' })
        })
    }
}
