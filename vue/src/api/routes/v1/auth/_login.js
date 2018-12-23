import Router from 'koa-router'
import { checkLoginData } from '../../../lib/pg/user/auth'
import { sign } from '../../../lib/jwt'
import { JERROR_BAD_REQUEST } from '../../../lib/error'

const router = new Router()

router.post('/', async ctx => {
    if (ctx.request.body.username && ctx.request.body.password) {
        const result = await checkLoginData(ctx.request.body.username, ctx.request.body.password)
        if (result) {
            sign(ctx, result)
            ctx.status = 200
            ctx.body = {
                name: result.name,
                email: result.email,
                scopes: result.scopes,
                volume: result.volume,
                usedVolume: result.used_volume
            }
            return
        }
        return JERROR_BAD_REQUEST(ctx, 'username or password is wrong.')
    }
    return JERROR_BAD_REQUEST(ctx, 'no username and or no password specified in the request.')
})

export default { router, access: 0 }
