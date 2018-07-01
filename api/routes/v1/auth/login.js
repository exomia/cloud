import express from 'express'
import { checkLoginData } from '../../../lib/pg/user/auth'
import { sign } from '../../../lib/jwt'
import { JERROR_API_USAGE_ERROR, JERROR_INVALID_LOGIN } from '../../../lib/error'

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
        return res.json(JERROR_INVALID_LOGIN)
    }
    return res.json(JERROR_API_USAGE_ERROR)
})

router.get('/', (req, res) => {
    return res.json(JERROR_API_USAGE_ERROR)
})

export default { router, security: 0 }
