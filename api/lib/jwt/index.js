import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import config from '../../.config/.jwt.config.json'
import { getUserPassword } from '../pg/user/auth'

export async function sign(res, { email, password, flags }, stayLoggedIn) {
    const xToken = jwt.sign({ email, flags }, config.SECRET_T + password, config.jwt_options_t)
    const xRefreshToken = jwt.sign(
        { stayLoggedIn: Boolean(stayLoggedIn) },
        password + config.SECRET_RT,
        config.jwt_options_rt
    )
    res.setHeader(
        'Access-Control-Expose-Headers',
        'x-token, x-refresh-s-token, x-refresh-l-token, x-token-c, x-refresh-token-c'
    )
    res.setHeader('x-token', xToken)
    res.setHeader(stayLoggedIn ? 'x-refresh-l-token' : 'x-refresh-s-token', xRefreshToken)

    res.setHeader(
        'x-token-c',
        cookie.serialize('x-token-c', xToken, {
            httpOnly: false,
            secure: false,
            maxAge: 60 * 15
        })
    )

    if (stayLoggedIn) {
        res.setHeader(
            'x-refresh-token-c',
            cookie.serialize('x-refresh-token-c', xRefreshToken, {
                httpOnly: false,
                secure: false,
                maxAge: 60 * 60 * 24 * 7
            })
        )
    } else {
        res.setHeader(
            'x-refresh-token-c',
            cookie.serialize('x-refresh-token-c', xRefreshToken, {
                httpOnly: false,
                secure: false
            })
        )
    }
}

export async function jwt_init(req, res, next) {
    req.jwt = {
        valid: false,
        payload: {}
    }
    const t = req.headers['x-token'] || req.cookies['x-token-c']
    if (!t) {
        return next()
    }
    let payload = jwt.decode(t)
    if (!payload || !payload.email) {
        return next()
    }

    const password = await getUserPassword(payload.email)
    if (!password) {
        return next()
    }

    try {
        req.jwt.payload = jwt.verify(t, config.SECRET_T + password, config.jwt_verify_options)
        req.jwt.valid = true
        return next()
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            return next()
        }
    }

    const rt = req.headers['x-refresh-token'] || req.cookies['x-refresh-token-c']
    if (!rt) {
        return next()
    }

    try {
        let payload_rt = jwt.verify(rt, password + config.SECRET_RT, config.jwt_verify_options)
        sign(res, payload, payload_rt.stayLoggedIn)
        req.jwt.payload = payload
        req.jwt.valid = true
        return next()
    } catch (err) {
        return next()
    }
}
