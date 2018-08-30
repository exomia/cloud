import express from 'express'
import { endpoints } from './routes'
import { jwt_init } from './lib/jwt'
import { JERROR_NOT_FOUND, JERROR_INTERNAL_SERVER_ERROR, JERROR_FORBIDDEN } from './lib/error'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

function bindep(index) {
    for (let routes of endpoints[index]) {
        app.use(`/api/${routes.path}`, routes.router)
        console.log(`[security ${index}] +route 'api/${routes.path}'`)
    }
}

;(async function start() {
    app.use(cors())
    app.use((req, res, next) => {
        console.log(`[DEBUG] ${req.protocol} | ${req.method} ${req.path}`)
        if (req.protocol === 'https' || req.protocol === 'http') {
            return next()
        }
        res.status(403)
        res.json(JERROR_FORBIDDEN)
    })

    app.all('/', (req, res) => {
        res.redirect('/api')
    })
    app.all('/api', (req, res) => {
        res.end('Welcome to the backend of exomia cloud')
    })

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cookieParser())

    // Bind api endpoints security 0 (public)
    bindep(0)

    app.use(jwt_init)

    // Bind api endpoints security 1 (auth required)
    bindep(1)

    // Bind api endpoints security 2
    bindep(2)

    // Bind api endpoints security 3
    bindep(3)

    // Bind api endpoints security 4
    bindep(4)

    app.use((req, res, next) => {
        res.status(404)
        res.json(JERROR_NOT_FOUND)
    })

    app.use((err, req, res, next) => {
        res.status(500)
        res.json(JERROR_INTERNAL_SERVER_ERROR)
    })

    app.disable('x-powered-by')
    app.set('port', port)

    // Listen the server
    app.listen(port, host, () => {
        console.log(`API listening on https://${host}:${port}`)
    })
})()
