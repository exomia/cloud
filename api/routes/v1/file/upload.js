import express from 'express'
import { addFile } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR, JERROR_FILE_ALREADY_EXIST } from '../../../lib/error'
import { STATUS_QUEUED } from '../../../lib/clamav'

import path from 'path'

import multer from 'multer'
const upload = multer({
    dest: 'private/uploads/'
})

const router = express.Router()

router.put('/:directory_uuid', upload.single('upload-file'), async ({ jwt: { payload: { email } }, params: { directory_uuid }, body: { replace }, file }, res) => {
    if (!replace) {
        const fi = path.parse(file.originalname)
        const result = await addFile(email, directory_uuid, fi.name, fi.ext, file.filename, file.mimetype, file.size)
        if (!result) {
            //TODO: CLEAR/REMOVE LOCAL FILE
            return res.status(200).json(JERROR_FILE_ALREADY_EXIST)
        }
        return res.status(200).json({
            file: {
                uuid: result.uuid,
                name: result.name,
                extension: result.extension,
                mimetype: result.mimetype,
                status: STATUS_QUEUED,
                size: result.size,
                timestamp: result.timestamp
            },
            error: false
        })
    }
    //REPLACE FILE AND UPDATE
    return res.json(JERROR_INTERNAL_SERVER_ERROR)
})

export default {
    router,
    scope: 'file',
    access: 0
}
