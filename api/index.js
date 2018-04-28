import express from 'express'
import { endpoints } from './routes'
import { jwt_init } from './lib/jwt'
import { JE404, JE500, JE1001, JE1002 } from './lib/error'
import bodyParser from 'body-parser'
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
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())

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
        res.json(JE404)
    })

    app.use((err, req, res, next) => {
        res.status(500)
        res.json(JE500)
    })

    app.disable('x-powered-by')
    app.set('port', port)

    // Listen the server
    app.listen(port, host, () => {
        console.log(`API listening on http(s)://${host}:${port}`) // eslint-disable-line no-console
    })
})()
