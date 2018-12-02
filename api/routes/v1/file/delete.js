import express from 'express'
import { deleteFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = express.Router()

router.delete('/:file_uuid', async ({ jwt: { payload: { email } }, params: { file_uuid }, body: { force_delete } }, res) => {
    if (!file_uuid) {
        return JERROR_BAD_REQUEST(res, "no 'file_uuid' specified in the params")
    }
    let result = await deleteFile(email, file_uuid, force_delete)
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(res, 'delete failed')
    }
    return res.status(200).json({
        file: {
            uuid: file_uuid
        },
        error: false
    })
})

export default {
    router,
    scope: 'file',
    access: 0
}
