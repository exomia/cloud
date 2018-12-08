import Router from 'koa-router'
import { updateDirectory } from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = new Router()

router.post('/:directory_uuid/move', async ctx => {
    if (!ctx.params.directory_uuid) {
        return JERROR_BAD_REQUEST(
            ctx,
            "no 'directory_uuid' specified in the params"
        )
    }
    if (!ctx.request.body.new_parent_directory_uuid) {
        return JERROR_BAD_REQUEST(
            ctx,
            "no 'new_parent_directory_uuid' specified in the payload"
        )
    }
    let result = await updateDirectory(
        ctx.jwt.payload.email,
        ctx.params.directory_uuid,
        {
            new_parent_directory_uuid:
                ctx.request.body.new_parent_directory_uuid
        }
    )
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'directory_uuid' parameter and the 'new_parent_directory_uuid' payload."
        )
    }

    ctx.status = 200
    ctx.body = { directory: { uuid: ctx.params.directory_uuid }, error: false }
})

export default {
    router,
    scope: 'directory',
    access: 0
}
