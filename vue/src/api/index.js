import { endpoints } from './routes'
import { jwt_init } from './lib/jwt'
import {
    JERROR_NOT_FOUND,
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_FORBIDDEN,
    JERROR_UNAUTHORIZED
} from './lib/error'
import koaBodyparser from 'koa-bodyparser'
import koaJson from 'koa-json'
import Router from 'koa-router'

const router = new Router()

export default server => {
    const app = server.getApp()

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
    router.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            return JERROR_INTERNAL_SERVER_ERROR(ctx, err.message)
        }
    })
    for (let s in endpoints) {
        let scope = endpoints[s]
        for (let route of scope) {
            if (route.scope !== '') {
                route.router.use(`/api/${route.path}`, (ctx, next) => {
                    if (!ctx.jwt.valid) {
                        return JERROR_UNAUTHORIZED(
                            ctx,
                            'the auth token is invalid or does not exist.'
                        )
                    }
                    if (
                        route.access === 0 ||
                        (route.access & ctx.jwt.payload.scopes[route.scope]) ===
                            route.access
                    ) {
                        return next()
                    }
                    return JERROR_FORBIDDEN(
                        ctx,
                        'invalid access to the resource.'
                    )
                })
            }
            router.use(
                `/api/${route.path}`,
                route.router.routes(),
                route.router.allowedMethods()
            )
            console.log(
                `${route.filename.padEnd(20, ' ')} - [${`${`scope ${
                    route.scope
                }`.padEnd(20, ' ')} - access ${`${route.access}`.padStart(
                    4,
                    ' '
                )}]`.padEnd(35, ' ')} +route 'api/${route.path}'`
            )
        }
    }

    router.use('/api/*', ctx => {
        return JERROR_NOT_FOUND(ctx, 'no resource found for this path.')
    })

    app.use(koaBodyparser())
        .use(koaJson({ pretty: false, param: 'pretty' }))
        .use(router.routes())
        .use(router.allowedMethods())
}
