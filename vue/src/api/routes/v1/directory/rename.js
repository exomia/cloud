import express from 'express'
import { updateDirectory } from '../../../lib/pg/directory'
import {
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_BAD_REQUEST
} from '../../../lib/error'

const router = express.Router()

router.post(
    '/:directory_uuid/rename/',
    async (
        {
            jwt: {
                payload: { email }
            },
            body: { new_name },
            params: { directory_uuid }
        },
        res
    ) => {
        if (!directory_uuid) {
            return JERROR_BAD_REQUEST(
                res,
                "no 'directory_uuid' specified in the params"
            )
        }
        if (!new_name || new_name.length <= 0) {
            return JERROR_BAD_REQUEST(res, "invalid payload see 'new_name'")
        }

        let result = await updateDirectory(email, directory_uuid, {
            new_name
        })
        if (!result) {
            return JERROR_INTERNAL_SERVER_ERROR(
                res,
                "check the 'directory_uuid' parameter."
            )
        }

        return res.status(200).json({
            directory: {
                uuid: directory_uuid,
                name: new_name
            },
            error: false
        })
    }
)

export default {
    router,
    scope: 'directory',
    access: 0
}
