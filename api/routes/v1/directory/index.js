import express from 'express'
import { listAllDirectories, getDirectoryInfo, addDirectory, updateDirectory, deleteDirectory } from '../lib/pg_helper'
import { JE500, JE1001 } from '../lib/error'
import { xor_encode, xor_decode } from '../lib/util'

const router = express.Router()

router.get('/:directory_id?', async ({ jwt: { email }, params: { directory_id } }, res, next) => {
    const directory_uuid = xor_decode(directory_id)

    const directories = await listAllDirectories(email, directory_uuid)
    if (!directories) {
        return res.json(JE500)
    }

    const files = await listAllFiles(email, directory_uuid)
    if (!files) {
        return res.json(JE500)
    }

    const dires = await getDirectoryInfo(email, directory_uuid)
    let path_info = []
    if (dires) {
        for (let path in dires.path_info_json) {
            path_info.push({ name: path.name, id: xor_encode(path.uuid) })
        }
        path_info.push({ name: dires.name, id: xor_encode(dires.uuid) })
    }

    return res.json({
        directory_id,
        directories,
        files,
        path_info
    })
})

router.post('/add', async ({ jwt: { email }, body: { name, parent_directory_id } }, res, next) => {
    const parent_directory_uuid = xor_decode(parent_directory_id)

    let result = await addDirectory(email, name, parent_directory_uuid)
    if (!result) {
        return res.json(JE500)
    }
    return res.json({
        directory: {
            id: xor_encode(result.uuid),
            name: result.name,
            timestamp: result.timestamp
        },
        error: false
    })
})

router.post('/rename', async ({ jwt: { email }, body: { directory_id, new_name } }, res, next) => {
    const directory_uuid = xor_decode(directory_id)
    if (!directory_uuid || !new_name || new_name.length <= 0) {
        return res.json(JE1001)
    }

    let result = await updateDirectory(email, directory_uuid, { new_name })
    if (!result) {
        return res.json(JE500)
    }
    return res.json({
        directory: {
            id: directory_id,
            name: new_name
        },
        error: false
    })
})

router.post('/move', async ({ jwt: { email }, body: { directory_id, new_parent_directory_id } }, res, next) => {
    const directory_uuid = xor_decode(directory_id)
    const new_parent_directory_uuid = xor_decode(new_parent_directory_id)
    if (!directory_uuid || !new_parent_directory_uuid) {
        return res.json(JE1001)
    }

    let result = await updateDirectory(email, directory_uuid, { new_parent_directory_uuid })
    if (!result) {
        return res.json(JE500)
    }
    return res.json({
        directory: {
            id: directory_id
        },
        error: false
    })
})

router.post('/remove', async ({ jwt: { email }, body: { directory_id } }, res, next) => {
    const directory_uuid = xor_decode(directory_id)
    if (!directory_id) {
        return res.json(JE1001)
    }

    let result = await deleteDirectory(email, directory_id)
    if (!result) {
        return res.json(JE500)
    }
    return res.json({
        directory: {
            id: directory_id
        },
        error: false
    })
})

export default { router, security: 1 }
