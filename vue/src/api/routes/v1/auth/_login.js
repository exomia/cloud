import express from 'express'
import { checkLoginData } from '../../../lib/pg/user/auth'
import { sign } from '../../../lib/jwt'
import {
    JERROR_BAD_REQUEST,
    JERROR_METHOD_NOT_ALLOWED
} from '../../../lib/error'

const router = express.Router()

router.post('/', async ({ body: { username, password } }, res) => {
    if (username && password) {
        const result = await checkLoginData(username, password)
        if (result) {
            sign(res, result)
            return res.status(200).json({
                name: result.name,
                email: result.email,
                scopes: result.scopes,
                volume: result.volume,
                usedVolume: result.used_volume
            })
        }
        return JERROR_BAD_REQUEST(res, 'username or password is wrong.')
    }
    return JERROR_BAD_REQUEST(
        res,
        'no username and or no password specified in the request.'
    )
})

router.get('/', (_, res) => {
    return JERROR_METHOD_NOT_ALLOWED(res, "method not allowed 'get'.")
})

export default { router, access: 0 }
