import express from 'express'
import { getFileInfo, increaseDownloadFileCount } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_NO_CONTENT } from '../../../lib/error'

const router = express.Router()

router.get('/:file_uuid', async ({ jwt: { payload: { email } }, params: { file_uuid } }, res) => {
    if (!file_uuid) {
        return JERROR_NO_CONTENT(res, "no 'file_uuid' specified in the params").end()
    }

    const result = await getFileInfo(email, file_uuid)
    if (!result) {
        return JERROR_NO_CONTENT(res, "check the 'file_uuid' parameter.").end()
    }

    res.download(path.join(process.cwd(), 'private', 'uploads', result.local_name), result.name + result.extension, async err => {
        if (err) {
            return JERROR_INTERNAL_SERVER_ERROR(res, "check the 'file_uuid' parameter.").end()
        }
        await increaseDownloadFileCount(file_uuid)
    })
})

export default {
    router,
    scope: 'file',
    access: 0
}
