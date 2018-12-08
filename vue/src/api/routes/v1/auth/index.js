import Router from 'koa-router'
import { getUserInformation } from '../../../lib/pg/user'
import { JERROR_BAD_REQUEST } from '../../../lib/error'

const router = new Router()

router.all('/', async ctx => {
    const result = await getUserInformation(ctx.jwt.payload.email)
    if (result) {
        ctx.status = 200
        ctx.body = {
            email: result.email,
            scopes: result.scopes,
            volume: result.volume,
            usedVolume: result.used_volume
        }
        return
    }
    return JERROR_BAD_REQUEST(
        ctx,
        'invalid token payload, please log in again.'
    )
})

export default {
    router,
    access: 0
}
