import jwt from 'jsonwebtoken'
import config from '../../../../config/jwt.config.json'
import { getUserPassword } from '../pg/user/auth'

export async function sign(ctx, { email, password, scopes }) {
    ctx.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set(
        'x-token',
        jwt.sign({ email, scopes }, config.SECRET_T + password, config.jwt_options_t)
    )
    ctx.set(
        'x-refresh-token',
        jwt.sign({ email }, config.SECRET_RT + password, config.jwt_options_rt)
    )
}

export async function jwt_init(ctx, next) {
    ctx.jwt = { valid: false, payload: {} }

    const token = ctx.get('x-token')
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
        ctx.jwt.payload = jwt.verify(token, config.SECRET_T + password, config.jwt_verify_options)
        ctx.jwt.valid = true
        return next()
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            return next()
        }
    }

    const refreshToken = ctx.get('x-refresh-token')
    if (!refreshToken) {
        return next()
    }

    try {
        jwt.verify(refreshToken, config.SECRET_RT + password, config.jwt_verify_options)
        sign(ctx, { ...payload, password })
        ctx.jwt.payload = payload
        ctx.jwt.valid = true
        return next()
    } catch (err) {
        return next()
    }
}
