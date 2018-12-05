import fs from 'fs'
import path from 'path'

const endpoints = {}

function ep(dir) {
    const files = fs.readdirSync(path.join(__dirname, dir), 'utf8')
    for (let filename of files) {
        const matches = /^_(.+).js|(index|.+).js$/.exec(filename)
        if (!matches) {
            ep(path.join(dir, filename))
            continue
        }

        const p = dir.replace(/\\/g, '/')
        const ar = require(`./${p}/${filename}`).default
        if (!ar.scope) {
            ar.scope = ''
        }
        if (!ar.access) {
            ar.access = 0
        }
        if (!endpoints[ar.scope]) {
            endpoints[ar.scope] = []
        }
        endpoints[ar.scope].push({
            path: matches[1] ? `${p}/${matches[1]}` : p,
            ...ar,
            filename
        })
    }
}

const versions = fs.readdirSync(__dirname, 'utf8')
for (let version of versions) {
    const matches = /^v(.+)$/.exec(version)
    if (matches) {
        ep(version)
    }
}

export { endpoints }
