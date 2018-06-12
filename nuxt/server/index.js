import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import path from 'path'

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

import { I18N } from '../i18n'

app.set('port', port)

// Import and Set Nuxt.js options
import config from '../nuxt.config'

/*const defaultLocale = 'en_US'
if (locales.indexOf(defaultLocale) === -1) {
    throw 'Invalid translation directory (no en_US locale found)'
}*/

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
    console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
