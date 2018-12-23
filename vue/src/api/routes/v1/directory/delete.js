import Router from 'koa-router'
import { deleteDirectory } from '../../../lib/pg/directory'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = new Router()

router.delete('/:directory_uuid', async ctx => {
    if (!ctx.params.directory_uuid) {
        return JERROR_BAD_REQUEST(ctx, "no 'directory_uuid' specified in the params")
    }

    let result = await deleteDirectory(
        ctx.jwt.payload.email,
        ctx.directory_uuid,
        ctx.request.body.force_delete
    )
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(ctx, 'delete failed')
    }
    ctx.status = 200
    ctx.body = { directory: { uuid: ctx.params.directory_uuid }, error: false }
})

export default {
    router,
    scope: 'directory',
    access: 0
}
