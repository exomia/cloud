import Router from 'koa-router'
import { listAllDirectories, getDirectoryInfo } from '../../../lib/pg/directory'
import { listAllFiles } from '../../../lib/pg/file'
import { JERROR_INTERNAL_SERVER_ERROR } from '../../../lib/error'

const router = new Router()

router.get('/:directory_uuid?', async ctx => {
    const directories = await listAllDirectories(
        ctx.jwt.payload.emailemail,
        ctx.params.directory_uuid
    )
    if (!directories) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'directory_uuid' parameter."
        )
    }

    const files = await listAllFiles(
        ctx.jwt.payload.email,
        ctx.params.directory_uuid
    )
    if (!files) {
        return JERROR_INTERNAL_SERVER_ERROR(
            ctx,
            "check the 'directory_uuid' parameter."
        )
    }

    const dires = await getDirectoryInfo(
        ctx.jwt.payload.email,
        ctx.params.directory_uuid
    )
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
    ctx.status = 200
    ctx.body = {
        directory_uuid: ctx.params.directory_uuid,
        directories,
        files,
        path_info,
        error: false
    }
})

export default {
    router,
    scope: 'directory',
    access: 0
}
