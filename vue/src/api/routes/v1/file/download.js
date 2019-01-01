import Router from 'koa-router'
import { getFileInfo } from '../../../lib/pg/file'
import { JERROR_NO_CONTENT } from '../../../lib/error'
import fs from 'fs'
import path from 'path'

const router = new Router()

router.get('/:file_uuid', async ctx => {
    if (!ctx.params.file_uuid) {
        return JERROR_NO_CONTENT(ctx, "no 'file_uuid' specified in the params")
    }

    const result = await getFileInfo(ctx.jwt.payload.email, ctx.params.file_uuid)

    if (!result) {
        return JERROR_NO_CONTENT(ctx, "check the 'file_uuid' parameter.")
    }

    ctx.body = fs.createReadStream(path.resolve('private/uploads', result.local_name))
    ctx.response.attachment(result.name + result.extension)
})

export default {
    router,
    scope: 'file',
    access: 0
}
