import fs from 'fs'
import path from 'path'
import { JERROR_FORBIDDEN, JERROR_UNAUTHORIZED } from '../lib/error'

export function initialize(router) {
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

            const rpath = matches[1] ? `${p}/${matches[1]}` : p

            if (ar.scope !== '') {
                ar.router.use(`/api/${rpath}`, (ctx, next) => {
                    if (!ctx.jwt.valid) {
                        return JERROR_UNAUTHORIZED(
                            ctx,
                            'the auth token is invalid or does not exist.'
                        )
                    }
                    if (
                        ar.access === 0 ||
                        (ar.access & ctx.jwt.payload.scopes[ar.scope]) ===
                            ar.access
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
                `/api/${rpath}`,
                ar.router.routes(),
                ar.router.allowedMethods()
            )
            console.log(
                `${filename.padEnd(20, ' ')} - [${`${`scope ${ar.scope}`.padEnd(
                    20,
                    ' '
                )} - access ${`${ar.access}`.padStart(4, ' ')}]`.padEnd(
                    35,
                    ' '
                )} +route 'api/${rpath}'`
            )
        }
    }

    const versions = fs.readdirSync(__dirname, 'utf8')
    for (let version of versions) {
        const matches = /^v(.+)$/.exec(version)
        if (matches) {
            ep(version)
        }
    }
}
