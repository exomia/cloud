import express from 'express'
import { addDirectory } from '../../../lib/pg/directory'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_BAD_REQUEST } from '../../../lib/error'

const router = express.Router()

router.put('/:parent_directory_uuid?', async ({ jwt: { payload: { email } }, params: { parent_directory_uuid }, body: { name } }, res) => {
    if (!name || name.length <= 0) {
        return JERROR_BAD_REQUEST(res, "invalid payload see 'name'")
    }

    const result = await addDirectory(email, name, parent_directory_uuid)
    if (!result) {
        return JERROR_INTERNAL_SERVER_ERROR(res, "check the 'parent_directory_uuid' parameter.")
    }

    return res.json({
        directory: {
            uuid: result.uuid,
            name: result.name,
            timestamp: result.timestamp,
            size: 0,
            clamav_status: 0,
            download_count: 0
        },
        error: false
    })
})

export default {
    router,
    scope: 'directory',
    access: 0
}
