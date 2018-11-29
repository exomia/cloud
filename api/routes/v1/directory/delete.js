import express from 'express'
import { deleteDirectory } from '../../../lib/pg/directory'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = express.Router()

router.delete('/:directory_uuid', async ({ jwt: { payload: { email } }, params: { directory_uuid }, body: { force_delete } }, res) => {
    if (!directory_uuid) {
        return JERROR_BAD_REQUEST(res, "no 'directory_uuid' specified in the params")
    }

    let result = await deleteDirectory(email, directory_uuid, force_delete)
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(res, 'delete failed')
    }

    return res.status(200).json({
        directory: {
            uuid: directory_uuid
        },
        error: false
    })
})

export default {
    router,
    scope: 'directory',
    access: 0
}
