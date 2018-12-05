import express from 'express'
import { updateFile } from '../../../lib/pg/file'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = express.Router()

router.post(
    '/:file_uuid/move',
    async (
        {
            jwt: {
                payload: { email }
            },
            params: { file_uuid },
            body: { new_directory_uuid }
        },
        res
    ) => {
        if (!file_uuid) {
            return JERROR_BAD_REQUEST(
                res,
                "no 'file_uuid' specified in the params"
            )
        }

        if (!new_directory_uuid) {
            return JERROR_BAD_REQUEST(
                res,
                "no 'new_directory_uuid' specified in the payload"
            )
        }

        let result = await updateFile(email, file_uuid, {
            new_directory_uuid
        })
        if (!result) {
            return JERROR_INTERNAL_SERVER_ERROR(
                res,
                "check the 'file_uuid' parameter and the 'new_directory_uuid' payload."
            )
        }

        return res.status(200).json({
            file: {
                uuid: file_uuid
            },
            error: false
        })
    }
)

export default {
    router,
    scope: 'file',
    access: 0
}
