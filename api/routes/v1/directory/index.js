import express from 'express'
import { listAllDirectories, getDirectoryInfo } from '../../../lib/pg/directory'
import { listAllFiles } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR } from '../../../lib/error'

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
            path_info.push({
                name: path.name,
                uuid: path.uuid
            })
        }
        path_info.push({
            name: dires.name,
            uuid: dires.uuid
        })
    }

    return res.status(200).json({
        directory_uuid,
        directories,
        files,
        path_info
    })
})

export default {
    router,
    scope: 'directory',
    access: 0
}
