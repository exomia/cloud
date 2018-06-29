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

const router = express.Router()

router.get('/:directory_id', async ({ jwt: { valid, payload: { email } }, params: { directory_id } }, res) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    const directories = await listAllDirectories(email, directory_id)

    if (!directories) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const files = await listAllFiles(email, directory_id)
    if (!files) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const dires = await getDirectoryInfo(email, directory_id)
    let path_info = []
    if (dires) {
        for (let path of dires.path_info_json) {
            path_info.push({ name: path.name, id: path.uuid })
        }
        path_info.push({ name: dires.name, id: dires.uuid })
    }

    for (let i = 0; i < directories.length; i++) {
        directories[i].id = directories[i].uuid
        delete directories[i].uuid
    }

    for (let i = 0; i < files.length; i++) {
        files[i].id = files[i].uuid
        delete files[i].uuid
    }

    return res.json({
        directory_id,
        directories,
        files,
        path_info
    })
})

router.delete(
    '/:directory_id',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            body: { force_delete },
            params: { directory_id }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        if (!directory_id) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

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

router.put(
    '/:parent_directory_id',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            body: { name },
            params: { parent_directory_id }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }

        const result = await addDirectory(email, name, parent_directory_id)
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }

        return res.json({
            directory: {
                id: result.uuid,
                name: result.name,
                timestamp: result.timestamp,
                size: 0,
                clamav_status: 0,
                download_count: 0
            },
            error: false
        })
    }
)

router.post(
    '/:directory_id/rename',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            body: { new_name },
            params: { directory_id }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }

        if (!directory_id || !new_name || new_name.length <= 0) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        let result = await updateDirectory(email, directory_id, { new_name })
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
    }
)

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
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        if (!directory_id || !new_parent_directory_id) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        let result = await updateDirectory(email, directory_id, { new_parent_directory_id })
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
