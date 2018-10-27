import express from 'express'
import { updateFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'

const router = express.Router()

router.post('/:file_uuid/rename', async ({ jwt: { payload: { email } }, params: { file_uuid }, body: { new_name } }, res) => {
    if (!file_uuid || !new_name || new_name.length <= 0) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await updateFile(email, file_uuid, {
        new_name
    })
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    return res.status(200).json({
        file: {
            uuid: file_uuid,
            new_name
        },
        error: false
    })
})

export default {
    router,
    scope: 'file',
    access: 0
}
