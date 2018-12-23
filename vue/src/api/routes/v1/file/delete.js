import Router from 'koa-router'
import { deleteFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = new Router()

router.delete('/:file_uuid', async ctx => {
    if (!ctx.params.file_uuid) {
        return JERROR_BAD_REQUEST(ctx, "no 'file_uuid' specified in the params")
    }
    let result = await deleteFile(
        ctx.jwt.payload.email,
        ctx.params.file_uuid,
        ctx.request.body.force_delete
    )
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(ctx, 'delete failed')
    }
    ctx.status = 200
    ctx.body = { file: { uuid: ctx.params.file_uuid }, error: false }
})

export default {
    router,
    scope: 'file',
    access: 0
}
