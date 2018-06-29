import express from 'express'
import { checkLoginData } from '../../../lib/pg/user/auth'
import { sign } from '../../../lib/jwt'
import { JE1001, JE1003 } from '../../../lib/error'

const router = express.Router()

router.post('/', async ({ body: { username, password, stayLoggedIn } }, res) => {
    if (username && password) {
        const result = await checkLoginData(username, password)
        if (result) {
            sign(res, result, stayLoggedIn)
            return res.json({
                name: result.name,
                email: result.email,
                flags: result.flags,
                volume: result.volume,
                usedVolume: result.used_volume
            })
        }
        return res.json(JE1003)
    }
    return res.json(JE1001)
})

router.get('/', (req, res) => {
    return res.json(JE1001)
})

export default { router, security: 0 }
