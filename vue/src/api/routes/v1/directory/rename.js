import Router from 'koa-router'
import { updateDirectory } from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = new Router()

router.post('/:directory_uuid/rename/', async ctx => {
    if (!ctx.params.directory_uuid) {
        return JERROR_BAD_REQUEST(
            ctx,
            "no 'directory_uuid' specified in the params"
        )
    }
    if (!ctx.request.body.new_name || ctx.request.body.new_name.length <= 0) {
        return JERROR_BAD_REQUEST(ctx, "invalid payload see 'new_name'")
    }

    let result = await updateDirectory(
        ctx.jwt.payload.email,
        ctx.params.directory_uuid,
        {
            new_name: ctx.request.body.new_name
        }
    )
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'directory_uuid' parameter."
        )
    }

    ctx.status = 200
    ctx.body = {
        directory: {
            uuid: ctx.params.directory_uuid,
            name: ctx.request.body.new_name
        },
        error: false
    }
})

export default {
    router,
    scope: 'directory',
    access: 0
}
