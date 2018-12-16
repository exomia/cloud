import koaBodyparser from 'koa-bodyparser'
import koaJson from 'koa-json'
import Router from 'koa-router'

import { initialize } from './routes'
import { jwt_init } from './lib/jwt'
import {
    JERROR_NOT_FOUND,
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_FORBIDDEN
} from './lib/error'

export default server => {
    const app = server.getApp()
    const router = new Router()

    router.use(koaBodyparser()).use(koaJson({ pretty: false, param: 'pretty' }))
    router.use('/api/*', (ctx, next) => {
        console.log(`[DEBUG] ${ctx.protocol} | ${ctx.method} ${ctx.path}`)
        if (ctx.protocol === 'https' || ctx.protocol === 'http') {
            return next()
        }
        return JERROR_FORBIDDEN(ctx, 'the used protocol is forbidden')
    })

    router.all('/api', ctx => {
        ctx.body = 'Welcome to the backend of exomia cloud'
    })

    router.use('/api/*', jwt_init)

    router.use('/api/*', async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            return JERROR_INTERNAL_SERVER_ERROR(ctx, err.message)
        }
    })

    initialize(router)

    router.all('/api/*', ctx => {
        return JERROR_NOT_FOUND(ctx, 'no resource found for this path.')
    })
    app.use(router.routes()).use(router.allowedMethods())
}
