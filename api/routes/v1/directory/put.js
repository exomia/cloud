import express from 'express'
import {
    addDirectory
} from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_API_USAGE_ERROR
} from '../../../lib/error'

const router = express.Router()

router.put('/:parent_directory_uuid?', async ({
    jwt: {
        payload: {
            email
        }
    },
    body: {
        name
    },
    params: {
        parent_directory_uuid
    }
}, res) => {
    if (!name || name.length <= 0) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    const result = await addDirectory(email, name, parent_directory_uuid)
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
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
    access: 10
}
