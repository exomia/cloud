import express from 'express'
import { Nuxt, Builder } from 'nuxt'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

import { I18N } from '../i18n'

app.set('port', port)

// Import and Set Nuxt.js options
import config from '../nuxt.config'

config.modules.push(['nuxt-i18n', I18N])

config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    console.log('Server listening on http://' + host + ':' + port)
}
start()
