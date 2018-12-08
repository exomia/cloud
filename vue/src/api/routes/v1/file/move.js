import Router from 'koa-router'
import { updateFile } from '../../../lib/pg/file'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = new Router()

router.post('/:file_uuid/move', async ctx => {
    if (!ctx.params.file_uuid) {
        return JERROR_BAD_REQUEST(ctx, "no 'file_uuid' specified in the params")
    }

    if (!ctx.request.body.new_directory_uuid) {
        return JERROR_BAD_REQUEST(
            ctx,
            "no 'new_directory_uuid' specified in the payload"
        )
    }

    let result = await updateFile(ctx.jwt.payload.email, ctx.params.file_uuid, {
        new_directory_uuid: ctx.request.body.new_directory_uuid
    })
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'file_uuid' parameter and the 'new_directory_uuid' payload."
        )
    }

    ctx.status = 200
    ctx.body = { file: { uuid: ctx.params.file_uuid }, error: false }
})

export default {
    router,
    scope: 'file',
    access: 0
}
