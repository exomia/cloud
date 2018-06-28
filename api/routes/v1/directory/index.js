import express from 'express'
import {
    listAllDirectories,
    getDirectoryInfo,
    addDirectory,
    updateDirectory,
    deleteDirectory
} from '../../../lib/pg/directory'
import { listAllFiles } from '../../../lib/pg/file'
import { EXIT_LOGIN_REQUIRED, JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'
import { xor_encode, xor_decode } from '../../../lib/util'

const router = express.Router()

router.post('/', async ({ jwt: { valid, payload: { email } }, body: { directory_id } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    const directory_uuid = xor_decode(directory_id)
    const directories = await listAllDirectories(email, directory_uuid)

    if (!directories) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const files = await listAllFiles(email, directory_uuid)
    if (!files) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const dires = await getDirectoryInfo(email, directory_uuid)
    let path_info = []
    if (dires) {
        for (let path of dires.path_info_json) {
            path_info.push({ name: path.name, id: xor_encode(path.uuid) })
        }
        path_info.push({ name: dires.name, id: xor_encode(dires.uuid) })
    }

    for (let i = 0; i < directories.length; i++) {
        directories[i].id = xor_encode(directories[i].uuid)
        delete directories[i].uuid
    }

    for (let i = 0; i < files.length; i++) {
        files[i].id = xor_encode(files[i].uuid)
        delete files[i].uuid
    }

    return res.json({
        directory_id,
        directories,
        files,
        path_info
    })
})

router.post('/add', async ({ jwt: { valid, payload: { email } }, body: { name, parent_directory_id } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    const parent_directory_uuid = xor_decode(parent_directory_id)

    let result = await addDirectory(email, name, parent_directory_uuid)
    if (!result) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    return res.json({
        directory: {
            id: xor_encode(result.uuid),
            name: result.name,
            timestamp: result.timestamp,
            size: 0,
            clamav_status: 0,
            download_count: 0
        },
        error: false
    })
})

router.post('/rename', async ({ jwt: { valid, payload: { email } }, body: { directory_id, new_name } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    if (!directory_id || !new_name || new_name.length <= 0) {
        return res.json(JERROR_API_USAGE_ERROR)
    }

    const directory_uuid = xor_decode(directory_id)

    let result = await updateDirectory(email, directory_uuid, { new_name })
    if (!result) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }
    return res.json({
        directory: {
            id: directory_id,
            name: new_name
        },
        error: false
    })
})

router.post(
    '/move',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            body: { directory_id, new_parent_directory_id }
        },
        res,
        next
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        if (!directory_id || !new_parent_directory_id) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        const directory_uuid = xor_decode(directory_id)
        const new_parent_directory_uuid = xor_decode(new_parent_directory_id)

        let result = await updateDirectory(email, directory_uuid, { new_parent_directory_uuid })
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }
        return res.json({
            directory: {
                id: directory_id
            },
            error: false
        })
    }
)

router.post(
    '/delete',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            body: { directory_id, force_delete }
        },
        res,
        next
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        if (!directory_id) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        const directory_uuid = xor_decode(directory_id)

        let result = await deleteDirectory(email, directory_id, force_delete)
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }
        return res.json({
            directory: {
                id: directory_id
            },
            error: false
        })
    }
)

export default { router, security: 1 }
