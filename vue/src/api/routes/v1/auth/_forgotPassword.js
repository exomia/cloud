import Router from 'koa-router'
import { JERROR_BAD_REQUEST } from '../../../lib/error'
import { getUserInformation } from '../../../lib/pg/user/index'
import { sendMail, TestMail } from '../../../lib/mail/'

const router = new Router()

router.post('/', async ctx => {
    if (!ctx.request.body.usernameOrEmail) {
        return JERROR_BAD_REQUEST(ctx, 'no username and or no email specified in the request.')
    }
    const res = await getUserInformation(ctx.request.body.usernameOrEmail)
    if (res) {
        // Send email
        sendMail(TestMail(ctx.request.body.usernameOrEmail))
    }
    ctx.status = 200
})

export default { router, access: 0 }
