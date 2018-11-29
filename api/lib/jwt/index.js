import jwt from 'jsonwebtoken'
import config from '../../.config/.jwt.config.json'
import { getUserPassword } from '../pg/user/auth'

export async function sign(res, { email, password, scopes }) {
    res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'x-token',
        jwt.sign(
            {
                email,
                scopes,
            },
            config.SECRET_T + password,
            config.jwt_options_t
        )
    )
    res.setHeader('x-refresh-token', jwt.sign({ email }, config.SECRET_RT + password, config.jwt_options_rt))
}

export async function jwt_init(req, res, next) {
    req.jwt = {
        valid: false,
        payload: {},
    }

    const token = req.headers['x-token']
    if (!token) {
        return next()
    }

    let payload = jwt.decode(token)
    if (!payload || !payload.email) {
        return next()
    }

    const password = await getUserPassword(payload.email)
    if (!password) {
        return next()
    }

    try {
        req.jwt.payload = jwt.verify(token, config.SECRET_T + password, config.jwt_verify_options)
        req.jwt.valid = true
        return next()
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            return next()
        }
    }

    const refreshToken = req.headers['x-refresh-token']
    if (!refreshToken) {
        return next()
    }

    try {
        jwt.verify(refreshToken, config.SECRET_RT + password, config.jwt_verify_options)
        sign(res, { ...payload, password })
        req.jwt.payload = payload
        req.jwt.valid = true
        return next()
    } catch (err) {
        return next()
    }
}
