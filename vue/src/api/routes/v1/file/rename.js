import express from 'express'
import { updateFile } from '../../../lib/pg/file'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = express.Router()

router.post(
    '/:file_uuid/rename',
    async (
        {
            jwt: {
                payload: { email }
            },
            params: { file_uuid },
            body: { new_name }
        },
        res
    ) => {
        if (!file_uuid) {
            return JERROR_BAD_REQUEST(
                res,
                "no 'file_uuid' specified in the params"
            )
        }

        if (!new_name || new_name.length <= 0) {
            return JERROR_BAD_REQUEST(res, "invalid payload see 'new_name'")
        }

        let result = await updateFile(email, file_uuid, {
            new_name
        })
        if (!result) {
            return JERROR_INTERNAL_SERVER_ERROR(
                res,
                "check the 'file_uuid' parameter."
            )
        }

        return res.status(200).json({
            file: {
                uuid: file_uuid,
                new_name
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
