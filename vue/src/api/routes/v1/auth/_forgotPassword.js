import Router from 'koa-router'
import { JERROR_BAD_REQUEST } from '../../../lib/error'
import { getUserInformation } from '../../../lib/pg/user'
import { addPasswordRecovery } from '../../../lib/pg/user/forgotpassword'
import { sendMail, forgotPasswordMail } from '../../../lib/mail'

const router = new Router()

router.post('/', async ctx => {
    if (!ctx.request.body.emailOrName) {
        return JERROR_BAD_REQUEST(ctx, 'no email or username specified in the request.')
    }

    //if an user exists perform the lost password operations
    const ui = await getUserInformation(ctx.request.body.emailOrName)
    if (ui) {
        //send only an email if the password recovery was successfull
        const pr = await addPasswordRecovery(ui.uuid)
        if (pr) {
            sendMail(forgotPasswordMail(ctx.request.origin, ui, pr.uuid))
        }
    }

    //always send back a status 200 - ok regardless of the state of success with an empty body
    ctx.status = 200
    ctx.body = {
        error: false
    }
})

export default { router, access: 0 }
