import Router from 'koa-router'
import { updateFile } from '../../../lib/pg/file'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = new Router()

router.post('/:file_uuid/rename', async ctx => {
    if (!ctx.params.file_uuid) {
        return JERROR_BAD_REQUEST(ctx, "no 'file_uuid' specified in the params")
    }

    if (!ctx.request.body.new_name || ctx.request.body.new_name.length <= 0) {
        return JERROR_BAD_REQUEST(ctx, "invalid payload see 'new_name'")
    }

    let result = await updateFile(ctx.jwt.payload.email, ctx.params.file_uuid, {
        new_name: ctx.request.body.new_name
    })
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'file_uuid' parameter."
        )
    }

    ctx.status = 200
    ctx.body = {
        file: { uuid: ctx.params.file_uuid, name: ctx.request.body.new_name },
        error: false
    }
})

export default {
    router,
    scope: 'file',
    access: 0
}
