import express from 'express'
import { getUserInformation } from '../../../lib/pg/user'
import { EXIT_LOGIN_REQUIRED, JERROR_LOGIN_REQUIRED } from '../../../lib/error'

const router = express.Router()

router.all('/', async ({ jwt: { valid, payload: { email } } }, res) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED(res)
    }
    const result = await getUserInformation(email)
    if (result) {
        return res.json({
            name: result.name,
            email: result.email,
            flags: result.flags,
            volume: result.volume,
            usedVolume: result.used_volume
        })
    }
    return res.json(JERROR_LOGIN_REQUIRED)
})

export default { router, security: 1 }
