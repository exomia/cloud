import express from 'express'
import { getUserInformation } from '../../../lib/pg/user'
import { JERROR_LOGIN_REQUIRED } from '../../../lib/error'

const router = express.Router()

router.all('/', async ({ jwt: { payload: { email } } }, res) => {
    const result = await getUserInformation(email)
    if (result) {
        return res.status(200).json({
            name: result.name,
            email: result.email,
            flags: result.flags,
            volume: result.volume,
            usedVolume: result.used_volume
        })
    }
    return res.status(200).json(JERROR_LOGIN_REQUIRED)
})

export default {
    router,
    access: 0
}
