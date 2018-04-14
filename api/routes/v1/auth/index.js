import express from 'express'
import { checkLoginData } from '../../../lib/pg/user/auth'

const router = express.Router()

router.post(
    '/',
    async ({ body: { username, password, stayLoggedIn }, jwt }, res, next) => {
        if (username && password) {
            const result = await checkLoginData(username, password)
            if (result) {
                jwt.sign(
                    {
                        name: result.name,
                        email: result.email,
                        flags: result.flags
                    },
                    !!stayLoggedIn,
                    result.password
                )
                return res.json({
                    token: 'HUBABUBBA',
                    redirect: '/overview',
                    error: false
                })
            }
            return res.json({ error: 'invalid_login' })
        }
    }
)

export default { router, security: 1 }
