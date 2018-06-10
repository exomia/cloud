import express from 'express'
import { addFile, getFileInfo, updateFile, deleteFile, increaseDownloadFileCount } from '../../../lib/pg/file'
import { EXIT_LOGIN_REQUIRED, JERROR_INTERNAL_SERVER_ERROR, JERROR_API_USAGE_ERROR } from '../../../lib/error'
import { xor_encode, xor_decode } from '../../../lib/util'
import { STATUS_QUEUED } from '../../../lib/clamav'

import fs from 'fs'
import path from 'path'

import multer from 'multer'
const upload = multer({ dest: 'private/uploads/' })

const router = express.Router()

router.post(
    '/upload/:directory_id?',
    upload.single('upload-file'),
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            params: { directory_id, replace },
            file
        },
        res,
        next
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        const directory_uuid = xor_decode(directory_id)
        if (!replace) {
            const result = await addFile(
                email,
                file.originalname,
                file.mimetype,
                directory_uuid,
                file.filename,
                file.size
            )

            if (!result) {
                //CLEAR/REMOVE LOCAL FILE
                return res.json(JERROR_INTERNAL_SERVER_ERROR)
            }
            return res.json({
                file: {
                    id: xor_encode(result.uuid),
                    name: result.name,
                    status: STATUS_QUEUED,
                    size: result.size,
                    mimetype: result.mimetype,
                    timestamp: result.timestamp
                },
                error: false
            })
        }
        //REPLACE FILE AND UPDATE
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }
)

router.post('/download', async ({ jwt: { valid, payload: { email } }, body: { file_id } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    const file_uuid = xor_decode(file_id)
    if (!file_id) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }

    const result = await getFileInfo(email, file_uuid)
    if (!result) {
        return next(E400)
    }

    /*res.download(path.join(process.cwd(), 'private', 'uploads', result.local_name), result.name, async err => {
        if (err) {
            return res.status(204).end()
        }
        await increaseDownloadFileCount(file_uuid)
    })*/

    fs.readFile(path.join(process.cwd(), 'private', 'uploads', result.local_name), async (err, buffer) => {
        if (err) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }
        await increaseDownloadFileCount(file_uuid)
        return res.json({
            file: {
                id: xor_encode(result.uuid),
                name: result.name,
                mimetype: result.mimetype,
                clamav_status: result.clamav_status,
                size: result.size,
                timestamp: result.timestamp,
                data: buffer.toString('base64')
            },
            error: false
        })
    })
})

router.post('/rename', async ({ jwt: { valid, payload: { email } }, body: { file_id, new_name } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }
    const file_uuid = xor_decode(file_id)
    if (!file_uuid || !new_name || new_name.length <= 0) {
        return res.json(JERROR_API_USAGE_ERROR)
    }
    let result = await updateFile(email, file_uuid, { new_name })
    if (!result) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }
    return res.json({
        file: {
            id: file_id,
            new_name
        },
        error: false
    })
})

router.post('/move', async ({ jwt: { valid, payload: { email } }, body: { file_id, new_directory_id } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }
    const file_uuid = xor_decode(file_id)
    const new_directory_uuid = xor_decode(new_directory_id)

    if (!file_uuid || !new_directory_uuid) {
        return res.json(JERROR_API_USAGE_ERROR)
    }
    let result = await updateFile(payload.email, file_uuid, { new_directory_uuid })
    if (!result) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }
    return res.json({
        file: {
            id: file_id
        },
        error: false
    })
})

router.post('/delete', async ({ jwt: { valid, payload: { email } }, body: { file_id, force_delete } }, res, next) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }
    const file_uuid = xor_decode(file_id)
    if (!file_uuid) {
        return res.json(JERROR_API_USAGE_ERROR)
    }
    let result = await deleteFile(email, file_uuid, force_delete)
    if (!result) {
        return res.json(JERROR_INTERNAL_SERVER_ERROR)
    }
    return res.json({
        file: {
            id: file_id
        },
        error: false
    })
})

export default { router, security: 1 }
