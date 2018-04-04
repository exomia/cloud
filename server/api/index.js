import fs from 'fs'
import path from 'path'

const endpoints = []
function ep(dir) {
  const files = fs.readdirSync(path.join('server', 'api', dir), 'utf8')
  for (let filename of files) {
    const matches = /^index.js$/.exec(filename)
    if (!matches) {
      return ep(path.join(dir, filename))
    }

    endpoints.push({
      path: dir.replace(/\\/g, '/'),
      router: require(`./${dir.replace(/\\/g, '/')}/${filename}`)
    })
  }
}

const versions = fs.readdirSync(path.join('server', 'api'), 'utf8')
for (let version of versions) {
  const matches = /^v(.+)$/.exec(version)
  if (matches) {
    ep(version)
  }
}

export { endpoints }
