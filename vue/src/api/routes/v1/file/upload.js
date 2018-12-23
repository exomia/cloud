import Router from 'koa-router'
import { addFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'
import { STATUS_QUEUED } from '../../../lib/clamav'

import path from 'path'

import multer from 'koa-multer'
const upload = multer({
    dest: 'private/uploads/'
})

const router = new Router()

router.put('/:directory_uuid?', upload.single('upload-file'), async ctx => {
    if (!ctx.request.body.replace) {
        const fi = path.parse(ctx.file.originalname)
        const result = await addFile(
            ctx.jwt.payload.email,
            ctx.params.directory_uuid,
            fi.name,
            fi.ext,
            ctx.file.filename,
            ctx.file.mimetype,
            ctx.file.size
        )
        if (!result) {
            // TODO: CLEAR/REMOVE LOCAL FILE
            return JERROR_BAD_REQUEST(
                ctx,
                "the file already exists! Set the 'replace' option in the payload to true to override it!"
            )
        }
        ctx.status = 200
        ctx.body = {
            file: {
                uuid: result.uuid,
                name: result.name,
                extension: result.extension,
                mimetype: result.mimetype,
                status: STATUS_QUEUED,
                size: result.size,
                timestamp: result.timestamp
            },
            error: false
        }
    }
    // REPLACE FILE AND UPDATE
    return JERROR_INTERNAL_SERVER_ERROR(ctx, "currently not supported. ('replace': true)")
})

export default {
    router,
    scope: 'file',
    access: 0
}
