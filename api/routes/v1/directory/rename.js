import express from 'express'
import { updateDirectory } from '../../../lib/pg/directory'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'

const router = express.Router()

router.post('/:directory_uuid/rename/', async ({ jwt: { payload: { email } }, body: { new_name }, params: { directory_uuid } }, res) => {
    if (!directory_uuid || !new_name || new_name.length <= 0) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await updateDirectory(email, directory_uuid, {
        new_name
    })
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    return res.status(200).json({
        directory: {
            uuid: directory_uuid,
            name: new_name
        },
        error: false
    })
})

export default {
    router,
    scope: 'directory',
    access: 0
}
