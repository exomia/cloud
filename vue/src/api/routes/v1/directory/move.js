import express from 'express'
import { updateDirectory } from '../../../lib/pg/directory'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = express.Router()

router.post('/:directory_uuid/move', async ({ jwt: { payload: { email } }, params: { directory_uuid }, body: { new_parent_directory_uuid } }, res) => {
    if (!directory_uuid) {
        return JERROR_BAD_REQUEST(res, "no 'directory_uuid' specified in the params")
    }
    if (!new_parent_directory_uuid) {
        return JERROR_BAD_REQUEST(res, "no 'new_parent_directory_uuid' specified in the payload")
    }
    let result = await updateDirectory(email, directory_uuid, {
        new_parent_directory_uuid
    })
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(res, "check the 'directory_uuid' parameter and the 'new_parent_directory_uuid' payload.")
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
