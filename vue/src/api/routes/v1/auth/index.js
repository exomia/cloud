import express from 'express'
import { getUserInformation } from '../../../lib/pg/user'
import { JERROR_BAD_REQUEST } from '../../../lib/error'

const router = express.Router()

router.all('/', async ({ jwt: { payload: { email } } }, res) => {
    const result = await getUserInformation(email)
    if (result) {
        return res.status(200).json({
            email: result.email,
            scopes: result.scopes,
            volume: result.volume,
            usedVolume: result.used_volume
        })
    }
    return JERROR_BAD_REQUEST(
        res,
        'invalid token payload, please log in again.'
    )
})

export default {
    router,
    access: 0
}
