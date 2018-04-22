import jwt from 'jsonwebtoken'
import { getUserPassword } from '../pg/user/auth.js'
import config from '../../.config/.jwt.config.json'

export async function jwt_init(req, res, next) {
    function sign(payload, stayLoggedIn, crypted_password) {
        res.cookie(
            config.COOKIE,
            jwt.sign(
                {
                    custom: payload,
                    stayLoggedIn
                },
                config.SECRET + crypted_password,
                config.jwt_options
            ),
            {
                httpOnly: true,
                expires: stayLoggedIn ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : 0
            }
        )
    }

    let payload = {}
    let valid = false
    let expired = false

    req.jwt = {
        clear: () => res.clearCookie(config.COOKIE),
        sign,
        valid
    }

    const token = req.cookies[config.COOKIE]
    if (token) {
        payload = jwt.decode(token) || {}
        if (!!payload.custom && !!payload.custom.email) {
            const crypted_password = await getUserPassword(payload.custom.email)
            if (crypted_password) {
                try {
                    payload = jwt.verify(token, config.SECRET + crypted_password, config.jwt_verify_options)
                    valid = true
                } catch (err) {
                    if (err.name === 'TokenExpiredError') {
                        expired = true
                    }
                }

                //refresh the token if its valid or if its expired and the user wanted to stayLoggedIn
                if (valid || (expired && !!payload.stayLoggedIn)) {
                    sign(payload.custom, !!payload.stayLoggedIn, crypted_password)
                    valid = true
                }
            }
            req.jwt.valid = valid
            req.jwt.payload = payload.custom
        }
    }

    req.jwt.editAndSign = async (nameOrEmail, { new_name, new_email }) => {
        const crypted_password = await getUserPassword(nameOrEmail)
        if (!crypted_password) {
            return false
        }
        if (new_name !== undefined) {
            payload.custom.name = new_name
        }
        if (new_email !== undefined) {
            payload.custom.email = new_email
        }
        sign(payload.custom, !!payload.stayLoggedIn, crypted_password)
    }
    next()
}
