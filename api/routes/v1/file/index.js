import express from 'express'
import { addFile, getFileInfo, updateFile, deleteFile, increaseDownloadFileCount } from '../../../lib/pg/file'
import {
    EXIT_LOGIN_REQUIRED,
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_API_USAGE_ERROR,
    JERROR_FILE_ALREADY_EXIST
} from '../../../lib/error'
import { STATUS_QUEUED } from '../../../lib/clamav'

import path from 'path'

import multer from 'multer'
const upload = multer({ dest: 'private/uploads/' })

const router = express.Router()

router.put(
    '/:directory_uuid',
    upload.single('upload-file'),
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            params: { directory_uuid },
            body: { replace },
            file
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }

        if (!replace) {
            const fi = path.parse(file.originalname)
            const result = await addFile(
                email,
                directory_uuid,
                fi.name,
                fi.ext,
                file.filename,
                file.mimetype,
                file.size
            )
            if (!result) {
                //TODO: CLEAR/REMOVE LOCAL FILE
                return res.json(JERROR_FILE_ALREADY_EXIST)
            }
            return res.json({
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
    }
)

router.delete(
    '/:file_uuid',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            params: { file_uuid },
            body: { force_delete }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }
        if (!file_uuid) {
            return res.json(JERROR_API_USAGE_ERROR)
        }
        let result = await deleteFile(email, file_uuid, force_delete)
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }
        return res.json({
            file: {
                uuid: file_uuid
            },
            error: false
        })
    }
)

router.get('/:file_uuid', async ({ jwt: { valid, payload: { email } }, params: { file_uuid } }, res) => {
    if (!valid) {
        return EXIT_LOGIN_REQUIRED()
    }

    if (!file_uuid) {
        return res.status(204).end() //no content
    }

    const result = await getFileInfo(email, file_uuid)
    if (!result) {
        return res.status(204).end() //no content
    }

    res.download(
        path.join(process.cwd(), 'private', 'uploads', result.local_name),
        result.name + result.extension,
        async err => {
            if (err) {
                return res.status(204).end() //no content
            }
            await increaseDownloadFileCount(file_uuid)
        }
    )
})

router.post(
    '/:file_uuid/rename',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            params: { file_uuid },
            body: { new_name }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }

        if (!file_uuid || !new_name || new_name.length <= 0) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        let result = await updateFile(email, file_uuid, { new_name })
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }

        return res.json({
            file: {
                uuid: file_uuid,
                new_name
            },
            error: false
        })
    }
)

router.post(
    '/:file_uuid/move',
    async (
        {
            jwt: {
                valid,
                payload: { email }
            },
            params: { file_uuid },
            body: { new_directory_uuid }
        },
        res
    ) => {
        if (!valid) {
            return EXIT_LOGIN_REQUIRED()
        }

        if (!file_uuid || !new_directory_uuid) {
            return res.json(JERROR_API_USAGE_ERROR)
        }

        let result = await updateFile(payload.email, file_uuid, { new_directory_uuid })
        if (!result) {
            return res.json(JERROR_INTERNAL_SERVER_ERROR)
        }

        return res.json({
            file: {
                uuid: file_uuid
            },
            error: false
        })
    }
)

export default { router, security: 1 }
