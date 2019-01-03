import Router from 'koa-router'
import { addFile, replaceFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'
import { STATUS_QUEUED } from '../../../lib/clamav'

import path from 'path'
import fs from 'fs'

import multer from 'koa-multer'
const upload = multer({
    dest: 'private/uploads/'
})

const router = new Router()

router.put('/:directory_uuid?', upload.single('upload-file'), async ctx => {
    const file = ctx.req.file
    const origFile = path.parse(file.originalname)

    const result = !ctx.req.body.replace
        ? await addFile(
              ctx.jwt.payload.email,
              ctx.params.directory_uuid,
              origFile.name,
              origFile.ext,
              file.filename,
              file.mimetype,
              file.size
          )
        : await replaceFile(
              ctx.jwt.payload.email,
              ctx.params.directory_uuid,
              origFile.name,
              origFile.ext,
              file.filename,
              file.mimetype,
              file.size
          )
    if (!result) {
        return fs.unlink(file.path, err => {
            return err
                ? JERROR_INTERNAL_SERVER_ERROR(
                      ctx,
                      `an error occured while deleting the local file '${file.path}' (${err})!`
                  )
                : JERROR_BAD_REQUEST(
                      ctx,
                      "the file already exists! Set the 'replace' option in the payload to true to override it!"
                  )
        })
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
})

export default {
    router,
    scope: 'file',
    access: 0
}
