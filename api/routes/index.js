import fs from 'fs'
import path from 'path'

const endpoints = {}

function ep(dir) {
    const files = fs.readdirSync(path.join('routes', dir), 'utf8')
    for (let filename of files) {
        const matches = /^(index).js|(.+).js$/.exec(filename)
        if (!matches) {
            ep(path.join(dir, filename))
            continue
        }

        const ar = require(`./${dir.replace(/\\/g, '/')}/${filename}`).default
        if (!ar.scope) {
            ar.scope = ''
        }

        if (!endpoints[ar.scope]) {
            endpoints[ar.scope] = []
        }
        endpoints[ar.scope].push({
            path: matches[1] ? dir.replace(/\\/g, '/') : `${dir.replace(/\\/g, '/')}/${matches[2]}`,
            ...ar
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
