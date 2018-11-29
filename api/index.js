import express from 'express'
import { endpoints } from './routes'
import { jwt_init } from './lib/jwt'
import { JERROR_NOT_FOUND, JERROR_INTERNAL_SERVER_ERROR, JERROR_FORBIDDEN, JERROR_UNAUTHORIZED } from './lib/error'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001
;(async function start() {
    app.use(cors())
    app.use((req, res, next) => {
        console.log(`[DEBUG] ${req.protocol} | ${req.method} ${req.path}`)
        if (req.protocol === 'https' || req.protocol === 'http') {
            return next()
        }
        res.status(403)
        res.json(JERROR_FORBIDDEN('the used protocol is forbidden'))
    })

    app.all('/', (req, res) => {
        res.redirect('/api')
    })
    app.all('/api', (req, res) => {
        res.end('Welcome to the backend of exomia cloud')
    })

    app.use(
        express.urlencoded({
            extended: true
        })
    )
    app.use(express.json())
    app.use(cookieParser())

    app.use(jwt_init)

    for (let s in endpoints) {
        let scope = endpoints[s]
        for (let route of scope) {
            if (route.scope !== '') {
                route.router.use(function(req, res, next) {
                    if (!req.jwt.valid) {
                        return JERROR_UNAUTHORIZED(res, 'the auth token is invalid or does not exist.')
                    }
                    if (route.access === 0 || (route.access & req.jwt.payload.scopes[route.scope]) === route.access) {
                        return next()
                    }
                    return JERROR_FORBIDDEN(res, 'invalid access to the resource.')
                })
            }
            app.use(`/api/${route.path}`, route.router)
            console.log(
                `${route.filename.padEnd(20, ' ')} - [${`${`scope ${route.scope}`.padEnd(20, ' ')} - access ${`${route.access}`.padStart(4, ' ')}]`.padEnd(35, ' ')} +route 'api/${route.path}'`
            )
        }
    }

    app.use((_, res) => {
        return JERROR_NOT_FOUND(res, 'no resource found for this path.')
    })

    app.use((err, _, res) => {
        return JERROR_INTERNAL_SERVER_ERROR(res, err.message)
    })

    app.disable('x-powered-by')
    app.set('port', port)

    // Listen the server
    app.listen(port, host, () => {
        console.log(`API listening on https://${host}:${port}`)
    })
})()
