import express from 'express'
import { listAllDirectories, getDirectoryInfo, addDirectory, updateDirectory, deleteDirectory } from '../../../lib/pg/directory'
import { listAllFiles } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'

const router = express.Router()

router.get('/:directory_uuid?', async ({ jwt: { payload: { email } }, params: { directory_uuid } }, res) => {
    const directories = await listAllDirectories(email, directory_uuid)
    if (!directories) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const files = await listAllFiles(email, directory_uuid)
    if (!files) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const dires = await getDirectoryInfo(email, directory_uuid)
    let path_info = []
    if (dires) {
        for (let path of dires.path_info_json) {
            path_info.push({ name: path.name, uuid: path.uuid })
        }
        path_info.push({ name: dires.name, uuid: dires.uuid })
    }

    return res.status(200).json({ directory_uuid, directories, files, path_info })
})

router.delete('/:directory_uuid', async ({ jwt: { payload: { email } }, body: { force_delete }, params: { directory_uuid } }, res) => {
    if (!directory_uuid) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await deleteDirectory(email, directory_uuid, force_delete)
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    return res.status(200).json({ directory: { uuid: directory_uuid }, error: false })
})

router.put('/:parent_directory_uuid?', async ({ jwt: { payload: { email } }, body: { name }, params: { parent_directory_uuid } }, res) => {
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

router.post('/:directory_uuid/rename/', async ({ jwt: { payload: { email } }, body: { new_name }, params: { directory_uuid } }, res) => {
    if (!directory_uuid || !new_name || new_name.length <= 0) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await updateDirectory(email, directory_uuid, { new_name })
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

router.post('/:directory_uuid/move', async ({ jwt: { payload: { email } }, body: { new_parent_directory_uuid }, params: { directory_uuid } }, res) => {
    if (!directory_uuid) {
        return res.status(200).json(JERROR_API_USAGE_ERROR)
    }

    let result = await updateDirectory(email, directory_uuid, { new_parent_directory_uuid })
    if (!result) {
        return res.status(500).json(JERROR_INTERNAL_SERVER_ERROR)
    }

    return res.status(200).json({ directory: { uuid: directory_uuid }, error: false })
})

export default { router, scope: 'directory', access: 0 }
