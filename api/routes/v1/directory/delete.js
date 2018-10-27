import express from 'express'
import {
    deleteDirectory
} from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_API_USAGE_ERROR
} from '../../../lib/error'

const router = express.Router()

router.delete('/:directory_uuid', async ({
    jwt: {
        payload: {
            email
        }
    },
    body: {
        force_delete
    },
    params: {
        directory_uuid
    }
}, res) => {
    if (!directory_uuid) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await deleteDirectory(email, directory_uuid, force_delete)
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
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
