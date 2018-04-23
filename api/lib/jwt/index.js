import jwt from 'jsonwebtoken'
import config from '../../.config/.jwt.config.json'
import { getUserPassword } from '../pg/user/auth'
import { JE1002 } from '../error'

export async function sign(res, { email, password, flags }, stayLoggedIn) {
    res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    res.setHeader('x-token', jwt.sign({ email, flags }, config.SECRET_T + password, config.jwt_options_t))
    res.setHeader(
        'x-refresh-token',
        jwt.sign({ stayLoggedIn: !!stayLoggedIn }, password + config.SECRET_RT, config.jwt_options_rt)
    )
}
export async function jwt_init(req, res, next) {
    const t =
        req.headers['x-token'] ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwic3RheUxvZ2dlZEluIjpmYWxzZSwiaWF0IjoxNTI0NDMwMzczLCJleHAiOjE1MjQ0MzEyNzN9.NtXZ6G4YMnEhtMjXa8UwHfQamDbYi7lU9TgJvrEVAcg'

    if (!t) {
        res.status(200)
        return res.json(JE1002)
    }

    let payload = jwt.decode(t)
    if (!payload || !payload.email) {
        res.status(200)
        return res.json(JE1002)
    }

    const password = await getUserPassword(payload.email)
    if (!password) {
        res.status(200)
        return res.json(JE1002)
    }

    try {
        req.jwt = jwt.verify(t, config.SECRET_T + password, config.jwt_verify_options)
        return next()
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            res.status(200)
            return res.json(JE1002)
        }
    }
    const rt =
        req.headers['x-refresh-token'] ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF5TG9nZ2VkSW4iOmZhbHNlLCJpYXQiOjE1MjQ0MzAzNzMsImV4cCI6MTUyNTAzNTE3M30._Tzj4Z4ewcPH3ALJBRMsq0_cXg9_J4vrDALTqfmq5E8'

    if (!rt) {
        res.status(200)
        return res.json(JE1002)
    }

    try {
        jwt.verify(rt, password + config.SECRET_RT, config.jwt_verify_options)
        req.jwt = payload
        res.setHeader('Access-Control-Expose-Headers', 'x-token')
        res.setHeader('x-token', jwt.sign({ email: payload.email }, config.SECRET_T + password, config.jwt_options_t))

        return next()
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            res.status(200)
            return res.json(JE1002)
        }
    }

    let payload_rt = jwt.decode(rt)
    if (!payload_rt || !payload_rt.stayLoggedIn) {
        res.status(200)
        return res.json(JE1002)
    }

    res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
    res.setHeader('x-token', jwt.sign({ email: payload.email }, config.SECRET_T + password, config.jwt_options_t))
    res.setHeader(
        'x-refresh-token',
        jwt.sign({ stayLoggedIn: true }, password + config.SECRET_RT, config.jwt_options_rt)
    )

    req.jwt = payload
    return next()
}
