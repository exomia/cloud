import express from 'express'
import { getUserInformation } from '../../../lib/pg/user'
import { sign } from '../../../lib/jwt'
import { JE1002 } from '../../../lib/error'

const router = express.Router()

router.get('/', async ({ jwt }, res, next) => {
    const result = await getUserInformation(jwt.email)
    if (result) {
        return res.json({
            name: result.name,
            email: result.email,
            flags: result.flags,
            volume: result.volume,
            usedVolume: result.used_volume
        })
    }
    return res.json(JE1002)
})

export default { router, security: 1 }
