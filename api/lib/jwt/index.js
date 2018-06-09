import jwt from 'jsonwebtoken'
import config from '../../.config/.jwt.config.json'
import { getUserPassword } from '../pg/user/auth'

export async function sign(res, { email, password, flags }, stayLoggedIn) {
    const token = jwt.sign({ email, flags }, config.SECRET_T + password, config.jwt_options_t)
    const refreshToken = jwt.sign(
        { stayLoggedIn: Boolean(stayLoggedIn) },
        password + config.SECRET_RT,
        config.jwt_options_rt
    )
    res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-s-token, x-refresh-l-token')
    res.setHeader('x-token', token)
    res.setHeader(stayLoggedIn ? 'x-refresh-l-token' : 'x-refresh-s-token', refreshToken)
}
export async function jwt_init(req, res, next) {
    req.jwt = {
        valid: false
    }
    const t = req.headers['x-token']
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

    const rt = req.headers['x-refresh-token']
    if (!rt) {
        return next()
    }

    try {
        let payload_rt = jwt.verify(rt, password + config.SECRET_RT, config.jwt_verify_options)
        res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-s-token, x-refresh-l-token')
        res.setHeader('x-token', jwt.sign({ email: payload.email }, config.SECRET_T + password, config.jwt_options_t))

        res.setHeader(
            payload_rt.stayLoggedIn ? 'x-refresh-l-token' : 'x-refresh-s-token',
            jwt.sign(payload_rt, password + config.SECRET_RT, config.jwt_options_rt)
        )

        req.jwt.payload = payload
        req.jwt.valid = true
        return next()
    } catch (err) {
        return next()
    }
}
