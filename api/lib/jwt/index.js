import jwt from 'jsonwebtoken'
import config from '../../.config/.jwt.config.json'
import { getUserPassword } from '../pg/user/auth'
import { JE1002 } from '../error'

export async function sign(res, { email, password, flags }, stayLoggedIn) {
    res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-s-token, x-refresh-l-token')
    res.setHeader('x-token', jwt.sign({ email, flags }, config.SECRET_T + password, config.jwt_options_t))
    res.setHeader(
        stayLoggedIn ? 'x-refresh-l-token' : 'x-refresh-s-token',
        jwt.sign({ stayLoggedIn: !!stayLoggedIn }, password + config.SECRET_RT, config.jwt_options_rt)
    )
}
export async function jwt_init(req, res, next) {
    const t = req.headers['x-token']
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

    const rt = req.headers['x-refresh-token']
    if (!rt) {
        res.status(200)
        return res.json(JE1002)
    }

    try {
        let payload_rt = jwt.verify(rt, password + config.SECRET_RT, config.jwt_verify_options)
        res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-s-token, x-refresh-l-token')
        res.setHeader('x-token', jwt.sign({ email: payload.email }, config.SECRET_T + password, config.jwt_options_t))

        res.setHeader(
            payload_rt.stayLoggedIn ? 'x-refresh-l-token' : 'x-refresh-s-token',
            jwt.sign(payload_rt, password + config.SECRET_RT, config.jwt_options_rt)
        )

        req.jwt = payload
        return next()
    } catch (err) {
        res.status(200)
        return res.json(JE1002)
    }
}
