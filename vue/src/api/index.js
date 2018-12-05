import { urlencoded, json } from 'express'
import { endpoints } from './routes'
import { jwt_init } from './lib/jwt'
import {
    JERROR_NOT_FOUND,
    JERROR_INTERNAL_SERVER_ERROR,
    JERROR_FORBIDDEN,
    JERROR_UNAUTHORIZED
} from './lib/error'

export default server => {
    const app = server.getApp()

    app.use('/api/*', (req, res, next) => {
        console.log(`[DEBUG] ${req.protocol} | ${req.method} ${req.path}`)
        if (req.protocol === 'https' || req.protocol === 'http') {
            return next()
        }
        res.status(403)
        return res.json(JERROR_FORBIDDEN('the used protocol is forbidden'))
    })

    app.all('/api', (req, res) => {
        return res.end('Welcome to the backend of exomia cloud')
    })

    app.use(
        urlencoded({
            extended: true
        })
    )
    app.use(json())

    app.use('/api/*', jwt_init)

    for (let s in endpoints) {
        let scope = endpoints[s]
        for (let route of scope) {
            if (route.scope !== '') {
                route.router.use('/api/*', function(req, res, next) {
                    if (!req.jwt.valid) {
                        return JERROR_UNAUTHORIZED(
                            res,
                            'the auth token is invalid or does not exist.'
                        )
                    }
                    if (
                        route.access === 0 ||
                        (route.access & req.jwt.payload.scopes[route.scope]) ===
                            route.access
                    ) {
                        return next()
                    }
                    return JERROR_FORBIDDEN(
                        res,
                        'invalid access to the resource.'
                    )
                })
            }
            app.use(`/api/${route.path}`, route.router)
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

    app.use('/api/*', (req, res) => {
        return JERROR_NOT_FOUND(res, 'no resource found for this path.')
    })

    app.use('/api/*', (err, req, res) => {
        return JERROR_INTERNAL_SERVER_ERROR(res, err.message)
    })

    app.disable('x-powered-by')
}
