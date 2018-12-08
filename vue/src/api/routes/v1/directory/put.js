import Router from 'koa-router'
import { addDirectory } from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = new Router()

router.put('/:parent_directory_uuid?', async ctx => {
    if (!ctx.request.body.name || ctx.request.body.name.length <= 0) {
        return JERROR_BAD_REQUEST(ctx, "invalid payload see 'name'")
    }

    const result = await addDirectory(
        ctx.jwt.payload.email,
        ctx.request.body.name,
        ctx.params.parent_directory_uuid
    )
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'parent_directory_uuid' parameter."
        )
    }

    ctx.status = 200
    ctx.body = {
        directory: {
            uuid: result.uuid,
            name: result.name,
            timestamp: result.timestamp,
            size: 0,
            clamav_status: 0,
            download_count: 0
        },
        error: false
    }
})

export default {
    router,
    scope: 'directory',
    access: 0
}
