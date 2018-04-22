import express from 'express'
import { checkLoginData } from '../../../lib/pg/user/auth'
import { sign } from '../../../lib/jwt'

const router = express.Router()

router.post('/', async ({ body: { username, password, stayLoggedIn }, jwt }, res, next) => {
    if (username && password) {
        const result = await checkLoginData(username, password)
        if (result) {
            sign(res, result, stayLoggedIn)
            return res.json({
                redirect: '/overview',
                error: false
            })
        }
        return res.json({ error: 'invalid_login' })
    }
})

router.get('/', (req, res, next) => {
    return res.json({ status: 'online', security: 1 })
})

export default { router, security: 1 }
