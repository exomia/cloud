import fs from 'fs'
import path from 'path'

const endpoints = [[], [], [], [], []]
function ep(dir) {
    const files = fs.readdirSync(path.join('routes', dir), 'utf8')
    for (let filename of files) {
        const matches = /^index.js$/.exec(filename)
        if (!matches) {
            ep(path.join(dir, filename))
            continue
        }
        const ar = require(`./${dir.replace(/\\/g, '/')}/${filename}`).default
        if (!ar.security || ar.security > 4) {
            ar.security = 0
        }

        endpoints[ar.security].push({
            path: dir.replace(/\\/g, '/'),
            router: ar.router
        })
    }
}

const versions = fs.readdirSync(path.join('routes'), 'utf8')
for (let version of versions) {
    const matches = /^v(.+)$/.exec(version)
    if (matches) {
        ep(version)
    }
}

export { endpoints }
