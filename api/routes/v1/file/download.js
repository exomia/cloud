import express from 'express'
import { getFileInfo, increaseDownloadFileCount } from '../../../lib/pg/file'

const router = express.Router()

router.get('/:file_uuid', async ({ jwt: { payload: { email } }, params: { file_uuid } }, res) => {
    if (!file_uuid) {
        return res.status(204).end() //no content
    }

    const result = await getFileInfo(email, file_uuid)
    if (!result) {
        return res.status(204).end() //no content
    }

    res.download(path.join(process.cwd(), 'private', 'uploads', result.local_name), result.name + result.extension, async err => {
        if (err) {
            return res.status(204).end() //no content
        }
        await increaseDownloadFileCount(file_uuid)
    })
})

export default {
    router,
    scope: 'file',
    access: 0
}
