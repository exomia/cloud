import express from 'express'
import { deleteFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'

const router = express.Router()

router.delete('/:file_uuid', async ({ jwt: { payload: { email } }, params: { file_uuid }, body: { force_delete } }, res) => {
    if (!file_uuid) {
        return res.json(JERROR_API_USAGE_ERROR)
    }
    let result = await deleteFile(email, file_uuid, force_delete)
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
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
